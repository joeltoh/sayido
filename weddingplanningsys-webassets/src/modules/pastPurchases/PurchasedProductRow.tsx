import React from "react";
import "../../common/styles/productRow.css";
import StarRating from "../../common/starRating/StarRating";
import { API } from "aws-amplify";
import AddToCart from "../../common/AddToCart";
import ReviewNow from "../../common/ReviewNow";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { Service } from "../bestSellers/BestSellerProductRow";
import { Order } from "../cart/CartProductRow";

interface PurchasedProductRowProps {
  order: Order;
  orderId : string;
}

interface PurchasedProductRowState {
  service: Service | undefined;
}

export class PurchasedProductRow extends React.Component<PurchasedProductRowProps, PurchasedProductRowState> {
  constructor(props: PurchasedProductRowProps) {
    super(props);

    this.state = {
      service: undefined
    };
  }

  async componentDidMount() {
    try {
      const service = await this.getService(this.props.order);
      this.setState({ service });

    } catch (e) {
      alert(e);
    }
  }

  getService(order: Order) {
    return API.get("services", `/services/${order.serviceId}`, null); //service
  }

  getReview(price: any){
    if(!this.props.order.reviewStatus && this.props.order.status === 'CONFIRMED'){
      return (<ReviewNow orderId={this.props.orderId} price={price} variant="Review" />)
    }
  }

  render() {
    if (!this.state.service) {
      return (
        <div className="white-box">
          <div className="media">
            <div className="media-left media-middle">
              <div className="loader-no-margin" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle">
            <img className="media-object product-thumb" src={this.state.service.cover} alt={`${this.state.service.name} covers`} />
          </div>
          <div className="media-body">
            <h3 className="media-heading">{this.state.service.name}
              <div className="pull-right margin-1">
                <small>{`${this.props.order.quantity} @ $${this.state.service.price}`}</small>
              </div>
            </h3>
            <small>{this.state.service.category}</small>
            <FriendRecommendations serviceId={this.props.order.serviceId} />
            <div>
              Rating
              {this.getReview(this.state.service.price)}
              <AddToCart serviceId={this.state.service.id} price={this.state.service.price} variant="buyAgain" />
            </div>
            <StarRating stars={this.state.service.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default PurchasedProductRow;


