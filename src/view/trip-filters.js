import {FILTERS} from '../const';

const currentFilter = `Everything`;

const createFilterTemplate = (current) => FILTERS.reduce((string, item) => string + `<div class="trip-filters__filter">
                <input id="filter-${item.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.toLowerCase()}" ${item === current ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-${item.toLowerCase()}">${item}</label>
              </div>`, ``);

export const createTripFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
              ${createFilterTemplate(currentFilter)}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};
