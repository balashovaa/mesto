export default class Card {
  _selectorTemplateElement;
  _handleCardClick;

  constructor( selectorTemplateElement, handleCardClick) {
    this._selectorTemplateElement = selectorTemplateElement;
    this._handleCardClick = handleCardClick;
  }

  getElement(name, link) {
    const elementTemplate = document.querySelector(this._selectorTemplateElement);
    const newElement = elementTemplate.cloneNode(true);

    newElement.classList.remove('element_template');
    newElement.querySelector('.element__photo').setAttribute('src', link);
    newElement.querySelector('.element__photo').setAttribute('alt', name);
    newElement.querySelector('.element__title').textContent = name;
    newElement.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick(name, link);
    });
    this._addLikeToElement(newElement);
    this._addDeleteToElement(newElement);

    return newElement;
  }

  _addLikeToElement(newElement) {
    const like = newElement.querySelector('.element__like');

    function handleLikeClick() {
      like.classList.toggle('element__like_status_added');
    }

    like.addEventListener('click', handleLikeClick);
  }

  _addDeleteToElement(newElement) {
    const deleteButton = newElement.querySelector('.element__delete-button');

    function handleDeleteButtonClick() {
      newElement.remove();
    }

    deleteButton.addEventListener('click', handleDeleteButtonClick);
  }
}

