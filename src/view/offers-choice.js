export const createOffersChoiceTemplate = (offers) => offers.map((item) =>
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.type.toLowerCase()}-1" type="checkbox" name="event-offer-${item.type.toLowerCase()}" ${item.isChecked ? `checked` : ``}>
    <label class="event__offer-label" for="event-offer-${item.type.toLowerCase()}-1">
      <span class="event__offer-title">Add ${item.type.toLowerCase()}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
  </div>`).join(``);
