'use strict';

(function () {
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
  var createMapPin = function (pin, index) {
    var pinOfferElement = pinOfferTemplate.cloneNode(true);
    pinOfferElement.style = 'left: ' + calculatePinCoordinatX(pin.location.x, window.data.pinWidth) + 'px; ' + 'top: ' + calculatePinCoordinatY(pin.location.y - window.data.pinHeight, window.data.pinHeight) + 'px;';
    pinOfferElement.querySelector('img').src = pin.author.avatar;
    pinOfferElement.querySelector('img').alt = pin.offer.title;
    pinOfferElement.setAttribute('data-index', index);
    pinOfferElement.addEventListener('click', function () {
      window.map.closePopup();
      window.map.renderCards(pin);
      pinOfferElement.classList.add('map__pin--active');
    });
    return pinOfferElement;
  };

  window.pin = {
    createMapPin: createMapPin
  };

})();
