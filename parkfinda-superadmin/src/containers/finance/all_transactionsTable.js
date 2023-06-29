import React, { Component } from 'react';
import ReactTable from 'react-table';
import data from "../../data/all_transactionsData.json";


class FinanceAllTransactions extends Component {
     columns =  [
        {
            Header : "Booking ID",
            accessor: 'booking_id',
        },
        {
            Header : "Country",
            accessor: 'country',
        },
        {
            Header : "Franchise",
            accessor: 'franchise',
        },
        {
            Header : "Location",
            accessor: 'location',
        },
        {
            Header : "Platform",
            accessor: 'platform',
        },
        {
            Header : "Start",
            accessor: 'start',
        },
        {
            Header : "End",
            accessor: 'end',
        },
        {
            Header : "Duration",
            accessor: 'duration',
        },
        {
            Header : "Franchise Fee",
            accessor: 'franchise_fee',
        },
        {
            Header : "Commission",
            accessor: 'commission',
        },
        {
            Header : "Service Fee",
            accessor: 'service_fee',
        },
        {
            Header : "VRN/VIR",
            accessor: 'VRN/VIR',
        },
    ];
    render() {
        return (
                <ReactTable columns={this.columns} data={data}/>
            );
    }
}

export default FinanceAllTransactions;
