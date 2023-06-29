import React, { Component } from 'react';
import ReactTable from 'react-table';


class TeamsUser extends Component {
     columns =  [
        {
            Header : "User ID",
            accessor: 'user_id',
        },
        {
            Header : "First Name",
            accessor: 'first_name',
        },
        {
            Header : "Last Name",
            accessor: 'last_name',
        },
        {
            Header : "Username",
            accessor: 'username',
        },
        {
            Header : "Email",
            accessor: 'email',
        },
        {
            Header : "Role",
            accessor: 'role',
        },
    ];
    render() {
        return (
                <ReactTable columns={this.columns}/>
            );
    }
}

export default TeamsUser;
