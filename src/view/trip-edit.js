import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import {Mode, EVENT_TYPES} from '../const';
import SmartView from './smart';
import {toUpperCaseFirst} from '../utils/events';
import Storage from '../storage';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import '../../node_modules/flatpickr/dist/themes/material_blue.css';

const createEventTypeChoiceTemplate = (type) => EVENT_TYPES.map((item) =>
  `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
      value="${item.toLowerCase()}" ${item === type ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
  </div>`).join(``);

const createOffersSectionTemplate = (offers, offersInfo, type, isDisabled) => {
  if (offersInfo.length === 0) {
    return ``;
  }

  const offersListTemplate = offersInfo.map((item, index) => {
    const isChecked = offers.find((offer) => offer.title === item.title);
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index}" type="checkbox"
    name="event-offer-${type}-${index}" ${isChecked ? `checked` : ``}${isDisabled ? ` disabled` : ``}>
    <label class="event__offer-label" for="event-offer-${type}-${index}">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
  </div>`;
  }).join(``);

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
    ${photos.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join(``)}
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

const createTripEditTemplate = (event, mode, offersInfo, destinationInfo) => {
  const {
    type,
    city,
    price,
    offers,
    description,
    descriptionPhotos,
    startDateTime,
    endDateTime,
    isDisabled,
    isSaving,
    isDeleting,
  } = event;

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"${isDisabled ? ` disabled` : ``}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group"${isDisabled ? ` disabled` : ``}>
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventTypeChoiceTemplate(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                      value="${city}" list="destination-list-1" autocomplete="off"${isDisabled ? ` disabled` : ``}>
                    <datalist id="destination-list-1">
                    ${createDestinationListTemplate(Object.keys(destinationInfo))}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                      value="${dayjs(startDateTime).format(`DD/MM/YY HH:mm`)}"${isDisabled ? ` disabled` : ``}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                      value="${dayjs(endDateTime).format(`DD/MM/YY HH:mm`)}"${isDisabled ? ` disabled` : ``}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
                     value="${price}" autocomplete="off"${isDisabled ? ` disabled` : ``}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit"${isDisabled ? ` disabled` : ``}>${isSaving ? `Saving...` : `Save`}
                    </button>
                  <button class="event__reset-btn" type="reset"${isDisabled ? ` disabled` : ``}>${mode === Mode.ADDING ? `Cancel` : ``}
                    ${mode !== Mode.ADDING && !isDeleting ? `Delete` : ``}${mode !== Mode.ADDING && isDeleting ? `Deleting...` : ``}
                    </button>
                  <button class="event__rollup-btn" type="button"${isDisabled ? ` disabled` : ``}>
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${createOffersSectionTemplate(offers, offersInfo[type], type.toLowerCase(), isDisabled)}
                ${createDestinationSectionTemplate(description, descriptionPhotos)}
                </section>
              </form>`;
};

export default class TripEdit extends SmartView {
  constructor(event, eventMode) {
    super();
    this._data = TripEdit.convertEventToFormData(event);
    this._eventMode = eventMode;
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._destinationInfo = Storage.getDestinations();
    this._offersInfo = Storage.getOffers();

    this._saveBtnClickHandler = this._saveBtnClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._cancelBtnClickHandler = this._cancelBtnClickHandler.bind(this);
    this._deleteBtnClickHandler = this._deleteBtnClickHandler.bind(this);

    this._setInnerHandlers();
  }

  updateData(update) {
    if (!update) {
      return;
    }

    const updatedData = Object.assign({}, this._data, update);
    this._data = updatedData;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSaveBtnClickHandler(this._callback.saveBtnClick);
    this.setRollupBtnClickHandler(this._callback.cancelBtnClick);
    this.setDeleteBtnClickHandler(this._callback.deleteBtnClick);
  }

  getTemplate() {
    return createTripEditTemplate(this._data, this._eventMode, this._offersInfo, this._destinationInfo);
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  reset(oldEvent) {
    this.updateData(TripEdit.convertEventToFormData(oldEvent));
    this.updateElement();
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

  _eventTypeChangeHandler(evt) {
    const newType = toUpperCaseFirst(evt.target.value);
    const newOffers = [];
    this.updateData({type: newType, offers: newOffers});
    this.updateElement();
  }

  _eventDestinationChangeHandler(evt) {
    if (Object.keys(this._destinationInfo).indexOf(evt.target.value) === -1) {
      evt.target.value = this._data.city;
      return;
    }

    const newDestination = evt.target.value;
    const newDescription = this._destinationInfo[newDestination].description;
    const newPhotos = this._destinationInfo[newDestination].descriptionPhotos;
    this.updateData({city: newDestination, description: newDescription, descriptionPhotos: newPhotos});
    this.updateElement();
  }

  _priceInputHandler(evt) {
    const value = parseInt(evt.target.value, 10) ? parseInt(evt.target.value, 10) : 0;
    this.updateData({price: value});
    evt.target.value = value;
  }

  _offersChangeHandler(evt) {
    const offerIndex = +evt.target.name.slice(evt.target.name.lastIndexOf(`-`) + 1);
    const newOffers = [];

    this._offersInfo[this._data.type].forEach((item, index) => {
      if (index === offerIndex && evt.target.checked
        || index !== offerIndex && this._data.offers.findIndex((offer) => offer.title === item.title) >= 0) {
        newOffers.push(item);
      }
    });

    this.updateData({offers: newOffers});
  }

  _startDateChangeHandler(dateTime, dateStr) {
    this.updateData({startDateTime: dayjs(dateTime).valueOf()});
    this._endDatepicker.set(`minDate`, dateStr);
  }

  _endDateChangeHandler(dateTime, dateStr) {
    this.updateData({endDateTime: dayjs(dateTime).valueOf()});
    this._startDatepicker.set(`maxDate`, dateStr);
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

  _saveBtnClickHandler(evt) {
    evt.preventDefault();

    if (this._data.city === ``) {
      return;
    }

    this._callback.saveBtnClick(TripEdit.convertFormDataToEvent(this._data));
  }

  _cancelBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelBtnClick();
  }

  _deleteBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteBtnClick(TripEdit.convertFormDataToEvent(this._data));
  }

  setSaveBtnClickHandler(callback) {
    this._callback.saveBtnClick = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._saveBtnClickHandler);
  }

  setRollupBtnClickHandler(callback) {
    this._callback.cancelBtnClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._cancelBtnClickHandler);
  }

  setDeleteBtnClickHandler(callback) {
    this._callback.deleteBtnClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteBtnClickHandler);
  }

  static convertEventToFormData(event) {
    return Object.assign({}, event, {
      offers: event.offers.map((item) => Object.assign({}, item)),
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  }

  static convertFormDataToEvent(data) {
    const event = Object.assign({}, data, {
      offers: data.offers.map((item) => Object.assign({}, item))
    });

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
