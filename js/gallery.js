'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_TIME = 500;
  // элемент
  var picturesElement = document.querySelector('.pictures');

  var photos = [];
  // заполнение блока
  var loadHandler = function (userPhotos) {
    photos = userPhotos;
    renderPictures(photos);
    filtersElement.classList.remove('hidden');
  };

  var removeOldPictures = function () {
    var newPicturesElement = picturesElement.cloneNode();
    document.body.replaceChild(newPicturesElement, picturesElement);
    picturesElement = newPicturesElement;
  };

  var renderPictures = function (userPhotos) {
    removeOldPictures();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < userPhotos.length; i++) {
      var pictureOne = window.getPicture(userPhotos[i]);
      fragment.appendChild(pictureOne);
    }
    picturesElement.appendChild(fragment);
  };

  window.errorHandler = function (errorMessage) {
    var messageElement = document.createElement('div');
    messageElement.className = 'errorMessage';
    messageElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', messageElement);
  };

  window.backend.load(loadHandler, window.errorHandler);
  // закрыть окно Esc
  window.overlayEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.preview.overlayCloseHandler();
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
    var sortedPhotos = getSortedPhotos(sortingFilter);

    debounce(function () {
      renderPictures(sortedPhotos);
    });
  });
  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    setTimeout(cb, DEBOUNCE_TIME);
  };
})();
