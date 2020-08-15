export default class Popup {
  _popupElement;


  constructor(selector) {
    this._popupElement = document.querySelector(`.${selector}`);
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add('popup_open');

    this._escHandler = (event) => {
      this._handleEscClose(event);
    };
    window.addEventListener('keydown', this._escHandler);
  }


  close() {
    this._popupElement.classList.remove('popup_open');
    window.removeEventListener('keydown', this._escHandler);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__button-close').addEventListener('click', () => {
      this.close();
    });
  }
}


