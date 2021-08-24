import React, { FC, useEffect, useState } from "react";
import Buttons from "./ChildComponents/Buttons";
import CalanderComponent from "./ChildComponents/CalanderComponent";

import "firebase/firestore";

import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SittingsComponents from "./ChildComponents/SittingsComponents";

interface IBookingState {
  numberOfGuests: number | null;
  date: string | null;
  sitting: string | null;
}

const BookingsComponent: FC = () => {
  const [bookingState, setBookingState] = useState<IBookingState>({
    numberOfGuests: null,
    date: null,
    sitting: null,
  });

  const updateNumberOfGuests = (numberOfGuests: number) => {
    setBookingState((prevState) => {
      //prevState is a copy of bookingState because we should never mutate state directly
      return { ...prevState, numberOfGuests: numberOfGuests };
    });
  };

  const updateDate = (date: string) => {
    setBookingState((prevState) => {
      return { ...prevState, date: date };
    });
  };

  const updateSitting = (sitting: string) => {
    setBookingState((prevState) => {
      return { ...prevState, sitting: sitting };
    });
  };

  useEffect(() => {
    console.log("State updated: ", bookingState);
  }, [bookingState]);

  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, loading, error] = useCollectionData(bookingsCollectionRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log(snapshot);
  return (
    <main>
      <h1>Bookings</h1>
      <p>Number of guests:</p>
      <Buttons setNumberOfGuests={updateNumberOfGuests} />
      <CalanderComponent change={updateDate} />
      <SittingsComponents updateSitting={updateSitting} />
    </main>
  );
};

export default BookingsComponent;
