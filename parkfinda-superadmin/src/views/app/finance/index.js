import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FinanceEdit from './edit';
import FinanceList from './list';

class Finance extends Component {
  render() {
    return (
      <div>
         <div>
            <h1>Finance</h1>
        </div>
        <hr></hr>
        <FinanceList />
        <BrowserRouter>
          <Switch>
            <Route path="/app/finance"/>
            <Route path="/app/finance/edit" component={ FinanceEdit }/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Finance;
