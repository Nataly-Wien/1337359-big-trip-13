import AbstractTrip from './abstract';

const createFilterTemplate = (filters, current) => filters.map((item) => `<div class="trip-filters__filter">
                <input id="filter-${item.filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio"
                  name="trip-filter" value="${item.filter.toLowerCase()}" ${item.filter === current ? `checked` : ``}
                  ${item.isDisabled ? `disabled` : ``}>
                <label class="trip-filters__filter-label" for="filter-${item.filter.toLowerCase()}">${item.filter}</label>
              </div>`).join(``);

const createTripFiltersTemplate = (filters, activeFilter) => {
  return `<form class="trip-filters" action="#" method="get">
              ${createFilterTemplate(filters, activeFilter)}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};

export default class TripFilters extends AbstractTrip {
  constructor(filters, activeFilter) {
    super();
    this._filters = filters;
    this._activeFilter = activeFilter;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripFiltersTemplate(this._filters, this._activeFilter);
  }

  _filterChangeHandler(evt) {
    const filter = evt.target.value;
    this._callback._filterChange(filter[0].toUpperCase() + filter.slice(1));
  }

  setFilterChangeHandler(callback) {
    this._callback._filterChange = callback;
    this.getElement().addEventListener(`change`, this._filterChangeHandler);
  }
}
