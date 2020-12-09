import {createElement} from "../utils/render";

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
}
