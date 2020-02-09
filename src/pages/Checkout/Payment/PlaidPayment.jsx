import React, { Component } from 'react'
import Axios from 'axios';
import { Button } from '@material-ui/core';
import PlaidLink from 'react-plaid-link'
import './PlaidPayment.scss'

/**
 * Expects
 * 
 * paymentId: string
 * 
 * disabled?
 * 
 * fName, lName, email, dob -> if not disabled
 * 
 * 
 */
export default class PlaidPayment extends Component {
    // Must use elemnt styles to override Plaid Link default styling
    disableStyle = {
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

    enableStyle = {
        // margin: '10px auto 30px',
        marginBottom: '-10px',
        display: 'block',
        // backgroundColor: '#4cd964',
        // fontSize: '14px',
        lineHeight: '40px',
        // padding: '2px 8px',
        width: '100%',
        // color: '#fff',
        maxWidth: '100%',
        borderRadius: '10px',
        // fontFamily: 'Helvetica Neue,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
        // fontWeight: 400,
    }

    async handleOnSuccess(public_token, metadata) {
        const { fName, lName, email, dob } = this.props;
        await Axios.post(`https://pricesquad-a-pujitm-ref-opq9o7.herokuapp.com/bank/pay`, {
            public_token,
            account_id: metadata.account_id,
            paymentId: this.props.paymentId,
            customer: {
                // firstName: fName,
                // lastName: lName,
                email,
                // dob,
            },
        });
        console.log('success');
        console.log(public_token);
        console.log(JSON.stringify(metadata, null, 2));
    }

    handleOnExit() {
        // handle the case when your user exits Link
    }

    render() {
        const { enabled } = this.props;
        const buttonText = 'Pay Now';
        // console.log(process.env.REACT_APP_PLAID_PUBLIC_KEY)
        return (
            enabled ?
                <PlaidLink
                    className="Custom-Plaid-Link"
                    style={{ width: '100%' }}
                    clientName="Flight Squad"
                    env="sandbox"
                    product={["auth", "transactions"]}
                    publicKey={process.env.REACT_APP_PLAID_PUBLIC_KEY}
                    // userLegalName= 'John Appleseed'
                    // userEmailAddress= 'jappleseed@youapp.com'
                    onExit={this.handleOnExit}
                    onSuccess={(token, meta) => this.handleOnSuccess(token, meta)}>
                    {/* https://material-ui.com/customization/components/ */}
                    <Button style={this.enableStyle} variant="contained" color="primary">
                        {buttonText}
                    </Button>
                </PlaidLink>

                : <Button style={this.disableStyle} variant="contained" color="primary" disabled>{buttonText}</Button>
        )
    }
}
