/* eslint-disable no-console */
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
  .on('load', () => {
    console.log('карта загружена');
  })
  .setView({
    lat: 35.652832,
    lng: 139.839478,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    crossOrigin: false,
  },
).addTo(map);

export {getCursorPointCoordinate, getMapLoadStatus};
