export default class {
  _formElement;
  _config;

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation(){
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }

  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

   this._toggleButton(inputList, buttonElement);

    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkValid(formInput);

        this._toggleButton(inputList, buttonElement);
      });
    });
  }

  _toggleButton(inputList, buttonElement) {
    if (this._isInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  _checkValid  (formInput)  {
    if (formInput.validity.valid) {
      this._hideInputError(formInput);
    } else {
      this._showInputError(formInput, formInput.validationMessage);
    }
  }

  _showInputError (formInput, errorMessage) {
    const formError = this._formElement.querySelector(`#${formInput.id}-error`);

    formInput.classList.add(this._config.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._config.errorClass);
  }

  _hideInputError (formInput) {
    const formError = this._formElement.querySelector(`#${formInput.id}-error`);

    formInput.classList.remove(this._config.inputErrorClass);
    formError.textContent = '';
    formError.classList.remove(this._config.errorClass);
  }

  _isInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
