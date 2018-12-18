'use strict';

(function () {
  var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // функция для задания типа жилья
  var setType = function (element, card) {
    switch (card.type) {
      case 'flat':
        element.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalo' :
        element.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'house' :
        element.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace' :
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
    offerElement.querySelector('.popup__features').innerHTML = '';
    for (var j = 0; j < featuresArr.length; j++) {
      var newElement = document.createElement('li');
      newElement.className = 'popup__feature popup__feature--' + featuresArr[j];
      offerElement.querySelector('.popup__features').appendChild(newElement);
    }
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
    hidePopupBlocks(card, offerElement);
    return offerElement;
  };

  // функция скрывающая пустые блоки
  var hidePopupBlocks = function (card, offerElement) {
    if (!card.author.avatar) {
      offerElement.querySelector('.popup__avatar').classList.add('hidden');
    }
    if (!card.offer.title) {
      offerElement.querySelector('.popup__title').classList.add('hidden');
    }
    if (!card.offer.address) {
      offerElement.querySelector('.popup__text--address').classList.add('hidden');
    }
    if (!card.offer.price) {
      offerElement.querySelector('.popup__text--price').classList.add('hidden');
    }
    if (card.offer.checkin === '0:00' || card.offer.checkout === '0:00') {
      offerElement.querySelector('.popup__text--time').classList.add('hidden');
    }
    if (card.offer.rooms === 0 || card.offer.guests === 0) {
      offerElement.querySelector('.popup__text--capacity').classList.add('hidden');
    }
    if (card.offer.features.length === 0) {
      offerElement.querySelector('.popup__features').classList.add('hidden');
    }
    if (card.offer.photos.length === 0) {
      offerElement.querySelector('.popup__photos').classList.add('hidden');
    }
    if (!card.offer.description) {
      offerElement.querySelector('.popup__description').classList.add('hidden');
    }
  };

  window.card = {
    createCard: createCard,
  };
})();
