import React from 'react';
import { Button, Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
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
					filename='Transactions'
					element={
						<Button color='info' className='default'>
							Export Table
						</Button>
					}
				>
					<ExcelSheet data={this.props.data} name='Parking Sessions'>
						<ExcelColumn
							label='Settlement Date'
							value={(col) => {
								return moment
									.parseZone(col.ParkingSession.CreatedAt)
									.format('YYYY-MM-DD');
							}}
						/>
						<ExcelColumn
							label='Booking Id'
							value={(col) => col.ParkingSession.BookingId}
						/>

						<ExcelColumn
							label='Company'
							value={(col) => col.CompanyId.CompanyName}
						/>
						<ExcelColumn
							label='Location'
							value={(col) => col.CarParkId.CarParkName}
						/>

						<ExcelColumn label='VRN' value={(col) => col.ParkingSession.VRN} />
						<ExcelColumn
							label='Booking Start'
							value={(col) => {
								return moment
									.parseZone(col.ParkingSession.BookingStart)
									.format('YYYY-MM-DD, hh:mm a');
							}}
						/>
						<ExcelColumn
							label='Booking End'
							value={(col) => {
								return moment
									.parseZone(col.ParkingSession.BookingEnd)
									.format('YYYY-MM-DD, hh:mm a');
							}}
						/>
						<ExcelColumn
							label='Payment Method'
							value={(col) => col.PaymentType.Name}
						/>
						<ExcelColumn
							label='Parking Type'
							value={(col) => col.ParkingSession.ParkingType}
						/>

						<ExcelColumn label='Parking Fee' value='CarParkGrossFee' />
						<ExcelColumn label='MCP Gross' value='MCPFee' />
						<ExcelColumn label='Client Gross' value='CarParkNetFee' />
					</ExcelSheet>
				</ExcelFile>
			</Colxx>
		);
	}
}

export default ExcelExport;
