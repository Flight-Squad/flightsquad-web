import React, { Component } from 'react'
import TravelCitiesHeader from '../../Components/TravelCitiesHeader'
import './checkout.scss';
import CheckoutForm from '../../Components/CheckoutForm';
import { withRouter } from 'react-router-dom';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
    

class CheckoutPage extends Component {

    state = {
        loading: 'hi'
    }

    async componentDidMount() {
        await sleep(2000)
        const query = new URLSearchParams(this.props.location.search)
        console.log(this.props)
        this.setState({
            loading: query.get('id') || 'wow'
        })
    }
    render() {
        return (
            <div>
                <TravelCitiesHeader origin="Boston → New York" />
                <p>{this.state.loading}</p>
                <div className="Checkout-Form-Wrapper">
                    <CheckoutForm></CheckoutForm>
                </div>
            </div>
        )
    }
}

export default withRouter(CheckoutPage);
