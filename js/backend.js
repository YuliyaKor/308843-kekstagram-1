'use strict';
window.backend = (function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var Status = {
    OK: 200,
    REQUEST_ERROR: 400,
    SERVER_ERROR: 500
  };
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('error', function () {
      var message = '';
      switch (xhr.status) {
        case Status.REQUEST_ERROR: message = 'Неверный запрос'; break;
        case Status.SERVER_ERROR: message = 'Внутренняя ошибка сервера'; break;
        default: message = 'Неизвестная ошибка: ' + xhr.status + ' ' + xhr.statusText;
      }
      onError(message);
    });
    xhr.addEventListener('load', function () {
      if (xhr.status === Status.OK) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестная ошибка: ' + xhr.status);
      }
    });
    xhr.addEventListener('timeout', function () {
      onError('Время запроса истекло');
    });
    return xhr;
  };
  return {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data', true);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL, true);
      xhr.send(data);
    }
  };

})();
