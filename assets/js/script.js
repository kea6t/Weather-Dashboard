var apiKey = "ceee131ea3513f5c7f8bc1b2e8e55c42";
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var cityContainerEl = document.querySelector('#city-container');
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
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName  +  "&limit=" + 1 + "&appid=" + apiKey;

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

var displayCityWeather = function(currentWeather) {
    console.log(currentWeather);

    cityListEl = document.createElement('div');
    cityListEl.classList.add('city-list','col-6');
    cityListEl.textContent = currentWeather.name;
    cityContainerEl.appendChild(cityListEl);
    
    var displayWeatherCard = document.createElement('div');
    displayWeatherCard.classList.add('container-fluid');
    displayWeatherCard.innerHTML = 
      "<h5 >Name: " + dateConversion(currentWeather.daily[0].dt) + "</h5>" +
      "<figure class='figure'>" +
      "<img src=http://openweathermap.org/img/wn/" +  currentWeather.current.weather[0].icon + '@2x.png' + " alt='Placeholder image'></figure>" + 
      "<p class=title >Temp: " + currentWeather.current.temp + "</p>" + 
      "<p class=title >Wind: " + currentWeather.current.wind_speed + "</p>" + 
      "<p class=title >Humidity: " + currentWeather.daily[0].humidity + "</p>" +
      "<p class=title >UV Index: " + currentWeather.daily[0].uvi + "</p>" +  
      "</div>"
    cityContainerEl.appendChild(displayWeatherCard);
    

}

var displayCities = function (city, searchTerm) {
    // check if api returned any weather data
    if (city.length === 0) {
        cityContainerEl.textContent = 'No weather condition found.';
        return;
    }

    citySearchTerm.textContent = searchTerm;
    console.log(searchTerm);
    // loop over city
    for (var i = 0; i < city.length; i++) {
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

var dateConversion = function(unixTimeStamp) {
    var readableDate = new Date(unixTimeStamp * 1000);
    var realDate = readableDate.toLocaleDateString();
    return realDate;
}


    //getCityWeather("Virginia");
    //getGeoWeather("lat, lon");

    // add event listeners to forms
    userFormEl.addEventListener("submit", formSubmitHandler);
