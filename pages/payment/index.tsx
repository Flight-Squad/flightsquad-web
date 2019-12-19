// #region Global Imports
import React from "react";
import {Elements, StripeProvider} from 'react-stripe-elements';
import getConfig from 'next/config';
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from "@Server/i18n";
import "./style.scss";
// #endregion Local Imports

// #region Interface Imports
import { ReduxNextPageContext, IPayment } from "@Interfaces";
import { PaymentForm } from "@Components";
// import { stripe } from "./stripe";
// #endregion Interface Imports

export class Payment extends React.Component<
    IPayment.IProps,
    IPayment.InitialProps
    > {
    constructor(props: IPayment.IProps) {
        super(props);
        (this.state as any) = { stripe: null };
    }
    componentDidMount() {
        // Create Stripe instance in componentDidMount
        // (componentDidMount only fires in browser/DOM environment)
        const {STRIPE_API_KEY} = getConfig();
        const stripe = window.Stripe(STRIPE_API_KEY);
        const paymentRequest = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
              label: 'Demo total',
              amount: 1000,
            },
            requestPayerName: true,
            requestPayerEmail: true,
          });
        this.setState({ stripe, paymentRequest });
    }

    async getInitialProps(ctx: ReduxNextPageContext): Promise<
        IPayment.InitialProps
    > {
        return { namespacesRequired: ["common"], query: ctx.query };
    };

    render() {
        return (
            <section id="payment">
                <StripeProvider stripe={this.state.stripe}>
                    <Elements>
                        <PaymentForm paymentRequest={this.state.paymentRequest}/>
                    </Elements>
                </StripeProvider>
            </section>
        );
    }
}

export default withTranslation("common")(Payment);
