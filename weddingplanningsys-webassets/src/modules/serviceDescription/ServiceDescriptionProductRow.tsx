import React from "react";
import { API } from "aws-amplify";

import AddToCart from "../../common/ReserveNow";
// import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import "../../common/styles/productRow.css";

interface ProductRowProps {
  serviceId: string;
}

export interface Service {
  id: string;
  cover: string;
  price: number;
  category: string;
  name: string;
  description: string;
  rating: number;
  author: string;
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

  async componentDidMount() {
    try {
      const service = await this.getService();
      this.setState({ service });
    } catch (e) {
      alert(e);
    }
  }

  getService() {
    return API.get("services", `/services/${this.props.serviceId}`, null); //TODO
  }

  

  render() {
    if (!this.state.service) return null;

    const imageClick = () => {
      console.log('Click');
    }  
    
    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle no-padding">
            <img className="media-object product-thumb" src={this.state.service.cover} alt={`${this.state.service.name}  cover`} />
          </div>
          <div className="media-body product-padding padding-20">
            <h3 className="media-heading">{this.state.service.name}
              <small className="pull-right margin-1"><h4>${this.state.service.price}</h4></small>
            </h3>
            <p><small>{this.state.service.category}</small></p>
            <h4>
            {this.state.service.description}
            </h4>
            <div>
              <AddToCart serviceId={this.props.serviceId} price={this.state.service.price} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;


