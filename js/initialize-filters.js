'use strict';
(function () {
  var initializeFilters = function (buttonEffect, effect) {
    buttonEffect.addEventListener('change', function (evt) {
      effect(evt.target.value);
    });
  };
  window.initializeFilters = initializeFilters;
})();
