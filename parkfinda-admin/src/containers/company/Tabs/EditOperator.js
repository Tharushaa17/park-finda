import React, { Component, Fragment } from 'react';
import {
	Row,
	Card,
	CardBody,
	Input,
	CardTitle,
	FormGroup,
	Label,
	CustomInput,
	Button,
	FormText,
	InputGroup,
	InputGroupText,
	InputGroupAddon,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { iconsmind, simplelineicons } from '../../../data/icons';

import IntlMessages from '../../../helpers/IntlMessages';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please enter first name'),
	lastName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Please enter last name'),
	email: Yup.string()
		.email('Invalid email')
		.required('Please enter email address'),

	selectRole: Yup.string().required('A select option is required!'),
});

class EditOperator extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);

		// this.state = {
		// 	selectedOption: '',
		// 	selectedOptionLabelOver: '',
		// 	selectedOptionLabelTop: '',
		// 	startDate: null,
		// 	startDateLabelOver: null,
		// 	startDateLabelTop: null,
		// 	startDateTime: null,
		// 	startDateRange: null,
		// 	endDateRange: null,
		// 	embeddedDate: moment(),
		// 	tags: [],
		// 	tagsLabelOver: [],
		// 	tagsLabelTop: [],
		// };
	}
	handleSubmit(values) {
		console.log(values);
	}

	render() {
		const { messages } = this.props.intl;

		return (
			<Fragment>
				<Row></Row>

				<Row className='mb-4'>
					<Colxx xxs='12'>
						<Card>
							<CardBody>
								<Formik
									initialValues={{
										firstName: 'Gihan',
										lastName: 'Wijemuni',
										email: 'wmgs@gmail.com',
										selectRole: 'role1',
									}}
									validationSchema={SignupSchema}
									onSubmit={this.handleSubmit}
								>
									{({
										handleChange,
										handleBlur,
										handleSubmit,
										setFieldValue,
										setFieldTouched,
										values,
										errors,
										touched,
										isSubmitting,
									}) => (
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
																name='firstName'
																placeholder='First Name'
															/>
															{errors.firstName && touched.firstName ? (
																<div className='invalid-feedback d-block'>
																	{errors.firstName}
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
																name='lastName'
																placeholder='Last Name'
															/>
															{errors.lastName && touched.lastName ? (
																<div className='invalid-feedback d-block'>
																	{errors.lastName}
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
																	name='email'
																	placeholder='Operator Email'
																/>
															</InputGroup>
															{errors.email && touched.email ? (
																<div className='invalid-feedback d-block'>
																	{errors.email}
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
																name='selectRole'
																className='form-control'
																value={values.selectRole}
																onChange={handleChange}
																onBlur={handleBlur}
															>
																<option value=''>-Please select-</option>
																<option value='role1'>role1</option>
																<option value='role2'>2</option>
																<option value='role3'>3</option>
															</select>
															{errors.selectRole && touched.selectRole ? (
																<div className='invalid-feedback d-block'>
																	{errors.selectRole}
																</div>
															) : null}
														</FormGroup>
													</Colxx>
												</FormGroup>
											</Colxx>
											<Colxx xxs='12'>
												<FormGroup row>
													<Colxx xxs='6'>
														<Button
															color='light'
															type='reset'
															className='default mb-2'
														>
															Cancel
														</Button>{' '}
													</Colxx>
													<Colxx xxs='6'>
														<Button
															color='info'
															type='submit'
															className='default'
															block
														>
															Save
														</Button>{' '}
													</Colxx>
												</FormGroup>
											</Colxx>
										</Form>
									)}
								</Formik>
							</CardBody>
						</Card>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}

export default injectIntl(EditOperator);
