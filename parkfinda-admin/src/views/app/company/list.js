import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import CompanyTable from '../../../containers/company/CompanyTable';
import { Button } from 'reactstrap';
import { getCompanys, deleteCompany } from '../../../services/companyService';
import { NotificationManager } from '../../../components/common/react-notifications';
import { connect } from 'react-redux';
import AuthorizedComponent from '../../../components/AuthorizedComponent';

class List extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		records: [],
	};

	handleDelete = async (id) => {
		const allcompanys = this.state.records;
		const companys = allcompanys.filter((m) => m._id !== id);
		this.setState({ records: companys });
		try {
			await deleteCompany(id);
			NotificationManager.success(
				'Record Deleted',
				'Done',
				3000,
				null,
				null,
				''
			);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				console.log('The record has already been deleted');
			}
			this.setState({ records: allcompanys });
		}
	};
	async componentDidMount() {
		const { data: companys } = await getCompanys();
		this.setState({ records: companys });
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.list' match={this.props.match} />

						<Separator className='mb-5' />
					</Colxx>
				</Row>
				<Row>
					<AuthorizedComponent
						roles={['admin']}
						authUser={this.props.authUser}
						component={
							<Colxx xxs='12' className='mb-4'>
								<p>
									<IntlMessages id='menu.list' />
									<Button
										color='info'
										className='default mb-2'
										style={{ float: 'right' }}
										onClick={() => {
											this.props.history.push('addcompany');
										}}
									>
										<IntlMessages id='button.add-company' />
									</Button>
								</p>
							</Colxx>
						}
					/>
					<Colxx xxs='12'>
						<CompanyTable
							data={this.state.records}
							handleDelete={this.handleDelete}
						/>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser }) => {
	return {
		authUser,
	};
};

export default connect(mapStateToProps)(List);
