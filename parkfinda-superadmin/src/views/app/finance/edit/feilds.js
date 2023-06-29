import React, { Component } from 'react';
import { Form, FormGroup, Input, Col, Label } from 'reactstrap';
import Buttons from '../../button';

class EditFields extends Component {
    render(props) {
        return (
            <Form>
                <FormGroup row>
                    <Col md={6}>
                    <Label for="country">Payment</Label>
                    <Input type='text'  id="country">
                        <option>Select</option>
                    </Input>
                    </Col>

                    <Col md={6}>
                    <Label for="country">Payment Type</Label>
                    <Input type='text'  id="country">
                        <option>Select</option>
                    </Input>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col>
                    <Label for="country">Reference</Label>
                    <Input type='text'  id="country">
                        <option>Select</option>
                    </Input>
                    </Col>
                </FormGroup>
                <br></br>
              <Buttons outline="outline" color="primary" value="Update" />&nbsp;
            </Form>
        );
    }
}

export default EditFields;