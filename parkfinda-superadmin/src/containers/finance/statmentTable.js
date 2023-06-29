import React, { Component } from 'react';
import ReactTable from 'react-table';
import data from "../../data/statmentData.json";

class FinanceStatment extends Component {
     columns =  [
        {
            Header : "Date",
             accessor: 'date',
        },
        {
            Header : "Description",
             accessor: 'description',
        },
        {
            Header : "Receivable",
             accessor: 'receivable',
        },
        {
            Header : "Settlement",
             accessor: 'settlement',
        },
        {
            Header : "Outstanding",
             accessor: 'outstanding',
        }
    ];
    render() {
        return (
                <ReactTable columns={this.columns} data={data}/>
            );
    }
}

export default FinanceStatment;
