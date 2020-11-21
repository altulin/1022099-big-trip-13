import {createTripInfoTemplate} from "./view/info.js";
import {createSiteMenuTemplate} from "./view/menu.js";
import {createSiteFilterTemplate} from "./view/filter.js";
import {createTripSortTemplate} from "./view/sort.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventPointTemplate} from "./view/event-point.js";
import {generateTaskArray} from "./mock/task.js";

const NUMBER_TASKS = 20;
const siteHeaderElement = document.querySelector(`.page-header`);
const siteHeaderControlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const points = generateTaskArray(NUMBER_TASKS);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderControlsElement, createTripInfoTemplate(), `beforebegin`);
render(siteHeaderControlsElement, createSiteMenuTemplate(), `afterbegin`);
render(siteHeaderControlsElement, createSiteFilterTemplate(), `beforeend`);
render(siteTripEventsElement, createTripSortTemplate(), `afterbegin`);
render(siteTripEventsElement, createEventListTemplate(), `beforeend`);

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);

render(siteTripEventsListElement, createEventEditTemplate(points[0]), `afterbegin`);

points.forEach((item) => {
  render(siteTripEventsListElement, createEventPointTemplate(item), `beforeend`);
});
