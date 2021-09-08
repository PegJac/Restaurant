import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import BookingCard from "./BookingCard";
import { IBookingState } from "../../models/IBookingState";
import Spinner from "../Bookings/ChildComponents/Spinner";

export const AdminBookingsComponent = () => {
  // Getting the collection and sorting it after date
  const bookinsRef = db.collection("bookings").orderBy("date");

  //Fetching data by using a firebase hook.
  const [snapshot, loading, error] =
    useCollectionData<IBookingState>(bookinsRef);

  const bookingCards = snapshot?.map((booking, i) => {
    return <BookingCard bookingObj={booking} key={i} />;
  });

  return (
    <main className="admin-bookings-page">
      <h1>AdminView's</h1>
      {loading && <Spinner />}
      {!loading && (
        <section className="booking-cards-container">{bookingCards}</section>
      )}
      {error && error.message.toString()}
    </main>
  );
};
