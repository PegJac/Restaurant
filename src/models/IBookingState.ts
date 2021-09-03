export interface IBookingState {
  numberOfGuests?: number | null;
  date?: string | null;
  sitting?: string | null;
  numberOfTables?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  number?: string | null;
  acceptedGDPR?: boolean | null;
  bookingReference?: string | null;
}

export const initialBookingState: IBookingState = {
  numberOfGuests: null,
  date: null,
  sitting: null,
  numberOfTables: null,
  firstName: null,
  lastName: null,
  email: null,
  number: null,
  acceptedGDPR: null,
  bookingReference: null,
};
