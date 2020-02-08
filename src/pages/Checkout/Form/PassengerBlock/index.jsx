import './index.scss';
import React, { useContext } from 'react';
import { PassengersDispatch } from '../context';
import DobPicker from 'Components/DatePicker/DobPicker';

/**
 * 
 * @param {*} props 
 * - `passengerInfo`: `{ fName: string, lName: string, dob: string | Date }`
 * - `id`: `number`
 */
export function PassengerBlock({ passengerInfo, id, dispatcher, deletable }) {
    const update = (info) => dispatcher({ type: 'update', id, info });
    const info = passengerInfo;
    console.log('Passenger Block:', id, passengerInfo);
    const deleteButton = deletable ? <button onClick={() => dispatcher({ type: 'delete', id })}>Remove Passenger</button> : <div></div>;
    return (
        <div className="Passenger-Block">
            {/* <h1>1 Passenger</h1> */}
            <h4>Use all information exactly as it appears on your passport/ID.</h4>
            <div className="Passenger-Block-Data">
                <div className='PassengerForm-Row'>
                    <div className='PassengerForm-Row-Block'>
                        <label>First Name</label>
                        <input required autoComplete="fname" type="text" name="fName"
                            value={info.fName || ''}
                            onChange={(e) => update({ fName: e.target.value })}
                        />
                    </div>
                    <div className='PassengerForm-Row-Block'>
                        <label>Last Name</label>
                        <input required autoComplete="lname" type="text" name="lName"
                            value={info.lName || ''}
                            onChange={(e) => update({ lName: e.target.value })}
                        />
                    </div>
                </div>
                <div className='PassengerForm-Row'>
                    {/* <div className='PassengerForm-Row-Block'>
                        <label>Email</label>
                        <input type="email" disableUnderline={true}
                            value={this.state.email || ''}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </div> */}
                    <div className='PassengerForm-Row-Block'>
                        <label>Date of Birth</label>
                        <DobPicker required dob={info.dob || null}
                            onChange={(date) => update({ dob: date })}
                        />
                    </div>

                </div>
                <button onClick={() => dispatcher({ type: 'add' })}>Add Passenger</button>
                {deleteButton}
            </div>
        </div>
    );
}

export function BillingInfo({ notifyEmail, email }) {
    return (
        <div className="Passenger-Block">
            {/* <h1>1 Passenger</h1> */}
            {/* <h4>Use all information exactly as it appears on your passport/ID.</h4> */}
            <div className="Passenger-Block-Data">
                <div className='PassengerForm-Row-Block'>
                    <label>Email</label>
                    <input type="email" disableUnderline={true}
                        value={email || ''}
                        onChange={e => notifyEmail(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}