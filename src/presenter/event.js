import {KeyCode, Mode, State, UserAction, UpdateType, WARNINGS} from '../const';
import {renderElement, RenderPosition, replaceElement, remove} from '../utils/render';
import {isOnline} from '../utils/common';
import {showToast} from '../utils/toast';
import TripEventView from '../view/trip-event';
import TripEditView from '../view/trip-edit';

export default class Event {
  constructor(siteTripContainer, changeData, resetEditMode) {
    this._tripContainer = siteTripContainer;
    this._changeData = changeData;
    this._resetEditMode = resetEditMode;
    this._mode = Mode.DEFAULT;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._closeEditMode = this._closeEditMode.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(event) {
    this._event = event;
    this.initiateView();
    renderElement(this._tripContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  refresh(event) {
    const oldEvent = this._pointComponent;
    const oldEditEvent = this._pointEditComponent;

    this._event = event;
    this.initiateView();

    if (this._mode === Mode.DEFAULT) {
      replaceElement(this._pointComponent, oldEvent);
    }
    if (this._mode === Mode.EDITING) {
      replaceElement(this._pointEditComponent, oldEditEvent);
    }

    remove(oldEvent);
    remove(oldEditEvent);
  }

  initiateView() {
    this._pointComponent = new TripEventView(this._event);
    this._pointComponent.setEditBtnClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteBtnClickHandler(this._handleFavoriteClick);

    this._pointEditComponent = new TripEditView(this._event, this._mode);
    this._pointEditComponent.setSaveBtnClickHandler(this._handleSaveClick);
    this._pointEditComponent.setRollupBtnClickHandler(this._handleCancelClick);
    this._pointEditComponent.setDeleteBtnClickHandler(this._handleDeleteClick);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    this._pointEditComponent.reset(this._event);
    this._closeEditMode();
  }

  setViewState(state) {
    const resetViewState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
      this._pointEditComponent.updateElement();
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        this._pointEditComponent.updateElement();
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        this._pointEditComponent.updateElement();
        break;
      case State.ABORTING:
        switch (this._mode) {
          case Mode.EDITING:
            this._pointEditComponent.showError(resetViewState);
            break;
          case Mode.DEFAULT:
            this._pointComponent.showError(resetViewState);
            break;
        }

        break;
    }
  }

  _closeEditMode() {
    replaceElement(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeydownHandler(evt) {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      this._closeEditMode();
    }
  }

  _handleEditClick() {
    if (!isOnline()) {
      showToast(WARNINGS.edit);
      return;
    }

    this._resetEditMode();
    this._mode = Mode.EDITING;
    replaceElement(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeydownHandler);
  }

  _handleSaveClick(event) {
    if (!isOnline()) {
      showToast(WARNINGS.save);
      return;
    }

    this._changeData(UserAction.UPDATE_EVENT, UpdateType.REFRESH_ELEMENT, event);
  }

  _handleCancelClick() {
    this._pointEditComponent.reset(this._event);
    this._closeEditMode();
  }

  _handleDeleteClick(event) {
    if (!isOnline()) {
      showToast(WARNINGS.delete);
      return;
    }

    this._changeData(UserAction.DELETE_EVENT, UpdateType.REFRESH_ALL, event);
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_EVENT, UpdateType.REFRESH_ELEMENT, Object.assign({}, this._event, {isFavorite: !this._event.isFavorite}));
  }
}
