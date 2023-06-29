import React, { Component } from 'react';
import { Table, Card } from 'reactstrap';

class InvoiceTable extends Component {
    render() {
        return (
              <div>
                <Card>
                    <Table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="col-md-9">Revenue Commission</td>
                                <td class="col-md-3"><i class="fa fa-inr"></i>USD </td>
                            </tr>
                            <tr>
                                <td class="col-md-9">Service Fee</td>
                                <td class="col-md-3"><i class="fa fa-inr"></i>USD </td>
                            </tr>
                            <tr>
                                <td class="col-md-9">Monthly Service Charge</td>
                                <td class="col-md-3"><i class="fa fa-inr"></i>USD </td>
                            </tr>
                            
                            <tr>
                            
                                <td class="text-left"><h2><strong>Total: </strong></h2></td>
                                <td class="text-left text-danger"><h2><strong><i class="fa fa-inr"></i>USD </strong></h2></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        );
    }
}

export default InvoiceTable;