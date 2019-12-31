import React, { Component } from 'react'
import './CityTitle.scss'

export class CityTitle extends Component {
    render() {
        return (
            <div className="City-Title">
                <h3 className="City-Name">{this.props.name}</h3>
                <h5 className="City-Subtitle">
                    <span>
                        {this.props.duration} &nbsp; / &nbsp; {this.props.date}
                    </span>
                </h5>
            </div>
        )
    }
}

export default CityTitle
