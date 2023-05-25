const calendarEL = document.querySelector(".calendar");

new Calendar({
  element: calendarEL,
});

const now = new Date();
const dateNow = document.querySelector(".dateNow");

const day = now.getDate().toString().padStart(2, "0");
const month = (now.getMonth() + 1).toString().padStart(2, "0");
const year = now.getFullYear();

dateNow.textContent = `${day}-${month}-${year}`;

dateNow.addEventListener("click", () => {
  location.reload();
});

