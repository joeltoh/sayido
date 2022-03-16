import React from "react";
import "../../common/styles/productRow.css";
import { API } from "aws-amplify";
import StarRating from "../../common/starRating/StarRating";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { Glyphicon } from "react-bootstrap";
import { Service } from "../bestSellers/BestSellerProductRow";

export interface Order {
  serviceId: string;
  quantity: number;
  price: number;
  reviewStatus: boolean;
  status: string;
}

interface CartProductRowProps {
  order: Order;
  calculateTotal: () => void;
}

interface CartProductRowState {
  service: Service | undefined;
  removeLoading: boolean;
}

export class CartProductRow extends React.Component<CartProductRowProps, CartProductRowState> {
  constructor(props: CartProductRowProps) {
    super(props);

    this.state = {
      service: undefined,
      removeLoading: false
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
    return API.get("services", `/services/${order.serviceId}`, null); //TODO
  }

  onRemove = async () => {
    this.setState({ removeLoading: true });
    await API.del("cart", "/cart", {
      body: {
        serviceId: this.props.order.serviceId, //TODO
      }
    });

    this.props.calculateTotal();
  }

  onQuantityUpdated = async (event: any) => {
    await API.put("cart", "/cart", {
      body: {
        serviceId: this.props.order.serviceId,
        quantity: parseInt(event.target.value, 10)
      }
    });
  }

  render() {
    if (!this.state.service) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle">
            <img className="media-object product-thumb" src={this.state.service.cover} alt={`${this.state.service.name} cover`} />
          </div>
          <div className="media-body">
            <h3 className="media-heading">{this.state.service.name}
              <div className="pull-right margin-1">
                <small>${this.state.service.price}</small>
              </div>
            </h3>
            <p>
              <small>{this.state.service.category}</small>
            </p>
            <FriendRecommendations serviceId={this.props.order.serviceId} />
            <div>
              Rating
              <div className="pull-right">
                <div className="input-group">

                  <input type="number" className="form-control" placeholder="Quantity" defaultValue={this.props.order.quantity.toString()} onChange={this.onQuantityUpdated} min={1} />
                  <span className="input-group-btn">
                    <button className="btn btn-black" type="button" onClick={this.onRemove} disabled={this.state.removeLoading}>
                      {this.state.removeLoading && <Glyphicon glyph="refresh" className="spinning" />} 
                      Remove
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <p><StarRating stars={this.state.service.rating} /></p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProductRow;


