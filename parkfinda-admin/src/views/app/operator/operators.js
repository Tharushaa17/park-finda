import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import OperatorTable from '../../../containers/operator/OperatorTable';
import { Button } from 'reactstrap';
import {
	getOperators,
	deleteOperator,
} from '../../../services/operatorService';
import { NotificationManager } from '../../../components/common/react-notifications';

export default class Operators extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};
	
	handleDelete = async (id) => {
		const alloperators = this.state.records;
		const operators = alloperators.filter((m) => m._id !== id);
		this.setState({ records: operators });
		try {
			await deleteOperator(id);
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
			this.setState({ records: alloperators });
		}
	};
	async componentDidMount() {
		const { data: operators } = await getOperators();
		this.setState({ records: operators });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.operator-list' match={this.props.match} />
						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='menu.operator-list' />
							<Button
								color='info'
								className='default mb-2'
								style={{ float: 'right' }}
								onClick={() => {
									this.props.history.push('addoperator');
								}}
							>
								<IntlMessages id='Add New Operator' />
							</Button>
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<OperatorTable
							data={this.state.records}
							handleDelete={this.handleDelete}
						/>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
