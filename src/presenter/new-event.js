import {nanoid} from 'nanoid';
import {Mode, UserAction, UpdateType} from '../const';
import {renderElement, RenderPosition, remove} from '../utils/render';
import TripEditView from '../view/trip-edit';

export default class NewEvent {
  constructor(siteTripContainer, changeData, newEventBtn) {
    this._tripContainer = siteTripContainer;
    this._changeData = changeData;
    this._newEventBtn = newEventBtn;
    this._eventMode = Mode.ADDING;
    this._eventEditComponent = null;

    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  init(event) {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._event = event;
    this._eventEditComponent = new TripEditView(this._event, this._eventMode);
    this._eventEditComponent.setSaveBtnClickHandler(this._handleSaveClick);
    this._eventEditComponent.setRollupBtnClickHandler(this._handleRollupClick);
    this._eventEditComponent.setDeleteBtnClickHandler(this._handleCancelClick);
    renderElement(this._tripContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener(`keydown`, this._escKeydownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
    this._newEventBtn.disabled = false;
  }

  _handleSaveClick(event) {
    this._changeData(UserAction.ADD_EVENT, UpdateType.REFRESH_ALL, Object.assign({id: nanoid(5)}, event));
    this.destroy();
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
