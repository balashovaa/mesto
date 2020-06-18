let heart_list = document.querySelectorAll('.element__like');


for (let heart of heart_list) {
  heart.addEventListener("click", function () {
    let likes_number = heart.querySelector('.element__likes-number');

    if (heart.classList.contains('added')) {
      likes_number.textContent--;
    } else {
      likes_number.textContent++;
    }

    heart.classList.toggle('added');
  });
}
