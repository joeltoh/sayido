import React from "react";
import { API } from "aws-amplify";

import BestSellerProductRow from "./ServiceDescriptionProductRow";
import Reviews from "./Review";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import { RouteComponentProps } from 'react-router';


interface ServiceDescriptionProps {
  serviceId: string;
}

export interface Service {
  id: string;
  cover: string;
  price: number;
  category: string;
  name: string;
  rating: number;
  author: string;
}

// export interface Review {
//   reviewId: string;
//   serviceId: string;
//   createdDate: number;
//   customerId: string;
//   orderItemId: string;
//   rating: number;
//   review: string;
// }

interface BestSellersState {
  isLoading: boolean;
  service: Service | undefined;
  // review: Review | undefined;
}
interface ServiceDescriptionState {
  isLoading: boolean;
  service: Service | undefined;
  // review: Review | undefined;
  review: any[];
}

export interface Review {
  reviewId: string;
  serviceId: string;
  createdDate: number;
  customerId: string;
  orderItemId: string;
  rating: number;
  review: string;
}

export default class ServiceDescription extends React.Component<ServiceDescriptionProps & RouteComponentProps, ServiceDescriptionState> {
  constructor(props: ServiceDescriptionProps & RouteComponentProps) {
    super(props);
    const serviceidobj = this.props.match.params["serviceid"]; //TODO
    console.log(serviceidobj);
    this.state = {
      isLoading: true,
      service: undefined,
      review: []
    }; 
  }

  async componentDidMount() {
    try {
      // Map the elasticache results to a service object
      const service = await this.getService();
      console.log(service)
      this.setState({ service });

    } catch(error) {
      alert(error);
    }

    try {
      console.log("Got in here :D")
      const service = await this.getReview();
      console.log(service)
      this.setState({ review: service });
      console.log(this.state.review)
    } catch (e) {
      alert(e);
    }
  }

  getReview() {
    console.log(this.props.match.params["serviceid"]); //TODO
    return API.get("review", `/review/${this.props.match.params["serviceid"]}`, null); //TODO
  }

  // getReview = async () => {
  //   const ordersInCart = await this.getReservations();
  //   this.setState({
  //     review: ordersInCart,
  //   });

  // }

  // getReservations() {
  //   return API.get("review", `/review/${this.props.match.params["serviceid"]}`, null);
  // }

  getService() {
    return API.get("services", `/services/${this.props.match.params["serviceid"]}`, null); // TODO
  }

  render() {
    if (!this.state.service) return null;
    const isLoggedIn = this.state.review;
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <div>
          <div className="well-bs no-radius">
            <div className="container-category">
              <h3>Item Description</h3>
            </div>
            <BestSellerProductRow serviceId={this.state.service.id} key={this.state.service.id} />
             {isLoggedIn.length > 0 && <div className="container-category">
              <h3>Reviews</h3>
            </div>}
            {this.state.review.map(d => (<Reviews reviewId={d.reviewId} serviceId={d.serviceId} createdDate={d.createdDate} customerId={d.customerId} orderItemId={d.orderItemId} rating={d.rating} review={d.review} key={d.serviceId} />))} 
          </div>
        </div>
      </div>
    );
  }
}