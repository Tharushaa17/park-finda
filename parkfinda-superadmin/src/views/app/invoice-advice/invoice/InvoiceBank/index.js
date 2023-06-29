import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'
import Bank from './bank';
import Terms from './terms';

class InvoiceBank extends Component {
    render() {
        return (
            <div>
                 <Row>
                    <Col md="6">
                        <Bank/>  
                    </Col>
                    <Col md="6">
                        <Terms/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default InvoiceBank;