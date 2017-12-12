'use strict';
(function () {
  // обозначение клавиш
  var ESC_KEYCODE = 27;
  // элемент
  var similarPictureElement = document.querySelector('.pictures');
  // заполнение блока
  var renderPictures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.userPhotos.length; i++) {
      var pictureOne = window.getPicture(window.userPhotos[i]);
      pictureOne.addEventListener('click', pictureClickHandler(i));
      fragment.appendChild(pictureOne);
    }
    similarPictureElement.appendChild(fragment);
  };
  var pictureClickHandler = function (i) {
    return function (evt) {
      evt.preventDefault();
      window.galleryOverlay.classList.remove('hidden');
      document.addEventListener('keydown', window.overlayEscHandler);
      window.fillGalleryOverlay(window.userPhotos[i]);
    };
  };
  renderPictures();
  // закрыть окно Esc
  window.overlayEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.overlayCloseHandler();
    }
  };
})();
