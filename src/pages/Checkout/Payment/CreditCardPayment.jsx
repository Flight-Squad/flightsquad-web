import React, { Fragment } from 'react'
import { Button } from '@material-ui/core';
import { PaymentRequest } from 'Components/Stripe/PaymentRequest';
import { convertUsdToPaymentAmount } from 'Components/Stripe/PaymentRequest';
import Axios from 'axios';
import { PricesquadApiRoot } from 'pages/config/pricesquad';

export default function CreditCardPayment(props) {
    const disableStyle = {
        // margin: '10px auto 30px',
        marginBottom: '-10px',
        display: 'block',
        // backgroundColor: '#000',
        // fontSize: '14px',
        lineHeight: '40px',
        // padding: '2px 8px',
        width: '100%',
        // color: '#fff',
        maxWidth: '100%',
        borderRadius: '10px',
        fontFamily: 'Helvetica Neue,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
        fontWeight: 400,
    }

    const handleRequest = async ({ paymentRequest }) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(paymentRequest, props.paymentId);
        }
        await Axios.post(`${PricesquadApiRoot}/transactions/card/pay`, {
            card_token: paymentRequest.token.id,
            txId: props.paymentId,
            passengerCount: props.passengerCount,
        });
        console.log('success', 'card_payment')
    }
    return (

        <Fragment>
            {props.enabled ?
                <PaymentRequest handleResult={handleRequest} amount={convertUsdToPaymentAmount(props.amount)} /> :
                <Button style={disableStyle} variant="contained" color="primary" disabled>Pay Now</Button>}
        </Fragment>
    )
}
