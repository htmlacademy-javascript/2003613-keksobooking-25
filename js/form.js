import {disableElements} from './util.js';
import { sendData, POST_ADDRESS } from './api.js';
import { lodgingTypesMinPrice,lodgingTypesMaxPrice,} from './enum-data.js';
import { initPinCoordinate, setMapDefault} from './map.js';
import { formPristine } from './form-validate.js';

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
const submitButton = adForm.querySelector('.ad-form__submit');
const ressetButton = adForm.querySelector('.ad-form__reset');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const getPriceByLodgingType = (type, price) => {
  const keyName = type.value;
  return price[keyName];
};

const syncSelectsByValue = (selectFrom, selectTo) => {
  selectTo.value = selectFrom.value;
};

const getMinLodgingPrice = () => getPriceByLodgingType(lodgingType, lodgingTypesMinPrice);

const getMaxLodgingPrice = () => getPriceByLodgingType(lodgingType, lodgingTypesMaxPrice);

const initForm = (form) => {
  if (!form.getAttribute('action')){
    form.action = POST_ADDRESS;
  }
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

const initLodgingType = () => {
  lodgingType.value = 'flat';
};

const initRoomCountCapacity = () => {
  syncSelectsByValue(roomCount, roomCapacity);
};

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

const initSlider = () => {
  updateSliderStart(getMinLodgingPrice());
  updateSliderPadding(getMinLodgingPrice(), 100);
};

const setFormDefault = () => {
  adForm.reset();
  mapFilters.reset();
  initAddress();
  initLodgingType();
  initLodgingPrice();
  initSlider();
  initRoomCountCapacity();
  setMapDefault();
  formPristine.reset();
};

document.addEventListener('DOMContentLoaded', () => {
  initForm(adForm);
  initAddress();
  initLodgingPrice();
  initRoomCountCapacity();
});

adForm.addEventListener('load', () => {
  disableElements(adForm, mapFilters);
});

priceSlider.noUiSlider.on('start', () => {
  updateSliderStart(getMinLodgingPrice());
  updateSliderPadding(getMinLodgingPrice(), 0);
});

priceSlider.noUiSlider.on('slide', () => {
  lodgingPrice.value = priceSlider.noUiSlider.get();
  formPristine.validate();
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

const successRoutine = function (evt, message) {
  const routine = function () {
    if (evt.type === 'click' || evt.code === 'Escape'){
      setFormDefault();
      formPristine.reset();
      message.remove();
    }
  };
  return routine();
};

const successMessageHandler = function (message) {
  document.addEventListener('click', (evt) => successRoutine(evt, message), {once: true});
  document.addEventListener('keydown', (evt) => successRoutine(evt, message), {once: true});
};

const errorRoutine = function (evt, message) {
  const routine = function () {
    if (evt.type === 'click' || evt.code === 'Escape'){
      message.remove();
    }
  };
  return routine();
};

const errorMessageHandler = function (message) {
  const button = (message.querySelector('.error__button'));
  button.addEventListener('click', (evt) => errorRoutine(evt, message), {once: true});
  document.addEventListener('click', (evt) => errorRoutine(evt, message), {once: true});
  document.addEventListener('keydown', (evt) => errorRoutine(evt, message), {once: true});
};

const showMessage = (message, handler) => {
  document.body.append(message);
  handler(message);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = formPristine.validate();
  if (isValid){
    blockSubmitButton();
    sendData(
      () => {showMessage(successMessage, successMessageHandler);},
      () => {showMessage(errorMessage, errorMessageHandler);},
      adForm
    );
    unblockSubmitButton();
  } else {
    showMessage(errorMessage, errorMessageHandler);
  }
});

ressetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setFormDefault();
});
