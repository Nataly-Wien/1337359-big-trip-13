import {generateEvent} from './mock/mocks';
import {SORT_RULES, DEFAULT_SORT} from './const';
import {renderElement, RenderPosition} from './utils/render';
import TripMenuView from './view/trip-menu';
import TripPresenter from './presenter/trip';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';

const EVENT_COUNT = 15;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteMain = document.querySelector(`.trip-events`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(SORT_RULES[DEFAULT_SORT]);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

renderElement(siteControls, new TripMenuView(), RenderPosition.AFTERBEGIN);

const tripPresenter = new TripPresenter(siteMain, siteHeader, siteControls, newEventBtn, eventsModel, filterModel);
tripPresenter.init();

newEventBtn.addEventListener(`click`, () => tripPresenter.createNewEvent());
