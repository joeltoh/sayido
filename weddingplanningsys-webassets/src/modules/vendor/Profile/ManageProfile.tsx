import { API } from "aws-amplify";
import React, { Component } from "react";

import { VendorNavBar } from "../VendorNavBar";

// interface ProfileData {
//     category: string;
//     companyName: string;
//     UEN: string;
// }
interface ManageProfileProps {
    isAuthenticated: boolean;
    match: any;
}

interface ManageProfileState {
    profile: any;
}

export default class ManageProfile extends Component<ManageProfileProps, ManageProfileState> {
    constructor(props: ManageProfileProps) {
        super(props);

        this.state = {
            profile: undefined
        }
    }

    async componentDidMount() {
        try{
            const profile:any = await this.getData();
            this.setState({
                profile
            });
        } catch(e){
            alert(e);
        }
        console.log(this.state);
    }

    getData = async() => {
        return API.get("vendors", "/vendors", null);
    }

    render() {
        return (
            <div className="ManageProfile">
                <VendorNavBar />
                <h2>My Profile</h2>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-10">
                                <h4>Company Information</h4>
                            </div>
                            {/* <div className="col-md-2">
                                <button className="btn btn-info pull-right"><span className="glyphicon glyphicon-pencil"></span> Edit</button>
                            </div> */}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">Company Name: </div>
                            <p>{this.state.profile?.userInfo.companyName}</p>
                        </div>

                        <div className="row">
                            <div className="col-md-2">Email Address: </div>
                            <p>{this.state.profile?.email}</p>
                        </div>

                        <div className="row">
                            <div className="col-md-2">Category: </div>
                            <p>{this.state.profile?.userInfo.category}</p>
                        </div>
                    </div>
                    <div className="card-header">
                        <h4>Payment Information</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">UEN: </div>
                            <p>{this.state.profile?.userInfo.UEN}</p>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}