import React, { Component } from 'react';
import FinanceTransaction from '../../../../containers/finance/transactionTable';
import FieldsInput from '../../fields/input';

class TransactionTable extends Component {
    render() {
        return (
            <div>
                <FieldsInput type="text" style="search" placeholder="Search.."/><br></br>
                <FinanceTransaction/>
            </div>
        );
    }
}

export default TransactionTable;