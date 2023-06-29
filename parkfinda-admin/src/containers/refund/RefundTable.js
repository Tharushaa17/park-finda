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

export default class RefundTable extends React.Component {
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
				Header: 'Booking Date',
				accessor: 'ParkingSession.CreatedAt',
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD')}
					</p>
				),
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

			{
				Header: 'Parking Type',
				accessor: 'ParkingSession.ParkingType',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Booking Rank',
				accessor: 'BookingRank',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		this.setState({ columns });
	};

	getData = () => {
		let data = [
			{
				BookingDate: '2021-06-15',
				BookingId: '2055454',
				Company: 'Name',
				Location: 'Location1',
				StartDate: '2021-06-15',
				EndDate: '2021-06-16',
				VRN: 'LE344',
				Parkingfee: '55',
				PaymentType: 'VISA',
				ParkingType: 'Park Now',
				BookingRank: 'Current',
				BookFrom: 'Web',
			},
			{
				BookingDate: '2021-06-16',
				BookingId: '2055454',
				Company: 'Name',
				Location: 'Colombo',
				StartDate: '2021-06-16',
				EndDate: '2021-06-17',
				VRN: 'LE344',
				Parkingfee: '55',
				PaymentType: 'VISA',
				ParkingType: 'Park Now',
				BookingRank: 'Current',
				BookFrom: 'Web',
			},
			{
				BookingDate: '2021-06-16',
				BookingId: '2055454',
				Company: 'Name',
				Location: 'New Town',
				StartDate: '2021-06-17',
				EndDate: '2021-06-20',
				VRN: 'LE344',
				Parkingfee: '55',
				PaymentType: 'VISA',
				ParkingType: 'Park Later',
				BookingRank: 'Current',
				BookFrom: 'Web',
			},
			{
				BookingDate: '2021-06-16',
				BookingId: '2055454',
				Company: 'Name',
				Location: 'Location1',
				StartDate: '2021-06-16',
				EndDate: '2021-06-18',
				VRN: 'LE344',
				Parkingfee: '55',
				PaymentType: 'VISA',
				ParkingType: 'Park Now',
				BookingRank: 'Current',
				BookFrom: 'APP',
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
				Header: 'Booking Date',
				accessor: 'ParkingSession.CreatedAt',
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD')}
					</p>
				),
			},
			{
				Header: 'Booking Id',
				accessor: 'ParkingSession.BookingId',
				Cell: (props) => <p className='list-item-heading'>{props.value}</p>,
			},
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
						{moment.parseZone(props.value).format('YYYY-MM-DD hh:mm a')}
					</p>
				),
			},
			{
				Header: 'Booking End',
				accessor: 'ParkingSession.BookingEnd',
				Cell: (props) => (
					<p className='text-muted'>
						{moment.parseZone(props.value).format('YYYY-MM-DD hh:mm a')}
					</p>
				),
			},
			{
				Header: 'VRN',
				accessor: 'ParkingSession.VRN',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Parking Fee',
				accessor: 'ParkingSession.ParkingFee',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Payment Type',
				accessor: 'PaymentType.Name',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Parking Type',
				accessor: 'ParkingSession.ParkingType',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Booking Rank',
				accessor: 'BookingRank',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Book From',
				accessor: 'BookingFrom',
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
			</>
		);
	}
}
