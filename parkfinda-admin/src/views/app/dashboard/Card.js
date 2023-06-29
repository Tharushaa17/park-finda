import React from 'react';
import moment from 'moment';

export default function Card(props) {
	var parkings = props.data.filter((park) => {
		if (
			moment.parseZone(park.CreatedAt).format('YYYY-MM-DD') ==
			moment.parseZone(Date().toLocaleString()).format('YYYY-MM-DD')
		) {
			return park;
		}
	});
	const setStatus = (status, sDate, eDate) => {
		var startDate = moment.parseZone(sDate).format('YYYY-MM-DD hh:mm');
		var endDate = moment.parseZone(eDate).format('YYYY-MM-DD hh:mm');

		var currentDate = moment
			.parseZone(Date().toLocaleString())
			.format('YYYY-MM-DD hh:mm');

		if (status == 'success') {
			if (currentDate > endDate) {
				return 'Completed';
			} else if (startDate > currentDate) {
				return 'Future';
			} else {
				return 'InHouse';
			}
		} else {
			return 'Cancelled';
		}
	};

	const eventsList = parkings.map((event) => (
		<div className='col-lg-3' style={{ float: 'left', marginTop: '4vh' }}>
			<div className='widget-card-dashboard-no-padding height-auto'>
				<div className='card-o-head d-flex justify-content-between'>
					<div className='o-id'>{event.BookingId}</div>
					<div className='o-status-label'>
						{setStatus(event.Status, event.BookingStart, event.BookingEnd)}
					</div>
				</div>
				<div className='o-body'>
					<div className='o-data '>
						<div className='glyph-icon iconsminds-geo2 d-flex'>
							<div className='value mr-4'> {event.CarParkId.AddressLine1}</div>
						</div>
					</div>
					<div className='o-data mt-2'>
						<div className='glyph-icon iconsminds-clock-forward d-flex'>
							<div className='value mr-4'>
								{' '}
								{moment
									.parseZone(event.BookingStart)
									.format('MMMM DD YYYY, hh:mm a')}{' '}
								-{' '}
								{moment
									.parseZone(event.BookingEnd)
									.format('MMMM DD YYYY, hh:mm a')}
							</div>
						</div>
					</div>
					<div className='o-data mt-2'>
						<div className='glyph-icon simple-icon-user d-flex'>
							<div className='value mr-4'> {event.Customer.CustomerName}</div>
						</div>
					</div>
					<div className='o-data mt-2 d-flex justify-content-between'>
						<div className='glyph-icon iconsminds-car d-flex'>
							<div className='value mr-4'>{event.VRN}</div>
						</div>
						<div className='price'>£ 589,00</div>
					</div>
				</div>
			</div>
		</div>
	));

	return <div className='col-12'>{eventsList}</div>;
}
