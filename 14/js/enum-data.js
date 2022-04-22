const CHECKIN_TIMES = ['12:00', '13:00', '14:00',];

const CHECHOUT_TIMES = ['12:00', '13:00', '14:00',];

const FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',];

const LODGING_PROPERTIES = {
  bungalow: {
    fieldText: 'Бунгало',
    priceRange: {
      min: 0,
      max: 100000,
    }
  },
  flat: {
    fieldText: 'Квартира',
    priceRange: {
      min: 1000,
      max: 100000,
    },
  },
  hotel: {
    fieldText: 'Отель',
    priceRange: {
      min: 3000,
      max: 100000,
    },
  },
  house: {
    fieldText: 'Дом',
    priceRange: {
      min: 5000,
      max: 100000,
    },
  },
  palace:{
    fieldText: 'Дворец',
    priceRange: {
      min: 10000,
      max: 100000,
    },
  },
};
const lodgingTypesMinPrice = Object.fromEntries(Object.entries(LODGING_PROPERTIES).map(([ key, val ]) => [ key, val.priceRange.min]));
const lodgingTypesMaxPrice = Object.fromEntries(Object.entries(LODGING_PROPERTIES).map(([ key, val ]) => [ key, val.priceRange.max]));

const HOUSING_CLASS_PRICE = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 100000,
  },
};

export {
  CHECKIN_TIMES,
  CHECHOUT_TIMES,
  FEATURES_TYPES,
  LODGING_PROPERTIES,
  lodgingTypesMaxPrice,
  lodgingTypesMinPrice,
  HOUSING_CLASS_PRICE,
};
