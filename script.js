const API_KEY = 'c1a0b38f8773a661fa27fd3e26fb1cd6';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('City not found!');
    const data = await response.json();
    errorMessage.textContent = '';
    return data;
  } catch (err) {
    errorMessage.textContent = err.message;
    return null;
  }
}

function updateWeatherUI(data) {
  locationElement.textContent = `${data.name}, ${data.sys.country}`;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionElement.textContent = data.weather[0].description;
  humidityElement.textContent = data.main.humidity;
  windElement.textContent = data.wind.speed;
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
}

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (city) {
    const weatherData = await getWeatherData(city);
    if (weatherData) updateWeatherUI(weatherData);
  }
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});