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

const activities = Array.from(document.querySelectorAll(".activity")).map(
  (item) => item.innerText
);

function setInputCellsIds() {
  activities.map((activity, index) => {
    const columnCells = document.querySelectorAll(`td:nth-child(${index + 3})`);
    const inputColumnCells = Array.from(columnCells).slice(1, 8);

    inputColumnCells.forEach((cell) =>
      cell.setAttribute("id", `${activity}__cell`)
    );
  });
}

function setAveCellsIds() {
  activities.map((activity, index) => {
    const aveRowCells = document.querySelectorAll(
      `.ave__row td:nth-child(${index + 3})`
    );

    aveRowCells.forEach((cell) => {
      cell.setAttribute("id", `${activity}__ave`);
    });
  });
}

function setTotalCellsIds() {
  activities.map((activity, index) => {
    const totalRowCells = document.querySelectorAll(
      `.total__row td:nth-child(${index + 3})`
    );

    totalRowCells.forEach((cell) => {
      cell.setAttribute("id", `${activity}__total`);
    });
  });
}

function setInputIds() {
  weekDays.map((item, index) => {
    const inputs = document.querySelectorAll(
      `td:nth-child(${index + 3}) > input`
    );
    Array.from(inputs).map((i, idx) => {
      const prefix = activities[index];
      const suffix = weekDays[idx].day;
      i.setAttribute("id", `${prefix}__${suffix}`);
    });
  });
}

setInputCellsIds();
setAveCellsIds();
setTotalCellsIds();
setInputIds();

let weekFirstDay = moment().startOf("week");

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

function toSeconds(input) {
  let inputValue = document.getElementById(input.id).value;
  let splittedTime = inputValue.split(":").map((item) => parseInt(item));

  if (splittedTime.length === 2) {
    splittedTime.push(0);
  }

  let totalSeconds =
    splittedTime[0] * 3600 + splittedTime[1] * 60 + splittedTime[2];

  return totalSeconds || 0;
}

function aveColumn(columnId, aveCellId) {
  const secondsArray = [];
  let sum = 0;
  let ave = 0;
  Array.from(document.querySelectorAll(`#${columnId} > input`)).map((item) => {
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

  document.getElementById(`${aveCellId}`).innerText = timeFormatter(ave);
}

function sumColumn(columnId, sumCellId) {
  const secondsArray = [];
  let sum = 0;

  Array.from(document.querySelectorAll(`#${columnId} > input`)).map((item) => {
    secondsArray.push(toSeconds(item));
  });

  for (let value of secondsArray) {
    sum += value;
  }
  document.getElementById(`${sumCellId}`).innerText = timeFormatter(sum);
}

function timeFormatter(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = Math.floor(timeInSeconds - (hours * 3600 + minutes * 60));

  const hour = hours.toString().padStart(2, "0");
  const minute = minutes.toString().padStart(2, "0");
  const second = seconds.toString().padStart(2, "0");

  if (timeInSeconds !== 0) {
    return `${hour}:${minute}:${second}`;
  } else {
    return "";
  }
}

function onChange(event) {
  const columnId = event.target.parentElement.id;
  const aveCellId = columnId.split("__")[0].concat("__ave");
  const sumCellId = columnId.split("__")[0].concat("__total");

  aveColumn(columnId, aveCellId);
  sumColumn(columnId, sumCellId);
}
