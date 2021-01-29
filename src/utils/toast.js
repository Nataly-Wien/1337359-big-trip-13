const SHOW_TIME = 5000;

const toastContainer = document.createElement(`div`);
toastContainer.classList.add(`toast-container`);
document.body.append(toastContainer);

export const showToast = (message) => {
  const oldToast = document.querySelector(`.toast-message`);
  const toast = document.createElement(`div`);
  toast.textContent = message;
  toast.classList.add(`toast-message`);
  toast.style.marginTop = `${Math.floor(window.pageYOffset)}px`;

  if (oldToast) {
    toastContainer.replaceChild(toast, oldToast);
  } else {
    toastContainer.append(toast);
  }

  setTimeout(() => {
    toast.remove();
  }, SHOW_TIME);
};
