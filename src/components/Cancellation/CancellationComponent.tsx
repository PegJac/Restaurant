/* eslint-disable react-hooks/exhaustive-deps */
import firebase from "firebase";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Redirect, useParams } from "react-router";
import { db } from "../../firebase";
import { IBookingState } from "../../models/IBookingState";
import { sendEmailCancellation } from "../../utils/emailSendOut";

function CancellationComponent() {
  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot] = useCollectionData<IBookingState>(bookingsCollectionRef, {
    idField: "id",
  });

  const [redirect, setRedirect] = useState(false);

  interface IParams {
    bookingReference: string;
  }

  let { bookingReference } = useParams<IParams>();

  //Booking to be cancelled
  const [data, setData] = useState<
    firebase.firestore.DocumentData | IBookingState
  >();

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    snapshot?.map((booking) => {
      if (booking.bookingReference === bookingReference) {
        return setData(booking);
      }
    });
  }, [snapshot]);

  //delete document, send email, redirect to confirmation
  function deleteBooking() {
    db.collection("bookings").doc(data?.id).delete();
    sendEmailCancellation(data as IBookingState);
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to="/confirmCancellation" />;
  }

  return (
    <div>
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
