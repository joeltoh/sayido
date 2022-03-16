import React from "react";
import { API } from "aws-amplify";

import AddToCart from "../../common/AddToCart";
// import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import StarRating from "../../common/starRating/StarRating";
import "../../common/styles/productRow.css";

interface ReviewRowProps {
  reviewId: string;
  serviceId: string;
  createdDate: number;
  customerId: string;
  orderItemId: string;
  rating: number;
  review: string;
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

interface ReviewRowState {
  review: Review | undefined;
}

export class ReviewRow extends React.Component<ReviewRowProps, ReviewRowState> {
  constructor(props: ReviewRowProps) {
    super(props);

    this.state = {
      review: undefined,
    };
  }

  async componentDidMount() {
    try {
      console.log("Got in here")
      const service = await this.getService();
      console.log(service)
      this.setState({ review: service });
    } catch (e) {
      alert(e);
    }
  }

  getService() {
    console.log("here bro")
    console.log(this.props.reviewId);
    return API.get("review", `/review/${this.props.reviewId}`, null);
  }

  

  render() {
    if (!this.state.review) return null;

    const imageClick = () => {
      console.log('Click');
    }  
    
    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle no-padding">
          </div>
          <div className="media-body product-padding padding-20">
            <h3 className="media-heading"><small>Review {this.props.reviewId}</small>
              <small className="pull-right margin-1"><h4>${this.props.createdDate}</h4></small>
            </h3>
            
            <h4>
            {this.props.review}
            </h4>
            <div>
              Rating
      
            </div>
            <StarRating stars={this.props.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewRow;


