export default class {
  _link;
  _name;
  _selectorTemplateElement;
  _element;
  _photoClickCallback;

  constructor(name, link, selectorTemplateElement, photoClickCallback) {
    this._name = name;
    this._link = link;
    this._selectorTemplateElement = selectorTemplateElement;
    this._photoClickCallback = photoClickCallback;

    this._element = this._createElement();
  }

  getElement() {
    return this._element;
  }

  _createElement() {
    const elementTemplate = document.querySelector(this._selectorTemplateElement);
    const newElement = elementTemplate.cloneNode(true);

    newElement.classList.remove('element_template');
    newElement.querySelector('.element__photo').setAttribute('src', this._link);
    newElement.querySelector('.element__photo').setAttribute('alt', this._name);
    newElement.querySelector('.element__title').textContent = this._name;
    newElement.querySelector('.element__photo').addEventListener('click', () => {
      this._photoClickCallback(this._name, this._link);
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

