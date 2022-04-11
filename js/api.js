/* eslint-disable no-console */
import {getRandomArrayItem, getRandomArrayRange, getRandomPositiveFloat, getRandomPositiveInteger} from './util.js';
import {LODGING_PROPERTIES, FEATURES_TYPES, CHECKIN_TIMES, CHECHOUT_TIMES} from './enum-data.js';

const POST_ADDRESS = 'https://25.javascript.pages.academy/keksobooking';
const GET_ADDRESS = 'https://25.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess, onFail) => {
  fetch(GET_ADDRESS)
    .then((response) => response.json())
    .then((dataSet) => {
      onSuccess(dataSet);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(POST_ADDRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.json())
    .then((dataSet) => {
      onSuccess(dataSet);
    });
};

/*
const OFFERS_COUNT = 10;
const LOCATION_DIGITS = 6;
const LONGITUDE_RANGE = {
  min: 35.65,
  max: 35.7,
};
const LATITUDE_RANGE = {
  min: 139.7,
  max: 139.8,
};
const TITLE_CONTENTS = [
  'Заголовок 1',
  'Заголовок 2',
  'Заголовок 3'];
const PRICE_RANGE = {
  min: 10000,
  max: 50000
};
const ROOMS_RANGE = {
  min: 1,
  max: 5,
};

const GUESTS_RANGE = {
  min: 1,
  max: 5,
};
const DESCRIPTION_CONTENT = [
  'Описание объекта 1',
  'Описание объекта 2',
  'Описание объекта 3',
];
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const lodgingTypes = Array.from(Object.keys(LODGING_PROPERTIES));

const getAvatarURL = () => {
  const n = getRandomPositiveInteger(1, 10);
  const AvatarNum = (n < 10) ? (`0${n}`) : n;
  return `img/avatars/user${AvatarNum}.png`;
};


const makeOfferData = () => {

  const latitude = getRandomPositiveFloat(LONGITUDE_RANGE.min, LONGITUDE_RANGE.max, LOCATION_DIGITS);
  const longitude = getRandomPositiveFloat(LATITUDE_RANGE.min, LATITUDE_RANGE.max, LOCATION_DIGITS);

  return {
    author: {
      avatar: getAvatarURL(),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
    offer: {
      title: getRandomArrayItem(TITLE_CONTENTS),
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(PRICE_RANGE.min, PRICE_RANGE.max),
      type: getRandomArrayItem(lodgingTypes),
      rooms: getRandomPositiveInteger(ROOMS_RANGE.min, ROOMS_RANGE.max),
      guests: getRandomPositiveInteger(GUESTS_RANGE.min, GUESTS_RANGE.max),
      checkin: getRandomArrayItem(CHECKIN_TIMES),
      checkout: getRandomArrayItem(CHECHOUT_TIMES),
      features: getRandomArrayRange(FEATURES_TYPES),
      description: getRandomArrayItem(DESCRIPTION_CONTENT),
      photos: getRandomArrayRange(PHOTOS_LIST),
    },
  };
};

const createDataSet = function(count, callback) {
  return Array.from({ length: count }, callback);
};

const dataSet = createDataSet(OFFERS_COUNT, makeOfferData);

*/
export {getData, POST_ADDRESS};
