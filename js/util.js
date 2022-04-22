const ALERT_SHOW_TIME = 5000;

const getRandomPositiveInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = function (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayItem = function (array) {
  return array[getRandomPositiveInteger(0, array.length - 1)];
};

const getRandomArrayPart = function (array) {
  const max = getRandomPositiveInteger(0, array.length - 1);
  const min = getRandomPositiveInteger(0, max);
  return array.slice(min, max + 1);
};

const getRandomArrayRange = function (array, rangeSize, filterFn) {
  const filteredArray = filterFn(array);
  const arrayItemsCount = filteredArray.length;
  const rangeItemsCount = (rangeSize < arrayItemsCount) ? rangeSize : arrayItemsCount;
  const rangeStartIndex = getRandomPositiveInteger(0, arrayItemsCount);
  let resultArray = [];
  if ((rangeStartIndex + rangeItemsCount) > arrayItemsCount) {
    resultArray = resultArray.concat(filteredArray.slice(rangeStartIndex));
    resultArray = resultArray.concat(filteredArray.slice(0, rangeStartIndex + rangeItemsCount - arrayItemsCount));
    return resultArray;
  }
  const rangeEndIndex = rangeStartIndex + rangeItemsCount;
  resultArray = resultArray.concat(filteredArray.slice(rangeStartIndex, rangeEndIndex));
  return resultArray;
};

const isValidStringLength = function (str, min = 0, max = Infinity) {
  return str.length >= min && str.length <= max;
};

const isValidNumRange = function (num, min = -Infinity, max = Infinity) {
  return num >= min && num <= max;
};

const disableElements = function (...elements) {
  for (const element of elements){
    const elementChildren = element.children;
    for (const child of elementChildren) {
      child.setAttribute('disabled', true);
    }
    element.classList.add(`${element.classList[0]}--disabled`);
  }
};

const enableElements = function (...elements) {
  for (const element of elements){
    const elementChildren = element.children;
    for (const child of elementChildren) {
      child.removeAttribute('disabled');
    }
    element.classList.remove(`${element.classList[0]}--disabled`);
  }
};

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

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {
  enableElements,
  disableElements,
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayItem,
  getRandomArrayPart,
  getRandomArrayRange,
  isValidStringLength,
  isValidNumRange,
  showAlert,
  debounce,
};
