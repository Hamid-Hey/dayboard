let weekFirstDay = moment().startOf("week");

const weekDays = [
  {
    day: "Sunday",
    brief: "Sun",
    date: "",
  },
  {
    day: "Monday",
    brief: "Mon",
    date: "",
  },
  {
    day: "Tuesday",
    brief: "Tue",
    date: "",
  },
  {
    day: "Wednesday",
    brief: "Wed",
    date: "",
  },
  {
    day: "Thursday",
    brief: "Thu",
    date: "",
  },
  {
    day: "Friday",
    brief: "Fri",
    date: "",
  },
  {
    day: "Saturday",
    brief: "Sat",
    date: "",
  },
];

weekDays[0].date = weekFirstDay.format("MM/DD/YYYY");

weekDays.forEach((day, index) => {
  if (index !== 0) {
    let counter = 1;
    day.date = weekFirstDay.add(counter, "day").format("MM/DD/YYYY");
    counter++;
  }
});

const tableDates = Array.from(document.getElementsByClassName("table__date"));

tableDates.forEach((date, index) => {
  date.innerText = weekDays[index].date;
});

let today = moment().format("dddd");

let todayRow = document.getElementById(today);

todayRow.classList.add("current-day");

let input = document.getElementsByClassName("input");

function toSeconds(id) {
  let inputValue = document.getElementById(id).value;
  let splittedTime = inputValue.split(":").map((item) => parseInt(item));

  let totalSeconds =
    splittedTime[0] * 3600 + splittedTime[1] * 60 + splittedTime[2];

  return totalSeconds || 0;
}

function getIds(className) {
  /*just pass string literal as an argement */
  let elements = document.getElementsByClassName(className);
  let arrayOfElements = Array.from(elements);

  let ids = arrayOfElements.map((item) => item.id);
  return ids;
}

function aveColumn() {
  const secondsArray = [];
  let sum = 0;
  let ave = 0;

  getIds("input").map((item) => {
    secondsArray.push(toSeconds(item));
  });

  for (let value of secondsArray) {
    sum += value;
  }

  let activeItems = 0;
  secondsArray.map((item) => {
    if (item !== 0) {
      activeItems++;
    }
  });

  ave = activeItems !== 0 ? sum / activeItems : sum;

  document.getElementById("sleep__average").innerText = timeFormater(ave);
}

function sumColumn() {
  const secondsArray = [];
  let sum = 0;

  getIds("input").map((item) => {
    secondsArray.push(toSeconds(item));
  });

  for (let value of secondsArray) {
    sum += value;
  }

  document.getElementById("sleep__total").innerText = timeFormater(sum);
}

function timeFormater(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = Math.floor(timeInSeconds - (hours * 3600 + minutes * 60));

  if (hours + minutes + seconds !== 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return "";
  }
}

function onBlur() {
  aveColumn();
  sumColumn();
}
