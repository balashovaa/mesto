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
  function handleClick() {
    closeModal(modal);
  }

  element.addEventListener('click', handleClick);
}

addCloseModal(popupProfile, closePopupProfile);
addCloseModal(popupAddPhoto, closePopupAddPhoto);

let popupList = document.querySelectorAll('.popup');

function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget)
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


  addElement(inputFormPlace.value, inputFormPlaceLink.value, true);
  closeModal(popupAddPhoto);
  inputFormPlace.value = '';
  inputFormPlaceLink.value = '';
}

savePhotoForm.addEventListener('submit', handleSavePhotoClick);


const elementCards = document.querySelector('.element__cards');
const elementTemplate = document.querySelector('.element_template');

function addElement(name, link, isPrepend) {
  const newElement = elementTemplate.cloneNode(true);

  newElement.classList.remove('element_template');
  newElement.querySelector('.element__photo').setAttribute('src', link);
  newElement.querySelector('.element__photo').setAttribute('alt', name);
  newElement.querySelector('.element__title').textContent = name;

  const like = newElement.querySelector('.element__like');

  function handleLikeClick() {
    like.classList.toggle('element__like_status_added');
  }

  like.addEventListener("click", handleLikeClick);

  const deleteButton = newElement.querySelector('.element__delete-button');


  function handleDeleteButtonClick() {
    newElement.remove();
  }

  deleteButton.addEventListener('click', handleDeleteButtonClick);

  const popupPhotoCard = document.querySelector('.popup__photo-card');
  const openImagePopup = newElement.querySelector('.element__photo');
  const popupImage = document.querySelector('.popup__image');
  const popupImageDescription = document.querySelector('.popup__image-description');
  const closePopupImage = document.querySelector('.popup__button-close_image');

  function handleOpenImagePopupClick() {
    popupImage.setAttribute('src', link);
    popupImageDescription.textContent = name;

    openModal(popupPhotoCard);
  }

  openImagePopup.addEventListener('click', handleOpenImagePopupClick);

  closePopupImage.addEventListener('click', function () {
    closeModal(popupPhotoCard)
  });

  if (isPrepend) {
    elementCards.prepend(newElement);
  } else {
    elementCards.append(newElement);
  }

}

initialCards.forEach(
  function (initialCard) {
    addElement(initialCard.name, initialCard.link, false);
  }
);



