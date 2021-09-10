/* eslint-disable react-hooks/exhaustive-deps */
import { DocumentData } from "@firebase/firestore-types";
import {
  TextField,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Button,
} from "@material-ui/core";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Redirect, useParams } from "react-router";
import { db } from "../../firebase";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { updateComplexBookingObject } from "../../utils/updateComplexBookingObject";
import { isDatePassed } from "../../utils/isDatePassed";
import { checkAvailability } from "../../utils/checkAvailability";
import toast, { Toaster } from "react-hot-toast";
import { countNumberOfTables } from "../../utils/countNumOfTables";
import Spinner from "../Bookings/ChildComponents/Spinner";

export default function AdminEdit() {
  interface IParams {
    id: string;
  }

  const { id } = useParams<IParams>();

  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, loading] = useCollectionData(bookingsCollectionRef, {
    idField: "id",
  });
  const [isUpdateAllowed, setIsUpdateAllowed] = useState(false);
  //booking is the booking we want to edit
  const [booking, setBooking] = useState<DocumentData>();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    snapshot?.map((booking, i) => {
      if (booking.bookingReference === id) {
        return setBooking(booking);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot]);

  //Handles the changes for all contact information input fields and the sittings radio buttons
  function handleChangeInputFields(e: ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    const formFieldObject = { [name]: value };
    updateComplexBookingObject(setBooking, formFieldObject);
  }

  //Handles changing the date, makes sure the date the Admin picks has not passed
  function handleChangeDate(e: ChangeEvent) {
    const dateChosen = (e.target as HTMLInputElement).value;
    const datePassed: boolean = isDatePassed(dateChosen);
    if (datePassed) {
      return toast.error("Date you've picked has already passed");
    }
    updateComplexBookingObject(setBooking, { date: dateChosen });
  }

  //Handles changing the number of guests
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

  //Handles form submition - Checks availability with the database and prevents
  //use from submitting the form if no tables are available
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
    return <Redirect to={`/admin/bookings`} />;
  }

  //adds 12 <MenuItem /> to the seclect tag
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
    <main className="edit-page">
      <Toaster />
      {booking && <h1>Edit booking #{booking.bookingReference}</h1>}
      {loading && <Spinner />}
      {booking && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className="edit-page__inner-form"
          >
            <TextField
              value={booking.firstName}
              variant="outlined"
              label="First Name"
              name="firstName"
              onChange={(e) => handleChangeInputFields(e)}
            />
            <TextField
              value={booking.lastName}
              variant="outlined"
              label="Last Name"
              name="lastName"
              onChange={(e) => handleChangeInputFields(e)}
            />
            <TextField
              value={booking.email}
              variant="outlined"
              label="Email Adress"
              name="email"
              onChange={(e) => handleChangeInputFields(e)}
            />
            <TextField
              value={booking.number}
              variant="outlined"
              label="Phone Number"
              name="number"
              onChange={(e) => handleChangeInputFields(e)}
            />
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className="edit-page__inner-form"
          >
            <TextField
              value={booking.date}
              type="date"
              variant="outlined"
              label="Date of Arrival"
              onChange={(e) => handleChangeDate(e)}
            />
            <RadioGroup
              aria-label="numberOfGuests"
              name="sitting"
              value={booking.sitting}
              onChange={(e) => handleChangeInputFields(e)}
            >
              <FormControlLabel
                value="18:00"
                control={<Radio />}
                label="18:00"
              />
              <FormControlLabel
                value="21:00"
                control={<Radio />}
                label="21:00"
              />
            </RadioGroup>

            <InputLabel id="numberOfGuests">Number of guests</InputLabel>
            <Select
              id="numberOfGuests"
              label="Number of guests"
              value={booking.numberOfGuests}
              variant="filled"
              onChange={(e) => handleChangeNumberOfGuests(e)}
            >
              {selectOptions()}
            </Select>
          </Grid>

          <Button type="submit" variant="outlined" className="submit-btn">
            Check availability and update
          </Button>
        </form>
      )}
    </main>
  );
}
