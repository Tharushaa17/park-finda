import React from "react";
import "react-tagsinput/react-tagsinput.css";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";

export class FormikSwitch extends React.Component {

    handleChange = val => {
      this.props.onBlur(this.props.name, true);
      this.props.onChange(this.props.name, val);
    };
  
    render() {
      const { name, value, className } = this.props;
      return (
        <Switch
          id={name}
          name={name}
          className={className}
          checked={value}
          onChange={this.handleChange}
        />
      );
    }
  }