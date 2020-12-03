import {createElement} from '../utils';

const createTripMessageTemplate = (message) => {
  return `<p class="trip-events__msg">${message}</p>`;
};

export default class TripMessage {
  constructor(message) {
    this._message = message;
    this._element = null;
  }

  getTemplate() {
    return createTripMessageTemplate(this._message);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._element));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
