'use strict';
(function () {
  // форма загрузки
  var imageForm = document.querySelector('#upload-select-image');
  // поле загрузки файла
  var uploadFile = imageForm.querySelector('#upload-file');
  // поле с тегами
  var tag = document.querySelector('.upload-form-hashtags');
  // форма кадрирования изображения
  window.uploadOverlay = imageForm.querySelector('.upload-overlay');
  // отправка формы на сервер
  var successSendHandler = function () {
    imageForm.reset();
    window.uploadOverlay.classList.add('hidden');
  };

  imageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (hashtagsValid() === true) {
      tag.style.borderColor = 'red';
    } else {
      window.backend.save(new FormData(imageForm), successSendHandler, window.errorHandler);
    }
  });

  // открытие формы кадрирования
  uploadFile.addEventListener('change', function () {
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
  var getEffect = function (effect) {
    imagePreview.className = 'effect-image-preview effect-' + effect + '';
    imagePreview.style.filter = '';
    radioButton.style.left = '100%';
    radioButtonLine.style.width = '100%';
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
  var hashtagsValid = function () {
    if (tag.value.length === 0) {
      return false;
    }
    var tagSplit = tag.value.split(' ');
    var taglength = tagSplit.length;
    if (taglength > 5) {
      return true;
    }
    for (var i = 0; i < taglength; i++) {
      if (tagSplit[i][0] !== '#') {
        return true;
      }
      if (tagSplit[i].length > 20) {
        return true;
      }
      for (var j = 0; j < length; j++) {
        if (tagSplit[i].toLowerCase() === tagSplit[j].toLowerCase() && i !== j) {
          return true;
        }
      }
    }
    return false;
  };

  // поле с бегунком
  var radioLine = imageForm.querySelector('.upload-effect-level');
  // кнопка бегунка
  var radioButton = radioLine.querySelector('.upload-effect-level-pin');
  var radioButtonLine = radioLine.querySelector('.upload-effect-level-val');
  radioButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var selectedEffectRadio = document.querySelector('input[name="effect"]:checked');
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
      imagePreview.style.filter = getPreviewEffect(selectedEffectRadio.value, presentX / xMax);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var getPreviewEffect = function (effect, value) {
    switch (effect) {
      case 'chrome': return 'grayscale(' + value + ')';
      case 'sepia': return 'sepia(' + value + ')';
      case 'marvin': return 'invert(' + value * 100 + '%)';
      case 'phobos': return 'blur(' + value * 3 + 'px)';
      case 'heat': return 'brightness(' + value * 3 + ')';
      default: return '';
    }
  };
})();
