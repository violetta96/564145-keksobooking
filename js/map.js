'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var adForm = document.querySelector('.ad-form');
  var selects = document.querySelectorAll('select');
  var inputs = document.querySelectorAll('input');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.getElementById('address');

  // функция для отрисовки меток на карте
  var renderMapPin = function () {
    for (var i = 0; i < window.data.newCardsQuantity; i++) {
      fragment.appendChild(window.pin.createMapPin(window.data.newCards[i], i));
    }
    mapPins.appendChild(fragment);
  };


  // функция для отрисовки карточек
  var renderMapCards = function (i) {
    fragment.appendChild(window.card.createCard(window.data.newCards[i]));
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  };

  // функция активирования страницы
  var activeState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.disablefields(false, inputs);
    window.disablefields(false, selects);
    renderMapPin();
    onPinClick();
  };

  // Функция для добавления обработчиков событий вызывающих показ карточки
  var onPinClick = function () {
    var mapPin = document.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPin.length; i++) {
      mapPin[i].addEventListener('click', openCard);
    }
  };

  // Функция закрытия попапа нажатием ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.escKeyCode) {
      closePopup();
    }
  };

  // Функция закрытия попапа нажатием кнопки
  var closePopup = function () {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Функция открытия карточки при клике
  var openCard = function (evt) {
    var dataIndex = evt.currentTarget.getAttribute('data-index');

    if (dataIndex) {
      renderMapCards(dataIndex);
    }

    var closePopupButton = document.querySelector('.popup__close');

    closePopupButton.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.disablefields(true, inputs);
  window.disablefields(true, selects);

  // добавление обработчика событий на главную метку
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activeState();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      switch (true) {
        case ((mapPinMain.offsetTop - shift.y) < window.data.topLimit):
          mapPinMain.style.top = window.data.topLimit + 'px';
          break;
        case ((mapPinMain.offsetTop - shift.y) > window.data.bottomLimit) :
          mapPinMain.style.top = window.data.bottomLimit + 'px';
          break;
        default:
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
          break;
      }

      switch (true) {
        case ((mapPinMain.offsetLeft - shift.x) < window.data.leftLimit):
          mapPinMain.style.left = window.data.leftLimit + 'px';
          break;
        case ((mapPinMain.offsetLeft - shift.x) > window.data.rightLimit) :
          mapPinMain.style.left = window.data.rightLimit + 'px';
          break;
        default:
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
          break;
      }
      setActiveAddressInput();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
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

  // Функция для расчета координат адреса в активном состоянии страницы
  var calculateActiveMainPinCoordinats = function () {
    return (mapPinMain.offsetLeft + (window.data.mainPinWidth / 2)) + ', ' + (mapPinMain.offsetTop + window.data.mainPinHeight);
  };

  // Функция для расчета координат адреса в неактивном состоянии страницы
  var calculateInactiveMainPinCoordinats = function () {
    return (mapPinMain.offsetLeft + (window.data.mainPinWidth / 2)) + ', ' + (mapPinMain.offsetLeft + (window.data.mainPinHeight / 2));
  };

  // Функция для заполнения поля адреса в активном состоянии страницы
  var setActiveAddressInput = function () {
    addressInput.value = calculateActiveMainPinCoordinats();
    addressInput.readOnly = true;
  };

  addressInput.value = calculateInactiveMainPinCoordinats();

})();
