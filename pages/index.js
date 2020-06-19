let modal = document.querySelector('.popup');
let open_popup = document.querySelector('.profile__button-edite');
let close_popup = document.querySelector('.popup__button-close')
let item_name = document.querySelector('.form__item_name');
let item_description = document.querySelector('.form__item_description');
let user_name = document.querySelector('.profile__name');
let user_description = document.querySelector('.profile__description');
let save_button = document.querySelector('.form__button-save');

function toggleModal() {
  modal.classList.toggle('popup_open');
}

function ifModalOpenThenCloseModal() {
  if (modal.classList.contains('popup_open')) {
    toggleModal();
  }
}

function ifConfirmThenToggleModal() {
  if (confirm('Желаете закрыть окно без сохранения?')) {
    toggleModal();
  }
}

open_popup.addEventListener(
  'click',
  function () {
    item_name.value = user_name.textContent;
    item_description.value = user_description.textContent;

    toggleModal();
  }
);

close_popup.addEventListener('click', function () {
    ifConfirmThenToggleModal();
  }
);

modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    ifConfirmThenToggleModal();
  }
});

save_button.addEventListener('click', function () {
  user_name.textContent = item_name.value;
  user_description.textContent = item_description.value;

  toggleModal();
});

window.addEventListener(
  "keydown",
  function (event) {
    if (event.key !== undefined) {
      if (event.key === 'Escape') {
        ifModalOpenThenCloseModal();
      }
    } else if (event.keyCode !== undefined) {
      if (event.keyCode === 27) {
        ifModalOpenThenCloseModal();
      }
    }
  },
  true);


let heart_list = document.querySelectorAll('.element__like');
let addPhoto_button = document.querySelector('.profile__add-photo');


for (let heart of heart_list) {
  heart.addEventListener("click", function () {
    let likes_number = heart.querySelector('.element__likes-number');

    if (heart.classList.contains('element__like_status_added')) {
      likes_number.textContent--;
    } else {
      likes_number.textContent++;
    }

    heart.classList.toggle('element__like_status_added');
  });
}

addPhoto_button.addEventListener('click', function () {
  alert(`Пока мы не умеем загружать фото, но мы развиваемся :-)`);
});
