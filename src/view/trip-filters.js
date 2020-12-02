import {FILTERS} from '../const';
import {createElement} from '../utils';

const currentFilter = `Everything`;

const createFilterTemplate = (current) => FILTERS.map((item) => `<div class="trip-filters__filter">
                <input id="filter-${item.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio"
                  name="trip-filter" value="${item.toLowerCase()}" ${item === current ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-${item.toLowerCase()}">${item}</label>
              </div>`).join(``);

const createTripFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
              ${createFilterTemplate(currentFilter)}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};

export default class TripFilters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripFiltersTemplate();
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
