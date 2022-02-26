const avatarNum = () => {
  const n = getRandomPositiveInteger(1, 10);
  return (n < 10) ? (`0${n}`) : n;
};
const avatarURL = `img/avatars/user${avatarNum()}.png`;
const LOCATION_DIGITS = 5;
const LONGITUDE_RANGE = {
  min: 35.65,
  max: 35.7,
};
const latitude = getRandomPositiveFloat(LONGITUDE_RANGE.min, LONGITUDE_RANGE.max, LOCATION_DIGITS);
const LATITUDE_RANGE = {
  min: 139.7,
  max: 139.8,
};
const longitude = getRandomPositiveFloat(LATITUDE_RANGE.min, LATITUDE_RANGE.max, LOCATION_DIGITS);
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
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00',];
const CHECHOUT_TIMES = ['12:00', '13:00', '14:00',];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',];
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

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRandomArrayItem(callback) {
  return callback[getRandomPositiveInteger(0, callback.length - 1)];
}

function getRandomArrayRange(callback) {
  const max = getRandomPositiveInteger(0, callback.length - 1);
  const min = getRandomPositiveInteger(0, max);
  return callback.slice(min, max + 1);
}

const generateOffer = () => ({
  author: {
    avatar: avatarURL,
  },
  location: {
    lat: latitude,
    lng: longitude,
  },
  offer: {
    title: getRandomArrayItem(TITLE_CONTENTS),
    address: `${latitude}, ${longitude}`,
    price: getRandomPositiveInteger(PRICE_RANGE.min, PRICE_RANGE.max),
    type: getRandomArrayItem(TYPES),
    rooms: getRandomPositiveInteger(ROOMS_RANGE.min, ROOMS_RANGE.max),
    guests: getRandomPositiveInteger(GUESTS_RANGE.min, GUESTS_RANGE.max),
    checkin: getRandomArrayItem(CHECKIN_TIMES),
    checkout: getRandomArrayItem(CHECHOUT_TIMES),
    features: getRandomArrayRange(FEATURES_LIST),
    description: getRandomArrayItem(DESCRIPTION_CONTENT),
    photos: getRandomArrayRange(PHOTOS_LIST),
  },
});
const OFFERS_COUNT = 10;
const OFFERS = Array.from({ length: OFFERS_COUNT }, generateOffer);
