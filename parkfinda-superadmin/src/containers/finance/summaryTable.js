import React, { Component } from 'react';
import ReactTable from 'react-table';
import data from "../../data/summeryData.json";

class FinanceSummary extends Component {
     columns =  [
        {
            Header : "Period",
             accessor: 'period',
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
            Header : "Total Revenue Commission",
             accessor: 'total_revenue_commission',
        },
        {
            Header : "Total Revenue Service fee",
             accessor: 'total_revenue_service_fee',
        },
        {
            Header : "Total Revenue Service Charge",
             accessor: 'total_revenue_service_charge',
        },
        {
            Header : "Total Revenue",
             accessor: 'total_revenue',
        }
    ];
    render() {
        return (
                <ReactTable columns={this.columns} data={data}/>
            );
    }
}

export default FinanceSummary;
