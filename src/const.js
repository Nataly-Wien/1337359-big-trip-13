export const EVENT_TYPES = {
  'Taxi': [`uber`],
  'Bus': [],
  'Train': [`luggage`, `seats`],
  'Ship': [`luggage`, `comfort`],
  'Transport': [],
  'Drive': [`car`],
  'Flight': [`luggage`, `meal`, `seats`, `comfort`, `train`],
  'Check-in': [`breakfast`, `bar`],
  'Sightseeing': [`tickets`, `lunch`],
  'Restaurant': [],
};

export const OFFERS = {
  luggage: `Add luggage`,
  comfort: `Switch to comfort class`,
  meal: `Add meal`,
  seats: `Choose seats`,
  train: `Travel by train`,
  uber: `Order Uber`,
  car: `Rent a car`,
  breakfast: `Add breakfast`,
  bar: `Restock bar`,
  tickets: `Book tickets`,
  lunch: `Lunch in city`,
  tour: `Take a tour`,
};

export const FILTERS = [
  `Everything`,
  `Future`,
  `Past`,
];

export const SORT_FIELDS = [
  `day`,
  `event`,
  `time`,
  `price`,
  `offers`,
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
