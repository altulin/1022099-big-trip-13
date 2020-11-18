import {createTripInfoTemplate} from "./view/trip-info.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/trip-filter.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createTripEventsTemplate} from "./view/trip-events.js";

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
render(siteTripEventsElement, createTripEventsTemplate(), `beforeend`);
