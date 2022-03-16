import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";
import "../../../common/styles/gallery.css";

import burgers from "../../../images/bestSellers/lilacs-1914124_640.jpg";
import italian from "../../../images/bestSellers/bouquet-168832_640.jpg";
// /Users/Joel/Desktop/sayido/sayido-WebAssets/src/images/bestSellers/bridal-bouquet-3323903_640.jpg/Users/Joel/Desktop/sayido/sayido-WebAssets/src/images/bestSellers/
import pancakes from "../../../images/bestSellers/flowers-1245828_640.jpg";
import pineapple from "../../../images/bestSellers/bridal-bouquet-3323903_640.jpg";
import umami from "../../../images/bestSellers/flower-bouquet-422709_640.jpg";

const bestSellers = [burgers, italian, pancakes, pineapple, umami];

export class BestSellersBar extends React.Component {
  render() {
    return (
      <div className="center ad-gallery nav">
        <div className="col-md-2 hidden-sm hidden-xs">
          <LinkContainer to="/best">
            <NavItem><h3>Say I Do<br/>Best Sellers</h3></NavItem>
          </LinkContainer>
        </div>
        <div className="row">
          {bestSellers.map(data =>
            <div className="col-md-2 hidden-sm hidden-xs" key={data}>
              <LinkContainer to="/best">
                <NavItem><img src={data} className="thumbs" /></NavItem>
              </LinkContainer>
            </div>)}
        </div>
      </div>
    );
  }
}

export default BestSellersBar;