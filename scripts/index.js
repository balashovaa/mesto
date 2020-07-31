import Card from './Card.js';
import FormValidator from './FormValidator.js';

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


const popupProfile = document.querySelector('.popup__profile');
const popupAddPhoto = document.querySelector('.popup__photo');
const openPopupProfile = document.querySelector('.profile__button-edite');
const openPopupAddPhoto = document.querySelector('.profile__add-photo');
const closePopupProfile = document.querySelector('.popup__button-close');
const closePopupAddPhoto = document.querySelector('.popup__button-close_photo');
const itemName = document.querySelector('.form__item_name');
const itemDescription = document.querySelector('.form__item_description');
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const inputFormPlace = document.querySelector('.form__item_place');
const inputFormPlaceLink = document.querySelector('.form__item_place-link');
const savePopupProfile = document.querySelector('.form__save-profile');
const savePhotoForm = document.querySelector('.form__save_photo');
let popupOpen;

itemName.value = userName.textContent;
itemDescription.value = userDescription.textContent;

function handleWindowKeyDown(event) {
  if (event.key === 'Escape') {
    closeModal(popupOpen)
    window.removeEventListener('keydown', handleWindowKeyDown);
  }
}

function openModal(modal) {
  popupOpen = modal;
  modal.classList.add('popup_open');
  window.addEventListener('keydown', handleWindowKeyDown);
}

function addOpenModal(modal, element) {
  function handleClick() {
    openModal(modal);
  }

  element.addEventListener('click', handleClick);
}

addOpenModal(popupProfile, openPopupProfile);

addOpenModal(popupAddPhoto, openPopupAddPhoto);

function closeModal(modal) {
  modal.classList.remove('popup_open');
}

function addCloseModal(modal, element) {
  function handleClick(event) {
    event.preventDefault();
    closeModal(modal);
  }

  element.addEventListener('click', handleClick);
}

addCloseModal(popupProfile, closePopupProfile);
addCloseModal(popupAddPhoto, closePopupAddPhoto);

const popupList = document.querySelectorAll('.popup');

function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', closePopupOnOverlayClick);
})


function handleSaveProfileInfoClick(event) {
  event.preventDefault();

  userName.textContent = itemName.value;
  userDescription.textContent = itemDescription.value;

  closeModal(popupProfile);
}

savePopupProfile.addEventListener('submit', handleSaveProfileInfoClick);


function handleSavePhotoClick(event) {
  event.preventDefault();


  const myCard = new Card(inputFormPlace.value, inputFormPlaceLink.value, '.element_template', handleOpenImagePopupClick);
  addToDOM(true, myCard.getElement());
  closeModal(popupAddPhoto);
  inputFormPlace.value = '';
  inputFormPlaceLink.value = '';

  const button =  savePhotoForm.querySelector('.form__button-save');
  button.setAttribute('disabled', 'disabled');
  button.classList.add('form__button-save_disabled');
}

savePhotoForm.addEventListener('submit', handleSavePhotoClick);

const popupPhotoCard = document.querySelector('.popup__photo-card');
const popupImage = document.querySelector('.popup__image');
const popupImageDescription = document.querySelector('.popup__image-description');
const closePopupImage = document.querySelector('.popup__button-close_image');
addCloseModal(popupPhotoCard, closePopupImage);

function handleOpenImagePopupClick(name, link) {
  popupImage.setAttribute('src', link);
  popupImageDescription.textContent = name;

  openModal(popupPhotoCard);
}

const elementCards = document.querySelector('.element__cards');
function addToDOM(isPrepend, newElement) {


  if (isPrepend) {
    elementCards.prepend(newElement);
  } else {
    elementCards.append(newElement);
  }
}

initialCards.forEach(
  function (initialCard) {
    const myCard = new Card(initialCard.name, initialCard.link, '.element_template', handleOpenImagePopupClick);
    addToDOM(false, myCard.getElement());
  }
);


const config = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error'
}

const saveProfileFormValidator = new FormValidator(config, document.querySelector('.form__save-profile'));
const savePhotoFormValidator = new FormValidator(config, document.querySelector('.form__save_photo'));

saveProfileFormValidator.enableValidation();
savePhotoFormValidator.enableValidation();
