'use strict';
'use strict';

const state = {
  temperature: 70,
  sky: 'cloudy',
  defaultCity: 'Seattle',
};

const getTemperatureColorClass = (temp) => {
  if (temp >= 80) {
    return 'red';
  } else if (temp >= 70) {
    return 'orange';
  } else if (temp >= 60) {
    return 'yellow';
  } else if (temp >= 50) {
    return 'green';
  } else {
    return 'teal';
  }
};

const getLandscapeForTemperature = (temp) => {
  if (temp >= 80) {
    return '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    return '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    return '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    return '🌳🌳🍂_🍃__🪵_🌳🍂_🍃🌳';
  } else {
    return '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const skyMap = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

const updateTemperatureUI = () => {
  const tempValueEl = document.querySelector('#temp-value');
  const landscapeEl = document.querySelector('#landscape');
  const gardenContentEl = document.querySelector('#garden-content');

  if (!tempValueEl || !landscapeEl || !gardenContentEl) return;

  tempValueEl.textContent = state.temperature;

  tempValueEl.classList.remove('red', 'orange', 'yellow', 'green', 'teal');
  const colorClass = getTemperatureColorClass(state.temperature);
  tempValueEl.classList.add(colorClass);

  gardenContentEl.classList.remove('red', 'orange', 'yellow', 'green', 'teal');
  gardenContentEl.classList.add(colorClass);

  landscapeEl.textContent = getLandscapeForTemperature(state.temperature);
};

const registerTemperatureHandlers = () => {
  const tempUpButton = document.querySelector('#temp-up');
  const tempDownButton = document.querySelector('#temp-down');

  updateTemperatureUI();

  if (tempUpButton) {
    tempUpButton.addEventListener('click', () => {
      state.temperature += 1;
      updateTemperatureUI();
    });
  }

  if (tempDownButton) {
    tempDownButton.addEventListener('click', () => {
      state.temperature -= 1;
      updateTemperatureUI();
    });
  }
};

const updateSkyUI = () => {
  const skyEl = document.querySelector('#sky');
  const gardenContentEl = document.querySelector('#garden-content');
  if (!skyEl || !gardenContentEl) return;

  const skyType = state.sky;
  skyEl.textContent = skyMap[skyType];

  gardenContentEl.classList.remove('cloudy', 'sunny', 'rainy', 'snowy');
  gardenContentEl.classList.add(skyType);
};

const registerSkyHandlers = () => {
  const skySelectEl = document.querySelector('#sky-dropdown');
  if (!skySelectEl) return;

  state.sky = skySelectEl.value;
  updateSkyUI();

  skySelectEl.addEventListener('change', (event) => {
    const selectedSky = event.target.value;
    state.sky = selectedSky;
    updateSkyUI();
  });
};

const updateCityName = () => {
  const cityInput = document.getElementById('cityInput');
  const cityNameElement = document.getElementById('header-city-name');
 
  if(!cityInput || !cityNameElement)return;

  cityInput.value = state.defaultCity;
  cityNameElement.textContent = state.defaultCity;

};
const registerCityHandlers = () => {

  const cityInput = document.getElementById('cityInput');
  const cityNameElement = document.getElementById('header-city-name');
  const resetbtn = document.getElementById('city-reset-btn');

  if (!cityInput || !cityNameElement || !resetbtn)return;
  updateCityName();

  cityInput.addEventListener('input', () => {
    cityNameElement.textContent = cityInput.value;
  });
  resetbtn.addEventListener('click', () => {
    state.defaultCity = 'Seattle';
    updateCityName();
  });

};

document.addEventListener("DOMContentLoaded", () => {
  registerEventHandlers();
  registerSkyHandlers();
  registerCityHandlers();
});