def choose_forecast_day(weather: dict, time_period: str) -> dict:
    daily = weather.get("daily", [])

    if not daily:
        return {}

    if time_period == "tomorrow" and len(daily) > 1:
        return daily[1]

    return daily[0]


def create_farming_advisory(
    weather: dict,
    time_period: str,
) -> dict:
    forecast = choose_forecast_day(weather, time_period)

    rain_probability = forecast.get(
        "precipitation_probability_percent"
    )
    rainfall = forecast.get("precipitation_sum_mm")

    reasons = []

    if rain_probability is not None and rain_probability >= 60:
        reasons.append(
            f"rain probability is {rain_probability}%"
        )

    if rainfall is not None and rainfall >= 10:
        reasons.append(
            f"expected rainfall is about {rainfall} mm"
        )

    if reasons:
        recommendation = (
            "Avoid pesticide spraying during this period. "
            "Rain can reduce spraying effectiveness."
        )
    else:
        recommendation = (
            "Conditions appear relatively suitable for spraying, "
            "but verify local wind and rain conditions."
        )

    return {
        "recommendation": recommendation,
        "reasons": reasons or [
            "No configured rain threshold was exceeded."
        ],
    }


def create_travel_advisory(
    weather: dict,
    time_period: str,
) -> dict:
    forecast = choose_forecast_day(weather, time_period)

    rain_probability = forecast.get(
        "precipitation_probability_percent"
    )
    rainfall = forecast.get("precipitation_sum_mm")

    reasons = []

    if rain_probability is not None and rain_probability >= 60:
        reasons.append(
            f"rain probability is {rain_probability}%"
        )

    if rainfall is not None and rainfall >= 10:
        reasons.append(
            f"expected rainfall is about {rainfall} mm"
        )

    if reasons:
        recommendation = (
            "Travel with caution. Check road conditions and "
            "official warnings before leaving."
        )
    else:
        recommendation = (
            "No significant rain risk was detected in this "
            "prototype forecast."
        )

    return {
        "recommendation": recommendation,
        "reasons": reasons or [
            "No configured travel-weather threshold was exceeded."
        ],
    }


def format_current_weather(weather: dict) -> str:
    location = weather["location"]["name"]
    current = weather["current"]

    return (
        f"Current weather in {location}: "
        f"{current['temperature_c']}°C, "
        f"humidity {current['humidity_percent']}%, "
        f"wind {current['wind_speed_kmh']} km/h, "
        f"and precipitation {current['precipitation_mm']} mm. "
        f"Source: {weather['source']}. "
        f"Updated: {weather['updated_at']}."
    )


def format_forecast(weather: dict, time_period: str) -> str:
    location = weather["location"]["name"]
    forecast = choose_forecast_day(weather, time_period)

    return (
        f"Forecast for {location} on {forecast['date']}: "
        f"temperature from {forecast['min_temperature_c']}°C "
        f"to {forecast['max_temperature_c']}°C; "
        f"rain probability "
        f"{forecast['precipitation_probability_percent']}%; "
        f"expected rain {forecast['precipitation_sum_mm']} mm. "
        f"Source: {weather['source']}. "
        f"Updated: {weather['updated_at']}."
    )


def format_advisory(weather: dict, advisory: dict) -> str:
    reasons = "; ".join(advisory["reasons"])

    return (
        f"{advisory['recommendation']} "
        f"Why: {reasons}. "
        f"Source: {weather['source']}. "
        f"Updated: {weather['updated_at']}."
    )


def format_alerts(alerts: list[dict]) -> str:
    if not alerts:
        return "No alert was found in the prototype data."

    alert = alerts[0]

    return (
        f"{alert['severity']} alert for {alert['location']}: "
        f"{alert['event']}. Recommended action: "
        f"{alert['action']} Valid until: {alert['valid_until']}. "
        f"Source: {alert['source']}."
    )