import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	Card,
	CardBody,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactTable from 'react-table';
import classnames from 'classnames';
import IntlMessages from '../../helpers/IntlMessages';
import DataTablePagination from '../../components/DatatablePagination';
import Dropdown from '../../components/Dropdown';
import '../../assets/customstyle.css';
import GlobalSearchComponent from './GlobalSearchComponent';

export default class CustomerTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			filteredData: [],
			columns: [],
			searchInput: '',
			modal: false,
		};
	}

	componentDidMount() {
		this.getColumns();
	}

	getColumns = () => {
		let columns = [
			{
				Header: 'Customer',
				accessor: 'CustomerName',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Email',
				accessor: 'Email',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Contact No',
				accessor: 'MobileNum',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		this.setState({ columns });
	};

	handleSetData = (data) => {
		console.log(data);
		this.setState({
			data: data.map((d) => {
				d.menu = false;
				return d;
			}),
		});
	};

	handleSetFilteredData = (filteredData) => {
		this.setState({ filteredData });
	};

	handleSetSearchInput = (searchInput) => {
		this.setState({ searchInput });
	};

	dataTableColumns = [
		{
			Header: 'Customer Id',
			accessor: 'CustomerId',
			Cell: (props) => <p className='list-item-heading'>{props.value}</p>,
		},
		{
			Header: 'Customer',
			accessor: 'CustomerName',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Email',
			accessor: 'Email',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Contact No',
			accessor: 'MobileNum',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'VRN',
			accessor: 'Vehicles',
			Cell: (props) =>
				props.value.map((item) => (
					<div>
						<span>{item.VRN}</span>
					</div>
				)),
		},
		{
			Header: 'Status',
			accessor: 'Status',
			Cell: (props) => {
				if (props.value) {
					return <p className='text-muted'>Active</p>;
				} else {
					return <p className='text-muted'>Blocked</p>;
				}
			},
		},
		{
			Header: 'Action',
			accessor: '_id',
			Cell: (props) => {
				return (
					<div>
						<Dropdown
							value={props.value}
							link={'/app/customer/editcustomer'}
							toggle={this.toggle}
							handleDelete={this.props.handleDelete}
						></Dropdown>
					</div>
				);
			},
		},
	];
	render() {
		let { filteredData, columns, searchInput } = this.state;
		let data = this.props.data;

		const dataToDisplay = searchInput.length ? filteredData : data;

		return (
			<>
				<div className='search-area height-9x'>
					<GlobalSearchComponent
						data={this.props.data}
						columns={this.state.columns}
						handleSetFilteredData={this.handleSetFilteredData}
						handleSetSearchInput={this.handleSetSearchInput}
					/>
				</div>

				<Card className='mb-4'>
						<ReactTable
							data={dataToDisplay}
							columns={this.dataTableColumns}
							defaultPageSize={5}
							showPageJump={false}
							showPageSizeOptions={false}
							PaginationComponent={DataTablePagination}
							className={'react-table-fixed-height'}
						/>
				</Card>
			</>
		);
	}
}
