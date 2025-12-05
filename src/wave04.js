const axios = require('axios');
const dotEnv = require('dotenv');

dotEnv.config();
const LOCATIONIQ_KEY = process.env.LocationIQ_API;
const OPENWEATHER_KEY = process.env.OpenWeather_API;

const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;

  return axios.get('https://us1.locationiq.com/v1/search.php',
    {
      params: {
        key: LOCATIONIQ_KEY,
        q: query,
        format: 'json'
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
  return axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat: latitude,
      lon: longitude,
      appid: OPENWEATHER_KEY,
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
    state.temperature = temp;
    updateTemperatureUI();
  } catch (error) {
    console.log('Failed to update temperature:', error);
  }
};

const updateTemperatureUI = () =>{
  const tempEl = document.getElementById('temp-value');
  if (!tempEl) return;
  tempEl.textContent = state.temperature;
}


// const getRealtimeTemp = () => {
//   const userCityTemperature = getweatherFromUserInput(UserCity);


// }
