
import TripInfoView from '../view/trip-info';
import {renderElement, RenderPosition, remove} from '../utils/render';
import {SORT_RULES} from '../const';

export default class Info {
  constructor(siteInfoContainer, eventsModel) {
    this._infoComponent = null;
    this._siteInfoContainer = siteInfoContainer;
    this._eventsModel = eventsModel;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._eventsModel.subscribe(this._handleModelEvent);
  }

  init() {
    remove(this._infoComponent);

    if (this._eventsModel.getEvents().length === 0) {
      return;
    }

    this._infoComponent = new TripInfoView(this._eventsModel.getEvents().slice().sort(SORT_RULES.day));
    renderElement(this._siteInfoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _handleModelEvent() {
    this.init();
  }
}
