
import re
from datetime import datetime


LOCATION_ALIASES = {
    "mumbai": "Mumbai",
    "bombay": "Mumbai",

    "bengaluru": "Bengaluru",
    "bangalore": "Bengaluru",

    "mysuru": "Mysuru",
    "mysore": "Mysuru",

    "delhi": "Delhi",
    "new delhi": "Delhi",

    "pune": "Pune",
    "nashik": "Nashik",

    "hyderabad": "Hyderabad",

    "chennai": "Chennai",
    "madras": "Chennai",

    "kolkata": "Kolkata",
    "calcutta": "Kolkata",

    "ahmedabad": "Ahmedabad",
    "surat": "Surat",
    "vadodara": "Vadodara",
    "baroda": "Vadodara",

    "jaipur": "Jaipur",
    "udaipur": "Udaipur",
    "jodhpur": "Jodhpur",
    "kota": "Kota",

    "lucknow": "Lucknow",
    "kanpur": "Kanpur",
    "agra": "Agra",
    "varanasi": "Varanasi",
    "allahabad": "Prayagraj",
    "prayagraj": "Prayagraj",
    "noida": "Noida",

    "kochi": "Kochi",
    "cochin": "Kochi",

    "thiruvananthapuram": "Thiruvananthapuram",
    "trivandrum": "Thiruvananthapuram",

    "kozhikode": "Kozhikode",
    "calicut": "Kozhikode",

    "thrissur": "Thrissur",
    "kannur": "Kannur",
    "kollam": "Kollam",
    "alappuzha": "Alappuzha",
    "alleppey": "Alappuzha",

    "bhubaneswar": "Bhubaneswar",
    "cuttack": "Cuttack",

    "patna": "Patna",
    "gaya": "Gaya",

    "bhopal": "Bhopal",
    "indore": "Indore",
    "jabalpur": "Jabalpur",

    "amritsar": "Amritsar",
    "ludhiana": "Ludhiana",
    "chandigarh": "Chandigarh",

    "gurgaon": "Gurugram",
    "gurugram": "Gurugram",
    "faridabad": "Faridabad",

    "guwahati": "Guwahati",
    "ranchi": "Ranchi",
    "jamshedpur": "Jamshedpur",
    "raipur": "Raipur",

    "dehradun": "Dehradun",
    "haridwar": "Haridwar",
    "nainital": "Nainital",

    "shimla": "Shimla",
    "manali": "Manali",

    "srinagar": "Srinagar",
    "jammu": "Jammu",

    "goa": "Goa",
    "panaji": "Panaji",

    "visakhapatnam": "Visakhapatnam",
    "vizag": "Visakhapatnam",

    "vijayawada": "Vijayawada",
    "tirupati": "Tirupati",
    "nellore": "Nellore",

    "gangtok": "Gangtok",
    "shillong": "Shillong",
    "agartala": "Agartala",
    "imphal": "Imphal",
    "kohima": "Kohima",
    "aizawl": "Aizawl",
    "itanagar": "Itanagar",

    "ooty": "Ooty",
    "udhagamandalam": "Ooty",
}


MONTHS = {
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12,
}

WEEKDAYS = {
    "monday": 0,
    "tuesday": 1,
    "wednesday": 2,
    "thursday": 3,
    "friday": 4,
    "saturday": 5,
    "sunday": 6,
}


def clean_text(text):
    return re.sub(r"\s+", " ", text.lower().strip())


def extract_calendar_date(text):
    """
    Detect explicit calendar dates.

    Supported:
    - 2026-09-15
    - 09/15
    - 09-15
    - September 10
    - Sep 10
    - 10 September
    - 10 Sep
    """

    text = clean_text(text)
    current_year = datetime.now().year

    # YYYY-MM-DD
    match = re.search(r"\b(\d{4})-(\d{1,2})-(\d{1,2})\b", text)
    if match:
        year, month, day = map(int, match.groups())

        try:
            return datetime(year, month, day).strftime("%Y-%m-%d")
        except ValueError:
            return None

    # MM/DD or MM-DD
    match = re.search(r"\b(\d{1,2})[/-](\d{1,2})\b", text)
    if match:
        month, day = map(int, match.groups())

        try:
            return datetime(current_year, month, day).strftime("%Y-%m-%d")
        except ValueError:
            return None

    month_pattern = "|".join(MONTHS.keys())

    # Month Day / Month Day Year
    match = re.search(
        rf"\b({month_pattern})\s+(\d{{1,2}})(?:,\s*(\d{{4}}))?\b",
        text,
    )

    if match:
        month_name, day, year = match.groups()
        month = MONTHS[month_name]
        year = int(year) if year else current_year

        try:
            return datetime(year, month, int(day)).strftime("%Y-%m-%d")
        except ValueError:
            return None

    # Day Month / Day Month Year
    match = re.search(
        rf"\b(\d{{1,2}})\s+({month_pattern})(?:\s+(\d{{4}}))?\b",
        text,
    )

    if match:
        day, month_name, year = match.groups()
        month = MONTHS[month_name]
        year = int(year) if year else current_year

        try:
            return datetime(year, month, int(day)).strftime("%Y-%m-%d")
        except ValueError:
            return None

    # Short month names
    short_months = {
        "jan": 1,
        "feb": 2,
        "mar": 3,
        "apr": 4,
        "may": 5,
        "jun": 6,
        "jul": 7,
        "aug": 8,
        "sep": 9,
        "sept": 9,
        "oct": 10,
        "nov": 11,
        "dec": 12,
    }

    short_pattern = "|".join(short_months.keys())

    match = re.search(
        rf"\b({short_pattern})\s+(\d{{1,2}})(?:,\s*(\d{{4}}))?\b",
        text,
    )

    if match:
        month_name, day, year = match.groups()
        month = short_months[month_name]
        year = int(year) if year else current_year

        try:
            return datetime(year, month, int(day)).strftime("%Y-%m-%d")
        except ValueError:
            return None

    match = re.search(
        rf"\b(\d{{1,2}})\s+({short_pattern})(?:\s+(\d{{4}}))?\b",
        text,
    )

    if match:
        day, month_name, year = match.groups()
        month = short_months[month_name]
        year = int(year) if year else current_year

        try:
            return datetime(year, month, int(day)).strftime("%Y-%m-%d")
        except ValueError:
            return None

    return None


def extract_location(text):
    text = clean_text(text)

    # Remove time expressions so they don't interfere with location detection.
    removable_phrases = [
        "right now",
        "rightnow",
        "now",
        "today",
        "tomorrow",
        "the day after tomorrow",
        "day after tomorrow",
        "this weekend",
        "next weekend",
        "this week",
        "next week",
        "next 7 days",
        "next 14 days",
        "next 16 days",
    ]

    cleaned = text

    for phrase in removable_phrases:
        cleaned = cleaned.replace(phrase, " ")

    # Check longer aliases first.
    for alias in sorted(LOCATION_ALIASES.keys(), key=len, reverse=True):
        if re.search(rf"\b{re.escape(alias)}\b", cleaned):
            return LOCATION_ALIASES[alias]

    # Generic "in <location>" extraction.
    match = re.search(
        r"\bin\s+([a-zA-Z][a-zA-Z\s-]*?)(?:\s+(?:for|on|tomorrow|today|this|next|right|now|"
        r"weekend|week|days?)\b|[?.!,]|$)",
        cleaned,
    )

    if match:
        possible_location = match.group(1).strip()

        if possible_location:
            for alias in sorted(LOCATION_ALIASES.keys(), key=len, reverse=True):
                if possible_location == alias:
                    return LOCATION_ALIASES[alias]

    return None


def extract_time_period(text):
    text = clean_text(text)

    # Explicit dates always take priority.
    calendar_date = extract_calendar_date(text)

    if calendar_date:
        return calendar_date

    # Exact current-time expressions.
    if any(
        phrase in text
        for phrase in [
            "right now",
            "rightnow",
            "currently",
            "at the moment",
        ]
    ):
        return "now"

    # Explicit today/tomorrow.
    if "day after tomorrow" in text or "the day after tomorrow" in text:
        return "day_after_tomorrow"

    if "tomorrow" in text:
        return "tomorrow"

    if "today" in text:
        return "today"

    # Extended periods.
    if "next 16 days" in text or "next sixteen days" in text:
        return "next_16_days"

    if "next 14 days" in text or "next fourteen days" in text:
        return "next_14_days"

    if "next 7 days" in text or "next seven days" in text:
        return "next_7_days"

    if "this weekend" in text:
        return "this_weekend"

    if "next weekend" in text:
        return "next_weekend"

    if "this week" in text:
        return "this_week"

    if "next week" in text:
        return "next_week"

    # Weekday requests.
    for weekday in WEEKDAYS:
        if re.search(rf"\b{weekday}\b", text):
            return weekday

    return "now"


def detect_intent(text, time_period):
    text = clean_text(text)

    # ---------------------------------------------------------
    # 1. WEATHER ALERTS
    # ---------------------------------------------------------
    alert_words = [
        "alert",
        "alerts",
        "warning",
        "warnings",
        "weather alert",
        "weather alerts",
        "weather warning",
        "weather warnings",
    ]

    if any(word in text for word in alert_words):
        return "weather_alert"

    # ---------------------------------------------------------
    # 2. FARMING / SPRAYING SUITABILITY
    # ---------------------------------------------------------
    # Questions asking whether spraying is suitable on a
    # particular day are advisory questions, not requests to
    # select the best day.
    spraying_advisory_patterns = [
        "is tomorrow suitable for spraying",
        "is today suitable for spraying",
        "is tomorrow suitable to spray",
        "is today suitable to spray",
        "is the weather suitable for spraying",
        "is the weather suitable to spray",
        "is it suitable for spraying",
        "is it suitable to spray",
        "is it safe to spray",
        "is tomorrow safe for spraying",
        "is today safe for spraying",
    ]

    if any(pattern in text for pattern in spraying_advisory_patterns):
        return "farming_advisory"

    # General farming suitability questions should also remain
    # farming advisory requests.
    if (
        ("spray" in text or "spraying" in text or "pesticide" in text)
        and any(
            phrase in text
            for phrase in [
                "suitable for",
                "suitable to",
                "weather suitable",
                "conditions suitable",
                "safe to",
                "safe for",
            ]
        )
        and not any(
            phrase in text
            for phrase in [
                "best day",
                "best time",
                "when should",
                "when to",
                "ideal day",
                "optimal day",
            ]
        )
    ):
        return "farming_advisory"

    # ---------------------------------------------------------
    # 3. BEST SPRAYING DAY
    # ---------------------------------------------------------
    spraying_words = [
        "spray pesticides",
        "spraying pesticides",
        "spray pesticide",
        "spraying pesticide",
        "spray crops",
        "spraying crops",
        "spray the crops",
        "pesticide spraying",
        "when to spray",
        "when should i spray",
        "best time to spray",
        "best day to spray",
        "best day for spraying",
        "best day for pesticide",
        "ideal day to spray",
        "suitable day to spray",
        "optimal day to spray",
        "safe day to spray",
    ]

    if any(phrase in text for phrase in spraying_words):
        return "best_spraying_day"

    # Explicit "best" spraying questions.
    if (
        ("spray" in text or "spraying" in text or "pesticide" in text)
        and any(
            word in text
            for word in [
                "best",
                "ideal",
                "optimal",
                "when",
            ]
        )
    ):
        return "best_spraying_day"

    # ---------------------------------------------------------
    # 4. HOTTEST DAY
    # ---------------------------------------------------------
    hottest_words = [
        "hottest",
        "hotter",
        "highest temperature",
        "highest temperatures",
        "maximum temperature",
        "max temperature",
        "warmest",
    ]

    if any(word in text for word in hottest_words):
        return "hottest_day"

    # ---------------------------------------------------------
    # 5. LEAST RAIN DAY
    # ---------------------------------------------------------
    least_rain_patterns = [
        "least rain",
        "least rainfall",
        "lowest rain",
        "lowest rainfall",
        "least rainy",
        "driest day",
        "day with the least rain",
        "day with least rain",
        "day with the lowest rainfall",
        "day with lowest rainfall",
    ]

    if any(pattern in text for pattern in least_rain_patterns):
        return "least_rain_day"

    # ---------------------------------------------------------
    # 6. BEST TRAVEL DAY
    # ---------------------------------------------------------
    travel_words = [
        "travel",
        "travelling",
        "traveling",
        "trip",
        "journey",
        "drive",
        "driving",
        "road trip",
        "commute",
        "ride",
    ]

    travel_best_patterns = [
        "best day to travel",
        "best day for travel",
        "best day for travelling",
        "best day for traveling",
        "best day to go",
        "which day is best for travelling",
        "which day is best for traveling",
        "which day is best to travel",
        "which day should i travel",
        "which day should i go",
        "safest day to travel",
        "safest day for travel",
        "safe day to travel",
        "safe day for travel",
        "best time to travel",
    ]

    # Explicit "which day / best day" requests should always
    # return the day-selection intent.
    if any(pattern in text for pattern in travel_best_patterns):
        return "best_travel_day"

    # "Is it safe to travel ... this weekend/next weekend/week"
    # asks which day/period is safest.
    if (
        "safe to travel" in text
        and time_period in [
            "this_weekend",
            "next_weekend",
            "this_week",
            "next_week",
            "next_7_days",
            "next_14_days",
            "next_16_days",
        ]
    ):
        return "best_travel_day"

    # Other explicitly comparative travel wording.
    if (
        any(word in text for word in travel_words)
        and any(
            word in text
            for word in [
                "best",
                "safest",
                "ideal",
                "optimal",
            ]
        )
    ):
        return "best_travel_day"

    # ---------------------------------------------------------
    # 7. FARMING ADVISORY
    # ---------------------------------------------------------
    farming_words = [
        "farming",
        "farm",
        "crops",
        "crop",
        "agriculture",
        "agricultural",
        "pesticide",
        "pesticides",
        "harvest",
        "irrigation",
        "sowing",
        "cultivation",
    ]

    if any(word in text for word in farming_words):
        return "farming_advisory"

    # ---------------------------------------------------------
    # 8. TRAVEL ADVISORY
    # ---------------------------------------------------------
    if any(word in text for word in travel_words):
        return "travel_advisory"

    # ---------------------------------------------------------
    # 9. CURRENT WEATHER
    # ---------------------------------------------------------
    # Explicit future/past period expressions MUST NOT become
    # current_weather just because the sentence contains
    # "weather".
    #
    # Only "now/currently/right now/at the moment" means current
    # weather.
    if time_period == "now":
        current_patterns = [
            "right now",
            "currently",
            "at the moment",
            "current weather",
            "weather right now",
            "weather now",
            "temperature right now",
            "temperature now",
            "what is the weather",
        ]

        if any(pattern in text for pattern in current_patterns):
            return "current_weather"

    # ---------------------------------------------------------
    # 10. FORECAST
    # ---------------------------------------------------------
    # Any explicit non-now time period is a forecast request.
    if time_period != "now":
        return "forecast"

    forecast_words = [
        "forecast",
        "future weather",
        "will it rain",
        "will there be rain",
        "what will the weather",
        "weather tomorrow",
        "weather today",
        "weather this week",
        "weather next week",
    ]

    if any(word in text for word in forecast_words):
        return "forecast"

    # Default weather query.
    return "current_weather"


def parse_message(message):
    original_message = message
    text = clean_text(message)

    time_period = extract_time_period(text)
    location = extract_location(text)

    intent = detect_intent(text, time_period)

    return {
        "intent": intent,
        "location": location or "Mumbai",
        "time_period": time_period,
        "original_message": original_message,
    }

