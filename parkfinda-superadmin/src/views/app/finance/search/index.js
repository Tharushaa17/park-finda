import React, { Component } from 'react';
import { Form, FormGroup, Col, Label } from 'reactstrap';
import Line from '../../fields/line';
import FieldsInput from '../../fields/input';
import DateRange from '../../fields/daterange';
import Buttons from '../../button';
import LabelName from '../../fields/lable';

class FinanceFilter extends Component {
    render() {
        return (
            <Form>
                <FormGroup row>
                    <Col md={5}>
                        <LabelName style="label" value="Date Range"/>
                        <DateRange/>
                    </Col>

                    <Line/>

                    <Col md={2}>
                        <LabelName style="label" value="Country"/>
                        <FieldsInput type="input" style="fieldsinput" placeholder="All Countries       &#8744;"/>
                    </Col>

                    <Line/>

                    <Col md={2}>
                        <LabelName style="label" value="Company"/>
                        <FieldsInput type="input" style="fieldsinput" placeholder="All Companies       &#8744;"/>
                    </Col>

                    
                    <Col md={2}>
                        <Buttons outline="outline" color="primary" size="xs" value="Search" />&nbsp;
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default FinanceFilter;