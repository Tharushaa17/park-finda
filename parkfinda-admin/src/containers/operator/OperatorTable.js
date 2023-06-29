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
import Dropdown from '../../components/Dropdown';
import { connect } from 'react-redux';

class OperatorTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
	dataTableColumns = [
		{
			Header: 'Company',
			accessor: 'CompanyId.CompanyName',
			roles: ['admin'],
			Cell: (props) => <p className='list-item-heading'>{props.value}</p>,
		},
		{
			Header: 'First Name',
			accessor: 'FirstName',
			roles: ['admin', 'operator'],
			Cell: (props) => <p className='list-item-heading'>{props.value}</p>,
		},
		{
			Header: 'Last Name',
			accessor: 'LastName',
			roles: ['admin', 'operator'],
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Email',
			accessor: 'Email',
			roles: ['admin', 'operator'],
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Role',
			accessor: 'Role',
			roles: ['admin', 'operator'],
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},

		{
			Header: 'Action',
			accessor: '_id',
			roles: ['admin', 'operator'],
			Cell: (props) => (
				<div>
					<Dropdown
						value={props.value}
						link={'/app/operator/editoperator'}
						toggle={this.toggle}
						handleDelete={this.props.handleDelete}
					></Dropdown>
					{/* <Modal
						isOpen={this.state.modal}
						toggle={this.toggle}
						backdrop={false}
					>
						<ModalHeader toggle={this.toggle}></ModalHeader>
						<ModalBody>
							<div className='delete-alert'>
								Are you Sure you want to delete this customer
							</div>
							<div className='delete-img mt-3'>
								<img src='https://img.icons8.com/dotty/80/000000/delete-forever.png' />
							</div>
						</ModalBody>
						<ModalFooter>
							<div className='btn-center d-flex mcp-min-width-10x'>
								<div className='mcp-cancel-btn mr-2'>
									<Button color='secondary' onClick={this.toggle}>
										No
									</Button>
								</div>{' '}
								<Button
									color='primary'
									onClick={(e) => this.onDelete(props.value)}
								>
									Yes
								</Button>
							</div>
						</ModalFooter>
					</Modal> */}
				</div>
			),
		},
	];

	render() {
		return (
			<Card className='mb-4'>
			
					<ReactTable
						data={this.props.data}
						columns={this.dataTableColumns.filter(
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
		);
	}
}
const mapStateToProps = ({ authUser }) => {
	return {
		authUser,
	};
};

export default connect(mapStateToProps)(OperatorTable);
