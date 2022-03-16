import React from "react";
import { FormGroup, FormControl, ControlLabel, Form, FormControlProps } from "react-bootstrap";

import "./checkoutForm.css";
import supportedCards from "../../../images/supportedCards.png";
import { API } from "aws-amplify";
import { Redirect } from "react-router";


// const statusFalse = false;
// const reviewStatusPending = 'PENDING';

const statusPending = 'PENDING';
const reviewStatusFalse = false;

interface CustomerInfo {
  email: string;
  phone: string;
}

interface Reservation {
  serviceId: string;
  reviewStatus: boolean;
  status: string;
  numberOfPax: string;
  remarks: string;
  reservationDttm: string;
  orderDate: string;
  customerInfo: CustomerInfo | undefined
  vendorId: string;
}

interface CheckoutFormProps {}

interface CheckoutFormState {
  card: string;
  expDate: string | undefined;
  ccv: string;
  isLoading: boolean;
  toCart: boolean;
  orders: any[];
  toConfirm: boolean;
  //
  customerInfo: CustomerInfo[];
  reservations: Reservation[]; 
  // reservationDttm: string;
  // remarks: string;
  // numberOfPax: string;
  // customerInfo: string;
}

export class CheckoutForm extends React.Component<CheckoutFormProps, CheckoutFormState> {
  constructor(props: CheckoutFormProps) {
    super(props);

    this.state = {
      card: '1010101010101010',
      expDate: undefined,
      ccv: '123',
      isLoading: true,
      toCart: false,
      orders: [],
      toConfirm: false,
      //
      customerInfo: [],
      reservations: []
    };
  }

  async componentDidMount() {
    try {
      const orders = await this.listOrdersInCart();
      this.setState({
        orders: orders
      });
    } catch (e) {
      alert(e);
    }

    // get customer details
    await API.get("users", `/users/`, null)
    .then(response => this.setState({ customerInfo: response }))
    .catch(error => alert(error));

    this.setState({ isLoading: false });
  }

  listOrdersInCart() {
    return API.get("cart", "/cart", null);
  }

  getOrderTotal = () => {
    return this.state.orders.reduce((total, service) => {
      return total + service.price * service.quantity
    }, 0).toFixed(2);
  }

  getCardNumberValidationState() {
    const length = this.state.card.length;
    if (length >= 15 && length <= 19) return 'success';
    else if (length !== 0 && (length < 15 || length > 19)) return 'error';
    return null;
  }

  handleChange = (event: React.FormEvent<FormControl>) => {
    const target = event.target as HTMLInputElement
    this.setState({ 
      ...this.state,
      [target.name as any]: target.value
    });
  }

  onCheckout = () => {

    // console.log(this.state.customerInfo[0]);
    // console.log(this.state.orders[0]);
    // console.log(this.state.orders[0].vendorId);
    for (let i=0; i < this.state.orders.length; i++)
    {
      var tempReservation: Reservation;
      tempReservation = {serviceId: this.state.orders[i].serviceId, status: statusPending, //TODO
        numberOfPax: this.state.orders[i].numberOfPax, 
        reviewStatus: reviewStatusFalse , remarks: this.state.orders[i].remarks, 
        reservationDttm: this.state.orders[i].reservationDttm, orderDate : new Date().toISOString() 
        , customerInfo: this.state.customerInfo[0], vendorId: this.state.orders[i].vendorId};

      console.log(tempReservation);
      this.state.reservations.push(tempReservation);
    }
    console.log(this.state.reservations);

    // this.setState({
    //   reservations: [{serviceId: 'SERVICEID', status: statusFalse, numberOfPax: '1', reviewStatus: reviewStatusPending , remarks: 'NUMBA1', reservationDttm: 'NUMBA1'},
    //   {serviceId: 'SERVICEID', status: statusFalse, numberOfPax: '2', reviewStatus: reviewStatusPending, remarks: 'NUMBA2', reservationDttm: 'NUMBA2'} ]
    // });

    API.post("reservation-user", "/reservation", {
      body: {
        reservations: this.state.reservations
      }
    }).then(() => this.setState({
      toCart: true
    }));

    const orders = this.state.orders;
    API.post("orders", "/orders", {
      body: {
        services: orders,
        checkoutDate: new Date().toLocaleDateString(),
        custEmail: this.state.customerInfo[0].email 
      }
    }).then(() => this.setState({
      toConfirm: true
    }));
  }

  render() {
    if (this.state.toConfirm) return <Redirect to='/checkout-confirm' />

    if (this.state.isLoading) return null;
    return (
      <div className="well-bs col-md-12 full-page no-padding-top">
        <div className="white-box no-margin-top">
          <div className="checkout ">
            <img src={supportedCards} alt="Supported cards" />
            <Form>
              <FormGroup
                controlId="card"
                validationState={this.getCardNumberValidationState()}>
                <ControlLabel>Card number</ControlLabel>
                <FormControl
                  name="card"
                  type="text"
                  value={this.state.card}
                  onChange={this.handleChange} />
                <FormControl.Feedback />
              </FormGroup>
              <div className="form-row">
                <FormGroup
                  controlId="expDate">
                  <ControlLabel>Expiration date</ControlLabel>
                  <FormControl
                    name="expDate"
                    type="date"
                    value={this.state.expDate}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  className="ccv"
                  controlId="ccv">
                  <ControlLabel>CCV</ControlLabel>
                  <FormControl
                    name="ccv"
                    type="text"
                    value={this.state.ccv}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </div>
            </Form>
          </div>
        </div>
        <div className="pull-right">
          <button className="btn btn-black" type="button" onClick={this.onCheckout}>{`Pay ($${this.getOrderTotal()})`}</button>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;


