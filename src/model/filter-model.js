import Observer from '../utils/observer';
import {DEFAULT_FILTER} from '../const';

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = DEFAULT_FILTER;
  }

  setFilter(filter, updateType) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
