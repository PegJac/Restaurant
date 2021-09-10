import { useState } from "react";
import styled from "styled-components";
import { useTrail, animated } from "react-spring";

const config = { mass: 1, tension: 180, friction: 12 };

export const SingleButton = styled.button`
  border: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  background-color: #ffaf75;
  cursor: pointer;

  &:hover {
    filter: brightness(1.11);
    transform: scale(1.15);
  }
`;

interface IButtons {
  setNumberOfGuests: (n: number) => void;
}

const Buttons = (props: IButtons) => {
  const listOfButtons: JSX.Element[] = [];
  const [lastPickedNumber, setLastPickedNumber] = useState<number>();

  function addButtons(): void {
    for (let i = 0; i < 12; i++) {
      const numberPickedByGuest = i + 1;
      listOfButtons.push(
        <SingleButton
          key={i}
          className={lastPickedNumber === numberPickedByGuest ? "selected" : ""}
          onClick={(e) => {
            const chosenNumber = i + 1;
            setLastPickedNumber(chosenNumber);

            //update the parent state
            props.setNumberOfGuests(i + 1);
          }}
        >
          {i + 1}
        </SingleButton>
      );
    }
  }

  addButtons();

  const trail = useTrail(listOfButtons.length, {
    config,
    from: { opacity: 0, y: -4 },
    to: { opacity: 1, y: 0 },
  });

  return (
    <div className="bookings-page__buttons">
      {trail.map((styles, i) => {
        return (
          <animated.div style={styles} key={i}>
            {listOfButtons[i]}
          </animated.div>
        );
      })}
    </div>
  );
};

export default Buttons;
