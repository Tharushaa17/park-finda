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

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import {  getCompanys } from '../../../services/companyService';
import { getPayments } from '../../../services/paymentGatewayService';
import { Formik, Form, Field } from 'formik';
import { FormikSwitch } from './../../../components/FormikFields';

class ViewCompany extends Component {
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
	};
	async populateForm() {
		try {
			const companyId = "edit";

			if (companyId !== 'new') {
				const { data } = await getCompanys();

				this.setState({ data : data[0] });
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
						<Breadcrumb heading='menu.viewcompany' match={this.props.match} />
						<Separator className='mb-5' />
					</Colxx>
				</Row>

				<Row className='mb-4'>
					<Colxx xxs='12'>
						<Card>
							<CardBody>
								<CardTitle>
									<h4>View Company</h4>
								</CardTitle>
								<Formik
									enableReinitialize
									initialValues={{
										...this.state.data,
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
											<Form className='av-tooltip tooltip-label-right'>
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
																			disabled
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
																			disabled
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
																			disabled
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
																			disabled
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
																			disabled
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
																			disabled
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
																				type='number'
																				tag={Field}
																				disabled
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
																				disabled
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
																			disabled
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
																			disabled
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
																			disabled
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
																			disabled
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
																			disabled
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
																			disabled
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
																			disabled
																		/>
																		{errors.EmailEnable &&
																		touched.EmailEnable ? (
																			<div className='invalid-feedback d-block'>
																				{errors.EmailEnable}
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

export default injectIntl(ViewCompany);
