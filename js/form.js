/* eslint-disable no-console */
import { POST_ADDRESS } from './enum-network.js';
import { lodgingTypesMinPrice, } from './enum-data.js';
import { getCursorPointCoordinate} from './map.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const address = adForm.querySelector('#address');
const lodgingType = adForm.querySelector('#type');
const lodgingPrice = adForm.querySelector('#price');
const checkin = adForm.querySelector('#timein');
const checkout = adForm.querySelector('#timeout');
const roomCount = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');

const syncFieldsByKey = (valueFrom, valueEnum) => {
  const keyName = valueFrom.value;
  return valueEnum[keyName];
};

const syncSelectsByValue = (selectFrom, selectTo) => {
  selectTo.value = selectFrom.value;
};
const coordinate = getCursorPointCoordinate();

const disableElements = (...elements) => {
  for (const element of elements){
    const elementChildren = element.children;
    for (const child of elementChildren) {
      child.setAttribute('disabled', true);
    }
    element.classList.add(`${element.classList[0]}--disabled`);
  }
};

const enableElements = (...elements) => {
  for (const element of elements){
    const elementChildren = element.children;
    for (const child of elementChildren) {
      child.removeAttribute('disabled');
    }
    element.classList.remove(`${element.classList[0]}--disabled`);
  }
};

disableElements(adForm, mapFilters);
enableElements(adForm, mapFilters);

document.addEventListener('DOMContentLoaded', () => {
  const price = syncFieldsByKey(lodgingType, lodgingTypesMinPrice);
  lodgingPrice.placeholder = price;
  adForm.action = POST_ADDRESS;
  syncSelectsByValue(roomCount, roomCapacity);
  address.setAttribute('value', `широта: ${coordinate.lat}, долгота: ${coordinate.lng}`);
  address.setAttribute('readonly', true);
});

lodgingType.addEventListener('change', () => {
  const price = syncFieldsByKey(lodgingType, lodgingTypesMinPrice);
  lodgingPrice.placeholder = price;
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
