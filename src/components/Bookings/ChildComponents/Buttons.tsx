import React, { ReactNode } from "react";
import styled from "styled-components";

const SingleButton = styled.button`
  border: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  font-size: 1.1rem;
`;

interface IButtons {
  setNumberOfGuests: (n: number) => void;
}

const Buttons = (props: IButtons) => {
  //TODO change type any
  const listOfButtons: JSX.Element[] = [];

  function addButtons(): void {
    for (let i = 0; i < 12; i++) {
      listOfButtons.push(
        <SingleButton key={i} onClick={() => props.setNumberOfGuests(i + 1)}>
          {i + 1}
        </SingleButton>
      );
    }
  }
  addButtons();
  return <div>{listOfButtons}</div>;
};

export default Buttons;
