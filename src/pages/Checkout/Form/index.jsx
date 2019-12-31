import React, { Component } from 'react'
import './index.scss';
import CheckoutPartTitle from './PartTitle';
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

import DobPicker from 'Components/DatePicker/DobPicker';
import { Input, Button } from '@material-ui/core';
import { PaymentRequest } from 'Components/Stripe/PaymentRequest';
import PlaidLink from 'react-plaid-link'
import * as EmailValidator from 'email-validator';
import Axios from 'axios';
import PlaidPayment from 'pages/Checkout/Payment/PlaidPayment';

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

    render() {
        const { fName, lName, email, dob } = this.state;
        const paymentIsEnabled = fName && lName && EmailValidator.validate(email) && dob;
        return (
            <div className="Checkout-Form">
                <TripSummary>
                    {this.props.children}
                </TripSummary>
                <div>
                    <CheckoutPartTitle title="Passenger Information" part="2" />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="Passenger-Block">
                                {/* <h1>1 Passenger</h1> */}
                                <h4>Use all information exactly as it appears on your passport/ID.</h4>
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
                                    <div className="PassengerForm-Row-100">
                                        <PlaidPayment 
                                            disabled={!paymentIsEnabled}
                                            paymentId={this.props.paymentId}
                                            fName={fName} lName={lName} email={email} dob={dob}
                                        />

                                        {/* <div className='PassengerForm-Row-Block'>
                                            <PaymentRequestDemo stripePublicKey='pk_live_jP7jiabekhWDp4SbcN8G7bmw' />
                                        </div>
                                        <div className='PassengerForm-Row-Block'>
                                            
                                        </div> */}
                                    </div>
                                    <div className="PassengerForm-Row-100" style={{ textAlign: 'center', }}>
                                        <p style={{
                                            color: '#b6b6bc',
                                            fontSize: '12px',
                                            display: 'inline-block',
                                            margin: '0 auto',
                                            paddingTop: '10px'
                                        }}>
                                            Pay with Credit Card
                                        </p>
                                    </div>
                                    <div className="PassengerForm-Row">
                                        <PaymentRequest stripePublicKey='pk_live_jP7jiabekhWDp4SbcN8G7bmw' />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='Book-Devider'>
                                {PlaidPayment}
                            </div> */}
                        </form>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        )
    }
}
