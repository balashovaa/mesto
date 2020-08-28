import PopupWithForm from "./PopupWithForm.js";

let itemToDelete;
let cardToDelete;
let _api;

function onConfirmDelete(formData, onSuccess, onError) {
  _api.removeCard(itemToDelete._id, onRemoveCardSuccess, onError);

  function onRemoveCardSuccess() {
    cardToDelete.remove();
    onSuccess();
  }
}

const popupConfirmDelete = new PopupWithForm('popup__confirm-delete', onConfirmDelete, 'Удаление...');
popupConfirmDelete.setEventListeners();


export default class Card {
  constructor(item) {
    this._item = item;
  }

  static setApi(api) {
    _api = api;
  }

  static setSelectorTemplateElement(selectorTemplateElement) {
    Card._selectorTemplateElement = selectorTemplateElement;
  }

  static setHandleCardClick(handleCardClick) {
    Card._handleCardClick = handleCardClick;
  }

  static setUserId(id) {
    Card._userId = id;
  }

  getElement() {
    const item = this._item;
    const name = item.name;
    const link = item.link;
    const owner = item.owner;
    const elementTemplate = document.querySelector(Card._selectorTemplateElement);
    const newElement = elementTemplate.cloneNode(true);
    const elementPhoto = newElement.querySelector('.element__photo');


    newElement.classList.remove('element_template');
    elementPhoto.setAttribute('src', link);
    elementPhoto.setAttribute('alt', name);
    newElement.querySelector('.element__title').textContent = name;
    elementPhoto.addEventListener('click', () => {
      Card._handleCardClick(name, link);
    });
    this._addLikeToElement(newElement, item, Card._userId);

    if (owner._id === Card._userId) {
      this._addDeleteToElement(newElement, item);
    }


    return newElement;
  }

  _addLikeToElement(newElement, item, userId) {
    const like = newElement.querySelector('.element__like');
    const likesNumberOfNewElement = newElement.querySelector('.element__likes-number');


    fill(item.likes);
    like.addEventListener('click', handleLikeClick);


    function fill(likes) {
      let isILiked = false;


      for (let like of likes) {
        if (userId === like._id) {
          isILiked = true;
          break;
        }
      }

      if (isILiked) {
        like.classList.add('element__like_status_added');
      } else {
        like.classList.remove('element__like_status_added');
      }

      likesNumberOfNewElement.textContent = likes.length;
    }

    function handleLikeClick() {
      if (like.classList.contains('element__like_status_request-send') === false) {
        like.classList.add('element__like_status_request-send');

        if (like.classList.contains('element__like_status_added')) {
          removingLike();
        } else {
          likeSetting();
        }
      }
    }

    function likeSetting() {
      _api.likeSetting(item._id, onLikeSettingSuccess, onLikeSettingError, onLikeAlways);

      function onLikeSettingSuccess(item) {
        fill(item.likes);
      }

      function onLikeSettingError(errorMessage) {
        alert(errorMessage);
      }
    }

    function removingLike() {
      _api.removingLike(item._id, onRemovingLikeSuccess, onRemovingLikeError, onLikeAlways)

      function onRemovingLikeSuccess(item) {
        fill(item.likes);
      }

      function onRemovingLikeError(errorMessage) {
        alert(errorMessage);
      }
    }

    function onLikeAlways() {
      like.classList.remove('element__like_status_request-send');
    }
  }

  _addDeleteToElement(newElement, item) {
    const deleteButton = newElement.querySelector('.element__delete-button');


    function handleDeleteButtonClick() {
      itemToDelete = item;
      cardToDelete = newElement;
      popupConfirmDelete.open();
    }

    deleteButton.addEventListener('click', handleDeleteButtonClick);
    deleteButton.classList.add('element__delete-button_deletable');
  }
}

