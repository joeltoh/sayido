import { API } from "aws-amplify";
import React from "react";
import * as vendorService from "./vendor";

interface VendorActionBtnProps {
  id: number,
  reservationId: string,
  status: string,
  showEye: boolean,
  parentGetData: any
}

interface VendorActionBtnState {

}

export class VendorActionBtn extends React.Component<VendorActionBtnProps, VendorActionBtnState> {
  constructor(props: VendorActionBtnProps) {
    super(props)
  }

  cancelReservation = (reservationId: string) => {
    vendorService.updateStatus(reservationId, vendorService.statusType.CANCELLED).then(() => {
      this.props.parentGetData();
    });
  }

  confirmReservation = (reservationId: string) => {
    vendorService.updateStatus(reservationId, vendorService.statusType.CONFIRMED).then(() => {
      this.props.parentGetData();
    })
  }

  disableBtn = (currentStatus: string) => {
    return (currentStatus === vendorService.statusType.CONFIRMED || currentStatus === vendorService.statusType.CANCELLED) ? true : false;
  }

  renderEye = () => {
    if(this.props.showEye){
      return (
        <a href={`/vendor/reservation/detail/${this.props.id}`}><button className="btn btn-dark"><span className="glyphicon glyphicon-eye-open"></span></button></a>
      )
    }
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => this.confirmReservation(this.props.reservationId)} disabled={this.disableBtn(this.props.status)}>
          <span className="glyphicon glyphicon-ok"></span>
        </button>
        {this.renderEye()}
        <button className="btn btn-danger" onClick={() => this.cancelReservation(this.props.reservationId)} disabled={this.disableBtn(this.props.status)}>
          <span className="glyphicon glyphicon-remove"></span>
        </button>
      </div >
    );
  }
}

export default VendorActionBtn;
