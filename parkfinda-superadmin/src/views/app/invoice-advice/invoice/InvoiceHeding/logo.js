import React, { Component } from 'react';
import './index.css';

class Logo extends Component {
    render() {
        const imgStyle = {
            maxHeight: 128,
            maxWidth: 128
          }
        return (
            <div>
                <span >
                    <img alt="Profile" src="/assets/img/logo.svg" style={imgStyle}/>
                </span>
            </div>
        );
    }
}

export default Logo;