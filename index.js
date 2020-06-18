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
