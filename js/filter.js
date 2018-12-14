'use strict';

(function () {
  var PRICE = {
    low: 10000,
    high: 50000
  };

  var RESET_VALUE = 'any';
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeaturesAll = document.querySelectorAll('.map__checkbox');

  window.resetFilter = function () {
    for (var i = 0; i < housingFeaturesAll.length; i++) {
      housingFeaturesAll[i].checked = false;
    }

    housingType.value = RESET_VALUE;
    housingPrice.value = RESET_VALUE;
    housingRooms.value = RESET_VALUE;
    housingGuests.value = RESET_VALUE;
  };

  var onFilterChange = window.debounce(function () {
    window.updateMapPins();
  });

  var addFilterChangeHandler = function () {
    for (var i = 0; i < housingFeaturesAll.length; i++) {
      housingFeaturesAll[i].addEventListener('change', onFilterChange);
    }

    housingType.addEventListener('change', onFilterChange);
    housingPrice.addEventListener('change', onFilterChange);
    housingRooms.addEventListener('change', onFilterChange);
    housingGuests.addEventListener('change', onFilterChange);
  };

  addFilterChangeHandler();

  var compareType = function (card) {
    return card.offer.type === housingType.value || housingType.value === RESET_VALUE;
  };
  var compareRooms = function (card) {
    return card.offer.type === +housingRooms.value || housingRooms.value === RESET_VALUE;
  };
  var compareGuests = function (card) {
    return card.offer.type === +housingGuests.value || housingGuests.value === RESET_VALUE;
  };

  var comparePrice = function (card) {
    var isPriceMatch;
    switch (housingPrice.value) {
      case 'any':
        isPriceMatch = true;
        break;
      case 'low':
        isPriceMatch = card.offer.price < PRICE.low;
        break;
      case 'middle':
        isPriceMatch = card.offer.price >= PRICE.low && card.offer.price <= PRICE.high;
        break;
      case 'high':
        isPriceMatch = card.offer.price > PRICE.high;
        break;
    }
    return isPriceMatch;
  };

  var compareFeatures = function (card) {
    var numberMatches = 0;
    var checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
    for (var i = 0; i < checkedFeatures.length; i++) {
      for (var j = 0; j < card.offer.features.length; j++) {
        if (checkedFeatures[i].value === card.offer.features[j]) {
          numberMatches++;
        }
      }
    }
    return numberMatches === checkedFeatures.length;
  };

  window.filterArray = function (array) {

    var filteredArray = array
    .filter(function (card) {
      return compareType(card) && compareRooms(card) && compareGuests(card) && comparePrice(card) && compareFeatures(card);
    });

    return filteredArray;
  };

  window.filter = {
    mapFilters: mapFilters,
  };
})();
