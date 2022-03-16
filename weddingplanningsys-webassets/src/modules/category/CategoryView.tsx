import React, { Component } from "react";
import { CategoryNavBar } from "./categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import { BestSellersBar } from "../bestSellers/bestSellersBar/BestSellersBar";
import { CategoryGallery } from "./CategoryGallery";

import photograph from "../../images/photography.png";
import venue from "../../images/weddingreception.png";
import plan from "../../images/weddingplanning.png";

import "../../common/hero/hero.css";
import { categories } from "./categoryNavBar/categories";

interface CategoryViewProps {
  match: any;
}

export default class CategoryView extends Component<CategoryViewProps> {
  getImage = () => {
    switch (this.props.match.params.id) {
      case categories.photograph:
        return photograph;
      case categories.venue:
        return venue;
      case categories.plan:
        return plan;
      default:
        return plan;
    }
  }

  render() {
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <BestSellersBar />
        <img src={this.getImage()} alt={`${this.getImage()} hero`} className="img-fluid full-width top-hero-padding" />
        <CategoryGallery match={this.props.match} />
      </div>
    );
  }
}