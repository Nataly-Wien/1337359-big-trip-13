import {generateEvent} from './mock/mocks';
import {MESSAGES} from './const';
import {renderElement, RenderPosition, replaceElement} from './utils/render';
import TripInfoView from './view/trip-info';
import TripMenuView from './view/trip-menu';
import TripFiltersView from './view/trip-filters';
import TripSortView from './view/trip-sort';
import TripContainerView from './view/trip-container';
import TripEventView from './view/trip-event';
import TripEditView from './view/trip-edit';
import TripMessageView from './view/trip-message';

const EVENT_COUNT = 15;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const sortedEvents = events.slice(0).sort((a, b) => a.startDateTime - b.startDateTime);

const showEvent = (container, event) => {
  const tripEvent = new TripEventView(event);
  const editEvent = new TripEditView(event);

  const onDocumentKeydown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceElement(tripEvent, editEvent);
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };

  const onEditButtonClick = () => {
    replaceElement(editEvent, tripEvent);
    document.addEventListener(`keydown`, onDocumentKeydown);
  };

  const onSaveButtonClick = () => {
    replaceElement(tripEvent, editEvent);
    document.removeEventListener(`keydown`, onDocumentKeydown);
  };

  const onCancelButtonClick = () => {
    replaceElement(tripEvent, editEvent);
    document.removeEventListener(`keydown`, onDocumentKeydown);
  };

  tripEvent.setEditBtnClickHandler(onEditButtonClick);
  editEvent.setSaveBtnClickHandler(onSaveButtonClick);
  editEvent.setCancelBtnClickHandler(onCancelButtonClick);

  renderElement(container, tripEvent.getElement(), RenderPosition.BEFOREEND);
};

if (!sortedEvents || sortedEvents.length === 0) {
  renderElement(siteControls, new TripMenuView().getElement(), RenderPosition.AFTERBEGIN);
  renderElement(siteControls, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMain, new TripMessageView(MESSAGES[0]).getElement(), RenderPosition.BEFOREEND);
} else {
  renderElement(siteHeader, new TripInfoView(sortedEvents).getElement(), RenderPosition.AFTERBEGIN);
  renderElement(siteControls, new TripMenuView().getElement(), RenderPosition.AFTERBEGIN);
  renderElement(siteControls, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMain, new TripSortView().getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMain, new TripContainerView().getElement(), RenderPosition.BEFOREEND);

  const tripContainer = siteMain.querySelector(`.trip-events__list`);
  sortedEvents.forEach((item) => showEvent(tripContainer, item));
}
