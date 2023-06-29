import React, { Component } from 'react';
import { Card, FormGroup, Col } from 'reactstrap';
import Logo from '../../invoice-advice/invoice/InvoiceHeding/logo';
import EmailContent from './content';
import EmailFooter from './footer';
import EmailSubject from './subject';

class InvoiceEmail extends Component {
    render() {
        return (
            <div>
                <Card body>
                    <div className='text-center'>
                        <Logo/>
                    </div><br></br><br></br><br></br>
                    <EmailSubject/><br></br>
                    <FormGroup row>
                        <Col md={4}></Col>
                        <Col md={4}>
                            <EmailContent/>
                            <hr></hr>
                            <EmailFooter/>
                        </Col>
                        <Col md={4}></Col>
                    </FormGroup>
                </Card> 
            </div>
        );
    }
}

export default InvoiceEmail;