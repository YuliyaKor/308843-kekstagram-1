'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var overlayElement = document.querySelector('.gallery-overlay');
  window.preview = {
    fillGalleryOverlay: function (photo) {
      overlayElement.querySelector('.gallery-overlay-image').src = photo.url;
      overlayElement.querySelector('.likes-count').textContent = photo.likes;
      overlayElement.querySelector('.comments-count').textContent = photo.comments.length;
      overlayElement.classList.remove('hidden');
    },
    overlayCloseHandler: function () {
      overlayElement.classList.add('hidden');
      document.querySelector('.upload-overlay').classList.add('hidden');
      document.removeEventListener('keydown', window.overlayEscHandler);
    }
  };

  var closeElement = overlayElement.querySelector('.gallery-overlay-close');
  closeElement.addEventListener('click', window.preview.overlayCloseHandler);
  // закрыть окно клавишей
  closeElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.preview.overlayCloseHandler();
    }
  });
})();
