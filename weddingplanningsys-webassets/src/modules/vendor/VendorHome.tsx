import React, { Component } from "react";

import { VendorNavBar } from "./VendorNavBar";
import "../signup/home.css";
import VendorSearch from "./inbox/VendorSearch";
import InboxTable from "./inbox/inboxTable";
import { Auth, API } from "aws-amplify";

interface VendorHomeProps {
  isAuthenticated: boolean;
}

interface VendorHomeState {
  inboxData: InboxTableDataProps[]
}

export interface InboxTableDataProps {
  id: number,
  reservationId: string,
  reservationDttm: string,
  numberOfPax: string,
  remarks: string,
  orderDate: string,
  status: string,
}

export default class VendorHome extends Component<VendorHomeProps, VendorHomeState> {
  constructor(props: VendorHomeProps) {
    super(props);

    this.state = {
      inboxData: []
    }
  }

  async componentDidMount() {
    try {
     this.getData();
    } catch (e) {
      alert(e);
    }
  }

  getData = async () => {
    this.searchFunction("","","");
  }

  searchFunction = async(id:string, reservationId: string, reservationDttm:string) => {
    const user = await Auth.currentAuthenticatedUser();
    const username: string = user.signInUserSession.accessToken.payload.username;
    const inboxData : InboxTableDataProps[] = await API.post("reservation", "/reservation/" + username, {
      body: {
        id: id,
        reservationId: reservationId,
        reservationDttm: reservationDttm
      }
    });
    this.setState({inboxData});
    console.log(this.state.inboxData);
  }

  render() {
    return (
      <div className="vendorHome container">
        <VendorNavBar />
        <h1>Inbox</h1>

        <VendorSearch searchFunction={this.searchFunction}/>
        <InboxTable inboxData={this.state.inboxData} parentGetData={this.getData}/>

      </div>
    );
  }
}