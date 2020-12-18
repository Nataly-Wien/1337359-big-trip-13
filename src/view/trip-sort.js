import {SORT_FIELDS} from '../const';
import AbstractTrip from './abstract';

const createSortTemplate = (current) => SORT_FIELDS.map((item) =>
  `<div class="trip-sort__item  trip-sort__item--${item}" data-sort-type="${item}">
  <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
  value="sort-${item}" ${item === current ? `checked` : ``}>
  <label class="trip-sort__btn" for="sort-${item}">${item}</label></div>`).join(``);

const createTripSortTemplate = (currentSort) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createSortTemplate(currentSort)}
          </form>`;
};

export default class TripSort extends AbstractTrip {
  constructor(currentSort) {
    super();
    this._currentSort = currentSort;
    this._sortFieldClickHandler = this._sortFieldClickHandler.bind(this);
  }

  getTemplate() {
    return createTripSortTemplate(this._currentSort);
  }

  _sortFieldClickHandler(evt) {
    evt.preventDefault();
    this._callback.sortFieldClick(evt.target.closest(`.trip-sort__item`).dataset.sortType);
  }

  setSortFieldClickHandler(callback) {
    this._callback.sortFieldClick = callback;
    this.getElement().addEventListener(`click`, this._sortFieldClickHandler);
  }
}
