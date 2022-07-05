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
        getCityWeather(cityName);

        // clear old content
        cityContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a City Name');
    }
};

var getCityWeather = function (userFormEl) {

    // format the openweather api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + userFormEl + "&limit=" + 1 + "&appid=" + apiKey + "&units=imperial";

    // make a get request to url
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data);
            
                displayCities(data, userFormEl);

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


var getGeoWeather = function (lat, lon) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?qlat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    // make a get request to url
    fetch(apiUrl).then(function (response) {
        console.log(response);
        return response.json().then(function (data) {
            console.log(data);
        });
    });
};

var displayCities = function (city, searchTerm) {
    // check if api returned any weather data
    if (city.length === 0) {
        cityContainerEl.textContent = 'No weather condition found.';
        return;
    }

    citySearchTerm.textContent = searchTerm;

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


    //getCityWeather("Virginia");
    //getGeoWeather("lat, lon");

    // add event listeners to forms
    userFormEl.addEventListener("submit", formSubmitHandler);
