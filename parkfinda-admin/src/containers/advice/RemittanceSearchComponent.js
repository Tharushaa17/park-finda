import React from 'react';
import { Colxx } from '../../components/common/CustomBootstrap';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import Select from 'react-select';

const selectData = [
	{ label: 'January', value: 'january', key: 0 },
	{ label: 'February', value: 'february', key: 1 },
	{ label: 'March', value: 'march', key: 2 },
	{ label: 'April', value: 'april', key: 3 },
	{ label: 'May', value: 'may', key: 4 },
	{ label: 'June', value: 'june', key: 5 },
	{ label: 'July', value: 'july', key: 6 },
	{ label: 'August', value: 'august', key: 7 },
	{ label: 'September', value: 'september', key: 8 },
	{ label: 'October', value: 'october', key: 9 },
	{ label: 'November', value: 'november', key: 10 },
	{ label: 'December', value: 'december', key: 11 },
];

export default class GlobalSearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredData: [],
			columnSearch: '',
			searchCompany: '',
			searchMonth: '',
		};
	}
	resetValues = () => {
		this.setState(
			{
				searchCompany: '',
				searchMonth: '',
			},
			() => this.globalSearch()
		);
	};

	companyChange = (event) => {
		const val = event.target.value;
		this.setState({ searchCompany: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	monthChange = (event) => {
		const val = event.label;
		this.setState({ searchMonth: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};

	globalSearch = () => {
		const { searchCompany } = this.state;
		const { searchMonth } = this.state;

		let filteredData = this.props.data.filter((value) => {
			return (
				value.CompanyId.CompanyName.toLowerCase().includes(
					searchCompany.toLowerCase()
				) && value.Month.toLowerCase().includes(searchMonth.toLowerCase())
			);
		});

		this.props.handleSetFilteredData(filteredData);
	};

	render() {
		const { data } = this.props;
		const { columnSearch, searchMonth } = this.state;

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
							placeholder='search'
						/>
					</FormGroup>
					<i className='simple-icon-magnifier'></i>
				</div>

				<div className='row p-2x-left'>
					<div className='col-2'>
						<Label className='bold'>Month</Label>
						<Select
							components={{ Input: CustomSelectInput }}
							className='react-select'
							classNamePrefix='react-select'
							name='form-field-name'
							value={
								selectData.find((item) => item.label === searchMonth) || ''
							}
							onChange={this.monthChange}
							options={selectData}
						/>
					</div>
					<div className='col-lg-4'>
						<br />
						<Button color='light' onClick={() => this.resetValues()}>
							reset filter
						</Button>
					</div>
				</div>

				<FormGroup>
					{/* <Colxx sm={6}>
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
          </Colxx> */}
				</FormGroup>
			</>
		);
	}
}
