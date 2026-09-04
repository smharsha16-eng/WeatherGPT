from fastapi import FastAPI
from pydantic import BaseModel, Field

from chatbot import parse_message
from mock_api import get_alerts, get_weather
from response_formatter import (
    create_farming_advisory,
    create_travel_advisory,
    format_advisory,
    format_alerts,
    format_current_weather,
    format_forecast,
)

app = FastAPI(
    title="WeatherGPT Chatbot",
    version="0.1.0",
)


class ChatRequest(BaseModel):
    message: str = Field(
        min_length=2,
        examples=["Can I spray pesticides in Nashik tomorrow?"],
    )


@app.get("/")
def home():
    return {
        "project": "WeatherGPT Chatbot",
        "status": "running",
        "mode": "prototype mock-data mode",
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat")
def chat(request: ChatRequest):
    parsed = parse_message(request.message)

    if not parsed["location"]:
        return {
            "type": "clarification",
            "reply": (
                "Please tell me the city or district for which "
                "you need weather information."
            ),
            "parsed_query": parsed,
        }

    weather = get_weather(parsed["location"])
    intent = parsed["intent"]
    time_period = parsed["time_period"]

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

    elif intent == "weather_alert":
        alerts = get_alerts(parsed["location"])
        reply = format_alerts(alerts)

    else:
        reply = (
            "I can help with weather, forecasts, alerts, "
            "farming advice, and travel advice."
        )

    return {
        "type": intent,
        "reply": reply,
        "parsed_query": parsed,
        "data_source": weather["source"],
    }