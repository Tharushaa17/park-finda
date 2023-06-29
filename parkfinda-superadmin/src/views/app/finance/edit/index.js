import React, { Component } from 'react';
import EditTable from '../../../../containers/finance/editTable';
import EditFields from './feilds';
import { Row, Col } from 'reactstrap';
import Cards from '../../card';
import FieldsInput from '../../fields/input';

class FinanceEdit extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm="4" className='text-center'>
                        <Cards title="Company Name Here"/>
                    </Col>
                    <Col sm="4" className='text-center'>
                        <Cards title="Country Name Here"/>
                    </Col>
                </Row><br></br>
                <EditFields/><br></br>
                <hr></hr>
                <FieldsInput type="text" style="search" placeholder="Search.."/><br></br>
                <EditTable/>
            </div>
        );
    }
}

export default FinanceEdit;