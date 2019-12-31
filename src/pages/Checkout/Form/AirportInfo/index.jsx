import React, { Component } from 'react'
import './index.scss';
import RoomIcon from '@material-ui/icons/RoomOutlined';
import InfoPath from './InfoPath';
import InfoCircle from './InfoCircle';

export default class AirportInfo extends Component {
    render() {
        return (
            <li>
                <div className="Info-Wrapper">
                    <InfoPath color='rgb(208, 2, 27)' />
                    <InfoCircle marker color='rgb(208, 2, 27)' icon={<RoomIcon style={{color: 'white'}}/>} day="08" />
                    <div className="City-Title">
                        <h3 className="City-Name">London</h3>
                        <h5 className="City-Subtitle">
                            <span>
                                Start &nbsp; / &nbsp; Mar 08
                            </span>
                        </h5>
                    </div>
                </div>
            </li>
        )
    }
}
