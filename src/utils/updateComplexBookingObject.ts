import { IBookingState } from '../models/IBookingState';

/**
 *
 * @param stateSetterFn : state setter function
 * @param newProp : the object property we want to update, can also be an object with multiple properties
 */

export const updateComplexBookingObject = (
  stateSetterFn: React.Dispatch<React.SetStateAction<IBookingState>>,
  newProp: IBookingState
) => {
  stateSetterFn((prevState) => {
    return {
      ...prevState,
      ...newProp,
    };
  });
};