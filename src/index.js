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
// wave_04

const PROXY_BASE_URL = 'https://ada-weather-report-proxy-server.onrender.com';

const kelvinIntoFahrenheit = (kelvinTemp) =>{
  const fahrenheitTemp = Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
  return fahrenheitTemp;
};

const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;

  return axios.get(`${PROXY_BASE_URL}/location`,
    {
      params: {
        q: query,
      }
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude);

      return {latitude, longitude};
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!', error);
    });
};

const findweatherforcity = (latitude, longitude) => {
  return axios.get(`${PROXY_BASE_URL}/weather`, {
    params: {
      lat: latitude,
      lon: longitude,
    }
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

};

const getweatherFromUserInput = (query) => {
  return findLatitudeAndLongitude(query)
    .then((response) => findweatherforcity(response.latitude, response.longitude))
    .then((weather) => weather.main.temp)
    .catch((error) => {
      console.log('Error fetching weather for query:', query, error);
    });
};



const updateTemperatureFromUserInput = async (query) => {
  try {
    const temp = await getweatherFromUserInput(query);
    const Fahtemp =kelvinIntoFahrenheit(temp);
    state.temperature = Fahtemp;
    updateTemperatureUI();
  } catch (error) {
    console.log('Failed to update temperature:', error);
  }
};


function registerRealtimeTemperatureHandler() {
  const realtimeBtn = document.querySelector('#realtime-temp-btn');
  realtimeBtn.addEventListener('click', () => {
    const inputCity = document.querySelector('#cityInput').value;

    updateTemperatureFromUserInput(inputCity);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  registerTemperatureHandlers();
  registerSkyHandlers();
  registerCityHandlers();
  registerRealtimeTemperatureHandler();
});