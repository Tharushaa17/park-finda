import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import RefundTable from '../../../containers/refund/RefundTable';
import { getRefunds } from '../../../services/refundService';

export default class Refunds extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};

	async componentDidMount() {
		const { data: refunds } = await getRefunds();
		this.setState({ records: refunds });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.refunds' match={this.props.match} />

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='menu.refunds' />
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<RefundTable
							data={this.state.records}
							handleDelete={this.handleDelete}
						/>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
