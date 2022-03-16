import React from "react";
import { FormGroup, FormControl, ControlLabel, Form, FormControlProps } from "react-bootstrap";

import "./reservationForm.css";
import supportedCards from "../../../images/supportedCards.png";
import { API } from "aws-amplify";
import { Redirect } from "react-router";
import AddToCart from "../../../common/AddToCart";
import { Service } from "../../bestSellers/BestSellerProductRow";


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mobileRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/; 


interface Customer {
  // customerId: string;
  name: string;
  email: string;
  phone: string;
}

export interface Reservation {
  serviceId: string;
  // customer : Customer;
  reservationDate: string;
  reservationTime: string;
  remarks: string;
  numberOfPax: string;
}

interface ReservationFormProps {
  serviceId: string;
}

interface ReservationFormState {
  reservationDate: string | undefined;
  reservationTime: string | undefined;
  reservationDttm: string | undefined;
  name: string;
  emailAddress: string;
  mobileNumber: string;
  remarks: string;
  numberOfPax: string;
  reservation: Reservation | undefined;
  customer: Customer[] | undefined;

  // reservations: { Reservation: any; }[];
  service: Service | undefined;
  blockedDate: string;
  isLoading: boolean;
  toConfirm: boolean;
  isInCart: boolean;

  // card: string;
  // expDate: string | undefined;
  // ccv: string;
  // blockedDate: Date;
  // toCart: boolean;
  // orders: any[];
}

export class ReservationForm extends React.Component<ReservationFormProps, ReservationFormState> {
  constructor(props: ReservationFormProps) {
    super(props);

    this.state = {
      reservationDate: '',
      reservationTime: '',
      reservationDttm: '',
      name: '',
      emailAddress: '',
      mobileNumber: '',
      remarks: '',
      numberOfPax: '',
      reservation: undefined,
      customer: undefined,

      // reservations: [],
      service: undefined,
      blockedDate: '',
      isLoading: false,
      toConfirm: false,
      isInCart: false,

      // card: '',
      // expDate: undefined,
      // reservationDate: undefined,
      // blockedDate: new Date(),
      // ccv: '',
      // isLoading: true,
      // toCart: false,
      // orders: [],
    };
  }

   async componentDidMount() {

    try {
      await API.get("services", `/services/${this.props.serviceId}`, null) //TODO
      .then(response => this.setState({ service: response }))
      .catch(error => alert(error));

      // get customer details
      await API.get("users", `/users/`, null)
      .then(response => this.setState({ customer: response }))
      .catch(error => alert(error));


      var name1:string = '';
      var phone1:string = ''; 

      try
      {
        if (this.state.customer !== undefined)
        {
            name1 = this.state.customer[0].name;
            phone1 = this.state.customer[0].phone;
        }
      }
      catch (e)
      {
        name1 = '';
        phone1 = '';
      }

      const reservationsInCart = await API.get("cart", "/cart", null);
      var reservationInCart;
      // Map the elasticache results to a reservation object
      for (var i = 0; i < reservationsInCart.length; i++) {

        reservationInCart = reservationsInCart[i];

        //if service in cart, pre-load the reservation details
        if (reservationInCart.serviceId === this.props.serviceId)
        {
          // console.log('Service ID: ' + reservationInCart.serviceId);
          // console.log('Reservation Dttm: ' + reservationInCart.Dttm);
          // console.log('Reservation Date: ' + reservationInCart.reservationDate);
          // console.log('Reservation Time: ' + reservationInCart.reservationTime);
          // console.log('Remarks: ' + reservationInCart.remarks);
          // console.log('Number of Pax: ' + reservationInCart.numberOfPax);
          
          var reservationDttm = new Date(reservationInCart.reservationDttm);
          var rDate = reservationDttm.getFullYear() + '-' + ("0" + (reservationDttm.getMonth() + 1)).slice(-2) + '-' + ("0" + (reservationDttm.getDate())).slice(-2);
          var rTime = (reservationDttm.getHours()<10?'0':'') + reservationDttm.getHours() + ':' + (reservationDttm.getMinutes()<10?'0':'') + reservationDttm.getMinutes();
          
          this.setState({
            reservationDate: rDate,
            reservationTime: rTime,
            // reservationDate: reservationInCart.reservationDttm.substring(0, 10),
            // reservationTime: reservationInCart.reservationDttm.substring(11, 16),
            // reservationDate: reservationInCart.reservationDate,
            // reservationTime: reservationInCart.reservationTime,
            remarks: reservationInCart.remarks,
            numberOfPax: reservationInCart.numberOfPax,
            name: name1,
            mobileNumber: phone1,
          });
         
        }
      }
    } catch(error) {
      alert(error);
    }
  }

  formatDate(date: any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


  getEmailValidationState() {
    const data = this.state.emailAddress;
    if (emailRegex.test(data))
    {
      return 'success'
    }
    return 'error'
  }
  
  getMobileValidationState() {
    const data = this.state.mobileNumber;
    if (mobileRegex.test(data))
    {
      return 'success'
    }
    return 'error'
  }

  getFormValidationState() {

    const reservationDate = this.state.reservationDate;
    const reservationTime = this.state.reservationTime;
    const name = this.state.name;
    const numberOfPax = this.state.numberOfPax;

    if (/*this.getEmailValidationState() !== 'success' ||*/ this.getMobileValidationState() !== 'success' || reservationDate === '' || reservationTime === '' || name === '' || numberOfPax === '' )
      return 'error'

    return 'success'
  }


  handleChange = (event: React.FormEvent<FormControl>) => {
    const target = event.target as HTMLInputElement
    this.setState({ 
      ...this.state,
      [target.name as any]: target.value
    });
  }

   render() {
    console.log (this.state.blockedDate)
    // if (this.state.toConfirm) return <Redirect to='/reservation-confirm' />
    if (this.state.toConfirm) return <Redirect to='/cart' />

    if (this.state.isLoading) return null;

    if (!this.state.service) return null;

    return (
      <div className="well-bs col-md-12 full-page no-padding-top">
        <div className="white-box no-margin-top">
          <div className="reservation ">
            {/* <img src={supportedCards} alt="Supported cards" /> */}
            <Form>
              {/* <FormGroup
                controlId="emailAddress"
                validationState={this.getEmailValidationState()}>
                <ControlLabel>Email Address</ControlLabel>
                <FormControl
                  name="emailAddress"
                  type="text"
                  value={this.state.emailAddress}
                  onChange={this.handleChange} />
                <FormControl.Feedback />
              </FormGroup> */}
              <div className="form-col">
                <FormGroup
                  controlId="reservationDate">
                  <ControlLabel>Reservation date</ControlLabel>
                  <FormControl
                    name="reservationDate"
                    type="date"
                    value={this.state.reservationDate}
                    // max={this.state.blockedDate.toDateString()}
                    // min={'2021-04-17'}
                    min = {this.formatDate(new Date())}
                    // min = {this.formatDate('2021-04-17')}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="reservationTime">
                  <ControlLabel>Reservation time</ControlLabel>
                  <FormControl
                    name="reservationTime"
                    type="time"
                    step="300"
                    value={this.state.reservationTime}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  className="name"
                  controlId="name">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  className="mobileNumber"
                  controlId="mobileNumber"
                  validationState={this.getMobileValidationState()}>
                  <ControlLabel>Mobile Number</ControlLabel>
                  <FormControl
                    name="mobileNumber"
                    type="text"
                    value={this.state.mobileNumber}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                {/* <FormGroup
                  controlId="emailAddress"
                  validationState={this.getEmailValidationState()}>
                  <ControlLabel>Email Address</ControlLabel>
                  <FormControl
                    name="emailAddress"
                    type="text"
                    value={this.state.emailAddress}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup> */}
                <FormGroup
                  className="numberOfPax"
                  controlId="numberOfPax">
                  <ControlLabel>Number of Pax</ControlLabel>
                  <FormControl
                    name="numberOfPax"
                    type="number"
                    min="0"
                    max="100" 
                    value={this.state.numberOfPax}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  className="remarks"
                  controlId="remarks">
                  <ControlLabel>Remarks</ControlLabel>
                  <FormControl
                    name="remarks"
                    type="text"
                    value={this.state.remarks}
                    onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </div>
            </Form>
          </div>
        </div>
        <div className="pull-right">
          {/* <button className="btn btn-black" type="button" onClick={this.onReservation}>{`Pay ($${this.getOrderTotal()})`}</button> */}

          {/* <button className="btn btn-black" type="button" onClick={this.onReservation} disabled={this.getFormValidationState() !== 'success'}>{`Reserve Now`}</button>     */}

          <AddToCart serviceId={this.state.service.id} price={this.state.service.price} reservationDate={this.state.reservationDate} 
          reservationTime={this.state.reservationTime} remarks={this.state.remarks} numberOfPax={this.state.numberOfPax} variant={this.getFormValidationState()} 
          name={this.state.name} phone={this.state.mobileNumber} vendorId = {this.state.service.vendorId}
          />

            {/* {this.state.loading && <Glyphicon glyph="refresh" className="spinning" />}Log in */}
          {/* <button onClick={this.onReservation}>Default</button> */}
        </div>
      </div>
    );
  }
}

export default ReservationForm;


