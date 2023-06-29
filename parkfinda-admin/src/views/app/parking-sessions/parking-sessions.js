import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import ParkingTable from '../../../containers/parking-sessions/ParkingTable';
import { getParkings } from '../../../services/parkingSessionService';

export default class Customers extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};
	
	async componentDidMount() {
		const { data: parkings } = await getParkings();
		this.setState({ records: parkings });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.bookings' match={this.props.match} />

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<Colxx xxs='12' className='mb-4'>
						<p>
							<IntlMessages id='menu.bookings' />
						</p>
					</Colxx>
					<Colxx xxs='12'>
						<ParkingTable data={this.state.records} />
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}
