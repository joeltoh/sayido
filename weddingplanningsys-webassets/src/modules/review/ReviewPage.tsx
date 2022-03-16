import React from "react";
import { ControlLabel } from "react-bootstrap";

import "./reviewPage.css";
import { API } from "aws-amplify";
import { Redirect } from "react-router";

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

interface ReviewFormProps {
    match: any;
}

interface ReviewFormState {
    orderItemId: string | undefined;
    product: any;
    review: string;
    rating: number | null;
    isLoading: boolean;
    submitted: boolean;
    user: any;
    annonymous: boolean,
    error: boolean;
    unauthorised: boolean;
    done: boolean;
}

export class ReviewForm extends React.Component<ReviewFormProps, ReviewFormState> {
    constructor(props: ReviewFormProps) {
        super(props);

        this.state = {
            orderItemId: undefined,
            product: undefined,
            review: '',
            rating: 0,
            isLoading: true,
            submitted: false,
            user: undefined,
            annonymous: false,
            error: false,
            unauthorised: false,
            done: false,
        };
    }

    async componentDidMount() {
        try {
            const order = await API.get("reservation-user", `/reservation/${this.props.match.params.orderItemId}`, null);
            const product = await API.get("services", `/services/${order.serviceId}`, null); //TODO
            if (order.status !== 'CONFIRMED') {
                this.setState({ error: true })
            } else {
                this.setState({ product: product, orderItemId: order.id, isLoading: false, done: order.reviewStatus });
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message === 'Missing Authentication Token') {
                alert('Please sign in to review');
                this.setState({ unauthorised: true });
            } else {
                this.setState({ error: true })
            }
        }
    }

    handleChange = (event: any) => {
        const target = event.target as HTMLInputElement
        this.setState({
            ...this.state,
            [target.name as any]: target.value
        });
    }

    onSubmit = () => {
        // submit

        API.post("review", '/review', {
            body: {
                serviceId: this.state.product.id,
                review: this.state.review,
                rating: this.state.rating,
                orderItemId: this.props.match.params.orderItemId
            }
        }).then(() => {
            this.setState({ done: true });
        }, err => {
            alert(err);
        })
    }

    setValue = (value: number | null) => {
        this.setState({
            rating: value
        })
    }

    textChange = (event: any | null) => {
        this.setState({
            review: event.target.value
        })
    }

    render() {
        if (this.state.submitted) return <Redirect to='/review-submitted' />

        if (this.state.error) return <Redirect to='/notfound' />

        if (this.state.unauthorised) return <Redirect to='/login' />

        if (this.state.done) return (
            <div>
                <div><h1>Thank you for sharing your experience.</h1></div>
                <div><h3>Your review has been submitted.</h3></div>
            </div>
        )

        if (this.state.isLoading) return null;


        return (
            <div className="well-bs col-md-12 full-page no-padding-top">
                <div className="white-box no-margin-top">
                    <div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '50%' }}>
                                <div><h1>Thank you for your purchase.</h1></div>
                                <div><h3>Please leave a review.</h3></div>
                            </div>
                            <div style={{ width: '50%' }}>
                                <img style={{ width: '100%' }} alt={this.state.product.name} src={this.state.product.cover}></img>
                                <div style={{ fontFamily: "cursive", textAlign:"center", marginTop:"15px"}}><h3>{this.state.product.name}</h3></div>
                            </div>
                        </div>

                        <div>&nbsp;</div>
                        <div>
                            <div>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend" style={{ fontSize: '18px' }}>Rating</Typography>
                                    <Rating name="rating" value={this.state.rating} onChange={(event, newValue) => {
                                        this.setValue(newValue);
                                    }} size="large" style={{ fontSize: '40px' }} />
                                </Box>
                            </div>
                            <div>
                                <ControlLabel style={{ fontSize: '18px' }}>Review</ControlLabel>
                                <TextField
                                    id="review"
                                    value={this.state.review}
                                    onChange={this.textChange}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pull-right">
                    <button className="btn btn-black" type="button" onClick={this.onSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}

export default ReviewForm;


