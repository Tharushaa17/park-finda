import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FinanceStatment from '../../../../containers/finance/statmentTable';
import Card from '../../card/index';
import FieldsInput from '../../fields/input';

class StatmentTable extends Component {
    render() {
        return (
            <div>
                <br></br>
                <Row>
                    <Col sm="4" className='text-center'>
                        <Card title="Company Name Here"/>
                    </Col>
                    <Col sm="4" className='text-center'>
                        <Card title="Country Name Here"/>
                    </Col>
                </Row>
                <br></br>
                <FieldsInput type="text" style="search" placeholder="Search.."/><br></br>
                <FinanceStatment/>
            </div>
        );
    }
}

export default StatmentTable;