import React from "react";
import { OrderDetailData } from "../vendor";

interface OrderTabProps {
    orderDetail: any
}
interface OrderTabState {

}

export class OrderTab extends React.Component<OrderTabProps, OrderTabState> {
    constructor(props: OrderTabProps) {
        super(props);
        this.state = {
            orderDetail: []
        };

    }
    render() {
        return (
            <div className="OrderTab container">
                <br></br>
                <div className="row">
                    <div className="col-md-2">
                    <p><label>Service:</label></p>
                    </div>
                    <div className="col-md-3">
                        <p>{this.props.orderDetail?.serviceId}</p>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-2">
                    <p><label>Number of pax:</label></p>
                    </div>
                    <div className="col-md-3">
                        <p>{this.props.orderDetail?.numberOfPax}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                    <p><label>Reservation Date:</label></p>
                    </div>
                    <div className="col-md-3">
                        <p>{new Date(this.props.orderDetail?.reservationDttm).toLocaleDateString()}  {new Date(this.props.orderDetail?.reservationDttm).toLocaleTimeString()}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                    <p><label>Status:</label></p>
                    </div>
                    <div className="col-md-3">
                        <p>{this.props.orderDetail?.status}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                    <p><label>Review:</label></p>
                    </div>
                    <div className="col-md-3">
                        <p>{this.props.orderDetail?.reviewStatus ? "True" : "false"}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                    <p><label>Created on:</label></p>
                    </div>
                    <div className="col-md-3">
                        <p>{this.props.orderDetail?.orderDate}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                    <p><label>Remarks:</label></p>
                    </div>
                    <div className="col-md-3">
                        <p>{this.props.orderDetail?.remarks}</p>
                    </div>
                    {/* <div className="offset-md-2">
                        <p>
                            <Button bsStyle="info">Save</Button>
                        </p>
                    </div> */}
                </div>
            </div>
        );
    }
}