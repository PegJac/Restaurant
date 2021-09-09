import { Fab } from '@material-ui/core'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function HomeButtonComponent() {

    return (
        <div>
            <Link to="/" className="homeLink">
                <Fab variant="extended" className="homeFab">
                    <p className="homeButton">Home</p>
                </Fab>
            </Link>
        </div>
    )
}