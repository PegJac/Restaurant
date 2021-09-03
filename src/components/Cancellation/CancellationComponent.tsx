import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import { Redirect, useParams } from 'react-router';
import { db } from '../../firebase';

function CancellationComponent() {
  const bookingsCollectionRef = db.collection('bookings');
  const [snapshot, loading, error] = useCollectionData(bookingsCollectionRef, {
    idField: 'id',
  });

  const [redirect, setRedirect] = useState(false);

  interface IParams {
    bookingReference: string;
  }

  let { bookingReference } = useParams<IParams>();

  const [data, setData] = useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    snapshot?.map((booking) => {
      if (booking.bookingReference === bookingReference) {
        return setData(booking);
      }
    });
  }, [snapshot]);

  function deleteBooking() {
    db.collection('bookings').doc(data?.id).delete();
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to="/confirmCancellation" />;
  }

  return (
    <div>
      <h1>Cancellation cmponent</h1>
      {data ? (
        <>
          <div>
            <p>Booking reference: {bookingReference}</p>
            <p>
              Name: {data.firstName} {data.lastName}
            </p>
            <p>
              Contact info: {data.number} {data.email}
            </p>
            <p>
              Booking for: {data.date} {data.sitting}
            </p>
            <p>{data.numberOfGuests} guests</p>
          </div>
          <button onClick={deleteBooking} type="button">
            Delete booking
          </button>
        </>
      ) : (
        <p>Looking for booking...</p>
      )}
    </div>
  );
}

export default CancellationComponent;
