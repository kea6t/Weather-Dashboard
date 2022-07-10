var apiKey = "ceee131ea3513f5c7f8bc1b2e8e55c42";
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var cityContainerEl = document.querySelector('#city-container');
var cardContainerEl = document.querySelector('#card-container');
var citySearchTerm = document.querySelector('#city-search-term');


var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getGeoWeather(cityName);

        // clear old content
        cityContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a City Name');
    }
};

var getCityWeather = function (lat, lon, cityName) {

    // format the openweather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial" + "&appid=" + apiKey;

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    console.log(data);

                    displayCityWeather(data);
                    displayFiveDayForecast(data);

                });
            } else {
                alert("Error: City Not Found");
            }
        })
        .catch(function (error) {
            // Notice this '.catch()' getting chained onto the end of the '.then()' method
            alert("Unable to connect to Openweather");
        });
};


var getGeoWeather = function (cityName) {
    // format the github api url
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + 1 + "&appid=" + apiKey;

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            console.log(response);
            return response.json().then(function (data) {
                console.log(data);
                var cityAndState = data[0].name + " , " + data[0].state;
                var locLat = data[0].lat;
                var locLon = data[0].lon;
                getCityWeather(locLat, locLon, cityAndState);
            });
        });
};

// function to display current weather information
var displayCityWeather = function (currentWeather) {
    console.log(currentWeather);

    cityListEl = document.createElement('div');
    cityListEl.classList.add('city-list', 'col-6');
    cityListEl.textContent = currentWeather.name;
    cityContainerEl.appendChild(cityListEl);

    // creating a new div element to show up in html with the weather information
    var displayWeatherCard = document.createElement('div');
    // added a class attribute
    displayWeatherCard.classList.add('container-fluid');
    displayWeatherCard.innerHTML =
        "<h5 >Name: " + dateConversion(currentWeather.current.dt) + "</h5>" +
        "<figure class='figure'>" +
        "<img src=http://openweathermap.org/img/wn/" + currentWeather.current.weather[0].icon + '@2x.png' + " alt='Placeholder image'></figure>" +
        "<p class=title >Temp: " + currentWeather.current.temp + "°F</p>" +
        "<p class=title >Wind: " + currentWeather.current.wind_speed + " MPH</p>" +
        "<p class=title >Humidity: " + currentWeather.current.humidity + " %</p>" +
        "<p class=title >UV Index: " + currentWeather.current.uvi + "</p>" +
        "</div>"
    // append to container
    cityContainerEl.appendChild(displayWeatherCard);

};

// function to display 5-Day forecast 
var displayFiveDayForecast = function (fiveDayForecast) {
    console.log(fiveDayForecast);
    // loop over fiveDayForecast
    for (var i = 1; i < 6; i++) {
        // creating a new div element to show up in html with the weather information
        var displayForecastCard = document.createElement('div');
        // added a class attribute
        displayForecastCard.classList.add('row');
        displayForecastCard.innerHTML = "<div class='col-12'> <div class='card'> <div class='card-body'>" +
            "<h5 class='card-title'>Date " + dateConversion(fiveDayForecast.daily[i].dt) + "</h5>" +
            "<figure class='figure'>" +
            "<img src=http://openweathermap.org/img/wn/" + fiveDayForecast.daily[i].weather[0].icon + '@2x.png' + " alt='Placeholder image'></figure>" +
            "<h6 class='card-subtitle mb-2'>Temp: " + fiveDayForecast.daily[i].temp.day + "°F</h6>" +
            "<h6 class='card-subtitle mb-2'>Wind: " + fiveDayForecast.daily[i].wind_speed + " MPH</h6>" +
            "<h6 class='card-subtitle mb-2'>Humidity: " + fiveDayForecast.daily[i].humidity + " %</h6>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        cardContainerEl.appendChild(displayForecastCard);
    }
};

var displayCities = function (city, searchTerm) {
    // check if api returned any weather data
    if (city.length === 0) {
        cityContainerEl.textContent = 'No weather condition found.';
        return;
    }

    citySearchTerm.textContent = searchTerm;
    console.log(searchTerm);
    // loop over city
    for (var i = 0; i < city.daily.length; i++) {
        // format city name
        var cityName = city[i].name + city[i].main.feels_like + city[i].main.humidity + city[i].main.temp;

        // create a container for each city
        var cityContainerEl = document.createElement('div');
        cityContainerEl.classList = 'list-item flex-row justify-space-between align-center';

        // create a span element to hold city name
        var titleEl = document.createElement('span');
        titleEl.textContent = cityName;

        // append to container
        cityContainerEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

    }
};

// function to convert the date to current date format
var dateConversion = function (unixTimeStamp) {
    // variable to convert the original date to current date format
    var readableDate = new Date(unixTimeStamp * 1000);
    var realDate = readableDate.toLocaleDateString();
    return realDate;
}


//getCityWeather("Virginia");
//getGeoWeather("lat, lon");

// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);
