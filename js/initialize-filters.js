'use strict';
(function () {
  window.initializeFilters = function (effectElement, cb) {
    effectElement.addEventListener('change', function (evt) {
      cb(evt.target.value);
    });
  };
})();
