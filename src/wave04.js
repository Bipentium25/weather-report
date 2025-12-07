import axios from 'axios';

const PROXY_BASE_URL = "https://ada-weather-report-proxy-server.onrender.com";

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
      console.log('error in findLatitudeAndLongitude!');
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
    console.log(Fahtemp);
    state.temperature = Fahtemp;
    updateTemperatureUI();
  } catch (error) {
    console.log('Failed to update temperature:', error);
  }
};


function registerRealtimeTemperatureHandler() {
  const realtimeBtn = document.querySelector('#realtime-temp-btn');
  realtimeBtn.addEventListener('click', () => {
    const inputCity = document.querySelector('#city-input').value;
    updateTemperatureFromUserInput(inputCity);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  registerTemperatureHandlers();
  registerSkyHandlers();
  registerCityHandlers();
  registerRealtimeTemperatureHandler();
});