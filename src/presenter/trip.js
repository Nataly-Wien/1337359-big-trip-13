import {MESSAGES} from '../const';
import {SORTS, DEFAULT_SORT} from '../const';
import {renderElement, RenderPosition} from '../utils/render';
import {updateData} from '../utils/common';
import TripSortView from '../view/trip-sort';
import TripContainerView from '../view/trip-container';
import TripMessageView from '../view/trip-message';
import EventPresenter from '../presenter/event';

export default class Trip {
  constructor(siteEventsControlsContainer) {
    this._eventsControlsContainer = siteEventsControlsContainer;
    this._sortComponent = null;
    this._currentSort = DEFAULT_SORT;
    this._tripContainerComponent = new TripContainerView();
    this._messageComponent = null;
    this._eventsContainer = null;
    this._eventsPresenter = new Map();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._closeOpenEdit = this._closeOpenEdit.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
  }

  init(tripEvents) {
    this._events = tripEvents.slice();

    if (!this._events || this._events.length === 0) { // убрать !this._events ??
      this._renderMessage(MESSAGES.empty);
      return;
    }

    this._sortComponent = new TripSortView(this._currentSort);
    this._sortComponent.setSortFieldClickHandler(this._handleSortClick);
    this._renderSort();

    this._renderTripContainer();
    this._renderEvents(this._events);
  }

  _renderSort() {
    renderElement(this._eventsControlsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripContainer() {
    renderElement(this._eventsControlsContainer, this._tripContainerComponent, RenderPosition.BEFOREEND);
    this._eventsContainer = this._eventsControlsContainer.querySelector(`.trip-events__list`);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _clearEvents() {
    this._eventsPresenter.forEach((presenter) => presenter.destroy());
    this._eventsPresenter.clear();
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsContainer, this._handleEventChange, this._closeOpenEdit);
    eventPresenter.init(event);
    this._eventsPresenter.set(event.id, eventPresenter);
  }

  _handleEventChange(updatedEvent) {
    this._events = updateData(this._events, updatedEvent);
    this._eventsPresenter.get(updatedEvent.id).update(updatedEvent);
  }

  _renderMessage(message) {
    this._messageComponent = new TripMessageView(message);
    renderElement(this._eventsControlsContainer, this._messageComponent, RenderPosition.BEFOREEND);
  }

  _closeOpenEdit() {
    this._eventsPresenter.forEach((presenter) => {
      presenter.resetView();
    });
  }

  _handleSortClick(sortType) {
    if (sortType === this._currentSort) {
      return;
    }

    this._currentSort = sortType;
    const sortedEvents = this._events.sort(SORTS[this._currentSort]);
    this._clearEvents();
    this._renderEvents(sortedEvents);
  }
}
