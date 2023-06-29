import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody, Row } from 'reactstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactTable from 'react-table';
import classnames from 'classnames';
import IntlMessages from '../../helpers/IntlMessages';
import DataTablePagination from '../../components/DatatablePagination';
import '../../assets/customstyle.css';
import TransactionSearchComponent from './TransactionSearchComponent';
import moment from 'moment';
import { connect } from 'react-redux';
import { getCarparks } from '../../services/carparkService';

class TransactionTable extends React.Component {
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
				Header: 'Company',
				accessor: 'CompanyId.CompanyName',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Location',
				accessor: 'CarParkId.CarParkName',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Booking Start',
				accessor: 'ParkingSession.BookingStart',
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},
			{
				Header: 'Booking End',
				accessor: 'ParkingSession.BookingEnd',
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},
		];
		this.setState({ columns });
	};

	getData = () => {
		let data = [
			{
				SettlementDate: '2021-06-11',
				BookingId: '01111',
				Company: 'My Carpark',
				Location: 'Elia',
				Code: 'L726',
				StartDate: '2021-06-11',
				EndDate: '2021-06-14',
				PaymentMethod: 'Visa',
				ParkingType: 'Parking Now',
				ParkingFees: '20.20',
				MCPGross: '5.00',
				ClientGross: '15.20',
			},
			{
				SettlementDate: '2021-06-13',
				BookingId: '01111',
				Company: 'New Carpark',
				Location: 'Colombo',
				Code: 'L726',
				StartDate: '2021-06-13',
				EndDate: '2021-06-16',
				PaymentMethod: 'Visa',
				ParkingType: 'Parking Now',
				ParkingFees: '20.20',
				MCPGross: '5.00',
				ClientGross: '15.20',
			},
			{
				SettlementDate: '2021-06-14',
				BookingId: '01111',
				Company: 'New Carpark',
				Location: 'Elia',
				Code: 'L726',
				StartDate: '2021-06-14',
				EndDate: '2021-06-19',
				PaymentMethod: 'Visa',
				ParkingType: 'Parking Now',
				ParkingFees: '20.20',
				MCPGross: '5.00',
				ClientGross: '15.20',
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
		let { filteredData, columns, searchInput } = this.state;
		let data = this.props.data;
		const dataToDisplay = searchInput.length ? filteredData : data;
		let dataTableColumns = [
			{
				Header: 'Settlement Date',
				accessor: 'ParkingSession.CreatedAt',
				roles: ['admin', 'operator'],
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},
			{
				Header: 'Booking Id',
				accessor: 'ParkingSession.BookingId',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='list-item-heading'>{props.value}</p>,
			},
			{
				Header: 'Company',
				accessor: 'CompanyId.CompanyName',
				roles: ['admin'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Location',
				accessor: 'CarParkId.CarParkName',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'VRN',
				accessor: 'ParkingSession.VRN',
				roles: ['admin'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Booking Start',
				accessor: 'ParkingSession.BookingStart',
				roles: ['admin'],
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD   hh:mm a')}
					</p>
				),
			},
			{
				Header: 'Booking End',
				accessor: 'ParkingSession.BookingEnd',
				roles: ['admin'],
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD   hh:mm a')}
					</p>
				),
			},
			{
				Header: 'Payment Method',
				accessor: 'PaymentType.Name',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Parking Type',
				accessor: 'ParkingSession.ParkingType',
				roles: ['admin'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Parking Fee',
				accessor: 'CarParkGrossFee',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'MCP Gross',
				accessor: 'MCPFee',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Client Gross',
				accessor: 'CarParkNetFee',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		return (
			<>
				<div className='search-area'>
					<TransactionSearchComponent
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

export default connect(mapStateToProps)(TransactionTable);
