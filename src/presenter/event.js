import {Mode} from '../const';
import {renderElement, RenderPosition, replaceElement, remove} from '../utils/render';
import TripEventView from '../view/trip-event';
import TripEditView from '../view/trip-edit';

export default class Event {
  constructor(siteTripContainer, changeData, sortEvents, resetEditMode) {
    this._tripContainer = siteTripContainer;
    this._changeData = changeData;
    this._sortEvents = sortEvents;
    this._resetEditMode = resetEditMode;
    this._eventMode = Mode.DEFAULT;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._closeEditMode = this._closeEditMode.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(event) {
    this._event = event;

    this._eventComponent = new TripEventView(this._event);
    this._eventComponent.setEditBtnClickHandler(this._handleEditClick);
    this._eventComponent.setFavoriteBtnClickHandler(this._handleFavoriteClick);

    this._eventEditComponent = new TripEditView(this._event);
    this._eventEditComponent.setSaveBtnClickHandler(this._handleSaveClick);
    this._eventEditComponent.setCancelBtnClickHandler(this._handleCancelClick);

    renderElement(this._tripContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  update(event) {
    const oldEvent = this._eventComponent;
    const oldEditEvent = this._eventEditComponent;

    this._event = event;

    this._eventComponent = new TripEventView(event);
    this._eventComponent.setEditBtnClickHandler(this._handleEditClick);
    this._eventComponent.setFavoriteBtnClickHandler(this._handleFavoriteClick);

    this._eventEditComponent = new TripEditView(event);
    this._eventEditComponent.setSaveBtnClickHandler(this._handleSaveClick);
    this._eventEditComponent.setCancelBtnClickHandler(this._handleCancelClick);

    if (this._eventMode === Mode.DEFAULT) {
      replaceElement(this._eventComponent, oldEvent);
    }
    if (this._eventMode === Mode.EDITING) {
      replaceElement(this._eventEditComponent, oldEditEvent);
    }

    remove(oldEvent);
    remove(oldEditEvent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._eventMode === Mode.DEFAULT) {
      return;
    }

    this._eventEditComponent.reset(this._event);
    this._closeEditMode();
  }

  _handleEditClick() {
    this._resetEditMode();
    replaceElement(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this.escKeydownHandler);
    this._eventMode = Mode.EDITING;
  }

  _closeEditMode() {
    replaceElement(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this.escKeydownHandler);
    this._eventMode = Mode.DEFAULT;
  }

  _handleSaveClick(event) {
    this._changeData(event);
    this._closeEditMode();
    this._sortEvents();
  }

  _handleCancelClick() {
    this._eventEditComponent.reset(this._event);
    this._closeEditMode();
  }

  _escKeydownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceElement(this._eventComponent, this._eventEditComponent);
      document.removeEventListener(`keydown`, this.escKeydownHandler);
    }
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._event, {isFavorite: !this._event.isFavorite}));
  }
}
