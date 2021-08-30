export function countNumberOfTables(numOfGuests: number) {
  return numOfGuests <= 6 ? 1 : 2;
}
