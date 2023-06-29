import { Form, FormGroup, Input, Col, Label } from 'reactstrap';
import React, { Component } from 'react';
import ReactFormInputValidation from "react-form-input-validation";
import './index.css';
import Buttons from '../../button';

class CreateFranchise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        company: "",
        franchise: "",
        address_line1: "",
        address_line2: "",
        postal_code: "",
        city: "",
        state: "",
        firstname: "",
        lastname: "",
        telephone: "",
        email: "",
        mobile: "",
        commision: "",
        service: "",
        charges: ""
      },
      errors: {}
    };
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
        company: "required",
        franchise: "required|alpha",
        address_line1: "required",
        address_line2: "required",
        postal_code: "required|numeric",
        city: "required|alpha",
        state: "required|alpha",
        firstname: "required|alpha",
        lastname: "required|alpha",
        telephone: "required|numeric|digits_between:10,12",
        email: "required|email",
        mobile: "required|numeric|digits_between:10,12",
        commision: "required|numeric|digits_between:1,3",
        service: "required|numeric",
        charges: "required|numeric",
    });
    this.form.onformsubmit = (fields) => {
      // Do you ajax calls here.
    }
  }
    render() {
        return (
        <React.Fragment>
          <div>
            <div>
              <h1>Edit Franchise</h1>
            </div>
            <Form onSubmit={this.form.handleSubmit}>
              <FormGroup row>
                <Col md={6}>
                  <Label for="country">Select Country</Label>
                  <Input type='select'  id="country">
                    <option>Select</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={6}>
                  <Label for="company">Company Name</Label>
                  <Input type="text"  id="company" name="company" placeholder="Company Name" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.company}/>
                  <Label className="error">{this.state.errors.company ? this.state.errors.company : ""}</Label>
                </Col>
                <Col md={6}>
                  <Label for="franchise">Franchise Name</Label>
                  <Input type="text"  id="franchise" name="franchise" placeholder="Franchise Name" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.franchise}/>
                  <Label className="error">{this.state.errors.franchise ? this.state.errors.franchise : ""}</Label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={6}>
                  <Label for="address_line1">Address Line 1</Label>
                  <Input type="text"  id="address_line1" name="address_line1" placeholder="Address Line 1" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.address_line1}/>
                  <Label className="error">{this.state.errors.address_line1 ? this.state.errors.address_line1 : ""}</Label>
                </Col>
                <Col md={6}>
                  <Label for="address_line2">Address Line 2</Label>
                  <Input type="text"  id="address_line2" name="address_line2" placeholder="Address Line 2" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.address_line2}/>
                  <Label className="error">{this.state.errors.address_line2 ? this.state.errors.address_line2 : ""}</Label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={6}>
                  <Label for="address_line3">Address Line 3</Label>
                  <Input type="text"  id="address_line3" placeholder="Address Line 3"/>
                </Col>
                <Col md={6}>
                  <Label for="postal_code">Postal Code</Label>
                  <Input type="text"  id="postal_code" name="postal_code" placeholder="Postal Code" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.postal_code}/>
                  <Label className="error">{this.state.errors.postal_code ? this.state.errors.postal_code : ""}</Label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={6}>
                  <Label for="city">City</Label>
                  <Input type="text" name="city" id="city" placeholder="City" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.city}/>
                  <Label className="error">{this.state.errors.city ? this.state.errors.city : ""}</Label>
                </Col>
                <Col md={6}>
                  <Label for="state">State/Country/Province</Label>
                  <Input type="text" name="state" id="state" placeholder="State/Country/Province" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.state}/>
                  <Label className="error">{this.state.errors.state ? this.state.errors.state : ""}</Label>
                </Col>
              </FormGroup>

              <br></br>
              <h3>Contact</h3>
              <hr></hr>

              <FormGroup row>
                <Col md={6}>
                  <Label for="firstname">First Name</Label>
                  <Input type="text" name="firstname" id="firstname" placeholder="First Name" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.firstname}/>
                  <Label className="error">{this.state.errors.firstname ? this.state.errors.firstname : ""}</Label>
                </Col>
                <Col md={6}>
                  <Label for="lastname">Last Name</Label>
                  <Input type="text" name="lastname" id="lastname" placeholder="Last Name" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.lastname}/>
                  <Label className="error">{this.state.errors.lastname ? this.state.errors.lastname : ""}</Label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={6}>
                  <Label for="telephone">Telephone</Label>
                  <Input type="text" name="telephone" id="telephone" placeholder="Telephone" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.telephone}/>
                  <Label className="error">{this.state.errors.telephone ? this.state.errors.telephone : ""}</Label>
                </Col>
                <Col md={6}>
                  <Label for="mobile">Mobile Number</Label>
                  <Input type="text" name="mobile" id="mobile" placeholder="Mobile Number" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.mobile}/>
                  <Label className="error">{this.state.errors.mobile ? this.state.errors.mobile : ""}</Label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={6}>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" placeholder="Email" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.email}/>
                  <Label className="error">{this.state.errors.email ? this.state.errors.email : ""}</Label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={6}>
                  <Label for="logo">Logo Upload</Label>
                  <Input type="file" id="logo"/>
                </Col>
              </FormGroup>

              <br></br>
              <h3>Service Package</h3>
              <hr></hr>

              <FormGroup row>
                <Col md={4}>
                  <Label for="commision">Commision (%)</Label>
                  <Input type="text" name="commision" id="commision" placeholder="Commision" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.commision}/>
                  <Label className="error">{this.state.errors.commision ? this.state.errors.commision : ""}</Label>
                </Col>
                <Col md={4}>
                  <Label for="service">Service Fee</Label>
                  <Input type="text" name="service" id="service" placeholder="Service Fee" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.service}/>
                  <Label className="error">{this.state.errors.service ? this.state.errors.service : ""}</Label>
                </Col>
                <Col md={4}>
                  <Label for="charges">Service Charges</Label>
                  <Input type="text" name="charges" id="charges" placeholder="Service Charges" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.charges}/>
                  <Label className="error">{this.state.errors.charges ? this.state.errors.charges : ""}</Label>
                </Col>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Check me out
                </Label>
              </FormGroup>
              <br></br>
              <Buttons outline="outline" color="primary" value="Update" />&nbsp;
            </Form>
          </div>
        </React.Fragment>
        );
    }
}

export default CreateFranchise;