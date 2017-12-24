'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.handlers = {
    pressEscHandler: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb();
      }
    },
    pressEnterHandler: function (evt, cb) {
      if (evt.keyCode === ENTER_KEYCODE) {
        cb();
      }
    }
  };
})();
