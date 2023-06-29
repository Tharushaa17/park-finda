import { Form, FormGroup, Input, Col, Label } from 'reactstrap';
import React, { Component } from 'react';
import ReactFormInputValidation from "react-form-input-validation";
import '../../franchises/create/index.css';
import Buttons from '../../button';

class TeamsUserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        user_id: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        role: ""
      },
      errors: {}
    };
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
        user_id: "required",
        first_name: "required|alpha",
        last_name: "required|alpha",
        username: "required|unique",
        email: "required|email",
        role: "required|alpha"
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
              <h1>Create User</h1>
            </div>
            <Form onSubmit={this.form.handleSubmit}>

              <FormGroup row>
                <Col md={6}>
                  <Label for="user_id">User ID</Label>
                  <Input type="text"  id="user_id" name="user_id" placeholder="User ID" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.user_id}/>
                  <Label className="error">{this.state.errors.user_id ? this.state.errors.user_id : ""}</Label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={6}>
                  <Label for="first_name">First Name</Label>
                  <Input type="text"  id="first_name" name="first_name" placeholder="First Name" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.first_name}/>
                  <Label className="error">{this.state.errors.first_name ? this.state.errors.first_name : ""}</Label>
                </Col>
                <Col md={6}>
                  <Label for="last_name">Last Name</Label>
                  <Input type="text"  id="last_name" name="last_name" placeholder="Last Name" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.last_name}/>
                  <Label className="error">{this.state.errors.last_name ? this.state.errors.last_name : ""}</Label>
                </Col>
                <Col md={6}>
                  <Label for="username">Username</Label>
                  <Input type="text"  id="username" name="username" placeholder="Address Line 2" onBlur={this.form.handleBlurEvent} onChange={this.form.handleChangeEvent} value={this.state.fields.username}/>
                  <Label className="error">{this.state.errors.username ? this.state.errors.username : ""}</Label>
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

              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Check me out
                </Label>
              </FormGroup>
              <br></br>
              <Buttons outline="outline" color="primary" value="Create" />&nbsp;
            </Form>
          </div>
        </React.Fragment>
        );
    }
}

export default TeamsUserForms;