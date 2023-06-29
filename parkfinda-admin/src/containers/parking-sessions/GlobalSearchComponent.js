import React from 'react';
import { Colxx } from '../../components/common/CustomBootstrap';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import moment from 'moment';
import { Formik, Form, Field } from 'formik';
import ExcelExport from './ExcelExport';

export default class GlobalSearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredData: [],
			columnSearch: '',
			searchInput: '',
			selectParking: '',
			selectStatus: '',
			dateTo: '',
			dateFrom: '',
			endDateTo: '',
			endDateFrom: '',
			isOpenSizingLg: false,
		};
	}
	resetValues = () => {
		this.setState(
			{
				selectParking: '',
				selectStatus: '',
				searchInput: '',
				dateTo: '',
				dateFrom: '',
				endDateTo: '',
				endDateFrom: '',
				currentDateTime: Date().toLocaleString(),
			},
			() => this.globalSearch()
		);
	};
	locationChange = (event) => {
		const val = event.target.value;
		this.setState({ searchInput: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	parkingTypeChange = (event) => {
		const val = event.target.value;
		this.setState({ selectParking: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	statusChange = (event) => {
		const val = event.target.value;
		this.setState({ selectStatus: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	dateFromChange = (event) => {
		const val = event.target.value;
		this.setState({ dateFrom: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	dateToChange = (event) => {
		const val = event.target.value;
		this.setState({ dateTo: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	endDateFromChange = (event) => {
		const val = event.target.value;
		this.setState({ endDateFrom: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	endDateToChange = (event) => {
		const val = event.target.value;
		this.setState({ endDateTo: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};

	globalSearch = () => {
		const { searchInput } = this.state;
		const { selectParking } = this.state;
		const { selectStatus } = this.state;
		const { dateFrom } = this.state;
		const { dateTo } = this.state;
		const { endDateFrom } = this.state;
		const { endDateTo } = this.state;
		const { currentDateTime } = this.state;
		let filteredData = this.props.data.filter((value) => {
			var startDate = moment
				.parseZone(value.BookingStart)
				.format('YYYY-MM-DD hh:mm');
			var endDate = moment
				.parseZone(value.BookingEnd)
				.format('YYYY-MM-DD hh:mm');

			var currentDate = moment
				.parseZone(currentDateTime)
				.format('YYYY-MM-DD hh:mm');
			var Status;
			if (value.Status == 'success') {
				if (currentDate > endDate) {
					Status = 'Completed';
				} else if (startDate > currentDate) {
					Status = 'Future';
				} else {
					Status = 'InHouse';
				}
			} else {
				Status = 'Cancelled';
			}
			let result =
				value.CarParkId.CarParkName.toLowerCase().includes(
					searchInput.toLowerCase()
				) &&
				value.ParkingType.toLowerCase().includes(selectParking.toLowerCase()) &&
				Status.toLowerCase().includes(selectStatus.toLowerCase());

			if (dateFrom && dateFrom != '') {
				result =
					result &&
					moment.parseZone(value.BookingStart).format('YYYY-MM-DD') >= dateFrom;
				if (dateTo && dateTo != '') {
					result =
						result &&
						moment.parseZone(value.BookingStart).format('YYYY-MM-DD') <= dateTo;
				}
			}
			if (endDateFrom && endDateFrom != '') {
				result =
					result &&
					moment.parseZone(value.BookingEnd).format('YYYY-MM-DD') >=
						endDateFrom;
				if (endDateTo && endDateTo != '') {
					result =
						result &&
						moment.parseZone(value.BookingEnd).format('YYYY-MM-DD') <=
							endDateTo;
				}
			}
			return result;
		});

		this.props.handleSetFilteredData(filteredData);
	};

	render() {
		const { data } = this.props;
		const { columnSearch } = this.state;

		return (
			<>
				<div>
					<form>
						<FormGroup>
							<div className='mcp-search-container w-100'>
								<FormGroup>
									<Input
										className='mcp-search'
										size='large'
										name='searchInput'
										value={this.state.searchInput || ''}
										onChange={this.locationChange}
										label='Search'
										placeholder='Search By Location'
									/>
									<i className='simple-icon-magnifier'></i>
								</FormGroup>
							</div>
							<div className='row p-2x-left p-2x-right'>
								<div className='col-lg-6'>
									<Label className='bold'>Start Date</Label>
									<div className='row'>
										<div className='col'>
											<Label>From</Label>
											<Input
												size='large'
												name='searchInput'
												type='date'
												value={this.state.dateFrom || ''}
												onChange={this.dateFromChange}
												label='Search'
											/>
										</div>
										<div className='col'>
											<Label>To</Label>
											<Input
												size='large'
												name='searchInput'
												type='date'
												value={this.state.dateTo || ''}
												onChange={this.dateToChange}
												label='Search'
											/>
										</div>
									</div>
								</div>

								<div className='col-lg-6'>
									<Label className='bold'>End Date</Label>
									<div className='row'>
										<div className='col'>
											<Label>From</Label>
											<Input
												size='large'
												name='searchInput'
												type='date'
												value={this.state.endDateFrom || ''}
												onChange={this.endDateFromChange}
												label='Search'
											/>
										</div>
										<div className='col'>
											<Label>To</Label>
											<Input
												size='large'
												name='searchInput'
												type='date'
												value={this.state.endDateTo || ''}
												onChange={this.endDateToChange}
												label='Search'
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='row mt-4 p-2x-left p-2x-right'>
								<div className='col-lg-3'>
									<Label>Filter By Parking Type</Label>
									<select
										onChange={this.parkingTypeChange}
										value={this.state.selectParking || ''}
										className='form-control'
									>
										<option value=''>All</option>
										<option value='ParkLater'> ParkLater</option>
										<option value='ParkNow'> ParkNow</option>
									</select>
								</div>
								<div className='col-lg-3'>
									<Label>Filter By Status</Label>
									<select
										onChange={this.statusChange}
										value={this.state.selectStatus || ''}
										className='form-control'
									>
										<option value=''>All</option>
										<option value='InHouse'>InHouse</option>
										<option value='Future'>Future</option>
										<option value='Completed'>Completed</option>
										<option value='Cancelled'>Cancelled</option>
									</select>
								</div>
								<div className='col-lg-2'>
									<br />
									<Button color='light' onClick={() => this.resetValues()}>
										reset filter
									</Button>
								</div>
								<div className='col-lg-4'>
									<br />
									<ExcelExport data={this.props.data} />
								</div>
							</div>
						</FormGroup>
					</form>
				</div>
			</>
		);
	}
}
