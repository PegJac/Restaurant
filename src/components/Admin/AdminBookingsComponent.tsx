import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

export const AdminBookingsComponent = () => {
  // Getting the collection and sorting it after date
  const bookinsRef = db.collection("bookings").orderBy("date");

  //Fetching data by using a firebase hook.
  const [snapshot, loading, error] = useCollectionData(bookinsRef);

  if (loading) {
    console.log(snapshot);
  }

  // the rendered HTML variable
  let div = snapshot?.map((booking, index) => {
    return (
      <div key={index}>
        <h3>{`${booking.firstName} ${booking.lastName}`}</h3>
        <p>{booking.date}</p>
        <p>{booking.sitting}</p>
        <p>{booking.numberOfGuests}</p>
        <p>{booking.numberOfTables}</p>
        <button>
          <Link to={`/admin/booking/${booking.bookingReference}`}>
            View details
          </Link>
        </button>
      </div>
    );
  });
  return (
    <div>
      <h1>AdminView's</h1>
      <div>{snapshot ? div : <h2>Looking for bookings</h2>}</div>
    </div>
  );
};
