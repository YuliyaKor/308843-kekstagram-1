'use strict';
(function () {
  // заполнить окно данными
  window.fillGalleryOverlay = function (photo) {
    window.galleryOverlay.querySelector('.gallery-overlay-image').src = photo.url;
    window.galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
    window.galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
  };
  // закрыть окно кликом
  var closeGallary = window.galleryOverlay.querySelector('.gallery-overlay-close');
  closeGallary.addEventListener('click', window.overlayCloseHandler);
  // закрыть окно клавишей
  closeGallary.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.overlayCloseHandler();
    }
  });
})();
