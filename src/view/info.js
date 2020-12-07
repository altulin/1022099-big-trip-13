
import {getDate} from "../utils.js";
import Abstract from "./abstract.js";

const createTripInfoTemplate = (item) => {
  const {dateArrival, dateDeparture} = item.date;

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
    <p class="trip-info__dates">${getDate(dateArrival).format(`MMM D`)}&nbsp;&mdash;&nbsp;${getDate(dateDeparture).format(`D`)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>
</section>`;
};

export default class TripInfo extends Abstract {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTripInfoTemplate(this._task);
  }
}
