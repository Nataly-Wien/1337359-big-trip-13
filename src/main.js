import {generateEvent} from './mock/mocks';
import {SORTS, DEFAULT_SORT} from './const';
import {renderElement, RenderPosition} from './utils/render';
import TripInfoView from './view/trip-info';
import TripMenuView from './view/trip-menu';
import TripFiltersView from './view/trip-filters';
import TripPresenter from './presenter/trip';

const EVENT_COUNT = 15;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(SORTS[DEFAULT_SORT]); //???

renderElement(siteHeader, new TripInfoView(events), RenderPosition.AFTERBEGIN);
renderElement(siteControls, new TripMenuView(), RenderPosition.AFTERBEGIN);
renderElement(siteControls, new TripFiltersView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(siteMain);
tripPresenter.init(events);
