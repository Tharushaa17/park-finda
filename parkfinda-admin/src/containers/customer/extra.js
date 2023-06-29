import React, { useState } from 'react';
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

// import ViewOperator from './Tabs/ViewOperator';
// import EditOperator from './Tabs/EditOperator';

const CustomTbodyComponent = (props) => (
	<div {...props} className={classnames('rt-tbody', props.className || [])}>
		<PerfectScrollbar options={{ suppressScrollX: true }}>
			{props.children}
		</PerfectScrollbar>
	</div>
);

export const ReactTableWithPaginationCard = (props) => {
	const { buttonLabel, className } = props;
	const [modal, setModal] = useState(false);
	const [modalView, setModalView] = useState(false);

	const toggle = () => setModal(!modal);
	const toggleView = () => setModalView(!modalView);

	const onDelete = (e) => {
		props.handleDelete(e);
	};

	const dataTableColumns = [
		{
			Header: 'Customer Id',
			accessor: 'Id',
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
			accessor: 'ContactNoMobile',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'VRN',
			accessor: 'Code',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Status',
			accessor: 'Activated',
			Cell: (props) => <p className='text-muted'>{props.value}</p>,
		},
		{
			Header: 'Action',
			accessor: 'Id',
			Cell: (props) => (
				<div>
					{/* <Button
						color='secondary'
						className='default mb-2 my-btn'
						onClick={toggleView}
					>
						<span>&#128065;</span>
					</Button>{' '}
					<Modal
						Modal
						isOpen={modalView}
						toggle={toggleView}
						wrapClassName='modal-right'
					>
						<ModalHeader toggle={toggleView}>View Operator</ModalHeader>
						<ModalBody>
							<ViewOperator />
						</ModalBody>
						<ModalFooter>
							<Button color='primary' onClick={toggleView}>
								Ok
							</Button>{' '}
						</ModalFooter>
					</Modal> */}
					{/* <Button
						color='warning'
						className='default mb-2 my-btn'
						onClick={toggleEdit}
					>
						<span>
							<i className='simple-icon-note' />{' '}
						</span>
					</Button>{' '}
					<Modal
						Modal
						isOpen={modalEdit}
						toggle={toggleEdit}
						wrapClassName='modal-right'
					>
						<ModalHeader toggle={toggleEdit}>Edit Operator</ModalHeader>
						<ModalBody>
							<EditOperator />
						</ModalBody>
						<ModalFooter>
							<Button color='primary' onClick={toggleEdit}>
								Close
							</Button>{' '}
						</ModalFooter>
					</Modal> */}
					<Link to={`/app/operator/editcustomer/${props.value}`}>
						<Button color='warning' className='default mb-2 my-btn'>
							<span>
								<i className='simple-icon-note' />{' '}
							</span>
						</Button>
					</Link>{' '}
					<Button
						color='danger'
						className='default mb-2 my-btn'
						onClick={toggle}
					>
						<span>&#x1F5D1;</span>
					</Button>{' '}
					<Modal isOpen={modal} toggle={toggle} backdrop={false}>
						<ModalHeader toggle={toggle}>Delete Data</ModalHeader>
						<ModalBody>Are You Sure?</ModalBody>
						<ModalFooter>
							<Button color='primary' onClick={(e) => onDelete(props.value)}>
								Delete
							</Button>{' '}
							<Button color='secondary' onClick={toggle}>
								Cancel
							</Button>
						</ModalFooter>
					</Modal>
				</div>
			),
		},
	];
	return (
		<Card className='mb-4'>
			<CardBody>
				<CardTitle></CardTitle>
				<ReactTable
					data={props.data}
					columns={dataTableColumns}
					defaultPageSize={5}
					showPageJump={false}
					showPageSizeOptions={false}
					PaginationComponent={DataTablePagination}
					className={'react-table-fixed-height'}
				/>
			</CardBody>
		</Card>
	);
};
