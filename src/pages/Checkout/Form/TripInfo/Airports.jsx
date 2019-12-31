import React, { Component } from 'react'
import './Airports.scss'

export class TripInfoAirports extends Component {
    render() {
        return (
            <div className="TripInfo-Airports">
                {this.props.children}
            </div>
        )
    }
}

export default TripInfoAirports
