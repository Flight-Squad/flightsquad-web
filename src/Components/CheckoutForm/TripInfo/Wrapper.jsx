import React, { Component } from 'react'
import './Wrapper.scss'

export class TripInfoWrapper extends Component {
    render() {
        return (
            <div className="TripInfo-Wrapper">
                {this.props.children}
            </div>
        )
    }
}

export default TripInfoWrapper
