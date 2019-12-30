import React, { Component } from 'react'
import CheckoutPartTitle from '../CheckoutPartTitle';
import AirportInfo from './AirportInfo';
import AirportInfoAlt from './AirportInfo/alt';

export class TripSummary extends Component {
    render() {
        return (
            <div>
                <CheckoutPartTitle title="Trip Summary" part="1" noTop />
                <div style={{ paddingBottom: '20px' }} />
                <div className="Agenda">
                    <ul className="Travel-List">
                        {this.props.children}
                    </ul>
                </div>
            </div>
        )
    }
}

export default TripSummary
