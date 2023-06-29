import React, { Component } from 'react';
import { Table, Card } from 'reactstrap';

class Bank extends Component {
    render() {
        return (
            <Card body>
                    <Table class="table table-bordered">
                        <tr>
                            <th>Bank</th>
                            <th>AMANA BANK</th>
                        </tr>
                        <tr>
                            <th>Payment To</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>IBAN</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>BIC</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Telephone:</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Sort Code</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Account No</th>
                            <td></td>
                        </tr>
                    </Table>
                </Card>
        );
    }
}

export default Bank;