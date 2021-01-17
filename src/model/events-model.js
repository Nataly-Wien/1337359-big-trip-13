import Observer from '../utils/observer';

export default class EventsModel extends Observer {
  constructor() {
    super();

    this._events = [];
  }

  setEvents(events) {
    this._events = events.slice();
  }

  getEvents() {
    return this._events;
  }

  addEvent(event, updateType) {
    this._events.unshift(event);
    this._notify(updateType, event);
  }

  modifyEvent(event, updateType) {
    const index = this._events.findIndex((item) => item.id === event.id);

    if (index === -1) {
      throw new Error(`Can't update non-existent event`);
    }

    this._events[index] = event;
    this._notify(updateType, event);
  }

  deleteEvent(event, updateType) {
    const index = this._events.findIndex((item) => item.id === event.id);

    if (index === -1) {
      throw new Error(`Can't delete non-existent event`);
    }

    this._events.splice(index, 1);
    this._notify(updateType, event);
  }
}
