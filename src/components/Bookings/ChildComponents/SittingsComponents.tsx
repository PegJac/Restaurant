import React from "react";

interface ISittingComponentInterface {
  updateSitting: (sittingTime: string) => void;
}

const SittingsComponents = (props: ISittingComponentInterface) => {
  return (
    <div>
      <h1>Pick a sitting:</h1>
      <form
        onChange={(e) => props.updateSitting((e.target as HTMLInputElement).id)}
      >
        <div>
          <input type="radio" name="sitting" id="18:00" />
          <label htmlFor="18:00">
            <p>First Sitting</p>
            <p>18-21</p>
          </label>
        </div>

        <div>
          <input type="radio" name="sitting" id="21:00" />
          <label htmlFor="21:00">
            <p>First Sitting</p>
            <p>21-00</p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default SittingsComponents;
