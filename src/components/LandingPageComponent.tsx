import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPageComponent() {
    return (
        <>
            <h1>late night brunch</h1>
            <Link to="/bookings">Bookings</Link>
            <br />
            <Link to="/contact">Contact</Link>
        </>
    )
}
