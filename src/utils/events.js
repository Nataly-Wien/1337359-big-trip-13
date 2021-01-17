import dayjs from 'dayjs';
import {offersInfo} from '../mock/mocks';

const DEFAULT_NEW_EVENT_TYPE = `Taxi`;

const getEmptyOffers = () => offersInfo[DEFAULT_NEW_EVENT_TYPE].map((item) => ({
  type: item.type,
  title: item.title,
  price: item.price,
  isChecked: false,
}));

export const emptyEvent = {
  type: DEFAULT_NEW_EVENT_TYPE,
  city: ``,
  price: 0,
  offers: getEmptyOffers(),
  description: ``,
  descriptionPhotos: [],
  startDateTime: dayjs().unix() * 1000,
  endDateTime: dayjs().unix() * 1000,
};

export const getTotalPrice = (events) =>
  events && events.length > 0 ? events.reduce((total, item) => total + parseInt(item.price, 10) +
    item.offers.reduce((sum, it) => sum + it.isChecked ? parseInt(it.price, 10) : 0, 0), 0) : ``;

export const getTripDates = (events) => {
  if (!events || events.length === 0) {
    return ``;
  }

  return {
    startDate: events[0].startDateTime,
    endDate: events[events.length - 1].endDateTime,
  };
};


export const getRoute = (events) => {
  if (!events || events.length === 0) {
    return ``;
  }

  const route = events.map((item) => item.city);

  if (route.length > 3) {
    return `${route[0]} &mdash; ... &mdash; ${route[route.length - 1]}`;
  }

  const shortRoute = Array.from(new Set(route));

  return shortRoute.map((item) => ` &mdash; ${item}`).join(``).slice(8);
};
