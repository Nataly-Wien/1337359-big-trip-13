import {SORT_FIELDS} from '../const';

const currentSortField = `Day`;

const createSortTemplate = (current) => SORT_FIELDS.reduce((string, item) => string + `<div class="trip-sort__item  trip-sort__item--${item.toLowerCase()}">
              <input id="sort-${item.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.toLowerCase()}" ${item === current ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-${item.toLowerCase()}">${item}</label>
            </div>`, ``);

export const createTripSortTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${createSortTemplate(currentSortField)}
          </form>`;
};
