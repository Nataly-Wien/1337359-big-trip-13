import {generateEvent} from './mock/mocks';
import {getTotalPrice} from './utils';
import {getTripDates} from './utils';
import {getRoute} from './utils';
import {createTripInfoTemplate} from './view/trip-info';
import {createTripMenuTemplate} from './view/trip-menu';
import {createTripFiltersTemplate} from './view/trip-filters';
import {createTripSortTemplate} from './view/trip-sort';
import {createTripContainerTemplate} from './view/trip-container';
import {createTripEventTemplate} from './view/trip-event';
import {createTripAddTemplate} from './view/trip-add';
import {createTripEditTemplate} from './view/trip-edit';

const EVENT_COUNT = 15;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const sortedEvents = events.slice(0).sort((a, b) => a.startDateTime - b.startDateTime);

render(siteHeader, createTripInfoTemplate(getTotalPrice(sortedEvents), getTripDates(sortedEvents), getRoute(sortedEvents)), `afterbegin`);
render(siteControls, createTripMenuTemplate(), `afterbegin`);
render(siteControls, createTripFiltersTemplate(), `beforeend`);
render(siteMain, createTripSortTemplate(), `beforeend`);
render(siteMain, createTripContainerTemplate(), `beforeend`);

const tripContainer = siteMain.querySelector(`.trip-events__list`);

render(tripContainer, createTripAddTemplate(sortedEvents[0]), `afterbegin`);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(tripContainer, createTripEventTemplate(sortedEvents[i]), `beforeend`);
}

render(tripContainer, createTripEditTemplate(sortedEvents[EVENT_COUNT - 1]), `beforeend`);
