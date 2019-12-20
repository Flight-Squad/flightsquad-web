import React, { Component } from 'react'
import './index.scss';

export default class CheckoutPartTitle extends Component {
    render() {
        const titleClass = this.props.noTop ? "Part-Title Part-Title-NoTop" : 'Part-Title';
        return (
            <h2 className={titleClass}>
                <address>{this.props.address}</address>
                <span>{this.props.part}</span>
                {this.props.title}
            </h2>
        )
    }
}
