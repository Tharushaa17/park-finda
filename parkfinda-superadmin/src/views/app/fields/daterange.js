import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './fields.css';

class DateRange extends Component {
    render() {
        return (
            <div className='d-flex' >
                <DatePicker className="fieldsinput"  placeholderText="Start Date"/>
                <DatePicker className="fieldsinput" placeholderText="End Date"/>
            </div>
        );
    }
}

export default DateRange;