import React, { useEffect, useState } from "react";
import { useTheme } from "../auth/ThemeContext";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function Weather() {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  // Llamada a la API de weatherapi especificamente la llamada a Costa Rica
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Costa%20Rica&lang=es`
        );
        const data = await response.json();
        // If para evitar si hay un error con el clima de que no se encuentra la ubicación
        if (data.error) {
          setError(data.error.message);
        } else {
          setWeather(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Validaciones de renderizado, para evitar errores
  if (loading) return <p>Cargando clima...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return null;

  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-300" : "bg-gray-800"
      } p-4 rounded flex items-center justify-between h-full`}
    >
      <div className="w-full h-full">
        <h2 className="text-lg font-semibold">
          {weather.location.name}, {weather.location.region},
          {weather.location.country}
        </h2>
        <p className="text-sm text-gray-500 ">{weather.location.localtime}</p>
        <p className="text-2xl font-bold">{weather.current.temp_c}°C</p>
        <p className="text-sm">{weather.current.condition.text}</p>
        <div className="mt-4 flex flex-col gap-1">
          <p>💧 Humedad: {weather.current.humidity}%</p>
          <p>💨 Viento: {weather.current.wind_kph} km/h </p>
          <p>💨 Ráfagas: {weather.current.gust_kph} km/h</p>
          <p>🌧️ Precipitación: {weather.current.precip_mm} mm</p>
        </div>
      </div>
      <div className="flex w-full h-full justify-end">
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
          className="w-20 h-20"
        />
      </div>
    </div>
  );
}

export default Weather;
