import {randomInt, getDate, shuffle} from "../utils.js";
import {types, cities, otherOptions, expressions, offerTypes} from "../const.js";

const PRICE_MIN = 5;
const PRICE_MAX = 500;
const COUNT_PHOTO = 5;
const maxDaysGap = 7;


const getDay = () => {
  const daysGap = randomInt(-maxDaysGap, maxDaysGap);

  const dateArrival = getDate().add(daysGap, `day`)
          .add(randomInt(24), `hour`)
          .add(randomInt(60), `minute`);
  const dateDeparture = dateArrival.add(randomInt(20, 6000), `minute`);

  return {
    dateArrival: dateArrival.toDate(),
    dateDeparture: dateDeparture.toDate()
  };
};

const getImages = () => {
  return new Array(randomInt(COUNT_PHOTO)).fill(` `).map(() => ({
    src: `http://picsum.photos/300/150?r=${Math.random()}`
  }));
};

const generateId = () => {
  return Date.now() + parseInt(Math.random() * 10000, 10);
};

const generateTask = () => {
  const type = types[randomInt(types.length - 1)];
  return {
    pointType: type,
    destinationCity: cities[randomInt(cities.length - 1)],
    offers: {
      offerType: offerTypes[randomInt(offerTypes.length - 1)],
      title: otherOptions[randomInt(otherOptions.length - 1)],
      price: randomInt(PRICE_MIN, PRICE_MAX),
      checked: Boolean(randomInt())
    },
    options: shuffle(offerTypes.slice()).slice(0, randomInt(5)),
    destination: {
      description: shuffle(expressions.slice()).slice(0, randomInt(5)),
      pictures: getImages()
    },
    isfavorite: Boolean(randomInt()),
    id: generateId(),
    mainPrice: randomInt(500, 5000),
    date: getDay()
  };
};

export const generateTaskArray = (number) => {

  return new Array(number)
    .fill(` `)
    .map(() => generateTask())
    .sort((prev, next) => prev.date.dateArrival - next.date.dateArrival);
};
