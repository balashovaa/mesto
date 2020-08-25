import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, callbackFormSubmit, buttonLabelOnSubmit) {
    super(selector);

    this._callbackFormSubmit = callbackFormSubmit;
    this._form = this._popupElement.querySelector('form');
    this._buttonLabelOnSubmit = buttonLabelOnSubmit;
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
    const buttonSubmit = this._form.querySelector('.form__button-save');
    const prevLabel = buttonSubmit.textContent;
    const formData = this._getInputValues();


    event.preventDefault();
    buttonSubmit.textContent = this._buttonLabelOnSubmit;
    this._disableForm();

    this._callbackFormSubmit(
      formData,
      () => {
        this.close();
        buttonSubmit.textContent = prevLabel;
        this._enableForm();
      },
      (errorMessage) => {
        alert(errorMessage);
      });
  }

  _disableForm(){
    const elements = this._form.elements;

    for (let i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = true;
      elements[i].disabled = true;
    }
  }

  _enableForm(){
    const elements = this._form.elements;

    for (let i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = false;
      elements[i].disabled = false;
    }
  }
}
