let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let getWeather = () => {
  let cityValue = cityRef.value;
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    let url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${cityValue}&aqi=no`;
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.location) {
          result.innerHTML = `
            <h2>${data.location.name}</h2>
            <h4 class="weather">${data.current.condition.text}</h4>
            <img src="${data.current.condition.icon}" alt="Weather icon">
            <h1>${data.current.temp_c} &#176;C</h1>
            <div class="temp-container">
                <div>
                    <h4 class="title">Humidity</h4>
                    <h4 class="temp">${data.current.humidity}%</h4>
                </div>
                <div>
                    <h4 class="title">Wind</h4>
                    <h4 class="temp">${data.current.wind_kph} kph</h4>
                </div>
            </div>`;
        } else {
          result.innerHTML = `<h3 class="msg">City not found</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
