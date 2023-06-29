import React, { Component, Fragment } from "react";

import {
  Row,
  CardBody,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { injectIntl } from "react-intl";

import IntlMessages from "../../../../helpers/IntlMessages";
import { NotificationManager } from "../../../../components/common/react-notifications";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../../../../assets/customstyle.css";
import { Formik, Form, Field } from "formik";
import {
  Colxx,
  Separator,
} from "../../../../components/common/CustomBootstrap";
import * as Yup from "yup";
import DropzoneExample from "./DropzoneExample";
import { storage } from "../../../../helpers/Firebase";

const phoneRegExp = /^\+(?:[0-9]●?){6,14}[0-9]$/;
const emailRefExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const carParkSchema = Yup.object().shape({
  companyName: Yup.string()
    .required("Company is required"),
  carParkName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Car Park Name is required"),
  addressLine1: Yup.string()
    .required("Address is required"),
  addressLine2: Yup.string(),
  city: Yup.string()
    .required("City is required"),
  postCode: Yup.string().required('Post Code is required'),
  latitude: Yup.number()
    .required('Latitude is required'),
  longitude: Yup.number()
    .required("Longitude is required"),
  contactPersonName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[aA-zZ\s]+$/, 'Contact Person Name is not valid')
    .required("Contact Person Name is required"),
  contactNumber: Yup.string()
    .matches(phoneRegExp, 'Contact No. is not valid')
    .required('Contact No. is required'),
  email: Yup.string()
    .matches(emailRefExp, "Email is not valid")
    .required("Email is required"),
  maxHeight: Yup.number("Max Height can only contain numbers")
    .positive()
    .required("Max Height is required"),
  spaceDescription: Yup.string().required("Space Description is required"),
  accessPinNumber: Yup.string(),
  accessSpaceDescription: Yup.string().required(
    "Access Space Description is required"
  ),
  noOfSpaces: Yup.number()
    .min(1, "No. of Spaces should be more than 1")
    .required("Space Amount is required"),
  photos: Yup.array(),
});

class AddCarpark extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errors: {},
      isLoading: false
    };
  }

  handleSubmit(values) {
  }

  componentDidMount() {
    if (!this.props.data) {
      this.props.update({
        companyName: "",
        carParkName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postCode: "",
        latitude: "",
        longitude: "",
        contactPersonName: "",
        contactNumber: "",
        email: "",
        maxHeight: "",
        spaceDescription: "",
        accessPinNumber: "",
        accessSpaceDescription: "",
        noOfSpaces: "",
        photos: [],
      });
    } else {
      if (this.props.data.photos[0]) {
        this.getImageUrl(this.props.data.photos);
      }
    }
  }

  onChange = (name, value) => {
    let newData = { ...this.props.data };
    newData[name] = value;
    let newError = { ...this.state.errors };
    if (!Yup.reach(carParkSchema, name).isValidSync(value)) {
      newError[name] = "Please enter a valid value";
    } else {
      newError[name] = null;
    }
    this.setState({
      errors: newError,
    });
    this.props.update(newData);
  };

  getImageUrl = (photos) => {
    const imageRef = storage.ref().child(`images/${photos[0]}`);
    imageRef.getDownloadURL().then((url) => {
      this.setState({
        carParkPhoto: url,
      });
    });
  };

  isEditRestricted = (role) => {
    if (role) {
      switch (role) {
        case "operator":
          return true;
        default:
          return false;
      }
    }
    return false;
  };

  setIsLoading = (value) => {
    this.setState({ isLoading: value })
  }

  render() {
    const { data, companies } = this.props;
    return (
      <Fragment>
        <Row className="mb-4">
          <div className="offset-2 col-8">
            <CardBody>
              <Formik
                initialValues={{
                  ...data,
                }}
                validationSchema={carParkSchema}
                render={({
                  values,
                  errors,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  touched,
                  setFieldTouched,
                  setFieldValue,
                  validateForm,
                }) => {
                  return (
                    <>
                      <Form className="av-tooltip tooltip-center-bottom">
                        <FormGroup row>
                          <Colxx sm={12}>
                            <FormGroup>
                              <Label for="CompanyName" className="req-field">
                                <IntlMessages id="forms.company-name" />
                              </Label>
                              <Field name="companyName">
                                {({ field, form, meta }) => {
                                  return (
                                    <Input
                                      name="companyName"
                                      className="form-control"
                                      type="select"
                                      {...field}
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      readOnly={this.props.editRestricted}
                                    >
                                      <option value={null}>
                                        Select Company
                                      </option>
                                      {companies.map((company) => {
                                        return (
                                          <option
                                            value={company._id}
                                            key={company._id}
                                          >
                                            {company.CompanyName}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  );
                                }}
                              </Field>
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={12}>
                            <FormGroup>
                              <Label for="CarParkName">
                                <IntlMessages id="forms.park-name" />
                                <span style={{ color: "red" }}>
                                  <b>*</b>
                                </span>
                              </Label>
                              <Field
                                id="carParkName"
                                type="text"
                                className="form-control"
                                placeholder="Enter Car Park Name"
                                name="carParkName"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.carParkName && touched.carParkName && (
                                <div className="invalid-feedback d-block">
                                  {errors.carParkName}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={12}>
                            <FormGroup>
                              <Label for="Address">
                                <IntlMessages id="forms.address" />
                                <span style={{ color: "red" }}>
                                  <b>*</b>
                                </span>
                              </Label>
                              <Field
                                className="form-control"
                                placeholder="Address Line one"
                                name="addressLine1"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.addressLine1 && touched.addressLine1 && (
                                <div className="invalid-feedback d-block">
                                  {errors.addressLine1}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={12}>
                            <FormGroup>
                              <Field
                                className="form-control"
                                placeholder="Address Line Two"
                                name="addressLine2"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.addressLine2 && touched.addressLine2 && (
                                <div className="invalid-feedback d-block">
                                  {errors.addressLine2}
                                </div>
                              )}
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
                                placeholder="City"
                                name="city"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.city && touched.city && (
                                <div className="invalid-feedback d-block">
                                  {errors.city}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={6}>
                            <FormGroup>
                              <Label for="PostCode" className="req-field">
                                <IntlMessages id="forms.post" />
                              </Label>
                              <Field
                                className="form-control"
                                name="postCode"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.postCode && touched.postCode && (
                                <div className="invalid-feedback d-block">
                                  {errors.postCode}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={6}>
                            <FormGroup>
                              <Label for="Latitude" className="req-field">
                                <IntlMessages id="forms.latitude" />
                              </Label>
                              <Field
                                className="form-control"
                                name="latitude"
                                type="number"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.latitude && touched.latitude && (
                                <div className="invalid-feedback d-block">
                                  {errors.latitude}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>

                          <Colxx sm={6}>
                            <FormGroup>
                              <Label for="Longitude" className="req-field">
                                <IntlMessages id="forms.longitude" />
                              </Label>
                              <Field
                                className="form-control"
                                name="longitude"
                                type="number"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.longitude && touched.longitude && (
                                <div className="invalid-feedback d-block">
                                  {errors.longitude}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={12}>
                            <FormGroup>
                              <Label for="PersonName">
                                <IntlMessages id="forms.person-name" />
                                <span style={{ color: "red" }}>
                                  <b>*</b>
                                </span>
                              </Label>
                              <Field
                                className="form-control"
                                name="contactPersonName"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.contactPersonName &&
                                touched.contactPersonName && (
                                  <div className="invalid-feedback d-block">
                                    {errors.contactPersonName}
                                  </div>
                                )}
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
                              <Field
                                className="form-control"
                                name="contactNumber"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.contactNumber &&
                                touched.contactNumber && (
                                  <div className="invalid-feedback d-block">
                                    {errors.contactNumber}
                                  </div>
                                )}
                            </FormGroup>
                          </Colxx>

                          <Colxx sm={6}>
                            <FormGroup>
                              <Label for="Email" className="req-field">
                                <IntlMessages id="forms.email" />
                              </Label>
                              <Field
                                className="form-control"
                                name="email"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.email && touched.email && (
                                <div className="invalid-feedback d-block">
                                  {errors.email}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={6}>
                            <FormGroup>
                              <Label for="MaxHeight" className="req-field">
                                <IntlMessages id="forms.max" />
                              </Label>
                              <Field
                                className="form-control"
                                name="maxHeight"
                                type="number"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.maxHeight && touched.maxHeight && (
                                <div className="invalid-feedback d-block">
                                  {errors.maxHeight}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={6}>
                            <FormGroup>
                              <Label className="req-field">
                                Number of spaces
                              </Label>
                              <Field
                                className="form-control"
                                name="noOfSpaces"
                                type="number"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.noOfSpaces && touched.noOfSpaces && (
                                <div className="invalid-feedback d-block">
                                  {errors.noOfSpaces}
                                </div>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={12}>
                            <Separator className="mb-5 mt-3" />
                            <h5 className="mb-3">Car Park Description</h5>
                          </Colxx>
                          <Colxx sm={12}>
                            <FormGroup>
                              <Label
                                for="SpaceDescription"
                                className="req-field"
                              >
                                Space Description
                              </Label>
                              <Field name="spaceDescription">
                                {({ field, form, meta }) => {
                                  return (
                                    <textarea
                                      name="spaceDescription"
                                      value={field.value}
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      className="form-control"
                                      readOnly={this.props.editRestricted}
                                    />
                                  );
                                }}
                              </Field>
                              {errors.spaceDescription &&
                                touched.spaceDescription && (
                                  <div className="invalid-feedback d-block">
                                    {errors.spaceDescription}
                                  </div>
                                )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={6}>
                            <FormGroup>
                              <Label
                                for="AccessPinNumber"
                              >
                                Access Pin Number
                              </Label>
                              <Field
                                className="form-control"
                                name="accessPinNumber"
                                readOnly={this.props.editRestricted}
                              />
                              {errors.accessPinNumber &&
                                touched.accessPinNumber && (
                                  <div className="invalid-feedback d-block">
                                    {errors.accessPinNumber}
                                  </div>
                                )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={12}>
                            <h5 className="mb-3 mt-3">
                              Car Park Access Information
                            </h5>
                          </Colxx>
                          <Colxx sm={12}>
                            <FormGroup>
                              <Label
                                for="AccessSpaceDescription"
                                className="req-field"
                              >
                                Access Description
                              </Label>
                              <Field name="accessSpaceDescription">
                                {({ field, form, meta }) => {
                                  return (
                                    <textarea
                                      name="accessSpaceDescription"
                                      value={field.value}
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      className="form-control"
                                      readOnly={this.props.editRestricted}
                                    />
                                  );
                                }}
                              </Field>
                              {errors.accessSpaceDescription &&
                                touched.accessSpaceDescription && (
                                  <div className="invalid-feedback d-block">
                                    {errors.accessSpaceDescription}
                                  </div>
                                )}
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={12}>
                            {!this.props.editRestricted && (
                              <Label>Upload Car Park Photos</Label>
                            )}
                            {!this.props.editRestricted && (
                              <DropzoneExample
                                upload={(photo) => {
                                  const existingPhotos = values.photos || [];
                                  console.log(photo);
                                  setFieldValue("photos", [
                                    ...existingPhotos,
                                    photo.name,
                                  ]);
                                }}
                                removeFile={(photo) => {
                                  const existingPhotos = values.photos || [];
                                  setFieldValue(
                                    "photos",
                                    existingPhotos.filter(
                                      (p) => p !== photo.name
                                    )
                                  );
                                }}
                                setLoading={this.setIsLoading}
                              />
                            )}
                          </Colxx>
                        </FormGroup>
                      </Form>
                      <div className={"wizard-buttons justify-content-between"}>
                        <Button
                          color="primary outline"
                          className={
                            "mr-1 " +
                            (this.props.steps.indexOf(this.props.step) <= 0
                              ? "disabled"
                              : "")
                          }
                          onClick={() => {
                            this.props.previous();
                          }}
                        >
                          Prev
                        </Button>
                        {
                          <Button
                            color="primary outline"
                            className={ `${
                              this.props.steps.indexOf(this.props.step) >=
                              this.props.steps.length - 1
                                ? "d-none "
                                : " "} btn-shadow btn-multiple-state ${this.state.isLoading ? "show-spinner" : ""}`
                            }
                            onClick={() => {
                              validateForm().then((res) => {
                                if (Object.keys(res).length === 0) {
                                  this.props.update(values);
                                  this.props.next();
                                } else {
                                  NotificationManager.warning(
                                    Object.values(res).toString(),
                                    "Error",
                                    3000,
                                    null,
                                    null,
                                    ""
                                  );
                                }
                              });
                            }}
                          >
                            <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                            </span>
                            <span className="label">Next</span>
                          </Button>
                        }
                      </div>
                      {!this.props.editRestricted && (
                        <div className="mt-4 mb-4 d-flex justify-content-end">
                          <Button
                            color="primary"
                            className={`btn-shadow btn-multiple-state ${this.state.isLoading ? "show-spinner" : ""}`}
                            onClick={() => {
                              validateForm().then((res) => {
                                if (Object.keys(res).length === 0) {
                                  this.props.update(values);
                                  this.props.save();
                                } else {
                                  NotificationManager.warning(
                                    Object.values(res).toString(),
                                    "Error",
                                    3000,
                                    null,
                                    null,
                                    ""
                                  );
                                }
                              });
                            }}

                          >
                            <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                            </span>
                            <span className="label">Save</span>
                          </Button>
                        </div>
                      )}
                    </>
                  );
                }}
              ></Formik>
            </CardBody>
          </div>
        </Row>
      </Fragment>
    );
  }
}

export default injectIntl(AddCarpark);
