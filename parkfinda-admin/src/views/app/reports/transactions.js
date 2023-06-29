import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import TransactionTable from '../../../containers/reports/TransactionTable';
import { getTransactions } from '../../../services/TransactionService';

export default class Transactions extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};

	async componentDidMount() {
		const { data: transactions } = await getTransactions();
		this.setState({ records: transactions });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.transactions' match={this.props.match} />

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='menu.transactions' />
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<TransactionTable
							data={this.state.records}
							
						/>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
