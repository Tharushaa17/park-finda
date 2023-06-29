import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './fields.css'

class SelectFeild extends Component {
    render() {
        return (
            <div>
                <UncontrolledDropdown>
                    <DropdownToggle caret className={this.props.style}>{this.props.lable}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>{this.props.option1}</DropdownItem>
                        <DropdownItem header>{this.props.option2}</DropdownItem>
                        <DropdownItem header>{this.props.option3}</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }
}

export default SelectFeild;