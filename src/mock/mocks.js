import dayjs from 'dayjs';

const EVENT_TYPES_NUMBER = 5;
const CITY_NUMBER = 10;
const OFFER_NUMBER = 5;
const DESCRIPTION_LENGTH = 5;
const PHOTO_NUMBER = 8;
const PHOTO_ADDRESS = `http://picsum.photos/248/152?r=${Math.random()}`;
const MAX_PRICE = 1000;
const MAX_OFFER_PRICE = 20;
const YEAR = 365 * 24 * 3600 * 1000;
const DAY = 24 * 3600 * 1000;

const EVENT_TYPES = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
];


const CITIES = [
  `Vienna`,
  `Berlin`,
  `Madrid`,
  `Paris`,
  `Moscow`,
  `Roma`,
  `London`,
  `Dublin`,
  `Bratislava`,
  `Athene`,
];

const OFFERS_TITLE = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
  `Travel by train`,
];

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const now = dayjs();

const getRandomInRange = (max, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFromList = (list) => list[getRandomInRange(list.length - 1, 0)];

const getRandomArrayFromList = (list) => list.filter((item) => item && Math.random() > 0.5);

const getRandomFromText = (text, count) => getRandomArrayFromList(text.split(`.`), count).join(`.`);

const getRandomDataTime = (timeGap) => getRandomInRange(now.unix() * 1000 + timeGap, now.unix() * 1000 - timeGap);

const getRandomArrayFromString = (string, count) => {
  let arr = [];

  if (Math.random() > 0.5) {
    return arr;
  }

  for (let i = 0; i < count; i++) {
    arr.push(string);
  }

  return arr;
};

const getRandomArrayFromObj = (count) => {
  let arr = [];

  for (let i = 0; i < count; i++) {
    arr.push({
      title: getRandomFromList(OFFERS_TITLE),
      price: getRandomInRange(MAX_OFFER_PRICE) * 5,
      type: getRandomFromList(EVENT_TYPES),
    });
  }

  return arr;
};

export const generateEvent = () => {
  return {
    type: EVENT_TYPES[getRandomInRange(EVENT_TYPES_NUMBER)],
    city: CITIES[getRandomInRange(CITY_NUMBER)],
    price: getRandomInRange(MAX_PRICE) * 10,
    offers: getRandomArrayFromObj(getRandomInRange(OFFER_NUMBER)),
    description: getRandomFromText(TEXT, getRandomInRange(DESCRIPTION_LENGTH)),
    descriptionPhotos: getRandomArrayFromString(PHOTO_ADDRESS, getRandomInRange(PHOTO_NUMBER)),
    startDateTime: getRandomDataTime(now, YEAR),
    duration: getRandomInRange(DAY),
  };
};
