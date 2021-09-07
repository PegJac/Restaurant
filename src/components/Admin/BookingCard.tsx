import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { IBookingState } from "../../models/IBookingState";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import { randomIndexGen } from "../../utils/randomIndexGen";

interface IBookingCard {
  bookingObj: IBookingState;
}

export default function BookingCard({ bookingObj }: IBookingCard) {
  const foodEmojis = [
    "🍗",
    "🥩",
    "🥓",
    "🍔",
    "🍟",
    "🍕",
    "🌭",
    "🥪",
    "🌮",
    "🌯",
    "🥙",
    "🍩",
    "🧁",
    "🍹",
    "🍓",
    "🥑",
    "🥗",
  ];

  const {
    firstName,
    lastName,
    numberOfGuests,
    numberOfTables,
    date,
    sitting,
    bookingReference,
  } = bookingObj;

  const randomIdx: number = randomIndexGen(foodEmojis.length);

  return (
    <Card className="booking-card">
      <CardContent className="booking-card__content-container">
        <section className="booking-card__icon">
          {foodEmojis[randomIdx]}
        </section>
        <section className="booking-card__content">
          <div>
            <span className="bold">Guest: </span>
            {`${firstName} ${lastName}`}
          </div>
          <div>
            <span className="bold">Party Size: </span>
            {`${numberOfGuests} guests / ${numberOfTables} ${
              numberOfTables === 1 ? "table" : "tables"
            }`}
          </div>
          <div>
            <span className="bold">Arrival day: </span>
            {`${date} / ${sitting}`}
          </div>
        </section>
        <section className="booking-card__actions">
          <Divider light />
          <div>
            <div>
              <Link
                to={`/admin/booking/${bookingReference}`}
                className="booking-card__actions--edit"
              >
                <div className="edit-inner">
                  <Edit style={{ color: "#FF7B51" }} />
                  <p>Edit</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

BookingCard.defaultProps = {
  numberOfGuests: 3,
  numberOfTables: 1,
  firstName: "Danny",
  lastName: "Isaac",
  date: "2021-09-29",
  sitting: "18:00",
  bookingReference: "SOM4rVuijjAFHfewPe",
};
