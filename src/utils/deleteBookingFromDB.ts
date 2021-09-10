import { db } from "./../firebase";
import { IBookingState } from "../models/IBookingState";
import { sendEmailCancellation } from "./emailSendOut";

/**
 * Simple function that takes an object and DELETEs it from the database, then sends an email comformation to the guest
 * @param bookingObj Booking object that will be sent as an argument to the sendEmailCancellation fn
 */

export const deleteBookingAndSendConfirmation = (bookingObj: IBookingState) => {
  db.collection("bookings").doc(bookingObj.id).delete();
  sendEmailCancellation(bookingObj);
};
