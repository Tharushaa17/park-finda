import React from 'react';
import { Colxx } from '../../components/common/CustomBootstrap';
import { Input, FormGroup, Label } from 'reactstrap';

export default class GlobalSearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredData: [],
			columnSearch: '',
			searchCode: '',
			searchLocation: '',
		};
	}
	locationChange = (event) => {
		const val = event.target.value;
		this.setState({ searchLocation: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};
	codeChange = (event) => {
		const val = event.target.value;
		this.setState({ searchCode: val }, () => this.globalSearch());
		this.props.handleSetSearchInput(val);
	};

	globalSearch = () => {
		const { searchCode } = this.state;
		const { searchLocation } = this.state;

		let filteredData = this.props.data.filter((value) => {
			let result =
				value.Location.toLowerCase().includes(searchLocation.toLowerCase()) &&
				value.Code.toLowerCase().includes(searchCode.toLowerCase());

			return result;
		});

		this.props.handleSetFilteredData(filteredData);
	};

	setColumnSearch = (e) => {
		this.setState({ columnSearch: e.target.value }, () => this.globalSearch());
	};

	toggleSizingLg = () => {
		this.setState((prevState) => ({
			isOpenSizingLg: !prevState.isOpenSizingLg,
		}));
	};
	render() {
		const { columns } = this.props;
		const { columnSearch } = this.state;

		return (
			<Colxx xxs='12'>
				<div row>
					<Colxx sm={12}>
						<FormGroup row>
							<Colxx sm={6}>
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
							<Colxx sm={6}>
								<FormGroup>
									<Label>VRN</Label>
									<Input
										size='large'
										name='searchInput'
										value={this.state.searchCode || ''}
										onChange={this.codeChange}
										label='Search'
									/>
								</FormGroup>
							</Colxx>
						</FormGroup>
					</Colxx>
				</div>
			</Colxx>
		);
	}
}
