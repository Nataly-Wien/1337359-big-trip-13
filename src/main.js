import {generateEvent} from './mock/mocks';
import TripPresenter from './presenter/trip';

const EVENT_COUNT = 15;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripPresenter = new TripPresenter(siteHeader, siteControls, siteMain);
tripPresenter.init(events);
