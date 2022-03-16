import React from "react";
import { Button } from "react-bootstrap";
import "../../../App.css";

interface VendorSearchProps {
  searchFunction: any;
}

interface VendorSearchState {
  id: string;
  reservationId: string;
  reservationDttm: string;
}

export class VendorSearch extends React.Component<VendorSearchProps, VendorSearchState> {
  constructor(props: VendorSearchProps) {
    super(props);
    this.state = {
      id: "",
      reservationId: "",
      reservationDttm: ""
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = async() => {
    this.props.searchFunction(this.state.id, this.state.reservationId, this.state.reservationDttm);
  }

  render() {
    return (
      <div className="VendorSearchForm">
        <form>
          <div className="row padding-top-down">
            <div className="col-md-2">
              <label>ID:</label>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" onChange={(e) => this.setState({id: e.target.value})}/>
            </div>
          </div>

          <div className="row padding-top-down">
            <div className="col-md-2">
              <label>Reservation ID:</label>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" onChange={(e) => this.setState({reservationId: e.target.value})}/>
            </div>
          </div>

          <div className="row padding-top-down">
            <div className="col-md-2">
              <label>Reservation Date Time:</label>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control"  onChange={(e) => this.setState({reservationDttm: e.target.value})}/>
            </div>
            <div className="col-md-5">
            <Button className="btn btn-orange no-radius" onClick={() => this.handleSearch()}>
              <label>Search</label>
            </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default VendorSearch;