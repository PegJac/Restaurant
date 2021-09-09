import { getTodaysDate } from "./getTodaysDate";

export const isDatePassed = (dateToCompare: string): boolean => {
  const todaysDate = new Date(getTodaysDate()).getTime();
  const datePickedByGuest = new Date(dateToCompare).getTime();
  if (todaysDate > datePickedByGuest) {
    return true;
  } else {
    return false;
  }
};
