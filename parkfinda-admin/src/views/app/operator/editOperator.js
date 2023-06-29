import React, { Component, Fragment } from 'react';
import {
	Row,
	Card,
	CardBody,
	CardTitle,
	FormGroup,
	Label,
	Button,
	InputGroup,
	InputGroupText,
	InputGroupAddon,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import IntlMessages from '../../../helpers/IntlMessages';
import { NotificationManager } from '../../../components/common/react-notifications';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { saveOperator, getOperator } from '../../../services/operatorService';
import { getRoles } from '../../../services/roleService';
import { getCompanys } from '../../../services/companyService';
import { getCarparks } from '../../../services/carparkService';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const emailRefExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ValidationMessage = Yup.object().shape({
	FirstName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('First name is required'),
	LastName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Last name is required'),
	Email: Yup.string()
		.matcher(emailRefExp, 'Email is not valid')
		.required('Email is required'),
	Role: Yup.string().required('Role is required'),
});

class EditOperator extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		data: {
			FirstName: '',
			LastName: '',
			Email: '',
			Username: '',
			Role: '',
			CompanyId: null,
			CarParkId: null,
		},
		Roles: [],
		Companys: [],
		Carparks: [],
		errors: {},
		loading: false,
	};
	async populateForm() {
		try {
			const operatorId = this.props.match.params.id;

			if (operatorId !== 'new') {
				const { data } = await getOperator(operatorId);
				let operator = {
					...data,
					CarParkId: data.CarParkId?._id,
					CompanyId: data.CompanyId?._id,
				};
				this.setState({ data: operator });
			}
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.props.history.replace('/not-found');
			}
		}
	}
	async populateRoles() {
		const { data: Roles } = await getRoles();
		this.setState({ Roles: Roles });
	}
	async populateCompanys() {
		const { data: Companys } = await getCompanys();
		this.setState({ Companys: Companys });
	}
	async populateCarparks() {
		const { data: Carparks } = await getCarparks();
		this.setState({ Carparks: Carparks });
	}

	async componentDidMount() {
		await this.populateForm();
		await this.populateRoles();
		await this.populateCompanys();
		await this.populateCarparks();
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.editoperator' match={this.props.match} />
						<Separator className='mb-5' />
					</Colxx>
				</Row>

				<Row className='mb-4'>
					<Colxx xxs='12'>
						<Card>
							<CardBody>
								<CardTitle>
									<h4>Update Operator</h4>
								</CardTitle>
								<Formik
									enableReinitialize
									initialValues={{
										...this.state.data,
									}}
									validationSchema={ValidationMessage}
									onSubmit={async (values) => {
										this.setState({ loading: true });
										try {
											if (
												(values.Role === 'admin' ||
													values.Role === 'enforcer') &&
												values.CompanyId === ''
											) {
												this.setState({ loading: false });
												NotificationManager.warning(
													'Company is required',
													'Error',
													3000,
													null,
													null,
													''
												);
											} else if (
												values.Role === 'enforcer' &&
												values.CarParkId === ''
											) {
												this.setState({ loading: false });
												NotificationManager.warning(
													'Carpark is required',
													'Error',
													3000,
													null,
													null,
													''
												);
											} else {
												const response = await saveOperator(values);
												if (response.data.status) {
													NotificationManager.success(
														'Updated the operator ',
														'Done',
														3000,
														null,
														null,
														''
													);
													this.props.history.push('/app/operator/operators');
												} else {
													this.setState({ loading: false });
													console.log('error');
													NotificationManager.warning(
														response.data?.msg,
														'Error',
														3000,
														null,
														null,
														''
													);
												}
											}
										} catch (error) {
											this.setState({ loading: false });
											console.error(error);
											NotificationManager.warning(
												'Something is wrong',
												'Error',
												3000,
												null,
												null,
												''
											);
										}
									}}
									render={({
										values,
										errors,
										handleSubmit,
										handleChange,
										handleBlur,
										touched,
										setFieldTouched,
										setFieldValue,
									}) => {
										console.log(this.state.Carparks, values);
										let selectData = this.state.Companys.map((Company) => {
											return { value: Company._id, label: Company.CompanyName };
										});
										let carParkData = this.state.Carparks.filter(
											(c) =>
												values.CompanyId === null ||
												c.CompanyId?._id === values.CompanyId
										).map((Carpark) => {
											return { value: Carpark._id, label: Carpark.CarParkName };
										});

										return (
											<Form className='av-tooltip tooltip-label-right'>
												<Colxx xxs='12'>
													<FormGroup row>
														<Colxx sm={12}>
															<FormGroup>
																<Label for='FirstName'>
																	<IntlMessages id='forms.first-name' />
																	<span style={{ color: 'red' }}>
																		<b>*</b>
																	</span>
																</Label>
																<Field
																	className='form-control'
																	name='FirstName'
																	placeholder='First Name'
																/>
																{errors.FirstName && touched.FirstName ? (
																	<div className='invalid-feedback d-block'>
																		{errors.FirstName}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>

														<Colxx sm={12}>
															<FormGroup>
																<Label for='LastName'>
																	<IntlMessages id='forms.last-name' />
																	<span style={{ color: 'red' }}>
																		<b>*</b>
																	</span>
																</Label>
																<Field
																	className='form-control'
																	name='LastName'
																	placeholder='Last Name'
																/>
																{errors.LastName && touched.LastName ? (
																	<div className='invalid-feedback d-block'>
																		{errors.LastName}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>

														<Colxx sm={12}>
															<FormGroup>
																<Label for='Email'>
																	<IntlMessages id='forms.email' />
																	<span style={{ color: 'red' }}>
																		<b>*</b>
																	</span>
																</Label>

																<InputGroup>
																	<InputGroupAddon addonType='prepend'>
																		<InputGroupText className='iconsminds-mail' />
																	</InputGroupAddon>
																	<Field
																		className='form-control'
																		name='Email'
																		disabled={true}
																		placeholder='Operator Email'
																	/>
																</InputGroup>
																{errors.Email && touched.Email ? (
																	<div className='invalid-feedback d-block'>
																		{errors.Email}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>

														<Colxx sm={12}>
															<FormGroup>
																<Label>
																	<IntlMessages id='forms.role' />
																	<span style={{ color: 'red' }}>
																		<b>*</b>
																	</span>
																</Label>
																<select
																	name='Role'
																	className='form-control'
																	id='Role'
																	disabled={true}
																	value={values.Role}
																	onChange={handleChange}
																	onBlur={handleBlur}
																>
																	<option value=''>-Please select-</option>
																	{this.state.Roles.map((Role) => (
																		<option key={Role.Name} value={Role.Name}>
																			{Role.Name}
																		</option>
																	))}
																</select>
																{errors.Role && touched.Role ? (
																	<div className='invalid-feedback d-block'>
																		{errors.Role}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														{(values.Role === 'operator' ||
															values.Role === 'enforcer') && (
															<Colxx sm={6}>
																<FormGroup>
																	<Label>
																		<IntlMessages id='Company' />
																		<span style={{ color: 'red' }}>
																			<b>*</b>
																		</span>
																	</Label>
																	<Select
																		className='react-select'
																		name='CompanyId'
																		value={selectData.find(
																			(o) => o.value === values.CompanyId
																		)}
																		onChange={(e) => {
																			setFieldValue('CompanyId', e.value);
																		}}
																		options={selectData}
																		onBlur={setFieldTouched}
																		error={
																			errors.CompanyId && touched.CompanyId
																		}
																		touched={touched.CompanyId}
																	/>
																	{errors.CompanyId && touched.CompanyId ? (
																		<div className='invalid-feedback d-block'>
																			{errors.CompanyId}
																		</div>
																	) : null}
																</FormGroup>
															</Colxx>
														)}
														{values.Role === 'enforcer' && (
															<Colxx sm={6}>
																<FormGroup>
																	<Label>
																		<IntlMessages id='Carparks' />
																		<span style={{ color: 'red' }}>
																			<b>*</b>
																		</span>
																	</Label>
																	<Select
																		components={{ Input: CustomSelectInput }}
																		className='react-select'
																		name='CarparkId'
																		value={carParkData.find(
																			(o) => o.value === values.CarparkId
																		)}
																		onChange={(e) => {
																			setFieldValue('CarparkId', e.value);
																		}}
																		onBlur={setFieldTouched}
																		error={
																			errors.CarparkId && touched.CarparkId
																		}
																		touched={touched.CarparkId}
																		options={carParkData}
																	/>
																	{errors.CarparkId && touched.CarparkId ? (
																		<div className='invalid-feedback d-block'>
																			{errors.CarparkId}
																		</div>
																	) : null}
																</FormGroup>
															</Colxx>
														)}
													</FormGroup>
												</Colxx>
												<Colxx xxs='12'>
													<FormGroup row>
														<Colxx xxs='6'>
															<Link to={`/app/operator/operators`}>
																<Button
																	color='light'
																	type='reset'
																	className='default mb-2'
																>
																	Cancel
																</Button>{' '}
															</Link>
														</Colxx>
														<Colxx xxs='6'>
															<Button
																color='info'
																type='submit'
																className={`btn-shadow btn-multiple-state default ${
																	this.state.loading ? 'show-spinner' : ''
																}`}
																block
															>
																<span className='spinner d-inline-block'>
																	<span className='bounce1' />
																	<span className='bounce2' />
																	<span className='bounce3' />
																</span>
																<span className='label'>
																	<IntlMessages id='Save' />
																</span>
															</Button>{' '}
														</Colxx>
													</FormGroup>
												</Colxx>
											</Form>
										);
									}}
								></Formik>
							</CardBody>
						</Card>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}

export default injectIntl(EditOperator);
