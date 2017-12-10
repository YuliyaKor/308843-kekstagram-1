'use strict';
(function () {
  // шаблон
  var similarPictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  // элемент
  var similarPictureElement = document.querySelector('.pictures');
  // заполнение шаблона
  var getPicture = function (picture) {
    var newPicture = similarPictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = picture.url;
    newPicture.querySelector('.picture-likes').textContent = picture.likes;
    newPicture.querySelector('.picture-comments').textContent = picture.comments.length;
    return newPicture;
  };
  // заполнение блока
  var renderPictures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.userPhotos.length; i++) {
      var pictureOne = getPicture(window.userPhotos[i]);
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
})();
