import React, { Component } from 'react';
import { TripInfoAirline, TripInfoAirport, TripInfoAirports, TripInfoCities, TripInfoDuration, TripInfoWrapper } from '../TripInfo';
import './index.scss';
import InfoPath from './InfoPath';
import InfoCircle from './InfoCircle';
import CityTitle from './CityTitle';
import { format } from 'date-fns';

export default class AirportInfoAlt extends Component {
    render() {
        const wrapperClass = this.props.narrow ? "Info-Wrapper Info-Wrapper-Narrow" : "Info-Wrapper";
        const infoPath = this.props.narrow ? null : <InfoPath color={this.props.color} />;

        let tripInfoWrapper, day, month;
        const {tripInfo} = this.props;
        if (tripInfo && tripInfo.length >= 2) {
            const [origin, dest] = this.props.tripInfo;
            const departDate = new Date(origin.departTime);
            const arrivalDate = new Date(dest.arrivalTime);
            // https://date-fns.org/v2.9.0/docs/format
            day = format(departDate, 'dd')
            month = format(departDate, 'MMM');
            const time = (date) => format(date, 'p');

            tripInfoWrapper = <TripInfoWrapper>
                <TripInfoCities day={day} month={month} origin={origin.stop.city} destination={dest.stop.city}>

                    <TripInfoAirports>
                        <TripInfoAirport name={''} iata={origin.stop.code} time={time(departDate)} />
                        <TripInfoDuration duration={origin.duration} />
                        <TripInfoAirport name={''} iata={dest.stop.code} time={time(arrivalDate)} />
                    </TripInfoAirports>
                </TripInfoCities>
                <TripInfoAirline name={origin.operator} flightNum={origin.flightNum} />
            </TripInfoWrapper>;
        }

        console.log(this.props.date)
        return (
            <li>
                <div className={wrapperClass}>
                    {infoPath}
                    {this.props.children}


                    {tripInfoWrapper}
                    <InfoCircle color={this.props.color} icon={this.props.icon} day={day} month={month} />
                    <CityTitle name={this.props.city} duration={this.props.duration || 'Start'} date={format(new Date(this.props.date), 'MMM dd')} />
                </div>
            </li>
        )
    }
}
