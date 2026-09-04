import os
from datetime import datetime, timezone

import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")


def get_weather(location: str) -> dict:

    if not API_KEY:
        raise RuntimeError(
            "OPENWEATHER_API_KEY is missing. Check your .env file."
        )

    url = "https://api.openweathermap.org/data/2.5/weather"

    params = {
        "q": location,
        "appid": API_KEY,
        "units": "metric",
    }

    response = requests.get(url, params=params, timeout=10)

    if response.status_code != 200:
        print("OpenWeather error:", response.status_code)
        print("OpenWeather response:", response.text)

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
            "error": response.text,
        }

    data = response.json()

    wind_speed_kmh = data["wind"]["speed"] * 3.6

    return {
        "location": {
            "name": data["name"],
            "state": "",
            "country": data["sys"]["country"],
        },
        "current": {
            "temperature_c": data["main"]["temp"],
            "humidity_percent": data["main"]["humidity"],
            "precipitation_mm": data.get("rain", {}).get("1h", 0),
            "wind_speed_kmh": round(wind_speed_kmh, 1),
        },
        "daily": [],
        "source": "OpenWeather API",
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }


def get_alerts(location: str) -> list[dict]:
    return []