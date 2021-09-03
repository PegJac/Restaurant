/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, useRef } from "react";
import randomstring from "randomstring";

//child components
import Buttons from "./ChildComponents/Buttons";
import CalanderComponent from "./ChildComponents/CalanderComponent";
import SittingsComponents from "./ChildComponents/SittingsComponents";

//utils
import { countNumberOfTables } from "./../../utils/countNumOfTables";
import { checkAvailability } from "./../../utils/checkAvailability";
import { updateComplexBookingObject } from "../../utils/updateComplexBookingObject";
import { scrollToElement } from "../../utils/scrollToElement";

//DB
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

//interfaces
import { ISitting } from "./../../models/ISitting";
import { GuestInfoComponent } from "./ChildComponents/GuestInfoComponent";
import { IFormInterface } from "./../../models/IFormInterface";
import {
  IBookingState,
  initialBookingState,
} from "./../../models/IBookingState";
import { sendEmail } from "../../utils/emailSendOut";
import Spinner from "./ChildComponents/Spinner";

//Parent component
const BookingsComponent: FC = () => {
  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, error] = useCollectionData(bookingsCollectionRef, {
    idField: "id",
  });

  /** Booking properties saved in state */
  const [bookingState, setBookingState] =
    useState<IBookingState>(initialBookingState);

  /** State for every individual child component - when true, the emelent will be scrolled into view with help from the scrollToElement fn */
  const [numberOfGuestsPicked, setNumberOfGuestsPicked] =
    useState<boolean>(false);
  const [datePicked, setDatePicked] = useState<boolean>(false);
  const [sittingPicked, setSittingPicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /** State for the entire booking object - when true, the booking will be submittible to cloud firestore */
  const [bookingAllowed, setBookingAllowed] = useState<boolean>(false);

  /** Reference to each child compoent */
  const calanderRef = useRef(null);
  const sittingRef = useRef(null);
  const guestInfoRef = useRef(null);

  const updateNumberOfGuests = (numberOfGuests: number) => {
    const numberOfGuestsObj = {
      numberOfGuests,
      numberOfTables: countNumberOfTables(numberOfGuests),
    };
    updateComplexBookingObject(setBookingState, numberOfGuestsObj);
    setNumberOfGuestsPicked(!numberOfGuestsPicked);
  };

  const resetBooking = () => {
    updateComplexBookingObject(setBookingState, initialBookingState);
    setNumberOfGuestsPicked(false);
    setDatePicked(false);
    setNumberOfGuestsPicked(false);
    setBookingAllowed(false);
  };

  /** useEffects that will be used to scroll into the next part of the booking process */
  useEffect(() => {
    scrollToElement(calanderRef);
  }, [numberOfGuestsPicked]);

  //controlling the calander settings
  const updateDate = (date: string) => {
    updateComplexBookingObject(setBookingState, { date });
    setDatePicked(!datePicked);
  };

  const updateSitting = (sitting: string) => {
    updateComplexBookingObject(setBookingState, { sitting });
    setSittingPicked(!sittingPicked);
  };
  useEffect(() => {
    scrollToElement(guestInfoRef);
  }, [sittingPicked]);

  const [sittingAvailability, setSittingAvailability] = useState<ISitting>({
    sitting18: false,
    sitting21: false,
  });

  const updateUserInformation = (userInfomation: IFormInterface) => {
    const userInfoObj = {
      ...userInfomation,
      bookingReference: randomstring.generate(18),
    };
    updateComplexBookingObject(setBookingState, userInfoObj);
    setBookingAllowed(!bookingAllowed);
    setLoading(true);
  };

  //triggered when the user info form is submitted
  useEffect(() => {
    //check that all of bookingState's properties are truthies
    let isBookingPossible = Object.values(bookingState).every(Boolean);
    if (isBookingPossible) {
      bookingsCollectionRef.add(bookingState).then((res) => {
        if (res) {
          //empty state
          setBookingAllowed(false);
          sendEmail(bookingState);
          // resetBooking();
        }
      });
    }
  }, [bookingAllowed]);

  useEffect(() => {
    scrollToElement(sittingRef);

    if (snapshot && !error) {
      console.log(snapshot);
      const { date } = bookingState;
      const [numberOfBookedTables18, numberOfBookedTables21, error] =
        checkAvailability(snapshot, date!);

      setSittingAvailability({
        //following statements will be evaluated as a boolean
        sitting18: numberOfBookedTables18! < 16,
        sitting21: numberOfBookedTables21! < 16,
      });
    }
  }, [datePicked]);

  useEffect(() => {
    console.log("State updated: ", bookingState);
  }, [bookingState]);

  return (
    <>
      <Spinner visible={loading} />
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
            <SittingsComponents
              updateSitting={updateSitting}
              availableTables={sittingAvailability}
            />
          </div>
        )}
        {datePicked && numberOfGuestsPicked && sittingPicked && (
          <div className="bookings-page__guest-information" ref={guestInfoRef}>
            <GuestInfoComponent updateInformation={updateUserInformation} />
          </div>
        )}
      </main>
    </>
  );
};

export default BookingsComponent;
