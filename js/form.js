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
  fieldsetEffect.addEventListener('change', function (evt) {
    var target = evt.target.value;
    imagePreview.className = 'effect-image-preview effect-' + target + '';
    radioButton.style.left = '0px';
    radioButtonLine.style.width = '0px';
    imagePreview.style = target;
    radioLine.classList.remove('hidden');
    if (target === 'none') {
      radioLine.classList.add('hidden');
    }
  });
  // изменение масштаба изображения
  var buttonSmall = document.querySelector('.upload-resize-controls-button-dec');
  var buttonBig = document.querySelector('.upload-resize-controls-button-inc');
  var buttonValue = document.querySelector('.upload-resize-controls-value');
  buttonSmall.addEventListener('click', function () {
    if (parseFloat(buttonValue.value) > +buttonValue.min) {
      buttonValue.value = '' + (parseFloat(buttonValue.value) - buttonValue.step) + '%';
      imagePreview.style = 'transform: scale(' + parseFloat(buttonValue.value) / buttonValue.max + ')';
    }
  });
  buttonBig.addEventListener('click', function () {
    if (parseFloat(buttonValue.value) < +buttonValue.max) {
      buttonValue.value = '' + (parseFloat(buttonValue.value) + +buttonValue.step) + '%';
      imagePreview.style = 'transform: scale(' + parseFloat(buttonValue.value) / buttonValue.max + ')';
    }
  });
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
        if (imagePreview.className === 'effect-image-preview effect-chrome') {
          imagePreview.style = 'filter: grayscale(' + presentX / xMax + ');';
        } else if (imagePreview.className === 'effect-image-preview effect-sepia') {
          imagePreview.style = 'filter: sepia(' + presentX / xMax + ');';
        } else if (imagePreview.className === 'effect-image-preview effect-marvin') {
          imagePreview.style = 'filter: invert(' + presentX * 100 / xMax + '%);';
        } else if (imagePreview.className === 'effect-image-preview effect-phobos') {
          imagePreview.style = 'filter: blur(' + presentX * 3 / xMax + 'px);';
        } else if (imagePreview.className === 'effect-image-preview effect-heat') {
          imagePreview.style = 'filter: brightness(' + presentX * 3 / xMax + ');';
        }
      };
      getPreviewEffect();
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
