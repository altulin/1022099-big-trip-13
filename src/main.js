import {createTripInfoTemplate} from "./view/info.js";
import {createSiteMenuTemplate} from "./view/menu.js";
import {createSiteFilterTemplate} from "./view/filter.js";
import {createTripSortTemplate} from "./view/sort.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventPointTemplate} from "./view/event-point.js";

const EVENTS_COUNT = 3;
const siteHeaderElement = document.querySelector(`.page-header`);
const siteHeaderControlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderControlsElement, createTripInfoTemplate(), `beforebegin`);
render(siteHeaderControlsElement, createSiteMenuTemplate(), `afterbegin`);
render(siteHeaderControlsElement, createSiteFilterTemplate(), `beforeend`);
render(siteTripEventsElement, createTripSortTemplate(), `afterbegin`);
render(siteTripEventsElement, createEventListTemplate(), `beforeend`);

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);

render(siteTripEventsListElement, createEventEditTemplate(), `afterbegin`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(siteTripEventsListElement, createEventPointTemplate(), `beforeend`);
}
