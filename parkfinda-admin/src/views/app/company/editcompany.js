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

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { NotificationManager } from '../../../components/common/react-notifications';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { saveCompany, getCompany } from '../../../services/companyService';
import { getPayments } from '../../../services/paymentGatewayService';
import { Formik, Form, Field } from 'formik';
import { FormikSwitch } from './../../../components/FormikFields';
import * as Yup from 'yup';

const phoneRegExp = /^\+(?:[0-9]●?){6,14}[0-9]$/;
const emailRefExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ValidationMessage = Yup.object().shape({
	CompanyName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Company Name is required'),
	AddressLineOne: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Address is required'),
	City: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('City is required'),
	Country: Yup.string().required('Country is required'),
	PostCode: Yup.string().required('Post Code is required'),
	CompanyEmail: Yup.string()
		.matches(emailRefExp, "Company Email is not valid")
		.required('Email is required'),
	ContactNo: Yup.string()
		.matches(phoneRegExp, 'Company Contact No. is not valid')
		.required('Contact No. is required'),
	OwnerFirstName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.matches(/^[aA-zZ\s]+$/, 'Owner First Name is not valid')
		.required('First Name is required'),
	OwnerLastName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.matches(/^[aA-zZ\s]+$/, 'Owner Last Name is not valid')
		.required('Owner Last Name is required'),
	OwnerEmail: Yup.string()
		.matches(emailRefExp, "Owner Email is not valid")
		.required('Owner Email is required'),
	OwnerMobile: Yup.string()
		.matches(phoneRegExp, 'Owner Mobile No. is not valid')
		.required('Owner Mobile No. is required'),
	Paymentgateway: Yup.string().required('Payment Gateway is required'),
	VatRegistated: Yup.boolean(),
	VatNumber: Yup.number().when('VatRegistated', {
		is: (value) => value && value === true,
		then: Yup.number('Vat Number can only contain numbers')
			.required('Vat Number is required')
			.positive()
			.integer(),
	}),
});

class EditCompany extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		data: {
			CompanyName: '',
			ShortName: '',
			AddressLineOne: '',
			AddressLineTwo: '',
			City: '',
			PostCode: '',
			Country: '',
			CompanyEmail: '',
			ContactNo: '',
			OwnerFirstName: '',
			OwnerLastName: '',
			OwnerEmail: '',
			OwnerMobile: '',
			SmsEnable: '',
			EmailEnable: '',
			Paymentgateway: '',
			Commission: '',
			VatRegistated: false,
			VatNumber: '',
			DefaultCompany: '',
			IsApproved: '',
		},
		PaymentGateways: [],
		errors: {},
		loading: false,
	};
	async populateForm() {
		try {
			const companyId = this.props.match.params.id;

			if (companyId !== 'new') {
				const { data } = await getCompany(companyId);
				this.setState({
					data: {
						_id: data._id,
						ownerid: data.Owner._id,
						ownerUid: data.Owner.Uid, 
						CompanyName: data.CompanyName,
						AddressLineOne: data.AddressLineOne,
						AddressLineTwo: data.AddressLineTwo,
						City: data.City,
						PostCode: data.PostCode,
						Country: data.Country,
						CompanyEmail: data.CompanyEmail,
						ContactNo: data.ContactNo,
						OwnerFirstName: data.Owner.FirstName,
						OwnerLastName: data.Owner.LastName,
						OwnerEmail: data.Owner.Email,
						OwnerMobile: data.Owner.PhoneNumber,
						SmsEnable: data.SmsEnable,
						EmailEnable: data.EmailEnable,
						Paymentgateway: data.Paymentgateway._id,
						VatRegistated: data.VatRegistated,
						VatNumber: data.VatNumber,
						IsApproved: data.IsApproved,
					}
				});
			}
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.props.history.replace('/not-found');
			}
		}
	}
	async populatePaymentGateways() {
		const { data: PaymentGateways } = await getPayments();
		this.setState({ PaymentGateways: PaymentGateways });
	}
	async componentDidMount() {
		await this.populateForm();
		await this.populatePaymentGateways();
	}

	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.editcompany' match={this.props.match} />
						<Separator className='mb-5' />
					</Colxx>
				</Row>

				<Row className='mb-4'>
					<Colxx xxs='12'>
						<Card>
							<CardBody>
								<CardTitle>
									<h4>Edit Company</h4>
								</CardTitle>
								<Formik
									enableReinitialize
									initialValues={{
										...this.state.data,
									}}
									validationSchema={ValidationMessage}
									onSubmit={async (values) => {
										this.setState({ loading: true });
										console.log(values);
										try {
											const response = await saveCompany(values);

											if (response) {
												NotificationManager.success(
													'Updated the company ',
													'Done',
													3000,
													null,
													null,
													''
												);
												this.props.history.push('/app/company/list');
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
										handleBlur,
										touched,
										setFieldTouched,
										setFieldValue,
									}) => {
										return (
											<Form
												className='av-tooltip tooltip-label-right'
												onSubmit={handleSubmit}
											>
												<Colxx xxs='12'>
													<Card>
														<CardBody>
															<CardTitle>
																<IntlMessages id='Company Details' />
															</CardTitle>
															<FormGroup row>
																<Colxx sm={12}>
																	<FormGroup>
																		<Label for='CompanyName'>
																			<IntlMessages id='forms.company-name' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<Field
																			className='form-control'
																			name='CompanyName'
																			placeholder='Company Name'
																			type='text'
																			tag={Field}
																		/>
																		{errors.CompanyName &&
																		touched.CompanyName ? (
																			<div className='invalid-feedback d-block'>
																				{errors.CompanyName}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='Address'>
																			<IntlMessages id='forms.address-1' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<Field
																			className='form-control'
																			name='AddressLineOne'
																			placeholder='Address Line one'
																			type='text'
																			tag={Field}
																		/>
																		{errors.AddressLineOne &&
																		touched.AddressLineOne ? (
																			<div className='invalid-feedback d-block'>
																				{errors.AddressLineOne}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='Address'>
																			<IntlMessages id='forms.address-2' />
																		</Label>
																		<Field
																			className='form-control'
																			name='AddressLineTwo'
																			placeholder='Address Line Two'
																			type='text'
																			tag={Field}
																		/>
																		{errors.AddressLineTwo &&
																		touched.AddressLineTwo ? (
																			<div className='invalid-feedback d-block'>
																				{errors.AddressLineTwo}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='City'>
																			<IntlMessages id='forms.city' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>

																		<Field
																			className='form-control'
																			name='City'
																			placeholder='City'
																			tag={Field}
																		/>
																		{errors.City && touched.City ? (
																			<div className='invalid-feedback d-block'>
																				{errors.City}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='PostCode'>
																			<IntlMessages id='forms.post' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<Field
																			className='form-control'
																			name='PostCode'
																			placeholder='Post Code'
																			type='text'
																			tag={Field}
																		/>
																		{errors.PostCode && touched.PostCode ? (
																			<div className='invalid-feedback d-block'>
																				{errors.PostCode}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>

																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='Country'>
																			<IntlMessages id='Country' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<select
																			name='Country'
																			className='form-control'
																			value={values.Country}
																			onChange={handleChange}
																			onBlur={handleBlur}
																		>
																			<option value=''>-Please select-</option>
																			<option value='1'>United Kingdom</option>
																			<option value='2'>Sri Lanka</option>
																			<option value='3'>India</option>
																			<option value='4'>China</option>
																			<option value='5'>Japan</option>
																		</select>
																		{errors.Country && touched.Country ? (
																			<div className='invalid-feedback d-block'>
																				{errors.Country}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='ContactNo'>
																			<IntlMessages id='forms.contact' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>

																		<InputGroup>
																			<InputGroupAddon addonType='prepend'>
																				<InputGroupText className='simple-icon-call-end' />
																			</InputGroupAddon>
																			<Field
																				className='form-control'
																				name='ContactNo'
																				placeholder='Contact Number'
																				tag={Field}
																			/>
																		</InputGroup>
																		{errors.ContactNo && touched.ContactNo ? (
																			<div className='invalid-feedback d-block'>
																				{errors.ContactNo}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
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
																				name='CompanyEmail'
																				placeholder='Company Email'
																				type='email'
																				tag={Field}
																			/>
																		</InputGroup>
																		{errors.CompanyEmail &&
																		touched.CompanyEmail ? (
																			<div className='invalid-feedback d-block'>
																				{errors.CompanyEmail}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup className='error-l-100'>
																		<IntlMessages id='forms.vat-registration' />

																		<FormikSwitch
																			name='VatRegistated'
																			className='custom-switch custom-switch-primary'
																			value={values.VatRegistated}
																			onChange={setFieldValue}
																			onBlur={setFieldTouched}
																		/>
																		{errors.VatRegistated &&
																		touched.VatRegistated ? (
																			<div className='invalid-feedback d-block'>
																				{errors.VatRegistated}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>

																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='VatNumber'>
																			<IntlMessages id='forms.vat-no' />
																		</Label>
																		<Field
																			className='form-control'
																			name='VatNumber'
																			placeholder='Vat No'
																			type='number'
																			disabled={!values.VatRegistated}
																			tag={Field}
																		/>
																	</FormGroup>
																</Colxx>
															</FormGroup>
														</CardBody>
													</Card>
												</Colxx>
												<br />
												<Colxx xxs='12'>
													<Card>
														<CardBody>
															<CardTitle>
																<IntlMessages id='Owners Details' />
															</CardTitle>
															<FormGroup row>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='S'>
																			<IntlMessages id='Surname' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<Field
																			className='form-control'
																			name='OwnerLastName'
																			placeholder='Surname'
																			type='text'
																			tag={Field}
																		/>
																		{errors.OwnerLastName &&
																		touched.OwnerLastName ? (
																			<div className='invalid-feedback d-block'>
																				{errors.OwnerLastName}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='S'>
																			<IntlMessages id='First Name' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<Field
																			className='form-control'
																			name='OwnerFirstName'
																			placeholder='First Name'
																			type='text'
																			tag={Field}
																		/>
																		{errors.OwnerFirstName &&
																		touched.OwnerFirstName ? (
																			<div className='invalid-feedback d-block'>
																				{errors.OwnerFirstName}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='S'>
																			<IntlMessages id='Mobile' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<Field
																			className='form-control'
																			name='OwnerMobile'
																			placeholder='Mobile Number'
																			type='text'
																			tag={Field}
																		/>
																		{errors.OwnerMobile &&
																		touched.OwnerMobile ? (
																			<div className='invalid-feedback d-block'>
																				{errors.OwnerMobile}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='S'>
																			<IntlMessages id='Email' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<Field
																			className='form-control'
																			name='OwnerEmail'
																			placeholder='Email'
																			type='text'
																			tag={Field}
																		/>
																		{errors.OwnerEmail && touched.OwnerEmail ? (
																			<div className='invalid-feedback d-block'>
																				{errors.OwnerEmail}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
															</FormGroup>
														</CardBody>
													</Card>
												</Colxx>
												<br />
												<Colxx xxs='12'>
													<Card>
														<CardBody>
															<CardTitle>
																<IntlMessages id='Notification Action' />
															</CardTitle>
															<FormGroup row>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='SmsEnable'>
																			<IntlMessages id='forms.sms-alert' />
																		</Label>
																		<FormikSwitch
																			name='SmsEnable'
																			className='custom-switch custom-switch-primary'
																			value={values.SmsEnable}
																			onChange={setFieldValue}
																			onBlur={setFieldTouched}
																			checked={1}
																		/>
																		{errors.SmsEnable && touched.SmsEnable ? (
																			<div className='invalid-feedback d-block'>
																				{errors.SmsEnable}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='EmailEnable'>
																			<IntlMessages id='forms.email-alert' />
																		</Label>
																		<FormikSwitch
																			name='EmailEnable'
																			className='custom-switch custom-switch-primary'
																			value={values.EmailEnable}
																			onChange={setFieldValue}
																			onBlur={setFieldTouched}
																			checked={1}
																		/>
																		{errors.EmailEnable &&
																		touched.EmailEnable ? (
																			<div className='invalid-feedback d-block'>
																				{errors.EmailEnable}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>

																<Colxx sm={6}>
																	<FormGroup>
																		<Label for='PaymentGateway'>
																			<IntlMessages id='PaymentGateway' />
																			<span style={{ color: 'red' }}>
																				<b>*</b>
																			</span>
																		</Label>
																		<select
																			name='Paymentgateway'
																			className='form-control'
																			value={values.Paymentgateway}
																			id='Paymentgateway'
																			onChange={handleChange}
																			onBlur={handleBlur}
																		>
																			<option value=''>-Please select-</option>
																			{this.state.PaymentGateways.map(
																				(Payment) => (
																					<option
																						key={Payment._id}
																						value={Payment._id}
																					>
																						{Payment.Name}
																					</option>
																				)
																			)}
																		</select>
																		{errors.CompanyPaymentgatewaysId &&
																		touched.CompanyPaymentgatewaysId ? (
																			<div className='invalid-feedback d-block'>
																				{errors.CompanyPaymentgatewaysId}
																			</div>
																		) : null}
																	</FormGroup>
																</Colxx>
															</FormGroup>
														</CardBody>
													</Card>
												</Colxx>
												<br />
												<Colxx xxs='12'>
													<FormGroup row>
														<Colxx xxs='6'>
															<Link to={`/app/company/list`}>
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

export default injectIntl(EditCompany);
