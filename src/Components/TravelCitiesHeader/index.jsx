import React, { Component } from 'react'
import './index.scss';

export default class TravelCitiesHeader extends Component {
    render() {
        return (
            <div className="Travel-Cities-Header">
                <h1>{this.props.origin}</h1>
            </div>
        )
    }
}
