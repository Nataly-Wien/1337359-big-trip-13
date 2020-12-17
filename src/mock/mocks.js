import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {EVENT_TYPES} from '../const';
import {OFFERS} from '../const';

const ID_LENGTH = 5;
const DESCRIPTION_LENGTH = 5;
const PHOTO_NUMBER = 8;
const PHOTO_ADDRESS = `http://picsum.photos/248/152?r=${Math.random()}`;
const MAX_PRICE = 100;
const MAX_OFFER_PRICE = 20;
const DATE_GAP = 30 * 24 * 3600 * 1000; // даты в течение месяца
const DAY_GAP = {
  max: 12 * 3600 * 1000, // продолжительность от 15 мин до 12 ч
  min: 0.25 * 3600 * 1000,
};
const ROUND_TIME = 5 * 60 * 1000; // округление до 5 мин

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

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const now = dayjs();

const getRandomInRange = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayFromList = (list) => list.filter((item) => item && Math.random() > 0.5);

const getRandomFromText = (text, count) => getRandomArrayFromList(text.split(`.`), count).join(`.`);

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

const getRandomOffers = () => Object.entries(OFFERS).map((item) => ({
  type: item[0],
  title: item[1],
  price: getRandomInRange(MAX_OFFER_PRICE, 1) * 5,
  isChecked: Math.random() > 0.8,
}));

const getRandomStartEndDate = () => {
  const dataTime = getRandomInRange(now.unix() * 1000 + DATE_GAP, now.unix() * 1000 - DATE_GAP);
  const duration = getRandomInRange(DAY_GAP.max, DAY_GAP.min);

  return {
    start: dataTime - dataTime % ROUND_TIME,
    end: dataTime - dataTime % ROUND_TIME + duration - duration % ROUND_TIME,
  };
};

export const generateEvent = () => {
  const date = getRandomStartEndDate();

  return {
    id: nanoid(ID_LENGTH),
    type: EVENT_TYPES[getRandomInRange(EVENT_TYPES.length - 1)],
    city: CITIES[getRandomInRange(CITIES.length - 1)],
    price: getRandomInRange(MAX_PRICE, 1) * 10,
    offers: getRandomOffers(),
    description: getRandomFromText(TEXT, getRandomInRange(DESCRIPTION_LENGTH)),
    descriptionPhotos: getRandomArrayFromString(PHOTO_ADDRESS, getRandomInRange(PHOTO_NUMBER, 1)),
    startDateTime: date.start,
    endDateTime: date.end,
    isFavorite: Math.random() > 0.7,
  };
};
