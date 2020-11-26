import dayjs from "dayjs";

export const createTripInfoTemplate = (price, dates, trip) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${trip}</h1>
              <p class="trip-info__dates">${dayjs(dates.startDate).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${dayjs(dates.endDate).format(`MMM DD`)}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>
          </section>`;
};
