import dayjs from 'dayjs';

export const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

export const MESSAGES = {
  empty: `Click New Event to create your first point`,
  loading: `Loading...`,
};

export const Filters = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`,
};

export const FILTER_RULES = {
  [Filters.EVERYTHING]: (item) => item,
  [Filters.FUTURE]: (item) => item.startDateTime > dayjs().unix() * 1000,
  [Filters.PAST]: (item) => item.endDateTime < dayjs().unix() * 1000,
};

export const DEFAULT_FILTER = `Everything`;

export const SORT_FIELDS = [
  `day`,
  `event`,
  `time`,
  `price`,
  `offers`,
];

export const SORT_RULES = {
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

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`,
};

export const UpdateType = {
  REFRESH_ELEMENT: `REFRESH_ELEMENT`,
  REFRESH_LIST: `REFRESH_LIST`,
  REFRESH_ALL: `REFRESH_ALL`,
  INIT_EVENTS: `INIT_EVENTS`,
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export const MILLISECOND_PER_DAY = 1000 * 3600 * 24;

export const Url = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};
