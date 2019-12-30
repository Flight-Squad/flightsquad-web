import React, { Component } from 'react'
import TravelCitiesHeader from '../../Components/TravelCitiesHeader'
import './checkout.scss';
import CheckoutForm from '../../Components/CheckoutForm';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import BookPriceBlock from './BookPriceBlock';
import AirportInfoAlt from '../../Components/CheckoutForm/AirportInfo/alt';
import RoomIcon from '@material-ui/icons/RoomOutlined';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class CheckoutPage extends Component {

    state = {
        loading: 'loading...',
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
                loading: res.data.amount || 'wow',
                tripInfo: res.data.tripInfo,
            })
        }
    }
    render() {
        const query = new URLSearchParams(this.props.location.search)
        const { tripInfo } = this.state;
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
                    <BookPriceBlock loading={this.state.loading} />
                </div>
            </div>
        )
    }
}

export default withRouter(CheckoutPage);
