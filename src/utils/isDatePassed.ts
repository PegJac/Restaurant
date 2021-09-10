import { getTodaysDate } from "./getTodaysDate";

/**
 * Function to compare a date chosen by a user with today's date
 * @param dateToCompare date that we want to compare with today's date
 * @returns true if the date has passed, false if the date has not
 */

export const isDatePassed = (dateToCompare: string): boolean => {
  const todaysDate = new Date(getTodaysDate()).getTime();
  const datePickedByGuest = new Date(dateToCompare).getTime();
  if (todaysDate > datePickedByGuest) {
    return true;
  } else {
    return false;
  }
};
