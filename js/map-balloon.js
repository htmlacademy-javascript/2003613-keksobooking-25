import { LODGING_PROPERTIES } from './enum-data.js';

const lodgingTypesText = Object.fromEntries(Object.entries(LODGING_PROPERTIES).map(([ key, val ]) => [ key, val.fieldText]));

const hideEmptyElement = (element) => {
  if (element.textContent === '') {
    element.classList.add('visually-hidden');
  }
};

const createBalloonContent = (offerItem) => {

  const template = document.querySelector('#card').cloneNode(true).content;
  const card = template.querySelector('.popup');

  const avatar = card.querySelector('.popup__avatar');
  avatar.src = offerItem.author.avatar;

  const title = card.querySelector('.popup__title');
  title.innerHTML = offerItem.offer.title;
  hideEmptyElement(title);

  const address = card.querySelector('.popup__text--address');
  address.innerHTML = offerItem.offer.address;
  hideEmptyElement(address);

  const price = card.querySelector('.popup__text--price');
  price.innerHTML = `${offerItem.offer.price} <span>₽/ночь</span>`;

  const type = card.querySelector('.popup__type');
  const offerType = () => {
    const typeValue =  offerItem.offer.type;
    for (const key in lodgingTypesText) {
      if (key === typeValue){
        return lodgingTypesText[key];
      }
    }
  };
  type.innerHTML = offerType();

  const capacity = card.querySelector('.popup__text--capacity');
  const roomsNum = offerItem.offer.rooms;
  const roomsString = () => {
    if (roomsNum === 1) {
      return 'комната';
    } else if (roomsNum < 5){
      return 'комнаты';
    } else {
      return 'комнат';
    }
  };
  const guestsNum = offerItem.offer.guests;
  const guestsString = () => {
    if (guestsNum === 1) {
      return 'гостя';
    } else {
      return 'гостей';
    }
  };
  capacity.innerHTML = `${roomsNum} ${roomsString()} для ${guestsNum} ${guestsString()}`;

  const time = card.querySelector('.popup__text--time');
  const checinString = offerItem.offer.checkin;
  const checoutString = offerItem.offer.checkout;
  time.innerHTML = `Заезд после ${checinString}, выезд до ${checoutString}`;

  const featuresContainer = card.querySelector('.popup__features');
  const features = featuresContainer.querySelectorAll('.popup__feature');
  const classString = 'popup__feature--';
  const offerFeatures = offerItem.offer.features.map((element) => classString+element);
  features.forEach((featureItem) => {
    const featureItemClass = featureItem.classList[1];
    if (!offerFeatures.includes(featureItemClass)) {
      featureItem.remove();
    }
  });

  const description = card.querySelector('.popup__description');
  description.innerHTML = offerItem.offer.description;
  hideEmptyElement(description);

  const photosContainer = card.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo').cloneNode(true);
  const photosFragmet = document.createDocumentFragment();
  const photos = offerItem.offer.photos;
  for (const photo of photos){
    const newImg = photoItem.cloneNode(true);
    newImg.src = photo;
    photosFragmet.appendChild(newImg);
  }
  photosContainer.innerHTML='';
  photosContainer.appendChild(photosFragmet);

  return card;
};

export {createBalloonContent};
