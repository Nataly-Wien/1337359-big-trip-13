export const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

export const OFFERS = {
  luggage: `Add luggage`,
  comfort: `Switch to comfort class`,
  meal: `Add meal`,
  seats: `Choose seats`,
  train: `Travel by train`,
};

export const FILTERS = [
  `Everything`,
  `Future`,
  `Past`,
];

export const SORT_FIELDS = [
  `Day`,
  `Event`,
  `Time`,
  `Price`,
  `Offers`,
];

export const MESSAGES = [
  `Click New Event to create your first point`,
  `Loading...`,
];

export const SORTS = {
  default: (a, b) => a.startDateTime - b.startDateTime,
  day: (a, b) => a.startDateTime - b.startDateTime,
  event: (a, b) => a.city - b.city,
  time: (a, b) => (a.endDateTime - a.startDateTime) - (b.endDateTime - b.startDateTime),
  price: (a, b) => a.price - b.price,
  // offers,
};
