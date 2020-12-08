import dayjs from 'dayjs';
import {EVENT_TYPES} from '../const';
import {emptyEvent} from '../utils/event';
import AbstractTrip from './abstract';

const createEventTypeChoiceTemplate = (type) => EVENT_TYPES.map((item) =>
  `<div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
      value="${item.toLowerCase()}" ${item === type ? `checked` : ``}>
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
  </div>`).join();

const createOffersChoiceTemplate = (offers) => offers.map((item) =>
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.type.toLowerCase()}-1" type="checkbox" name="event-offer-${item.type.toLowerCase()}" ${item.isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${item.type.toLowerCase()}-1">
      <span class="event__offer-title">Add ${item.type.toLowerCase()}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
  </div>`).join(``);

const createTripAddTemplate = (event = emptyEvent) => {
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

  const createPhotosTemplate = () => descriptionPhotos.map((item) =>
    `<img class="event__photo" src="${item.descriptionPhotos}" alt="Event photo">`).join(``);


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
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
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
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                     ${createOffersChoiceTemplate(offers)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPhotosTemplate()}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
};

export default class TripAd extends AbstractTrip {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createTripAddTemplate(this._event);
  }
}
