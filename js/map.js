/* eslint-disable no-console */
import { createDataSet } from './data-fetch.js';

const offers = createDataSet(); //
const data = offers[0];
console.log(data);

const card = document.querySelector('#card').content;

const avatar = card.querySelector('.popup__avatar');
avatar.src = data.author.avatar;

const title = card.querySelector('.popup__title');
title.innerHTML = data.offer.title;

const address = card.querySelector('.popup__text--address');
address.innerHTML = data.offer.address;

const price = card.querySelector('.popup__text--price');
price.innerHTML = `${data.offer.price} <span>₽/ночь</span>`;

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(card);

console.log(card);
// const prop = card.querySelectorAll('[class*="avatar"]'); //
// console.log(card);
// console.log(prop);

//function getFiniteValue(obj, element) {
//   const cardFields = element.childNodes;
//   console.log(cardFields);
//   getProp(obj);

//   function getProp(o) {
//     for(const prop in o) {
//       if(typeof(o[prop]) === 'object') {
//         getProp(o[prop]);
//       } else {
//         const className = element.querySelector(`[class*='${prop}']`);
//         console.log(className);
//       }
//     }
//   }
// }

// getFiniteValue(offers, card);
//`[class=*'${prop}']
