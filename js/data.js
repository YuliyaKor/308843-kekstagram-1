'use strict';
(function () {
  // получить случайное число
  window.getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  // закрыть окно Esc
  window.overlayEscHandler = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.overlayCloseHandler();
    }
  };
  // общая функция закрыть окно
  window.overlayCloseHandler = function () {
    window.galleryOverlay.classList.add('hidden');
    window.uploadOverlay.classList.add('hidden');

    document.removeEventListener('keydown', window.overlayEscHandler);
  };
  // обозначение клавиш
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;

  // окно с картинкой
  window.galleryOverlay = document.querySelector('.gallery-overlay');
  // форма загрузки
  window.imageForm = document.querySelector('#upload-select-image');
  // поле загрузки файла
  window.aploadFile = window.imageForm.querySelector('#upload-file');
  // форма кадрирования изображения
  window.uploadOverlay = window.imageForm.querySelector('.upload-overlay');
})();
