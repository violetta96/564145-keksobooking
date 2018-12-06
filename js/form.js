'use strict';

(function () {
  var roomNumberField = document.querySelector('#room_number');
  var capacityField = document.querySelector('#capacity');
  var capacityFieldOptions = capacityField.querySelectorAll('option');
  var typeField = document.querySelector('#type');
  var priceField = document.querySelector('#price');
  var timeInField = document.querySelector('#timein');
  var timeOutField = document.querySelector('#timeout');

  // Функция ограничения допустимых значений поля «Количество мест»
  var changeCapacityField = function () {
    for (var i = 0; i < capacityFieldOptions.length; i++) {
      capacityFieldOptions[i].disabled = true;
    }
    window.disablefields(false, capacityFieldOptions);
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

  // добавляем неактивное состояние полям
  window.disablefields = function (isdisabled, fields) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = isdisabled;
    }
  };

})();
