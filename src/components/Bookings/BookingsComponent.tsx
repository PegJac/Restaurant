import React, { FC, useEffect, useState, useRef } from "react";
import randomstring from "randomstring";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";

//child components
import Buttons from "./ChildComponents/Buttons";
import CalanderComponent from "./ChildComponents/CalanderComponent";
import SittingsComponents from "./ChildComponents/SittingsComponents";

//utils
import { countNumberOfTables } from "./../../utils/countNumOfTables";

// import "firebase/firestore";

//DB
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

//interfaces

import { ISitting } from "../models/ISitting";
import { GuestInfoComponent } from "./ChildComponents/GuestInfoComponent";
import { IFormInterface } from "../models/IFormInterface";
import { ISendEmail } from "../models/ISendEmail";
import { IBookingState } from "../models/IBookingState";

//Parent component
const BookingsComponent: FC = () => {
  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, error] = useCollectionData(bookingsCollectionRef, {
    idField: "id",
  });

  const [bookingAllowed, setBookingAllowed] = useState<boolean>(false);
  const bookingReference = randomstring.generate(18);
  const history = useHistory();

  const initialBookingState: IBookingState = {
    numberOfGuests: 0!,
    date: "",
    sitting: "",
    numberOfTables: 0!,
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    acceptedGDPR: false,
    bookingReference: bookingReference,
  };

  //Booking options saved in state
  const [bookingState, setBookingState] =
    useState<IBookingState>(initialBookingState);

  //controlling number of guests
  const [numberOfGuestsPicked, setNumberOfGuestsPicked] =
    useState<boolean>(false);
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
  const guestInfoRef = useRef(null);

  const updateSitting = (sitting: string) => {
    setBookingState((prevState) => {
      return { ...prevState, sitting: sitting };
    });
    setSittingPicked(true);
  };
  useEffect(() => {
    if (guestInfoRef.current) {
      (guestInfoRef.current! as HTMLElement).scrollIntoView();
    }
  }, [sittingPicked]);

  const [sittingAvailability, setSittingAvailability] = useState<ISitting>({
    sitting18: false,
    sitting21: false,
  });

  const updateUserInformation = (userInfomation: IFormInterface) => {
    setBookingState((prevState) => {
      return { ...prevState, ...userInfomation };
    });
    setBookingAllowed(true);
  };

  const sendEmail = () => {
    const emailSendOutCredentials: ISendEmail = {
      first_name: bookingState.firstName,
      last_name: bookingState.lastName,
      booked_date: bookingState.date,
      booked_time: bookingState.sitting,
      user_email: bookingState.email,
      booking_reference: bookingState.bookingReference,
    };
    const redirect = () => {
      history.push("/confirmation");
    };
    emailjs
      .send(
        "service_cmdfzwo",
        "template_32mibab",
        emailSendOutCredentials,
        "user_WFe2FaWw3TmyNA4ufQBU3"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.status, result.text);
          redirect();
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Your booking did not go trough, please try again later");
        }
      );
    // console.log('Email sent with these credentials', emailSendOutCredentials);
  };

  //triggered when the user info form is submitted
  useEffect(() => {
    //TODO: *Revise and fix validation, **make this an async function, ***empty state upon successful post request
    //check that all of bookingState's properties are truthies
    let isBookingPossible = Object.values(bookingState).every(Boolean);
    if (isBookingPossible) {
      bookingsCollectionRef.add(bookingState).then((res) => {
        console.log("Request sucessful: ", res);
        sendEmail();
      });
    }
  }, [bookingAllowed]);

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
          bookingInDB.sitting === "18:00"
            ? (numberOfBookedTables18 += bookingInDB.numberOfTables)
            : (numberOfBookedTables21 += bookingInDB.numberOfTables);
        }
      });
      setSittingAvailability({
        sitting18: numberOfBookedTables18 < 16,
        sitting21: numberOfBookedTables21 < 16,
      });
    }
  }, [datePicked]);

  useEffect(() => {
    console.log("State updated: ", bookingState);
  }, [bookingState]);

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
  );
};

export default BookingsComponent;
