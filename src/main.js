import {createTripInfoTemplate} from './view/trip-info';
import {createTripMenuTemplate} from './view/trip-menu';
import {createTripFiltersTemplate} from './view/trip-filters';
import {createTripSortTemplate} from './view/trip-sort';
import {createTripContainerTemplate} from './view/trip-container';
import {createTripPointTemplate} from './view/trip-point';
import {createTripAddTemplate} from './view/trip-add';
import {createTripEditTemplate} from './view/trip-edit';

const POINT_COUNT = 3;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeader, createTripInfoTemplate(), `afterbegin`);
render(siteControls, createTripMenuTemplate(), `afterbegin`);
render(siteControls, createTripFiltersTemplate(), `beforeend`);
render(siteMain, createTripSortTemplate(), `beforeend`);
render(siteMain, createTripContainerTemplate(), `beforeend`);

const tripContainer = siteMain.querySelector(`.trip-events__list`);

render(tripContainer, createTripAddTemplate(), `afterbegin`);

for (let i = 0; i < POINT_COUNT; i++) {
  render(tripContainer, createTripPointTemplate(), `beforeend`);
}

render(tripContainer, createTripEditTemplate(), `beforeend`);
