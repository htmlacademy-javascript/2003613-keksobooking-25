function checkRangeTresold(minRangeValue, maxRangeValue) {
  const minVal = minRangeValue;
  const maxVal = maxRangeValue;

  if ((minVal < 0) || (maxVal < 0)) {
    throw new Error('The range includes a negative values');
  }
  if (minVal >= maxVal) {
    throw new Error('The minimum value of range is equal or greater than the maximum value');
  }
  //return true;
}

function getRandomWholeNumber(minRangeValue, maxRangeValue) {

  checkRangeTresold(minRangeValue, maxRangeValue);
  const minVal = Math.ceil(Number(minRangeValue));
  const maxVal = Math.floor(Number(maxRangeValue));
  /*логику рандомайзера подсмотрел на
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

function getRandomGeoCoordinate(minRangeValue, maxRangeValue, fractionLength) {

  checkRangeTresold(minRangeValue, maxRangeValue);

  const fractLength = Math.pow(10, Math.floor(fractionLength));
  const minVal = Math.ceil(minRangeValue * fractLength);
  const maxVal = (maxRangeValue > 360) ? 360 * fractLength : Math.floor(maxRangeValue * fractLength);
  /*логику рандомайзера подсмотрел на
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
  return (Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal) / fractLength;

}
getRandomWholeNumber(50, 80);
getRandomGeoCoordinate(4.465465798, 90.6546549688, 8);
