/* eslint-disable no-console */
import {enableElements} from './util.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const getCursorPointCoordinate = function() {
  const coordinate = {
    lat: 139.75,
    lng: 35.68,
  };
  return coordinate;
};

const MAP_LOAD_STATUS = true;
const getMapLoadStatus = function () {
  return MAP_LOAD_STATUS;
};

const map = L.map('map-canvas')
  .setView({
    lat: 35.652832,
    lng: 139.839478,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker(
  {
    lat: 35.652832,
    lng: 139.839478,
  },
  {
    draggable: true,
  },
);

marker.addTo(map);

map.on('load', () => {
  enableElements(adForm, mapFilters);
});

marker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});

export {getCursorPointCoordinate, getMapLoadStatus};
