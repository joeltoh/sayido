import React from "react";
import { API } from "aws-amplify";

import BestSellerProductRow from "./BestSellerProductRow";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";

interface BestSellersProps {}

interface BestSellersState {
  isLoading: boolean;
  services: { serviceId: any; }[];
}

export default class BestSellers extends React.Component<BestSellersProps, BestSellersState> {
  constructor(props: BestSellersProps) {
    super(props);

    this.state = {
      isLoading: true,
      services: []
    };
  }

  async componentDidMount() {
    try {
      const services = [];
      const bestSellers = await API.get("bestsellers", "/bestsellers", null);
      
      // Map the elasticache results to a service object
      for (var i = 0; i < bestSellers.length; i++) {
        var hit = JSON.parse(bestSellers[i]);
        services.push({ serviceId: hit });
      }
      this.setState({
        services: services,
        isLoading: false
      });
    } catch(error) {
      alert(error);
    }
  }

  render() {
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <div>
          <div className="well-bs no-radius">
            <div className="container-category">
              <h3>Top 20 best sellers</h3>
            </div>
            {this.state.isLoading ? <div className="loader" /> :
              this.state.services.slice(0,20).map(service => <BestSellerProductRow serviceId={service.serviceId} key={service.serviceId} />
            )}  
          </div>
        </div>
      </div>
    );
  }
}