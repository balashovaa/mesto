let modal = document.querySelector('.popup');
let openPopap = document.querySelector('.profile__button-edite');
let closePopup = document.querySelector('.popup__button-close')
let itemName = document.querySelector('.form__item_name');
let itemDescription = document.querySelector('.form__item_description');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');
let saveButton = document.querySelector('.form__button-save');

function toggleModal() {
  modal.classList.toggle('popup_open');
}

function OpenModalThenCloseModal() {
  if (modal.classList.contains('popup_open')) {
    toggleModal();
  }
}

function ConfirmThenToggleModal() {
  if (confirm('Желаете закрыть окно без сохранения?')) {
    toggleModal();
  }
}

openPopap.addEventListener(
  'click',
  function () {
    itemName.value = userName.textContent;
    itemDescription.value = userDescription.textContent;

    toggleModal();
  }
);

closePopup.addEventListener('click', function () {
    ifConfirmThenToggleModal();
  }
);

modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    ConfirmThenToggleModal();
  }
});

saveButton.addEventListener('click', function () {
  userName.textContent = itemName.value;
  userDescription.textContent = itemDescription.value;

  toggleModal();
});

window.addEventListener(
  "keydown",
  function (event) {
    if (event.key !== undefined) {
      if (event.key === 'Escape') {
        OpenModalThenCloseModal();
      }
    } else if (event.keyCode !== undefined) {
      if (event.keyCode === 27) {
        OpenModalThenCloseModal();
      }
    }
  },
  true);

let addPhotoButton = document.querySelector('.profile__add-photo');

addPhotoButton.addEventListener('click', function () {
  alert(`Пока мы не умеем загружать фото, но мы развиваемся :-)`);
});
