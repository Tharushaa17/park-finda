import React, { Component } from 'react';

class EmailContent extends Component {
    render() {
        return (
            <div>
                <p className='text-left'>
                    Dear Tom Payne, <br></br>
                    &nbsp;&nbsp;&nbsp;&nbsp;Your monthly invoice is attached here. Please make arrangement to make the payment within 14 days from <br></br>
                    the invoice date. Failure to do so your account will be suspended.<br></br>
                    <br></br>
                    If you require any clarification regarding the invoice, please feel free to contact us.<br></br>
                    <br></br>
                    Kind regards.
                    <br></br>
                </p>
            </div>
        );
    }
}

export default EmailContent;