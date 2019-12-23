import React, { Component } from 'react'
import CheckoutPartTitle from '../CheckoutPartTitle';
import AirportInfo from './AirportInfo';
import AirportInfoAlt from './AirportInfo/alt';

export class TripSummary extends Component {
    render() {
        return (
            <div>
                <CheckoutPartTitle title="Trip Summary" part="1" noTop />
                <div style={{ paddingBottom: '20px' }} />
                <div className="Agenda">
                    <ul className="Travel-List">
                        <AirportInfo />
                        <AirportInfoAlt narrow color='rgb(208, 2, 27)' tripInfo={{
                            date: 'Mar 08',
                            duration: '2h 05m',
                            airline: {
                                name: 'Ryanair',
                                flightNum: 'FR 1080',
                            },
                            origin: {
                                city: 'London',
                                airport: {
                                    name: 'London Stansted Airport',
                                    iata: 'STN',
                                    time: '12:45',
                                },
                            },
                            destination: {
                                city: 'Denver',
                                airport: {
                                    name: 'London Stansted Airport',
                                    iata: 'STN',
                                    time: '15:45',
                                },
                            },
                        }} />
                    </ul>
                </div>
            </div>
        )
    }
}

export default TripSummary
