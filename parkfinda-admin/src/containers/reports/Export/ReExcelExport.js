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
					filename='Revenues'
					element={
						<Button color='info' className='default float-right'>
							Export Table
						</Button>
					}
				>
					<ExcelSheet data={this.props.data} name='Parking Sessions'>
						<ExcelColumn label='Period' value='Period' />

						<ExcelColumn
							label='Company'
							value={(col) => col.CompanyId.CompanyName}
						/>
						<ExcelColumn
							label='Location'
							value={(col) => col.CarParkId.CarParkName}
						/>

						<ExcelColumn label='Sessions' value='Sessions' />
						<ExcelColumn label='TPR Park Now' value='TPRParkNow' />
						<ExcelColumn label='TPR Park Later' value='TPRParkLater' />
						<ExcelColumn label='Service Fee' value='ServiceFee' />
						<ExcelColumn label='MCP Fee Park Now' value='MCPParkNow' />
						<ExcelColumn label='MCP Fee Park Later' value='MCPParkLater' />
						<ExcelColumn label='Management Fee' value='ManagementFee' />
						<ExcelColumn label='MCP Gross' value='MCPGross' />
						<ExcelColumn label='Client Gross' value='ClientGross' />
						<ExcelColumn label='Client Payable' value='ClientPayable' />
					</ExcelSheet>
				</ExcelFile>
			</Colxx>
		);
	}
}

export default ExcelExport;
