import React from 'react';
import { Colxx } from '../../components/common/CustomBootstrap';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import moment from 'moment';

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
			bookingDateFrom: '',
			bookingDateTo: '',
			selectRank: '',
			isOpenSizingLg: false,
		};
	}
	resetValues = () => {
		this.setState(
			{
				searchInput: '',
				selectParking: '',
				selectStatus: '',
				dateTo: '',
				dateFrom: '',
				endDateTo: '',
				endDateFrom: '',
				bookingDateFrom: '',
				bookingDateTo: '',
				selectRank: '',
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
	bookingDateFromChange = (event) => {
		const val = event.target.value;
		this.setState({ bookingDateFrom: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	bookingDateToChange = (event) => {
		const val = event.target.value;
		this.setState({ bookingDateTo: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	bookingRankChange = (event) => {
		const val = event.target.value;
		this.setState({ selectRank: val }, () => this.globalSearch());
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
		const { bookingDateFrom } = this.state;
		const { bookingDateTo } = this.state;
		const { selectRank } = this.state;

		let filteredData = this.props.data.filter((value) => {
			let result =
				value.CarParkId.CarParkName.toLowerCase().includes(
					searchInput.toLowerCase()
				) &&
				value.ParkingSession.ParkingType.toLowerCase().includes(
					selectParking.toLowerCase()
				) &&
				value.BookingRank.toLowerCase().includes(selectRank.toLowerCase());
			if (dateFrom && dateFrom != '') {
				result =
					result &&
					moment
						.parseZone(value.ParkingSession.BookingStart)
						.format('YYYY-MM-DD') >= dateFrom;
				if (dateTo && dateTo != '') {
					result =
						result &&
						moment
							.parseZone(value.ParkingSession.BookingStart)
							.format('YYYY-MM-DD') <= dateTo;
				}
			}
			if (endDateFrom && endDateFrom != '') {
				result =
					result &&
					moment
						.parseZone(value.ParkingSession.BookingEnd)
						.format('YYYY-MM-DD') >= endDateFrom;
				if (endDateTo && endDateTo != '') {
					result =
						result &&
						moment
							.parseZone(value.ParkingSession.BookingEnd)
							.format('YYYY-MM-DD') <= endDateTo;
				}
			}
			if (bookingDateFrom && bookingDateFrom != '') {
				result =
					result &&
					moment
						.parseZone(value.ParkingSession.CreatedAt)
						.format('YYYY-MM-DD') >= bookingDateFrom;
				if (bookingDateTo && bookingDateTo != '') {
					result =
						result &&
						moment
							.parseZone(value.ParkingSession.CreatedAt)
							.format('YYYY-MM-DD') <= bookingDateTo;
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
			<div row>
				<FormGroup>
					<FormGroup>
						<div className='mcp-search-container w-100'>
							<Input
								className='mcp-search'
								size='large'
								name='searchInput'
								value={this.state.searchInput || ''}
								onChange={this.locationChange}
								placeholder='Search By location'
							/>
							<i className='simple-icon-magnifier'></i>
						</div>
					</FormGroup>

					<div className='row p-2x-left p-2x-right'>
						<div className='col-4'>
							<Label className='bold'>Booking Date :</Label>
							<div className='row'>
								<div className='col'>
									<Label>From</Label>
									<Input
										size='large'
										name='searchInput'
										type='date'
										value={this.state.bookingDateFrom || ''}
										onChange={this.bookingDateFromChange}
										label='Search'
									/>
								</div>
								<div className='col'>
									<Label>To</Label>
									<Input
										size='large'
										name='searchInput'
										type='date'
										value={this.state.bookingDateTo || ''}
										onChange={this.bookingDateToChange}
										label='Search'
									/>
								</div>
							</div>
						</div>
						<div className='col-4'>
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

						<div className='col-4'>
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

					<div className='row p-2x-left mt-4 p-2x-right'>
						<div className='col-lg-3 mt-2'>
							<Label>Parking Type</Label>
							<select
								onChange={this.parkingTypeChange}
								value={this.state.selectParking || ''}
								className='form-control'
							>
								<option value=''>All</option>
								<option value='Single'>Single</option>
							</select>
						</div>
						<div className='col-lg-3 mt-2'>
							<Label>Booking Rank</Label>
							<select
								onChange={this.bookingRankChange}
								value={this.state.selectRank || ''}
								className='form-control'
							>
								<option value=''>All</option>
								<option value='One'>One</option>
								<option value='Two'>Two</option>
							</select>
						</div>
						<div className='col-lg-3'>
							<br />
							<Button color='light' onClick={() => this.resetValues()}>
								reset filter
							</Button>
						</div>
					</div>
				</FormGroup>
			</div>
		);
	}
}
