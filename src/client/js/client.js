import { countdown } from "./countdown";
import { getPixabay } from "./pixabay";

const forecastUI = document.getElementsByClassName("weather-degrees")[0];
const dateDegreeDisplay = document.getElementsByClassName("date-degrees");

// request to GEONAMES
async function handleSubmit(e) {
  e.preventDefault();

  const geonamesData = await getDataFromGeoNames();
  // console.log("data from GeonameAPI", geonamesData);

  const response = await postData("http://localhost:8000/addCity", {
    lat: geonamesData.geonames[0].lat,
    lng: geonamesData.geonames[0].lng,
    country: geonamesData.geonames[0].countryName,
  });
  const weatherbitData = await getWeatherbitAPI(response);
  // console.log("data from weatherbitAPI", weatherbitData);

  const forecast = await postData("http://localhost:8000/addWeatherbit", {
    cityName: weatherbitData.cityName,
    forecast: weatherbitData.weather,
    date: weatherbitData.datetime,
  });

  // console.log(forecast);

  await getPixabay(weatherbitData);

  await updateUI(forecast, geonamesData);

  // activate countdown to departure
  countdown();
}

// update the UI
const updateUI = async (forecast, geonamesData) => {
  // Update "ANYDAY" to the city that the user inputs
  const anyday = document.getElementsByClassName("anyday")[0];
  const exploreToday = document.getElementById("explore-today");

  exploreToday.innerHTML = "";
  anyday.innerHTML = geonamesData.geonames[0].name;
  anyday.classList.add("anyday-active");
  console.log(anyday);
  // console.log(forecast[0].day.toString());
  // Get DOM element and update date and degrees on request
  for (let i = 0; i < dateDegreeDisplay.length; i++) {
    const d = new Date(forecast[i].day);
    const a = d.toString();
    // console.log(a);
    console.log(a.slice(0, 4));

    dateDegreeDisplay[i].children[0].innerHTML = forecast[i].day;
    dateDegreeDisplay[i].children[1].innerHTML = `${forecast[i].celcius}°`;
  }

  forecastUI.style.display = "grid";
  document.getElementById("forecast-header").innerHTML = "16 Day Forecast";
};

const getWeatherbitAPI = async (response) => {
  const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
  const API_KEY = "&key=d19e85ae1f564e4483bef3ec6d5390d6";
  const lat = `&lat=${response.latitude}`;
  const lon = `&lon=${response.longitude}`;
  const country = "&city=";
  const url = baseUrl + country + lat + lon + API_KEY;

  const request = await fetch(url);
  try {
    const newData = await request.json();
    const weatherData = {
      weather: newData.data,
      cityName: newData.city_name,
    };
    return weatherData;
  } catch (error) {
    console.log("error getWeaterbitAPI", error);
  }
};

const getDataFromGeoNames = async () => {
  const cityName = document.getElementById("user-city-input").value;
  const geonameURL = "http://api.geonames.org/searchJSON?";
  const country = `q=${cityName}`;
  const maxRows = "&maxRows=1";
  const username = "&username=ToplessPizza";
  const url = geonameURL + country + maxRows + username;

  const request = await fetch(url);

  try {
    const newData = await request.json();
    return newData;
  } catch (e) {
    console.log(e);
  }
};

// POST updated  data to server API endpoint
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("postData ERROR", error);
  }
};

document.getElementById("generate").addEventListener("click", handleSubmit);
export { handleSubmit };
