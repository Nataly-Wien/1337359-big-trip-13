import {Mode, UserAction, UpdateType} from '../const';
import {renderElement, RenderPosition, remove} from '../utils/render';
import TripEditView from '../view/trip-edit';

export default class NewEvent {
  constructor(siteTripContainer, changeData) {
    this._tripContainer = siteTripContainer;
    this._changeData = changeData;
    this._eventMode = Mode.ADDING;
    this._eventAddComponent = null;
    this._newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  init(event) {
    this._event = event;
    this._eventAddComponent = new TripEditView(this._event, this._eventMode);
    this._eventAddComponent.setSaveBtnClickHandler(this._handleSaveClick);
    this._eventAddComponent.setRollupBtnClickHandler(this._handleRollupClick);
    this._eventAddComponent.setDeleteBtnClickHandler(this._handleCancelClick);
    renderElement(this._tripContainer, this._eventAddComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener(`keydown`, this._escKeydownHandler);

    this._newEventBtn.disabled = true;
  }

  destroy() {
    if (this._eventAddComponent === null) {
      return;
    }

    remove(this._eventAddComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
    this._newEventBtn.disabled = false;
  }

  setSavingState() {
    this._eventAddComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
    this._eventAddComponent.updateElement();
  }

  setAbortingState() {
    const resetState = () => {
      this._eventAddComponent.updateData({isDisabled: false, isSaving: false});
      this._eventAddComponent.updateElement();
    };

    this._eventAddComponent.showError(resetState);
  }

  _handleSaveClick(event) {
    this._changeData(UserAction.ADD_EVENT, UpdateType.REFRESH_ALL, event);
  }

  _handleRollupClick() {
    this.destroy();
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeydownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
