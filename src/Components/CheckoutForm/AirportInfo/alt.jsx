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

        const { tripInfo } = this.props;
        let tripInfoWrapper, day, month;
        if (tripInfo) {
            const { origin, destination, airline, date } = tripInfo;
            console.log(tripInfo);
            day = date.split(' ')[1];
            month = date.split(' ')[0];

            tripInfoWrapper = <TripInfoWrapper>
                <TripInfoCities date={tripInfo.date} origin={origin.city} destination={destination.city}>

                    <TripInfoAirports>
                        <TripInfoAirport name={''} iata={origin.iata} time={origin.time} />
                        <TripInfoDuration duration={tripInfo.duration} />
                        <TripInfoAirport name={''} iata={destination.iata} time={destination.time} />
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
                    <InfoCircle color={this.props.color} icon={this.props.icon} day={day} month={month} />
                    <CityTitle name={this.props.city} duration={this.props.duration || 'Start'} date={this.props.date} />
                </div>
            </li>
        )
    }
}
