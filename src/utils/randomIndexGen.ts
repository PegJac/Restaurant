/**
 *
 * @param maxIdx the length of the array we want to generate the random index of
 * @returns random index between 0 and the length of the array
 */

export const randomIndexGen = (maxIdx: number) => {
  return Math.floor(Math.random() * maxIdx);
};
