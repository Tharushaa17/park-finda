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
import EnforcementSearchComponent from './EnforcementSearchComponent';
import moment from 'moment';
// import ViewOperator from './Tabs/ViewOperator';
// import EditOperator from './Tabs/EditOperator';

export default class EnforcementTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			filteredData: [],
			columns: [],
			searchInput: '',
		};
	}

	componentDidMount() {
		this.getData();
		this.getColumns();
	}

	getColumns = () => {
		let columns = [
			{
				Header: 'Location',
				accessor: 'Location',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'VRN',
				accessor: 'Code',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		this.setState({ columns });
	};

	getData = () => {
		let data = [
			{
				Location: 'Colombo',
				Code: 'L726',
				StartDate: '2021-06-11',
				EndDate: '2021-06-14',
				Duration: '5h 10m',
			},
			{
				Location: 'Colombo',
				Code: 'L726',
				StartDate: '2021-06-13',
				EndDate: '2021-06-16',
				Duration: '5h 10m',
			},
			{
				Location: 'Elia',
				Code: 'L726',
				StartDate: '2021-06-14',
				EndDate: '2021-06-19',
				Duration: '5h 10m',
			},
		];
		this.setState({ data });
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

	render() {
		let { data, filteredData, columns, searchInput } = this.state;
		const dataToDisplay = searchInput.length ? filteredData : data;
		let dataTableColumns = [
			{
				Header: 'Location',
				accessor: 'Location',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'VRN',
				accessor: 'Code',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Booking Start',
				accessor: 'StartDate',
				Cell: (props) => (
					<p className='text-muted'>
						{moment(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},
			{
				Header: 'Booking End',
				accessor: 'EndDate',
				Cell: (props) => (
					<p className='text-muted'>
						{moment(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},

			{
				Header: 'Duration',
				accessor: 'Duration',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		return (
			<Card className='mb-4'>
				
					<EnforcementSearchComponent
						data={this.state.data}
						columns={this.state.columns}
						handleSetFilteredData={this.handleSetFilteredData}
						handleSetSearchInput={this.handleSetSearchInput}
					/>
					<br />
					<br />
					<ReactTable
						data={dataToDisplay}
						columns={dataTableColumns}
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
