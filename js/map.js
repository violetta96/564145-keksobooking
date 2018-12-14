'use strict';

(function () {
  var MAX_PINS = 5;

  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.getElementById('address');
  var adFormReset = document.querySelector('.ad-form__reset');
  var filterArray;
  // функция отрисовки меток
  var renderPins = function (responce) {
    for (var i = 0; i < MAX_PINS; i++) {
      fragment.appendChild(window.pin.createMapPin(responce[i]));
    }
    mapPin.appendChild(fragment);
  };

  // функция отрисовки карточек
  var renderCards = function (responce) {
    var newCardo = window.card.createCard(responce);
    map.insertBefore(newCardo, map.querySelector('.map__filters-container'));
    document.querySelector('.popup__close').addEventListener('click', closePopup);
    document.addEventListener('keydown', window.onPopupEscPress);
  };

  window.updateMapPins = function () {
    var filteredPins = window.filterArray(filterArray);
    removeMapPins();
    renderPins(filteredPins);
  };

  // функция для отрисовки меток на карте
  var onLoad = function (responce) {
    renderPins(responce);
    filterArray = responce;
  };

  // функция ошибки
  var onError = function (responce) {
    var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    errorElement.querySelector('.error__message').textContent = responce;
    document.querySelector('main').appendChild(errorElement);
  };

  // функция активирования страницы
  var activeState = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.disableFieldsCheck(false);
    window.backend.load(onLoad, onError);
  };

  // функция закрытия попапа
  var closePopup = function () {
    var oldCard = map.querySelector('.map__card');
    if (oldCard) {
      document.removeEventListener('keydown', window.onPopupEscPress);
      document.querySelector('.popup__close').removeEventListener('click', closePopup);
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      map.removeChild(oldCard);
    }
  };

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

  // функция для расчета координат адреса в активном состоянии страницы
  var calculateActiveMainPinCoordinats = function () {
    return (mapPinMain.offsetLeft + (window.data.mainPinWidth / 2)) + ', ' + (mapPinMain.offsetTop + window.data.mainPinHeight);
  };

  // функция для расчета координат адреса в неактивном состоянии страницы
  var calculateInactiveMainPinCoordinats = function () {
    return (mapPinMain.offsetLeft + (window.data.mainPinWidth / 2)) + ', ' + (mapPinMain.offsetTop + (window.data.mainPinHeight / 2));
  };

  // функция для заполнения поля адреса в активном состоянии страницы
  var setActiveAddressInput = function () {
    document.getElementById('address').value = calculateActiveMainPinCoordinats();
    document.getElementById('address').readOnly = true;
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

  // функция для удаления меток с карты
  var removeMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      if (!mapPins[i].classList.contains('map__pin--main')) {
        mapPin.removeChild(mapPins[i]);
      }
    }
    removeMapCard();
  };

  // функция для удаления открытой капточки
  var removeMapCard = function () {
    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      activeCard.remove();
    }
  };

  // функция для сбрасывания страницы в исходное состояние
  var resetPage = function () {
    resetPinMain();
    removeMapPins();
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.resetForm();
    window.resetFilter();
  };

  // добавление обработчика событий на кнопку сбрасывания страницы в исходное состояние
  adFormReset.addEventListener('click', resetPage);

  window.disableFieldsCheck(true);

  addressInput.value = calculateInactiveMainPinCoordinats();

  window.map = {
    resetPage: resetPage,
    renderCards: renderCards,
    closePopup: closePopup,
  };
})();
