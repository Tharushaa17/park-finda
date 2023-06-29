import React, { Component } from 'react';
import { Form, FormGroup, Col , Label} from 'reactstrap';
import Buttons from '../../button';
import Line from '../../fields/line';
import FieldsInput from '../../fields/input';
import LabelName from '../../fields/lable';

class FranchiseSearch extends Component {
    render() {
        return (
            <Form>
                <FormGroup row>
                    <Col md={2}>
                        <LabelName style="label" value="Country"/>
                        <FieldsInput type="input" style="fieldsinput" placeholder="All Countries       &#8744;"/>
                    </Col>

                    <Line/>

                    <Col md={2}>
                        <LabelName style="label" value="Franchises"/>
                        <FieldsInput type="input" style="fieldsinput" placeholder="All Franchises       &#8744;"/>
                    </Col>

                    
                    <Col md={2}>
                        <Buttons outline="outline" color="primary" size="xs" value="Search" />&nbsp;
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default FranchiseSearch;