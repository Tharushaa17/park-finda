import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import RevenueTable from '../../../containers/reports/RevenueTable';
import { getRevenues } from '../../../services/RevenueService';

export default class Revenue extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};

	async componentDidMount() {
		const { data: revenues } = await getRevenues();
		this.setState({ records: revenues });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.revenue' match={this.props.match} />

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='menu.revenue' />
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<RevenueTable
							data={this.state.records}
						
						/>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
