import { DocumentData } from "@firebase/firestore-types";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../../firebase";

export const AdminBookingComponent = () => {

  interface IParams {
    id: string;
  }

  const { id } = useParams<IParams>()

  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, loading, error] = useCollectionData(bookingsCollectionRef, {
    idField: "id",
  });

  const [data, setData] = useState<DocumentData>()
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    snapshot?.map((booking, i) => {
      if (booking.bookingReference === id) {
        return setData(booking)
      }
    })
  }, [snapshot])

  function deleteBooking() {
    db.collection("bookings").doc(data?.id).delete();
    setRedirect(true);
  }

  function editBooking() {
    <Link to="/edit" />
  }

  if (redirect) {
    return <Redirect to="/admin/bookings" />;
  }

  return (
    <div>
      <h1>Booking</h1>
      <p>{id}</p>
      {data ? (
        <>
          <div>
            <p>{data.id}</p>
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
            Delete reservation
          </button>
          <button onClick={editBooking} type="button">
            Edit reservation
          </button>
        </>
      ) : (
        <p>Looking for booking...</p>
      )}
    </div>
  );
};
