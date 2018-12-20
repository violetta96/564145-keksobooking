'use strict';

(function () {
  var CHECK_TIME = '0:00';
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
  var createCardPhotos = function (cardPhotos, offerElement) {
    var photosFragment = document.createDocumentFragment();
    var photosList = offerElement.querySelector('.popup__photos');
    var photoElement = offerElement.querySelector('.popup__photo');
    photosList.removeChild(photoElement);
    for (var i = 0; i < cardPhotos.length; i++) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.alt = 'Фотография жилья';
      img.src = cardPhotos[i];
      img.width = '45';
      img.height = '40';
      photosFragment.appendChild(img);
    }
    return photosFragment;
  };

  // функция для задания характеристик
  var setFeatures = function (features, offerElement) {
    offerElement.querySelector('.popup__features').innerHTML = '';
    for (var j = 0; j < features.length; j++) {
      var newElement = document.createElement('li');
      newElement.classList.add('popup__feature');
      newElement.classList.add('popup__feature--' + features[j]);
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
    offerElement.querySelector('.popup__close').addEventListener('click', window.main.closePopup);
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
    if (card.offer.checkin === CHECK_TIME || card.offer.checkout === CHECK_TIME) {
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
