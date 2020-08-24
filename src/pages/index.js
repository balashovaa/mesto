import './index.css';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    likes: [1,2,3],
    is_deletable: true
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    likes: [3],
    is_deletable: false
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    likes: [2,3],
    is_deletable: true
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    likes: [2],
    is_deletable: false
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    likes: [1],
    is_deletable: false
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    likes: [],
    is_deletable: true
  }
];

const popupWithImage = new PopupWithImage('popup__photo-card');
popupWithImage.setEventListeners();// непонятно зачем делать это здесь. Лучше сделать приватным методом и вызывать в конструкторе Popup

function handleOpenImagePopupClick(name, link) {
  popupWithImage.open(name, link);
}

const card = new Card('.element_template', handleOpenImagePopupClick);

function renderer(item) {
  return card.getElement(item.name, item.link, item.likes, item.is_deletable);
}

const section = new Section({items: initialCards, renderer: renderer}, '.element__cards');
section.renderItems();

function onPhotoSubmit(formData) {
  section.addItem(card.getElement(formData.get('place'), formData.get('place-link'), [], true));
}


const avatarPhoto = document.querySelector('.profile__photo');

function onUpdateAvatar(formData){
  avatarPhoto.setAttribute('src', formData.get('avatar-link'));
}

const popupAvatar = new PopupWithForm('popup__avatar', onUpdateAvatar);
const popupEditAvatarButton = document.querySelector('.profile__avatar-edit');
popupAvatar.setEventListeners();
popupEditAvatarButton.addEventListener('click', () => {
  popupAvatar.open()
})


const popupPhoto = new PopupWithForm('popup__photo', onPhotoSubmit);
const profileAddPhoto = document.querySelector('.profile__add-photo');
popupPhoto.setEventListeners();// непонятно зачем делать это здесь. Лучше сделать приватным методом и вызывать в конструкторе Popup
profileAddPhoto.addEventListener('click', () => {
  popupPhoto.open();
});

const userInfo = new UserInfo({selectorName: 'profile__name', selectorDescription: 'profile__description'});

function onProfileSubmit(formData) {
  userInfo.setUserInfo({name: formData.get('name'), description: formData.get('description')});
}

const formItemName = document.querySelector('.form__item_name');
const formItemDescription = document.querySelector('.form__item_description');

const popupProfile = new PopupWithForm('popup__profile', onProfileSubmit);
const profileButtonEdit = document.querySelector('.profile__button-edit');
popupProfile.setEventListeners();// непонятно зачем делать это здесь. Лучше сделать приватным методом и вызывать в конструкторе Popup
profileButtonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();

  formItemName.value = data.name;
  formItemName.dispatchEvent(new InputEvent('input'));
  formItemDescription.value = data.description;
  formItemDescription.dispatchEvent(new InputEvent('input'));
  popupProfile.open();
});

const config = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error'
}

const saveProfileFormValidator = new FormValidator(config, document.querySelector('.form__save-profile'));
const savePhotoFormValidator = new FormValidator(config, document.querySelector('.form__save_photo'));
const saveAvatarPhotoFormValidator = new FormValidator(config, document.querySelector('.form__save-avatar'));

saveProfileFormValidator.enableValidation();
savePhotoFormValidator.enableValidation();
saveAvatarPhotoFormValidator.enableValidation();
