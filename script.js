var forcastTitle = document.querySelector("#forecast")
var forcastContainerEl = documnet.querySelector("#five-day-container")
var cityInputEl = document.querySelector("#city")
var cityFormEl = document.querySelector("#city-search-form")
var pastButton = documnet.querySelector("#past-search-buttons")
var currentWeather = document.querySelector("#current-weather-container")
var searchedCityEl = document.querySelector("#searched-city")
var forcast = document.querySelector("forcast")
var citys = [];


var getCityWeather = function(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
    var apiKey = "694f5009d1a6972628a7c5264c2d4fd9"

    fetch(apiUrl)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};