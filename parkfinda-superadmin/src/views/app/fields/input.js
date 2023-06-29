import React, { Component } from 'react';
import { Input } from 'reactstrap';
import './fields.css';

class FieldsInput extends Component {
    render() {
        return (
            <div>
                <Input type={this.props.type} className={this.props.style} placeholder={this.props.placeholder} />
            </div>
        );
    }
}

export default FieldsInput;