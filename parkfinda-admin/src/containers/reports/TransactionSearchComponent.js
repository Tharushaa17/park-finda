import React from 'react';
import { Colxx } from '../../components/common/CustomBootstrap';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import AuthorizedComponent from '../../components/AuthorizedComponent';
import TrExcelExport from './Export/TrExcelExport';

class GlobalSearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredData: [],
			columnSearch: '',
			searchCompany: '',
			searchLocation: '',
			dateTo: '',
			dateFrom: '',
			endDateTo: '',
			endDateFrom: '',
		};
	}
	resetValues = () => {
		this.setState(
			{
				searchCompany: '',
				searchLocation: '',
				dateTo: '',
				dateFrom: '',
				endDateTo: '',
				endDateFrom: '',
			},
			() => this.globalSearch()
		);
	};

	locationChange = (event) => {
		const val = event.target.value;
		this.setState({ searchLocation: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	companyChange = (event) => {
		const val = event.target.value;
		this.setState({ searchCompany: val }, () => this.globalSearch());
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
		const { searchCompany } = this.state;
		const { searchLocation } = this.state;
		const { dateFrom } = this.state;
		const { dateTo } = this.state;
		const { endDateFrom } = this.state;
		const { endDateTo } = this.state;

		let filteredData = this.props.data.filter((value) => {
			let result =
				value.CarParkId.CarParkName.toLowerCase().includes(
					searchLocation.toLowerCase()
				) ||
				value.CompanyId.CompanyName.toLowerCase().includes(
					searchLocation.toLowerCase()
				);
			if (searchCompany && searchCompany != '') {
				result =
					result &&
					value.CompanyId.CompanyName.toLowerCase().includes(
						searchCompany.toLowerCase()
					);
			}
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
			return result;
		});

		this.props.handleSetFilteredData(filteredData);
	};

	render() {
		const { data } = this.props;
		const { columnSearch } = this.state;

		return (
			<>
				<div className='mcp-search-container w-100'>
					<FormGroup>
						<Input
							className='mcp-search'
							size='large'
							name='searchInput'
							value={this.state.searchLocation || ''}
							onChange={this.locationChange}
							placeholder='Search By Location / Company'
						/>
					</FormGroup>
					<i className='simple-icon-magnifier'></i>
				</div>

				<FormGroup>
					<AuthorizedComponent
						roles={['admin']}
						authUser={this.props.authUser}
						component={
							<>
								{/* <Colxx sm={6}>
                  <FormGroup>
                    <Label>Company</Label>
                    <Input
                      size="large"
                      name="searchInput"
                      value={this.state.searchCompany || ""}
                      onChange={this.companyChange}
                      label="Search"
                    />
                  </FormGroup>
                </Colxx> */}
								<Colxx sm={6}></Colxx>
							</>
						}
					/>
					<AuthorizedComponent
						roles={['operator']}
						authUser={this.props.authUser}
						component={
							<Colxx sm={12}>
								<FormGroup>
									<Label>Location</Label>
									<Input
										size='large'
										name='searchInput'
										value={this.state.searchLocation || ''}
										onChange={this.locationChange}
										label='Search'
									/>
								</FormGroup>
							</Colxx>
						}
					/>
					<AuthorizedComponent
						roles={['admin']}
						authUser={this.props.authUser}
						component={
							<>
								<div className='row p-2x-left '>
									<div className='col-lg-4'>
										<Label className='bold mt-2'>Start Date</Label>
										<div className='row'>
											<div className='col-lg-6'>
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
											<div className='col-lg-6'>
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
										<Label className='bold mt-2'>End Date</Label>
										<div className='row'>
											<div className='col-lg-4'>
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
											<div className='col-lg-4'>
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
											<div className='col-lg-3'>
												<br />
												<Button
													color='light'
													onClick={() => this.resetValues()}
												>
													reset filter
												</Button>
											</div>
											<div className='col-lg-1'>
												<br />
												<TrExcelExport data={this.props.data} />
											</div>
										</div>
									</div>
								</div>
							</>
						}
					/>
				</FormGroup>
			</>
		);
	}
}
const mapStateToProps = ({ authUser }) => {
	return {
		authUser,
	};
};

export default connect(mapStateToProps)(GlobalSearchComponent);
