import React, { Component, Fragment } from 'react';
import {
	Row,
	Card,
	CardBody,
	Input,
	CardTitle,
	FormGroup,
	Label,
	Button,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import IntlMessages from '../../../helpers/IntlMessages';

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../../../assets/customstyle.css';

import { NotificationManager } from '../../../components/common/react-notifications';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import {
	saveSeasonCustomer,
	getSeasonCustomer,
} from '../../../services/seasonCustomersService';
import { getCompanys } from '../../../services/companyService';
import { getCarparks } from '../../../services/carparkService';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';

var currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);

const phoneRegExp = /^\+(?:[0-9]●?){6,14}[0-9]$/;
const emailRefExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ValidationMessage = Yup.object().shape({
	VRN: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('VRN is required'),
	BookingStart: Yup.date()
		.min(currentDate, 'Past date is not valid!')
		.required('Start Date is required'),
	BookingEnd: Yup.date()
		.min(currentDate, 'Past date is not valid!')
		.required('End Date is required'),
	Amount: Yup.number().positive().required('Amount is required'),
	Driver: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.matches(/^[aA-zZ\s]+$/, 'Name is not valid')
		.required('Driver is required'),
	Email: Yup.string()
		.matches(emailRefExp, 'Email is not valid')
		.required('Email is required'),
	MobileNum: Yup.string()
		.matches(phoneRegExp, 'Contact Number is not valid')
		.required('Contact Number is required'),
	CarParkId: Yup.string().required('Car Park is required'),
	CompanyId: Yup.string().required('Company is required'),
});

class EditSeasonCustomer extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		data: {
			CompanyId: '',
			CarParkId: '',
			VRN: '',
			BookingStart: '',
			BookingEnd: '',
			Amount: '',
			Driver: '',
			MobileNum: '',
			Email: '',
		},
		Companys: [],
		Carparks: [],
		loading: false,
	};
	async populateForm() {
		try {
			const seasonCustomerId = this.props.match.params.id;

			if (seasonCustomerId !== 'new') {
				const { data } = await getSeasonCustomer(seasonCustomerId);
				let seasonCustomer = {
					...data,
					CarParkId: data.CarParkId?._id,
					CompanyId: data.CompanyId?._id,
				};
				this.setState({ data: seasonCustomer });
			}
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.props.history.replace('/not-found');
			}
		}
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
		await this.populateCompanys();
		await this.populateCarparks();
	}
	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb
							heading='menu.edit-season-customer'
							match={this.props.match}
						/>
						<Separator className='mb-5' />
					</Colxx>
				</Row>

				<Row className='mb-4'>
					<Colxx xxs='12'>
						<Card>
							<CardBody>
								<CardTitle>
									<h4>Edit Season Customer</h4>
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
											const response = await saveSeasonCustomer(values);
											if (response) {
												NotificationManager.success(
													'Updated the season customer ',
													'Done',
													3000,
													null,
													null,
													''
												);
												this.props.history.push(
													'/app/season-customer/season-customers'
												);
											} else {
												this.setState({ loading: false });
												console.log('error');
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
										touched,
										setFieldTouched,
										setFieldValue,
									}) => {
										let companies = this.state.Companys.map((c) => {
											return { value: c._id, label: c.CompanyName };
										});

										let carparks = this.state.Carparks.filter(
											(c) => c.CompanyId?._id === values.CompanyId
										).map((c) => {
											return { value: c._id, label: c.CarParkName };
										});
										return (
											<Form
												className='av-tooltip tooltip-label-right'
												onSubmit={handleSubmit}
											>
												<Colxx xxs='12'>
													<FormGroup row>
														<Colxx sm={6}>
															<FormGroup>
																<Label className='req-field'>
																	<IntlMessages id='Company' />
																</Label>

																<Select
																	className='react-select'
																	name='CompanyId'
																	value={companies.find(
																		(o) => o.value === values.CompanyId
																	)}
																	onChange={(e) => {
																		setFieldValue('CompanyId', e.value);
																	}}
																	options={companies}
																	onBlur={setFieldTouched}
																	error={errors.CompanyId && touched.CompanyId}
																	touched={touched.CompanyId}
																/>
																{errors.CompanyId && touched.CompanyId ? (
																	<div className='invalid-feedback d-block'>
																		{errors.CompanyId}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup>
																<Label className='req-field'>
																	<IntlMessages id='Location' />
																</Label>
																<Select
																	components={{ Input: CustomSelectInput }}
																	className='react-select'
																	name='CarParkId'
																	value={carparks.find(
																		(o) => o.value === values.CarParkId
																	)}
																	onChange={(e) => {
																		setFieldValue('CarParkId', e.value);
																	}}
																	isDisabled={
																		values.CompanyId === null &&
																		Array.isArray(carparks)
																	}
																	options={carparks}
																	onBlur={setFieldTouched}
																	error={errors.CarParkId && touched.CarParkId}
																	touched={touched.CarParkId}
																/>
																{errors.CarParkId && touched.CarParkId ? (
																	<div className='invalid-feedback d-block'>
																		{errors.CarParkId}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup>
																<Label for='VRN' className='req-field'>
																	<IntlMessages id='VRN' />
																</Label>
																<Field
																	className='form-control'
																	name='VRN'
																	placeholder='VRN'
																	type='text'
																	tag={Field}
																/>
																{errors.VRN && touched.VRN ? (
																	<div className='invalid-feedback d-block'>
																		{errors.VRN}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup>
																<Label for='BookingStart' className='req-field'>
																	<IntlMessages id='Start Date' />
																</Label>
																<Input
																	type='date'
																	name='BookingStart'
																	value={moment(values.BookingStart).format(
																		'YYYY-MM-DD'
																	)}
																	onChange={handleChange}
																	tag={Field}
																	invalid={
																		errors.BookingStart && touched.BookingStart
																	}
																/>
																{errors.BookingStart && touched.BookingStart ? (
																	<div className='invalid-feedback d-block'>
																		{errors.BookingStart}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup>
																<Label for='BookingEnd' className='req-field'>
																	<IntlMessages id='End Date' />
																</Label>
																<Input
																	type='date'
																	name='BookingEnd'
																	value={moment(values.BookingEnd).format(
																		'YYYY-MM-DD'
																	)}
																	onChange={handleChange}
																	tag={Field}
																	invalid={
																		errors.BookingEnd && touched.BookingEnd
																	}
																/>
																{errors.BookingEnd && touched.BookingEnd ? (
																	<div className='invalid-feedback d-block'>
																		{errors.BookingEnd}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup>
																<Label for='Amount' className='req-field'>
																	<IntlMessages id='Amount' />
																</Label>
																<Field
																	className='form-control'
																	name='Amount'
																	placeholder='Amount'
																	type='number'
																	tag={Field}
																/>
																{errors.Amount && touched.Amount ? (
																	<div className='invalid-feedback d-block'>
																		{errors.Amount}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup>
																<Label for='Driver' className='req-field'>
																	<IntlMessages id='Driver' />
																</Label>
																<Field
																	className='form-control'
																	name='Driver'
																	placeholder='Driver'
																	type='text'
																	tag={Field}
																/>
																{errors.Driver && touched.Driver ? (
																	<div className='invalid-feedback d-block'>
																		{errors.Driver}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup>
																<Label for='MobileNum' className='req-field'>
																	<IntlMessages id=' Contact Number' />
																</Label>
																<Field
																	className='form-control'
																	name='MobileNum'
																	placeholder='Customer ContactNo'
																	type='text'
																	tag={Field}
																/>
																{errors.MobileNum && touched.MobileNum ? (
																	<div className='invalid-feedback d-block'>
																		{errors.MobileNum}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup>
																<Label for='Email' className='req-field'>
																	<IntlMessages id='Email' />
																</Label>
																<Field
																	className='form-control'
																	name='Email'
																	placeholder=' Email'
																	type='text'
																	tag={Field}
																/>
																{errors.Email && touched.Email ? (
																	<div className='invalid-feedback d-block'>
																		{errors.Email}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
													</FormGroup>
												</Colxx>
												<br />

												<Colxx xxs='12'>
													<FormGroup row>
														<Colxx xxs='6'>
															<Link
																to={`/app/season-customer/season-customers`}
															>
																<Button
																	color='light'
																	type='reset'
																	className='default mb-2'
																>
																	Cancel
																</Button>
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

export default injectIntl(EditSeasonCustomer);
