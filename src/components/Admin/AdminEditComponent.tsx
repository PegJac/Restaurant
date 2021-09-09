import { DocumentData } from "@firebase/firestore-types";
import {
  TextField,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import {
  DocumentDataHook,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { Redirect, useParams } from "react-router";
import { db } from "../../firebase";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { updateComplexBookingObject } from "../../utils/updateComplexBookingObject";
import { isDatePassed } from "../../utils/isDatePassed";
import { checkAvailability } from "../../utils/checkAvailability";
import toast, { Toaster } from "react-hot-toast";
import { countNumberOfTables } from "../../utils/countNumOfTables";

export default function AdminEdit() {
  interface IParams {
    id: string;
  }

  const { id } = useParams<IParams>();

  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, loading, error] = useCollectionData(bookingsCollectionRef, {
    idField: "id",
  });
  const [isUpdateAllowed, setIsUpdateAllowed] = useState(false);

  //booking is the booking we want to edit
  const [booking, setBooking] = useState<DocumentData>();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    snapshot?.map((booking, i) => {
      if (booking.bookingReference === id) {
        return setBooking(booking);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot]);

  useEffect(() => {
    console.log("State updated: ", booking);
  }, [booking]);

  function handleChangeFirstName(e: ChangeEvent) {
    setBooking((prevState) => ({
      ...prevState,
      firstName: (e.target as HTMLInputElement).value,
    }));
  }

  function handleChangeLastName(e: ChangeEvent) {
    setBooking((prevState) => ({
      ...prevState,
      lastName: (e.target as HTMLInputElement).value,
    }));
  }

  function handleChangeEmail(e: ChangeEvent) {
    setBooking((prevState) => ({
      ...prevState,
      email: (e.target as HTMLInputElement).value,
    }));
  }

  function handleChangeNumber(e: ChangeEvent) {
    setBooking((prevState) => ({
      ...prevState,
      number: (e.target as HTMLInputElement).value,
    }));
  }

  function handleChangeDate(e: ChangeEvent) {
    const dateChosen = (e.target as HTMLInputElement).value;
    const datePassed: boolean = isDatePassed(dateChosen);
    if (datePassed) {
      return toast.error("Date you picked has already passed");
    }
    updateComplexBookingObject(setBooking, { date: dateChosen });
  }

  function handleChangeSitting(e: ChangeEvent) {
    const sittingPicked = (e.target as HTMLInputElement).value;
    updateComplexBookingObject(setBooking, { sitting: sittingPicked });
  }

  function handleChangeNumberOfGuests(
    e: ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) {
    const numberOfGuests = Number((e.target as HTMLInputElement).value);
    const numberOfTables = countNumberOfTables(numberOfGuests);

    updateComplexBookingObject(setBooking, { numberOfGuests, numberOfTables });
  }

  function handleSubmit() {
    if (booking) {
      const [sitting18, sitting21] = checkAvailability(snapshot!, booking.date);
      const errorMessage =
        "There aren't enough tables for the date and sitting you've chosen";
      const datePassed = isDatePassed(booking.date);
      if (datePassed) {
        return toast.error(
          "Please make sure the date you've chosen hasn't already passed"
        );
      }
      if (booking.sitting === "18:00") {
        if (booking.numberOfTables + sitting18 > 15) {
          return toast.error(errorMessage);
        }
        setIsUpdateAllowed(true);
      } else {
        if (booking.numberOfTables + sitting21 > 15) {
          return toast.error(errorMessage);
        }
        setIsUpdateAllowed(true);
      }
    }
  }

  useEffect(() => {
    const updatedBooking = { ...booking };
    delete updatedBooking.id;
    if (isUpdateAllowed) {
      db.collection("bookings").doc(booking?.id).update(updatedBooking);
      setRedirect(true);
    }
  }, [isUpdateAllowed]);

  if (redirect) {
    return <Redirect to={`/admin/booking/${id}`} />;
  }

  const selectOptions = (): ReactNode[] => {
    let options = [];
    for (let i = 0; i < 12; i++) {
      options.push(
        <MenuItem value={i + 1} key={i}>
          {i + 1}
        </MenuItem>
      );
    }
    return options;
  };

  return (
    <div>
      <Toaster />
      <h1>Edit</h1>
      {booking ? (
        <form>
          <TextField
            value={booking.date}
            type="date"
            variant="outlined"
            label="date"
            onChange={(e) => handleChangeDate(e)}
          />
          <RadioGroup
            aria-label="numberOfGuests"
            name="numberOfGuests"
            value={booking.sitting}
            onChange={(e) => handleChangeSitting(e)}
          >
            <FormControlLabel
              value="18:00"
              control={<Radio />}
              label="18:00"
              id="18:00"
            />
            <FormControlLabel value="21:00" control={<Radio />} label="21:00" />
          </RadioGroup>

          <br />
          <br />
          <InputLabel id="numberOfGuests">Number of guests</InputLabel>
          <Select
            labelId="numberOfGuests"
            id="numberOfGuests"
            label="Number of guests"
            value={booking.numberOfGuests}
            variant="outlined"
            onChange={(e) => handleChangeNumberOfGuests(e)}
          >
            {selectOptions()}
          </Select>
          <br />
          <br />
          <TextField
            value={booking.firstName}
            variant="outlined"
            label="firstName"
            name="firstName"
            onChange={handleChangeFirstName}
          />
          <TextField
            value={booking.lastName}
            variant="outlined"
            label="lastName"
            name="lastName"
            onChange={handleChangeLastName}
          />
          <TextField
            value={booking.email}
            variant="outlined"
            label="email"
            name="email"
            onChange={handleChangeEmail}
          />
          <TextField
            value={booking.number}
            variant="outlined"
            label="number"
            name="number"
            onChange={handleChangeNumber}
          />
          <button onClick={handleSubmit} type="button">
            Update
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
