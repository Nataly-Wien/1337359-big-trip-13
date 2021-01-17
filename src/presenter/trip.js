import {MESSAGES, SORT_RULES, DEFAULT_SORT, FILTER_RULES, Filters, UserAction, UpdateType} from '../const';
import {renderElement, RenderPosition, remove} from '../utils/render';
import {emptyEvent} from '../utils/events';
import TripInfoView from '../view/trip-info';
import TripSortView from '../view/trip-sort';
import TripContainerView from '../view/trip-container';
import TripMessageView from '../view/trip-message';
import EventPresenter from '../presenter/event';
import NewEventPresenter from '../presenter/new-event';
import FilterPresenter from '../presenter/filter';

export default class Trip {
  constructor(siteEventsControlsContainer, siteInfoContainer, siteControlsContainer, newEventBtn, eventsModel, filterModel) {
    this._eventsControlsContainer = siteEventsControlsContainer;
    this._siteInfoContainer = siteInfoContainer;
    this._siteControlsContainer = siteControlsContainer;
    this._newEventBtn = newEventBtn;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._infoComponent = null;
    this._sortComponent = null;
    this._currentSort = DEFAULT_SORT;
    this._activeFilter = this._filterModel.getFilter();
    this._tripContainerComponent = new TripContainerView();
    this._messageComponent = null;
    this._eventsContainer = null;
    this._eventsPresenter = new Map();
    this._newEventPresenter = null;
    this._filterPresenter = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._closeOpenEdit = this._closeOpenEdit.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
    this._handleFilterModelEvent = this._handleFilterModelEvent.bind(this);
  }

  init() {
    this._renderTripContainer();

    this._filterPresenter = new FilterPresenter(this._siteControlsContainer, this._filterModel);
    this._filterPresenter.init();

    this._eventsModel.subscribe(this._handleModelEvent);

    this._filterModel.subscribe(this._handleFilterModelEvent);
    this._filterModel.subscribe(this._handleModelEvent);

    this._renderTrip();
  }

  createNewEvent() {
    this._currentSort = DEFAULT_SORT;
    this._filterModel.setFilter(Filters.EVERYTHING, UpdateType.REFRESH_ALL_WITH_FILTERS);

    this._newEventPresenter = new NewEventPresenter(this._eventsContainer, this._handleViewAction, this._newEventBtn);
    this._newEventPresenter.init(emptyEvent);

    this._newEventBtn.disabled = true;
  }

  _renderInfo() {
    remove(this._infoComponent);

    this._infoComponent = new TripInfoView(this._eventsModel.getEvents().slice().sort(SORT_RULES[DEFAULT_SORT]));
    renderElement(this._siteInfoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    remove(this._sortComponent);

    this._sortComponent = new TripSortView(this._currentSort);
    this._sortComponent.setSortFieldClickHandler(this._handleSortClick);
    renderElement(this._eventsControlsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripContainer() {
    renderElement(this._eventsControlsContainer, this._tripContainerComponent, RenderPosition.BEFOREEND);
    this._eventsContainer = this._eventsControlsContainer.querySelector(`.trip-events__list`);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsContainer, this._handleViewAction, this._closeOpenEdit);
    eventPresenter.init(event);
    this._eventsPresenter.set(event.id, eventPresenter);
  }

  _renderMessage(message) {
    this._messageComponent = new TripMessageView(message);
    renderElement(this._eventsControlsContainer, this._messageComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderMessage(MESSAGES.empty);
      return;
    }

    this._renderInfo();
    this._renderSort();
    this._renderEvents(this._getEvents());
  }

  _clearEvents() {
    this._eventsPresenter.forEach((presenter) => presenter.destroy());
    this._eventsPresenter.clear();
  }

  _clearTrip({resetFilters = false, resetSort = false} = {}) {
    if (resetSort) {
      this._currentSort = DEFAULT_SORT;
    }

    if (this._newEventPresenter !== null) {
      this._newEventPresenter.destroy();
    }

    remove(this._sortComponent);
    remove(this._infoComponent);
    remove(this._messageComponent);
    this._clearEvents();

    if (resetFilters) {
      this._filterPresenter.init();
    }
  }

  _closeOpenEdit() {
    if (this._newEventPresenter !== null) {
      this._newEventPresenter.destroy();
    }

    this._eventsPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  }

  _getEvents() {
    return this._eventsModel.getEvents()
      .slice()
      .filter(FILTER_RULES[this._activeFilter])
      .sort(SORT_RULES[this._currentSort]);
  }

  _handleFilterModelEvent(updateType, filter) {
    this._activeFilter = filter;
    this._currentSort = DEFAULT_SORT;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(update, updateType);
        break;
      case UserAction.UPDATE_EVENT:
        this._eventsModel.modifyEvent(update, updateType);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(update, updateType);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.REFRESH_ELEMENT:
        this._eventsPresenter.get(data.id).refresh(data);
        break;
      case UpdateType.REFRESH_LIST:
        this._clearEvents();
        this._renderEvents(this._getEvents());
        break;
      case UpdateType.REFRESH_ALL:
        this._clearTrip({resetSort: true});
        this._renderTrip();
        break;
      case UpdateType.REFRESH_ALL_WITH_FILTERS:
        this._clearTrip({resetFilters: true, resetSort: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortClick(sortType) {
    if (sortType === this._currentSort) {
      return;
    }

    this._currentSort = sortType;
    this._clearEvents();
    this._renderEvents(this._getEvents());
  }
}
