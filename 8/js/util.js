
export function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

export function getRandomArrayItem(callback) {
  return callback[getRandomPositiveInteger(0, callback.length - 1)];
}

export function getRandomArrayRange(callback) {
  const max = getRandomPositiveInteger(0, callback.length - 1);
  const min = getRandomPositiveInteger(0, max);
  return callback.slice(min, max + 1);
}

export function isValidStringLength(str, min = 0, max = Infinity) {
  return str.length >= min && str.length <= max;
}

export function isValidNumRange(num, min = -Infinity, max = Infinity) {
  return num >= min && num <= max;
}
