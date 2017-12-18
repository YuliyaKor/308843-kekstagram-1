'use strict';
(function () {
  window.initializeScale = function (buttonField, transformStyle) {
    var MAX = 100;
    var STEP = 25;
    var buttonSmall = buttonField.querySelector('.upload-resize-controls-button-dec');
    // var buttonBig = buttonField.querySelector('.upload-resize-controls-button-inc');
    var buttonValue = buttonField.querySelector('.upload-resize-controls-value');

    buttonField.addEventListener('click', function (evt) {
      var target = evt.target;
      var mark = 1;
      if (target === buttonSmall) {
        mark = -1;
      }
      var value = parseInt(buttonValue.value, 10) + STEP * mark;
      if (value <= MAX && value >= STEP) {
        buttonValue.value = value + '%';
        transformStyle(buttonValue.value);
      }
    });
  };
})();
