import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";


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

const popupWithImage = new PopupWithImage('popup__photo-card');
popupWithImage.setEventListeners();// непонятно зачем делать это здесь. Лучше сделать приватным методом и вызывать в конструкторе Popup

function handleOpenImagePopupClick(name, link) {
  popupWithImage.open(name, link);
}

const card = new Card('.element_template', handleOpenImagePopupClick);

function renderer(item) {
  return card.getElement(item.name, item.link);
}

const section = new Section({items: initialCards, renderer: renderer}, '.element__cards');
section.renderItems();

function onPhotoSubmit(formData) {
  section.addItem(card.getElement(formData.get('place'), formData.get('place-link')));
}

const popupPhoto = new PopupWithForm('popup__photo', onPhotoSubmit);
popupPhoto.setEventListeners();// непонятно зачем делать это здесь. Лучше сделать приватным методом и вызывать в конструкторе Popup
document.querySelector('.profile__add-photo').addEventListener('click', () => {
  popupPhoto.open();
});

const userInfo = new UserInfo({selectorName: 'profile__name', selectorDescription: 'profile__description'});

function onProfileSubmit(formData) {
  userInfo.setUserInfo({name: formData.get('name'), description: formData.get('description')});
}

const popupProfile = new PopupWithForm('popup__profile', onProfileSubmit);
popupProfile.setEventListeners();// непонятно зачем делать это здесь. Лучше сделать приватным методом и вызывать в конструкторе Popup
document.querySelector('.profile__button-edit').addEventListener('click', () => {
  const data = userInfo.getUserInfo();

  document.querySelector('.form__item_name').value = data.name;
  document.querySelector('.form__item_name').dispatchEvent(new InputEvent('input'));
  document.querySelector('.form__item_description').value = data.description;
  document.querySelector('.form__item_description').dispatchEvent(new InputEvent('input'));
  popupProfile.open();
});
