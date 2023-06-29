import React, { Component } from 'react';
import FinanceAllTransactions from '../../../../containers/finance/all_transactionsTable';
import { Button} from 'reactstrap';
import FieldsInput from '../../fields/input';

class AllTransactionsTable extends Component {
    render() {
        return (
            <div><br></br>
                <div>
                    <Button  color="secondary" className="float-right">CSV</Button>
                </div><br></br><br></br><br></br>
                <FieldsInput type="text" style="search" placeholder="Search.."/><br></br>
                <FinanceAllTransactions/>
            </div>
        );
    }
}

export default AllTransactionsTable;