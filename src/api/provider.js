import {adaptToServer, adaptToClient} from '../utils/events';
import {isOnline} from '../utils/common';
import {WARNINGS} from '../const';

const getSyncedEvents = (events) => events.filter((item) => item.success).map((item) => item.payload.point);

const getStoreStructure = (events) => events.reduce((result, item) => Object.assign({}, result, {[item.id]: item}), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getAllData() {
    if (isOnline()) {
      return this._api.getAllData()
        .then((events) => {
          const points = getStoreStructure(events.map(adaptToServer));
          this._store.setItems(points);

          return events;
        });
    }

    return Promise.resolve(Object.values(this._store.getItems()).map(adaptToClient));
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const points = getStoreStructure(events.map(adaptToServer));
          this._store.setItems(points);

          return events;
        });
    }

    return Promise.resolve(Object.values(this._store.getItems()).map(adaptToClient));
  }

  addEvent(event) {
    if (isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          this._store.setItem(newEvent.id, adaptToServer(newEvent));

          return newEvent;
        });
    }

    return Promise.reject(new Error(WARNINGS.add));
  }

  updateEvent(event) {
    if (isOnline()) {
      return this._api.updateEvent(event)
        .then((updatedEvent) => {
          this._store.setItem(updatedEvent.id, adaptToServer(updatedEvent));

          return updatedEvent;
        });
    }

    this._store.setItem(event.id, adaptToServer(Object.assign({}, event)));

    return Promise.resolve(event);
  }

  deleteEvent(event) {
    if (isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._store.removeItem(event.id));
    }

    return Promise.reject(new Error(WARNINGS.delete));
  }

  sync() {
    if (isOnline()) {
      const storedEvents = Object.values(this._store.getItems());

      return this._api.sync(storedEvents).
        then((response) => {
          const events = getStoreStructure(Array.from(...getSyncedEvents(response.created), ...getSyncedEvents(response.updated)));
          this._store.setItems(events);
        });
    }

    return Promise.reject(new Error());
  }
}
