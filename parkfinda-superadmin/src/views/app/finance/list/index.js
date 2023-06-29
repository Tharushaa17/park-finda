import React, { Component } from 'react';
import { Card } from 'reactstrap';
import FinanceFilter from '../search/index';
import FinanceTabs from './tabs';
import './index.css';

class FinanceList extends Component {
    render() {
        return (
            <div>
                <Card body className='filtercard'>
                    <FinanceFilter />
                </Card>
                <br></br>
                <Card body>
                    <FinanceTabs/>
                </Card>
            </div>
        );
    }
}

export default FinanceList;