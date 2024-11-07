import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
        <Api />
      </div>
    </>
  )
}

function Header() {
  return (
    <div className="header">
      <h1>Welcome!</h1>
      <p></p>
    </div>
  );
}

function Api() {
  const iconUrl = 'http://openweathermap.org/img/wn/';
  const apiKey = '';

  const [weatherData, setWeatherData] = useState({
    temp: '',
    speed: '',
    direction: '',
    description: '',
    icon: '',
    lat: '',
    lon: ''
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude.toFixed(3);
          const lon = position.coords.longitude.toFixed(3);
          setWeatherData(prevData => ({ ...prevData, lat, lon }));
          getWeather(lat, lon);
        });
      } else {
        alert("Your browser does not support geolocation!");
      }
    };

    const getWeather = (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      axios.get(url)
        .then(response => {
          const data = response.data;
          setWeatherData({
            temp: data.main.temp + ' °C',
            speed: data.wind.speed + ' m/s',
            direction: data.wind.deg + '°',
            description: data.weather[0].description,
            icon: `${iconUrl}${data.weather[0].icon}@2x.png`,
            lat,
            lon
          });
        })
        .catch(error => console.error("Error fetching weather data:", error));
    };

    getLocation();
  }, []);

  return (
    <div className="weather">
      <h3>Weather at your location</h3>
      <p>Latitude: {weatherData.lat}, Longitude: {weatherData.lon}</p>
      <p>Temperature: {weatherData.temp}</p>
      <p>Wind Speed: {weatherData.speed}</p>
      <p>Wind Direction: {weatherData.direction}</p>
      <p>{weatherData.description}</p>
      {weatherData.icon && <img src={weatherData.icon} alt="Weather icon" />}
    </div>
  );
}


export default App;

//