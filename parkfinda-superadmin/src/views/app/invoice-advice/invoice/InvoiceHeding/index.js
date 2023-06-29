import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Address from './address';
import Logo from './logo';
import './index.css'

class InvoiceHeading extends Component {
    render() {
        return (
                <div className='rowC'>
                    <Row>
                        <Col md={6}>
                            <Logo/>
                        </Col>
                        <Col md={6} className="address">
                            <Address/>
                        </Col>
                    </Row> 
                </div>        
        );
    }
}

export default InvoiceHeading;