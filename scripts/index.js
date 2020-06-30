let modal = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__button-edite');
let closePopup = document.querySelector('.popup__button-close')
let itemName = document.querySelector('.form__item_name');
let itemDescription = document.querySelector('.form__item_description');
let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');
let saveButton = document.querySelector('.form__button-save');

function toggleModal() {
  modal.classList.toggle('popup_open');
}

function closeModalIfOpenModal() {
  if (modal.classList.contains('popup_open')) {
    toggleModal();
  }
}

function toggleModalIfConfirm() {
  if (confirm('Желаете закрыть окно без сохранения?')) {
    toggleModal();
  }
}

function handleOpenPopupClick() {
  itemName.value = userName.textContent;
  itemDescription.value = userDescription.textContent;

  toggleModal();
}

function handleModalClick(event) {
  if (event.target === modal) {
    toggleModalIfConfirm();
  }
}

function handleWindowKeyDown(event) {
  if (event.key === 'Escape') {
    closeModalIfOpenModal();
  }
}

function handleSaveButtonClick(event) {
  event.preventDefault();

  userName.textContent = itemName.value;
  userDescription.textContent = itemDescription.value;

  toggleModal();
}

function handleClosePopupClick() {
  toggleModalIfConfirm();
}

openPopup.addEventListener('click', handleOpenPopupClick);
closePopup.addEventListener('click', handleClosePopupClick);
modal.addEventListener('click', handleModalClick);
saveButton.addEventListener('click', handleSaveButtonClick);
window.addEventListener("keydown", handleWindowKeyDown, true);

let addPhotoButton = document.querySelector('.profile__add-photo');
let itemPlace = document.querySelector('.form__item_place');
let itemPlaceLink = document.querySelector('.form__item_place-link');
let modalPhoto = document.querySelector('.popup__photo');

function handleAddPhotoButtonClick() {
  modalPhoto.classList.toggle('popup_open');
}

function closeModalPhotoIfOpenModal() {
  if (modalPhoto.classList.contains('popup_open')) {
    toggleModal();
  }
}

addPhotoButton.addEventListener('click', handleAddPhotoButtonClick);



let heart_list = document.querySelectorAll('.element__like');


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
