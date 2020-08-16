import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, callbackFormSubmit) {
    super(selector);

    this._callbackFormSubmit = callbackFormSubmit;
    this._form = this._popupElement.querySelector('form');
  }


  _getInputValues() {
    return new FormData(this._form);
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      this._onSubmitForm(event);
    });
  }

  close() {
    super.close();

    this._form.reset();
  }

  _onSubmitForm(event) {
    event.preventDefault();

    this._callbackFormSubmit(this._getInputValues());
    this.close();
  }
}
