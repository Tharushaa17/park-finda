import React from 'react';
import { Button, Row } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import ReactExport from 'react-export-excel';
import moment from 'moment';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExcelExport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Colxx xxs='12'>
				<ExcelFile
					filename='ParkingSessions'
					element={
						<Button color='info' className='default float-right'>
							Export Table
						</Button>
					}
				>
					<ExcelSheet data={this.props.data} name='Parking Sessions'>
						<ExcelColumn label='Booking Id' value='BookingId' />
						<ExcelColumn
							label='Status'
							value={(col) => {
								var startDate = moment
									.parseZone(col.BookingStart)
									.format('YYYY-MM-DD hh:mm');
								var endDate = moment
									.parseZone(col.BookingEnd)
									.format('YYYY-MM-DD hh:mm');

								var currentDate = moment
									.parseZone(this.state.currentDateTime)
									.format('YYYY-MM-DD hh:mm');

								if (col.Status == 'success') {
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
							}}
						/>
						<ExcelColumn
							label='Customer Name'
							value={(col) => col.Customer.CustomerName}
						/>
						<ExcelColumn
							label='Location'
							value={(col) => col.CarParkId.CarParkName}
						/>
						<ExcelColumn label='VRN' value='VRN' />
						<ExcelColumn label='Booking Start' value='BookingStart' />
						<ExcelColumn label='Booking End' value='BookingEnd' />
						<ExcelColumn label='Duration' value='Duration' />
						<ExcelColumn label='Parking Fee' value='ParkingFee' />
						<ExcelColumn label='Parking Type' value='ParkingType' />
					</ExcelSheet>
				</ExcelFile>
			</Colxx>
		);
	}
}

export default ExcelExport;
