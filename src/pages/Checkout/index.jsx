import React, { Component } from 'react'
import TravelCitiesHeader from './TravelHeader'
import './checkout.scss';
import CheckoutForm from './Form';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import BookPriceBlock from './BookPriceBlock';
import AirportInfoAlt from './Form/AirportInfo/alt';
import RoomIcon from '@material-ui/icons/RoomOutlined';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class CheckoutPage extends Component {

    state = {
        amount: 'loading...',
        fName: '',
        lName: '',
        email: '',
        tripInfo: {
            date: '...',
            duration: '',
            airline: {
                name: '',
                flightNum: '',
            },
            origin: {
                city: 'Loading...',
                name: '',
                iata: '',
                time: '',
            },
            destination: {
                city: 'Loading...',
                name: '',
                iata: '',
                time: '',
            }
        },
    }

    async componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const res = await Axios.get(`https://flightsquad-payment.herokuapp.com/payment/${query.get('id')}`)
        if (res.data) {
            this.setState({
                amount: res.data.amount || '...',
                tripInfo: res.data.tripInfo,
            })
        }
    }
    render() {
        const query = new URLSearchParams(this.props.location.search)
        const { tripInfo } = this.state;
        const header = `${tripInfo.origin.city} → ${tripInfo.destination.city}`
        return (
            <div>
                <TravelCitiesHeader origin={header} />
                {/* <p>Your Total is {this.state.loading}</p> */}
                <div className="Checkout-Form-Wrapper">
                    <CheckoutForm
                        fName={query.get('fName') || ''}
                        lName={query.get('lName') || ''}
                        email={query.get('email') || ''}
                        paymentId={query.get('id') || ''}
                        amount={this.state.amount}
                    >
                        <AirportInfoAlt
                            color='rgb(208, 2, 27)'
                            city={tripInfo.origin.city}
                            duration={tripInfo.duration || 'Start'}
                            date={tripInfo.date}
                            icon={<RoomIcon style={{ color: 'white' }} />}

                        />
                        <AirportInfoAlt narrow color='rgb(208, 2, 27)'
                            city={tripInfo.destination.city}
                            duration={'End'}
                            date={tripInfo.date}
                            tripInfo={tripInfo} />
                    </CheckoutForm>
                    <BookPriceBlock loading={this.state.amount} />
                </div>
            </div>
        )
    }
}

export default withRouter(CheckoutPage);
