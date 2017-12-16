'use strict';
(function () {
  window.initializeScale = function (buttonField, transformStyle) {
    var MAX = 100;
    var STEP = 25;
    var buttonSmall = buttonField.querySelector('.upload-resize-controls-button-dec');
    var buttonBig = buttonField.querySelector('.upload-resize-controls-button-inc');
    var buttonValue = buttonField.querySelector('.upload-resize-controls-value');

    buttonField.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target === buttonSmall && parseFloat(buttonValue.value) > STEP) {
        buttonValue.value = '' + (parseFloat(buttonValue.value) - STEP) + '%';
      } else if (target === buttonBig && parseFloat(buttonValue.value) < MAX) {
        buttonValue.value = '' + (parseFloat(buttonValue.value) + STEP) + '%';
      }
      transformStyle(buttonValue.value);
    });
  };
})();
