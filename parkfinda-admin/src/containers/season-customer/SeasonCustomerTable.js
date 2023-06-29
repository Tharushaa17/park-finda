import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	Card,
	CardBody,
	CardTitle,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactTable from 'react-table';
import classnames from 'classnames';
import IntlMessages from '../../helpers/IntlMessages';
import DataTablePagination from '../../components/DatatablePagination';
import '../../assets/customstyle.css';
import GlobalSearchComponent from './GlobalSearchComponent';
import moment from 'moment';
import { getCarparks } from '../../services/carparkService';
import Dropdown from '../../components/Dropdown';

export default class SeasonCustomerTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			filteredData: [],
			columns: [],
			searchInput: '',
			CarParks: [],
			modal: false,
		};
	}

	// onDelete = (e) => {
	// 	this.props.handleDelete(e);
	// 	this.toggle();
	// };
	// toggle() {
	// 	this.setState({
	// 		modal: !this.state.modal,
	// 	});
	// }

	async populateCarParks() {
		const { data: CarParks } = await getCarparks();
		this.setState({ CarParks: CarParks });
	}
	componentDidMount() {
		this.getColumns();
		this.populateCarParks();
	}

	getColumns = () => {
		let columns = [
			{
				Header: 'VRN',
				accessor: 'VRN',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Booking Start',
				accessor: 'BookingStart',
				Cell: (props) => (
					<p className='text-muted'>
						{moment(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},
			{
				Header: 'Booking End',
				accessor: 'BookingEnd',
				Cell: (props) => (
					<p className='text-muted'>
						{moment(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},
			{
				Header: 'Location',
				accessor: 'CarParkId.CarParkName',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		this.setState({ columns });
	};

	handleSetData = (data) => {
		console.log(data);
		this.setState({ data });
	};

	handleSetFilteredData = (filteredData) => {
		this.setState({ filteredData });
	};

	handleSetSearchInput = (searchInput) => {
		this.setState({ searchInput });
	};
	dataTableColumns = [
		{
			Header: 'Name',
			accessor: 'Driver',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Location',
			accessor: 'CarParkId.CarParkName',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'VRN',
			accessor: 'VRN',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Booking Start',
			accessor: 'BookingStart',
			Cell: (props) => (
				<p className='text-muted'>{moment(props.value).format('YYYY-MM-DD')}</p>
			),
		},
		{
			Header: 'Booking End',
			accessor: 'BookingEnd',
			Cell: (props) => (
				<p className='text-muted'>{moment(props.value).format('YYYY-MM-DD')}</p>
			),
		},
		{
			Header: 'Amount',
			accessor: 'Amount',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},

		{
			Header: 'Status',
			accessor: 'Status',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Action',
			accessor: '_id',
			Cell: (props) => (
				<div>
					<Dropdown
						value={props.value}
						link={'/app/season-customer/edit-season-customer'}
						toggle={this.toggle}
						handleDelete={this.props.handleDelete}
					></Dropdown>
				</div>
			),
		},
	];
	render() {
		let { filteredData, columns, searchInput } = this.state;
		let data = this.props.data;
		const dataToDisplay = searchInput.length ? filteredData : data;

		return (
			<>
				<div className='search-area'>
					<GlobalSearchComponent
						data={this.props.data}
						columns={this.state.columns}
						handleSetFilteredData={this.handleSetFilteredData}
						handleSetSearchInput={this.handleSetSearchInput}
					/>
				</div>
				<Card className='mb-4'>
					
						<br />
						<br />
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
