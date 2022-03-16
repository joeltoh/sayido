import { API, Auth } from "aws-amplify";
import React, { Component } from "react";
import { Alert, Button, ControlLabel, FormControl, FormGroup, HelpBlock } from "react-bootstrap";

import { VendorNavBar } from "../VendorNavBar";

interface ServiceViewProps {
    isAuthenticated: boolean;
    match: any;
}

interface ServiceViewState {
    show: boolean;
    value: string;
    isEdit: boolean;
    service: any;
}

export default class ServiceView extends Component<ServiceViewProps, ServiceViewState> {
    constructor(props: ServiceViewProps) {
        super(props);

        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            show: true,
            value: '',
            isEdit: false,
            service: []
        };
    }

    async componentDidMount() {
        try {
            const service = await this.getData();
            this.setState({ service });
        } catch (e) {
            alert(e);
        }
    }

    // TODO: change vendorId
    private _getData = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const username: string = user.signInUserSession.accessToken.payload.username;
        return API.get("manageServices", "/manageServices/" + username, null);
    };
    public get getData() {
        return this._getData;
    }
    public set getData(value) {
        this._getData = value;
    }

    handleDismiss() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        if (length > 5) return 'warning';
        if (length > 0) return 'error';
        return null;
    }

    handleChange(e: any) {
        this.setState({ value: e.target.value });
    }

    renderAlert() {
        const alertType = ['warning', 'danger', 'info', 'success']
        return (
            <div>
                {alertType.map(x =>
                    <Alert bsStyle={x} onDismiss={this.handleDismiss}>
                        <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                    </Alert>
                )}
                <p>
                    <Button bsStyle="danger">Take this action</Button>
                    <span> or </span>
                    <Button onClick={this.handleDismiss}>Hide Alert</Button>
                </p>
            </div>



        )
    }

    toggleEdit: React.MouseEventHandler<Button> = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    render() {
        return (
            <div className="ServiceView">
                <VendorNavBar />
                <h2>My Service</h2>

                {/* {this.renderAlert()} */}
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        {this.state.service.map((s: any) => 
                            <div className="card">
                                <div className="card-header">
                                    <div className="row padding-top-down">
                                        <div className="col-md-7">
                                            <h3>Service Information</h3>
                                        </div>
                                        {/* <div className="offset-md-5 pull-right">
                                            <Button bsStyle="info" onClick={this.toggleEdit}>Edit</Button>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row padding-top-down">
                                        <div className="col-md-3">
                                            <ControlLabel>Service Name</ControlLabel>
                                        </div>
                                        <div className="col-md-9">
                                            {this.state.isEdit ? <FormControl
                                                type="text"
                                                value={this.state.value}
                                                placeholder="Enter text"
                                                onChange={this.handleChange}
                                            /> : <p>{s.name}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="row padding-top-down">
                                        <div className="col-md-3">
                                            <ControlLabel>Category</ControlLabel>
                                        </div>
                                        <div className="col-md-9">
                                            {this.state.isEdit ? <FormControl
                                                type="text"
                                                value={this.state.value}
                                                placeholder="Enter text"
                                                onChange={this.handleChange}
                                            /> : <p>{s.category}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="row padding-top-down">
                                        <div className="col-md-3">
                                            <ControlLabel>Price</ControlLabel>
                                        </div>
                                        <div className="col-md-9">
                                            {this.state.isEdit ? <FormControl
                                                type="text"
                                                value={this.state.value}
                                                placeholder="Enter text"
                                                onChange={this.handleChange}
                                            /> : <p>{s.price}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="row padding-top-down">
                                        <div className="col-md-3">
                                            <ControlLabel>Description</ControlLabel>
                                        </div>
                                        <div className="col-md-9">
                                            {this.state.isEdit ? <FormControl componentClass="textarea" placeholder="textarea" /> : <p>{s.description}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header">
                                    <h3>Cover Photo</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row padding-top-down">
                                        <div className="col-md-12">
                                            {this.state.isEdit ?
                                                <div>
                                                    <ControlLabel>Please give the URL of the cover photo.</ControlLabel>
                                                    <FormControl componentClass="textarea" placeholder="textarea" />
                                                </div>
                                                : <p>{s.cover}</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12"><img src={s.cover} width="50%" alt="sayido" /></div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </FormGroup>
                </form>
            </div>
        );
    }
}