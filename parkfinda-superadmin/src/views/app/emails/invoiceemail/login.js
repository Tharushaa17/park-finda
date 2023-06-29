import React, { Component } from 'react';
import { Label, Form, FormGroup, Col } from 'reactstrap';
import Buttons from '../../button';
import FieldsInput from '../../fields/input';

class EmailLogin extends Component {
    render() {
        return (
            <div>
                <h2 className='text-center'>You are now live!!</h2>

                <div className='login'>
                    <Form>
                        <FormGroup row>
                            <Col md={4}></Col>
                            <Col md={4}>
                                <Label  >Username : </Label>
                                <FieldsInput  type="text" placeholder="Username Here...."/>
                        
                                <br></br>

                                <Label  >Password : </Label>
                                <FieldsInput   type="password" placeholder="Password Here...."/>

                                <br></br>

                                <Buttons  color='primary' value="Login"/>
                            </Col>
                            <Col md={4}></Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default EmailLogin;