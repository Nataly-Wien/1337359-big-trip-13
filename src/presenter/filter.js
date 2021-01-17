
import TripFiltersView from '../view/trip-filters';
import {renderElement, RenderPosition, remove} from '../utils/render';
import {Filters, UpdateType} from '../const';

export default class Filter {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._activeFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
  }

  init() {
    this._activeFilter = this._filterModel.getFilter();

    remove(this._filterComponent);
    this._filterComponent = new TripFiltersView(Filters, this._activeFilter);
    this._filterComponent.setFilterChangeHandler(this._handleFilterChange);
    renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
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
