/**
 *
 * @param numOfGuests number of guests in the reservation
 * @returns either 1 or 2, which represents the number of tables in the reservation
 */

export function countNumberOfTables(numOfGuests: number) {
  return numOfGuests <= 6 ? 1 : 2;
}
