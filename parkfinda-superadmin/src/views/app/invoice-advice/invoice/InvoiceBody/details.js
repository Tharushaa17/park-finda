import React, { Component } from 'react';
import { Card, CardText } from 'reactstrap'

class Details extends Component {
    render() {
        return (
            <Card body>
                <CardText>
                    <br></br><br></br> 
                    <h3>Date:</h3> <br></br>
                    <h3>Customer Number:</h3><br></br>
                    <h3>Invoice Number:</h3> <br></br> <br></br> 
                </CardText>
            </Card>
        );
    }
}

export default Details;