import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import { getEnforcements } from '../../../services/enforcementsService';
import { SmallLineChart } from '../../../components/charts';
import { getParkings } from '../../../services/parkingSessionService';
import Card from './Card';
import moment from 'moment';

import {
	smallChartData1,
} from '../../../data/charts';
export default class OperatorDashboard extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
		carParkRecords: [],
	};

	async componentDidMount() {
		const { data: enforcements } = await getEnforcements();
		this.setState({ records: enforcements });
	}
	async componentDidMount() {
		const { data: parkings } = await getParkings();
		this.setState({ carParkRecords: parkings });
	}

	render() {
		var today = moment
			.parseZone(Date().toLocaleString())
			.format('MMMM DD YYYY');
		return (
			<Fragment>
				<div className='row border-bottom'>
					<div className='col '>
						<div className='heading'>Dashboard</div>
					</div>
				</div>

				<div className='row mt-3 operator-widgets-wrapper'>
					<div className='col-lg-4'>
						<div className='widget-card-dashboard height-auto'>
							<div className='row'>
								<div className='col-lg-8'>
									<SmallLineChart data={smallChartData1} />
								</div>
								<div className='col-lg-4'>
									<div className='numeric mt-5 text-center'>
										£ 589,00<span>Total Revenue</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-lg-4'>
						<div className='widget-card-dashboard height-auto'>
							<div className='row'>
								<div className='col-lg-8'>
									<SmallLineChart data={smallChartData1} />
								</div>
								<div className='col-lg-4'>
									<div className='numeric mt-5 text-center'>
										£ 589,00<span>MCP Gross</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-lg-4'>
						<div className='widget-card-dashboard height-auto'>
							<div className='row'>
								<div className='col-lg-8'>
									<SmallLineChart data={smallChartData1} />
								</div>
								<div className='col-lg-4'>
									<div className='numeric mt-5 text-center'>
										78<span>Total Bookings</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='row mt-3'>
					<div className='col-lg-12'>
						<div className='status-card'>
							<div className='status-text'>Today’s Bookings List - {today}</div>
						</div>
					</div>
				</div>

				<div className='carpark-title mt-4 mb-3'>Sherwood Court Car Park</div>
				<Row>
					<Card data={this.state.carParkRecords} />
				</Row>
			</Fragment>
		);
	}
}
