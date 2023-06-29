import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TeamsUserForms from './create';

class TeamsPermission extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/app/teams" />
                        <Route path="/app/teams/user" />
                        <Route path="/app/teams/user/create" component={TeamsUserForms}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default TeamsPermission;