import React, { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function Weather() {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Palmares,Alajuela,Costa Rica&lang=es`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);
  if (loading) return <p>Cargando clima...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return null;

  return (
    <div
      className={
        theme === "light"
          ? "bg-gray-300 p-4 rounded flex items-center justify-between"
          : "bg-gray-800 p-4 rounded flex items-center justify-between"
      }
    >
      <div>
        <h2 className="text-lg font-semibold">
          {weather.location.name}, {weather.location.region},{" "}
          {weather.location.country}
        </h2>
        <p className="text-sm text-gray-500 ">{weather.location.localtime}</p>
        <p className="text-2xl font-bold">{weather.current.temp_c}°C</p>
        <p className="text-sm">{weather.current.condition.text}</p>
        <div className="mt-2 text-sm">
          <p>💧 Humedad: {weather.current.humidity}%</p>
          <p>
            💨 Viento: {weather.current.wind_kph} km/h{" "}
            {weather.current.wind_dir}
          </p>
          <p>🌧️ Precipitación: {weather.current.precip_mm} mm</p>
        </div>
      </div>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
        className="w-16 h-16"
      />
    </div>
  );
}

export default Weather;
