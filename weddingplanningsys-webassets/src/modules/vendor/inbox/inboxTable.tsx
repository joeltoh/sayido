import React from "react";
import DataTable from 'react-data-table-component';
import VendorActionBtn from "../VendorActionBtn";
import { InboxTableDataProps } from "../VendorHome";

interface InboxTableProps {
    inboxData: InboxTableDataProps[];
    parentGetData: any;
}

interface InboxTableState {
    
}

export class InboxTable extends React.Component<InboxTableProps, InboxTableState> {
    constructor(props: InboxTableProps) {
        super(props);
        
    }

    render() {
        const columns = [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
                maxWidth: '70px',
                button: true,
                cell : (row: {id:number}) => <a href={`/vendor/reservation/detail/${row.id}`}>{row.id}</a>
            },
            {
                name: 'Reservation ID',
                selector: 'reservationId',
                sortable: true
            },
            {
                name: 'Reservation Date Time',
                selector: 'reservationDttm',
                sortable: true,
                cell: (row: {reservationDttm: string}) => <p>{new Date(row.reservationDttm).toLocaleDateString()}  {new Date(row.reservationDttm).toLocaleTimeString()}</p>
            },
            {
                name: 'Order Date',
                selector: 'orderDate',
                sortable: true,
                cell: (row: {orderDate: string}) => <p>{new Date(row.orderDate).toLocaleDateString()}  {new Date(row.orderDate).toLocaleTimeString()}</p>
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            },
            {
                name: 'Action',
                button: true,
                minWidth: '300px',
                cell: (row: {id:number, reservationId: string, status:string}) => 
                    <VendorActionBtn 
                        id={row.id}
                        reservationId={row.reservationId}
                        status={row.status}
                        showEye={true}
                        parentGetData={this.props.parentGetData}
                    />
                
            },
        ];
        return (
            <div className="inboxTable">
                <DataTable
                    columns={columns}
                    data={this.props.inboxData}
                    pagination

                />
            </div>
        );
    }
}

export default InboxTable;