import {SORT_FIELDS} from '../const';
import AbstractTrip from './abstract';

const currentSortField = `Day`;

const createSortTemplate = (current) => SORT_FIELDS.map((item) => `<div class="trip-sort__item  trip-sort__item--${item.toLowerCase()}">
              <input id="sort-${item.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
              value="sort-${item.toLowerCase()}" ${item === current ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-${item.toLowerCase()}">${item}</label>
            </div>`).join(``);

const createTripSortTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createSortTemplate(currentSortField)}
          </form>`;
};

export default class TripSort extends AbstractTrip {
  getTemplate() {
    return createTripSortTemplate();
  }
}
