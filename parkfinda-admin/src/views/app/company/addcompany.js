import React, { Component, Fragment } from "react";
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
} from "reactstrap";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

import IntlMessages from "../../../helpers/IntlMessages";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import { NotificationManager } from "../../../components/common/react-notifications";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { saveCompany } from "../../../services/companyService";
import { getPayments } from "../../../services/paymentGatewayService";
import { Formik, Form, Field } from "formik";
import { FormikSwitch } from "./../../../components/FormikFields";
import * as Yup from "yup";

const phoneRegExp = /^\+(?:[0-9]●?){6,14}[0-9]$/;
const emailRefExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ValidationMessage = Yup.object().shape({
  // OperaterName: Yup.string()
  //   .required("Operater Name is required"),
  // CompanyName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Company Name is required"),
  // AddressLineOne: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Address is required"),
  // City: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("City is required"),
  // Country: Yup.string().required("Country is required"),
  // State: Yup.string().required("Country/State/Province is required"),
  // PostCode: Yup.string().required('Post Code is required'),
  // CompanyEmail: Yup.string()
  //   .matches(emailRefExp, "Company Email is not valid")
  //   .required("Company Email is required"),
  // ContactNo: Yup.string()
  //   // .matches(phoneRegExp, 'Company Contact No. is not valid')
  //   .required('Company Contact No. is required'),
  // OwnerFirstName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
	// 	.matches(/^[aA-zZ\s]+$/, 'Owner First Name is not valid')
	// 	.required('Owner First Name is required'),
  // FullName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
	// 	.matches(/^[aA-zZ\s]+$/, 'Owner Full Name is not valid')
  //   .required("Owner Full Name is required"),
  // OwnerMobile: Yup.string()
  //   // .matches(phoneRegExp, 'Owner Mobile No. is not valid')
  //   .required("Owner Mobile No. is required"),
  // // Paymentgateway: Yup.string().required("Payment Gateway is required"),
  // VatRegistated: Yup.boolean(),
  // VatNumber: Yup.number().when("VatRegistated", {
  //   is: (value) => value && value === true,
  //   then: Yup.number('Vat Number can only contain numbers')
  //     .required("Vat Number is required")
  //     .positive()
  //     .integer(),
  // }),
});

class AddCompany extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: {
      Country: "",
      OperaterName: "",
      AddressLineOne: "",
      AddressLineTwo: "",
      AddressLineThree: "",
      PostCode: "",
      City: "",
      State: "",
      VatRegistated: false,
      VatNumber: "",
      FullName: "",
      OwnerMobile: "",
      ContactNo: "",
      CompanyEmail: "",
      WebSite: "",
      IPG: "",
      Type: "",
      HolderName: "",
      Bank: "",
      Branch: "",
      BranchCode: "",
      AccountNumber: "",
      CommissionFee: "",
      ServiceFee: "",
      BookingFee: "",
    },
    PaymentGateways: [],
    errors: {},
    loading: false,
  };
  async componentDidMount() {
    const { data: PaymentGateways } = await getPayments();
    this.setState({ PaymentGateways: PaymentGateways });
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.addcompany" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <h4>Add New Company</h4>
                </CardTitle>
                <Formik
                  initialValues={{
                    ...this.state.data,
                  }}
                  validationSchema={ValidationMessage}
                  onSubmit={async (values) => {
                    this.setState({ loading: true });
                    // try {
                      const response = await saveCompany(values);
                      console.log(response);
                      if (response) {
                        NotificationManager.success(
                          "Added a new company ",
                          "Done",
                          3000,
                          null,
                          null,
                          ""
                        );
                        this.props.history.push("list");
                      } else {
                        this.setState({ loading: false });
                        console.log("error");
                      }
                    // } catch (error) {
                      this.setState({ loading: false });
                      // console.error(error);
                      NotificationManager.warning(
                        "Something is wrong",
                        "Error",
                        3000,
                        null,
                        null,
                        ""
                      );
                    // }
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
                        className="av-tooltip tooltip-label-right"
                        onSubmit={handleSubmit}
                      >
                        <Colxx xxs="12">
                          <CardTitle>
                            <IntlMessages id="Company Details" />
                          </CardTitle>
                          <FormGroup row>
                          <Colxx sm={6}>
                              <FormGroup>
                                <Label for="Country">
                                  <IntlMessages id="Country" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <select
                                  name="Country"
                                  className="form-control"
                                  value={values.Country}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="">-Please select-</option>
                                  <option value="1">United Kingdom</option>
                                  <option value="2">Sri Lanka</option>
                                  <option value="3">India</option>
                                  <option value="4">China</option>
                                  <option value="5">Japan</option>
                                </select>
                                {errors.Country && touched.Country ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.Country}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>

                            <Colxx sm={12}>
                              <FormGroup>
                                <Label for="OperaterName">
                                  <IntlMessages id="Operater Name" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="OperaterName"
                                  placeholder="Operater Name"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.OperaterName && touched.OperaterName ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.OperaterName}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="Address">
                                  <IntlMessages id="forms.address-1" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="AddressLineOne"
                                  placeholder="Address Line one"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.AddressLineOne &&
                                touched.AddressLineOne ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.AddressLineOne}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="Address">
                                  <IntlMessages id="forms.address-2" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="AddressLineTwo"
                                  placeholder="Address Line Two"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.AddressLineTwo &&
                                touched.AddressLineTwo ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.AddressLineTwo}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="Address">
                                  <IntlMessages id="Address Line Three" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="AddressLineThree"
                                  placeholder="Address Line Three"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.AddressLineThree &&
                                touched.AddressLineThree ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.AddressLineThree}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="PostCode">
                                  <IntlMessages id="forms.post" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="PostCode"
                                  placeholder="Post Code"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.PostCode && touched.PostCode ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.PostCode}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="City">
                                  <IntlMessages id="forms.city" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>

                                <Field
                                  className="form-control"
                                  name="City"
                                  placeholder="City"
                                  tag={Field}
                                />
                                {errors.City && touched.City ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.City}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>

                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="Country/State/Province">
                                  <IntlMessages id="Country/State/Province" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="State"
                                  placeholder="Country/State/Province"
                                  tag={Field}
                                />
                                {errors.State && touched.State ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.State}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            
                            <Colxx sm={6}>
                              <FormGroup className="error-l-100">
                                <IntlMessages id="forms.vat-registration" />

                                <FormikSwitch
                                  name="VatRegistated"
                                  className="custom-switch custom-switch-primary"
                                  value={values.VatRegistated}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.VatRegistated &&
                                touched.VatRegistated ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.VatRegistated}
                                  </div>
                                ) : null}
                              </FormGroup>
                              <FormGroup>
                                <Label for="VatNumber">
                                  <IntlMessages id="forms.vat-no" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="VatNumber"
                                  placeholder="Vat No"
                                  type="number"
                                  disabled={!values.VatRegistated}
                                  tag={Field}
                                />
                                {errors.VatNumber && touched.VatNumber ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.VatNumber}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                          </FormGroup>
                        </Colxx>
                        <br />
                        <Colxx xxs="12">
                          <CardTitle>
                            <IntlMessages id="Owners Details" />
                          </CardTitle>
                          <FormGroup row>
                            <Colxx sm={12}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Full Name" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="FullName"
                                  placeholder="Full Name"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.FullName &&
                                touched.FullName ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.FullName}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Mobile" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="OwnerMobile"
                                  placeholder="Mobile Number"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.OwnerMobile && touched.OwnerMobile ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.OwnerMobile}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="ContactNo">
                                  <IntlMessages id="forms.contact" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>

                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText className="simple-icon-call-end" />
                                  </InputGroupAddon>
                                  <Field
                                    className="form-control"
                                    name="ContactNo"
                                    placeholder="Contact Number"
                                    tag={Field}
                                  />
                                </InputGroup>
                                {errors.ContactNo && touched.ContactNo ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.ContactNo}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="Email">
                                  <IntlMessages id="forms.email" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>

                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText className="iconsminds-mail" />
                                  </InputGroupAddon>
                                  <Field
                                    className="form-control"
                                    name="CompanyEmail"
                                    placeholder="Company Email"
                                    type="email"
                                    tag={Field}
                                  />
                                </InputGroup>
                                {errors.CompanyEmail && touched.CompanyEmail ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.CompanyEmail}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Web Site" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="WebSite"
                                  placeholder="Web Site"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.WebSite && touched.WebSite ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.WebSite}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="Type">
                                  <IntlMessages id="Type" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <select
                                  name="Type"
                                  className="form-control"
                                  value={values.Type}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="">-Please select-</option>
                                </select>
                                {errors.Type && touched.Type ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.Type}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="IPG">
                                  <IntlMessages id="IPG" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <select
                                  name="IPG"
                                  className="form-control"
                                  value={values.IPG}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="">-Please select-</option>
                                </select>
                                {errors.IPG && touched.IPG ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.IPG}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                          </FormGroup>
                        </Colxx>
                        <br />
                        <FormGroup row>
    
                        </FormGroup>
                        <Colxx xxs="12">
                          <CardTitle>
                            <IntlMessages id="Bank Details" />
                          </CardTitle>
                          <FormGroup row>
                          <Colxx sm={6}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Account Holders Name" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="HolderName"
                                  placeholder="Account Holders Name"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.HolderName && touched.HolderName ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.HolderName}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Bank Name" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="Bank"
                                  placeholder="Bank Name"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.Bank && touched.Bank ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.Bank}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Branch (if applicable)" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="Branch"
                                  placeholder="Branch"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.Branch && touched.Branch ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.Branch}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Sort Code / Branch Code" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="BranchCode"
                                  placeholder="Sort Code / Branch Code"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.BranchCode && touched.BranchCode ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.BranchCode}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Account Number" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="AccountNumber"
                                  placeholder="Account Number"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.AccountNumber && touched.AccountNumber ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.AccountNumber}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="12">
                          
                          <FormGroup row>
                          <Colxx sm={4}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Commision Fee" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="CommissionFee"
                                  placeholder="Commision Fee"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.CommissionFee && touched.CommissionFee ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.CommissionFee}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={4}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Service Fee" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="ServiceFee"
                                  placeholder="Service Fee"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.ServiceFee && touched.ServiceFee ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.ServiceFee}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={4}>
                              <FormGroup>
                                <Label for="S">
                                  <IntlMessages id="Booking Fee" />
                                  <span style={{ color: "red" }}>
                                    <b>*</b>
                                  </span>
                                </Label>
                                <Field
                                  className="form-control"
                                  name="BookingFee"
                                  placeholder="Booking Fee"
                                  type="text"
                                  tag={Field}
                                />
                                {errors.BookingFee && touched.BookingFee ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.BookingFee}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                          </FormGroup>
                        </Colxx>
                        <br />
                        <div className="border mb-4"></div>
                        <Colxx xxs="12">
                          <FormGroup row>
                            <Colxx xxs="6">
                              <Link to={`/app/company/list`}>
                                <Button
                                  color="light"
                                  type="reset"
                                  className="default mb-2"
                                >
                                  Cancel
                                </Button>
                              </Link>
                            </Colxx>
                            <Colxx xxs="6">
                              <Button
                                color="info"
                                type="submit"
                                className={`btn-shadow btn-multiple-state default ${
                                  this.state.loading ? "show-spinner" : ""
                                }`}
                                block
                              >
                                <span className="spinner d-inline-block">
                                  <span className="bounce1" />
                                  <span className="bounce2" />
                                  <span className="bounce3" />
                                </span>
                                <span className="label">
                                  <IntlMessages id="Create Now" />
                                </span>
                              </Button>{" "}
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

export default injectIntl(AddCompany);
