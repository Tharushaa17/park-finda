import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap'

class Terms extends Component {
    render() {
        return (
            <Card  body>
                <CardTitle>Terms:</CardTitle>
                <CardText>                               
                   <p>
                        Full payment must be paid 10 days <br></br>
                        from the date of the invoice. <br></br>
                        Failure to make the payment <br></br>
                        service will be suspended <br></br>
                   </p>
                </CardText>
            </Card>
        );
    }
}

export default Terms;