import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'
import FinanceSummary from '../../../../containers/finance/summaryTable';
import Cards from '../../card/index';
import FieldsInput from '../../fields/input';

class SummaryTable extends Component {
    render() {
        return (
            <div>
                <br></br>
                <Row>
                    <Col sm="4">
                        <Cards text="Commision" title="Total Revenue"/>
                    </Col>
                    <Col sm="4">
                        <Cards text="Service Fee" title="Total Revenue"/>
                    </Col>
                    <Col sm="4">
                        <Cards text="Service Charge" title="Total Revenue"/>
                    </Col>
                </Row>
                <br></br>
                <FieldsInput type="text" style="search" placeholder="Search.."/><br></br>
                <FinanceSummary/>
            </div>
        );
    }
}

export default SummaryTable;