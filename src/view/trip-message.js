import {createElement} from '../utils';

const createTripMessageTemplate = (message) => {
  return `<p class="trip-events__msg">${message}</p>`;
};

export class TripMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripMessageTemplate();
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
