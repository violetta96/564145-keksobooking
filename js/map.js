'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;


var PRICE = {
  min: 1000,
  max: 1000000
};

var ROOMS = {
  min: 1,
  max: 5
};

var LOCATION = {
  x: {
    min: 200,
    max: 800
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
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinOfferTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();

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

// функция для задания типа жилья
var setType = function (element, card) {
  switch (true) {
    case (card.type === 'flat'):
      element.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case (card.type === 'bungalo') :
      element.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case (card.type === 'house') :
      element.querySelector('.popup__type').textContent = 'Дом';
      break;
    case (card.type === 'palace') :
      element.querySelector('.popup__type').textContent = 'Дворец';
      break;
    default:
      element.querySelector('.popup__type').textContent = 'Помещение';
      break;
  }
};

// функция для создание фото жилья
var createCardPhotos = function (cardPhotosArr, offerElement) {
  var photosFragment = document.createDocumentFragment();
  var photosList = offerElement.querySelector('.popup__photos');
  var photoElements = offerElement.querySelector('.popup__photo');
  photosList.removeChild(photoElements);
  for (var i = 0; i < cardPhotosArr.length; i++) {
    var img = document.createElement('img');
    img.className = 'popup__photo';
    img.alt = 'Фотография жилья';
    img.src = cardPhotosArr[i];
    img.width = '45';
    img.height = '40';
    photosFragment.appendChild(img);
  }
  return photosFragment;
};


// функция для задания характеристик
var setFeatures = function (featuresArr, offerElement) {
  var featuresList = offerElement.querySelector('.popup__features');
  var featuresElements = offerElement.querySelectorAll('.popup__feature');
  for (var i = 0; i < featuresArr.length; i++) {
    if (!featuresElements[i].classList.contains(featuresArr[i])) {
      featuresList.removeChild(featuresElements[i]);
    }
  }
};

// функция для наполнения массива карточками
var generateCards = function () {
  for (var i = 0; i < 8; i++) {
    newCards.push({
      author: {
        avatar: getRandomNumber(AVATARS),
      },
      offer: {
        title: getRandomNumber(TITLE),
        address: getRandomInt(LOCATION.x) + ',' + ' ' + getRandomInt(LOCATION.y),
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
        x: getRandomInt(LOCATION.x),
        y: getRandomInt(LOCATION.y),
      },
    });
  }
};
generateCards();

var calculatePinCoordinatX = function (coordinate, width) {
  var locationX = coordinate - width / 2;
  return locationX;
};

var calculatePinCoordinatY = function (coordinate, height) {
  var locationY = coordinate - height;
  return locationY;
};

// функция для создания меток
var createMapPin = function (pin, index) {
  var pinOfferElement = pinOfferTemplate.cloneNode(true);
  pinOfferElement.style = 'left: ' + calculatePinCoordinatX(pin.location.x, PIN_WIDTH) + 'px; ' + 'top: ' + calculatePinCoordinatY(pin.location.y, PIN_HEIGHT) + 'px;';
  pinOfferElement.querySelector('img').src = pin.author.avatar;
  pinOfferElement.querySelector('img').alt = pin.offer.title;
  pinOfferElement.setAttribute('data-index', index);
  return pinOfferElement;
};

// функция для отрисовки меток на карте
var renderMapPin = function () {
  for (var i = 0; i < newCards.length; i++) {
    fragment.appendChild(createMapPin(newCards[i], i));
  }
  mapPins.appendChild(fragment);
};


// функция для создания карточек
var createCard = function (card) {
  var offerElement = cardOfferTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').src = card.author.avatar;
  offerElement.querySelector('.popup__title').textContent = card.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = card.offer.address;
  var price = offerElement.querySelector('.popup__text--price');
  price.childNodes[0].textContent = card.offer.price + '₽';
  setType(offerElement, card.offer);
  offerElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  setFeatures(card.offer.features, offerElement);
  offerElement.querySelector('.popup__description').textContent = card.offer.description;
  offerElement.querySelector('.popup__photos').appendChild(createCardPhotos(card.offer.photos, offerElement));
  return offerElement;
};


// функция для отрисовки карточек
var renderMapCards = function (i) {
  fragment.appendChild(createCard(newCards[i]));
  map.insertBefore(fragment, map.querySelector('.map__filters-container'));
};


// Личный проект: подробности


var ESC_KEYCODE = 27;
var adForm = document.querySelector('.ad-form');
var selects = document.querySelectorAll('select');
var inputs = document.querySelectorAll('input');
var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = document.getElementById('address');
var mapPinMainStyleLeft = mapPinMain.style.left.slice(0, 3);
var mapPinMainStyleTop = mapPinMain.style.top.slice(0, 3);

// добавляем неактивное состояние полям
var disablefields = function (isdisabled, fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].disabled = isdisabled;
  }
};

// функция активирования страницы
var activeState = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  disablefields(false, inputs);
  disablefields(false, selects);
  renderMapPin();
  onPinClick();
};

// Функция для расчета координат адреса в активном состоянии страницы
var calculateActiveMainPinCoordinats = function () {
  return (+(mapPinMainStyleLeft) + (MAIN_PIN_WIDTH / 2)) + ', ' + (+(mapPinMainStyleTop) + MAIN_PIN_HEIGHT);
};

// Функция для расчета координат адреса в неактивном состоянии страницы
var calculateInactiveMainPinCoordinats = function () {
  return (+(mapPinMainStyleLeft) + (MAIN_PIN_WIDTH / 2)) + ', ' + (+(mapPinMainStyleTop) + (MAIN_PIN_HEIGHT / 2));
};

// Функция для заполнения поля адреса в активном состоянии страницы
var setActiveAddressInput = function () {
  addressInput.value = calculateActiveMainPinCoordinats();
};

// добавление обработчика событий(отпускание элемента) на главную метку
mapPinMain.addEventListener('mouseup', function () {
  activeState();
  setActiveAddressInput();
});

// Функция для добавления обработчиков событий вызывающих показ карточки
var onPinClick = function () {
  var mapPin = document.querySelectorAll('.map__pin');
  for (var i = 1; i < mapPin.length; i++) {
    mapPin[i].addEventListener('click', openCard);
  }
};

// Функция закрытия попапа нажатием ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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

addressInput.value = calculateInactiveMainPinCoordinats();

disablefields(true, inputs);
disablefields(true, selects);
