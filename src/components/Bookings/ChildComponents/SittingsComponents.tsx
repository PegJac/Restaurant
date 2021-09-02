import React from 'react';
import { ISitting } from './../../../models/ISitting';
// import blob1 from "./../../../svgs/blob1.svg";
// import blob2 from "./../../../svgs/blob2.svg";

interface ISittingComponentInterface {
  updateSitting: (sittingTime: string) => void;
  availableTables: ISitting;
}

const SittingsComponents = (props: ISittingComponentInterface) => {
  return (
    <section className="bookings-page__sittings">
      <h2>Pick a sitting:</h2>

      <form
        onChange={(e) => props.updateSitting((e.target as HTMLInputElement).id)}
      >
        <div
          className={`sittings__radio-container ${
            props.availableTables.sitting18 ? '' : 'unClickable'
          }`}
        >
          <label htmlFor="18:00">
            <div className="sittings__radio-container__inner-container">
              <input
                type="radio"
                name="sitting"
                id="18:00"
                disabled={!props.availableTables.sitting18}
              />
              <p>First Sitting</p>
            </div>
            <hr />
            <p>18-21</p>
          </label>
        </div>

        <div
          className={`sittings__radio-container ${
            props.availableTables.sitting21 ? '' : 'unClickable'
          }`}
        >
          <label htmlFor="21:00">
            <div className="sittings__radio-container__inner-container">
              <input
                type="radio"
                name="sitting"
                id="21:00"
                disabled={!props.availableTables.sitting21}
              />
              <p>Second Sitting</p>
            </div>
            <hr />
            <p>21-00</p>
          </label>
        </div>
      </form>
    </section>
  );
};

export default SittingsComponents;
