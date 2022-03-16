import React from "react";
import "../../common/styles/gallery.css";
import StarRating from "../../common/starRating/StarRating";
import { Service } from "../bestSellers/BestSellerProductRow";
import { Link } from 'react-router-dom'
import { Route } from 'react-router';

interface CategoryGalleryServiceProps {
  service: Service;
}

export class CategoryGalleryService extends React.Component<CategoryGalleryServiceProps> {
  render() {
    if (!this.props.service) return;
    
    const imageClick = () => {
      
      console.log(this.props.service);
      
    }  
    
    return (
      <div className="col-sm-3 col-md-3">
        <div className="thumbnail no-border">
          <p className="rating-container"><StarRating stars={this.props.service.rating} /><span className="pull-right">{`$${this.props.service.price}` }</span></p>
          <Link to={'/servicedescription/'+this.props.service.id }> 
          {/* <Route path={'servicedescription/:someserviceid'} component={ServiceDescription}> */}
          <img src={this.props.service.cover} alt={`${this.props.service.name} cover`} onClick={() => imageClick()}/>
          {/* </Route> */}
          </Link>
          <div className="caption">
            <h4 className="text-center">{this.props.service.name}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryGalleryService;