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
import RevenueSearchComponent from './RevenueSearchComponent';
import moment from 'moment';
import { connect } from 'react-redux';
import { getCarparks } from '../../services/carparkService';

class RefundTable extends React.Component {
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
		this.getColumns();
	}

	getColumns = () => {
		let columns = [
			{
				Header: 'Period',
				accessor: 'Period',
				Cell: (props) => (
					<p className='text-muted'>{moment(props.value).format('MMMM-DD')}</p>
				),
			},
			{
				Header: 'Location',
				accessor: 'CarParkId.CarParkName',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Company',
				accessor: 'CompanyId.CompanyName',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		this.setState({ columns });
	};

	handleSetData = (data) => {
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
				Header: 'Period',
				accessor: 'Period',
				roles: ['admin'],
				Cell: (props) => (
					<p className='text-muted'>{moment(props.value).format('MMMM-DD')}</p>
				),
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
				Header: 'Sessions',
				accessor: 'Sessions',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'TPR Park Now',
				accessor: 'TPRParkNow',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'TPR Park Later',
				accessor: 'TPRParkLater',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Service Fee',
				accessor: 'ServiceFee',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'MCP Fee Park Now',
				accessor: 'MCPParkNow',
				roles: ['admin'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'MCP Fee Park Later',
				accessor: 'MCPParkLater',
				roles: ['admin'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Management Fee',
				accessor: 'ManagementFee',
				roles: ['admin'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'MCP Gross',
				accessor: 'MCPGross',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Client Gross',
				accessor: 'ClientGross',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Client Payable',
				accessor: 'ClientPayable',
				roles: ['admin'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		return (
			<>
				<div className='search-area'>
					<RevenueSearchComponent
						data={this.props.data}
						columns={this.state.columns}
						handleSetFilteredData={this.handleSetFilteredData}
						handleSetSearchInput={this.handleSetSearchInput}
					/>
				</div>
				<div className='widget-card'>
					<div className='row offset-lg-1'>
						<div className='col-md-3 col-sm-12 mt-2'>
							<div className='numeric'>
								£ 589,00
								<span>Total Revenue</span>
							</div>
						</div>
						<div className='col-md-3 col-sm-12 mt-2'>
							<div className='numeric'>
								£ 589,00
								<span>MCP Gross</span>
							</div>
						</div>
						<div className='col-md-3 col-sm-12 mt-2'>
							<div className='numeric'>
								£ 589,00
								<span>Client Gross</span>
							</div>
						</div>
						<div className='col-md-3 col-sm-12 mt-2'>
							<div className='numeric'>
								650
								<span>Sessions</span>
							</div>
						</div>
					</div>
				</div>
				<Card className='mb-4'>
					
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

export default connect(mapStateToProps)(RefundTable);
