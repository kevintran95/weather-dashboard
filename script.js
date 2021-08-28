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

var submitHandler = function(event) {
    event.preventDefault()
        var city = cityInputEl.value.trim();
        if (city){
            getCityWeather(city);
            getfiveDay(city);
            cities.unshift({city});
            cityInputEl.value = "";
        } else{
            alert("You must enter a city")
        }
        saveSearch();
        pastSearch();
}
 var saveSearch = function(){
     localStorage.setItem("cities", JSON.stringify(cities))
 }

 var getfiveDay = function(city) {
     var apiKey = "694f5009d1a6972628a7c5264c2d4fd9"
     var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

     fetch(apiUrl)
     .then(function(response) {
         response.JSON().then(function(data) {
             displayFiveDay(data);
         });
     });
 };

 var displayFiveDay = function(weather) {
     forcastContainerEl.textContent = ""
     forcastTitle.textContent = "5-day Forcast:";
     
     var forcast = weather.list;
     for (var i =5; i < forcast.length; i = i + 8){
         var dailyForcast = forcast [i];

         var forcastEl =  document.createElement('div');
         forcastEl.classList = 'card bg-primary text-light m-2';
         
         var forcastDate = document.createElement('h4');
         forcastDate.textContent= moment.unix(dailyForcast.dt).format("MMM D YYYY")
         forcastDate.classList = 'card-header text-center';
         forcastEl.appendChild(forcastDate);

         var weatherIcon = document.createElement('img');
         weatherIcon.classList = 'card-body text-center';
         weatherIcon.setAttribute("src", "https://openweathermap.org/img/w/10d.png")
         forcastEl.appendChild(weatherIcon)

         var forcastTempEl = document.createElement('span');
         forcastTempEl.classList = 'card-body text-center';
         forcastTempEl.textContent = dailyForcast.main.temp + " F";
         forcastEl.appendChild(forcastTempEl);

         var windSpeedEl = document.createElement('span');
         windSpeedEl.class = 'card-body text-center';
         windSpeedEl.textContent = dailyForcast.main.wind + ' MPH';
         forcastEl.appendChild(windSpeedEl);

         var humidityEl = document.createElement('span');
         humidityEl.class = 'card-body text-center';
         humidityEl.textContent = dailyForcast.main.humidity + ' %';
         forcastEl.appendChild(humidityEl);

         forcastContainerEl.appendChild(forcastEl);



     }
 }