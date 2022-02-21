function getRandomGeoCoordinate(minRangeValue, maxRangeValue, fractionLength) {

  let min = Number(minRangeValue);
  let max = Number(maxRangeValue);
  let frLength = PreseInt(Number(fractionLength));

  max = (max > 360) ? 360 : max;

  if ((min < 0) || (max < 0) || (min > max)) {
    //console.log("out of target range or min > max");
    return NaN;
  }

  //логику рандомайзера подсмотрел на https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  let min = Math.ceil(min * Math.pow(10, fractionLength));
  let max = Math.floor(max * Math.pow(10, fractionLength));
  return (Math.floor(Math.random() * (max - min + 1)) + min) / Math.pow(10, fractionLength);
}

//проверка
let minThreshold = 5;
let maxThreshold = 50;
let fractionL = 8;
let number;
for (let i = 0; i < 100000; i++) {
  number = getRandomGeoCoordinate(minThreshold, maxThreshold, fractionL);
  if (minRangeValue > number && maxRangeValue > number) {
    console.log("false " + "min: " + minThreshold + " max: " + maxThreshold + " result: " + number);
  }
}
console.log("min: " + minThreshold + " max: " + maxThreshold + " result: " + number);



/*function generateNumber(callback) {
  let min = callback(minRangeValue);
  let max = callback(maxRangeValue);
  console.log("function - min: " + min);
  console.log("function - max: " + max);

  let n = 0;
  let counter = 1;
  let condition = false;

  mi = (min < n);
  let ma = (max < n);
  console.log("min: " + mi + " max: " + ma);

  do {
    //console.log("counter: " + counter);
    //console.log("min: " + typeof (min) + " n: " + typeof (n) + " max: " + typeof (max));
    n = Math.random();
    if ((max < n) && (n < min)) {
      condition = true;
    }
    console.log("initial n: " + n);
  }
  while (condition);

  console.log("while min: " + (min < n) + " while  max: " + (max < n));
  console.log("while n: " + n);


  n = 5;





  return ((2 < n) && (n < 8));
  //Math.floor(n * targetDiditsNum) / targetDiditsNum;
}

console.log("result " + generateNumber(wholeNumber));
/*console.log("FRACTION");
console.log(fractionNumber(minRangeValue));
console.log(generateNumber(fractionNumber));
console.log(fractionNumber(maxRangeValue));

console.log("WHOLE");
console.log(wholeNumber(minRangeValue));
console.log(wholeNumber(maxRangeValue));
/*

/*let generateNumber = (callback) => {
 
  if (whole) {
    min = minRangeValue / 10 ^ numberDigit(minRangeValue);
    max = minRangeValue / 10 ^ numberDigit(minRangeValue);
  } else {
    min =
      max = minRangeValue - PreseInt(minRangeValue);
  }
 
  }
  return n;
}
 

let wholeNumber = generateNumber(whole);
let fractionNumber = generateNumber(!whole);
 
let head = document.getElementById("heading");
head.innerHTML
 
 
 
//"<h1>" + wholeRandomNumber(minRangeValue) + "</h1>";
 
 
 
 // return wholeNumber = fractionNumber;
 
/*имя_функции(от, до, количество_знаков_после_запятой); 
// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой" 
Диапазон может быть только положительный, включая ноль. 
А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему. 
Не забудьте, что в случае с дробными числами диапазон может быть в десятых, сотых, тысячных и т. д. долях. Например, 1.1, 1.2 — корректный диапазон.
*/


/*maxRangeValue = (maxRangeValue > 360) ? maxRangeValue : 360;

if ((minRangeValue <= 0 && maxRangeValue < 0)
  &&
  (minRangeValue > maxRangeValue)) {
  return NaN;
}

const wholeRandomNumber = (number) => {
  return Math.floor((number / 10 ^ String(PreseInt(number)).length) * 10 ^ fractionLength);
}

const fractionRandomNumber = (number) => {
  return Math.floor((number - PreseInt(number)) * 10 ^ fractionLength);
}

let generateNumber = (callback) => {
  let min;
  let max;

  if (whole) {
    min = minRangeValue / 10 ^ numberDigit(minRangeValue);
    max = minRangeValue / 10 ^ numberDigit(minRangeValue);
  } else {
    min =
      max = minRangeValue - PreseInt(minRangeValue);
  }

  let n = Math.random();
  while (n < min && n > max) {
    n = Math.random();
  }
  return n;
}

let wholeNumber = generateNumber(whole);
let fractionNumber = generateNumber(!whole);

// return wholeNumber = fractionNumber;

/*имя_функции(от, до, количество_знаков_после_запятой); 
// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой" 
Диапазон может быть только положительный, включая ноль. 
А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему. 
Не забудьте, что в случае с дробными числами диапазон может быть в десятых, сотых, тысячных и т. д. долях. Например, 1.1, 1.2 — корректный диапазон.
*/
