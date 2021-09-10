/**
 * @returns today's date in year-month-day
 */

export const getTodaysDate = () => {
  const todaysDate = new Date();
  return `${todaysDate.getFullYear()}-${
    todaysDate.getMonth() + 1
  }-${todaysDate.getDate()}`;
};
