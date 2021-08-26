import React from "react";

interface ISittingComponentInterface {
  updateSitting: (sittingTime: string) => void;
}

const SittingsComponents = (props: ISittingComponentInterface) => {
  return (
    <section className="bookings-page__sittings">
      <h2>Pick a sitting:</h2>
      <form
        onChange={(e) => props.updateSitting((e.target as HTMLInputElement).id)}
      >
        <div className="sittings__radio-container">
          <label htmlFor="18:00">
            <div className="sittings__radio-container__inner-container">
              <input type="radio" name="sitting" id="18:00" />
              <p>First Sitting</p>
            </div>
            <hr />
            <p>18-21</p>
          </label>
        </div>

        <div className="sittings__radio-container">
          <label htmlFor="21:00">
            <div className="sittings__radio-container__inner-container">
              <input type="radio" name="sitting" id="21:00" />
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
