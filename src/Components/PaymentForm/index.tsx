// #region Global Imports
import React from "react";
import { CardElement, injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements';
// #endregion Global Imports

// #region Local Imports
import "./style.scss";
// #endregion Local Imports

// #region Interface Imports
import { IPaymentForm } from "./PaymentForm";
// #endregion Interface Imports

export class PaymentForm extends React.Component<
    IPaymentForm.IProps,
    IPaymentForm.IState
    > {
    constructor(props: IPaymentForm.IProps) {
        super(props);

        this.state = {};
        this.submit = this.submit.bind(this);
    }

    async submit(_ev: any) {
        // User clicked submit
      }


    render() {
        return (
            <section id="paymentForm">
                <div className="checkout">
                    <p>Would you like to complete the purchase?</p>
                    <CardElement />
                    {/* <button onClick={this.submit}>Purchase</button> */}
                    <PaymentRequestButtonElement paymentRequest={this.props.paymentRequest} />
                </div>
            </section>
        );
    }
}
