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

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
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

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#fahrenheit-button");
  fahrenheit.classList.remove("button");
  fahrenheit.classList.add("active-button");

  let celsius = document.querySelector("#celsius-button");
  celsius.classList.remove("active-button");
  celsius.classList.add("button");

  let h2 = document.querySelector("h2");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  h2.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

let celsiusTemperature = null;

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#celsius-button");
  celsius.classList.add("active-button");
  celsius.classList.remove("button");

  let fahrenheit = document.querySelector("#fahrenheit-button");
  fahrenheit.classList.add("button");
  fahrenheit.classList.remove("active-button");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", showCelsius);

search("Rio de Janeiro");
