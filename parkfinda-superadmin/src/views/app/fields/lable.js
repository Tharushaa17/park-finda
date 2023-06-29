import React, { Component } from 'react';
import { Label } from 'reactstrap'
import './fields.css';

class LabelName extends Component {
    render() {
        return (
            <div>
                <Label className={this.props.style}>{this.props.value}</Label>
            </div>
        );
    }
}

export default LabelName;