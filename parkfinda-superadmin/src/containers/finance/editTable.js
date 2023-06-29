import React, { Component } from 'react';
import ReactTable from 'react-table';


class EditTable extends Component {
     columns =  [
        {
            Header : "Date"
        },
        {
            Header : "Description"
        },
        {
            Header : "Payment type"
        },
        {
            Header : "Receivable"
        },
        {
            Header : "Payment Recived"
        },
        {
            Header : "Outstanding"
        }
    ];
    render() {
        return (
                <ReactTable columns={this.columns}/>
            );
    }
}

export default EditTable;
