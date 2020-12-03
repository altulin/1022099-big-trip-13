import TripInfo from "./view/info.js";
import SiteMenu from "./view/menu.js";
import SiteFilter from "./view/filter.js";
import TripSort from "./view/sort.js";
import EventList from "./view/event-list.js";
import EventEdit from "./view/event-edit.js";
import EventPoint from "./view/event-point.js";
import {generateTaskArray} from "./mock/task.js";
import {render} from "./utils.js";

const NUMBER_TASKS = 20;
const siteHeaderElement = document.querySelector(`.page-header`);
const siteHeaderTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const points = generateTaskArray(NUMBER_TASKS);

render(siteHeaderTripMainElement, new TripInfo(points[0]).getElement(), `afterbegin`);
render(siteHeaderControlsElement, new SiteFilter().getElement(), `afterbegin`);
render(siteHeaderControlsElement, new SiteMenu().getElement(), `afterbegin`);
render(siteTripEventsElement, new TripSort().getElement(), `afterbegin`);
render(siteTripEventsElement, new EventList().getElement(), `beforeend`);

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new EventPoint(task);
  const taskEditComponent = new EventEdit(task);
  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), `beforeend`);
};

points.slice().forEach((point) => renderTask(siteTripEventsListElement, point));
points.forEach((item) => console.log(item));
