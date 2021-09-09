import { DocumentData } from "@firebase/firestore-types";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";

interface ICheckAvailability {
  (
    firestoreSnapshop: Data<DocumentData, "", "">[],
    dateFromClientBooking: string
  ): [
    numberOfBookedTables18: number | null,
    numberOfBookedTables21: number | null,
    error: string | null
  ];
}

/**
 *
 * @param firestoreSnapshop  The database object that we can loop through and determain avilability
 * @param dateFromClientBooking The date that the user/admin wishes to make a reservation on
 * @returns number of booked tables for the 18:00 sittings + number of booked tables for the 21:00 sitting
 */

export const checkAvailability: ICheckAvailability = (
  firestoreSnapshop,
  dateFromClientBooking
) => {
  if (!dateFromClientBooking) {
    const errorMessage = "Please choose a date for your reservation";
    return [null, null, errorMessage];
  }
  let numberOfBookedTables18 = 0;
  let numberOfBookedTables21 = 0;

  firestoreSnapshop.forEach((bookingInDB: Data) => {
    if (dateFromClientBooking === bookingInDB.date) {
      bookingInDB.sitting === "18:00"
        ? (numberOfBookedTables18 += bookingInDB.numberOfTables)
        : (numberOfBookedTables21 += bookingInDB.numberOfTables);
    }
  });
  return [numberOfBookedTables18, numberOfBookedTables21, null];
};
