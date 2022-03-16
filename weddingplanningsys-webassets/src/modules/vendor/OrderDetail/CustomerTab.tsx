import React from "react";
import { CustomerData } from "../vendor";

interface CustomerTabProps {
    customerInfo: CustomerData | any
}

interface CustomerTabState{

}

export class CustomerTab extends React.Component<CustomerTabProps, CustomerTabState> {
    constructor(props: CustomerTabProps) {
        super(props);
        this.state = {
            customerInfo: {
                name: "",
                email: "",
                phone: ""
            }
        };

    }
    render() {
        return (
            <div className="CustomerTab container">
                <br></br>
                <div className="row">
                    <div className="col-md-2">
                        <p><label>Name:</label></p>
                    </div>
                    <div className="col-md-2">
                        <p>{this.props.customerInfo?.name}</p>
                    </div>
                    
                </div>
                
                <div className="row">
                    <div className="col-md-2">
                    <p><label>Email:</label></p>
                    </div>
                    <div className="col-md-10">
                        <p>{this.props.customerInfo?.email}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                    <p><label>Contact No:</label></p>
                    </div>
                    <div className="col-md-2">
                        <p>{this.props.customerInfo?.phone}</p>
                    </div>
                </div>
            </div>
        );
    }
}