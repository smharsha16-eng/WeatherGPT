from datetime import date, datetime, timedelta


# ============================================================
# FORECAST HELPERS
# ============================================================

def get_forecast_days(weather):
    if not weather:
        return []

    forecast = weather.get("forecast")

    if isinstance(forecast, list):
        return forecast

    forecast_days = weather.get("forecast_days")

    if isinstance(forecast_days, list):
        return forecast_days

    return []


def get_forecast_dates(weather):
    return [
        day.get("date")
        for day in get_forecast_days(weather)
        if day.get("date")
    ]


def _parse_date(value):
    if isinstance(value, date):
        return value

    if not value:
        return None

    try:
        return datetime.strptime(
            str(value),
            "%Y-%m-%d"
        ).date()
    except ValueError:
        return None


def _today():
    return date.today()


def _date_range_for_period(time_period):
    today = _today()

    if not time_period or time_period == "now":
        return today, today

    # Exact calendar date
    exact_date = _parse_date(time_period)

    if exact_date:
        return exact_date, exact_date

    # Relative dates
    if time_period == "today":
        return today, today

    if time_period == "tomorrow":
        target = today + timedelta(days=1)
        return target, target

    if time_period == "day_after_tomorrow":
        target = today + timedelta(days=2)
        return target, target

    # Next N days
    if time_period == "next_7_days":
        return today, today + timedelta(days=6)

    if time_period == "next_14_days":
        return today, today + timedelta(days=13)

    if time_period == "next_16_days":
        return today, today + timedelta(days=15)

    # This week
    if time_period == "this_week":
        days_until_sunday = 6 - today.weekday()

        return (
            today,
            today + timedelta(days=days_until_sunday)
        )

    # Next week
    if time_period == "next_week":
        days_until_monday = (
            7 - today.weekday()
        ) % 7

        if days_until_monday == 0:
            days_until_monday = 7

        start = today + timedelta(
            days=days_until_monday
        )

        return (
            start,
            start + timedelta(days=6)
        )

    # This weekend
    if time_period == "this_weekend":
        days_until_saturday = (
            5 - today.weekday()
        ) % 7

        saturday = today + timedelta(
            days=days_until_saturday
        )

        sunday = saturday + timedelta(days=1)

        return saturday, sunday

    # Next weekend
    if time_period == "next_weekend":
        days_until_saturday = (
            5 - today.weekday()
        ) % 7

        if days_until_saturday == 0:
            days_until_saturday = 7

        saturday = today + timedelta(
            days=days_until_saturday
        )

        return saturday, saturday + timedelta(days=1)

    # Weekdays
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
        target_weekday = weekdays[time_period]

        days_ahead = (
            target_weekday - today.weekday()
        ) % 7

        target = today + timedelta(
            days=days_ahead
        )

        return target, target

    return today, today


def get_period_label(time_period):
    labels = {
        "now": "today",
        "today": "today",
        "tomorrow": "tomorrow",
        "day_after_tomorrow": "the day after tomorrow",
        "next_7_days": "the next 7 days",
        "next_14_days": "the next 14 days",
        "next_16_days": "the next 16 days",
        "this_week": "this week",
        "next_week": "next week",
        "this_weekend": "this weekend",
        "next_weekend": "next weekend",
    }

    if time_period in labels:
        return labels[time_period]

    parsed = _parse_date(time_period)

    if parsed:
        return parsed.strftime("%B %-d, %Y")

    return str(time_period)


def _filter_days_by_period(weather, time_period=None):
    days = get_forecast_days(weather)

    if not days:
        return []

    if not time_period or time_period == "now":
        return days

    start_date, end_date = _date_range_for_period(
        time_period
    )

    selected = []

    for day in days:
        forecast_date = _parse_date(
            day.get("date")
        )

        if not forecast_date:
            continue

        if start_date <= forecast_date <= end_date:
            selected.append(day)

    return selected


def has_forecast_for_period(weather, time_period):
    return bool(
        _filter_days_by_period(
            weather,
            time_period
        )
    )


def choose_forecast_day(weather, time_period):
    days = _filter_days_by_period(
        weather,
        time_period
    )

    if not days:
        return None

    return days[0]


# ============================================================
# VALUE HELPERS
# ============================================================

def _number(value, default=0):
    try:
        if value is None:
            return default

        return float(value)

    except (TypeError, ValueError):
        return default


def _format_number(value, decimals=1):
    if value is None:
        return "N/A"

    try:
        return f"{float(value):.{decimals}f}"

    except (TypeError, ValueError):
        return "N/A"


def _format_date(value):
    parsed = _parse_date(value)

    if not parsed:
        return str(value)

    return parsed.strftime("%Y-%m-%d")


def _source(weather):
    return weather.get(
        "source",
        "Weather data provider"
    )


# ============================================================
# MULTI-DAY FORECAST
# ============================================================

def format_multi_day_forecast(weather, time_period):
    days = _filter_days_by_period(
        weather,
        time_period
    )

    if not days:
        days = get_forecast_days(weather)

    if not days:
        return (
            "Sorry, I couldn't find forecast "
            "data for the requested period."
        )

    label = get_period_label(time_period)

    lines = [
        f"🌦️ **Weather forecast for "
        f"{weather.get('location', 'the requested location')} "
        f"for {label}:**"
    ]

    for day in days:
        forecast_date = _format_date(
            day.get("date")
        )

        condition = day.get(
            "condition",
            "Unavailable"
        )

        min_temp = day.get("min_temp")
        max_temp = day.get("max_temp")
        rain_probability = day.get(
            "rain_probability"
        )
        rainfall = day.get("rainfall")
        wind = day.get(
            "max_wind_speed_kmh"
        )

        line = (
            f"\n📅 **{forecast_date}** — "
            f"{condition}. "
            f"{_format_number(min_temp)}°C–"
            f"{_format_number(max_temp)}°C"
        )

        if rain_probability is not None:
            line += (
                f", rain chance "
                f"{rain_probability}%"
            )

        if rainfall is not None:
            line += (
                f", rainfall "
                f"{_format_number(rainfall, 2)} mm"
            )

        if wind is not None:
            line += (
                f", max wind "
                f"{_format_number(wind)} km/h"
            )

        lines.append(line)

    lines.append(
        f"\nSource: {_source(weather)}."
    )

    return "".join(lines)


# ============================================================
# CURRENT WEATHER
# ============================================================

def format_current_weather(weather):
    location = weather.get(
        "location",
        "the requested location"
    )

    condition = weather.get(
        "condition",
        "Unavailable"
    )

    temp = weather.get("temp")
    humidity = weather.get("humidity")
    wind = weather.get("wind")
    precipitation = weather.get(
        "precipitation"
    )

    return (
        f"🌤️ **Current weather in {location}:** "
        f"{condition} with a temperature of "
        f"{_format_number(temp)}°C. "
        f"Humidity is "
        f"{humidity if humidity is not None else 'N/A'}%, "
        f"wind is around "
        f"{_format_number(wind)} km/h, "
        f"and current precipitation is "
        f"{_format_number(precipitation, 2)} mm. "
        f"Source: {_source(weather)}."
    )


# ============================================================
# SINGLE / MULTI FORECAST
# ============================================================

def format_forecast(weather, time_period):
    days = _filter_days_by_period(
        weather,
        time_period
    )

    range_periods = {
        "next_7_days",
        "next_14_days",
        "next_16_days",
        "this_week",
        "next_week",
        "this_weekend",
        "next_weekend",
    }

    if time_period in range_periods:
        return format_multi_day_forecast(
            weather,
            time_period
        )

    if not days:
        days = get_forecast_days(weather)

    if not days:
        return (
            "Sorry, I couldn't find forecast "
            "data for the requested period."
        )

    day = days[0]

    label = get_period_label(time_period)

    location = weather.get(
        "location",
        "the requested location"
    )

    condition = day.get(
        "condition",
        "Unavailable"
    )

    min_temp = day.get("min_temp")
    max_temp = day.get("max_temp")
    rain_probability = day.get(
        "rain_probability"
    )
    rainfall = day.get("rainfall")

    probability = _number(
        rain_probability
    )

    if probability >= 60:
        rain_level = "high"
    elif probability >= 30:
        rain_level = "moderate"
    else:
        rain_level = "low"

    return (
        f"🌦️ **Forecast for {location} {label}:** "
        f"{condition}, with temperatures between "
        f"{_format_number(min_temp)}°C and "
        f"{_format_number(max_temp)}°C. "
        f"There is a {rain_level} chance of rain "
        f"({rain_probability if rain_probability is not None else 'N/A'}%). "
        f"Expected rainfall is around "
        f"{_format_number(rainfall, 2)} mm. "
        f"Source: {_source(weather)}."
    )


# ============================================================
# DECISION HELPERS
# ============================================================

def _decision_days(weather, time_period=None):
    days = _filter_days_by_period(
        weather,
        time_period
    )

    if days:
        return days

    return get_forecast_days(weather)


def find_least_rain_day(weather, time_period=None):
    days = _decision_days(
        weather,
        time_period
    )

    if not days:
        return {
            "recommendation": None,
            "reason": "No forecast data available."
        }

    selected = min(
        days,
        key=lambda d: (
            _number(
                d.get("rainfall"),
                999999
            ),
            _number(
                d.get(
                    "rain_probability"
                ),
                999999
            )
        )
    )

    return {
        "recommendation": selected,
        "reason": (
            "Lowest expected rainfall in the "
            "requested forecast period."
        )
    }


def find_hottest_day(weather, time_period=None):
    days = _decision_days(
        weather,
        time_period
    )

    if not days:
        return {
            "recommendation": None,
            "reason": "No forecast data available."
        }

    selected = max(
        days,
        key=lambda d: _number(
            d.get("max_temp"),
            -999999
        )
    )

    return {
        "recommendation": selected,
        "reason": (
            "Highest expected maximum temperature "
            "in the requested forecast period."
        )
    }


def find_coolest_day(weather, time_period=None):
    days = _decision_days(
        weather,
        time_period
    )

    if not days:
        return {
            "recommendation": None,
            "reason": "No forecast data available."
        }

    selected = min(
        days,
        key=lambda d: _number(
            d.get("min_temp"),
            999999
        )
    )

    return {
        "recommendation": selected,
        "reason": (
            "Lowest expected minimum temperature "
            "in the requested forecast period."
        )
    }


# ============================================================
# TRAVEL
# ============================================================

def _travel_score(day):
    rain_probability = _number(
        day.get("rain_probability"),
        100
    )

    rainfall = _number(
        day.get("rainfall"),
        999
    )

    wind = _number(
        day.get("max_wind_speed_kmh"),
        999
    )

    return (
        rain_probability * 0.45
        + rainfall * 4
        + wind * 0.25
    )


def find_best_travel_day(
    weather,
    time_period=None
):
    days = _decision_days(
        weather,
        time_period
    )

    if not days:
        return {
            "recommendation": None,
            "reason": "No forecast data available."
        }

    selected = min(
        days,
        key=_travel_score
    )

    return {
        "recommendation": selected,
        "reason": (
            "Lowest combined travel risk from "
            "rain probability, rainfall and wind."
        )
    }


def format_best_travel_day(
    weather,
    time_period=None
):
    result = find_best_travel_day(
        weather,
        time_period
    )

    day = result.get(
        "recommendation"
    )

    if not day:
        return (
            "🚗 I couldn't determine the best "
            "travel day because forecast data "
            "is unavailable."
        )

    return (
        f"🚗 **Best available travel day for "
        f"{weather.get('location', 'the requested location')}:** "
        f"{_format_date(day.get('date'))}. "
        f"Rain probability is "
        f"{day.get('rain_probability', 'N/A')}%, "
        f"expected rainfall is around "
        f"{_format_number(day.get('rainfall'), 2)} mm, "
        f"and maximum wind is around "
        f"{_format_number(day.get('max_wind_speed_kmh'))} km/h. "
        f"Source: {_source(weather)}."
    )


# ============================================================
# FARMING / SPRAYING
# ============================================================

def _spraying_score(day):
    rain_probability = _number(
        day.get("rain_probability"),
        100
    )

    rainfall = _number(
        day.get("rainfall"),
        999
    )

    wind = _number(
        day.get("max_wind_speed_kmh"),
        999
    )

    return (
        rain_probability * 0.5
        + rainfall * 5
        + wind * 0.5
    )


def find_best_spraying_day(
    weather,
    time_period=None
):
    days = _decision_days(
        weather,
        time_period
    )

    if not days:
        return {
            "recommendation": None,
            "reason": "No forecast data available."
        }

    suitable_days = [
        day
        for day in days
        if _number(
            day.get(
                "rain_probability"
            ),
            100
        ) < 60
        and _number(
            day.get("rainfall"),
            999
        ) < 5
        and _number(
            day.get(
                "max_wind_speed_kmh"
            ),
            999
        ) < 30
    ]

    if suitable_days:
        selected = min(
            suitable_days,
            key=_spraying_score
        )

        return {
            "recommendation": selected,
            "reason": (
                "Lower rain risk, lower expected "
                "rainfall and manageable wind "
                "conditions."
            )
        }

    selected = min(
        days,
        key=_spraying_score
    )

    return {
        "recommendation": selected,
        "reason": (
            "No fully suitable spraying day was "
            "found, so the lowest-risk available "
            "day was selected."
        )
    }


def format_best_spraying_day(
    weather,
    time_period=None
):
    result = find_best_spraying_day(
        weather,
        time_period
    )

    day = result.get(
        "recommendation"
    )

    if not day:
        return (
            "🌾 I couldn't determine the best "
            "spraying day because forecast data "
            "is unavailable."
        )

    return (
        f"🌾 **Best available spraying day for "
        f"{weather.get('location', 'the requested location')}:** "
        f"{_format_date(day.get('date'))}. "
        f"Rain probability is "
        f"{day.get('rain_probability', 'N/A')}%, "
        f"expected rainfall is around "
        f"{_format_number(day.get('rainfall'), 2)} mm, "
        f"and maximum wind is around "
        f"{_format_number(day.get('max_wind_speed_kmh'))} km/h. "
        f"Always follow the pesticide label and local "
        f"agricultural guidance. "
        f"Source: {_source(weather)}."
    )


# ============================================================
# FARMING ADVISORY
# ============================================================

def create_farming_advisory(
    weather,
    time_period=None
):
    days = _decision_days(
        weather,
        time_period
    )

    if not days:
        return {
            "recommendation": None,
            "reason": "No forecast data available."
        }

    selected = min(
        days,
        key=_spraying_score
    )

    rain_probability = _number(
        selected.get(
            "rain_probability"
        )
    )

    rainfall = _number(
        selected.get("rainfall")
    )

    wind = _number(
        selected.get(
            "max_wind_speed_kmh"
        )
    )

    reasons = []

    if rain_probability >= 60:
        reasons.append(
            f"there is a {rain_probability:.0f}% chance of rain"
        )

    if rainfall >= 5:
        reasons.append(
            f"expected rainfall is around {rainfall:.1f} mm"
        )

    if wind >= 25:
        reasons.append(
            f"winds may reach around {wind:.1f} km/h"
        )

    if not reasons:
        reasons.append(
            "rainfall and wind conditions appear manageable"
        )

    suitable = (
        rain_probability < 60
        and rainfall < 5
        and wind < 30
    )

    if suitable:
        recommendation = (
            "Conditions appear reasonably suitable "
            "for pesticide spraying."
        )
    else:
        recommendation = (
            "It may be better to avoid pesticide "
            "spraying during this period."
        )

    return {
        "recommendation": recommendation,
        "reason": "; ".join(reasons),
        "recommended_date": selected.get(
            "date"
        ),
        "forecast_day": selected
    }


# ============================================================
# TRAVEL ADVISORY
# ============================================================

def create_travel_advisory(
    weather,
    time_period=None
):
    result = find_best_travel_day(
        weather,
        time_period
    )

    selected = result.get(
        "recommendation"
    )

    if not selected:
        return {
            "recommendation": (
                "No travel recommendation is "
                "available because forecast data "
                "could not be retrieved."
            ),
            "reason": "No forecast data available."
        }

    rain_probability = _number(
        selected.get(
            "rain_probability"
        )
    )

    rainfall = _number(
        selected.get("rainfall")
    )

    wind = _number(
        selected.get(
            "max_wind_speed_kmh"
        )
    )

    reasons = []

    if rain_probability < 50:
        reasons.append(
            "Lower rainfall risk"
        )

    if rainfall < 5:
        reasons.append(
            "Lower expected rainfall"
        )

    if wind < 30:
        reasons.append(
            "Manageable wind conditions"
        )

    if not reasons:
        reasons.append(
            "This is the lowest-risk available "
            "day in the requested period"
        )

    return {
        "recommendation": (
            f"The best available day for travel is "
            f"{selected.get('date')}."
        ),
        "reason": "; ".join(reasons),
        "recommended_date": selected.get(
            "date"
        ),
        "forecast_day": selected
    }


# ============================================================
# ADVISORY FORMATTER
# ============================================================

def format_advisory(
    weather,
    advisory
):
    if not advisory:
        return (
            "I couldn't generate an advisory "
            "from the available weather data."
        )

    recommendation = advisory.get(
        "recommendation"
    )

    reason = advisory.get(
        "reason"
    )

    if not recommendation:
        recommendation = (
            "No recommendation is available."
        )

    response = recommendation

    if reason:
        response += (
            f" Why: {reason}."
        )

    response += (
        f" Source: {_source(weather)}."
    )

    return response


# ============================================================
# DECISION FORMATTING
# ============================================================

def format_least_rain_day(
    weather,
    time_period=None
):
    result = find_least_rain_day(
        weather,
        time_period
    )

    day = result.get(
        "recommendation"
    )

    if not day:
        return (
            "☔ I couldn't determine the "
            "lowest-rainfall day because "
            "forecast data is unavailable."
        )

    return (
        f"☔ **Lowest-rainfall day in the "
        f"requested forecast period for "
        f"{weather.get('location', 'the requested location')}:** "
        f"{_format_date(day.get('date'))}. "
        f"Expected rainfall is around "
        f"{_format_number(day.get('rainfall'), 2)} mm "
        f"with a "
        f"{day.get('rain_probability', 'N/A')}% "
        f"chance of rain. "
        f"Source: {_source(weather)}."
    )


def format_hottest_day(
    weather,
    time_period=None
):
    result = find_hottest_day(
        weather,
        time_period
    )

    day = result.get(
        "recommendation"
    )

    if not day:
        return (
            "🌡️ I couldn't determine the "
            "hottest day because forecast "
            "data is unavailable."
        )

    return (
        f"🌡️ **Hottest day in the requested "
        f"forecast period for "
        f"{weather.get('location', 'the requested location')}:** "
        f"{_format_date(day.get('date'))}, "
        f"with a maximum temperature of "
        f"{_format_number(day.get('max_temp'))}°C. "
        f"Expected conditions: "
        f"{day.get('condition', 'Unavailable')}. "
        f"Source: {_source(weather)}."
    )


# ============================================================
# ALERTS
# ============================================================

def format_alerts(alerts):
    if not alerts:
        return (
            "🟢 **No active weather warnings found.** "
            "There are currently no active warnings "
            "available for this location from the "
            "India Meteorological Department (IMD)."
        )

    lines = [
        "⚠️ **Active weather warnings:**"
    ]

    for alert in alerts:
        severity = alert.get(
            "severity",
            "Unknown"
        )

        message = alert.get(
            "message",
            "Weather warning available."
        )

        lines.append(
            f"\n🔴 **{severity}:** {message}"
        )

    lines.append(
        "\nSource: India Meteorological Department (IMD)."
    )

    return "".join(lines)