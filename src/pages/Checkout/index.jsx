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
        loading: 'loading...',
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
                {/* <p>Your Total is {this.state.loading}</p> */}
                <div className="Checkout-Form-Wrapper">
                    <CheckoutForm
                        fName={query.get('fName') || ''}
                        lName={query.get('lName') || ''}
                        email={query.get('email') || ''}
                        paymentId={query.get('id') || ''}
                    />
                    <div className="Book-Price">
                        <div style={{ minHeight: '196.333px' }}>
                            <div style={{ transform: 'translateZ(0px)' }}>
                                <div className='Book-Price-Block'>
                                    <div>
                                        <div className='Book-Price-h2'>Trip Price</div>
                                        <div className='Book-Price-PassCount-Block'>
                                            1 x Passenger
                                            <i>${this.state.loading}</i>
                                        </div>
                                        <div className='Book-Price-PassCount-Block' style={{ marginTop: '10px' }}>
                                            Baggage
                                            <i>FREE</i>
                                        </div>
                                        <div className='Book-Price-Total'>
                                            <div className='Book-Price-h1'>
                                                <strong>
                                                    Total to Pay
                                                    <i>USD</i>
                                                </strong>
                                                <big className='Book-Price-Total-Default'>${this.state.loading}</big>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CheckoutPage);
