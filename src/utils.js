import dayjs from 'dayjs';
import {OFFERS} from './const';
import {EVENT_TYPES} from './const';

const getEmptyOffers = () => Object.entries(OFFERS).map((item) => ({
  type: item[0],
  title: item[1],
  price: ``,
  isChecked: ``,
}));

export const emptyEvent = {
  type: `Taxi`,
  city: ``,
  price: ``,
  offers: getEmptyOffers(),
  description: ``,
  descriptionPhotos: [],
  startDateTime: dayjs().unix() * 1000,
  endDateTime: dayjs().unix() * 1000,
};

export const createEventTypeTemplate = (type) => EVENT_TYPES.reduce((string, item) =>
  string +
  `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${item === type ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
  </div>`, ``);

export const createOffersTemplate = (offers) => offers.reduce((string, item) => string +
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.type.toLowerCase()}-1" type="checkbox" name="event-offer-${item.type.toLowerCase()}" ${item.isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${item.type.toLowerCase()}-1">
      <span class="event__offer-title">Add ${item.type.toLowerCase()}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
  </div>`, ``);

export const getTotalPrice = (events) => events.reduce((total, item) => total + item.price +
  item.offers.reduce((sum, it) => sum + it.isChecked ? it.price : 0, 0), 0);

export const getTripDates = (events) => {
  return {
    startDate: events[0].startDateTime,
    endDate: events[events.length - 1].endDateTime,
  };
};

export const getRoute = (events) => {
  const route = events.map((it) => it.city);

  if (route.length > 3) {
    return `${route[0]} &mdash; ... &mdash; ${route[route.length - 1]}`;
  }

  const shortRoute = Array.from(new Set(route));

  return shortRoute.reduce((string, it) => string + ` &mdash; ${it}`, ``).slice(8);
};
