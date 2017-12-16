'use strict';
(function () {
  // форма загрузки
  var imageForm = document.querySelector('#upload-select-image');
  // поле загрузки файла
  var aploadFile = imageForm.querySelector('#upload-file');
  // форма кадрирования изображения
  window.uploadOverlay = imageForm.querySelector('.upload-overlay');
  // открытие формы кадрирования
  aploadFile.addEventListener('change', function () {
    window.uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', window.overlayEscHandler);
  });
  // закрытие формы кадрирования
  var formCancel = imageForm.querySelector('.upload-form-cancel');
  formCancel.addEventListener('click', function () {
    window.uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.overlayEscHandler);
  });
  // отмена Esc при фокусе на комментарии
  var comment = window.uploadOverlay.querySelector('.upload-form-description');
  comment.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.overlayEscHandler);
  });
  comment.addEventListener('blur', function () {
    document.addEventListener('keydown', window.overlayEscHandler);
  });
  // поле с эффектами
  var fieldsetEffect = document.querySelector('.upload-effect-controls');
  // картинка
  var imagePreview = document. querySelector('.effect-image-preview');
  // делегирование эффектов
  var getEffect = function (target) {
    imagePreview.className = 'effect-image-preview effect-' + target + '';
    imagePreview.style = target;
    radioButton.style.left = '0px';
    radioButtonLine.style.width = '0px';
    radioLine.classList.remove('hidden');
    if (imagePreview.className === 'effect-image-preview effect-none') {
      radioLine.classList.add('hidden');
    }
  };
  window.initializeFilters(fieldsetEffect, getEffect);
  // изменение масштаба изображения
  var scaleButtons = document.querySelector('.upload-resize-controls');
  var scaleSize = function (value) {
    var index = 100;
    imagePreview.style = 'transform: scale(' + parseFloat(value) / index + ')';
  };
  window.initializeScale(scaleButtons, scaleSize);
  // валидация формы!!!!!
  var teg = document.querySelector('.upload-form-hashtags');
  var hashtagsValid = function () {
    if (teg.value.length === 0) {
      return false;
    }
    var tegSplit = teg.value.split(' ');
    var teglength = tegSplit.length;
    if (teglength > 5) {
      return true;
    }
    for (var i = 0; i < teglength; i++) {
      if (tegSplit[i][0] !== '#') {
        return true;
      }
      if (tegSplit[i].length > 20) {
        return true;
      }
      for (var j = 0; j < length; j++) {
        if (tegSplit[i].toLowerCase() === tegSplit[j].toLowerCase() && i !== j) {
          return true;
        }
      }
    }
    return false;
  };

  var submitFormHandler = function (evt) {
    if (hashtagsValid() === true) {
      teg.style.borderColor = 'red';
      evt.preventDefault();
    }
  };
  imageForm.addEventListener('submit', submitFormHandler);
  // поле с бегунком
  var radioLine = imageForm.querySelector('.upload-effect-level');
  // кнопка бегунка
  var radioButton = radioLine.querySelector('.upload-effect-level-pin');
  var radioButtonLine = radioLine.querySelector('.upload-effect-level-val');
  radioButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var start = {
      x: evt.clientX
    };
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var xMin = 0;
      var xMax = 455;
      var shift = {
        x: start.x - moveEvt.clientX
      };

      start = {
        x: moveEvt.clientX
      };
      var presentX = radioButton.offsetLeft - shift.x;
      if (presentX >= xMin && presentX <= xMax) {
        radioButton.style.left = presentX + 'px';
        radioButtonLine.style.width = presentX + 'px';
      }
      var getPreviewEffect = function () {
        switch (imagePreview.className) {
          case 'effect-image-preview effect-chrome':
            return 'filter: grayscale(' + presentX / xMax + ');';
          case 'effect-image-preview effect-sepia':
            return 'filter: sepia(' + presentX / xMax + ');';
          case 'effect-image-preview effect-marvin':
            return 'filter: invert(' + presentX * 100 / xMax + '%);';
          case 'effect-image-preview effect-phobos':
            return 'filter: blur(' + presentX * 3 / xMax + 'px);';
          case 'effect-image-preview effect-heat':
            return 'filter: brightness(' + presentX * 3 / xMax + ');';
        }
        return '';
      };
      imagePreview.style = getPreviewEffect();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
