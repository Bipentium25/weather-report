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
  return axios.get('https://api.openweathermap.org/data/2.5/onecall', {
    params: {
      lat: latitude,
      lon: longitude,
      exclude: 'minutely,hourly,alerts,daily',
      appid: OPENWEATHER_KEY,
      units: 'imperial'
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
    .then((response) => {
      return findweatherforcity(response.latitude, response.longitude);
    })
    .catch((error) => {
      console.log('getLocationFromQuery: error fetching location from query!');
    });
};

const UserCity = document.querySelector("#temp-value");

getweatherFromUserInput(UserCity)
  .then((weather) => {
    console.log('Final weather:', weather);
    return weather;
  })
  .catch((error) => {
    console.error('Error getting weather:', error);
  });