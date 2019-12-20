import React, { Component } from 'react'
import './Cities.scss'

/**
 * Takes 3 strings
 * 
 * `date` -> e.g Mar 08
 * 
 * `origin` -> e.g Boston
 * 
 * `destination` -> e.g Los Angeles
 */
export class TripInfoCities extends Component {
    render() {
        return (
            <div className="TripInfo-Cities">
                <h4>
                    <span>{this.props.date}</span>
                    {this.props.origin} → {this.props.destination}
                </h4>
                {this.props.children}
            </div>
        )
    }
}

export default TripInfoCities
