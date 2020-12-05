
import {getDate, createElement} from "../utils.js";

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

export default class TripInfo {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createTripInfoTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
