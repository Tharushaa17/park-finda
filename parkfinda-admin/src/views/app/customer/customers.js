import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import CustomerTable from '../../../containers/customer/CustomerTable';
import { Button } from 'reactstrap';
import {
	getCustomers,
	deleteCustomer,
} from '../../../services/customerService';
import { NotificationManager } from '../../../components/common/react-notifications';

export default class Customers extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};

	handleDelete = async (id) => {
		const allcustomers = this.state.records;
		const customers = allcustomers.filter((m) => m._id !== id);
		this.setState({ records: customers });
		try {
			await deleteCustomer(id);
			NotificationManager.success(
				'Record Deleted',
				'Done',
				3000,
				null,
				null,
				''
			);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				console.log('The record has already been deleted');
			}
			this.setState({ records: allcustomers });
		}
	};
	async componentDidMount() {
		const { data: customers } = await getCustomers();
		this.setState({ records: customers });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.customers' match={this.props.match} />

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='menu.customers' />
							<Button
								color='info'
								className='default mb-2'
								style={{ float: 'right' }}
								onClick={() => {
									this.props.history.push('addcustomer');
								}}
							>
								<IntlMessages id='Add Customer' />
							</Button>
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<CustomerTable
							data={this.state.records}
							handleDelete={this.handleDelete}
						/>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
