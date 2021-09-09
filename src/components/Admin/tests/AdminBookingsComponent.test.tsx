import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { setUpMockDB } from "./AdminBookingsHelper";

//components
import { AdminBookingsComponent } from "../AdminBookingsComponent";
import BookingCard from "./../BookingCard";

//models
import { IBookingState } from "../../../models/IBookingState";

const { mockCollection } = require("firestore-jest-mock/mocks/firestore");

test("Bookings component renders data on the screen", () => {
  const { container } = render(
    <BrowserRouter>
      <AdminBookingsComponent />{" "}
    </BrowserRouter>
  );
  const bookingsPage = container.querySelector(".admin-bookings-page");
  expect(bookingsPage).toBeInTheDocument();
});

test("Data is retrieved from firestore and displayed as cards", async () => {
  setUpMockDB();
  const firebase = require("firebase"); // or import firebase from 'firebase';
  const db = firebase.firestore();

  //send a get request to the mock DB
  return db
    .collection("bookings")
    .get()
    .then((res: IBookingState) => {
      //res here is the mock response object with mock data provided in the AdminBookingsHelper.ts file

      expect(mockCollection).toHaveBeenCalledWith("bookings");
      res.docs.map((mockResObject: IBookingState, i: number) => {
        return render(
          <BrowserRouter>
            <BookingCard bookingObj={mockResObject.data()} key={i} />
          </BrowserRouter>
        );
      });

      //the guest in my mock data is named Danny, so here we test that we find two cards with the name Danny
      const bookingCards = screen.getAllByText(/Danny/i);
      expect(bookingCards).toHaveLength(2);
    });
});
