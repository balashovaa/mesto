import './index.css';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24',
    'Content-Type': 'application/json'
  }
});


const popupWithImage = new PopupWithImage('popup__photo-card');
popupWithImage.setEventListeners();// непонятно зачем делать это здесь. Лучше сделать приватным методом и вызывать в конструкторе Popup

function handleOpenImagePopupClick(name, link) {
  popupWithImage.open(name, link);
}

const card = new Card('.element_template', handleOpenImagePopupClick, api);

function renderer(item) {
  return card.getElement(item.name, item.link, item.likes, item.is_deletable);
}

api.getInitialCards(onInitialCardsSuccess, onInitialCardsError);

function onInitialCardsSuccess(listOfCard) {
  const section = new Section({items: listOfCard, renderer: renderer}, '.element__cards');
  section.renderItems();

  function onPhotoSubmit(formData) {
    api.addingNewCard({
      name: formData.get('place'),
      link: formData.get('place-link')
    }, onAddingNewCardSuccess, onAddingNewCardError);

    function onAddingNewCardSuccess(){
      section.addItem(card.getElement(formData.get('place'), formData.get('place-link'), [], true));
    }

    function onAddingNewCardError(errorMessage){
      alert(errorMessage);
    }
  }

  const popupPhoto = new PopupWithForm('popup__photo', onPhotoSubmit);
  const profileAddPhoto = document.querySelector('.profile__add-photo');
  popupPhoto.setEventListeners();// непонятно зачем делать это здесь. Лучше сделать приватным методом и вызывать в конструкторе Popup
  profileAddPhoto.addEventListener('click', () => {
    popupPhoto.open();
  });
}

function onInitialCardsError(errorMessage) {
  alert(errorMessage);
}

api.loadingUserInformation(onLoadingUserInformationSuccess, onLoadingUserInformationError);

function onLoadingUserInformationSuccess(user) {
  const userInfo = new UserInfo({selectorName: 'profile__name', selectorDescription: 'profile__description'});
  const avatarPhoto = document.querySelector('.profile__photo');


  userInfo.setUserInfo({name: user.name, description: user.about});
  avatarPhoto.setAttribute('src', user.avatar);


  function onProfileSubmit(formData) {
    api.profileEditing({
      name: formData.get('name'),
      about: formData.get('description')
    }, onProfileSubmitSuccess, onProfileSubmitError);

    function onProfileSubmitSuccess(){
      userInfo.setUserInfo({name: formData.get('name'), description: formData.get('description')});
    }

    function onProfileSubmitError(errorMessage){
      alert(errorMessage);
    }
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


  function onUpdateAvatar(formData) {
    api.updatingUserAvatar(formData.get('avatar-link'), onUpdatingUserAvatarSuccess, onUpdatingUserAvatarError);

    function onUpdatingUserAvatarSuccess(){
      avatarPhoto.setAttribute('src', formData.get('avatar-link'));
    }

    function onUpdatingUserAvatarError(errorMessage){
      alert(errorMessage);
    }
  }

  const popupAvatar = new PopupWithForm('popup__avatar', onUpdateAvatar);
  const popupEditAvatarButton = document.querySelector('.profile__avatar-edit');
  popupAvatar.setEventListeners();
  popupEditAvatarButton.addEventListener('click', () => {
    popupAvatar.open()
  });
}

function onLoadingUserInformationError(errorMessage) {
  alert(errorMessage);
}

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
