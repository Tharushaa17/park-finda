import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import InvoiceTable from '../../../containers/invoice-advice/invoiceTable';
import InvoiceSearch from './search/index';
import { Card } from 'reactstrap';
import FieldsInput from '../fields/input';
import '../finance/list/index.css'

class InvoiceAdvice extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Invoice Advice</h1>
                </div>
                <hr></hr>
                <Card body className='filtercard'>
                    <InvoiceSearch/>
                </Card>
                <br></br>
                <Card body>
                    <FieldsInput type="text" style="search" placeholder="Search.."/><br></br>
                    <InvoiceTable/>
                </Card>

                <Router>
                    <Switch>
                        <Route path="/app/invoice" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default InvoiceAdvice;