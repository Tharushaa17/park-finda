import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Table from './table/index';
import Create from './create/index';
import Edit from './edit/index';

class Franchise extends Component  {
  render(){
    return (
      <div>
        <Table/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/app/franchises" />
            <Route path="/app/franchises/create" component={Create}/>
            <Route path="/app/franchises/edit" component={Edit}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Franchise;

