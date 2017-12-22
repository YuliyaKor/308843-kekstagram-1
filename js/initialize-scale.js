'use strict';
(function () {
  window.initializeScale = function (scaleElement, cb) {
    var MAX = 100;
    var STEP = 25;
    var buttonDecElement = scaleElement.querySelector('.upload-resize-controls-button-dec');
    var valueElement = scaleElement.querySelector('.upload-resize-controls-value');

    scaleElement.addEventListener('click', function (evt) {
      var target = evt.target;
      var mark = 1;
      if (target === buttonDecElement) {
        mark = -1;
      }
      var value = parseInt(valueElement.value, 10) + STEP * mark;
      if (value <= MAX && value >= STEP) {
        valueElement.value = value + '%';
        cb(valueElement.value);
      }
    });
  };
})();
