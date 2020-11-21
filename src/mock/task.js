import dayjs from "dayjs";
import {randomInt, convertMS} from "../utils.js";
import {types, cityes, otherOptions, expressions, offerTypes} from "../const.js";

const PRICE_MIN = 5;
const PRICE_MAX = 500;
const COUNT_PHOTO = 5;
const maxDaysGap = 7;


const getDay = () => {
  const daysGap = randomInt(-maxDaysGap, maxDaysGap);
  const randomDate = dayjs().add(daysGap, `day`)
          .add(randomInt(24), `hour`)
          .add(randomInt(60), `minute`);

  const timeArrival = randomDate;
  const timeDeparture = randomDate.add(randomInt(20, 6000), `minute`);
  const timeDuration = timeDeparture - timeArrival;

  return {
    day: randomDate,
    dayOfMonth: randomDate.format(`MMM D`),
    // arrival: timeArrival.format(`HH:mm`),
    // departure: timeDeparture.format(`HH:mm`),
    timeDeparture,
    timeArrival,
    duration: convertMS(timeDuration)
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
  // const data = dayjs();

  return {
    pointType: type,
    city: cityes[randomInt(cityes.length - 1)],
    offers: {
      offerType: offerTypes[randomInt(offerTypes.length - 1)],
      title: otherOptions[randomInt(otherOptions.length - 1)],
      price: randomInt(PRICE_MIN, PRICE_MAX)
    },
    destination: {
      description: expressions[randomInt(expressions.length - 1)],
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
    .sort((prev, next) => prev.date.day - next.date.day);
};
