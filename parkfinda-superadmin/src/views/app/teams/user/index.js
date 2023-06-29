import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'reactstrap';
import TeamsUser from '../../../../containers/team-permission/teamTable';

class UserTable extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Teams Permission User</h1>
                </div>
                <hr></hr>
                <Card body>
                    <TeamsUser/>
                </Card>
            </div>
        );
    }
}

export default UserTable;