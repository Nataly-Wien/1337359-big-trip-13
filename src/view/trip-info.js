import dayjs from 'dayjs';
import AbstractTrip from './abstract';
import {getTotalPrice, getTripDates, getRoute} from '../utils/events';
import {createElement} from '../utils/render';

const createTripInfoTemplate = (price, dates, trip) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${trip}</h1>
              <p class="trip-info__dates">${dayjs(dates.startDate).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(dates.endDate).format(`MMM DD`)}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>
          </section>`;
};

export default class TripInfo extends AbstractTrip {
  constructor(events) {
    super();
    this._price = getTotalPrice(events);
    this._dates = getTripDates(events);
    this._route = getRoute(events);
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._price, this._dates, this._route);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
