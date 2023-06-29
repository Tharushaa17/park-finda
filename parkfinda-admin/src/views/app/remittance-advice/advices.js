import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import RemittanceAdviceTable from '../../../containers/advice/RemittanceAdviceTable';
import { getAdvices } from '../../../services/RemittanceAdviceService';

export default class Advices extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};

	async componentDidMount() {
		const { data: advices } = await getAdvices();
		this.setState({ records: advices });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.advices' match={this.props.match} />

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='menu.advices' />
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<RemittanceAdviceTable data={this.state.records} />
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
