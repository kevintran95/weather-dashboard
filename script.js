var forecastTitle = document.querySelector("#forecast")
var forecastContainerEl = document.querySelector("#five-day-container")
var cityInputEl = document.querySelector("#city")
var cityFormEl = document.querySelector("#city-search-form")
var pastButton = document.querySelector("#past-search-buttons")
var weatherContainerEl = document.querySelector("#current-weather-container")
var searchedCityEl = document.querySelector("#searched-city")
var forecast = document.querySelector("forecast")
var cities = [];


var getCityWeather = function (city) {
    var apiKey = "694f5009d1a6972628a7c5264c2d4fd9"
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    console.log(getCityWeather)

    fetch( apiUrl )
     .then(function (response) {
            response.json().then(function (data) {
                displayWeather(data, city);
            });
        });
};

var submitHandler = function (event) {
    event.preventDefault()
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        getfiveDay(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else {
        alert("You must enter a city")
    }
    saveSearch();
    pastSearch();
}
var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities))
    console.log(saveSearch)
}

var displayWeather = function (weather, searchCity) {
    weatherContainerEl.textContent = "";
    searchedCityEl.textContent = searchCity;

    var currentDate = document.createElement('span')
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    searchedCityEl.appendChild(currentDate);

    var weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', 'https://openweathermap.org/img/w/10d.png');
    searchedCityEl.appendChild(weatherIcon);

    var currentTemp = document.createElement('span');
    currentTemp.textContent = "Temp: " + weather.main.temp + " F";
    currentTemp.classList = "list-group-item";
    weatherContainerEl.appendChild(currentTemp);

    var windSpeedEl = document.createElement('span');
    windSpeedEl.textContent = "Wind: " + weather.main.speed + " MPH";
    windSpeedEl.classList = "list-group-item";
    weatherContainerEl.appendChild(windSpeedEl);

    var humidityEl = document.createElement('span');
    humidityEl.textContent = "Humidity " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item";
    weatherContainerEl.appendChild(humidityEl);

    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    getUvIndex(lat, lon)
}

var getfiveDay = function (city) {
    var apiKey = `694f5009d1a6972628a7c5264c2d4fd9`
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiUrl)
        .then(function (response) {
            response.json().then(function (data) {
                displayfiveDay(data);
            });
        });
};

var displayfiveDay = function (weather) {
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-day Forecast:";

    var forecast = weather.list;
        for (var i=5; i < forecast.length; i=i+8) {
        var dailyForecast = forecast[i];

        var forecastEl = document.createElement('div');
        forecastEl.classList = 'card bg-primary text-light m-2';

        var forecastDate = document.createElement('h4');
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D YYYY")
        forecastDate.classList = 'card-header text-center';
        forecastEl.appendChild(forecastDate);

        var weatherIcon = document.createElement('img');
        weatherIcon.classList = 'card-body text-center';
        weatherIcon.setAttribute("src", "https://openweathermap.org/img/w/10d.png")
        forecastEl.appendChild(weatherIcon)

        var forecastTempEl = document.createElement('span');
        forecastTempEl.classList = 'card-body text-center';
        forecastTempEl.textContent = dailyForecast.main.temp + " F";
        forecastEl.appendChild(forecastTempEl);

        var windSpeedEl = document.createElement('span');
        windSpeedEl.class = 'card-body text-center';
        windSpeedEl.textContent = dailyForecast.main.wind + ' MPH';
        forecastEl.appendChild(windSpeedEl); 8

        var humidityEl = document.createElement('span');
        humidityEl.class = 'card-body text-center';
        humidityEl.textContent = dailyForecast.main.humidity + ' %';
        forecastEl.appendChild(humidityEl);

        forecastContainerEl.appendChild(forecastEl);



    }
}

var getUvIndex = function (lat, lon) {
    var apiKey = `694f5009d1a6972628a7c5264c2d4fd9`
    var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiUrl)
        .then(function (response) {
            response.json().then(function (data) {
                displayUvindex(data)
            });
        });
}

var displayUvindex = function (index) {
    var indexEl = document.createElement('div');
    indexEl.textContent = "UV Index: ";
    indexEl.classList = "list-group-item";

    uvValue = document.createElement('span');
    uvValue.classList = index.value;

    if (index.value <= 2) {
        uvValue.textContent = "Low"
    } else if (index.value > 2 && index.value <= 8) {
        uvValue.classList = "Moderate"
    }
    else if (index.value > 8) {
        uvValue.classList = "Severe"
    };

    indexEl.appendChild(uvValue);
    weatherContainerEl.appendChild(indexEl);
}



var pastSearch = function(pastSearch){

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastButton.prepend(pastSearchEl);
}


var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        getfiveDay(city);
    }
}



cityFormEl.addEventListener("submit", submitHandler);
pastButton.addEventListener("click", pastSearchHandler);