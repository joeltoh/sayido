import React from 'react';
import { API } from 'aws-amplify';
import { Redirect } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Route } from 'react-router';

interface AddToCartProps {
  serviceId: string;
  price: number;
  variant?: string;
}

interface AddToCartState {
  loading: boolean;
  toCart: boolean;
}

class AddToCart extends React.Component<AddToCartProps, AddToCartState> {
  constructor(props: AddToCartProps) {
    super(props);

    this.state = {
      loading: false,
      toCart: false
    };
  }

  onAddToCart = async () => {
    this.setState({ loading: true });
    const serviceInCart = await API.get("cart", `/cart/${this.props.serviceId}`, null);

    if (serviceInCart) {
      API.put("cart", "/cart", {
        body: {
          serviceId: this.props.serviceId,
          quantity: serviceInCart.quantity + 1
        }
      }).then(() => this.setState({
        toCart: true
      }));
    }
    else {
      API.post("cart", "/cart", {
        body: {
          serviceId: this.props.serviceId, //TODO
          price: this.props.price,
          quantity: 1,
        }
      }).then(() => this.setState({
        toCart: true
      }));
    }
  }

  getVariant = () => {
    let style = "btn btn-black"
    return this.props.variant && this.props.variant === "center" ? style + ` btn-black-center` : style + ` pull-right`;
  }

  render() {
    if (this.state.toCart) return <Redirect to='/cart' />
    
    return (
      <Link to={'/reservation/'+this.props.serviceId }> 
      <button 
        className={this.getVariant()} 
        disabled={this.state.loading}
        type="button" >
        {this.state.loading && <Glyphicon glyph="refresh" className="spinning" />}
        {this.props.variant === "buyAgain" ? `Buy again` : `Reserve now`}
      </button>
      </Link>
    );
  }
}

export default AddToCart;