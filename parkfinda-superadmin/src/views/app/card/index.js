import React, { Component } from 'react';
import { Card, CardTitle, CardText} from 'reactstrap'

class Cards extends Component {
    render() {
        return (
            <div>
                <Card  body inverse color="primary">
                    <CardTitle>{this.props.title}</CardTitle>
                    <CardText>{this.props.text}</CardText>
                </Card>
            </div>
        );
    }
}

export default Cards;