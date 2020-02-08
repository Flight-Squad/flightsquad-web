import React, { Fragment } from 'react'
import { Button } from '@material-ui/core';
import { PaymentRequest } from 'Components/Stripe/PaymentRequest';
import { convertUsdToPaymentAmount } from 'Components/Stripe/PaymentRequest';
import Axios from 'axios';

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
        await Axios.post(`https://pricesquad-a-pujitm-ref-opq9o7.herokuapp.com/card/pay`, {
            card_token: paymentRequest.token.id,
            paymentId: props.paymentId,
            // customer: {
            //     firstName: fName,
            //     lastName: lName,
            //     email,
            //     dob,
            // },
        });
        console.log('success', 'card_payment')
    }
    return (

        <Fragment>
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
                {props.enabled ?
                    <PaymentRequest handleResult={handleRequest} amount={convertUsdToPaymentAmount(props.amount)} /> :
                    <Button style={disableStyle} variant="contained" color="primary" disabled>Pay Now</Button>}
            </div>
        </Fragment>
    )
}
