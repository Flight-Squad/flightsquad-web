import React, { Component, Fragment, useReducer, useState } from 'react'
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
import PlaidLink from 'react-plaid-link'
import * as EmailValidator from 'email-validator';
import Axios from 'axios';
import PlaidPayment from 'pages/Checkout/Payment/PlaidPayment';
import CreditCardPayment from '../Payment/CreditCardPayment';
import { PassengersDispatch } from './context';
import { PassengerBlock } from './PassengerBlock';
import { isValid } from 'date-fns';
import nanoid from 'nanoid';

/**
 * Returns an empty Passenger
 */
function emptyPassenger() {
    return {
        fName: '',
        lName: '',
        dob: '',
    };
}

function PassengersForm({ updateNumPassengers, notifyValidity }) {
    const [passengers, setPassengers] = useState({ '0': emptyPassenger() })

    function dispatcher(action) {
        function updatePassengers(newPassengers) {
            setPassengers({ ...newPassengers });
            updateNumPassengers(Object.keys(newPassengers).length);
            notifyValidity(formIsValid(newPassengers));
        }
        // Interpreter complained about scoping of `const newPassengers`
        // So some cases were scoped in closures to maintain clarity
        switch (action.type) {
            case 'delete':
                {
                    const newPassengers = Object.assign({}, passengers);
                    delete newPassengers[action.id];
                    updatePassengers(newPassengers);
                }
                break;
            case 'update':
                {
                    console.log('update passengers:', passengers[action.id], action.info);
                    const newPassengerInfo = { ...passengers[action.id], ...action.info };
                    const newPassengers = { ...passengers, [action.id]: newPassengerInfo };
                    updatePassengers(newPassengers);
                }
                break;
            case 'add':
                updatePassengers({ ...passengers, [nanoid(2)]: emptyPassenger() });
                break;
            default:
                throw new Error(`${action.type} action not supported in passengers dispatcher`);
        }
    }

    function formIsValid(passengers) {
        return Object.entries(passengers).every(([id, info]) => {
            return Boolean(info.fName) && Boolean(info.lName) && isValid(info.dob);
        })
    }

    // console.log('Form is Valid:', formIsValid(passengers));

    return (
        <div>
            {Object.entries(passengers).map(([id, info]) => {
                return <PassengerBlock passengerInfo={info} id={id} dispatcher={dispatcher} deletable={id !== '0'} />
            })}
        </div>
    )
}

export default class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formIsValid: false,
        }
        this.notifyPassengerValidity = this.notifyPassengerValidity.bind(this);
    }

    notifyPassengerValidity(isValid) {
        console.log('Form is Valid:', isValid);
        this.setState({ formIsValid: isValid });
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
                            <PassengersForm updateNumPassengers={this.props.updateNumPassengers} notifyValidity={this.notifyPassengerValidity} />
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

