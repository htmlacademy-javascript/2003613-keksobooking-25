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

export {getData, sendData, POST_ADDRESS};
