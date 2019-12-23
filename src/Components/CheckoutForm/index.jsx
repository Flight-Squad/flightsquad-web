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

export default class CheckoutForm extends Component {
    handleOnSuccess(token, metadata) {
        // send token to client server
    }
    handleOnExit() {
        // handle the case when your user exits Link
    }
    render() {
        return (
            <div className="Checkout-Form">
                <TripSummary />
                <div>
                    <CheckoutPartTitle title="Passenger Information" part="2" />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <form>
                            <div className="Passenger-Block">
                                <h1>1 Passenger</h1>
                                <h4>Use all given names and surnames exactly as per passport/ID.</h4>
                                <div className="Passenger-Block-Data">
                                    <div className='PassengerForm-Row'>
                                        <div className='PassengerForm-Row-Block'>
                                            <label>First Name</label>
                                            <input required autoComplete="fname" type="text" name="fName" ></input>
                                        </div>
                                        <div className='PassengerForm-Row-Block'>
                                            <label>Last Name</label>
                                            <input required autoComplete="lname" type="text" name="lName" ></input>
                                        </div>
                                    </div>
                                    <div className='PassengerForm-Row'>
                                        <div className='PassengerForm-Row-Block'>
                                            <label>Email</label>
                                            <input type="email" disableUnderline={true} />
                                        </div>
                                        <div className='PassengerForm-Row-Block'>
                                            <label>Date of Birth</label>
                                            <DobPicker />
                                        </div>

                                    </div>
                                    <div className="PassengerForm-Row">
                                        <div className='PassengerForm-Row-Block'>
                                            <PaymentRequestDemo stripePublicKey='pk_live_jP7jiabekhWDp4SbcN8G7bmw' />
                                        </div>
                                        <div className='PassengerForm-Row-Block'>
                                            <PlaidLink
                                                className="Custom-Plaid-Link"
                                                style={{}}
                                                clientName="Flight Squad"
                                                env="sandbox"
                                                product={["auth", "transactions"]}
                                                publicKey="123b4a0a9a314cccb682f9c1274d90"
                                                onExit={this.handleOnExit}
                                                onSuccess={this.handleOnSuccess}>
                                                    {/* https://material-ui.com/customization/components/ */}
                                                <Button variant="contained" color="primary">
                                                    Pay Now
                                                </Button>
                                            </PlaidLink>
                                        </div>
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
