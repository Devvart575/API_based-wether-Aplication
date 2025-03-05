import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://api.openweathermap.org/data/2.5/weather?";

function App() {
  const [weather, setWeather] = useState(null); // Set initial state to null
  const [searchTerm, setSearchTerm] = useState("saharanpur");

  const importWeather = async (city) => {
    try {
      const response = await fetch(
        `${API_URL}q=${city}&appid=c0ac8ed18fdf96d411116e5061cfe350&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        console.log(data);
      } else {
        console.error("Error fetching weather data:", data.message);
        setWeather(null); // Reset state if API call fails
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    importWeather("saharanpur"); // Initial fetch
  }, []);

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter Your City"
          id="cityInput"
        />
        <button onClick={() => importWeather(searchTerm)}>🔍</button>
      </div>

      {/* Weather Info */}
      {weather ? (
        <div className="weather-info">
          <h1 id="cityName">{weather.name}</h1>
          <p id="date">
            {new Date(weather.dt * 1000).toLocaleDateString("en-GB")}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>

          <div className="details">
            <div>
              <p id="sunrise">
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
              <small>Sunrise</small>
            </div>
            <div>
              <p id="sunset">
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </p>
              <small>Sunset</small>
            </div>
            <div>
              <p id="rainChance">{weather.clouds.all}%</p>
              <small>Rain Chance</small>
            </div>
          </div>
          <p className="temp" id="temperature">
            {`${weather.main.temp}°C`}
          </p>
          <p id="range">{`${weather.main.temp_min}/${weather.main.temp_max}°C`}</p>
        </div>
      ) : (
        <p>Loading weather data or invalid city entered.</p>
      )}

      {/* Extra Info */}
      {weather && (
        <div className="extra-info">
          <div>
            <p>Feels Like</p>
            <p id="feelsLike">{weather.main.feels_like}°C</p>
          </div>
          <div>
            <p>Pressure</p>
            <p id="pressure">{weather.main.pressure} hPa</p>
          </div>
          <div>
            <p>Humidity</p>
            <p id="humidity">{weather.main.humidity}%</p>
          </div>
          <div>
            <p>Speed</p>
            <p id="speed">{weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
