import React, { Fragment } from 'react'
import { Button } from '@material-ui/core';
import { PaymentRequest } from 'Components/Stripe/PaymentRequest';

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
                    <PaymentRequest /> :
                    <Button style={disableStyle} variant="contained" color="primary" disabled>Pay Now</Button>}
            </div>
        </Fragment>
    )
}
