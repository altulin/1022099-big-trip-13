// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
import dayjs from "dayjs";

export const getDate = (date) => (date) ? dayjs(date) : dayjs();

export const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const convert = (timeIn, timeOut) => {
  const milliseconds = timeOut - timeIn;
  let day;
  let hour;
  let minute;
  let seconds;

  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  return {
    days: (day === 0) ? `` : `${day}D `,
    hours: (hour === 0) ? `` : `${hour}H `,
    minutes: `${minute}M`,
    // second: seconds
  };
};
