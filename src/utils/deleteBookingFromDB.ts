import { db } from "./../firebase";
import { IBookingState } from "../models/IBookingState";
import { sendEmailCancellation } from "./emailSendOut";

export const deleteBookingAndSendConfirmation = (bookingObj: IBookingState) => {
  db.collection("bookings").doc(bookingObj.id).delete();
  sendEmailCancellation(bookingObj);
};
