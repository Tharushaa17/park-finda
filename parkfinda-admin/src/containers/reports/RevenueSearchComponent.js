import React from 'react';
import { Colxx } from '../../components/common/CustomBootstrap';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import AuthorizedComponent from '../../components/AuthorizedComponent';
import Select from 'react-select';
import ReExcelExport from './Export/ReExcelExport';

class GlobalSearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredData: [],
			columnSearch: '',
			searchCompany: '',
			searchLocation: '',
			searchMonth: '',
			selectCompany: '',
			selectLocation: '',
		};
	}
	resetValues = () => {
		this.setState(
			{
				searchCompany: '',
				searchLocation: '',
				searchMonth: '',
				selectCompany: '',
				selectLocation: '',
			},
			() => this.globalSearch()
		);
	};
	companyChange = (event) => {
		const val = event.target.value;
		this.setState({ searchCompany: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	locationChange = (event) => {
		const val = event.value;
		this.setState({ selectLocation: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	companyChange2 = (event) => {
		const val = event.value;
		this.setState({ selectCompany: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	monthChange = (event) => {
		const val = event.target.value;
		this.setState({ searchMonth: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};

	globalSearch = () => {
		const { searchCompany } = this.state;
		const { searchMonth } = this.state;
		const { searchLocation } = this.state;
		const { selectLocation } = this.state;

		let filteredData = this.props.data.filter((value) => {
			let result =
				value.CompanyId.CompanyName.toLowerCase().includes(
					searchCompany.toLowerCase()
				) &&
				moment(value.Period)
					.format('MMMM-DD')
					.toLowerCase()
					.includes(searchMonth.toLowerCase()) &&
				value.CarParkId.CarParkName.toLowerCase().includes(
					selectLocation.toLowerCase()
				);

			if (searchLocation && searchLocation != '') {
				result = value.CarParkId.CarParkName.toLowerCase().includes(
					searchLocation.toLowerCase()
				);
			}

			return result;
		});

		this.props.handleSetFilteredData(filteredData);
	};

	render() {
		const { data } = this.props;
		const { columnSearch, selectCompany, selectLocation } = this.state;
		let selectData = data.map((Company) => {
			return {
				value: Company.CompanyId.CompanyName,
				label: Company.CompanyId.CompanyName,
			};
		});
		let selectData2 = data.map((Location) => {
			return {
				value: Location.CarParkId.CarParkName,
				label: Location.CarParkId.CarParkName,
			};
		});

		return (
			<>
				<div className='mcp-search-container w-100'>
					<FormGroup>
						<Input
							className='mcp-search'
							size='large'
							name='searchInput'
							value={this.state.searchCompany || ''}
							onChange={this.companyChange}
							placeholder='Search'
						/>
					</FormGroup>
					<i className='simple-icon-magnifier'></i>
				</div>

				<div className='row p-2x-left '>
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

				<div className='row mt-4 p-2x-left'>
					<div className='col-4'>
						<Label>Filter By Location</Label>
						<Select
							className='react-select'
							classNamePrefix='react-select'
							name='form-field-name'
							value={
								selectData2.find((item) => item.label === selectLocation) || ''
							}
							onChange={this.locationChange}
							options={selectData2}
						/>
					</div>
					<div className='col-4'>
						<Label>Filter By Company</Label>
						<Select
							className='react-select'
							classNamePrefix='react-select'
							name='form-field-name'
							value={
								selectData.find((item) => item.label === selectCompany) || ''
							}
							onChange={this.companyChange2}
							options={selectData}
						/>
					</div>
					<div className='col-lg-2'>
						<br />
						<Button color='light' onClick={() => this.resetValues()}>
							reset filter
						</Button>
					</div>
					<div className='col-lg-2'>
						<br />
						<ReExcelExport data={this.props.data} />
					</div>
				</div>

				{/* <Colxx sm={12}>
          <AuthorizedComponent
            roles={["admin"]}
            authUser={this.props.authUser}
            component={
              <FormGroup row>
                <Colxx sm={6}>
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
                </Colxx>
                <Colxx sm={6}>
                  <FormGroup>
                    <Label>Month</Label>
                    <Input
                      size="large"
                      name="searchInput"
                      value={this.state.searchMonth || ""}
                      onChange={this.monthChange}
                      label="Search"
                    />
                  </FormGroup>
                </Colxx>
              </FormGroup>
            }
          />
          <AuthorizedComponent
            roles={["operator"]}
            authUser={this.props.authUser}
            component={
              <FormGroup row>
                <Colxx sm={6}>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input
                      size="large"
                      name="searchInput"
                      value={this.state.searchLocation || ""}
                      onChange={this.locationChange}
                      label="Search"
                    />
                  </FormGroup>
                </Colxx>
              </FormGroup>
            }
          />
        </Colxx> */}
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
