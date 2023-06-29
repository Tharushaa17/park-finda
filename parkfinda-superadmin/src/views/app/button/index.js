import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../fields/fields.css';

class Buttons extends Component {
    render() {
        return (
            <div>
                <Button 
                    type={this.props.type} 
                    outline={this.props.outline} 
                    size={this.props.size} 
                    color={this.props.color}
                    className={this.props.style}
                >
                    {this.props.value}
                <i class={this.props.class}> </i>
                </Button>{' '}
            </div>
        );
    }
}

export default Buttons;