import React from "react";
import "../../common/styles/gallery.css";
import { API } from "aws-amplify";
import CategoryGalleryService from "./CategoryGalleryService";
import { Service } from "../bestSellers/BestSellerProductRow";

interface CategoryGalleryProps {
  match: any;
}

interface CategoryGalleryState {
  isLoading: boolean;
  services: Service[];
}

export class CategoryGallery extends React.Component<CategoryGalleryProps, CategoryGalleryState> {
  constructor(props: CategoryGalleryProps) {
    super(props);

    this.state = {
      isLoading: true,
      services: []
    };
  }

  async componentDidMount() {
    try {
      const services = await this.listServices();
      this.setState({ services });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  listServices() {
    return API.get("services", `/services?category=${this.props.match.params.id}`, null); //TODO
  }

  render() {
    return (
      this.state.isLoading ? <div className="loader" /> :
      <div>
        <div className="well-bs no-radius">
          <div className="container-category">
            <h3>{this.props.match.params.id}</h3>
            <div className="row">
              {this.state.services.map(service => <CategoryGalleryService service={service} key={service.id} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryGallery;