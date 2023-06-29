import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import EnforcementTable from '../../../containers/enforcement/EnforcementTable';
import { getEnforcements } from '../../../services/enforcementsService';

export default class Enforcements extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};

	async componentDidMount() {
		const { data: enforcements } = await getEnforcements();
		this.setState({ records: enforcements });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.enforcements' match={this.props.match} />

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='Enforcements List' />
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<EnforcementTable
							data={this.state.records}
							handleDelete={this.handleDelete}
						/>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
