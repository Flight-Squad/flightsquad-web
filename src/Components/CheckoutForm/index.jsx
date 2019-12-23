import React, { Component } from 'react'
import './index.scss';
import CheckoutPartTitle from '../CheckoutPartTitle';
import AirportInfo from './AirportInfo';
import AirportInfoAlt from './AirportInfo/alt';
import TripSummary from './TripSummary';
import {
    DatePicker, MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import DobPicker from '../DatePicker/DobPicker';
import { Input, Button } from '@material-ui/core';
import { PaymentRequestDemo } from '../PaymentForm';
import PlaidLink from 'react-plaid-link'
import * as EmailValidator from 'email-validator';
import Axios from 'axios';

export default class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: this.props.fName || '',
            lName: this.props.lName || '',
            email: this.props.email || '',
            dob: /* this.props.dob || */ '', // leave un-initialized to ensure user selects a date
        }
    }

    async handleOnSuccess(public_token, metadata) {
        const {fName, lName, email, dob } = this.state;
        await Axios.post(`https://flightsquad-payment.herokuapp.com/pay`, {
            public_token,
            account_id: metadata.account_id,
            paymentId: this.props.paymentId,
            customer: {
                firstName: fName,
                lastName: lName,
                email,
                dob,
            },
        });
        console.log('success');
        console.log(public_token);
        console.log(JSON.stringify(metadata, null, 2));
    }

    handleOnExit() {
        // handle the case when your user exits Link
    }

    render() {
        let PlaidPayment = <Button variant="contained" color="primary" disabled>Pay Now</Button>
        const { fName, lName, email, dob } = this.state;
        if (fName && lName && EmailValidator.validate(email) && dob) {
            PlaidPayment = <PlaidLink
                className="Custom-Plaid-Link"
                style={{}}
                clientName="Flight Squad"
                env="sandbox"
                product={["auth", "transactions"]}
                publicKey="123b4a0a9a314cccb682f9c1274d90"
                // userLegalName= 'John Appleseed'
                // userEmailAddress= 'jappleseed@youapp.com'
                onExit={this.handleOnExit}
                onSuccess={(token,meta) => this.handleOnSuccess(token,meta)}>
                {/* https://material-ui.com/customization/components/ */}
                <Button variant="contained" color="primary">
                    Pay Now
                </Button>
            </PlaidLink>;
        }
        return (
            <div className="Checkout-Form">
                <TripSummary />
                <div>
                    <CheckoutPartTitle title="Passenger Information" part="2" />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="Passenger-Block">
                                <h1>1 Passenger</h1>
                                <h4>Use all given names and surnames exactly as per passport/ID.</h4>
                                <div className="Passenger-Block-Data">
                                    <div className='PassengerForm-Row'>
                                        <div className='PassengerForm-Row-Block'>
                                            <label>First Name</label>
                                            <input required autoComplete="fname" type="text" name="fName"
                                                value={this.state.fName || ''}
                                                onChange={(e) => this.setState({ fName: e.target.value })}
                                            />
                                        </div>
                                        <div className='PassengerForm-Row-Block'>
                                            <label>Last Name</label>
                                            <input required autoComplete="lname" type="text" name="lName"
                                                value={this.state.lName || ''}
                                                onChange={(e) => this.setState({ lName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='PassengerForm-Row'>
                                        <div className='PassengerForm-Row-Block'>
                                            <label>Email</label>
                                            <input type="email" disableUnderline={true}
                                                value={this.state.email || ''}
                                                onChange={(e) => this.setState({ email: e.target.value })}
                                            />
                                        </div>
                                        <div className='PassengerForm-Row-Block'>
                                            <label>Date of Birth</label>
                                            <DobPicker required dob={this.state.dob || null}
                                                onChange={(date) => this.setState({ dob: date })}
                                            />
                                        </div>

                                    </div>
                                    <div className="PassengerForm-Row">
                                        {PlaidPayment}

                                        {/* <div className='PassengerForm-Row-Block'>
                                            <PaymentRequestDemo stripePublicKey='pk_live_jP7jiabekhWDp4SbcN8G7bmw' />
                                        </div>
                                        <div className='PassengerForm-Row-Block'>
                                            
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <CheckoutPartTitle title="Contact Details" part="3" />
                </div>
                <div>
                    <CheckoutPartTitle title="Payment" part="4" />
                </div>
            </div>
        )
    }
}
