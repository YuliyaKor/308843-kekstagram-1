'use strict';
(function () {
  var MAX_TAGS_COUNT = 5;
  var TAG_MAX_LENGTH = 20;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imageFormElement = document.querySelector('#upload-select-image');
  var hashtagsElement = document.querySelector('.upload-form-hashtags');
  var uploadOverlayElement = imageFormElement.querySelector('.upload-overlay');
  var effectControlsElement = document.querySelector('.upload-effect-controls');
  var imagePreviewElement = document.querySelector('.effect-image-preview');

  var successSendHandler = function () {
    resetForm();
  };
  var resetForm = function () {
    imageFormElement.reset();
    uploadOverlayElement.classList.add('hidden');
    imagePreviewElement.className = 'effect-image-preview';
    imagePreviewElement.src = '';
    document.removeEventListener('keydown', closeFormEscHandler);
  };
  imageFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (!validateForm()) {
      hashtagsElement.style.borderColor = 'red';
    } else {
      window.backend.save(new FormData(imageFormElement), successSendHandler, window.errorHandler);
    }
  });
  // закрытие формы кадрирования
  var formCancel = imageFormElement.querySelector('.upload-form-cancel');
  formCancel.addEventListener('click', function () {
    resetForm();
  });
  // отмена Esc при фокусе на комментарии
  var comment = uploadOverlayElement.querySelector('.upload-form-description');
  comment.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.overlayEscHandler);
  });
  comment.addEventListener('blur', function () {
    document.addEventListener('keydown', window.overlayEscHandler);
  });
  // делегирование эффектов
  var getEffect = function (effect) {
    imagePreviewElement.className = 'effect-image-preview effect-' + effect + '';
    imagePreviewElement.style.filter = '';
    radioButton.style.left = '100%';
    radioButtonLine.style.width = '100%';
    radioLine.classList.remove('hidden');
    if (imagePreviewElement.className === 'effect-image-preview effect-none') {
      radioLine.classList.add('hidden');
    }
  };
  window.initializeFilters(effectControlsElement, getEffect);
  // изменение масштаба изображения
  var scaleButtons = document.querySelector('.upload-resize-controls');
  var scaleSize = function (value) {
    var index = 100;
    imagePreviewElement.style = 'transform: scale(' + parseFloat(value) / index + ')';
  };
  window.initializeScale(scaleButtons, scaleSize);
  // валидация формы!!!!!
  var validateForm = function () {
    var value = hashtagsElement.value;
    if (value === '') {
      return true;
    }
    value = value.toLowerCase();
    var tagSplit = value.split(' ');
    var tagLength = tagSplit.length;
    if (tagLength > MAX_TAGS_COUNT) {
      return false;
    }
    for (var i = 0; i < tagLength; i++) {
      if (tagSplit[i][0] !== '#' || tagSplit[i].length > TAG_MAX_LENGTH || tagSplit.indexOf(tagSplit[i], i + 1) !== -1) {
        return false;
      }
    }
    return true;
  };

  // поле с бегунком
  var radioLine = imageFormElement.querySelector('.upload-effect-level');
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
      imagePreviewElement.style.filter = getPreviewEffect(selectedEffectRadio.value, presentX / xMax);
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
  var closeFormEscHandler = function (evt) {
    window.handlers.pressEscHandler(evt, resetForm);
  };
  //  загрузка изображения
  var fileSelection = document.querySelector('.upload-image input[type=file]');

  fileSelection.addEventListener('change', function () {
    var file = fileSelection.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var isImageFile = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (isImageFile) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          imagePreviewElement.src = reader.result;
          uploadOverlayElement.classList.remove('hidden');
          document.addEventListener('keydown', closeFormEscHandler);
        });
        reader.readAsDataURL(file);
      } else {
        window.errorHandler('Допустимое расширение файла: ' + FILE_TYPES.join(', '));
      }
    }
  });
})();
