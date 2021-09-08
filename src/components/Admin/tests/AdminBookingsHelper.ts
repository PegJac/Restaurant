const { mockFirebase } = require("firestore-jest-mock");

export const setUpMockDB = () => {
  const mockData = [
    {
      numberOfGuests: 3,
      numberOfTables: 1,
      firstName: "Danny",
      lastName: "Isaac",
      date: "2021-09-29",
      sitting: "18:00",
      bookingReference: "somerandomstring1",
    },
    {
      numberOfGuests: 4,
      numberOfTables: 1,
      firstName: "Danny",
      lastName: "Isaac",
      date: "2021-09-30",
      sitting: "18:00",
      bookingReference: "somerandomstring2",
    },
  ];

  mockFirebase({
    database: {
      bookings: mockData,
    },
  });
};
