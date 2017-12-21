'use strict';
(function () {
  // обозначение клавиш
  var ESC_KEYCODE = 27;
  // элемент
  var similarPictureElement = document.querySelector('.pictures');

  var photos = [];
  // заполнение блока
  var loadHandler = function (userPhotos) {
    photos = userPhotos;
    renderPictures(photos);
    filtersElement.classList.remove('hidden');
  };
  var removeOldPictures = function () {
    var newPictureContainer = similarPictureElement.cloneNode();
    document.body.replaceChild(newPictureContainer, similarPictureElement);
    similarPictureElement = newPictureContainer;
  };
  var renderPictures = function (userPhotos) {
    removeOldPictures();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < userPhotos.length; i++) {
      var pictureOne = window.getPicture(userPhotos[i]);
      fragment.appendChild(pictureOne);
    }
    similarPictureElement.appendChild(fragment);
  };
  window.errorHandler = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 10% auto; text-align: center; background-color: blue;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.border = '7px solid red';
    message.style.right = 0;
    message.style.fontSize = '50px';
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  window.backend.load(loadHandler, window.errorHandler);
  // закрыть окно Esc
  window.overlayEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.overlayCloseHandler();
    }
  };
  // блок сортировки
  var filtersElement = document.querySelector('.filters');
  // сортировка картинок
  var getSortedPhotos = function (type) {
    var photosCopy = photos.slice(0);
    switch (type) {
      case 'recommend':
        return photos;
      case 'popular':
        return photosCopy.sort(function (a, b) {
          return b.likes - a.likes;
        });
      case 'discussed':
        return photosCopy.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      case 'random':
        return photosCopy.sort(function () {
          return Math.random() - 0.5;
        });
    }
    return photos;
  };
  filtersElement.addEventListener('click', function (evt) {
    var sortingFilter = evt.target.value;

    renderPictures(getSortedPhotos(sortingFilter));
  });
})();
