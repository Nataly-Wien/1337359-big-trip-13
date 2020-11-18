import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripMenuTemplate} from './view/trip-menu.js';
import {createTripFiltersTemplate} from './view/trip-filters.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createTripContainerTemplate} from './view/trip-container.js';
import {createTripPointTemplate} from './view/trip-point';
import {createTripPointOpenTemplate} from './view/trip-point-open';

const POINT_COUNT = 5;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeader, createTripInfoTemplate(), `afterbegin`);
render(siteControls, createTripMenuTemplate, `afterbegin`);
render(siteControls, createTripFiltersTemplate, `beforeend`);
render(siteMain, createTripSortTemplate, `beforeend`);
render(siteMain, createTripContainerTemplate, `beforeend`);

const tripContainer = siteMain.querySelector(`.trip-events__list`);

render(tripContainer, createTripPointOpenTemplate, `afterbegin`);

for (let i = 0; i < POINT_COUNT; i++) {
  render(tripContainer, createTripPointTemplate, `beforeend`);
}
