import {MESSAGES} from '../const';
import {renderElement, RenderPosition, remove} from '../utils/render';
import {updateData} from '../utils/common';
import TripSortView from '../view/trip-sort';
import TripContainerView from '../view/trip-container';
import TripMessageView from '../view/trip-message';
import EventPresenter from '../presenter/event';

export default class Trip {
  constructor(siteEventsControlsContainer) {
    this._eventsControlsContainer = siteEventsControlsContainer;
    this._sortComponent = new TripSortView();
    this._tripContainerComponent = new TripContainerView();
    this._messageComponent = null;
    this._eventsContainer = null;
    this._eventsPresenter = new Map();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._closeOpenEdit = this._closeOpenEdit.bind(this);
  }

  init(tripEvents) {
    this._events = tripEvents.slice();

    if (!this._events || this._events.length === 0) { // убрать !this._events ??
      this._renderMessage(MESSAGES.empty);
      return;
    }

    this._renderSort();
    this._renderTripContainer();
    this._renderEvents(this._events);
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
}
