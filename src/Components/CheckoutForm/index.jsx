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
import { Input } from '@material-ui/core';
import { PaymentRequestDemo } from '../PaymentForm';

export default class CheckoutForm extends Component {
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
                                        <PaymentRequestDemo stripePublicKey='pk_live_jP7jiabekhWDp4SbcN8G7bmw' />
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
