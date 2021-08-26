import React, { FC, useEffect, useState, useRef } from "react";
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

  //controlling number of guests
  const [numberOfGuestsPicked, setNumberOfGuestsPicked] =
    useState<boolean>(false);
  const updateNumberOfGuests = (numberOfGuests: number) => {
    setBookingState((prevState) => {
      //prevState is a copy of bookingState because we should never mutate state directly
      return { ...prevState, numberOfGuests: numberOfGuests };
    });
    setNumberOfGuestsPicked(!numberOfGuestsPicked);
  };

  //controlling the calander settings
  const [datePicked, setDatePicked] = useState<boolean>(false);
  const calanderRef = useRef(null);
  const updateDate = (date: string) => {
    setBookingState((prevState) => {
      return { ...prevState, date: date };
    });
    setDatePicked(!datePicked);
  };
  useEffect(() => {
    if (calanderRef.current) {
      (calanderRef.current! as HTMLElement).scrollIntoView();
    }
  }, [numberOfGuestsPicked]);

  //controlling sittings
  const sittingRef = useRef(null);
  const updateSitting = (sitting: string) => {
    setBookingState((prevState) => {
      return { ...prevState, sitting: sitting };
    });
  };
  useEffect(() => {
    if (sittingRef.current) {
      (sittingRef.current! as HTMLElement).scrollIntoView();
    }
  }, [datePicked]);

  useEffect(() => {
    console.log("State updated: ", bookingState);
  }, [bookingState]);

  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, loading, error] = useCollectionData(bookingsCollectionRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log(snapshot);
  return (
    <main className="bookings-page">
      <h1>Bookings</h1>
      <p>How many guests are there in your party?</p>
      <Buttons setNumberOfGuests={updateNumberOfGuests} />
      {numberOfGuestsPicked && (
        <div className="bookings-page__calander-container" ref={calanderRef}>
          <p>Sounds great! What date do you wish to visit us?</p>
          <CalanderComponent change={updateDate} />
        </div>
      )}
      {datePicked && numberOfGuestsPicked && (
        <div ref={sittingRef} className={"bookings-page__sittings-container"}>
          <SittingsComponents updateSitting={updateSitting} />
        </div>
      )}
    </main>
  );
};

export default BookingsComponent;
