'use strict';
(function () {
  window.initializeFilters = function (buttonEffect, effect) {
    buttonEffect.addEventListener('change', function (evt) {
      effect(evt.target.value);
    });
  };
})();
