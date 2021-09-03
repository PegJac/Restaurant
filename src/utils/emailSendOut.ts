import emailjs from "emailjs-com";
import { ISendEmail } from "../models/ISendEmail";
import { IBookingState } from "../models/IBookingState";
import { useHistory } from "react-router-dom";

export const sendEmail = (stateObject: IBookingState) => {
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
      "service_cmdfzwo",
      "template_32mibab",
      emailSendOutCredentials,
      "user_WFe2FaWw3TmyNA4ufQBU3"
    )
    .then(
      (result) => {
        console.log("SUCCESS!", result.status, result.text);
        alert("Thanks for your order, check your mail for more details");
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Your booking did not go trough, please try again later");
      }
    );
};
