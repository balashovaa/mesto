const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let modal = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__button-edite');
let closePopup = document.querySelector('.popup__button-close')
let itemName = document.querySelector('.form__item_name');
let itemDescription = document.querySelector('.form__item_description');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');
let saveButton = document.querySelector('.form__button-save');

function toggleModal() {
  modal.classList.toggle('popup_open');
}

function closeModalIfOpenModal() {
  if (modal.classList.contains('popup_open')) {
    toggleModal();
  }
}

function toggleModalIfConfirm() {
  if (confirm('Желаете закрыть окно без сохранения?')) {
    toggleModal();
  }
}

function handleOpenPopupClick() {
  itemName.value = userName.textContent;
  itemDescription.value = userDescription.textContent;

  toggleModal();
}

function handleModalClick(event) {
  if (event.target === modal) {
    toggleModalIfConfirm();
  }
}

function handleWindowKeyDown(event) {
  if (event.key === 'Escape') {
    closeModalIfOpenModal();
  }
}

function handleSaveButtonClick(event) {
  event.preventDefault();

  userName.textContent = itemName.value;
  userDescription.textContent = itemDescription.value;

  toggleModal();
}

function handleClosePopupClick() {
  toggleModalIfConfirm();
}

openPopup.addEventListener('click', handleOpenPopupClick);
closePopup.addEventListener('click', handleClosePopupClick);
modal.addEventListener('click', handleModalClick);
saveButton.addEventListener('click', handleSaveButtonClick);
window.addEventListener("keydown", handleWindowKeyDown, true);


let elementCards = document.querySelector('.element__cards');
let elementTemplate = document.querySelector('.element_template');

function addElement(name, link, isPrepend) {
  const newElement = elementTemplate.cloneNode(true);

  newElement.classList.remove('element_template');
  newElement.querySelector('.element__photo').setAttribute('src', link);
  newElement.querySelector('.element__photo').setAttribute('alt', name);
  newElement.querySelector('.element__title').textContent = name;

  let heart = newElement.querySelector('.element__like');

  heart.addEventListener("click", function () {
    let likes_number = heart.querySelector('.element__likes-number');

    if (heart.classList.contains('element__like_status_added')) {
      likes_number.textContent--;
    } else {
      likes_number.textContent++;
    }

    heart.classList.toggle('element__like_status_added');
  });


  if (isPrepend) {
    elementCards.prepend(newElement);
  } else {
    elementCards.append(newElement);
  }

}

initialCards.forEach(
  function (currentValue) {
    addElement(currentValue.name, currentValue.link, false);
  }
);


let addPhotoButton = document.querySelector('.profile__add-photo');
let addPhotoForm = document.querySelector('.popup__photo');
let savePhotoForm = document.querySelector('.form__button-save_photo');
let inputFormPlace = document.querySelector('.form__item_place');
let inputFormPlaceLink = document.querySelector('.form__item_place-link');


function handleAddPhotoButtonClick() {
  addPhotoForm.classList.toggle('popup_open');
}

function handleSavePhotoButtonClick(event) {
  event.preventDefault();

  addElement(inputFormPlace.value, inputFormPlaceLink.value, true);
  addPhotoForm.classList.toggle('popup_open');
}

addPhotoButton.addEventListener('click', handleAddPhotoButtonClick);
savePhotoForm.addEventListener('click', handleSavePhotoButtonClick);
