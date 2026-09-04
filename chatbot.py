import re


def detect_intent(message: str) -> str:
    text = message.lower()

    farming_words = [
        "spray",
        "pesticide",
        "crop",
        "farm",
        "farming",
        "irrigation",
        "harvest",
    ]

    travel_words = [
        "travel",
        "drive",
        "road",
        "journey",
        "trip",
        "ride",
        "commute",
    ]

    alert_words = [
        "alert",
        "warning",
        "cyclone",
        "flood",
        "heatwave",
        "storm",
    ]

    forecast_words = [
        "rain",
        "tomorrow",
        "forecast",
        "next week",
        "will it",
    ]

    if any(word in text for word in farming_words):
        return "farming_advisory"

    if any(word in text for word in travel_words):
        return "travel_advisory"

    if any(word in text for word in alert_words):
        return "weather_alert"

    if any(word in text for word in forecast_words):
        return "forecast"

    return "current_weather"


def extract_location(message: str) -> str | None:
    patterns = [
        r"\bin\s+([A-Za-z\s]+?)(?=\s+(?:tomorrow|today|now|tonight)|\?|$)",
        r"\bfor\s+([A-Za-z\s]+?)(?=\s+(?:tomorrow|today|now|tonight)|\?|$)",
        r"\bnear\s+([A-Za-z\s]+?)(?=\s+(?:tomorrow|today|now|tonight)|\?|$)",
        r"\bat\s+([A-Za-z\s]+?)(?=\s+(?:tomorrow|today|now|tonight)|\?|$)",
        r"\b(?:tomorrow|today|now|tonight)\s+in\s+([A-Za-z\s]+?)(?:\?|$)",
    ]

    for pattern in patterns:
        match = re.search(pattern, message, re.IGNORECASE)

        if match:
            location = match.group(1).strip()
            location = re.sub(r"\s+", " ", location)
            return location.title()

    return None


def extract_time(message: str) -> str:
    text = message.lower()

    if "tomorrow" in text:
        return "tomorrow"

    if "tonight" in text:
        return "tonight"

    if "today" in text:
        return "today"

    if "next week" in text:
        return "next_week"

    return "now"


def parse_message(message: str) -> dict:
    return {
        "intent": detect_intent(message),
        "location": extract_location(message),
        "time_period": extract_time(message),
        "original_message": message,
    }