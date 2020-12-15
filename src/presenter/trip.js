import {MESSAGES, SORTS} from '../const';
import {renderElement, RenderPosition, remove} from '../utils/render';
import {updateData} from '../utils/common';
import TripInfoView from '../view/trip-info';
import TripMenuView from '../view/trip-menu';
import TripFiltersView from '../view/trip-filters';
import TripSortView from '../view/trip-sort';
import TripContainerView from '../view/trip-container';
import TripMessageView from '../view/trip-message';
import EventPresenter from '../presenter/event';

export default class Trip {
  constructor(siteInfoContainer, siteControlsContainer, siteEventsControlsContainer) {
    this._infoContainer = siteInfoContainer;
    this._controlsContainer = siteControlsContainer;
    this._eventsControlsContainer = siteEventsControlsContainer;
    this._infoComponent = null;
    this._menuComponent = new TripMenuView();
    this._filtersComponent = new TripFiltersView();
    this._sortComponent = new TripSortView();
    this._tripContainerComponent = new TripContainerView();
    this._messageComponent = null;
    this._eventsContainer = null;
    this._eventsPresenter = new Map();

    this._handleEventChange = this._handleEventChange.bind(this);
  }

  init(tripEvents) {
    this._events = tripEvents.slice(0).sort(SORTS.default);
    // this._events = [];

    this._renderMenu();
    this._renderFilters();

    if (!this._events || this._events.length === 0) { // убрать !this._events ??
      this._messageComponent = new TripMessageView(MESSAGES[0]);
      this._renderMessage();
    } else {
      this._infoComponent = new TripInfoView(this._events);
      this._renderInfo();
      this._renderSort();
      this._renderTripContainer();

      this._renderEvents(this._events);
    }
  }

  _renderInfo() {
    renderElement(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMenu() {
    renderElement(this._controlsContainer, this._menuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    renderElement(this._controlsContainer, this._filtersComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._eventsControlsContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderTripContainer() {
    renderElement(this._eventsControlsContainer, this._tripContainerComponent, RenderPosition.BEFOREEND);
    this._eventsContainer = this._eventsControlsContainer.querySelector(`.trip-events__list`);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _clearEvents() {
    this._eventsPresenter.values().forEach((presenter) => presenter.destroy());
    this._eventsPresenter.clear();

    remove(this._menuComponent);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._tripContainerComponent, this._handleEventChange);
    eventPresenter.init(event);
    this._eventsPresenter.set(event.id, eventPresenter);
  }

  _handleEventChange(updatedEvent) {
    this._events = updateData(this._events, updatedEvent);
    this._eventsPresenter.get(updatedEvent.id).update(updatedEvent);
  }

  _renderMessage() {
    renderElement(this._eventsControlsContainer, this._messageComponent, RenderPosition.BEFOREEND);
  }
}
