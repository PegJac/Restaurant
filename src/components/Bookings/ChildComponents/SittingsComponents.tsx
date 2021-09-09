import { useRef } from "react";
import { ISitting } from "./../../../models/ISitting";
import styled from "styled-components";
import taken from "./../../../svgs/taken.svg";
interface ISittingComponentInterface {
  updateSitting?: (sittingTime: string) => void;
  availableTables: ISitting;
}

const SquareButton = styled.button`
  border: 0;
  min-width: 8rem;
  width: 20%;
  height: 10%;
  border-radius: 3px;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  background-color: #ffaf75;

  &:hover {
    filter: brightness(1.11);
    transform: scale(1.15);
  }
`;

const SittingsComponents = (props: ISittingComponentInterface) => {
  const sectionRef = useRef(null);
  const handleClick = (target: HTMLInputElement) => {
    //remove the class "selected" from all elements
    if (sectionRef.current) {
      const children: HTMLCollection = sectionRef.current!["children"];
      for (let i = 0; i < children.length; i++) {
        const thisElementsClasses = (children[i] as HTMLElement).classList;
        if (thisElementsClasses.contains("selected")) {
          thisElementsClasses.remove("selected");
        }
      }
    }

    //add it to only the clicked element
    target.classList.contains("selected")
      ? target.classList.remove("selected")
      : target.classList.add("selected");
    props.updateSitting!(target.id);
  };

  return (
    <section className="bookings-page__sittings">
      <h5>Pick from the following available sittings:</h5>

      <section className="bookings-page__sittings__inner" ref={sectionRef}>
        {props.availableTables.sitting18 && (
          <SquareButton
            id="18:00"
            onClick={(e) => handleClick(e.target as HTMLInputElement)}
          >
            18:00
          </SquareButton>
        )}
        {props.availableTables.sitting21 && (
          <SquareButton
            id="21:00"
            onClick={(e) => handleClick(e.target as HTMLInputElement)}
          >
            21:00
          </SquareButton>
        )}
        {!props.availableTables.sitting18 && !props.availableTables.sitting21 && (
          <div className="no-tables">
            <img src={taken} alt="Aliens taking all the availability" />
            <p>
              Opps, looks like there isn't any availability on the selected
              dates
            </p>
            <p>Please go back and select some other date 😄</p>
          </div>
        )}
      </section>
    </section>
  );
};

export default SittingsComponents;
