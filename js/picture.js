'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  var pictureClickHandler = function (picture) {
    return function (evt) {
      evt.preventDefault();

      document.addEventListener('keydown', window.overlayEscHandler);
      window.preview.fillGalleryOverlay(picture);
    };
  };

  window.getPicture = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = picture.url;
    newPicture.querySelector('.picture-likes').textContent = picture.likes;
    newPicture.querySelector('.picture-comments').textContent = picture.comments.length;
    newPicture.addEventListener('click', pictureClickHandler(picture));

    return newPicture;
  };
})();
