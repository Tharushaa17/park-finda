import React, { Component} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import SummaryTable from '../summary/index';
import TransactionTable from '../transactions';
import './index.css';
import AllTransactionsTable from '../all-transactions';
import StatmentTable from '../statment';

class FinanceTabs extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem className='tab'>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>Summary</NavLink>
          </NavItem>
          <NavItem className='tab'>
            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>Transactions</NavLink>
          </NavItem>
          <NavItem className='tab'>
            <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>All Transactions</NavLink>
          </NavItem>
          <NavItem className='tab'>
            <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }}>Statement</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <SummaryTable />
          </TabPane>
          <TabPane tabId="2"><br></br>
            <TransactionTable/>
          </TabPane>
          <TabPane tabId="3">
            <AllTransactionsTable/>
          </TabPane>
          <TabPane tabId="4">
            <StatmentTable/>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default FinanceTabs