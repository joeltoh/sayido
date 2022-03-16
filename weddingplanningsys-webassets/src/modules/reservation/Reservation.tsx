import React, { Component } from "react";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import { ReservationForm } from "./reservationForm/ReservationForm";
interface ReservationProps {
  match: any;
}

export default class Reservation extends React.Component<ReservationProps> {

  constructor(props: ReservationProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <SearchBar />
        <CategoryNavBar />
        <div className="well-bs">
          <div className="white-box no-margin-top no-margin-bottom">
            <h3>Reservation</h3>
          </div>
        </div>
        <ReservationForm serviceId={this.props.match.params.id} />
      </div>
    );
  }
}