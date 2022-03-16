import React from 'react';
import { API } from 'aws-amplify';
import { Redirect } from 'react-router';
import { Glyphicon } from 'react-bootstrap';


interface Customer {
  // name: string;
  // email: string;
  // phone: string;
}

interface Reservation {
  serviceId: string;
  reviewStatus: string;
  status: boolean;
  numberOfPax: string;
  remarks: string;
  reservationDttm: string;
}

interface AddToCartProps {
  serviceId: string;
  price: number;
  variant?: string;
   //
   reservationDate?: string;
   reservationTime?: string;
   remarks?: string;
   numberOfPax?: string;
   name?: string;
   phone?: string;
   vendorId?: string;
   //
}

interface AddToCartState {
  loading: boolean;
  toCart: boolean;
  //
  reservations: Reservation[]; 
}

class AddToCart extends React.Component<AddToCartProps, AddToCartState> {
  constructor(props: AddToCartProps) {
    super(props);

    this.state = {
      loading: false,
      toCart: false,
      //
      reservations: []
    };
  }

  onAddToCart = async () => {
    this.setState({ loading: true });
    const serviceInCart = await API.get("cart", `/cart/${this.props.serviceId}`, null);

    if (this.props.reservationDate !== null && this.props.reservationTime !== null)
    {
      var reservationDttm = new Date(this.props.reservationDate + ' ' + this.props.reservationTime).toISOString();
      // if the service/service already exists in the cart, pre-load reservation details
      if (serviceInCart) {
        // console.log('CUSTOMERS: ' + this.state.reservations);
        // console.log('name: ' + this.props.name);
        // console.log('phone ' + this.props.phone);

        API.put("users", "/users", {
          body: {
            name: this.props.name,
            phone: this.props.phone,
            //
          }
        });

        API.put("cart", "/cart", {
          body: {
            serviceId: this.props.serviceId,
            quantity: serviceInCart.quantity,// + 1,
            //
            // reservationDate: this.props.reservationDate,
            // reservationTime: this.props.reservationTime,
            reservationDttm: reservationDttm,
            remarks: this.props.remarks,
            numberOfPax: this.props.numberOfPax,
            //
          }
        }).then(() => this.setState({
          toCart: true
        }));

      }
      // if the service does not exist in the cart, add it
      else {
        API.put("users", "/users", {
          body: {
            name: this.props.name,
            phone: this.props.phone,
            //
          }
        });

        // API.post("reservation-user", "/reservation", {
        API.post("cart", "/cart", {
          body: {
            serviceId: this.props.serviceId, //TODO
            price: this.props.price,
            quantity: 1,

            // reservationDate: this.props.reservationDate,
            // reservationTime: this.props.reservationTime,
            reservationDttm: reservationDttm,
            remarks: this.props.remarks,
            numberOfPax: this.props.numberOfPax,
            vendorId: this.props.vendorId
            //
          }
        }).then(() => this.setState({
          toCart: true
        }));
      }
    }


  }

  getVariant = () => {
    let style = "btn btn-black"
    return this.props.variant && this.props.variant === "center" ? style + ` btn-black-center` : style + ` pull-right`;
  }

  render() {
    if (this.state.toCart) return <Redirect to='/cart' />
    
    return (
      <button 
        className={this.getVariant()} 
        disabled={this.state.loading || this.props.variant !== 'success'}
        type="button" 
        onClick={this.onAddToCart}>
        {this.state.loading && <Glyphicon glyph="refresh" className="spinning" />}
        {this.props.variant === "buyAgain" ? `Buy again` : `Add to cart`}
      </button>
    );
  }
}

export default AddToCart;

