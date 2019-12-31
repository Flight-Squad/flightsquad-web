import React, { Component } from 'react'
import './Airports.scss'

export class TripInfoAirport extends Component {
    render() {
        return (
            <div className="TripInfo-Airport">
                <address>{this.props.name}</address>
                <big>{this.props.iata}</big>
                <small>{this.props.time}</small>
            </div>
        )
    }
}

export default TripInfoAirport
