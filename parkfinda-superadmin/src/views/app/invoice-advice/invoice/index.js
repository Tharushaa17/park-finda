import React, { Component } from 'react';
import { Card } from 'reactstrap';
import InvoiceBank from './InvoiceBank';
import InvoiceBody from './InvoiceBody';
import InvoiceHeading from './InvoiceHeding';
import InvoiceTable from './InvoiceTable/invoiceTable';
import InvoiceTitle from './InvoiceTitle/invoiceTitle';

class Invoice extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Card body>
                        <InvoiceHeading/><hr></hr>
                        <InvoiceTitle/><hr></hr>
                        <InvoiceBody/>
                        <InvoiceTable/><br></br>
                        <p>Please send your remittances to: </p><br></br>
                        <InvoiceBank/><br></br><br></br>
                        <strong className='text-center'>Computer Generated Invoice Signature Not Require</strong><br></br>
                    </Card>
                </Card>
            </div>
        );
    }
}

export default Invoice;