import {generateEvent} from './mock/mocks';
import {renderElement, RenderPosition, getTotalPrice, getTripDates, getRoute} from './utils';
import TripInfoView from './view/trip-info';
import TripMenuView from './view/trip-menu';
import TripFiltersView from './view/trip-filters';
import TripSortView from './view/trip-sort';
import TripContainerView from './view/trip-container';
import TripEventView from './view/trip-event';
import TripEditView from './view/trip-edit';

const EVENT_COUNT = 15;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const sortedEvents = events.slice(0).sort((a, b) => a.startDateTime - b.startDateTime);

const showEvent = (container, event) => {
  const tripEvent = new TripEventView(event).getElement();
  const editEvent = new TripEditView(event).getElement();

  const onEditButtonClick = () => {
    container.replaceChild(editEvent, tripEvent);
  };

  const onSaveButtonClick = () => {
    container.replaceChild(tripEvent, editEvent);
  };

  const onRollupButtonClick = () => {
    container.replaceChild(tripEvent, editEvent);
  };

  tripEvent.querySelector(`.event__rollup-btn`).addEventListener(`click`, onEditButtonClick);
  editEvent.querySelector(`.event__save-btn`).addEventListener(`click`, onSaveButtonClick);
  editEvent.querySelector(`.event__rollup-btn`).addEventListener(`click`, onRollupButtonClick);

  renderElement(container, tripEvent, RenderPosition.BEFOREEND);
};

renderElement(siteHeader, new TripInfoView(getTotalPrice(sortedEvents), getTripDates(sortedEvents), getRoute(sortedEvents)).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControls, new TripMenuView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControls, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new TripSortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new TripContainerView().getElement(), RenderPosition.BEFOREEND);

const tripContainer = siteMain.querySelector(`.trip-events__list`);

sortedEvents.forEach((item) => showEvent(tripContainer, item));
