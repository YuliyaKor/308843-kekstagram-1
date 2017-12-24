'use strict';
(function () {
  var overlayElement = document.querySelector('.gallery-overlay');
  var imageElement = overlayElement.querySelector('.gallery-overlay-image');
  var likesElement = overlayElement.querySelector('.likes-count');
  var commentsElement = overlayElement.querySelector('.comments-count');
  window.preview = {
    fillGalleryOverlay: function (photo) {
      imageElement.src = photo.url;
      likesElement.textContent = photo.likes;
      commentsElement.textContent = photo.comments.length;
      overlayElement.classList.remove('hidden');
    },
    overlayCloseHandler: function () {
      overlayElement.classList.add('hidden');
      document.removeEventListener('keydown', window.overlayEscHandler);
    }
  };

  var closeElement = overlayElement.querySelector('.gallery-overlay-close');
  closeElement.addEventListener('click', window.preview.overlayCloseHandler);
  // закрыть окно клавишей
  closeElement.addEventListener('keydown', function (evt) {
    window.handlers.pressEnterHandler(evt, window.preview.overlayCloseHandler);
  });
})();
