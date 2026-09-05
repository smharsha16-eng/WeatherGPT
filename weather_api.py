import os
from datetime import datetime, timezone

import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WEATHERAPI_KEY")

BASE_URL = "https://api.weatherapi.com/v1"


def get_weather(location: str) -> dict:
    if not API_KEY:
        raise RuntimeError(
            "WEATHERAPI_KEY is missing. Check your .env file."
        )

    current_url = f"{BASE_URL}/current.json"
    current_params = {
        "key": API_KEY,
        "q": location,
        "aqi": "no",
    }

    current_response = requests.get(
        current_url,
        params=current_params,
        timeout=10,
    )

    if current_response.status_code != 200:
        print(
            "WeatherAPI current weather error:",
            current_response.status_code,
        )
        print(
            "WeatherAPI response:",
            current_response.text,
        )

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
            "source": "WeatherAPI.com",
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "error": current_response.text,
        }

    current_data = current_response.json()

    forecast_url = f"{BASE_URL}/forecast.json"
    forecast_params = {
        "key": API_KEY,
        "q": location,
        "days": 5,
        "aqi": "no",
        "alerts": "no",
    }

    forecast_response = requests.get(
        forecast_url,
        params=forecast_params,
        timeout=10,
    )

    daily_forecast = []

    if forecast_response.status_code == 200:
        forecast_data = forecast_response.json()

        for day in forecast_data.get(
            "forecast", {}
        ).get("forecastday", []):

            day_data = day["day"]

            daily_forecast.append({
                "date": day["date"],
                "min_temperature_c": round(
                    day_data["mintemp_c"], 1
                ),
                "max_temperature_c": round(
                    day_data["maxtemp_c"], 1
                ),
                "precipitation_probability_percent": (
                    day_data.get("daily_chance_of_rain", 0)
                ),
                "precipitation_sum_mm": round(
                    day_data.get("totalprecip_mm", 0), 1
                ),
            })

    else:
        print(
            "WeatherAPI forecast error:",
            forecast_response.status_code,
        )
        print(
            "WeatherAPI forecast response:",
            forecast_response.text,
        )

    return {
        "location": {
            "name": current_data["location"]["name"],
            "state": current_data["location"].get(
                "region", ""
            ),
            "country": current_data["location"]["country"],
        },
        "current": {
            "temperature_c": current_data["current"]["temp_c"],
            "humidity_percent": current_data["current"]["humidity"],
            "precipitation_mm": current_data["current"].get(
                "precip_mm", 0
            ),
            "wind_speed_kmh": round(
                current_data["current"]["wind_kph"], 1
            ),
        },
        "daily": daily_forecast,
        "source": "WeatherAPI.com",
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }


def get_alerts(location: str) -> list[dict]:
    return []