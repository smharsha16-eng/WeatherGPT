import os
from datetime import date, datetime

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv


load_dotenv()


# ============================================================
# CONFIGURATION
# ============================================================

WEATHERAPI_KEY = os.getenv("WEATHERAPI_KEY")

WEATHER_API_URL = "https://api.weatherapi.com/v1"

OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"
OPEN_METEO_GEOCODING_URL = (
    "https://geocoding-api.open-meteo.com/v1/search"
)

WEATHERAPI_MAX_FORECAST_DAYS = 3
OPEN_METEO_MAX_FORECAST_DAYS = 16


# ============================================================
# LOCATION ALIASES
# ============================================================

LOCATION_ALIASES = {
    # Maharashtra
    "nashik": "Nashik, Maharashtra, India",
    "nasik": "Nashik, Maharashtra, India",

    # Telangana
    "hyderabad": "Hyderabad, Telangana, India",
    "warangal": "Warangal, Telangana, India",

    # Tamil Nadu
    "chennai": "Chennai, Tamil Nadu, India",
    "madras": "Chennai, Tamil Nadu, India",
    "coimbatore": "Coimbatore, Tamil Nadu, India",
    "madurai": "Madurai, Tamil Nadu, India",
    "salem": "Salem, Tamil Nadu, India",
    "tiruchirappalli": "Tiruchirappalli, Tamil Nadu, India",
    "trichy": "Tiruchirappalli, Tamil Nadu, India",

    # Karnataka
    "bengaluru": "Bengaluru, Karnataka, India",
    "bangalore": "Bengaluru, Karnataka, India",
    "mysuru": "Mysuru, Karnataka, India",
    "mysore": "Mysuru, Karnataka, India",
    "mangaluru": "Mangaluru, Karnataka, India",
    "mangalore": "Mangaluru, Karnataka, India",
    "hubballi": "Hubballi, Karnataka, India",
    "hubli": "Hubballi, Karnataka, India",
    "belagavi": "Belagavi, Karnataka, India",
    "belgaum": "Belagavi, Karnataka, India",

    # Maharashtra
    "mumbai": "Mumbai, Maharashtra, India",
    "bombay": "Mumbai, Maharashtra, India",
    "pune": "Pune, Maharashtra, India",
    "nagpur": "Nagpur, Maharashtra, India",
    "aurangabad": (
        "Chhatrapati Sambhajinagar, Maharashtra, India"
    ),
    "chhatrapati sambhajinagar": (
        "Chhatrapati Sambhajinagar, Maharashtra, India"
    ),
    "thane": "Thane, Maharashtra, India",
    "navi mumbai": "Navi Mumbai, Maharashtra, India",
    "kolhapur": "Kolhapur, Maharashtra, India",
    "solapur": "Solapur, Maharashtra, India",

    # Delhi
    "delhi": "Delhi, India",
    "new delhi": "New Delhi, India",

    # West Bengal
    "kolkata": "Kolkata, West Bengal, India",
    "calcutta": "Kolkata, West Bengal, India",
    "siliguri": "Siliguri, West Bengal, India",

    # Gujarat
    "ahmedabad": "Ahmedabad, Gujarat, India",
    "surat": "Surat, Gujarat, India",
    "vadodara": "Vadodara, Gujarat, India",
    "baroda": "Vadodara, Gujarat, India",
    "rajkot": "Rajkot, Gujarat, India",

    # Rajasthan
    "jaipur": "Jaipur, Rajasthan, India",
    "udaipur": "Udaipur, Rajasthan, India",
    "jodhpur": "Jodhpur, Rajasthan, India",
    "kota": "Kota, Rajasthan, India",

    # Uttar Pradesh
    "lucknow": "Lucknow, Uttar Pradesh, India",
    "kanpur": "Kanpur, Uttar Pradesh, India",
    "agra": "Agra, Uttar Pradesh, India",
    "varanasi": "Varanasi, Uttar Pradesh, India",
    "prayagraj": "Prayagraj, Uttar Pradesh, India",
    "allahabad": "Prayagraj, Uttar Pradesh, India",
    "noida": "Noida, Uttar Pradesh, India",

    # Kerala
    "kochi": "Kochi, Kerala, India",
    "cochin": "Kochi, Kerala, India",
    "thiruvananthapuram": (
        "Thiruvananthapuram, Kerala, India"
    ),
    "trivandrum": "Thiruvananthapuram, Kerala, India",
    "kozhikode": "Kozhikode, Kerala, India",
    "calicut": "Kozhikode, Kerala, India",
    "thrissur": "Thrissur, Kerala, India",
    "kannur": "Kannur, Kerala, India",
    "kollam": "Kollam, Kerala, India",
    "alappuzha": "Alappuzha, Kerala, India",
    "alleppey": "Alappuzha, Kerala, India",

    # Odisha
    "bhubaneswar": "Bhubaneswar, Odisha, India",
    "cuttack": "Cuttack, Odisha, India",

    # Bihar
    "patna": "Patna, Bihar, India",
    "gaya": "Gaya, Bihar, India",

    # Madhya Pradesh
    "bhopal": "Bhopal, Madhya Pradesh, India",
    "indore": "Indore, Madhya Pradesh, India",
    "jabalpur": "Jabalpur, Madhya Pradesh, India",

    # Punjab
    "amritsar": "Amritsar, Punjab, India",
    "ludhiana": "Ludhiana, Punjab, India",
    "chandigarh": "Chandigarh, India",

    # Haryana
    "gurgaon": "Gurugram, Haryana, India",
    "gurugram": "Gurugram, Haryana, India",
    "faridabad": "Faridabad, Haryana, India",

    # Assam
    "guwahati": "Guwahati, Assam, India",

    # Jharkhand
    "ranchi": "Ranchi, Jharkhand, India",
    "jamshedpur": "Jamshedpur, Jharkhand, India",

    # Chhattisgarh
    "raipur": "Raipur, Chhattisgarh, India",

    # Uttarakhand
    "dehradun": "Dehradun, Uttarakhand, India",
    "haridwar": "Haridwar, Uttarakhand, India",
    "nainital": "Nainital, Uttarakhand, India",

    # Himachal Pradesh
    "shimla": "Shimla, Himachal Pradesh, India",
    "manali": "Manali, Himachal Pradesh, India",

    # Jammu & Kashmir
    "srinagar": "Srinagar, Jammu and Kashmir, India",
    "jammu": "Jammu, Jammu and Kashmir, India",

    # Goa
    "goa": "Goa, India",
    "panaji": "Panaji, Goa, India",

    # Andhra Pradesh
    "visakhapatnam": (
        "Visakhapatnam, Andhra Pradesh, India"
    ),
    "vizag": "Visakhapatnam, Andhra Pradesh, India",
    "vijayawada": "Vijayawada, Andhra Pradesh, India",
    "tirupati": "Tirupati, Andhra Pradesh, India",
    "nellore": "Nellore, Andhra Pradesh, India",

    # Sikkim
    "gangtok": "Gangtok, Sikkim, India",

    # Meghalaya
    "shillong": "Shillong, Meghalaya, India",

    # Tripura
    "agartala": "Agartala, Tripura, India",

    # Manipur
    "imphal": "Imphal, Manipur, India",

    # Nagaland
    "kohima": "Kohima, Nagaland, India",

    # Mizoram
    "aizawl": "Aizawl, Mizoram, India",

    # Arunachal Pradesh
    "itanagar": "Itanagar, Arunachal Pradesh, India",

    # Ooty / Nilgiris
    "ooty": "Ooty, Tamil Nadu, India",
    "udhagamandalam": "Ooty, Tamil Nadu, India",
}


# ============================================================
# COORDINATES FOR AMBIGUOUS LOCATIONS
# ============================================================

LOCATION_COORDINATES = {
    "nashik": "20.0116,73.7900",
    "nasik": "20.0116,73.7900",

    "bengaluru": "12.9716,77.5946",
    "bangalore": "12.9716,77.5946",

    "mumbai": "19.0760,72.8777",
    "bombay": "19.0760,72.8777",

    "hyderabad": "17.3850,78.4867",

    "chennai": "13.0827,80.2707",
    "madras": "13.0827,80.2707",

    "delhi": "28.6139,77.2090",
    "new delhi": "28.6139,77.2090",

    "pune": "18.5204,73.8567",

    "kolkata": "22.5726,88.3639",
    "calcutta": "22.5726,88.3639",

    "ahmedabad": "23.0225,72.5714",

    "jaipur": "26.9124,75.7873",

    "lucknow": "26.8467,80.9462",

    "kochi": "9.9312,76.2673",
    "cochin": "9.9312,76.2673",

    "bhubaneswar": "20.2961,85.8245",

    "patna": "25.5941,85.1376",

    "ooty": "11.4064,76.6932",
    "udhagamandalam": "11.4064,76.6932",
}


# ============================================================
# IMD LOCATIONS
# ============================================================

IMD_LOCATIONS = {
    "bengaluru": "Bengaluru Urban",
    "bangalore": "Bengaluru Urban",
    "hyderabad": "Hyderabad",
    "nashik": "Nashik",
    "nasik": "Nashik",
    "chennai": "Chennai",
    "mumbai": "Mumbai",
    "pune": "Pune",
    "delhi": "Delhi",
    "kolkata": "Kolkata",
    "ahmedabad": "Ahmedabad",
    "jaipur": "Jaipur",
    "lucknow": "Lucknow",
    "kochi": "Kochi",
    "bhubaneswar": "Bhubaneswar",
    "patna": "Patna",
    "ooty": "Ooty",
}


# ============================================================
# HELPERS
# ============================================================

def normalize_location(location: str) -> str:
    if not location:
        return ""

    cleaned = " ".join(
        location.strip().split()
    )

    if not cleaned:
        return ""

    lower_cleaned = cleaned.lower()

    alias = LOCATION_ALIASES.get(
        lower_cleaned
    )

    if alias:
        return alias

    if "india" in lower_cleaned:
        return cleaned

    return f"{cleaned}, India"


def get_display_location(location: str) -> str:
    """
    Return the human-readable location requested by the user.

    This is intentionally independent of the location name
    returned by WeatherAPI/Open-Meteo because external providers
    can sometimes return an unexpected locality name.
    """

    normalized = normalize_location(location)

    if not normalized:
        return location or ""

    return normalized.split(",")[0].strip()


def get_weather_query(location: str) -> str:
    if not location:
        return ""

    cleaned = " ".join(
        location.strip().split()
    )

    lower_cleaned = cleaned.lower()

    if lower_cleaned in LOCATION_COORDINATES:
        return LOCATION_COORDINATES[
            lower_cleaned
        ]

    return normalize_location(
        cleaned
    )


def safe_float(value):
    try:
        if value is None:
            return None

        return float(value)

    except (TypeError, ValueError):
        return None


def safe_int(value):
    try:
        if value is None:
            return None

        return int(value)

    except (TypeError, ValueError):
        return None


# ============================================================
# WEATHERAPI REQUEST
# ============================================================

def weather_request(
    endpoint: str,
    params: dict,
):
    if not WEATHERAPI_KEY:
        print(
            "WEATHERAPI_KEY is not configured."
        )
        return None

    request_params = {
        "key": WEATHERAPI_KEY,
        **params,
    }

    try:
        response = requests.get(
            f"{WEATHER_API_URL}/{endpoint}",
            params=request_params,
            timeout=15,
        )

        response.raise_for_status()

        return response.json()

    except requests.RequestException as exc:
        print(
            f"WeatherAPI request failed: {exc}"
        )

        return None

    except ValueError as exc:
        print(
            f"WeatherAPI returned invalid JSON: {exc}"
        )

        return None


# ============================================================
# CURRENT WEATHER - WEATHERAPI
# ============================================================

def get_current_weather(
    location: str,
):
    query = get_weather_query(
        location
    )

    data = weather_request(
        "current.json",
        {
            "q": query,
            "aqi": "no",
        },
    )

    if not data:
        return None

    location_data = data.get(
        "location",
        {},
    )

    current = data.get(
        "current",
        {},
    )

    condition = current.get(
        "condition",
        {},
    )

    return {
        "location": get_display_location(
            location
        ),
        "provider_location": location_data.get(
            "name",
            location,
        ),
        "region": location_data.get(
            "region"
        ),
        "country": location_data.get(
            "country"
        ),
        "temp": safe_float(
            current.get("temp_c")
        ),
        "condition": condition.get(
            "text",
            "Unavailable",
        ),
        "humidity": safe_int(
            current.get("humidity")
        ),
        "precipitation": safe_float(
            current.get("precip_mm")
        ),
        "wind": safe_float(
            current.get("wind_kph")
        ),
        "wind_gust_kmh": safe_float(
            current.get("gust_kph")
        ),
        "uv_index": safe_float(
            current.get("uv")
        ),
        "source": "WeatherAPI.com",
    }


# ============================================================
# WEATHERAPI SHORT FORECAST
# ============================================================

def get_forecast(
    location: str,
    days: int = 3,
):
    query = get_weather_query(
        location
    )

    days = max(
        1,
        min(
            days,
            WEATHERAPI_MAX_FORECAST_DAYS,
        ),
    )

    data = weather_request(
        "forecast.json",
        {
            "q": query,
            "days": days,
            "aqi": "no",
            "alerts": "no",
        },
    )

    if not data:
        return []

    forecast_data = data.get(
        "forecast",
        {},
    )

    forecast_days = forecast_data.get(
        "forecastday",
        [],
    )

    results = []

    for day_data in forecast_days:

        day = day_data.get(
            "day",
            {},
        )

        condition = day.get(
            "condition",
            {},
        )

        results.append(
            {
                "date": day_data.get(
                    "date"
                ),
                "condition": condition.get(
                    "text",
                    "Unavailable",
                ),
                "min_temp": safe_float(
                    day.get("mintemp_c")
                ),
                "max_temp": safe_float(
                    day.get("maxtemp_c")
                ),
                "rain_probability": safe_int(
                    day.get(
                        "daily_chance_of_rain"
                    )
                ),
                "rainfall": safe_float(
                    day.get(
                        "totalprecip_mm"
                    )
                ),
                "max_wind_speed_kmh": safe_float(
                    day.get(
                        "maxwind_kph"
                    )
                ),
                "average_humidity_percent": safe_int(
                    day.get(
                        "avghumidity"
                    )
                ),
                "uv_index": safe_float(
                    day.get("uv")
                ),
                "snow_probability_percent": safe_int(
                    day.get(
                        "daily_chance_of_snow"
                    )
                ),
            }
        )

    return results


# ============================================================
# OPEN-METEO WEATHER CODE
# ============================================================

def open_meteo_condition(
    weather_code,
):
    code = safe_int(
        weather_code
    )

    if code is None:
        return "Unavailable"

    conditions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
    }

    return conditions.get(
        code,
        "Unavailable",
    )


# ============================================================
# OPEN-METEO GEOCODING
# ============================================================

def get_open_meteo_coordinates(
    location: str,
):
    if not location:
        return None

    cleaned = " ".join(
        location.strip().split()
    )

    lower_cleaned = cleaned.lower()

    if lower_cleaned in LOCATION_COORDINATES:

        coordinate_string = (
            LOCATION_COORDINATES[
                lower_cleaned
            ]
        )

        latitude, longitude = (
            coordinate_string.split(",")
        )

        return {
            "latitude": float(latitude),
            "longitude": float(longitude),
            "name": get_display_location(
                cleaned
            ),
            "region": None,
            "country": "India",
        }

    search_name = cleaned

    if "india" not in lower_cleaned:
        search_name = f"{cleaned}, India"

    try:

        response = requests.get(
            OPEN_METEO_GEOCODING_URL,
            params={
                "name": search_name,
                "count": 1,
                "language": "en",
                "format": "json",
            },
            timeout=15,
        )

        response.raise_for_status()

        data = response.json()

        results = data.get(
            "results",
            [],
        )

        if not results:
            return None

        result = results[0]

        return {
            "latitude": safe_float(
                result.get("latitude")
            ),
            "longitude": safe_float(
                result.get("longitude")
            ),
            "name": get_display_location(
                cleaned
            ),
            "provider_name": result.get(
                "name",
                cleaned,
            ),
            "region": result.get(
                "admin1"
            ),
            "country": result.get(
                "country",
                "India",
            ),
        }

    except requests.RequestException as exc:

        print(
            f"Open-Meteo geocoding failed: {exc}"
        )

        return None

    except (ValueError, TypeError) as exc:

        print(
            f"Open-Meteo geocoding returned invalid data: {exc}"
        )

        return None


# ============================================================
# OPEN-METEO CURRENT WEATHER
# ============================================================

def get_open_meteo_current(
    location: str,
):
    coordinates = get_open_meteo_coordinates(
        location
    )

    if not coordinates:
        return None

    try:

        response = requests.get(
            OPEN_METEO_URL,
            params={
                "latitude": coordinates[
                    "latitude"
                ],
                "longitude": coordinates[
                    "longitude"
                ],
                "current": (
                    "temperature_2m,"
                    "relative_humidity_2m,"
                    "precipitation,"
                    "wind_speed_10m,"
                    "wind_gusts_10m,"
                    "weather_code,"
                    "uv_index"
                ),
                "timezone": "auto",
            },
            timeout=15,
        )

        response.raise_for_status()

        data = response.json()

        current = data.get(
            "current",
            {},
        )

        return {
            "location": get_display_location(
                location
            ),
            "provider_location": coordinates.get(
                "name",
                location,
            ),
            "region": coordinates.get(
                "region"
            ),
            "country": coordinates.get(
                "country"
            ),
            "temp": safe_float(
                current.get(
                    "temperature_2m"
                )
            ),
            "condition": open_meteo_condition(
                current.get(
                    "weather_code"
                )
            ),
            "humidity": safe_int(
                current.get(
                    "relative_humidity_2m"
                )
            ),
            "precipitation": safe_float(
                current.get(
                    "precipitation"
                )
            ),
            "wind": safe_float(
                current.get(
                    "wind_speed_10m"
                )
            ),
            "wind_gust_kmh": safe_float(
                current.get(
                    "wind_gusts_10m"
                )
            ),
            "uv_index": safe_float(
                current.get(
                    "uv_index"
                )
            ),
            "source": "Open-Meteo",
        }

    except requests.RequestException as exc:

        print(
            f"Open-Meteo current weather request failed: {exc}"
        )

        return None

    except (ValueError, TypeError) as exc:

        print(
            f"Open-Meteo current weather returned invalid data: {exc}"
        )

        return None


# ============================================================
# OPEN-METEO EXTENDED FORECAST
# ============================================================

def get_open_meteo_forecast(
    location: str,
    days: int = 5,
):
    coordinates = get_open_meteo_coordinates(
        location
    )

    if not coordinates:
        return []

    days = max(
        1,
        min(
            days,
            OPEN_METEO_MAX_FORECAST_DAYS,
        ),
    )

    try:

        response = requests.get(
            OPEN_METEO_URL,
            params={
                "latitude": coordinates[
                    "latitude"
                ],
                "longitude": coordinates[
                    "longitude"
                ],
                "daily": (
                    "weather_code,"
                    "temperature_2m_max,"
                    "temperature_2m_min,"
                    "precipitation_probability_max,"
                    "precipitation_sum,"
                    "wind_speed_10m_max,"
                    "relative_humidity_2m_mean,"
                    "uv_index_max,"
                    "snowfall_sum"
                ),
                "forecast_days": days,
                "timezone": "auto",
            },
            timeout=15,
        )

        response.raise_for_status()

        data = response.json()

        daily = data.get(
            "daily",
            {},
        )

        dates = daily.get(
            "time",
            [],
        )

        weather_codes = daily.get(
            "weather_code",
            [],
        )

        max_temps = daily.get(
            "temperature_2m_max",
            [],
        )

        min_temps = daily.get(
            "temperature_2m_min",
            [],
        )

        rain_probabilities = daily.get(
            "precipitation_probability_max",
            [],
        )

        rainfall = daily.get(
            "precipitation_sum",
            [],
        )

        wind_speeds = daily.get(
            "wind_speed_10m_max",
            [],
        )

        humidities = daily.get(
            "relative_humidity_2m_mean",
            [],
        )

        uv_indexes = daily.get(
            "uv_index_max",
            [],
        )

        snowfall = daily.get(
            "snowfall_sum",
            [],
        )

        results = []

        for index, forecast_date in enumerate(
            dates
        ):

            def get_value(
                values,
            ):
                if index < len(values):
                    return values[index]

                return None

            snow_amount = get_value(
                snowfall
            )

            snow_probability = (
                100
                if snow_amount is not None
                and snow_amount > 0
                else 0
            )

            results.append(
                {
                    "date": forecast_date,
                    "condition": open_meteo_condition(
                        get_value(
                            weather_codes
                        )
                    ),
                    "min_temp": safe_float(
                        get_value(
                            min_temps
                        )
                    ),
                    "max_temp": safe_float(
                        get_value(
                            max_temps
                        )
                    ),
                    "rain_probability": safe_int(
                        get_value(
                            rain_probabilities
                        )
                    ),
                    "rainfall": safe_float(
                        get_value(
                            rainfall
                        )
                    ),
                    "max_wind_speed_kmh": safe_float(
                        get_value(
                            wind_speeds
                        )
                    ),
                    "average_humidity_percent": safe_int(
                        get_value(
                            humidities
                        )
                    ),
                    "uv_index": safe_float(
                        get_value(
                            uv_indexes
                        )
                    ),
                    "snow_probability_percent": snow_probability,
                }
            )

        return results

    except requests.RequestException as exc:

        print(
            f"Open-Meteo forecast request failed: {exc}"
        )

        return []

    except (ValueError, TypeError) as exc:

        print(
            f"Open-Meteo forecast returned invalid data: {exc}"
        )

        return []


# ============================================================
# REQUIRED FORECAST DAYS
# ============================================================

def get_required_forecast_days(
    time_period: str,
) -> int:

    if not time_period:
        return 1

    try:

        requested_date = datetime.strptime(
            time_period,
            "%Y-%m-%d",
        ).date()

        today = date.today()

        difference = (
            requested_date - today
        ).days

        if difference < 0:
            return 1

        required_days = (
            difference + 1
        )

        return max(
            1,
            min(
                required_days,
                OPEN_METEO_MAX_FORECAST_DAYS,
            ),
        )

    except ValueError:
        pass

    if time_period == "now":
        return 1

    if time_period == "today":
        return 1

    if time_period == "tomorrow":
        return 2

    if time_period == "day_after_tomorrow":
        return 3

    if time_period == "next_7_days":
        return 7

    if time_period == "next_14_days":
        return 14

    if time_period == "next_16_days":
        return 16

    if time_period == "this_week":
        return 7

    if time_period == "this_weekend":
        return 7

    if time_period == "next_week":
        return 14

    if time_period == "next_weekend":
        return 14

    weekdays = {
        "monday": 0,
        "tuesday": 1,
        "wednesday": 2,
        "thursday": 3,
        "friday": 4,
        "saturday": 5,
        "sunday": 6,
    }

    if time_period in weekdays:

        today = date.today()

        target_weekday = weekdays[
            time_period
        ]

        days_ahead = (
            target_weekday
            - today.weekday()
        ) % 7

        if days_ahead == 0:
            return 1

        return min(
            days_ahead + 1,
            OPEN_METEO_MAX_FORECAST_DAYS,
        )

    return 1


# ============================================================
# COMBINED WEATHER
# ============================================================

def get_weather(
    location: str,
    forecast_days: int = 5,
):

    current = get_current_weather(
        location
    )

    current_source = "WeatherAPI.com"

    if current is None:

        current = get_open_meteo_current(
            location
        )

        current_source = "Open-Meteo"

    forecast_days = max(
        1,
        min(
            forecast_days,
            OPEN_METEO_MAX_FORECAST_DAYS,
        ),
    )

    if forecast_days <= WEATHERAPI_MAX_FORECAST_DAYS:

        forecast = get_forecast(
            location,
            days=forecast_days,
        )

        forecast_source = "WeatherAPI.com"

        if not forecast:

            forecast = get_open_meteo_forecast(
                location,
                days=forecast_days,
            )

            forecast_source = "Open-Meteo"

    else:

        forecast = get_open_meteo_forecast(
            location,
            days=forecast_days,
        )

        forecast_source = "Open-Meteo"

    if current is None:

        current = {
            "location": get_display_location(
                location
            ),
            "region": None,
            "country": None,
            "temp": None,
            "condition": "Unavailable",
            "humidity": None,
            "precipitation": None,
            "wind": None,
            "wind_gust_kmh": None,
            "uv_index": None,
            "source": "Unavailable",
        }

        current_source = "Unavailable"

    if current_source == forecast_source:
        combined_source = current_source

    else:
        combined_source = (
            f"{current_source} + {forecast_source}"
        )

    # IMPORTANT:
    # Always use the user's requested location for display.
    # Never trust an unexpected provider locality such as
    # "Cooria" when the user asked for "Mumbai".

    display_location = get_display_location(
        location
    )

    return {
        "location": display_location,
        "region": current.get(
            "region"
        ),
        "country": current.get(
            "country"
        ),
        "temp": current.get(
            "temp"
        ),
        "condition": current.get(
            "condition"
        ),
        "humidity": current.get(
            "humidity"
        ),
        "precipitation": current.get(
            "precipitation"
        ),
        "wind": current.get(
            "wind"
        ),
        "wind_gust_kmh": current.get(
            "wind_gust_kmh"
        ),
        "uv_index": current.get(
            "uv_index"
        ),
        "current": current,
        "forecast": forecast,
        "forecast_days_requested": forecast_days,
        "current_source": current_source,
        "forecast_source": forecast_source,
        "source": combined_source,
    }


# ============================================================
# IMD LOCATION
# ============================================================

def get_imd_location(
    location: str,
):
    if not location:
        return None

    cleaned = location.strip().lower()

    if cleaned in IMD_LOCATIONS:
        return IMD_LOCATIONS[
            cleaned
        ]

    for key, value in IMD_LOCATIONS.items():

        if key in cleaned:
            return value

    return None


# ============================================================
# IMD ALERTS
# ============================================================

def get_alerts(
    location: str,
):
    imd_location = get_imd_location(
        location
    )

    if not imd_location:
        return []

    try:

        url = (
            "https://mausam.imd.gov.in/"
            "imd_latest/contents/"
            "all_warning.php"
        )

        response = requests.get(
            url,
            timeout=15,
        )

        response.raise_for_status()

        soup = BeautifulSoup(
            response.text,
            "html.parser",
        )

        alerts = []

        page_text = soup.get_text(
            " ",
            strip=True,
        )

        if not page_text:
            return []

        tables = soup.find_all(
            "table"
        )

        for table in tables:

            rows = table.find_all(
                "tr"
            )

            for row in rows:

                cells = row.find_all(
                    ["td", "th"]
                )

                values = [
                    cell.get_text(
                        " ",
                        strip=True,
                    )
                    for cell in cells
                ]

                if not values:
                    continue

                row_text = " ".join(
                    values
                )

                if (
                    imd_location.lower()
                    not in row_text.lower()
                ):
                    continue

                severity = "Unknown"

                lower_row = row_text.lower()

                if "red" in lower_row:
                    severity = "Red"

                elif "orange" in lower_row:
                    severity = "Orange"

                elif "yellow" in lower_row:
                    severity = "Yellow"

                elif "green" in lower_row:
                    severity = "Green"

                alerts.append(
                    {
                        "location": imd_location,
                        "severity": severity,
                        "message": row_text,
                        "source": "IMD",
                    }
                )

        return alerts

    except requests.RequestException as exc:

        print(
            f"IMD request failed: {exc}"
        )

        return []

    except Exception as exc:

        print(
            f"IMD alert parsing failed: {exc}"
        )

        return []