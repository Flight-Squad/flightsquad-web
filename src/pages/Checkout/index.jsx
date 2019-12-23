import React, { Component } from 'react'
import TravelCitiesHeader from '../../Components/TravelCitiesHeader'
import './checkout.scss';
import CheckoutForm from '../../Components/CheckoutForm';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class CheckoutPage extends Component {

    state = {
        loading: 'hi',
        fName: '',
        lName: '',
        email: '',
    }

    async componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const res = await Axios.get(`https://flightsquad-payment.herokuapp.com/payment/${query.get('id')}`)
        if (res.data) {
            this.setState({
                loading: res.data.amount || 'wow',
            })
        }
    }
    render() {
        const query = new URLSearchParams(this.props.location.search)
        return (
            <div>
                <TravelCitiesHeader origin="Boston → New York" />
                <p>{this.state.loading}</p>
                <div className="Checkout-Form-Wrapper">
                    <CheckoutForm
                        fName={query.get('fName') || ''}
                        lName={query.get('lName') || ''}
                        email={query.get('email') || ''}
                        paymentId={query.get('id') || ''}
                    ></CheckoutForm>
                </div>
            </div>
        )
    }
}

export default withRouter(CheckoutPage);
