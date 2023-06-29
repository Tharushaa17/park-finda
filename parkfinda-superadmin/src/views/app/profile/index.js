import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Profile</h1>
        </div>

        

        <BrowserRouter>
          <Switch>
            <Route path="/app/profile" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Profile;
