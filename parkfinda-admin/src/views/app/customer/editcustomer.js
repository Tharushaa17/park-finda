import React, { Component, Fragment } from 'react';
import {
	Row,
	Card,
	CardBody,
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
import 'react-tagsinput/react-tagsinput.css';

import { NotificationManager } from '../../../components/common/react-notifications';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { saveCustomer, getCustomer } from '../../../services/customerService';
import { Formik, Form, Field } from 'formik';
import { FormikSwitch } from './../../../components/FormikFields';
import * as Yup from 'yup';
import TagsInput from 'react-tagsinput';

const phoneRegExp = /^\+(?:[0-9]●?){6,14}[0-9]$/;
const emailRefExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ValidationMessage = Yup.object().shape({
	CustomerName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.matches(/^[aA-zZ\s]+$/, 'Name is not valid')
		.required('Customer Name is required'),
	Email: Yup.string()
		.matches(emailRefExp, 'Email is not valid')
		.required('Email is required'),
	MobileNum: Yup.string()
		.matches(phoneRegExp, 'Contact No. is not valid')
		.required('Contact No. is required'),
	Vehicles: Yup.string().required('VRN is required'),
});

class EditCustomer extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		data: {
			CustomerName: '',
			Email: '',
			MobileNum: '',
			Vehicles: [],
			Status: false,
		},
		loading: false,
	};
	async populateForm() {
		try {
			const customerId = this.props.match.params.id;

			if (customerId !== 'new') {
				const { data } = await getCustomer(customerId);

				this.setState({ data });
			}
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.props.history.replace('/not-found');
			}
		}
	}
	async componentDidMount() {
		await this.populateForm();
	}
	render() {
		return (
			<Fragment>
				<Row>
					<Colxx xxs='12'>
						<Breadcrumb heading='menu.editcustomer' match={this.props.match} />
						<Separator className='mb-5' />
					</Colxx>
				</Row>

				<Row className='mb-4'>
					<Colxx xxs='12'>
						<Card>
							<CardBody>
								<CardTitle>
									<h4>Update Customer</h4>
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
											const response = await saveCustomer(values);
											if (response.data?.status) {
												NotificationManager.success(
													'Updated customer ',
													'Done',
													3000,
													null,
													null,
													''
												);
												this.props.history.push('/app/customer/customers');
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
													<FormGroup row>
														<Colxx sm={6}>
															<FormGroup>
																<Label for='CustomerName' className='req-field'>
																	<IntlMessages id='Customer Name' />
																</Label>
																<Field
																	className='form-control'
																	name='CustomerName'
																	placeholder='CustomerName'
																	type='text'
																	tag={Field}
																/>
																{errors.CustomerName && touched.CustomerName ? (
																	<div className='invalid-feedback d-block'>
																		{errors.CustomerName}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>

														<Colxx sm={6}>
															<FormGroup>
																<Label for='Email' className='req-field'>
																	<IntlMessages id='Customer Email' />
																</Label>
																<Field
																	className='form-control'
																	name='Email'
																	placeholder='Customer Email'
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
																<Label for='VRN' className='req-field'>
																	<IntlMessages id='VRN' />
																</Label>
																<TagsInput
																	name='Vehicles'
																	value={values.Vehicles.map((v) => v.VRN)}
																	onChange={(vrns) => {
																		const vehicles = vrns.map((v) => ({
																			VRN: v,
																		}));
																		console.log(vehicles);
																		setFieldValue('Vehicles', vehicles);
																	}}
																/>
																{errors.Vehicles && touched.Vehicles ? (
																	<div className='invalid-feedback d-block'>
																		{errors.Vehicles}
																	</div>
																) : null}
															</FormGroup>
														</Colxx>
														<Colxx sm={6}>
															<FormGroup className='error-l-100'>
																<IntlMessages id='Status' />

																<FormikSwitch
																	name='Status'
																	className='custom-switch custom-switch-primary'
																	value={values.Status}
																	onChange={setFieldValue}
																	onBlur={setFieldTouched}
																/>
															</FormGroup>
														</Colxx>
													</FormGroup>
												</Colxx>
												<br />

												<Colxx xxs='12'>
													<FormGroup row>
														<Colxx xxs='6'>
															<Link to={`/app/customer/customers`}>
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

export default injectIntl(EditCustomer);
