import '/pristine/pristine.min.js';
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

const errorMessageTitle = (value) => {
  let message;
  const symbolsCount = value.length;
  if (!symbolsCount) {
    message = 'Заголовок не может быть пустым, введите минимум 30 символов.';
  } else if (symbolsCount < 30) {
    message = `Минимальная длина заголовка 30 символов, вы ввели всего ${symbolsCount}`;
  } else if (symbolsCount > 100) {
    message = `Максимальная длина заголовка 100 символов, вы ввели ${symbolsCount}`;
  }
  return message;
};

pristine.addValidator(
  title,
  validateTitle,
  errorMessageTitle
);

const validateLodgingPrice = (value) => {
  const inputType = lodgingType.value;
  const minValue = lodgingTypesMinPrice[inputType];
  const maxValue = lodgingTypesMaxPrice[inputType];
  return isValidNumRange(value, minValue, maxValue);
};

const errorMessageLodgingPrice = (value) => {
  const inputType = lodgingType.value;
  const minValue = lodgingTypesMinPrice[inputType];
  const maxValue = lodgingTypesMaxPrice[inputType];
  let message;
  if (value === '') {
    message = 'Укажите стоимость аренды';
  } else if (value === 0) {
    message = 'Так не бывает, попросите хоть что-то';
  } else if (value < minValue) {
    message = `Цена ниже рынка настораживает, просите минимум ${minValue}`;
  } else if (value > maxValue) {
    message = `Серьерзно? ${value} руб. за ночь? С такой ценой вам на другую площадку.`;
  }
  return message;
};

pristine.addValidator(
  lodgingPrice,
  validateLodgingPrice,
  errorMessageLodgingPrice
);

const validateRoomCapacity = (value) => {
  switch (value) {
    case '0': return roomCount.value === '100';
    case '1': return roomCount.value >= 1 && roomCount.value < 100;
    case '2': return roomCount.value >= 2 && roomCount.value < 100;
    case '3': return roomCount.value >= 3 && roomCount.value < 100;
  }
};

const errorMessageRoomCapacity = (value) => {
  let message;
  if  (value > 0 && roomCount.value === '100') {
    message = 'Гости заблудятся, и вы их не найдете, выберите меньше комнат';
  } else if (value === '0' ) {
    message = 'А для кого?';
  } else if (value <= 3) {
    message = 'По одной комнате на человка.';
  }
  return message;
};

pristine.addValidator(
  roomCapacity,
  validateRoomCapacity,
  errorMessageRoomCapacity
);

adForm.addEventListener('submit', () => {
  pristine.validate();
});
