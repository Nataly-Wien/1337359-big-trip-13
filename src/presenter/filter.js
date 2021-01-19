
import TripFiltersView from '../view/trip-filters';
import {renderElement, RenderPosition, remove} from '../utils/render';
import {Filters, FILTER_RULES, UpdateType} from '../const';

export default class Filter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._activeFilter = null;
    this._filterComponent = null;

    this._handleFilterModelEvent = this._handleFilterModelEvent.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleEventsModelEvent = this._handleEventsModelEvent.bind(this);

    this._filterModel.subscribe(this._handleFilterModelEvent);
    this._eventsModel.subscribe(this._handleEventsModelEvent);
  }

  init() {
    this._activeFilter = this._filterModel.getFilter();

    remove(this._filterComponent);
    this._filterComponent = new TripFiltersView(this._getFilters(), this._activeFilter);
    this._filterComponent.setFilterChangeHandler(this._handleFilterChange);
    renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _getFilters() {
    return Object.values(Filters).map((item) =>
      Object.assign({}, {filter: item, isDisabled: this._eventsModel.getEvents().filter(FILTER_RULES[item]).length === 0}));
  }

  _handleFilterModelEvent() {
    this.init();
  }

  _handleEventsModelEvent() {
    this.init();
  }

  _handleFilterChange(filter) {
    if (filter === this._activeFilter) {
      return;
    }

    this._activeFilter = filter;
    this._filterModel.setFilter(filter, UpdateType.REFRESH_ALL);
  }
}
