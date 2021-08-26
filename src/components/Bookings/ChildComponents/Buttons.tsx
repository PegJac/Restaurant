import React, { ReactNode, useState } from "react";
import styled from "styled-components";

const SingleButton = styled.button`
  border: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  font-size: 1.8rem;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(0.8);
    transform: scale(1.15);
  }
`;

interface IButtons {
  setNumberOfGuests: (n: number) => void;
}

const Buttons = (props: IButtons) => {
  const listOfButtons: JSX.Element[] = [];

  const [currentlySelectedButton, setCurrentlySelectedButton] =
    useState<HTMLButtonElement>();

  function addButtons(): void {
    for (let i = 0; i < 12; i++) {
      listOfButtons.push(
        <SingleButton
          key={i}
          onClick={(e) => {
            const buttonClassList = (e.target as HTMLButtonElement).classList;
            if (!buttonClassList.contains("selected")) {
              buttonClassList.add("selected");
              // removeClassFromOldButton(e.target as HTMLButtonElement);
            } else {
              buttonClassList.remove("selected");
            }

            //update the parent state
            props.setNumberOfGuests(i + 1);

            //store the current index in child state
            // setCurrentlySelectedButton(e.target as HTMLButtonElement);
          }}
        >
          {i + 1}
        </SingleButton>
      );
    }
  }

  // function removeClassFromOldButton(element: HTMLButtonElement): void {
  //   element.classList.remove("selected");
  // }

  addButtons();
  return <div className="bookings-page__buttons">{listOfButtons}</div>;
};

export default Buttons;
