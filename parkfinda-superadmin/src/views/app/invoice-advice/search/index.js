import React, { Component } from 'react';
import { Form, FormGroup, Col, Label } from 'reactstrap';
import Buttons from '../../button/index';
import DateRange from '../../fields/daterange';
import FieldsInput from '../../fields/input';
import Line from '../../fields/line';

class InvoiceSearch extends Component {
    render() {
        return (
            <Form>
                <FormGroup row>
                    <Col md={5}>
                        <Label>Date Range</Label>
                        <DateRange/>
                    </Col>

                    <Line/>

                    <Col md={2}>
                        <Label>Franchises</Label>
                        <FieldsInput type="input" style="fieldsinput" placeholder="All Franchises       &#8744;"/>
                    </Col>

                    <Line/>

                    <Col md={2}>
                        <Label>Country</Label>
                        <FieldsInput type="input" style="fieldsinput" placeholder="All Countries       &#8744;"/>
                    </Col>

                    
                    <Col md={2} className='d-flex'>
                        <Buttons outline="outline" size="xs" color="primary" value="Search" />&nbsp;
                        <Buttons color="primary" size="xs" value="PDF" />
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default InvoiceSearch;