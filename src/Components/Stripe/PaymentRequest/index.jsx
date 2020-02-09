import React, { Component } from 'react';
import {
    injectStripe,
    PaymentRequestButtonElement,
    StripeProvider,
    Elements,
} from 'react-stripe-elements';

class _PaymentRequestForm extends Component {
    constructor(props) {
        super(props);

        // For full documentation of the available paymentRequest options, see:
        // https://stripe.com/docs/stripe.js#the-payment-request-object
        const paymentRequest = props.stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: props.label || 'Flight Squad Trip',
                amount: props.amount,
            },
            // Requesting the payer’s name, email, or phone is optional, but recommended.
            // It also results in collecting their billing address for Apple Pay.
            requestPayerName: true,
            requestPayerEmail: true,
        });

        paymentRequest.on('token', async ({ complete, token, ...data }) => {
            await props.handleResult({ paymentRequest: { token, data } });
            complete('success');
        });

        paymentRequest.canMakePayment().then((result) => {
            this.setState({ canMakePayment: !!result });
        });

        this.state = {
            canMakePayment: false,
            paymentRequest,
        };
    }

    render() {
        return this.state.canMakePayment ? (
            <PaymentRequestButtonElement
                paymentRequest={this.state.paymentRequest}
                className="PaymentRequestButton"
                style={{
                    // For more details on how to style the Payment Request Button, see:
                    // https://stripe.com/docs/elements/payment-request-button#styling-the-element
                    paymentRequestButton: {
                        theme: 'dark',
                        height: '64px',
                        // type: 'book',
                    },
                }}
            />
        ) : (
                <p style={{ color: '#ff5c45' }}>
                    Hey! We're sorry, we only process credit card payments through Google Pay and Saved Browser Cards right now. Apple Pay and manual card payments are coming soon!
      </p>
            );
    }
}

export const PaymentRequestForm = injectStripe(_PaymentRequestForm);

export const convertUsdToPaymentAmount = usd => parseInt(usd * 100);

/**
 * Takes a `handleRequest: function({paymentRequest: {token, data}})`
 */
export class PaymentRequest extends Component {
    render() {
        // console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        return (
            <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
                <Elements>
                    <PaymentRequestForm handleResult={this.props.handleResult} label={this.props.label} amount={this.props.amount} />
                </Elements>
            </StripeProvider>
        );
    }
}