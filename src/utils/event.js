import dayjs from 'dayjs';
import {OFFERS} from '../const';

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


export const getTotalPrice = (events) => events && events.length > 0 ? events.reduce((total, item) => total + item.price +
  item.offers.reduce((sum, it) => sum + it.isChecked ? it.price : 0, 0), 0) : ``;


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
