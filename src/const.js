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

export const MESSAGES = {
  empty: `Click New Event to create your first point`,
  loading: `Loading...`,
};

export const SORTS = {
  day: (a, b) => a.startDateTime - b.startDateTime,
  time: (a, b) => (a.endDateTime - a.startDateTime) - (b.endDateTime - b.startDateTime),
  price: (a, b) => a.price - b.price,
};

export const DEFAULT_SORT = `day`;

export const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
  ADDING: `ADDING`,
};
