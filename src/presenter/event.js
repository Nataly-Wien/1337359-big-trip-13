import {renderElement, RenderPosition, replaceElement} from '../utils/render';
import TripEventView from '../view/trip-event';
import TripEditView from '../view/trip-edit';

export default class Event {
  constructor(siteTripContainer) {
    this._tripContainer = siteTripContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    this._eventComponent = new TripEventView(this._event);
    this._eventComponent.setEditBtnClickHandler(this._handleEditClick);

    this._eventEditComponent = new TripEditView(this._event);
    this._eventEditComponent.setSaveBtnClickHandler(this._handleSaveClick);
    this._eventEditComponent.setCancelBtnClickHandler(this._handleCancelClick);

    renderElement(this._tripContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _handleEditClick() {
    replaceElement(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this.escKeydownHandler);
  }

  _handleSaveClick() {
    replaceElement(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this.escKeydownHandler);
  }

  _handleCancelClick() {
    replaceElement(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this.escKeydownHandler);
  }

  _escKeydownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceElement(this._eventComponent, this._eventEditComponent);
      document.removeEventListener(`keydown`, this.escKeydownHandler);
    }
  }
}
