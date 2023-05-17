class Calendar {
  constructor({ element, defaulDate }) {
    if (element instanceof HTMLElement) {
      this.element = element;
    } else {
      throw new Error("element should be HTMLElement");
    }

    if (defaulDate instanceof Date) {
      this.defaulDate = defaulDate;
    } else {
      this.defaulDate = new Date();
    }

    this.#init();
  }
  //private properties
  #year;
  #month;
  #date;
  #dateString;
  #crewNumber = 2;

  #crew1 = {
    newDateMorning1: new Date(2023, 0, 6),
    newDateMorning2: new Date(2023, 0, 7),
    newDateEvening1: new Date(2023, 0, 8),
    newDateEvening2: new Date(2023, 0, 9),
    newDateNight1: new Date(2023, 0, 12),
    newDateNight2: new Date(2023, 0, 13),
  };

  #crew2 = {
    newDateMorning1: new Date(2023, 0, 8),
    newDateMorning2: new Date(2023, 0, 9),
    newDateEvening1: new Date(2023, 0, 10),
    newDateEvening2: new Date(2023, 0, 11),
    newDateNight1: new Date(2023, 0, 14),
    newDateNight2: new Date(2023, 0, 15),
  };
  #crew3 = {
    newDateMorning1: new Date(2023, 0, 10),
    newDateMorning2: new Date(2023, 0, 11),
    newDateEvening1: new Date(2023, 0, 12),
    newDateEvening2: new Date(2023, 0, 13),
    newDateNight1: new Date(2023, 0, 16),
    newDateNight2: new Date(2023, 0, 17),
  };

  #crew4 = {
    newDateMorning1: new Date(2023, 0, 12),
    newDateMorning2: new Date(2023, 0, 13),
    newDateEvening1: new Date(2023, 0, 14),
    newDateEvening2: new Date(2023, 0, 15),
    newDateNight1: new Date(2023, 0, 18),
    newDateNight2: new Date(2023, 0, 19),
  };

  #crew5 = {
    newDateMorning1: new Date(2023, 0, 14),
    newDateMorning2: new Date(2023, 0, 15),
    newDateEvening1: new Date(2023, 0, 16),
    newDateEvening2: new Date(2023, 0, 17),
    newDateNight1: new Date(2023, 0, 20),
    newDateNight2: new Date(2023, 0, 21),
  };

  //private methods
  #init = () => {
    const defaultYear = this.defaulDate.getFullYear();
    const defaultMonth = this.defaulDate.getMonth() + 1;
    const defaultDate = this.defaulDate.getDate();
    this.#setDate(defaultYear, defaultMonth, defaultDate);
    this.#updateData();
    this.#listenEvents();
    this.#selectCrew();
  };

  #updateData = () => {
    let crew;
    switch (this.#crewNumber) {
      case 1:
        crew = this.#crew1;
        break;
      case 2:
        crew = this.#crew2;
        break;
      case 3:
        crew = this.#crew3;
        break;
      case 4:
        crew = this.#crew4;
        break;
      case 5:
        crew = this.#crew5;
        break;
      default:
        break;
    }
    for (let i = 1; i <= 200; i++) {
      let {
        newDateMorning1,
        newDateMorning2,
        newDateEvening1,
        newDateEvening2,
        newDateNight1,
        newDateNight2,
      } = crew;
      newDateMorning1 = new Date(newDateMorning1.getTime() + 86400000 * 10 * i);
      newDateMorning2 = new Date(newDateMorning2.getTime() + 86400000 * 10 * i);

      newDateEvening1 = new Date(newDateEvening1.getTime() + 86400000 * 10 * i);
      newDateEvening2 = new Date(newDateEvening2.getTime() + 86400000 * 10 * i);

      newDateNight1 = new Date(newDateNight1.getTime() + 86400000 * 10 * i);
      newDateNight2 = new Date(newDateNight2.getTime() + 86400000 * 10 * i);

      const dates = this.element.querySelectorAll(".date");
      dates.forEach((data) => {
        if (this.#getDataTilteFormat(new Date()) === data.title) {
          data.classList.add("currentDay");
        }

        if (this.#getDataTilteFormat(newDateMorning1) === data.title) {
          data.classList.add("morning");
        }
        if (this.#getDataTilteFormat(newDateMorning2) === data.title) {
          data.classList.add("morning");
        }
        if (this.#getDataTilteFormat(newDateEvening1) === data.title) {
          data.classList.add("evening");
        }
        if (this.#getDataTilteFormat(newDateEvening2) === data.title) {
          data.classList.add("evening");
        }

        if (this.#getDataTilteFormat(newDateNight1) === data.title) {
          data.classList.add("night");
        }
        if (this.#getDataTilteFormat(newDateNight2) === data.title) {
          data.classList.add("night");
        }
      });
    }
  };

  #getDataTilteFormat = (data) => {
    const monthNames = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return `${
      monthNames[data.getMonth()]
    }-${data.getFullYear()}-${data.getDate()}`;
  };

  #listenEvents = () => {
    //DOMs
    const lastYearButton = this.element.querySelector(".lastYear");
    const nextYearButton = this.element.querySelector(".nextYear");
    const lastMonthButton = this.element.querySelector(".lastMonth");
    const nextMonthButton = this.element.querySelector(".nextMonth");

    //click last year
    lastYearButton.addEventListener("click", () => {
      this.#year--;
      this.#setDate(this.#year, this.#month, this.#date);
      this.#updateData();
    });

    //click next year
    nextYearButton.addEventListener("click", () => {
      this.#year++;
      this.#setDate(this.#year, this.#month, this.#date);
      this.#updateData();
    });

    //click last month
    lastMonthButton.addEventListener("click", () => {
      if (this.#month === 1) {
        this.#month = 12;
        this.#year--;
      } else {
        this.#month--;
      }
      this.#setDate(this.#year, this.#month, this.#date);
      this.#updateData();
    });

    //click next month
    nextMonthButton.addEventListener("click", () => {
      if (this.#month === 12) {
        this.#month = 1;
        this.#year++;
      } else {
        this.#month++;
      }
      this.#setDate(this.#year, this.#month, this.#date);
      this.#renderDates();
      this.#updateData();
    });
  };

  #setDate = (year, month, date) => {
    this.#year = year;
    this.#month = month;
    this.#date = date;
    this.#renderCurrentDate();
    this.#renderDates();
  };

  #renderCurrentDate = () => {
    const currentDateEL = this.element.querySelector(".currentDate");
    this.#dateString = this.#getDateString(this.#year, this.#month, this.#date);
    currentDateEL.textContent = this.#getDateString(this.#year, this.#month);
  };

  #getDateString = (year, month, date) => {
    const monthNames = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    if (date) {
      return `${monthNames[month - 1]}-${year}-${date}`;
    } else {
      return `${monthNames[month - 1]}-${year}`;
    }
  };

  #renderDates = () => {
    const datesEL = this.element.querySelector(".dates");
    //clear before render
    datesEL.innerHTML = "";
    const dayCountInCurrentMonth = this.#getDayCount(this.#year, this.#month);
    const firstDayInCurrentMonth = this.#getFirstDay();

    const { lastMonth, yearOfLastMonth, dayCountOfLastMonth } =
      this.#getLastMonthInfo();
    const { nextMount, yearOfNextMount } = this.#getNextMonthInfo();

    for (let i = 1; i <= 42; i++) {
      const dateEL = document.createElement("button");
      dateEL.classList.add("date");
      let date;

      let dateString;
      if (firstDayInCurrentMonth > 1 && i < firstDayInCurrentMonth) {
        //show dates in last month
        date = dayCountOfLastMonth - (firstDayInCurrentMonth - i) + 1;
        dateString = this.#getDateString(yearOfLastMonth, lastMonth, date);
      } else if (i >= dayCountInCurrentMonth + firstDayInCurrentMonth) {
        //show dates in next month
        date = i - (dayCountInCurrentMonth + firstDayInCurrentMonth) + 1;
        dateString = this.#getDateString(yearOfNextMount, nextMount, date);
      } else {
        //show dates in current month
        date = i - firstDayInCurrentMonth + 1;
        dateString = this.#getDateString(this.#year, this.#month, date);
        dateEL.classList.add("currentMonth");
      }
      dateEL.textContent = date;
      dateEL.title = dateString;
      datesEL.append(dateEL);
    }
  };

  #getLastMonthInfo = () => {
    let lastMonth = this.#month - 1;
    let yearOfLastMonth = this.#year;
    if (lastMonth === 0) {
      lastMonth = 12;
      yearOfLastMonth -= 1;
    }
    const dayCountOfLastMonth = this.#getDayCount(yearOfLastMonth, lastMonth);

    return {
      lastMonth,
      yearOfLastMonth,
      dayCountOfLastMonth,
    };
  };

  #getNextMonthInfo = () => {
    let nextMount = this.#month + 1;
    let yearOfNextMount = this.#year;

    if (nextMount === 13) {
      nextMount = 1;
      yearOfNextMount += 1;
    }
    let dayCountInNextMount = this.#getDayCount(yearOfNextMount, nextMount);
    return {
      nextMount,
      yearOfNextMount,
      dayCountInNextMount,
    };
  };

  #getDayCount = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  #getFirstDay = () => {
    let day = new Date(this.#year, this.#month - 1, 1).getDay();
    return day === 0 ? 7 : day;
  };

  #selectCrew = () => {
    const blockCrew = this.element.querySelector(".crewBlock");
    const crewItem = this.element.querySelectorAll(".crew");
    blockCrew.addEventListener("click", (e) => {
      const target = e.target;
      if (target.matches(".crew")) {
        crewItem.forEach((item) => item.classList.remove("selectedCrew"));
        target.classList.add("selectedCrew");
        this.#crewNumber = +target.textContent;
        this.#renderDates();
        this.#updateData();
      }
    });
  };
}
