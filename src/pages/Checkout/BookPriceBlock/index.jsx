import React, { Component } from 'react'
import './BookPriceBlock.scss'

export class BookPriceBlock extends Component {
    render() {
        return (
            <div className="Book-Price">
                <div style={{ minHeight: '196.333px' }}>
                    <div style={{ transform: 'translateZ(0px)' }}>
                        <div className='Book-Price-Block'>
                            <div>
                                <div className='Book-Price-h2'>Trip Price</div>
                                <div className='Book-Price-PassCount-Block'>
                                    1 x Passenger
                                    <i>${this.props.loading}</i>
                                </div>
                                <div className='Book-Price-PassCount-Block' style={{ marginTop: '10px' }}>
                                    Baggage
                                    <i>FREE</i>
                                </div>
                                <div className='Book-Price-Total'>
                                    <div className='Book-Price-h1'>
                                        <strong>
                                            Total to Pay
                                            <i>USD</i>
                                        </strong>
                                        <big className='Book-Price-Total-Default'>${this.props.loading}</big>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookPriceBlock
