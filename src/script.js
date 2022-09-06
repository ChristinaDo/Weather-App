let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastdays = ["Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastday, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
          <span class="weekdays">${formatDay(forecastday.dt)}</span> <br />
          <img class="sun" src="images/${
            forecastday.weather[0].icon
          }.png" alt="sun" /> <br /><br />
          <span class="forecast-max">${Math.round(
            forecastday.temp.max
          )}°C </span><br />
          <span class="forecast-min">${Math.round(
            forecastday.temp.min
          )}°C</span>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bb7d051a9f68e85375088e58d7ca90f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    celsiusTemperature
  )}°C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  icon.setAttribute("src", `./images/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input").value;
  search(city);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

function search(city) {
  let apiKey = "bb7d051a9f68e85375088e58d7ca90f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

search("Rio de Janeiro");
