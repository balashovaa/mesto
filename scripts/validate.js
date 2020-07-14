const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);

  formInput.classList.add('form__item_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('form__item-error');
};

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);

  formInput.classList.remove('form__item_type_error');
  formError.textContent = '';
  formError.classList.remove('form__item-error');
};

const checkValid = (formElement, formInput) => {
  if (formInput.validity.valid) {
    hideInputError(formElement, formInput);
  } else {
    showInputError(formElement, formInput, formInput.validationMessage);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.form__button-save');

  toggleButton(inputList, buttonElement);

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      checkValid(formElement, formInput);

      toggleButton(inputList, buttonElement);
    });
  });
};

function isInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButton(inputList, buttonElement) {
  if (isInvalidInput(inputList)) {
    buttonElement.classList.add('form__button-save_disabled');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('form__button-save_disabled');
    buttonElement.removeAttribute('disabled', 'disabled');
  }
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement);
  });
};


const validationSettingsObject = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error'
};

enableValidation(validationSettingsObject);
