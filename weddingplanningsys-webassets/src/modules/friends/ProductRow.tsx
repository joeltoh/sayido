import React from "react";
import "../../common/styles/productRow.css";
import StarRating from "../../common/starRating/StarRating";
import { API } from "aws-amplify";
import AddToCart from "../../common/AddToCart";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { Service } from "../bestSellers/BestSellerProductRow";

interface ProductRowProps {
  serviceId: string;
}

interface ProductRowState {
  service: Service | undefined;
}

export class ProductRow extends React.Component<ProductRowProps, ProductRowState> {
  constructor(props: ProductRowProps) {
    super(props);

    this.state = {
      service: undefined,
    };
  }

  componentDidMount() {
    API.get("services", `/services/${this.props.serviceId}`, null) //TODO
      .then(response => this.setState({ service: response }))
      .catch(error => alert(error));
  }

  render() {
    if (!this.state.service) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle no-padding">
            <img className="product-thumb border" src={this.state.service.cover} alt={`${this.state.service.name} cover`} />
          </div>
          <div className="media-body product-padding padding-20">
            <h3 className="media-heading">{this.state.service.name}
              <small className="pull-right ">${this.state.service.price}</small>
            </h3>
            <p className="no-margin"><small>{this.state.service.category}</small></p>
            <FriendRecommendations serviceId={this.props.serviceId} />
            <div>
              Rating
              <AddToCart serviceId={this.state.service.id} price={this.state.service.price} />
            </div>
            <StarRating stars={this.state.service.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;


