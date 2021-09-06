import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPageComponent() {
    return (
        <div className="landingPageContainer">
            <h1>late night brunch</h1>
            <div className="backgroundImage">
                <Link className="btn bookingBtn" to="/bookings">BOOKING</Link>
                <Link className="btn contactBtn" to="/contact">CONTACT</Link>

                <Link className="btn menuBtn" to="">MENU</Link>
            </div>
        </div>
    )
}
