'use strict';

(function () {
  var MAX_PINS = 5;
  var mapPin = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var adFormReset = document.querySelector('.ad-form__reset');
  var filterArray;

  // функция для начального состояния страницы
  var setInactiveState = function () {
    window.disableFieldsCheck(true);
    window.photo.resetImages();
    window.map.setInactiveAddressField();
  };
  setInactiveState();

  // функция отрисовки меток
  var renderPins = function (responce) {
    for (var i = 0; i < Math.min(responce.length, MAX_PINS); i++) {
      fragment.appendChild(window.pin.createMapPin(responce[i]));
    }
    mapPin.appendChild(fragment);
  };

  // функция отрисовки карточек
  var renderCards = function (responce) {
    var newCardo = window.card.createCard(responce);
    map.insertBefore(newCardo, map.querySelector('.map__filters-container'));
    document.querySelector('.popup__close').addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия попапа нажатием ESC
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  // Функция обновления меток на карте
  var updateMapPins = function () {
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
  var setActiveState = function () {
    adFormReset.addEventListener('click', resetPage);
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.disableFieldsCheck(false);
    window.backend.load(onLoad, onError);
    window.form.addUpload();
    window.form.addChangeField();
    window.filter.addFilterChange();
  };

  // функция закрытия попапа
  var closePopup = function () {
    var oldCard = map.querySelector('.map__card');
    if (oldCard) {
      document.removeEventListener('keydown', onPopupEscPress);
      document.querySelector('.popup__close').removeEventListener('click', closePopup);
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      map.removeChild(oldCard);
    }
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
    window.map.resetPinMain();
    removeMapPins();
    map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.resetForm();
    window.filter.resetFilter();
    window.photo.resetImages();
    window.form.removeChangeField();
    window.filter.removeFilterChange();
  };

  window.main = {
    resetPage: resetPage,
    renderCards: renderCards,
    closePopup: closePopup,
    setActiveState: setActiveState,
    updateMapPins: updateMapPins
  };
})();
