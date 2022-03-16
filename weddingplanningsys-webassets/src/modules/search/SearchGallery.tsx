import React from "react";
import "../../common/styles/gallery.css";
import { API } from "aws-amplify";
import CategoryGalleryService from "../category/CategoryGalleryService";
import { Service } from "../bestSellers/BestSellerProductRow";

interface SearchGalleryProps {
  match: any;
}

interface SearchGalleryState {
  isLoading: boolean;
  services: Service[];
}

export class SearchGallery extends React.Component<SearchGalleryProps, SearchGalleryState> {
  constructor(props: SearchGalleryProps) {
    super(props);

    this.state = {
      isLoading: true,
      services: []
    };
  }

  async componentDidMount() {
    try {
      const searchResults = await this.searchServices();

      // Map the search results to a service object
      const services = [];
      for (var i = 0; i < searchResults.hits.total; i++) {
        var hit = searchResults.hits.hits[i] && searchResults.hits.hits[i]._source;
        hit && services.push({
          author: hit.author.S,
          category: hit.category.S,
          cover: hit.cover.S,
          id: hit.id.S,
          name: hit.name.S,
          price: hit.price.N,
          rating: hit.rating.N,
        });
      }

      this.setState({ 
        services: services
      });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  searchServices() {
    return API.get("search", `/search?q=${this.props.match.params.id}`, null);
  }

  render() {
    return (
      this.state.isLoading ? <div className="loader" /> :
      <div>
        <div className="well-bs no-radius">
          <div className="container-category">
            <h3>Search results</h3>
            <div className="row">
              {this.state.services.map(service => <CategoryGalleryService service={service} key={service.id} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchGallery;