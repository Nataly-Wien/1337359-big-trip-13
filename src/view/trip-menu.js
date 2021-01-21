import {MenuItem} from '../const';
import SmartView from './smart';

const createMenuTemplate = (active) => Object.values(MenuItem).map((item) =>
  `<a class="trip-tabs__btn${item === active ? ` trip-tabs__btn--active` : ``}" href="#">${item}</a>`).join(``);

const createTripMenuTemplate = (activeItem) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
          ${createMenuTemplate(activeItem)}
          </nav>`;
};

export default class TripMenu extends SmartView {
  constructor(ActiveItem) {
    super();
    this._activeItem = ActiveItem;

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  updateData(activeItem) {
    this._activeItem = activeItem;
  }

  restoreHandlers() {
    this.setMenuClickHandler(this._callback.menuClick);
  }

  getTemplate() {
    return createTripMenuTemplate(this._activeItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    if (evt.target.textContent === this._activeItem) {
      return;
    }

    this.updateData(evt.target.textContent);
    this.updateElement();
    this._callback.menuClick(evt.target.textContent);
  }
}
