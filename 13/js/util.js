
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRandomArrayItem(callback) {
  return callback[getRandomPositiveInteger(0, callback.length - 1)];
}

function getRandomArrayRange(callback) {
  const max = getRandomPositiveInteger(0, callback.length - 1);
  const min = getRandomPositiveInteger(0, max);
  return callback.slice(min, max + 1);
}

function isValidStringLength(str, min = 0, max = Infinity) {
  return str.length >= min && str.length <= max;
}

function isValidNumRange(num, min = -Infinity, max = Infinity) {
  return num >= min && num <= max;
}

function disableElements (...elements) {
  for (const element of elements){
    const elementChildren = element.children;
    for (const child of elementChildren) {
      child.setAttribute('disabled', true);
    }
    element.classList.add(`${element.classList[0]}--disabled`);
  }
}

function enableElements (...elements) {
  for (const element of elements){
    const elementChildren = element.children;
    for (const child of elementChildren) {
      child.removeAttribute('disabled');
    }
    element.classList.remove(`${element.classList[0]}--disabled`);
  }
}
const ALERT_SHOW_TIME = 5000;

const showAlert = (message, element) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 999999;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';


  alertContainer.textContent = message;

  element.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  enableElements,
  disableElements,
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayItem,
  getRandomArrayRange,
  isValidStringLength,
  isValidNumRange,
  showAlert,
};
