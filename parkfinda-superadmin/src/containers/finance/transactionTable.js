import React, { Component } from 'react';
import ReactTable from 'react-table';
import data from "../../data/transactionData.json";

class FinanceTransaction extends Component {
     columns =  [
        {
            Header : "Payment Date",
            accessor: 'country',
        },
        {
            Header : "Franchise",
            accessor: 'country',
        },
        {
            Header : "Country",
            accessor: 'country',
        },
        {
            Header : "Package",
            accessor: 'country',
        },
        {
            Header : "Commission Revenue",
            accessor: 'country',
        },
        {
            Header : "Service Fee",
            accessor: 'country',
        },
        {
            Header : "Service Charge",
            accessor: 'country',
        },
        {
            Header : "Gross Income",
            accessor: 'country',
        }
    ];
    render() {
        return (
                <ReactTable columns={this.columns} data={data}/>
            );
    }
}

export default FinanceTransaction;
