import React, { Component } from 'react'
import Airplane from '@material-ui/icons/AirplanemodeActive';
import './Airline.scss'

export class TripInfoAirline extends Component {
    render() {
        return (
            <div className="TripInfo-Airline">
                <Airplane />
                <big>{this.props.name}</big>
                <small>{this.props.flightNum}</small>
            </div>
        )
    }
}

export default TripInfoAirline
