import React, { Component } from 'react'
import './InfoCircle.scss'

/**
 * `marker` -> flag for css class, true if using icon
 * 
 * `icon` -> Svg icon, set `marker` flag to render correctly
 * 
 * `day` -> string, e.g '08'
 * 
 * `month` -> string, e.g 'Mar'
 */
export class InfoCircle extends Component {
    render() {
        const circleClass = this.props.marker ? 'Info-Circle Info-Circle-Marker' : 'Info-Circle'
        return (
            <div className={circleClass} style={{ backgroundColor: this.props.color, }}>
                {this.props.icon}
                <big>{this.props.day}</big>
                <small>{this.props.month}</small>
            </div>
        )
    }
}

export default InfoCircle
