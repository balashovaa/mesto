export default class Popup {
  constructor(selector){
    this._popupElement = document.querySelector(`.${selector}`);
  }

  open() {
    this._popupElement.classList.add('popup_open');
    window.addEventListener('keydown', handleWindowKeyDown);
  }


  close(){
    this._popupElement.classList.remove('popup_open');
  }

  _handleEscClose(event){
    if (event.key === 'Escape') {
      this.close();
      window.removeEventListener('keydown', handleWindowKeyDown);
    }
  }

  setEventListeners(){

  }
}
