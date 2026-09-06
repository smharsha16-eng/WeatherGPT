import { useState } from "react";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Weather data could not be loaded.");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <form onSubmit={handleSearch}>
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Enter a city, e.g. Mumbai"
        />

        <button type="submit">
          Search weather
        </button>
      </form>

      {loading && <p>Loading weather data...</p>}

      {error && <p>{error}</p>}

      {weather && (
        <article>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Feels like: {weather.feelsLike}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.windSpeed} m/s</p>
          <p>Condition: {weather.condition}</p>
        </article>
      )}
    </section>
  );
}