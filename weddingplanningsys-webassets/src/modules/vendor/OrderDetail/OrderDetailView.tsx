import React, { Component } from "react";

import { VendorNavBar } from "../VendorNavBar";
import { Tab, Tabs } from "react-bootstrap";
import { OrderTab } from "./OrderTab";
import { CustomerTab } from "./CustomerTab";
import { API } from "aws-amplify";
import VendorActionBtn from "../VendorActionBtn";

interface OrderDetailProps {
    isAuthenticated: boolean;
    match: any;
}

interface OrderDetailState {
    key: number;
    orderDetail: any
}

export default class OrderDetail extends Component<OrderDetailProps, OrderDetailState> {
    constructor(props: OrderDetailProps) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1,
            orderDetail: []
        };

    }

    async componentDidMount() {
        try {
            const orderDetail = await this.getData();
            this.setState({ orderDetail });
        } catch (e) {
            alert(e);
        }
    }

    handleSelect(key: number) {
        console.log(`selected ${key}`);
        this.setState({ key });
    }

    getData = async () => {
        return API.get("reservation", `/reservation/detail/${this.props.match.params.reservationId}`, null);
    }

    renderActionBtn = () => {
        if (this.state.orderDetail?.id) {
            return (
                <VendorActionBtn
                    id={this.state.orderDetail.id}
                    reservationId={this.state.orderDetail.reservationId}
                    status={this.state.orderDetail.status}
                    showEye={false}
                    parentGetData={this.getData}
                />
            )
        }

    }

    render() {
        return (
            <div className="OrderDetails container">
                <VendorNavBar />
                <div className="row">
                    <div className="col-md-10">
                        <h2>Reservation ID: {this.props.match.params.reservationId}</h2>
                    </div>
                    <div className="col-offset-2">
                        <h2>{this.renderActionBtn()}</h2>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <Tabs
                            activeKey={this.state.key}
                            onSelect={(event: any) => this.handleSelect(event)}
                            id="controlled-tab-example"
                        >
                            <Tab eventKey={1} title="Order" >
                                <OrderTab orderDetail={this.state.orderDetail} />
                            </Tab>
                            <Tab eventKey={2} title="Customer">
                                <CustomerTab customerInfo={this.state.orderDetail.customerInfo} />
                            </Tab>
                        </Tabs>

                    </div>
                </div>
            </div>
        );
    }
}