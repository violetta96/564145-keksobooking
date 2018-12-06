'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var NEW_CARDS_QUANTITY = 8;


  var PRICE = {
    min: 1000,
    max: 1000000
  };

  var ROOMS = {
    min: 1,
    max: 5
  };

  var LOCATION_PIN = {
    x: {
      min: 200,
      max: 900
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png',
  ];

  var TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде',
  ];

  var TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo',
  ];

  var TIME = [
    '12:00',
    '13:00',
    '14:00',
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var newCards = [];
  var topLimit = LOCATION_PIN.y.min;
  var bottomLimit = LOCATION_PIN.y.max - MAIN_PIN_HEIGHT;
  var leftLimit = LOCATION_PIN.x.min;
  var rightLimit = LOCATION_PIN.x.max - MAIN_PIN_WIDTH / 2;

  // функция для генерирования случайного числа
  var getRandomNumber = function (rand) {
    return rand[Math.floor(Math.random() * rand.length)];
  };

  // функция для генерирования случайного числа в диапазоне
  var getRandomInt = function (object) {
    return Math.round(Math.random() * (object.max - object.min + 1) + object.min);
  };

  // функция для создание массива случайных характеристик
  var generateRandomFeatures = function (FeaturesArr) {
    var randomFeaturesArr = [];
    var num = Math.round(Math.random() * ((FEATURES.length - 1) - 0) + 0);
    for (var i = 0; i < num; i++) {
      randomFeaturesArr.push(FeaturesArr[i]);
    }
    return randomFeaturesArr;
  };

  // функция для наполнения массива карточками
  var generateCards = function () {
    for (var i = 0; i < NEW_CARDS_QUANTITY; i++) {
      newCards.push({
        author: {
          avatar: getRandomNumber(AVATARS),
        },
        offer: {
          title: getRandomNumber(TITLE),
          address: getRandomInt(LOCATION_PIN.x) + ',' + ' ' + getRandomInt(LOCATION_PIN.y),
          price: getRandomInt(PRICE),
          type: getRandomNumber(TYPE),
          rooms: getRandomInt(ROOMS),
          guests: Math.round(Math.random() * 10),
          checkin: getRandomNumber(TIME),
          checkout: getRandomNumber(TIME),
          features: generateRandomFeatures(FEATURES),
          description: '',
          photos: [
            getRandomNumber(PHOTOS),
            getRandomNumber(PHOTOS),
            getRandomNumber(PHOTOS),
          ],
        },
        location: {
          x: getRandomInt(LOCATION_PIN.x),
          y: getRandomInt(LOCATION_PIN.y),
        },
      });
    }
  };
  generateCards();

  window.data = {
    escKeyCode: ESC_KEYCODE,
    pinWidth: PIN_WIDTH,
    pinHeight: PIN_HEIGHT,
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    newCards: newCards,
    topLimit: topLimit,
    bottomLimit: bottomLimit,
    leftLimit: leftLimit,
    rightLimit: rightLimit,
    newCardsQuantity: NEW_CARDS_QUANTITY
  };
})();
