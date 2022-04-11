import {disableElements} from './util.js';
import { POST_ADDRESS } from './api.js';
import { lodgingTypesMinPrice,lodgingTypesMaxPrice,} from './enum-data.js';
import { initPinCoordinate, } from './map.js';
import { formPristine } from './form-validate.js';


const pageBody = document.querySelector('body');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const address = adForm.querySelector('#address');
const lodgingType = adForm.querySelector('#type');
const lodgingPrice = adForm.querySelector('#price');
const checkin = adForm.querySelector('#timein');
const checkout = adForm.querySelector('#timeout');
const roomCount = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');
const priceSlider = adForm.querySelector('.ad-form__slider');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.cloneNode(true);

const getPriceByLodgingType = (type, price) => {
  const keyName = type.value;
  return price[keyName];
};

const syncSelectsByValue = (selectFrom, selectTo) => {
  selectTo.value = selectFrom.value;
};

const getMinLodgingPrice = () => getPriceByLodgingType(lodgingType, lodgingTypesMinPrice);
const getMaxLodgingPrice = () => getPriceByLodgingType(lodgingType, lodgingTypesMaxPrice);

const initForm = () => {
  adForm.action = POST_ADDRESS;
};

const initAddress = () => {
  address.setAttribute('value', `широта: ${initPinCoordinate.lat}, долгота: ${initPinCoordinate.lng}`);
  address.setAttribute('readonly', true);
};

const initLodgingPrice = () => {
  lodgingPrice.placeholder = getMinLodgingPrice();
  lodgingPrice.value = '';
  lodgingPrice.setAttribute('min', 0);
};

const initRoomCountCapacity = () => {
  syncSelectsByValue(roomCount, roomCapacity);
};

const successHandlerRoutine = (message) => {
  message.remove();
  removeEventListener('click', document);
  removeEventListener('keydown', document);
  initAddress();
  initLodgingPrice();
  initRoomCountCapacity();
};

const successMessageHandler = function (message) {
  document.addEventListener('click', successHandlerRoutine(message));
  document.addEventListener('keydown', successHandlerRoutine(message));
};

const showMessage = (message, handler) => {
  pageBody.appendChild(message);
  handler(message);
};

// successMessage.addEventListener('click', () => {
//   successMessage.remove();
// });

document.addEventListener('DOMContentLoaded', () => {
  initForm();
  initAddress();
  initLodgingPrice();
  initRoomCountCapacity();
});

adForm.addEventListener('load', () => {
  disableElements(adForm, mapFilters);
});

noUiSlider.create(priceSlider, {
  padding: [getMinLodgingPrice(), 0],
  range: {
    min: 0,
    max: getMaxLodgingPrice(),
  },
  start: getMinLodgingPrice(),
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseInt(value, 10);
    },
  },
});

const updateSliderPadding = (min, max) => {
  priceSlider.noUiSlider.updateOptions({
    padding: [min, max],
  });};

const updateSliderStart = (value) => {
  priceSlider.noUiSlider.updateOptions({
    start: value,
  });};

priceSlider.noUiSlider.on('start', () => {
  updateSliderStart(getMinLodgingPrice());
  updateSliderPadding(getMinLodgingPrice(), 0);
});

priceSlider.noUiSlider.on('slide', () => {
  lodgingPrice.value = priceSlider.noUiSlider.get();
  //formPristine.validate();
});

lodgingPrice.addEventListener('blur', () => {
  updateSliderStart(lodgingPrice.value);
  updateSliderPadding(lodgingPrice.value, 0);
  priceSlider.noUiSlider.set(lodgingPrice.value);
  formPristine.validate();
});

lodgingType.addEventListener('change', () => {
  const price = getMinLodgingPrice();
  lodgingPrice.placeholder = price;
  updateSliderPadding(price, 0);
  updateSliderStart(price);
  lodgingPrice.value = '';
});

checkin.addEventListener('change', () => {
  const time = checkin.value;
  checkout.value = time;
});

checkout.addEventListener('change', () => {
  const time = checkout.value;
  checkin.value = time;
});

roomCount.addEventListener('change', () => {
  if (roomCount.value === '100') {
    roomCapacity.value = '0';
  } else {
    syncSelectsByValue(roomCount, roomCapacity);
  }
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  showMessage(successMessage, successMessageHandler);
  return console.log(formPristine.validate() + evt.target);//(validateForm()) ? console.log('OK') : console.log('NOT');
});
