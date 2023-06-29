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
import RemittanceSearchComponent from './RemittanceSearchComponent';
import moment from 'moment';
import { connect } from 'react-redux';

class RemittanceAdviceTable extends React.Component {
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
				Header: 'Company Name',
				accessor: 'CompanyId.CompanyName',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Month',
				accessor: 'Month',
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		this.setState({ columns });
	};

	getData = () => {
		let data = [
			{
				CompanyId: 'My Car Park',
				Month: 'March',
				InvoiceNo: 'MPL111',
				Invoice: 'MP122 (PDF)',
				RemittenceAdvice: 'REMA 344 (PDF)',
			},
			{
				CompanyId: 'New Car Park',
				Month: 'March',
				InvoiceNo: 'MPL111',
				Invoice: 'MP122 (PDF)',
				RemittenceAdvice: 'REMA 344 (PDF)',
			},
			{
				CompanyId: 'My Car Park',
				Month: 'April',
				InvoiceNo: 'MPL111',
				Invoice: 'MP122 (PDF)',
				RemittenceAdvice: 'REMA 344 (PDF)',
			},
			{
				CompanyId: 'New Car Park',
				Month: 'March',
				InvoiceNo: 'MPL111',
				Invoice: 'MP122 (PDF)',
				RemittenceAdvice: 'REMA 344 (PDF)',
			},
			{
				CompanyId: 'New Car Park',
				Month: 'June',
				InvoiceNo: 'MPL111',
				Invoice: 'MP122 (PDF)',
				RemittenceAdvice: 'REMA 344 (PDF)',
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
				Header: 'Company Name',
				accessor: 'CompanyId.CompanyName',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Month',
				accessor: 'Month',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
			{
				Header: 'Invoice No',
				accessor: 'InvoiceNo',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Invoice',
				accessor: 'Invoice',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},

			{
				Header: 'Remittance Advice',
				accessor: 'RemittenceAdvice',
				roles: ['admin', 'operator'],
				Cell: (props) => <p className='text-muted'>{props.value}</p>,
			},
		];
		return (
			<>
				<div className='search-area'>
					<RemittanceSearchComponent
						data={this.props.data}
						columns={this.state.columns}
						handleSetFilteredData={this.handleSetFilteredData}
						handleSetSearchInput={this.handleSetSearchInput}
					/>
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

export default connect(mapStateToProps)(RemittanceAdviceTable);
