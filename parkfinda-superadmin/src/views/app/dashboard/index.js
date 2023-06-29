import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DailyTable from '../../../containers/dashboard/dailyTable';
import MonthlyTable from '../../../containers/dashboard/monthlyTable';
import SessionTable from '../../../containers/dashboard/sessionTable';
import { Card } from 'reactstrap';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>
            <h1>Dashboard</h1>
        </div>
        <hr></hr>
        <br></br>
        <Card body>  
          <SessionTable/>
        </Card>
        <br></br>
        <Card body>
          <DailyTable/>
        </Card>
        <br></br>
        <Card body>
          <MonthlyTable/>
        </Card>

        <BrowserRouter>
          <Switch>
            <Route path="/app/dashboard" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Dashboard;
