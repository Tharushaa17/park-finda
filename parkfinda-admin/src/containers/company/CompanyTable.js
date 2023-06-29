import React from 'react';
import {
	Card,
	CardBody,
} from 'reactstrap';
import ReactTable from 'react-table';
import DataTablePagination from '../../components/DatatablePagination';
import '../../assets/customstyle.css';
import { connect } from 'react-redux';
import Dropdown from '../../components/Dropdown';

class CompanyTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
		};
	}

	dataTableColumns = [
		{
			Header: 'Company Name',
			accessor: 'CompanyName',
			Cell: (props) => <p className='list-item-heading'>{props.value}</p>,
		},

		{
			Header: 'Address',
			accessor: 'AddressLineOne',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Contact Person',
			accessor: 'Owner.FirstName' && 'Owner.LastName',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Contact Number',
			accessor: 'ContactNo',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Email',
			accessor: 'CompanyEmail',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},

		{
			Header: 'Payment Gateway',
			accessor: 'Paymentgateway.Name',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Number of Locations',
			accessor: 'NumberofLocations',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Action',
			accessor: '_id',
			Cell: (props) => (
				<div>
					<Dropdown
						value={props.value}
						link={'/app/company/editcompany'}
						toggle={this.toggle}
						handleDelete={this.props.handleDelete}
					></Dropdown>
				</div>
			),
		},
	];

	render() {
		return (
			<Card className='mb-4'>
			
					<ReactTable
						data={this.props.data}
						columns={this.dataTableColumns}
						defaultPageSize={5}
						showPageJump={false}
						showPageSizeOptions={false}
						PaginationComponent={DataTablePagination}
						className={'react-table-fixed-height'}
					/>
			
			</Card>
		);
	}
}
const mapStateToProps = ({ authUser }) => {
	return {
		authUser,
	};
};

export default connect(mapStateToProps)(CompanyTable);
