import {Mode, UserAction, UpdateType} from '../const';
import {renderElement, RenderPosition, remove} from '../utils/render';
import TripEditView from '../view/trip-edit';

export default class NewEvent {
  constructor(siteTripContainer, changeData) {
    this._tripContainer = siteTripContainer;
    this._changeData = changeData;
    this._eventMode = Mode.ADDING;
    this._pointAddComponent = null;
    this._newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  init(event) {
    this._event = event;
    this._pointAddComponent = new TripEditView(this._event, this._eventMode);
    this._pointAddComponent.setSaveBtnClickHandler(this._handleSaveClick);
    this._pointAddComponent.setRollupBtnClickHandler(this._handleRollupClick);
    this._pointAddComponent.setDeleteBtnClickHandler(this._handleCancelClick);
    renderElement(this._tripContainer, this._pointAddComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener(`keydown`, this._escKeydownHandler);

    this._newEventBtn.disabled = true;
  }

  destroy() {
    if (this._pointAddComponent === null) {
      return;
    }

    remove(this._pointAddComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
    this._newEventBtn.disabled = false;
  }

  setSavingState() {
    this._pointAddComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
    this._pointAddComponent.updateElement();
  }

  setAbortingState() {
    const resetState = () => {
      this._pointAddComponent.updateData({isDisabled: false, isSaving: false});
      this._pointAddComponent.updateElement();
    };

    this._pointAddComponent.showError(resetState);
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
