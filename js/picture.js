'use strict';
(function () {
  // шаблон
  var similarPictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  // заполнение шаблона
  window.getPicture = function (picture) {
    var newPicture = similarPictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = picture.url;
    newPicture.querySelector('.picture-likes').textContent = picture.likes;
    newPicture.querySelector('.picture-comments').textContent = picture.comments.length;
    return newPicture;
  };
})();
