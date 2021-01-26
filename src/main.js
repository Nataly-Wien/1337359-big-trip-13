import {UpdateType, MenuItem} from './const';
import {remove, renderElement, RenderPosition} from './utils/render';
import TripMenuView from './view/trip-menu';
import StatisticsView from './view/statistics';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import TripInfoPresenter from './presenter/info';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';
import Api from './api';

const AUTHORIZATION = `Basic yFTA7RqaCfEOjB4ZwD`;
const ENDPOINT = `https://13.ecmascript.pages.academy/big-trip`;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteTrip = document.querySelector(`.trip-events`);
const siteMain = document.querySelector(`.page-trip__container`);

const api = new Api(ENDPOINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const menuComponent = new TripMenuView(MenuItem.TABLE);

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statsComponent);
      tripPresenter.init();

      newEventBtn.disabled = false;
      filterPresenter.restoreFilters();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();

      newEventBtn.disabled = true;
      filterPresenter.disableFilters();

      statsComponent = new StatisticsView(eventsModel.getEvents());
      renderElement(siteMain, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

menuComponent.setMenuClickHandler(handleMenuClick);

const tripInfoPresenter = new TripInfoPresenter(siteHeader, eventsModel);
tripInfoPresenter.init();

const filterPresenter = new FilterPresenter(siteControls, filterModel, eventsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(siteTrip, eventsModel, filterModel, api);
tripPresenter.init();

const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

let statsComponent = null;

api.getAllData()
  .then((events) => {
    eventsModel.setEvents(events, UpdateType.INIT_EVENTS);
  })
  .catch(() => {
    eventsModel.setEvents([], UpdateType.INIT_EVENTS);
  })
  .finally(() => {
    renderElement(siteControls, menuComponent, RenderPosition.AFTERBEGIN);
    newEventBtn.addEventListener(`click`, () => tripPresenter.createNewEvent());
  });
