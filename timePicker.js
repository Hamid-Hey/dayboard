function activate() {
  document.querySelectorAll(".time-pickable").forEach((timePickable) => {
    let activePicker = null;

    timePickable.addEventListener("focus", () => {
      if (activePicker) return; /* to avoid show time picker by double click */

      activePicker = show(timePickable);

      const onCkickAway = ({ target }) => {
        if (
          target === activePicker ||
          target === timePickable ||
          activePicker.contains(target)
        ) {
          return;
        }

        document.removeEventListener(
          "mousedown",
          onCkickAway
        ); /* just to avoid memory waisting */
        document.body.removeChild(activePicker);
        activePicker = null;
      };

      document.addEventListener("mousedown", onCkickAway);
    });
  });
}

function show(timePickable) {
  const picker = buildPicker(timePickable);
  const { bottom: top, left } = timePickable.getBoundingClientRect();

  picker.style.top = `${top}px`;
  picker.style.left = `${left}px`;

  document.body.appendChild(picker);

  return picker;
}

function buildPicker(timePickable) {
  const picker = document.createElement("div");
  const hourOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ].map(numberToOPtion);

  const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
    numberToOPtion
  );

  picker.classList.add("time-picker");
  picker.innerHTML = `
  <select class="time-picker__select">
    ${hourOptions.join("")}
  </select>
  :
  <select class="time-picker__select">
    ${minuteOptions.join("")}
  </select>
  `;

  const selects = getSelectsFromPicker(picker);

  selects.hour.addEventListener("change", () => {
    timePickable.value = getTimeStringFromPicker(picker);
  });
  selects.minute.addEventListener("change", () => {
    timePickable.value = getTimeStringFromPicker(picker);
  });

  if (timePickable.value) {
    const { hour, minute } = getTimeParts(timePickable);

    selects.hour.value = hour;
    selects.minute.value = minute;
  }

  return picker;
}

function getTimeParts(timePickable) {
  const pattern = /^(\d+):(\d+)$/;
  const [hour, minute] = timePickable.value.match(pattern).splice(1);
  return {
    hour,
    minute,
  };
}

function getSelectsFromPicker(timePicker) {
  const [hour, minute] = timePicker.querySelectorAll(".time-picker__select");

  return {
    hour,
    minute,
  };
}

function getTimeStringFromPicker(timePicker) {
  const selets = getSelectsFromPicker(timePicker);

  return `${selets.hour.value}:${selets.minute.value}`;
}

function numberToOPtion(number) {
  const padded = number.toString().padStart(2, "0");

  return `<option value="${padded}">${padded}</option>`;
}

activate();
