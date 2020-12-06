import AbstractTrip from './abstract';

const createTripContainerTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripContainer extends AbstractTrip {
  getTemplate() {
    return createTripContainerTemplate();
  }
}
