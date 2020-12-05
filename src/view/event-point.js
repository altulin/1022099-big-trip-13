import {convert, getDate, createElement} from "../utils.js";

const createEventPointTemplate = (item) => {
  const {date: {dateArrival, dateDeparture}, pointType, destinationCity} = item;
  const duration = convert(dateArrival, dateDeparture);

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${getDate(dateArrival).format(`YYYY-MM-DD`)}">${getDate(dateArrival).format(`MMM D`)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${item.pointType.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${pointType} ${destinationCity}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${getDate(dateArrival).format(`YYYY-MM-DDTHH:mm:ss`)}">${getDate(dateArrival).format(`HH:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${getDate(dateDeparture).format(`YYYY-MM-DDTHH:mm:ss`)}">${getDate(dateDeparture).format(`HH:mm`)}</time>
      </p>
      <p class="event__duration">${duration.days}${duration.hours}${duration.minutes}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${item.mainPrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">${item.offers.offerType}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.offers.price}</span>
      </li>
    </ul>
    <button class="event__favorite-btn ${item.isfavorite ? `event__favorite-btn--active` : ``}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class EventPoint {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createEventPointTemplate(this._task);
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
