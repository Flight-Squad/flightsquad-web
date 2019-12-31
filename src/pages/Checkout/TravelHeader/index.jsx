import React, { Component } from 'react'
import './index.scss';

export default class TravelCitiesHeader extends Component {
    render() {
        return (
            <div className="Travel-Cities-Header">
                <h1 className="Travel-Cities-Header">{this.props.origin}</h1>
            </div>
        )
    }
}
