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
let popupProfile = document.querySelector ('.popup__profile');
let popupAddPhoto = document.querySelector ('.popup__photo');
let openPopupProfile = document.querySelector('.profile__button-edite');
let openPopupAddPhoto = document.querySelector('.profile__add-photo');
let closePopupProfile = document.querySelector('.popup__button-close');
let closePopupAddPhoto = document.querySelector('.popup__button-close_photo');
let itemName = document.querySelector('.form__item_name');
let itemDescription = document.querySelector('.form__item_description');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');
let inputFormPlace = document.querySelector('.form__item_place');
let inputFormPlaceLink = document.querySelector('.form__item_place-link');
let saveButtonPopupProfile = document.querySelector('.form__button-save');
let saveButtonPhotoForm = document.querySelector('.form__button-save_photo');


itemName.value = userName.textContent;
itemDescription.value = userDescription.textContent;

function openModal(modal) {
  modal.classList.toggle('popup_open');
}

openPopupProfile.addEventListener('click', function() {
openModal(popupProfile);
});

openPopupAddPhoto.addEventListener('click', function() {
  openModal(popupAddPhoto);
});


function closeModal(modal) {
  if (modal.classList.contains('popup_open')) {
    modal.classList.remove('popup_open');
  }
}

closePopupProfile.addEventListener('click', function() {
  closeModal(popupProfile);
});

closePopupAddPhoto.addEventListener('click', function() {
  closeModal(popupAddPhoto);
});


function handleSaveButtonClick(event) {
  event.preventDefault();

  userName.textContent = itemName.value;
  userDescription.textContent = itemDescription.value;

  closeModal(popupProfile);
}

saveButtonPopupProfile.addEventListener('click', handleSaveButtonClick);


function handleSavePhotoButtonClick(event) {
  event.preventDefault();

  addElement(inputFormPlace.value, inputFormPlaceLink.value, true);
  popupAddPhoto.classList.toggle('popup_open');
}
saveButtonPhotoForm.addEventListener('click', handleSavePhotoButtonClick);



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

  let deleteButton = newElement.querySelector ('.element__delete-button');


  function removeElement () {
    newElement.remove();
  }

  deleteButton.addEventListener('click', removeElement);


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



