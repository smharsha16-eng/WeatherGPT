
import os
from datetime import datetime, timezone

import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

BASE_URL = "https://api.openweathermap.org/data/2.5"


def get_weather(location: str) -> dict:

    if not API_KEY:
        raise RuntimeError(
            "OPENWEATHER_API_KEY is missing. Check your .env file."
        )

    # ---------------------------------------------------------
    # 1. CURRENT WEATHER
    # ---------------------------------------------------------

    current_url = f"{BASE_URL}/weather"

    current_params = {
        "q": location,
        "appid": API_KEY,
        "units": "metric",
    }

    current_response = requests.get(
        current_url,
        params=current_params,
        timeout=10,
    )

    if current_response.status_code != 200:
        print("OpenWeather current weather error:",
              current_response.status_code)
        print("OpenWeather response:",
              current_response.text)

        return {
            "location": {
                "name": location,
                "state": "",
                "country": "",
            },
            "current": {
                "temperature_c": None,
                "humidity_percent": None,
                "precipitation_mm": 0,
                "wind_speed_kmh": None,
            },
            "daily": [],
            "source": "OpenWeather API",
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "error": current_response.text,
        }

    current_data = current_response.json()

    wind_speed_kmh = current_data["wind"]["speed"] * 3.6

    # ---------------------------------------------------------
    # 2. 5-DAY / 3-HOUR FORECAST
    # ---------------------------------------------------------

    forecast_url = f"{BASE_URL}/forecast"

    forecast_params = {
        "q": location,
        "appid": API_KEY,
        "units": "metric",
    }

    forecast_response = requests.get(
        forecast_url,
        params=forecast_params,
        timeout=10,
    )

    daily_forecast = []

    if forecast_response.status_code == 200:

        forecast_data = forecast_response.json()

        # Group 3-hour forecast entries by date
        days = {}

        for item in forecast_data.get("list", []):

            date_time = item["dt_txt"]
            date = date_time.split(" ")[0]

            if date not in days:
                days[date] = []

            days[date].append(item)

        # Convert each day's 3-hour forecasts into
        # one daily forecast
        for date, entries in days.items():

            temperatures = []
            rain_probabilities = []
            rainfall_values = []

            for entry in entries:

                temperatures.append(
                    entry["main"]["temp"]
                )

                # OpenWeather forecast gives
                # precipitation probability as 0-1
                pop = entry.get("pop", 0)

                rain_probabilities.append(
                    round(pop * 100)
                )

                # Rain volume is given for the
                # previous 3 hours
                rain = entry.get("rain", {}).get(
                    "3h", 0
                )

                rainfall_values.append(rain)

            daily_forecast.append({
                "date": date,
                "min_temperature_c": round(
                    min(temperatures), 1
                ),
                "max_temperature_c": round(
                    max(temperatures), 1
                ),
                "precipitation_probability_percent": max(
                    rain_probabilities
                ),
                "precipitation_sum_mm": round(
                    sum(rainfall_values), 1
                ),
            })

    else:
        print(
            "OpenWeather forecast error:",
            forecast_response.status_code
        )
        print(
            "OpenWeather forecast response:",
            forecast_response.text
        )

    # ---------------------------------------------------------
    # 3. RETURN WEATHER DATA
    # ---------------------------------------------------------

    return {
        "location": {
            "name": current_data["name"],
            "state": "",
            "country": current_data["sys"]["country"],
        },

        "current": {
            "temperature_c": current_data["main"]["temp"],
            "humidity_percent": current_data["main"]["humidity"],
            "precipitation_mm": current_data.get(
                "rain", {}
            ).get("1h", 0),
            "wind_speed_kmh": round(
                wind_speed_kmh, 1
            ),
        },

        "daily": daily_forecast,

        "source": "OpenWeather API",

        "updated_at": datetime.now(
            timezone.utc
        ).isoformat(),
    }


def get_alerts(location: str) -> list[dict]:
    return []
