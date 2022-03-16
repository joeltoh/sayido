import React, { Component } from "react";
import sayidobanner from "../../images/bride-1837148_1280.jpg";
import yourpastorders from "../../images/yourpastorders.png";
import bestSellers from "../../images/sunset-698501_1280.jpg";
import yourshoppingcart from "../../images/shopping-2291966_1280.jpg";
import { Hero } from "../../common/hero/Hero";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import { BestSellersBar } from "../bestSellers/bestSellersBar/BestSellersBar";
import { CategoryGalleryTeaser } from "../category/CategoryGalleryTeaser";
import { FriendsBought } from "../friends/FriendsBought";
import { LinkContainer } from "react-router-bootstrap";
import weddingrings from "../../images/wedding-rings.png";
import "./home.css";

interface HomeProps {
  isAuthenticated: boolean;
}

interface HomeState {
  isLoading: boolean;
}

export default class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    this.setState({ isLoading: false });
  }

  renderLanding() {
    return (
      <div className="lander">
        <h1>Say I Do  <img src={weddingrings} width="60" height="60" alt="sayido" /></h1>
        <hr />
        <p>This is a awesome site to search for all your wedding needs, from booking photographers to booking wedding venues. This site in a one stop shop for all that you need. Sign up for an account today to view the various services from the best service providers.</p>
        <div className="button-container col-md-12">
          <LinkContainer to="/signup">
          <a href="/signup">Sign up to explore the site</a>
          </LinkContainer>
        </div>
        <img src={sayidobanner} className="img-fluid full-width" alt="Screenshot"></img>        
    </div>);
  }

  renderHome() {
    return (
      <div className="sayido">
        <Hero />
        <SearchBar />
        <CategoryNavBar />
        <BestSellersBar />
        <div className="well-bs col-md-12 ad-container-padding">
          <div className="col-md-4 ad-padding">
            <div className="container-category no-padding">
              <LinkContainer to="/past">
                <img src={yourpastorders} alt="Past orders"></img> 
              </LinkContainer>
            </div>
          </div>
          <div className="col-md-4 ad-padding">
            <div className="container-category no-padding">
              <LinkContainer to="/cart">
                <img src={yourshoppingcart} alt="Shopping cart"></img> 
              </LinkContainer>
            </div>
          </div>
          <div className="col-md-4 ad-padding">
            <div className="container-category no-padding">
              <LinkContainer to="/best">
                <img src={bestSellers} alt="Best sellers"></img> 
              </LinkContainer>
            </div>
          </div>
        </div>
        <CategoryGalleryTeaser />
        <FriendsBought />
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderHome() : this.renderLanding()}
      </div>
    );
  }
}