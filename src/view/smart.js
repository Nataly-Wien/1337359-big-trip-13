import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateEvent() {
    const oldElement = this.getElement();
    const parentElement = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parentElement.replaceChild(newElement, oldElement);
    this.restoreHandlers();
  }

  updateData(update) {
    if (!update) {
      return;
    }

    const updatedData = Object.assign({}, this._data, update);
    if (JSON.stringify(Object.entries(updatedData).sort()) === JSON.stringify(Object.entries(this._data).sort())) {
      return;
    }

    this._data = updatedData;
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}