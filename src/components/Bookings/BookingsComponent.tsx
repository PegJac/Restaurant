import React, { FC, useEffect, useState, useRef } from 'react';

//child components
import Buttons from './ChildComponents/Buttons';
import CalanderComponent from './ChildComponents/CalanderComponent';
import SittingsComponents from './ChildComponents/SittingsComponents';

//utils
import { countNumberOfTables } from './../../utils/countNumOfTables';

// import "firebase/firestore";

//DB
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';

//interfaces
import { ISitting } from './../models/ISitting';
import { GuestInfoComponent } from './ChildComponents/GuestInfoComponent';
interface IBookingState {
  numberOfGuests: number | null;
  date: string | null;
  sitting: string | null;
  numberOfTables: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  number: string | null;
  acceptedGDPR: boolean | null;
  bookingReference: string | null;
}

//Parent component
const BookingsComponent: FC = () => {
  const bookingsCollectionRef = db.collection('bookings');
  const [snapshot, loading, error] = useCollectionData(bookingsCollectionRef, {
    idField: 'id',
  });

  const [bookingAllowed, setBookingAllowed] = useState<boolean>(false);

  //Booking options saved in state
  const [bookingState, setBookingState] = useState<IBookingState>({
    numberOfGuests: null,
    date: null,
    sitting: null,
    numberOfTables: null,
    firstName: null,
    lastName: null,
    email: null,
    number: null,
    acceptedGDPR: false,
    bookingReference: null,
  });

  //controlling number of guests
  const [numberOfGuestsPicked, setNumberOfGuestsPicked] = useState<boolean>(false);
  const updateNumberOfGuests = (numberOfGuests: number) => {
    setBookingState((prevState) => {
      //prevState is a copy of bookingState because we should never mutate state directly
      return {
        ...prevState,
        numberOfGuests: numberOfGuests,
        numberOfTables: countNumberOfTables(numberOfGuests),
      };
    });
    setNumberOfGuestsPicked(!numberOfGuestsPicked);
  };
  //scroll into next section when that state of the previous is updated
  useEffect(() => {
    if (calanderRef.current) {
      (calanderRef.current! as HTMLElement).scrollIntoView();
    }
  }, [numberOfGuestsPicked]);

  //controlling the calander settings
  const [datePicked, setDatePicked] = useState<boolean>(false);
  const calanderRef = useRef(null);
  const updateDate = (date: string) => {
    setBookingState((prevState) => {
      return { ...prevState, date: date };
    });
    setDatePicked(!datePicked);
  };

  //controlling sittings
  const sittingRef = useRef(null);
  const [sittingPicked, setSittingPicked] = useState<boolean>(false);

  const updateSitting = (sitting: string) => {
    setBookingState((prevState) => {
      return { ...prevState, sitting: sitting };
    });
    setSittingPicked(true);
  };
  const [sittingAvailability, setSittingAvailability] = useState<ISitting>({
    sitting18: false,
    sitting21: false,
  });

  const updateUserInformation = (name: string, value: string | boolean) => {
    const newInfoObj: { [key: string]: string | boolean } = {};
    newInfoObj[name] = value;
    setBookingState((prevState) => {
      return { ...prevState, ...newInfoObj };
    });
  };

  //scroll into next section when that state of the previous is updated
  useEffect(() => {
    if (sittingRef.current) {
      (sittingRef.current! as HTMLElement).scrollIntoView();
    }

    if (snapshot && !error) {
      const { date } = bookingState;
      let numberOfBookedTables18 = 0;
      let numberOfBookedTables21 = 0;

      snapshot.forEach((bookingInDB) => {
        if (date === bookingInDB.date) {
          bookingInDB.sitting === '18:00'
            ? (numberOfBookedTables18 += bookingInDB.numberOfTables)
            : (numberOfBookedTables21 += bookingInDB.numberOfTables);
        }
      });
      console.log('18', numberOfBookedTables18);
      console.log('21', numberOfBookedTables21);
      setSittingAvailability({
        sitting18: numberOfBookedTables18 < 16,
        sitting21: numberOfBookedTables21 < 16,
      });
    }
  }, [datePicked]);
  useEffect(() => {}, [sittingPicked]);

  useEffect(() => {
    console.log('State updated: ', bookingState);
  }, [bookingState]);

  return (
    <main className='bookings-page'>
      <h1>Bookings</h1>
      <p>How many guests are there in your party?</p>
      <Buttons setNumberOfGuests={updateNumberOfGuests} />
      {numberOfGuestsPicked && (
        <div className='bookings-page__calander-container' ref={calanderRef}>
          <p>Sounds great! What date do you wish to visit us?</p>
          <CalanderComponent change={updateDate} />
        </div>
      )}
      {datePicked && numberOfGuestsPicked && (
        <div ref={sittingRef} className={'bookings-page__sittings-container'}>
          <SittingsComponents updateSitting={updateSitting} availableTables={sittingAvailability} />
        </div>
      )}
      <GuestInfoComponent updateInformation={updateUserInformation} />
    </main>
  );
};

export default BookingsComponent;
