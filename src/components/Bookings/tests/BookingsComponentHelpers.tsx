import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { randomIndexGen } from "../../../utils/randomIndexGen";
import BookingsComponent from "../BookingsComponent";
const todaysDate = new Date().getDate();

export const pickNumberOfPeople = () => {
  const { container } = render(<BookingsComponent />);
  //choose the number of guests so the calander component renders
  const buttons = container.querySelectorAll("button");
  const randomButton = buttons[randomIndexGen(buttons.length)];
  randomButton.click();
  
  const calanderComponent = screen.getByTestId("calander-component");

  expect(calanderComponent).toBeInTheDocument();
};

export const pickArrivalDay = () => {
  pickNumberOfPeople();
  const calanderComponent = screen.getByTestId("calander-component");

  const tomorowsRegex = new RegExp((todaysDate + 1).toString(), "i");
  const tomorowsCalanderDateBlock = screen.getAllByText(tomorowsRegex)[0];
  tomorowsCalanderDateBlock.click();
};
