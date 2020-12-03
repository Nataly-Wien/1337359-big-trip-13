import dayjs from 'dayjs';
import {createElement} from '../utils';

const createTripInfoTemplate = (price, dates, trip) => {
  if (!trip) {
    return ``;
  }

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

export default class TripInfo {
  constructor(price, dates, route) {
    this._price = price;
    this._dates = dates;
    this._route = route;
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
