import React from "react";
import "../../common/styles/gallery.css";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import CategoryGalleryService from "./CategoryGalleryService";
import { Service } from "../bestSellers/BestSellerProductRow";

interface CategoryGalleryTeaserProps {}

interface CategoryGalleryTeaserState {
  isLoading: boolean;
  services: Service[];
}

export class CategoryGalleryTeaser extends React.Component<CategoryGalleryTeaserProps, CategoryGalleryTeaserState> {
  constructor(props: CategoryGalleryTeaserProps) {
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
    return API.get("services", "/services?category=Planning", null); //TODO
  }

  render() {
    return (
      this.state.isLoading ? <div className="loader" /> :
      <div>
        <div className="well-bs no-padding-top col-md-12 no-radius">
          <div className="container-category">
            <h3>Wedding Planning <small><LinkContainer to="/category/Planning"><a>Browse Wedding Planning Services</a></LinkContainer></small></h3>
            <div className="row">
              {this.state.services.slice(0,4).map(service => <CategoryGalleryService service={service} key={service.id} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryGalleryTeaser;