import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap'

class Reciver extends Component {
    render() {
        return (
            <Card  body>
                <CardTitle>To:</CardTitle>
                    <CardText>                               
                        <h3>My Car Parks Limited</h3>
                        <h3>26 Southamton Buildings</h3>
                        <h3>London</h3>
                        <h3>WC2A 1QS</h3>
                        <h3>United Kingdom</h3>
                    </CardText>
            </Card>                
        );
    }
}

export default Reciver;