import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
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
      <img src="/weather_icon.png" alt="weatherlogo" />
      <h1>On this page you can check the weather for your location.</h1>
      <p>To check</p>
    </div>
  );
}

function Api() {
  const iconUrl = 'http://openweathermap.org/img/wn/'
  const apiKey = ''

  const [weatherData, setWeatherData] = useState({
    temp: '',
    speed: '',
    direction: '',
    description: '',
    icon: '',
    lat: '',
    lon: ''
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude.toFixed(3) //leveysaste
        const lon = position.coords.longitude.toFixed(3) //pituusaste
        setWeatherData(prevData => ({ ...prevData, lat, lon }))
        getWeather(lat, lon);
      })
    } else {
      alert("Your browser does not support geolocation!");
    }
  }

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
          })
        })
        .catch(error => console.error("Error fetching weather data:", error))
    }

  
  const getRandLocation = () => {
    const lat = (Math.random()*180 - 90).toFixed(3) //leveysaste (-)90
    const lon = (Math.random()*360 - 180).toFixed(3) //pituusaste (-)180
    setWeatherData(prevData => ({...prevData,lat,lon}))
    getWeather(lat,lon)
  }
  



  return (
    <div className="weather">
      <h3>Check the weather for...</h3>
      <div className="buttons">
        <button onClick={getLocation}>your location!</button>
        <button onClick={getRandLocation}>random location!</button>
      </div>
      <div className="stats">
        <p>Latitude: {weatherData.lat}, Longitude: {weatherData.lon}</p>
        <p>Temperature: {weatherData.temp}</p>
        <p>Wind Speed: {weatherData.speed}</p>
        <p>Wind Direction: {weatherData.direction}</p>
        <p>{weatherData.description}</p>
        {weatherData.icon && <img src={weatherData.icon} alt="Weather icon" />}
      </div>
    </div>
  );
}



export default App

//