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



let modal = document.querySelector('.popup');
let open_popup = document.querySelector('.profile__button-edite');
let close_popup = document.querySelector('.popup__button-close')


open_popup.addEventListener('click', function (evt) {
  evt.preventDefault();
  modal.classList.add('popup_open');
});
close_popup.addEventListener('click', function () {
  modal.classList.remove('popup_open');
});

window.addEventListener('click', function () {
  if (event.target === modal) {
    modal.classList.remove('popup_open');
  }});





/*
let saveInfo = document.querySelector('.form__button');

saveInfo.addEventListener('click', function (evt) {
  let profileName = document.querySelector('.form__item_name');
  let profileInfo = document.querySelector('.form__item_description');




}





let popap = document.querySelector('.popap');
let btn_popap = document.querySelector('.profile__edite');
let cls_popap = document.querySelector('.popap__close')


btn_popap.onclick = function() {
  popap.style.display = "block";
}

cls_popap.onclick = function() {
  popap.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == popap) {
    popap.style.display = "none";
  }
}
*/
