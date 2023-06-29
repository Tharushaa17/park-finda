import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import SeasonCustomerTable from '../../../containers/season-customer/SeasonCustomerTable';
import { Button } from 'reactstrap';
import {
	getSeasonCustomers,
	deleteSeasonCustomer,
} from '../../../services/seasonCustomersService';
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
			await deleteSeasonCustomer(id);
			NotificationManager.success(
				'Record Deleted',
				'Done',
				3000,
				null,
				null,
				''
			);
			console.log('Record Successfully deleted.');
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				console.log('The record has already been deleted');
			}
			this.setState({ records: allcustomers });
		}
	};
	async componentDidMount() {
		const { data: customers } = await getSeasonCustomers();
		this.setState({ records: customers });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb
							heading='menu.season-customers'
							match={this.props.match}
						/>

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='menu.season-customers' />
							<Button
								color='info'
								className='default mb-2'
								style={{ float: 'right' }}
								onClick={() => {
									this.props.history.push('add-season-customer');
								}}
							>
								<IntlMessages id='Add Season Customer' />
							</Button>
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<SeasonCustomerTable
							data={this.state.records}
							handleDelete={this.handleDelete}
						/>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
