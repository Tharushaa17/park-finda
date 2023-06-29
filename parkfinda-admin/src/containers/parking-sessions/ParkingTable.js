import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody, CardTitle, Button, Row } from 'reactstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactTable from 'react-table';
import classnames from 'classnames';
import IntlMessages from '../../helpers/IntlMessages';
import DataTablePagination from '../../components/DatatablePagination';
import '../../assets/customstyle.css';
import GlobalSearchComponent from './GlobalSearchComponent';
import moment from 'moment';
import { connect } from 'react-redux';
import { getCarparks } from '../../services/carparkService';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';

class ParkingTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			filteredData: [],
			columns: [],
			searchInput: '',
			currentDateTime: Date().toLocaleString(),
		};
	}

	componentDidMount() {
		this.getColumns();
	}

	getColumns = () => {
		let columns = [
			{
				Header: 'Status',
				accessor: 'Status',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Location',
				accessor: 'CarParkId.CarParkName',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Booking Start',
				accessor: 'BookingStart',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},
			{
				Header: 'Booking End',
				accessor: 'BookingEnd',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},

			{
				Header: 'Parking Type',
				accessor: 'ParkingType',
				roles: ['admin', 'operator', 'enforcer'],
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

	render() {
		let { filteredData, columns, searchInput } = this.state;
		let data = this.props.data;
		const dataToDisplay = searchInput.length ? filteredData : data;
		let dataTableColumns = [
			{
				Header: 'Booking Id',
				accessor: 'BookingId',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => <p className='list-item-heading'>{props.value}</p>,
			},

			{
				Header: 'Status',
				accessor: 'Status',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: ({ original }) => {
					var startDate = moment
						.parseZone(original.BookingStart)
						.format('YYYY-MM-DD hh:mm');
					var endDate = moment
						.parseZone(original.BookingEnd)
						.format('YYYY-MM-DD hh:mm');

					var currentDate = moment
						.parseZone(this.state.currentDateTime)
						.format('YYYY-MM-DD hh:mm');

					if (original.Status == 'success') {
						if (currentDate > endDate) {
							return <p className='text-muted'>Completed</p>;
						} else if (startDate > currentDate) {
							return <p className='text-muted'>Future</p>;
						} else {
							return <p className='text-muted'>InHouse</p>;
						}
					} else {
						return <p className='text-muted'>Cancelled</p>;
					}
				},
			},
			{
				Header: 'Customer Name',
				accessor: 'Customer.CustomerName',
				roles: ['admin'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Location',
				accessor: 'CarParkId.CarParkName',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'VRN',
				accessor: 'VRN',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Booking Start',
				accessor: 'BookingStart',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD ,	h:mm a')}
					</p>
				),
			},
			{
				Header: 'Booking End',
				accessor: 'BookingEnd',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD ,	h:mm a')}
					</p>
				),
			},

			{
				Header: 'Duration',
				accessor: 'Duration',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Parking Fee',
				accessor: 'ParkingFee',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Parking Type',
				accessor: 'ParkingType',
				roles: ['admin', 'operator', 'enforcer'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];

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
							columns={dataTableColumns.filter(
								(item) =>
									item.roles && item.roles.includes(this.props.authUser.role)
							)}
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
const mapStateToProps = ({ authUser }) => {
	return {
		authUser,
	};
};

export default connect(mapStateToProps)(ParkingTable);
