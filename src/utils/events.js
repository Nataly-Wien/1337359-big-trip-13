import dayjs from 'dayjs';

export const getTotalPrice = (events) =>
  events && events.length > 0 ? events.reduce((total, item) => total + parseInt(item.price, 10) +
    item.offers.reduce((sum, it) => sum + (it.isChecked ? parseInt(it.price, 10) : 0), 0), 0) : ``;

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

export const toUpperCaseFirst = (word) => word[0].toUpperCase() + word.slice(1);

export const adaptToClient = (event) => {
  const clientEvent = Object.assign({}, event, {
    price: event.base_price,
    isFavorite: event.is_favorite,
    type: toUpperCaseFirst(event.type),
    startDateTime: dayjs(event.date_from).unix() * 1000,
    endDateTime: dayjs(event.date_to).unix() * 1000,
    city: event.destination.name,
    description: event.destination.description,
    descriptionPhotos: event.destination.pictures.slice(),
    offers: event.offers.slice(),
  });

  delete clientEvent.base_price;
  delete clientEvent.is_favorite;
  delete clientEvent.date_from;
  delete clientEvent.date_to;
  delete clientEvent.destination;

  return clientEvent;
};

export const adaptToServer = (event) => {
  const serverEvent = Object.assign({}, event, {
    base_price: event.price, // eslint-disable-line camelcase
    is_favorite: event.isFavorite, // eslint-disable-line camelcase
    type: event.type.toLowerCase(),
    date_from: dayjs(event.startDateTime).format(), // eslint-disable-line camelcase
    date_to: dayjs(event.endDateTime).format(), // eslint-disable-line camelcase
    destination: Object.assign({}, {
      name: event.city,
      description: event.description,
      pictures: event.descriptionPhotos.slice(),
    }),
    offers: event.offers.slice(),
  });

  delete serverEvent.price;
  delete serverEvent.isFavorite;
  delete serverEvent.startDateTime;
  delete serverEvent.endDateTime;
  delete serverEvent.city;
  delete serverEvent.description;
  delete serverEvent.descriptionPhotos;

  return serverEvent;
};

export const destinationsToClient = (info, item) => {
  info[item.name] = {
    description: item.description,
    descriptionPhotos: item.pictures.slice(),
  };

  return info;
};

export const offersToClient = (info, item) => {
  info[toUpperCaseFirst(item.type)] = item.offers.slice();

  return info;
};
