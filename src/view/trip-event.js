import dayjs from "dayjs";
import AbstractTrip from './abstract';

const createTripEventTemplate = (event) => {
  const {
    type,
    city,
    price,
    offers,
    startDateTime,
    endDateTime,
    isFavorite,
  } = event;

  const differenceHour = dayjs(endDateTime).diff(dayjs(startDateTime), `hour`);
  const hour = differenceHour === 0 ? `` : `${differenceHour}H`;
  const differenceMinute = dayjs(endDateTime).diff(dayjs(startDateTime), `minute`) % 60;
  const minute = differenceMinute === 0 ? `` : `${differenceMinute}M`;

  const offersTemplate = offers.map((item) => item.isChecked ? `<li class="event__offer">
     <span class="event__offer-title">${item.title} </span>&plus;&euro;&nbsp; <span class="event__offer-price">${item.price}</span>
    </li>` : ``).join(``);

  const favoriteButtonTemplate = isFavorite ? ` event__favorite-btn--active` : ``;

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dayjs(startDateTime).format(`MMM DD`)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${city}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${dayjs(startDateTime).format(`HH:mm`)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${dayjs(endDateTime).format(`HH:mm`)}</time>
                  </p>
                  <p class="event__duration">${hour} ${minute}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersTemplate}
                </ul>
                <button class="event__favorite-btn${favoriteButtonTemplate}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class TripEvent extends AbstractTrip {
  constructor(event) {
    super();
    this._event = event;
    this._editBtnClickHandler = this._editBtnClickHandler.bind(this);
    this._favoriteBtnClickHandler = this._favoriteBtnClickHandler.bind(this);
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
  }

  _editBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.editBtnClick();
  }

  _favoriteBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteBtnClick();
  }

  setEditBtnClickHandler(callback) {
    this._callback.editBtnClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editBtnClickHandler);
  }

  setFavoriteBtnClickHandler(callback) {
    this._callback.favoriteBtnClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteBtnClickHandler);
  }
}
