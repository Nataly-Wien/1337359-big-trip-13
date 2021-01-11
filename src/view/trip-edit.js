import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import {EVENT_TYPES} from '../const';
import SmartView from './smart';
import {destinationInfo} from '../mock/mocks';
import {offersInfo} from '../mock/mocks';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import '../../node_modules/flatpickr/dist/themes/material_blue.css';

const createEventTypeChoiceTemplate = (type) => Object.keys(EVENT_TYPES).map((item) =>
  `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
      value="${item.toLowerCase()}" ${item === type ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
  </div>`).join();

const createOffersSectionTemplate = (offers) => {
  if (!offers || offers.length === 0) {
    return ``;
  }

  const offersListTemplate = offers.map((item) =>
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.type}-1" type="checkbox" name="event-offer-${item.type}" ${item.isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${item.type}-1">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
  </div>`).join(``);

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersListTemplate}
    </div>
  </section> `;
};

const createDestinationSectionTemplate = (description, photos) => {
  if (description === `` && (!photos || photos.length === 0)) {
    return ``;
  }

  const createPhotoTemplate = () => {
    if (photos.length === 0) {
      return ``;
    }

    return `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${photos.map((item) => `<img class="event__photo" src="${item}" alt="Event photo">`).join(``)}
    </div>
  </div>`;
  };

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${createPhotoTemplate()}
  </section>`;
};

const createDestinationListTemplate = (cities) => cities.map((item) => `<option value="${item}"></option>`).join(``);

const createTripEditTemplate = (event) => {
  const {
    type,
    city,
    price,
    offers,
    description,
    descriptionPhotos,
    startDateTime,
    endDateTime,
  } = event;

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventTypeChoiceTemplate(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${createDestinationListTemplate(Object.keys(destinationInfo))}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                      value="${dayjs(startDateTime).format(`DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                      value="${dayjs(endDateTime).format(`DD/MM/YY HH:mm`)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${createOffersSectionTemplate(offers)}
                ${createDestinationSectionTemplate(description, descriptionPhotos)}
                </section>
              </form>`;
};

export default class TripEdit extends SmartView {
  constructor(event) {
    super();
    this._data = TripEdit.convertEventToFormData(event);
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._saveBtnClickHandler = this._saveBtnClickHandler.bind(this);
    this._cancelBtnClickHandler = this._cancelBtnClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  _saveBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.saveBtnClick(TripEdit.convertFormDataToEvent(this._data));
  }

  _cancelBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelBtnClick();
  }

  _eventTypeChangeHandler(evt) {
    const newType = evt.target.value[0].toUpperCase() + evt.target.value.slice(1);
    const newOffers = JSON.parse(JSON.stringify(offersInfo))[newType];
    this.updateData({type: newType, offers: newOffers});
    this.updateEvent();
  }

  _eventDestinationChangeHandler(evt) {
    if (Object.keys(destinationInfo).indexOf(evt.target.value) === -1) {
      return;
    }

    const newDestination = evt.target.value;
    const newDescription = destinationInfo[newDestination].description;
    const newPhotos = destinationInfo[newDestination].descriptionPhotos;
    this.updateData({city: newDestination, description: newDescription, descriptionPhotos: newPhotos});
    this.updateEvent();
  }

  _priceInputHandler(evt) {
    this.updateData({price: evt.target.value});
  }

  _offersChangeHandler(evt) {
    const offerType = evt.target.name.slice(evt.target.name.lastIndexOf(`-`) + 1);
    const newOffers = this._data.offers.slice();
    newOffers.find((item) => item.type === offerType).isChecked = !newOffers.find((item) => item.type === offerType).isChecked;
    this.updateData({offers: newOffers});
  }

  _startDateChangeHandler(dateTime) {
    this.updateData({startDateTime: dayjs(dateTime).valueOf()});
  }

  _endDateChangeHandler(dateTime) {
    this.updateData({endDateTime: dayjs(dateTime).valueOf()});
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`change`, this._eventTypeChangeHandler);
    this.getElement().querySelector(`input[id="event-destination-1"]`).addEventListener(`change`, this._eventDestinationChangeHandler);
    this.getElement().querySelector(`input[id="event-price-1"]`).addEventListener(`change`, this._priceInputHandler);

    const offers = this.getElement().querySelector(`.event__available-offers`);
    if (offers) {
      offers.addEventListener(`change`, this._offersChangeHandler);
    }

    this._setDatepicker();
  }

  _setDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._startDatepicker = flatpickr(this.getElement().querySelector(`input[id="event-start-time-1"]`), {
      dateFormat: `j/m/y H:i`,
      enableTime: true,
      time_24hr: true, // eslint-disable-line camelcase
      onChange: this._startDateChangeHandler,
    });

    this._endDatepicker = flatpickr(this.getElement().querySelector(`input[id="event-end-time-1"]`), {
      dateFormat: `j/m/y H:i`,
      enableTime: true,
      time_24hr: true, // eslint-disable-line camelcase
      onChange: this._endDateChangeHandler,
    });
  }

  getTemplate() {
    return createTripEditTemplate(this._data);
  }

  setSaveBtnClickHandler(callback) {
    this._callback.saveBtnClick = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._saveBtnClickHandler);
  }

  setCancelBtnClickHandler(callback) {
    this._callback.cancelBtnClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._cancelBtnClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSaveBtnClickHandler(this._callback.saveBtnClick);
    this.setCancelBtnClickHandler(this._callback.cancelBtnClick);
  }

  reset(oldEvent) {
    this.updateData(TripEdit.convertEventToFormData(oldEvent));
    this.updateEvent();
  }

  static convertEventToFormData(event) {
    return JSON.parse(JSON.stringify(event));
  }

  static convertFormDataToEvent(data) {
    return JSON.parse(JSON.stringify(data));
  }
}
