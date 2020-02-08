import React, { Component } from 'react'
import './Cities.scss'

/**
 * Takes 3 strings
 * 
 * `month` -> e.g Mar
 * 
 * `day` -> e.g 08
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
                    <span>{`${this.props.month} ${this.props.day}`}</span>
                    {this.props.origin} → {this.props.destination}
                </h4>
                {this.props.children}
            </div>
        )
    }
}

export default TripInfoCities
