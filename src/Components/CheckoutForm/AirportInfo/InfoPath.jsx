import React, { Component } from 'react'
import './InfoPath.scss'

/**
 * `color` is a valid CSS color property string
 */
export class InfoPath extends Component {
    render() {
        return (
            <div className="Info-Path" style={{borderColor: this.props.color}} ></div>
        )
    }
}

export default InfoPath
