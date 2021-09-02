export interface IBookingState {
  numberOfGuests: number | null;
  date: string | null;
  sitting: string | null;
  numberOfTables: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  number: string | null;
  acceptedGDPR: boolean;
  bookingReference: string | null;
}
