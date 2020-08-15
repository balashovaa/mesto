import Popup from './Popup.js';
import FormValidator from "./FormValidator.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callbackFormSubmit) {
    super(selector);

    this._callbackFormSubmit = callbackFormSubmit;
    this._form = this._popupElement.querySelector('form');
    this._formValidator = new FormValidator(
      {
        inputSelector: '.form__item',
        submitButtonSelector: '.form__button-save',
        inactiveButtonClass: 'form__button-save_disabled',
        inputErrorClass: 'form__item_type_error',
        errorClass: 'form__item-error'
      },
      this._form);
    this._formValidator.enableValidation();
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
