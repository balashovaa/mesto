function enableValidation(config) {
  const showInputError = (formElement, formInput, errorMessage) => {
    const formError = formElement.querySelector(`#${formInput.id}-error`);

    formInput.classList.add(config.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(config.errorClass);
  };

  const hideInputError = (formElement, formInput) => {
    const formError = formElement.querySelector(`#${formInput.id}-error`);

    formInput.classList.remove(config.inputErrorClass);
    formError.textContent = '';
    formError.classList.remove(config.errorClass);
  };

  const checkValid = (formElement, formInput) => {
    if (formInput.validity.valid) {
      hideInputError(formElement, formInput);
    } else {
      showInputError(formElement, formInput, formInput.validationMessage);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

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
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement);
  });
}
