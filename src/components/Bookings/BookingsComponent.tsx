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
import { useSpring, animated } from "react-spring";
import { Toaster } from "react-hot-toast";

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
import { sendEmailConfirmation } from "../../utils/emailSendOut";
import Spinner from "./ChildComponents/Spinner";
import { useHistory } from "react-router";

//Parent component
const BookingsComponent: FC = () => {
  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, error] = useCollectionData(bookingsCollectionRef, {
    idField: "id",
  });

  const headerFadeIn = useSpring({
    from: { scale: 2, opacity: 0, y: -30 },
    to: { scale: 1, opacity: 1, y: 0 },
    config: {
      duration: 600,
    },
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
    setNumberOfGuestsPicked(true);
  };

  /** useEffects that will be used to scroll into the next part of the booking process */
  useEffect(() => {
    scrollToElement(calanderRef);
  }, [numberOfGuestsPicked]);

  //controlling the calander settings
  const updateDate = (date: string) => {
    updateComplexBookingObject(setBookingState, { date });
    setDatePicked(true);
  };

  const updateSitting = (sitting: string) => {
    updateComplexBookingObject(setBookingState, { sitting });
    setSittingPicked(true);
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
  let history = useHistory();

  //triggered when the user info form is submitted
  useEffect(() => {
    //check that all of bookingState's properties are truthies
    console.log(bookingState);
    let isBookingPossible = Object.values(bookingState).every(Boolean);
    if (isBookingPossible) {
      bookingsCollectionRef.add(bookingState).then((res) => {
        if (res) {
          //empty state
          // setBookingAllowed(false);
          sendEmailConfirmation(bookingState);
          history.push("/confirmation");
          // resetBooking();
        } else {
          alert("Your booking did not go trough, please try again later");
          history.push("/bookings");
        }
      });
    }
  }, [bookingAllowed]);

  useEffect(() => {
    scrollToElement(sittingRef);

    if (snapshot && !error) {
      console.log(snapshot);
      const { date } = bookingState;
      const [numberOfBookedTables18, numberOfBookedTables21] =
        checkAvailability(snapshot, date!);

      setSittingAvailability({
        //following statements will be evaluated as a boolean
        sitting18: numberOfBookedTables18! < 16,
        sitting21: numberOfBookedTables21! < 16,
      });
    }
  }, [datePicked]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Spinner visible={loading} />
      <main className="bookings-page">
        <section className="bookings-page__number-of-people">
          <animated.div style={headerFadeIn}>
            <h1>Make a booking</h1>
          </animated.div>
          <div className="center">
            <h5>How many guests are there in your party?</h5>
            <Buttons setNumberOfGuests={updateNumberOfGuests} />
          </div>
        </section>
        {numberOfGuestsPicked && (
          <section
            data-testid="calander-component"
            className="bookings-page__calander-container"
            ref={calanderRef}
          >
            <h5>Sounds great! What date do you wish to visit us?</h5>
            <CalanderComponent change={updateDate} />
          </section>
        )}
        {datePicked && numberOfGuestsPicked && (
          <section
            data-testid="sittings-component"
            ref={sittingRef}
            className={"bookings-page__sittings-container"}
          >
            <SittingsComponents
              updateSitting={updateSitting}
              availableTables={sittingAvailability}
            />
          </section>
        )}
        {datePicked && numberOfGuestsPicked && sittingPicked && (
          <section
            className="bookings-page__guest-information"
            ref={guestInfoRef}
          >
            <GuestInfoComponent updateInformation={updateUserInformation} />
          </section>
        )}
      </main>
    </>
  );
};

export default BookingsComponent;
