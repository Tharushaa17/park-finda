import React, { Component } from 'react';
import { Card } from 'reactstrap';
import Logo from '../../invoice-advice/invoice/InvoiceHeding/logo';
import EmailFooter from './footer';
import EmailLogin from './login';
import Note from './note';
import WelcomeNote from './welcomenote';

class WelcomeEmail extends Component {
    render() {
        return (
            <div>
                <Card body>
                    <div className='text-center'>
                        <Logo/>
                    </div><br></br><br></br>
                    <WelcomeNote/>
                    <Note/>
                    <br></br>
                    <br></br>
                        <EmailLogin/>
                    <br></br>
                    <EmailFooter/>
                </Card>
            </div>
        );
    }
}

export default WelcomeEmail;