import {
  render,
  fireEvent,
  waitFor,
  screen,
  prettyDOM,
} from "@testing-library/react";
import BookingsComponent from "../BookingsComponent";
import CalanderComponent from "../ChildComponents/CalanderComponent";

import { logRoles } from "@testing-library/react";
import { randomIndexGen } from "../../../utils/randomIndexGen";

//helper functions
import { pickArrivalDay } from "./BookingsComponentHelpers";

const todaysDate = new Date().getDate();

//jest does not have the scrollIntoView function nativally, so I'm mocking it here with this line
//otherwise react testing library throws an error when we scroll into the next element in the screen
window.HTMLElement.prototype.scrollIntoView = jest.fn();

test("Bookings page renders correctly", () => {
  const { container } = render(<BookingsComponent />);
  const bookingsPage = container.querySelector(".bookings-page");
  expect(bookingsPage).toBeInTheDocument();
});

test("Calander component shows upon choosing the number of people", () => {
  const { container } = render(<BookingsComponent />);
  const buttons = container.querySelectorAll("button");
  const randomButton = buttons[randomIndexGen(buttons.length)];
  randomButton.click();

  const calanderContainer = container.querySelector(
    ".bookings-page__calander-container"
  );
  expect(calanderContainer).toBeInTheDocument();
});
