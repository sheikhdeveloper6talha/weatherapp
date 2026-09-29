import React, { useEffect, useState } from "react";
import axios from "axios";
import cities from "./citiesname";

import {
  MapPin,
  Settings,
  Search,
  Sun,
  CloudSun,
  Wind,
  Droplets,
  Bell,
  MoreHorizontal,
  Map,
  Home,
} from "lucide-react";

import "./weather.css";

const hourlyData = [
  { time: "10 AM", icon: <CloudSun /> },
  { time: "11 AM", icon: <CloudSun /> },
  { time: "12 PM", icon: <Sun /> },
  { time: "1 PM", icon: <Sun /> },
  { time: "2 PM", icon: <Sun /> },
  { time: "3 PM", icon: <Sun /> },
];

function Weather() {
  const [city, setCity] = useState("Karachi");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const API_KEY = "d71adc30bd576864681fe34476d30684";

        const api = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        console.log(api.data);

        setResponse(api.data);
      } catch (error) {
        console.log(error);

        setError("Weather data not found");
        setResponse(null);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [city]);

  const temperature = Math.round(response?.main?.temp ?? 0);

  return (
    <div className="weather-page">
      <div className="weather-app">

       

        <header className="weather-header">

          <div className="top-row">

            <div className="location">

              <MapPin size={24} />

              <select
                className="dropdownList"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {cities.map((cityName) => (
                  <option
                    key={cityName}
                    value={cityName}
                  >
                    {cityName}
                  </option>
                ))}
              </select>

            </div>

            <Settings
              size={27}
              className="settings-icon"
            />

          </div>

       

          <div className="search-box">

            <Search size={22} />

            <input
              type="text"
              placeholder="Search for a city..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  setCity(e.target.value.trim());
                  e.target.value = "";
                }
              }}
            />

          </div>

       

          <div className="current-weather">

            {loading ? (
             <div class="loader-wrapper">
  <div class="weather-spinner"></div>
  <p class="loading-text">Fetching weather data...</p>
</div>
            ) : error ? (
              <div className="error">
                {error}
              </div>
            ) : response ? (

              <>
                <div className="weather-info">

                  <h1 className="condition">
                    {temperature < 20
                      ? "Cold"
                      : temperature < 32
                      ? "Cool"
                      : "Hot"}
                  </h1>

                  <div className="temperature">

                    <h1>
                      {temperature}
                    </h1>

                    <small>
                      °C
                    </small>

                  </div>

                  <p className="feels">
                    {Math.round(response.main.feels_like)}°
                    Feels Like
                  </p>

                  <div className="high-low">

                    <span>
                      H: {Math.round(response.main.temp_max)}°
                    </span>

                    <span>
                      L: {Math.round(response.main.temp_min)}°
                    </span>

                  </div>

                </div>

                <div className="main-weather-icon">

                  <CloudSun
                    size={105}
                    strokeWidth={1.4}
                  />

                </div>

              </>

            ) : null}

          </div>

        </header>

        {/* ================= MAIN ================= */}

        <main className="weather-content">

          {/* HOURLY FORECAST */}

          <section className="weather-card hourly-card">

            <div className="section-heading">

              <h2>
                Today
              </h2>

              <button>
                Hourly Forecast
                <span>›</span>
              </button>

            </div>

            <div className="hourly-list">

              {hourlyData.map((item, index) => (

                <div
                  className="hour-item"
                  key={index}
                >

                  <span className="hour-time">
                    {item.time}
                  </span>

                  <div className="hour-icon">
                    {item.icon}
                  </div>

                  <strong>
                    {temperature + index}°
                  </strong>

                </div>

              ))}

            </div>

          </section>

          {/* ================= WEATHER DETAILS ================= */}

          <section className="details-grid">

            {/* WIND */}

            <div className="detail-card wind-card">

              <div className="detail-icon">
                <Wind />
              </div>

              <div>

                <p>
                  Wind
                </p>

                <strong>
                  {response
                    ? Math.round(response.wind.speed * 3.6)
                    : 0} km/h
                </strong>

                <span>
                  {response?.wind?.deg ?? "--"}°
                </span>

              </div>

            </div>

            {/* HUMIDITY */}

            <div className="detail-card humidity-card">

              <div className="detail-icon">
                <Droplets />
              </div>

              <div>

                <p>
                  Humidity
                </p>

                <strong>
                  {response?.main?.humidity ?? 0}%
                </strong>

              </div>

            </div>

            {/* UV */}

            <div className="detail-card uv-card">

              <div className="detail-icon">
                <Sun />
              </div>

              <div>

                <p>
                  UV Index
                </p>

                <strong>
                  --
                </strong>

                <span>
                  API required
                </span>

              </div>

            </div>

          </section>

        </main>

        {/* ================= BOTTOM NAV ================= */}

        <nav className="bottom-nav">

          <div className="nav-item active">

            <Home />

            <span>
              Weather
            </span>

          </div>

          <div className="nav-item">

            <Map />

            <span>
              Maps
            </span>

          </div>

          <div className="nav-item">

            <Bell />

            <span>
              Alerts
            </span>

          </div>

          <div className="nav-item">

            <MoreHorizontal />

            <span>
              More
            </span>

          </div>

        </nav>

      </div>
    </div>
  );
}

export default Weather;