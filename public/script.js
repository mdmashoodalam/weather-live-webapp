const apiKey = 'a67b7772463b533ac1b9c6d1bdd5d3c5';

async function getWeatherByLocation(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        displayWeather(data);
        updateLocationHeading(location);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateLocationHeading(location) {
    const locationHeading = document.getElementById('location-heading');
    if (locationHeading) {
        locationHeading.textContent = `Today Weather for : ${location}`;
    }
}

function getWeatherByCoordinates(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchWeather(apiUrl);
}

function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            updateLocationHeading(data.name);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function changeLocation(event) {
    event.preventDefault();
    const locationInput = document.getElementById('location-input');
    const newLocation = locationInput.value;
    getWeatherByLocation(newLocation);
    locationInput.value = ''; 
}

async function getWeather() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Patna,IN&appid=' + apiKey + '&units=metric');
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;

    const weatherHTML = `
        <p>Weather: ${weatherDescription}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
    `;

    if (weatherInfoDiv) {
        weatherInfoDiv.innerHTML = weatherHTML;
    }
}

function refreshPage() {
    window.location.reload();
}


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeatherByCoordinates(latitude, longitude);
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

getWeather();

getCurrentLocation();
