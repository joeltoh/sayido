import React from 'react';
import { API } from 'aws-amplify';
import { Redirect } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Route } from 'react-router';

interface AddToCartProps {
  orderId: string;
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
  }

  getVariant = () => {
    let style = "btn btn-black"
    return this.props.variant && this.props.variant === "center" ? style + ` btn-black-center` : style + ` pull-right`;
  }

  render() {
    if (this.state.toCart) return <Redirect to='/cart' />
    
    return (
      <Link to={'/review/'+this.props.orderId }> 
      <button 
        className={this.getVariant()} 
        disabled={this.state.loading}
        type="button" >
        {this.state.loading && <Glyphicon glyph="refresh" className="spinning" />}
        {this.props.variant === "Review" ? `Review Now` : `Review Now`}
      </button>
      </Link>
    );
  }
}

export default AddToCart;