'use strict';
(function () {
  // обозначение клавиш
  var ESC_KEYCODE = 27;
  // элемент
  var similarPictureElement = document.querySelector('.pictures');

  // заполнение блока
  var loadHandler = function (userPhotos) {
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
})();
