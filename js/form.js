'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomNumberField = document.querySelector('#room_number');
  var capacityField = document.querySelector('#capacity');
  var capacityFieldOptions = capacityField.querySelectorAll('option');
  var typeField = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var timeInField = document.querySelector('#timein');
  var timeOutField = document.querySelector('#timeout');
  var successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var errorButton = document.querySelector('.error__button');
  var selects = document.querySelectorAll('select');
  var inputs = document.querySelectorAll('input');
  var textarea = document.querySelectorAll('textarea');

  //   Функция ограничения допустимых значений поля «Количество мест»
  var changeCapacityField = function () {
    for (var i = 0; i < capacityFieldOptions.length; i++) {
      capacityFieldOptions[i].disabled = true;
    }
    disableFields(false, capacityFieldOptions);
    switch (roomNumberField.value) {
      case '1': {
        capacityField.querySelector('option[value="1"]').disabled = false;
        capacityField.querySelector('option[value="1"]').selected = true;
        break;
      }
      case '2': {
        capacityField.querySelector('option[value="1"]').disabled = false;
        capacityField.querySelector('option[value="2"]').disabled = false;
        capacityField.querySelector('option[value="1"]').selected = true;
        break;
      }
      case '3': {
        capacityField.querySelector('option[value="1"]').disabled = false;
        capacityField.querySelector('option[value="2"]').disabled = false;
        capacityField.querySelector('option[value="3"]').disabled = false;
        capacityField.querySelector('option[value="1"]').selected = true;
        break;
      }
      case '100': {
        capacityField.querySelector('option[value="0"]').disabled = false;
        capacityField.querySelector('option[value="0"]').selected = true;
        break;
      }
      default: {
        break;
      }
    }
  };

  // Функция ограничения допустимых значений поля «Время заезда»
  var changeTimeInField = function () {
    switch (timeOutField.value) {
      case '12:00': {
        timeInField.value = '12:00';
        break;
      }
      case '13:00': {
        timeInField.value = '13:00';
        break;
      }
      case '14:00': {
        timeInField.value = '14:00';
        break;
      }
      default: {
        break;
      }
    }
  };

  // Функция ограничения допустимых значений поля «Время выезда»
  var changeTimeOutField = function () {
    switch (timeInField.value) {
      case '12:00': {
        timeOutField.value = '12:00';
        break;
      }
      case '13:00': {
        timeOutField.value = '13:00';
        break;
      }
      case '14:00': {
        timeOutField.value = '14:00';
        break;
      }
      default: {
        break;
      }
    }
  };

  // Функция ограничения минимального значение поля «Цена за ночь»
  var changeMinPrice = function () {
    switch (typeField.value) {
      case 'bungalo': {
        priceField.min = 0;
        priceField.placeholder = 0;
        break;
      }
      case 'flat': {
        priceField.min = 1000;
        priceField.placeholder = 1000;
        break;
      }
      case 'house': {
        priceField.min = 5000;
        priceField.placeholder = 5000;
        break;
      }
      case 'palace': {
        priceField.min = 10000;
        priceField.placeholder = 10000;
        break;
      }
      default: {
        break;
      }
    }
  };

  roomNumberField.addEventListener('change', changeCapacityField);
  timeOutField.addEventListener('change', changeTimeInField);
  timeInField.addEventListener('change', changeTimeOutField);
  typeField.addEventListener('change', changeMinPrice);

  var resetForm = function () {
    adForm.querySelector('#title').value = '';
    adForm.querySelector('#type').value = 'flat';
    adForm.querySelector('#price').value = '';
    adForm.querySelector('#room_number').value = '1';
    adForm.querySelector('#capacity').value = '3';
    adForm.querySelector('#timein').value = '12:00';
    adForm.querySelector('#timeout').value = '12:00';
    adForm.querySelector('#description').textContent = '';

    var features = document.querySelectorAll('.feature__checkbox');
    for (var i = 0; i < features.length; i++) {
      features[i].checked = false;
    }
    window.disableFieldsCheck(true);
  };

  // Добавляем событие проверки результата отправки формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onLoad, onError);
  });

  // Функция показывающая сообщение об ошибке отправке данных
  var onError = function () {
    document.querySelector('main').appendChild(errorElement);
    openPopup(errorElement);
  };

  // Функция показывающая сообщение об успешной отправке данных
  var onLoad = function () {
    document.querySelector('main').appendChild(successElement);
    openPopup(successElement);
    window.map.resetPage();
  };

  // Функция закрытия попапа об отправке формы
  var closePopup = function () {
    var success = document.querySelector('.success');
    var error = document.querySelector('.error');

    document.removeEventListener('keydown', window.onPopupEscPress);
    document.removeEventListener('click', openPopup);
    document.removeEventListener('click', errorButton);

    if (success) {
      document.querySelector('.success').remove();
    }

    if (error) {
      document.querySelector('.error').remove();
    }
  };

  // Функция открытия попапа об отправке формы
  var openPopup = function (popup) {
    document.addEventListener('keydown', window.onPopupEscPress);
    document.addEventListener('click', errorButton);
    document.addEventListener('click', closePopup);
    document.querySelector('main').appendChild(popup);
  };

  // добавляем неактивное состояние полям
  var disableFields = function (isdisabled, fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = isdisabled;
    }
  };

  // проверяем состояние полей
  window.disableFieldsCheck = function (isfielddisabled) {
    disableFields(isfielddisabled, inputs);
    disableFields(isfielddisabled, selects);
    disableFields(isfielddisabled, textarea);
  };

  // Функция закрытия попапа нажатием ESC
  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.escKeyCode) {
      closePopup();
    }
  };

  window.form = {
    adForm: adForm,
    resetForm: resetForm,
    errorElement: errorElement
  };
})();
