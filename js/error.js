'use strict';
(function () {
  window.showError = function (text) {
    var messageElement = document.createElement('div');
    messageElement.className = 'errorMessage';
    messageElement.textContent = text;

    var closeElement = document.createElement('span');
    closeElement.textContent = 'X';
    closeElement.addEventListener('click', function () {
      document.body.removeChild(messageElement);
    });
    messageElement.appendChild(closeElement);

    document.body.insertAdjacentElement('afterbegin', messageElement);
  };
})();
