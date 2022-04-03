import {disableElements} from './util.js';
import { POST_ADDRESS } from './enum-network.js';
import { lodgingTypesMinPrice,lodgingTypesMaxPrice,} from './enum-data.js';
import { initPinCoordinate, } from './map.js';

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
});

lodgingPrice.addEventListener('blur', () => {
  updateSliderStart(lodgingPrice.value);
  updateSliderPadding(lodgingPrice.value, 0);
  priceSlider.noUiSlider.set(lodgingPrice.value);
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

