from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi import FastAPI
from pydantic import BaseModel

from chatbot import parse_message

from weather_api import (
    get_alerts,
    get_required_forecast_days,
    get_weather,
)

from response_formatter import (
    format_alerts,
    format_current_weather,
    format_forecast,
    format_advisory,
    format_least_rain_day,
    format_hottest_day,
    format_best_travel_day,
    format_best_spraying_day,
    create_farming_advisory,
    create_travel_advisory,
)


app = FastAPI(
    title="WeatherGPT API",
    description="WeatherGPT backend API for weather intelligence and advisories",
    version="1.0.0",
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {
        "message": "WeatherGPT API is running",
        "status": "success",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "WeatherGPT",
    }


@app.post("/chat")
def chat(request: ChatRequest):
    parsed = parse_message(request.message)

    intent = parsed.get("intent")
    location = parsed.get("location")
    time_period = parsed.get("time_period")

    if intent == "weather_alert":
        alerts = get_alerts(location)
        reply = format_alerts(alerts)

        return {
            "type": intent,
            "reply": reply,
            "parsed_query": parsed,
            "data_source": "IMD",
        }

    # ---------------------------------------------------------
    # Handle special forecast periods
    # ---------------------------------------------------------

    effective_time_period = time_period

    # "Which day will be hottest in Delhi?"
    # No explicit period means we should evaluate the upcoming
    # forecast instead of only checking "now".
    if intent == "hottest_day" and time_period == "now":
        effective_time_period = "next_7_days"

    # ---------------------------------------------------------
    # Fix "this weekend"
    #
    # If today is Saturday, the remaining available part of
    # this weekend is tomorrow (Sunday).
    #
    # If today is Sunday, today itself is the remaining weekend.
    #
    # On weekdays, keep "this_weekend" so the formatter can
    # identify the upcoming Saturday/Sunday.
    # ---------------------------------------------------------

    if time_period == "this_weekend":
        india_now = datetime.now(ZoneInfo("Asia/Kolkata"))
        weekday = india_now.weekday()

        if weekday == 5:  # Saturday
            effective_time_period = "tomorrow"
        elif weekday == 6:  # Sunday
            effective_time_period = "today"
        else:
            effective_time_period = "this_weekend"

    # ---------------------------------------------------------
    # Determine how many forecast days are required
    # ---------------------------------------------------------

    required_days = get_required_forecast_days(effective_time_period)

    # Keep enough forecast data available for upcoming weekend
    # selection on weekdays.
    if time_period == "this_weekend" and effective_time_period == "this_weekend":
        required_days = 7

    weather = get_weather(
        location,
        forecast_days=required_days,
    )

    if not weather:
        return {
            "type": "error",
            "reply": (
                f"Sorry, I couldn't retrieve weather data "
                f"for {location or 'the requested location'} right now."
            ),
            "parsed_query": parsed,
            "data_source": None,
        }

    # Always preserve the location requested by the user.
    if location:
        weather["location"] = location

    # ---------------------------------------------------------
    # Generate response based on intent
    # ---------------------------------------------------------

    if intent == "current_weather":
        reply = format_current_weather(weather)

    elif intent == "forecast":
        reply = format_forecast(weather, time_period)

    elif intent == "farming_advisory":
        advisory = create_farming_advisory(
            weather,
            time_period,
        )
        reply = format_advisory(weather, advisory)

    elif intent == "travel_advisory":
        advisory = create_travel_advisory(
            weather,
            time_period,
        )
        reply = format_advisory(weather, advisory)

    elif intent == "least_rain_day":
        reply = format_least_rain_day(
            weather,
            effective_time_period,
        )

    elif intent == "hottest_day":
        reply = format_hottest_day(
            weather,
            effective_time_period,
        )

    elif intent == "best_travel_day":
        reply = format_best_travel_day(
            weather,
            effective_time_period,
        )

    elif intent == "best_spraying_day":
        reply = format_best_spraying_day(
            weather,
            effective_time_period,
        )

    else:
        reply = format_forecast(
            weather,
            time_period,
        )

    return {
        "type": intent,
        "reply": reply,
        "parsed_query": parsed,
        "data_source": weather.get("source"),
    }