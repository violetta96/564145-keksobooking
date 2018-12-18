'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinOfferTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // функции для расчета координат меток
  var calculatePinCoordinatX = function (coordinate, width) {
    var locationX = coordinate - width / 2;
    return locationX;
  };

  var calculatePinCoordinatY = function (coordinate, height) {
    var locationY = coordinate + height;
    return locationY;
  };

  // функция для создания меток
  var createMapPin = function (pin) {
    var pinOfferElement = pinOfferTemplate.cloneNode(true);
    if (pin.offer) {
      pinOfferElement.style = 'left: ' + calculatePinCoordinatX(pin.location.x, PIN_WIDTH) + 'px; ' + 'top: ' + calculatePinCoordinatY(pin.location.y - PIN_HEIGHT, PIN_HEIGHT) + 'px;';
      pinOfferElement.querySelector('img').src = pin.author.avatar;
      pinOfferElement.querySelector('img').alt = pin.offer.title;
    }
    var addPinAction = function () {
      pinOfferElement.addEventListener('click', function () {
        window.main.closePopup();
        window.main.renderCards(pin);
        pinOfferElement.classList.add('map__pin--active');
      });
    };
    addPinAction();
    return pinOfferElement;
  };

  window.pin = {
    createMapPin: createMapPin
  };

})();
