"use strict";

const state = {
  temperature: 70,
};

const getTemperatureColorClass = (temp) => {
  if (temp >= 80) {
    return "red";
  } else if (temp >= 70) {
    return "orange";
  } else if (temp >= 60) {
    return "yellow";
  } else if (temp >= 50) {
    return "green";
  } else {
    return "teal";
  }
};

const getLandscapeForTemperature = (temp) => {
  if (temp >= 80) {
    return "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  } else if (temp >= 70) {
    return "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  } else if (temp >= 60) {
    return "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (temp >= 50) {
    return "🌳🌳🍂_🍃__🪵_🌳🍂_🍃🌳";
  } else {
    return "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }
};

const updateTemperatureUI = () => {
  const tempValueEl = document.querySelector("#temp-value");
  const landscapeEl = document.querySelector("#landscape");
  const gardenContentEl = document.querySelector("#garden-content");

  if (!tempValueEl || !landscapeEl || !gardenContentEl) return;

  tempValueEl.textContent = state.temperature;

  tempValueEl.classList.remove("red", "orange", "yellow", "green", "teal");
  const colorClass = getTemperatureColorClass(state.temperature);
  tempValueEl.classList.add(colorClass);

  gardenContentEl.classList.remove("red", "orange", "yellow", "green", "teal");
  gardenContentEl.classList.add(colorClass);

  landscapeEl.textContent = getLandscapeForTemperature(state.temperature);
};

const registerEventHandlers = () => {
  const tempUpButton = document.querySelector("#temp-up");
  const tempDownButton = document.querySelector("#temp-down");

  if (tempUpButton) {
    tempUpButton.addEventListener("click", () => {
      state.temperature += 1;
      updateTemperatureUI();
    });
  }

  if (tempDownButton) {
    tempDownButton.addEventListener("click", () => {
      state.temperature -= 1;
      updateTemperatureUI();
    });
  }

  updateTemperatureUI();
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);