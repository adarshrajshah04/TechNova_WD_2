const apiKey = "YOUR_API_KEY_HERE";  // <-- Replace this

// Fetch weather by city name
async function getWeather() {
    const city = document.getElementById("city-input").value;
    if (!city) return alert("Please enter a city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

// Fetch weather using geolocation
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Your browser does not support geolocation");
    }
}

function success(position) {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

function error() {
    alert("Unable to retrieve your location");
}

// Fetch weather from API
async function fetchWeather(url) {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
        alert("City not found!");
        return;
    }

    displayWeather(data);
}

// Display weather in UI
function displayWeather(data) {
    document.getElementById("weather-result").classList.remove("hidden");

    document.getElementById("city-name").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerText = `${data.main.temp}°C`;
    document.getElementById("description").innerText = data.weather[0].description;

    document.getElementById("details").innerHTML = `
        Humidity: ${data.main.humidity}% <br>
        Wind Speed: ${data.wind.speed} m/s
    `;

    document.getElementById("weather-icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
