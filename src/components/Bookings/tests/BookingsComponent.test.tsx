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
import SittingsComponents from "../ChildComponents/SittingsComponents";

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

test("Sittings component renders with two sittings when theres avaiability", () => {
  const mockAvailability = { sitting18: true, sitting21: true };
  render(<SittingsComponents availableTables={mockAvailability} />);
  const sittingsButtons = screen.getAllByRole("button");
  expect(sittingsButtons.length).toEqual(2);
});

test("User can only reserve the available sitting", () => {
  const mockAvailability = { sitting18: true, sitting21: false };
  render(<SittingsComponents availableTables={mockAvailability} />);

  //assert that the user should not be able to book the 21:00 sitting
  const sittingsButtons = screen.getAllByRole("button");
  expect(sittingsButtons).toHaveLength(1);
  expect(sittingsButtons[0].id).toEqual("18:00");
});

test("User cannot choose sittings when there is no availability", () => {
  const mockAvailability = { sitting18: false, sitting21: false };
  render(<SittingsComponents availableTables={mockAvailability} />);
  const sittingsButtons = screen.queryAllByRole("button");
  expect(sittingsButtons).toEqual([]);
});

