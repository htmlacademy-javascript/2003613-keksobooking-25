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
const roomCount = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');

const pristine = new Pristine(
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
  } else if (symbolsCount < 30) {
    return `Минимальная длина заголовка 30 символов, вы ввели всего ${symbolsCount}`;
  } else if (symbolsCount > 100) {
    return `Максимальная длина заголовка 100 символов, вы ввели ${symbolsCount}`;
  }
};

pristine.addValidator(
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
  } else if (value === 0) {
    return 'Так не бывает, попросите хоть что-то';
  } else if (value < minValue) {
    return `Цена ниже рынка настораживает, просите минимум ${minValue}`;
  } else if (value > maxValue) {
    return `Серьерзно? ${value} руб. за ночь? С такой ценой вам на другую площадку.`;
  }
};

pristine.addValidator(
  lodgingPrice,
  validateLodgingPrice,
  getLodgingPriceErrorMessage
);

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
  } else  if  (value > 0 && roomCountValue >= 100) {
    return 'Гости заблудятся, и вы их не найдете, выберите меньше комнат';
  } else if (value >= roomCountValue) {
    return 'По одной комнате на человка.';
  }
};

pristine.addValidator(
  roomCapacity,
  validateRoomCapacity,
  getRoomCapacityErrorMessage
);

adForm.addEventListener('submit', () => {
  pristine.validate();
});
