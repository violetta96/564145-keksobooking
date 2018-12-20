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

  // функция обновляющая фильтры
  var resetFilter = function () {
    housingFeaturesAll.forEach(function (housingFeature) {
      housingFeature.checked = false;
    });

    housingType.value = RESET_VALUE;
    housingPrice.value = RESET_VALUE;
    housingRooms.value = RESET_VALUE;
    housingGuests.value = RESET_VALUE;
  };

  var onFilterChange = window.debounce(function () {
    window.main.updateMapPins();
  });

  // функция добавляющая оброботчики событий на фильтры
  var addFilterChange = function () {
    housingFeaturesAll.forEach(function (housingFeature) {
      housingFeature.addEventListener('change', onFilterChange);
    });

    housingType.addEventListener('change', onFilterChange);
    housingPrice.addEventListener('change', onFilterChange);
    housingRooms.addEventListener('change', onFilterChange);
    housingGuests.addEventListener('change', onFilterChange);
  };

  var removeFilterChange = function () {
    housingFeaturesAll.forEach(function (housingFeature) {
      housingFeature.removeEventListener('change', onFilterChange);
    });

    housingType.removeEventListener('change', onFilterChange);
    housingPrice.removeEventListener('change', onFilterChange);
    housingRooms.removeEventListener('change', onFilterChange);
    housingGuests.removeEventListener('change', onFilterChange);
  };

  var compareType = function (card) {
    return card.offer.type === housingType.value || housingType.value === RESET_VALUE;
  };

  var compareRooms = function (card) {
    return card.offer.rooms.toString() === housingRooms.value || housingRooms.value === RESET_VALUE;
  };

  var compareGuests = function (card) {
    return card.offer.guests.toString() === housingGuests.value || housingGuests.value === RESET_VALUE;
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
    var checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
    var machedFeatures = 0;
    checkedFeatures.forEach(function (feature) {
      card.offer.features.forEach(function (offer) {
        if (feature.value === offer) {
          machedFeatures++;
        }
      });
    });
    return machedFeatures === checkedFeatures.length;
  };

  // функция фильтрующая объявления
  window.filterArray = function (array) {
    var filteredArray = array
    .filter(function (card) {
      return compareType(card) && compareRooms(card) && compareGuests(card) && comparePrice(card) && compareFeatures(card);
    });

    return filteredArray;
  };

  window.filter = {
    mapFilters: mapFilters,
    resetFilter: resetFilter,
    addFilterChange: addFilterChange,
    removeFilterChange: removeFilterChange,
  };
})();
