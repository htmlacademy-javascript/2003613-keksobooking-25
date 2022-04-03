import {
  isValidStringLength,
  isValidNumRange
} from './util.js';

import {
  lodgingTypesMinPrice,
  lodgingTypesMaxPrice
} from './enum-data.js';

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const lodgingType = adForm.querySelector('#type');
const lodgingPrice = adForm.querySelector('#price');
const priceSlider = adForm.querySelector('.ad-form__slider');
const roomCount = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');

const formPristine = new Pristine(
  adForm,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error'
  },
);

const validateTitle = (value) => isValidStringLength(value, 30, 100);

const getTitleErrorMessage = (value) => {
  const symbolsCount = value.length;
  if (!symbolsCount) {
    return 'Заголовок не может быть пустым, введите минимум 30 символов.';
  }
  if (symbolsCount < 30) {
    return `Минимальная длина заголовка 30 символов, вы ввели всего ${symbolsCount}`;
  }
  if (symbolsCount > 100) {
    return `Максимальная длина заголовка 100 символов, вы ввели ${symbolsCount}`;
  }
};

formPristine.addValidator(
  title,
  validateTitle,
  getTitleErrorMessage
);

const validateLodgingPrice = (value) => {
  const inputType = lodgingType.value;
  const minValue = lodgingTypesMinPrice[inputType];
  const maxValue = lodgingTypesMaxPrice[inputType];
  return isValidNumRange(value, minValue, maxValue);
};

const getLodgingPriceErrorMessage = (value) => {
  const inputType = lodgingType.value;
  const minValue = lodgingTypesMinPrice[inputType];
  const maxValue = lodgingTypesMaxPrice[inputType];
  if (value === '') {
    return 'Укажите стоимость аренды';
  }
  if (value === 0) {
    return 'Так не бывает, попросите хоть что-то';
  }
  if (value < minValue) {
    return `Цена ниже рынка настораживает, просите минимум ${minValue}`;
  }
  if (value > maxValue) {
    return `Серьерзно? ${value} руб. за ночь? С такой ценой вам на другую площадку.`;
  }
};

formPristine.addValidator(
  lodgingPrice,
  validateLodgingPrice,
  getLodgingPriceErrorMessage
);

lodgingPrice.addEventListener('blur', () => {
  formPristine.validate();
});

priceSlider.noUiSlider.on('update', () => {
  formPristine.validate();
});

const validateRoomCapacity = (value) => {
  const roomCountValue = roomCount.value;
  switch (value) {
    case '0': return roomCountValue === '100';
    case '1': return roomCountValue >= 1 && roomCountValue < 100;
    case '2': return roomCountValue >= 2 && roomCountValue < 100;
    case '3': return roomCountValue >= 3 && roomCountValue < 100;
  }
};

const getRoomCapacityErrorMessage = (value) => {
  const roomCountValue = roomCount.value;
  if (value === '0' ) {
    return'А для кого?';
  }
  if  (value > 0 && roomCountValue >= 100) {
    return 'Гости заблудятся, и вы их не найдете, выберите меньше комнат';
  }
  if (value >= roomCountValue) {
    return 'По одной комнате на человка.';
  }
};

formPristine.addValidator(
  roomCapacity,
  validateRoomCapacity,
  getRoomCapacityErrorMessage
);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formPristine.validate();
});
