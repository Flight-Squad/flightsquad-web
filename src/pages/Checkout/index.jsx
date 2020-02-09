import React, { Component } from "react";
import TravelCitiesHeader from "./TravelHeader";
import "./checkout.scss";
import CheckoutForm from "./Form";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import BookPriceBlock from "./BookPriceBlock";
import AirportInfoAlt from "./Form/AirportInfo/alt";
import RoomIcon from "@material-ui/icons/RoomOutlined";
import { PriceSquad } from "pages/config/pricesquad";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class CheckoutPage extends Component {
    state = {
        loading: true,
        status: 1,
        amount: 100,
        numPassengers: 1,
        id: "sample-tx-100",
        customer: {
            id: "sample-customer-1",
            firstName: "",
            lastName: "",
            dob: "",
            stripe: ""
        },
        trip: {
            price: "",
            stops: [
                {
                    operator: "",
                    duration: "",
                    stop: {
                        city: "",
                        code: "",
                        name: ""
                    },
                    flightNum: "",
                    arrivalTime: "",
                    departTime: ""
                },
                {
                    operator: "",
                    duration: "",
                    stop: {
                        city: "",
                        code: "",
                        name: ""
                    },
                    flightNum: "",
                    arrivalTime: "",
                    departTime: ""
                }
            ]
        },
        tripInfo: {
            date: "...",
            duration: "",
            airline: {
                name: "",
                flightNum: ""
            },
            origin: {
                city: "Loading...",
                name: "",
                iata: "",
                time: ""
            },
            destination: {
                city: "Loading...",
                name: "",
                iata: "",
                time: ""
            }
        }
    };

    async componentDidMount() {
        const tx = await PriceSquad.tx.get(this.props.match.params.id);
        console.log('TX Response:', tx);
        if (tx) {
            this.setState({
                ...tx,
                loading: false
                // tripInfo: tx.tripInfo,
            });
        }
    }

    updateNumPassengers(num) { this.setState({ numPassengers: num }) };
    constructor(props) {
        super(props);
        this.updateNumPassengers = this.updateNumPassengers.bind(this);
    }
    render() {
        console.log(this.state);
        if (this.state.loading) {
            return <div>loading...</div>;
        }
        const { tripInfo, trip, customer, amount } = this.state;
        if (trip.stops.length < 2) {
            return (
                <div>
                    Our automation messed up! A human will reach out to help you shortly.
        </div>
            );
        }
        const makeHeader = stops => {
            let header = "";
            const iterator = (item, index) => {
                const { stop } = item;
                if (index > 0) {
                    header += " → ";
                }
                header += stop.city;
            };
            stops.forEach(iterator);
            return header;
        };

        const airportInfo = trip.stops.map((item, index, arr) => {
            const { stop } = item;
            console.log(index, item.departTime || item.arrivalTime);
            let airportInfo = (
                <AirportInfoAlt
                    color="rgb(208, 2, 27)"
                    city={stop.city}
                    duration={stop.duration}
                    date={item.departTime || item.arrivalTime}
                    narrow={index === arr.length - 1}
                />
            );

            if (index > 0) {
                airportInfo = React.cloneElement(airportInfo, {
                    tripInfo: [arr[index - 1], item]
                });
            } else {
                airportInfo = React.cloneElement(airportInfo, {
                    icon: <RoomIcon style={{ color: "white" }} />
                });
            }
            return airportInfo;
        });

        console.log('Num Passengers: ', this.state.numPassengers);

        return (
            <div>
                <TravelCitiesHeader origin={makeHeader(trip.stops)} />
                {/* <p>Your Total is {this.state.loading}</p> */}
                <div className="Checkout-Form-Wrapper">
                    <CheckoutForm
                        fName={customer.firstName}
                        lName={customer.lastName}
                        email={customer.email || ""}
                        paymentId={this.state.id}
                        updateNumPassengers={this.updateNumPassengers}
                        passengerCount={this.state.numPassengers}
                        amount={amount * this.state.numPassengers}
                    >
                        {airportInfo}
                    </CheckoutForm>
                    <BookPriceBlock loading={this.state.amount * this.state.numPassengers} />
                </div>
            </div>
        );
    }
}

export default withRouter(CheckoutPage);
