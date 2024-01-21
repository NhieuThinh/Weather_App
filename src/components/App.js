import "./App.css";
import ClearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drdizzleIcon from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.png";
import rainIcon from "../Assets/rain.png";
import searchIcon from "../Assets/search.png";
import snowIcon from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";
import { useEffect, useState } from "react";

function App() {
  let API_key = "2a4e51ca9d174daecfebd2a28829fe78";
  const [temperature, setTemperature] = useState("15");
  const [location, setLocation] = useState("London");
  const [humidity, setHumidity] = useState("15");
  const [windspeed, setWindspeed] = useState("20");
  const [weatherIcon, setWeatherIcon] = useState(ClearIcon);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_key}`;
  useEffect(() => {
    const search = async () => {
      try {
        if (location === "") setLocation('London');
        let res = await fetch(url);
        let data = await res.json();
        setHumidity(data.main.humidity);
        setTemperature(data.main.temp);
        setWindspeed(data.wind.speed);
        const codeIcon = data.weather[0].icon.slice(0, 2);
        console.log(codeIcon)
        switch (codeIcon) {
          case "01" || "02":
            setWeatherIcon(ClearIcon);
            break;
          case "03" || "04":
            setWeatherIcon(cloudIcon);
            break;
          case "09":
            setWeatherIcon(drdizzleIcon);
            break;
          case "10" || "11":
            setWeatherIcon(rainIcon);
            break;
          case "13":
            setWeatherIcon(snowIcon);
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(error);
        alert("Opps..., you have input wrong city name");
      }
    };
    search();
  }, [url, location]);
  const handleSearch = () => {
    const queryLocation = document.querySelector(".search-input").value;
    setLocation(queryLocation);
  };

  return (
    <div className="weather-app">
      <div className="search-bar">
        <input placeholder="Search..." className="search-input" />
        <div
          className="search-icon"
          onClick={() => {
            handleSearch();
          }}
        >
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="cloud" />
      </div>
      <div className="temperature">{temperature}°C</div>
      <div className="location">{location}</div>
      <div className="data-container">
        <div className="humidity-windspeed">
          <img src={humidityIcon} alt="" className="icon" />
          <div className="weather-data">
            <div className="data">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="humidity-windspeed">
          <img src={windIcon} alt="" className="icon" />
          <div className="weather-data">
            <div className="data">{windspeed}km/h</div>
            <div className="text">Windspeed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
