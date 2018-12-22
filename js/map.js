'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var TOP = 130;
  var LEFT = 0;
  var BOTTOM = 630;
  var RIGHT = 1200;
  var mouseUpCallback;

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  // добавление обработчика событий на главную метку
  var addMapPinMove = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var diffX = evt.clientX - mapPinMain.offsetLeft;

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX - diffX,
          y: moveEvt.clientY
        };

        var top = mapPinMain.offsetTop - shift.y;

        if (top < TOP) {
          mapPinMain.style.top = TOP + 'px';
        } else if (top > (BOTTOM - MAIN_PIN_HEIGHT)) {
          mapPinMain.style.top = (BOTTOM - MAIN_PIN_HEIGHT) + 'px';
        } else {
          mapPinMain.style.top = top + 'px';
        }

        if (startCoords.x > RIGHT) {
          mapPinMain.style.left = RIGHT + 'px';
        } else if (startCoords.x < LEFT) {
          mapPinMain.style.left = LEFT + 'px';
        } else {
          mapPinMain.style.left = startCoords.x + 'px';
        }

        setActiveAddressInput();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        if (mouseUpCallback) {
          mouseUpCallback();
          mouseUpCallback = null;
        }
        mapPinMain.addEventListener('click', setActiveAddressInput);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function () {
            mapPinMain.removeEventListener('click', onClickPreventDefault);
          };
          mapPinMain.addEventListener('click', onClickPreventDefault);
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  addMapPinMove();


  // функция для расчета координат адреса в активном состоянии страницы
  var calculateActiveMainPinCoordinats = function () {
    return (mapPinMain.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (mapPinMain.offsetTop + MAIN_PIN_HEIGHT);
  };

  // функция для расчета координат адреса в неактивном состоянии страницы
  var calculateInactiveMainPinCoordinats = function () {
    return (mapPinMain.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (mapPinMain.offsetTop + (MAIN_PIN_HEIGHT / 2));
  };

  // функция для заполнения поля адреса в активном состоянии страницы
  var setActiveAddressInput = function () {
    document.querySelector('#address').value = calculateActiveMainPinCoordinats();
    document.querySelector('#address').readOnly = true;
  };

  // функция для возвращения поля адресса в исходное положение
  var setDisabledAddressField = function () {
    addressInput.placeholder = calculateInactiveMainPinCoordinats();
    addressInput.value = calculateInactiveMainPinCoordinats();
    addressInput.readOnly = true;
  };

  // функция для возвращения главной метки в исходное положение
  var resetPinMain = function () {
    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';
    setDisabledAddressField();
  };

  var setInactiveAddressField = function () {
    addressInput.value = calculateInactiveMainPinCoordinats();
  };

  window.map = {
    setInactiveAddressField: setInactiveAddressField,
    resetPinMain: resetPinMain,
    mapPinMain: mapPinMain,
    setMouseUpCallback: function (callback) {
      mouseUpCallback = callback;
    },
  };
})();
