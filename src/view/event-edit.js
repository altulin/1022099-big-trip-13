import {cities, types, offerTypes} from '../const.js';
import {getDate} from "../utils.js";
import Abstract from "./abstract.js";

const createDatalistTemplate = (locality) => {
  return locality
    .map((item) => {
      return `<option value="${item}"></option>`;
    }).join(``);
};

const createEventTypeTemplate = (element) => {
  return element
          .map((item) => {
            return `<div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">${item}</label>
            </div>`;
          }).join(``);
};

const createOfferSelectorTemplate = (element) => {
  return element
          .map((item) => {
            return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item}-1" type="checkbox" name="event-offer-${item}">
              <label class="event__offer-label" for="event-offer-${item}-1">
                <span class="event__offer-title">Add ${item}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">30</span>
              </label>
            </div>`;
          }).join(``);
};

const createEventEditTemplate = (item) => {
  const datalistTemplate = createDatalistTemplate(cities);
  const eventTypeTemplate = createEventTypeTemplate(types);
  const offerSelectorTemplate = createOfferSelectorTemplate(offerTypes);
  const {date: {dateArrival, dateDeparture}, mainPrice, pointType, destinationCity} = item;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${item.pointType.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${eventTypeTemplate}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${pointType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationCity}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${datalistTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDate(dateArrival).format(`YYYY/MM/DD HH:mm`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDate(dateDeparture).format(`YYYY/MM/DD HH:mm`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${mainPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offerSelectorTemplate}
        </div>
      </section>
    </section>
  </form>
</li>`;
};

export default class EventEdit extends Abstract {

  constructor(task) {
    super();
    this._task = task;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createEventEditTemplate(this._task);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`form`).addEventListener(`click`, this._clickHandler);
  }

}
