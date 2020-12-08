import AbstractTrip from '../view/abstract';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};


export const renderElement = (container, element, position) => {
  if (element instanceof AbstractTrip) {
    element = element.getElement();
  }

  if (container instanceof AbstractTrip) {
    container = container.getElement();
  }

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


export const renderTemplate = (container, template, position) => {
  if (container instanceof AbstractTrip) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(position, template);
};


export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};


export const replaceElement = (newElement, oldElement) => {
  if (newElement instanceof AbstractTrip) {
    newElement = newElement.getElement();
  }

  if (oldElement instanceof AbstractTrip) {
    oldElement = oldElement.getElement();
  }

  const parent = oldElement.parentElement;

  if (newElement === null || oldElement === null || parent === null) {
    throw new Error(`Cannot replace non-existent element`);
  }

  parent.replaceChild(newElement, oldElement);
};
