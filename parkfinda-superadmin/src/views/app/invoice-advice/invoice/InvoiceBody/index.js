import React, { Component } from 'react';
import Reciver from './reciver';
import { Row, Col } from 'reactstrap'
import Details from './details';

class InvoiceBody extends Component {
    render() {
        return (
            <div>
                 <Row>
                    <Col md="6">
                        <Reciver/>
                    </Col>
                    <Col md="6">
                       <Details/>
                    </Col>
                </Row>  
            </div>
        );
    }
}

export default InvoiceBody;