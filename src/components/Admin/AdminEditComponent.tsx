import { DocumentData, GetOptions, QuerySnapshot } from '@firebase/firestore-types';
import { TextField, FormControl, FormControlLabel, Checkbox, FormHelperText, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { DocumentDataHook, useCollectionData } from 'react-firebase-hooks/firestore';
import { Redirect, useParams } from 'react-router';
import { db } from '../../firebase';

export default function AdminEdit() {

    interface IParams {
        id: string;
    }

    const { id } = useParams<IParams>();

    const bookingsCollectionRef = db.collection("bookings");
    const [snapshot, loading, error] = useCollectionData(bookingsCollectionRef, {
        idField: "id",
    });

    const [booking, setBooking] = useState<DocumentData>()
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        snapshot?.map((booking, i) => {
            if (booking.bookingReference == id) {
                return setBooking(booking)
            }
        });
    }, [snapshot]);

    function handleChangeFirstName(e: any) {
        setBooking(prevState => ({
            ...prevState,
            firstName: e.target.value
        }))
    }

    function handleChangeLastName(e: any) {
        setBooking(prevState => ({
            ...prevState,
            lastName: e.target.value
        }))
    }

    function handleChangeEmail(e: any) {
        setBooking(prevState => ({
            ...prevState,
            email: e.target.value
        }))
    }

    function handleChangeNumber(e: any) {
        setBooking(prevState => ({
            ...prevState,
            number: e.target.value
        }))
    }

    function handleSubmit() {
        console.log("finished booking: " + booking)
        db.collection("bookings").doc(booking?.id).update({
            firstName: booking?.firstName,
            lastName: booking?.lastName,
            email: booking?.email,
            number: booking?.number,
        })
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={`/admin/booking/${id}`} />;
    }

    return (
        <div>
            <h1>Edit</h1>
            {booking ?
                <form>
                    <TextField value={booking.firstName} variant="outlined" name="firstName" onChange={handleChangeFirstName} />
                    <TextField value={booking.lastName} variant="outlined" name="lastName" onChange={handleChangeLastName} />
                    <TextField value={booking.email} variant="outlined" name="email" onChange={handleChangeEmail} />
                    <TextField value={booking.number} variant="outlined" name="number" onChange={handleChangeNumber} />
                    <button onClick={handleSubmit} type="button">Update</button>
                </form>
                : <p>Loading...</p>
            }
        </div>
    )
}
