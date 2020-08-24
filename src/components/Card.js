import PopupWithForm from "./PopupWithForm.js";

let cardToDelete;

function onConfirmDelete() {
  cardToDelete.remove();
}

const popupConfirmDelete = new PopupWithForm('popup__confirm-delete', onConfirmDelete);
popupConfirmDelete.setEventListeners();


export default class Card {
  constructor(selectorTemplateElement, handleCardClick) {
    this._selectorTemplateElement = selectorTemplateElement;
    this._handleCardClick = handleCardClick;
  }

  getElement(name, link, likes, is_deletable) {
    const elementTemplate = document.querySelector(this._selectorTemplateElement);
    const newElement = elementTemplate.cloneNode(true);
    const elementPhoto = newElement.querySelector('.element__photo');
    const likesNumberOfNewElement = newElement.querySelector('.element__likes-number');


    likesNumberOfNewElement.textContent = likes.length;
    newElement.classList.remove('element_template');
    elementPhoto.setAttribute('src', link);
    elementPhoto.setAttribute('alt', name);
    newElement.querySelector('.element__title').textContent = name;
    elementPhoto.addEventListener('click', () => {
      this._handleCardClick(name, link);
    });
    this._addLikeToElement(newElement, likesNumberOfNewElement);

    if (is_deletable) {
      this._addDeleteToElement(newElement);
    }


    return newElement;
  }

  _addLikeToElement(newElement, likesNumberOfNewElement) {
    const like = newElement.querySelector('.element__like');

    function handleLikeClick() {
      if (like.classList.contains('element__like_status_added')) {
        likesNumberOfNewElement.textContent--;
      } else {
        likesNumberOfNewElement.textContent++;
      }

      like.classList.toggle('element__like_status_added');
    }

    like.addEventListener('click', handleLikeClick);
  }

  _addDeleteToElement(newElement) {
    const deleteButton = newElement.querySelector('.element__delete-button');


    function handleDeleteButtonClick() {
      cardToDelete = newElement;
      popupConfirmDelete.open();
    }

    deleteButton.addEventListener('click', handleDeleteButtonClick);
    deleteButton.classList.add('element__delete-button_deletable');
  }
}

