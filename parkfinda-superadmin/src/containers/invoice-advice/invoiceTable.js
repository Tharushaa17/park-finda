import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import data from "../../data/invoiceData.json";
import Buttons from '../../views/app/button';


class InvoiceTable extends Component {
     columns =  [
        {
            Header : "Month",
             accessor: 'month',
        },
        {
            Header : "Company",
             accessor: 'company',
        },
        {
            Header : "CIF No",
             accessor: 'cif_no',
        },
        {
            Header : "Receivable",
             accessor: 'receivable',
        },
        {
            Header : "Outstanding",
             accessor: 'outstanding',
        },
        {
            Header : "Invoice",
             accessor: 'invoice',
        },
        {
            Header : "Actions",
            accessor: '_id',
            Cell: () => {
                return (
                <div className='d-flex'>
                    <Link to='/app/finance/edit' >
                        <Buttons type="link" size="xs" color="primary" value="Edit" class="fa fa-pencil-square-o" />
                    </Link>
                </div>
                )
            }
        }
    ];
    render() {
        return (
                <ReactTable columns={this.columns} data={data}/>
            );
    }
}

export default InvoiceTable;
