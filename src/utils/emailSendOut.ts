import emailjs from "emailjs-com";
import { ISendEmail } from "../models/ISendEmail";
import { IBookingState } from "../models/IBookingState";

export const sendEmailConfirmation = (stateObject: IBookingState) => {
  // takes the variabels from emailJs and giives them the value of the form of the user.
  const emailSendOutCredentials: ISendEmail = {
    first_name: stateObject.firstName!,
    last_name: stateObject.lastName!,
    booked_date: stateObject.date!,
    booked_time: stateObject.sitting!,
    user_email: stateObject.email!,
    booking_reference: stateObject.bookingReference!,
  };
  // This is where the email action happens, a replica of their code on the ddocumentation with our variables
  emailjs
    .send(
      "service_z6xxeoc",
      "template_32mibab",
      emailSendOutCredentials,
      "user_WFe2FaWw3TmyNA4ufQBU3"
    )
    .then(
      (result) => {
        console.log("SUCCESS!", result.status, result.text);
      },
      (error) => {
        console.log("FAILED...", error.status, error.text);
        alert("Something went wrong with the email sendout");
      }
    );
};
export const sendEmailCancellation = (dataObject: IBookingState) => {
  // takes the variabels from emailJs and giives them the value of the form of the user.
  const emailSendOutCredentials: ISendEmail = {
    first_name: dataObject.firstName!,
    last_name: dataObject.lastName!,
    booked_date: dataObject.date!,
    booked_time: dataObject.sitting!,
    user_email: dataObject.email!,
    booking_reference: dataObject.bookingReference!,
  };
  // This is where the email action happens, a replica of their code on the ddocumentation with our variables
  emailjs
    .send(
      "service_z6xxeoc",
      "template_h8rs4n5",
      emailSendOutCredentials,
      "user_WFe2FaWw3TmyNA4ufQBU3"
    )
    .then(
      (result) => {
        console.log("SUCCESS!", result.status, result.text);
      },
      (error) => {
        console.log("FAILED...", error.status, error.text);
        alert("Something went wrong with the email sendout");
      }
    );
};
