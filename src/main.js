import {generateEvent} from './mock/mocks';
import {SORT_RULES, DEFAULT_SORT, MenuItem} from './const';
import {remove, renderElement, RenderPosition} from './utils/render';
import TripMenuView from './view/trip-menu';
import StatisticsView from './view/statistics';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import TripInfoPresenter from './presenter/info';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';

const EVENT_COUNT = 15;

const siteHeader = document.querySelector(`.trip-main`);
const siteControls = siteHeader.querySelector(`.trip-controls`);
const siteTrip = document.querySelector(`.trip-events`);
const siteMain = document.querySelector(`.page-trip__container`);

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(SORT_RULES[DEFAULT_SORT]);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);
const filterModel = new FilterModel();

const menuComponent = new TripMenuView(MenuItem.TABLE);
renderElement(siteControls, menuComponent, RenderPosition.AFTERBEGIN);

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

const tripPresenter = new TripPresenter(siteTrip, eventsModel, filterModel);
tripPresenter.init();

const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
newEventBtn.addEventListener(`click`, () => tripPresenter.createNewEvent());

let statsComponent = null;
