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
import { PassengerBlock, BillingInfo } from './PassengerBlock';
import { isValid } from 'date-fns';
import nanoid from 'nanoid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

function SelectPaymentMethod({ notifyPaymentMethod, method }) {
    const handleChange = event => notifyPaymentMethod(event.target.value);

    function PaymentOption({ optionName, label }) {
        return (
            <FormControlLabel value={optionName} control={<Radio checked={method === optionName} onChange={handleChange} name="payment-options" />} label={label} />
        );
    }

    return (
        <>
            <PaymentOption label='Bank ACH' optionName='ach' />
            <PaymentOption label='Credit Card (+2%)' optionName='credit' />
        </>
    );
}

function PaymentForm(props) {
    const { method, enabled } = props;
    function stateFromMethod(method) {
        switch (method) {
            case 'ach':
                return {
                    title: 'ACH',
                    description: "Please select 'Pay Now' to continue. We use Visa's infrastructure to secure your transaction.",
                    button: <PlaidPayment email={props.email} enabled={enabled} paymentId={props.paymentId} passengerCount={props.passengerCount} />,
                };
            case 'credit':
                return {
                    title: 'Credit Card',
                    description: "Please select 'Pay Now' to continue. We use Stripe's infrastructure to secure your transaction.",
                    button: <CreditCardPayment enabled={enabled} paymentId={props.paymentId} amount={props.amount * 1.02} passengerCount={props.passengerCount} />,
                };
            default: return {}
        }
    }
    const state = stateFromMethod(method);


    return (
        <div className='PaymentForm'>
            <h3 className='PaymentForm-Title'>{state.title}</h3>
            <p className='PaymentForm-Description'>{state.description}</p>
            <div style={{ marginTop: '30px' }} >{state.button}</div>
        </div>
    );
}

export default class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formIsValid: false,
            billingEmail: '',
            paymentMethod: 'ach',
        }
        this.notifyPassengerValidity = this.notifyPassengerValidity.bind(this);
        this.notifyBillingEmail = this.notifyBillingEmail.bind(this);
        this.emailIsValid = this.emailIsValid.bind(this);
        this.notifyPaymentMethod = this.notifyPaymentMethod.bind(this);
    }

    notifyPassengerValidity(isValid) {
        console.log('Form is Valid:', isValid);
        this.setState({ formIsValid: isValid });
    }

    notifyBillingEmail(email) {
        console.log('Billing email is valid:', this.emailIsValid(email));
        this.setState({ billingEmail: email });
    }

    notifyPaymentMethod(method) {
        this.setState({ paymentMethod: method });
    }

    emailIsValid(email) {
        return EmailValidator.validate(email);
    }

    render() {
        const paymentIsEnabled = this.state.formIsValid && this.emailIsValid(this.state.billingEmail);
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
                <div>
                    <CheckoutPartTitle title="Contact Details" part="3" />
                    <BillingInfo notifyEmail={this.notifyBillingEmail} email={this.state.billingEmail} />
                </div>
                <div>
                    <CheckoutPartTitle title="Payment" part="4" />
                    <div className='Checkout'>
                        <section className='custom-tabs' >
                            <div className='PaymentMethods-Block'>
                                <div className='PaymentMethods-Block-Header'>
                                    <h1 className='Book-PageError'></h1>
                                    <div className='Payment-Controls-Block'>
                                        <SelectPaymentMethod notifyPaymentMethod={this.notifyPaymentMethod} method={this.state.paymentMethod} />
                                    </div>
                                </div>
                                <PaymentForm
                                    method={this.state.paymentMethod}
                                    enabled={paymentIsEnabled}
                                    email={this.state.billingEmail}
                                    paymentId={this.props.paymentId}
                                    passengerCount={this.props.passengerCount}
                                    amount={this.props.amount} />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

