import {createElement} from "../utils/render";

const ANIMATION_TIMEOUT = 600;

export default class Abstract {
  constructor() {
    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    if (new.target === Abstract) {
      throw new Error(`Cannot instantiate abstract class`);
    }
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  showError(callback) {
    this.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, ANIMATION_TIMEOUT);
  }
}
