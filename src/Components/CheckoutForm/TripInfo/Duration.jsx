import React, { Component } from 'react'
import './Duration.scss'

export class TripInfoDuration extends Component {
    render() {
        return (
            <div className="TripInfo-Duration">
                {this.props.duration}
            </div>
        )
    }
}

export default TripInfoDuration
