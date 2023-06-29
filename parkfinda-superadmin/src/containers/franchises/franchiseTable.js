import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import data from "../../data/franchiseData.json";
import Buttons from '../../views/app/button';


class FranchiseTable extends Component {
     columns =  [
        {
            Header : "Country",
            accessor: 'country',
        },
        {
            Header : "Customer No",
            accessor: 'customer_no',
        },
        {
            Header : "Compony Name",
            accessor: 'compony_name',
        },
        {
            Header : "Address",
            accessor: 'address',
        },
        {
            Header : "Contact Person",
            accessor: 'contact_person',
        },
        {
            Header : "Telephone",
            accessor: 'telephone',
        },
        {
            Header : "Mobile",
            accessor: 'mobile',
        },
        {
            Header : "Email",
            accessor: 'email',
        },
        {
            Header : "Commision (%)",
            accessor: 'commision',
        },
        {
            Header : "Service Fee (%)",
            accessor: 'service_fee',
        },
        {
            Header : "Service Charge (%)",
            accessor: 'service_charge',
        },
        {
            Header : "Actions",
            accessor: '_id',
            Cell: () => {
                return (
                <div className='d-flex'>
                    <Link to='/app/franchises/edit' >
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

export default FranchiseTable;
