export default class UserInfo {
  constructor({selectorName, selectorDescription}) {
    this._elementName = document.querySelector(`.${selectorName}`);
    this._elementDescription = document.querySelector(`.${selectorDescription}`);
  }

  getUserInfo() {
    return {
      name: this._elementName.textContent,
      description: this._elementDescription.textContent
    }
  }

  setUserInfo({name, description}) {
    this._elementName.textContent = name;
    this._elementDescription.textContent = description;
  }
}
