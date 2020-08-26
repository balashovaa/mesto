export default class Api {
  constructor(options) {

  }

  getInitialCards(onSuccess, onError) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
      headers: {
        authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  }

  loadingUserInformation(onSuccess, onError) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
      headers: {
        authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  }

  profileEditing(user, onSuccess, onError) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  }

  addingNewCard(card, onSuccess, onError) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
      method: 'POST',
      headers: {
        authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  }

  removeCard(cardId, onSuccess, onError) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-14/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  }

  likeSetting(cardId, onSuccess, onError, onAlways) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-14/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      })
      .finally(onAlways);
  }

  removingLike(cardId, onSuccess, onError, onAlways) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-14/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      })
      .finally(onAlways);
  }

  updatingUserAvatar(avatar, onSuccess, onError) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'f9d0b5b2-0cc9-4d30-9246-1c45800f0e24',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        onError(err);
      });
  }
}


