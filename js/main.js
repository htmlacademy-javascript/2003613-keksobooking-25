function checkRangeTresold(minRangeValue, maxRangeValue) {
  const MIN_VAL = minRangeValue;
  const MAX_VAL = maxRangeValue;
  // eslint-disable-next-line no-console
  const ERROR_MESSAGE = console.log;

  if ((MIN_VAL < 0) || (MAX_VAL < 0)) {
    ERROR_MESSAGE('Error: the range includes a negative values');
    return false;
  }
  if (MIN_VAL >= MAX_VAL) {
    ERROR_MESSAGE('Error: the minimum value of range is equal or greater than the maximum value');
    return false;
  }
  return true;
}

function getRandomWholeNumber(minRangeValue, maxRangeValue) {

  const MIN_VAL = Math.ceil(Number(minRangeValue));
  const MAX_VAL = Math.floor(Number(maxRangeValue));
  if (checkRangeTresold(MIN_VAL, MAX_VAL)) {
    /*логику рандомайзера подсмотрел на
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
    return Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1)) + MIN_VAL;
  }
  return NaN;
}

function getRandomGeoCoordinate(minRangeValue, maxRangeValue, fractionLength) {

  const FRACTION_LENGTH = Math.pow(10, Math.floor(Number(fractionLength)));
  const MIN_VAL = Math.ceil(minRangeValue) * FRACTION_LENGTH;
  const MAX_VAL = (maxRangeValue > 360) ? 360 : Math.floor(maxRangeValue) * FRACTION_LENGTH;

  if (checkRangeTresold(MIN_VAL, MAX_VAL)) {
    /*логику рандомайзера подсмотрел на
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
    return (Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1)) + MIN_VAL) / FRACTION_LENGTH;
  }
  return NaN;
}
getRandomWholeNumber(50, 80);
getRandomGeoCoordinate(4.465465798, 90.6546549688, 8);
