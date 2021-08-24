import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPageComponent() {
    return (
        <div id="landingPageContainer">
            <h1>late night brunch.</h1>
            <Link to="/booking">BOOKING</Link>
            <Link to="/contact">CONTACT</Link>
        </div>
    )
}