import {adaptToClient, adaptToServer, destinationsToClient, offersToClient} from '../utils/events';
import Storage from '../storage';

const MetHod = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export const Url = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
  SYNC: `sync`,
};

export default class Api {
  constructor(endpoint, authorization) {
    this._endpoint = endpoint;
    this._authorization = authorization;
  }

  getAllData() {
    return Promise.all([
      this.getEvents(),
      this._getOffersInfo(),
      this._getDestinationsInfo(),
    ]).then(([events, offers, destinations]) => {
      Storage.setOffers(offers);
      Storage.setDestinations(destinations);
      return events;
    });
  }

  getEvents() {
    return this._load({url: Url.POINTS})
      .then(Api.toJSON)
      .then((events) => events.map(adaptToClient));
  }

  updateEvent(event) {
    return this._load({
      url: `${Url.POINTS}/${event.id}`,
      method: MetHod.PUT,
      body: JSON.stringify(adaptToServer(event)),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then(Api.toJSON)
      .then(adaptToClient);
  }

  addEvent(event) {
    return this._load({
      url: Url.POINTS,
      method: MetHod.POST,
      body: JSON.stringify(adaptToServer(event)),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then(Api.toJSON)
      .then(adaptToClient);
  }

  deleteEvent(event) {
    return this._load({
      url: `${Url.POINTS}/${event.id}`,
      method: MetHod.DELETE,
    });
  }

  sync(events) {
    return this._load({
      url: `${Url.POINTS}/${Url.SYNC}`,
      method: MetHod.POST,
      body: JSON.stringify(events),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then(Api.toJSON);
  }

  _getDestinationsInfo() {
    return this._load({url: Url.DESTINATIONS})
      .then(Api.toJSON)
      .then((destinations) => destinations.reduce(destinationsToClient, {}));
  }

  _getOffersInfo() {
    return this._load({url: Url.OFFERS})
      .then(Api.toJSON)
      .then((offers) => offers.reduce(offersToClient, {}));
  }

  _load({url, method = MetHod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endpoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(error) {
    throw error;
  }

  static toJSON(response) {
    return response.json();
  }
}
