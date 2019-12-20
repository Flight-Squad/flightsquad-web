import React, { Component } from 'react';
import { TripInfoAirline, TripInfoAirport, TripInfoAirports, TripInfoCities, TripInfoDuration, TripInfoWrapper } from '../TripInfo';
import './index.scss';
import InfoPath from './InfoPath';
import InfoCircle from './InfoCircle';
import CityTitle from './CityTitle';

export default class AirportInfoAlt extends Component {
    render() {
        const wrapperClass = this.props.narrow ? "Info-Wrapper Info-Wrapper-Narrow" : "Info-Wrapper";
        const infoPath = this.props.narrow ? null : <InfoPath color={this.props.color} />;

        let tripInfoWrapper = null;
        if (this.props.tripInfo) {
            const { tripInfo } = this.props;
            const {origin, destination, airline} = tripInfo;
            tripInfoWrapper = <TripInfoWrapper>
                <TripInfoCities date={tripInfo.date} origin={origin.city} destination={destination.city}>

                    <TripInfoAirports>
                        <TripInfoAirport name={origin.airport.name} iata={origin.airport.iata} time={origin.airport.time} />
                        <TripInfoDuration duration={tripInfo.duration} />
                        <TripInfoAirport name={destination.airport.name} iata={destination.airport.iata} time={destination.airport.time} />
                    </TripInfoAirports>
                </TripInfoCities>
                <TripInfoAirline name={airline.name} flightNum={airline.flightNum} />
            </TripInfoWrapper>;
        }
        return (
            <li>
                <div className={wrapperClass}>
                    {infoPath}
                    {this.props.children}


                    {tripInfoWrapper}
                    <InfoCircle color={this.props.color} day='08' month='Mar' />
                    <CityTitle name="London" duration="2h 05m" date="Mar 08" />
                </div>
            </li>
        )
    }
}
