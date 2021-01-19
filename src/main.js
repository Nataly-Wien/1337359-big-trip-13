import {generateEvent} from './mock/mocks';
import {SORT_RULES, DEFAULT_SORT} from './const';
import {renderElement, RenderPosition} from './utils/render';
import TripMenuView from './view/trip-menu';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import TripInfoPresenter from './presenter/info';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';

const EVENT_COUNT = 5;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(SORT_RULES[DEFAULT_SORT]);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

renderElement(siteControls, new TripMenuView(), RenderPosition.AFTERBEGIN);

const tripInfoPresenter = new TripInfoPresenter(siteHeader, eventsModel);
tripInfoPresenter.init();

const filterPresenter = new FilterPresenter(siteControls, filterModel, eventsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(siteMain, eventsModel, filterModel);
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => tripPresenter.createNewEvent());
