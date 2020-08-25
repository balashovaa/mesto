export default class Api {
  constructor(options) {

  }

  getInitialCards(onSuccess, onError) { //Загрузка карточек
    setTimeout(() => {
      onSuccess([
        {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
          likes: [1, 2, 3],
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
          likes: [2, 3],
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
      ]);
    }, 1000);
  }

  loadingUserInformation(onSuccess, onError) {
    setTimeout(() => {
      onSuccess({
        "name": "Jacques Cousteau",
        "about": "Sailor, researcher",
        "avatar": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        "_id": "e20537ed11237f86bbb20ccb",
        "cohort": "cohort0"
      });
    }, 1000);
  }

  profileEditing(user, onSuccess, onError) {
    setTimeout(() => {
      onSuccess();
    }, 5000);
  }

  addingNewCard(card, onSuccess, onError) {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  }

  removeCard(cardId, onSuccess, onError) {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  }

  likeSetting(cardId, onSuccess, onError, onAlways) {
    setTimeout(() => {
      onSuccess();
      onAlways();
    }, 1000);
  }

  removingLike(cardId, onSuccess, onError, onAlways) {
    setTimeout(() => {
      onSuccess();
      onAlways();
    }, 1000);
  }

  updatingUserAvatar(avatar, onSuccess, onError) {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  }
}


