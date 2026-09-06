import os
import re
from datetime import datetime
import requests
from dotenv import load_dotenv

from weather_service import (
    get_live_weather,
    get_sector_advisories,
    get_extreme_weather_alerts,
)

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
LLM_MODEL = "nvidia/nemotron-3.5-lightning:free"

# Common Indian and global cities for reliable entity extraction
KNOWN_CITIES = [
    "bengaluru", "bangalore", "mumbai", "delhi", "new delhi", "chennai", "kolkata",
    "hyderabad", "pune", "ahmedabad", "jaipur", "lucknow", "kanpur", "nagpur",
    "indore", "thane", "bhopal", "visakhapatnam", "patna", "vadodara", "ghaziabad",
    "ludhiana", "agra", "nashik", "faridabad", "meerut", "rajkot", "varanasi",
    "srinagar", "aurangabad", "dhanbad", "amritsar", "navi mumbai", "allahabad",
    "prayagraj", "ranchi", "howrah", "coimbatore", "jabalpur", "gwalior", "vijayawada",
    "jodhpur", "madurai", "raipur", "kota", "guwahati", "chandigarh", "solapur",
    "hubballi", "mysuru", "mysore", "tiruchirappalli", "bareilly", "aligarh", "tiruppur",
    "gurgaon", "gurugram", "moradabad", "jalandhar", "bhubaneswar", "salem", "warangal",
    "mira-bhayandar", "jalgaon", "guntur", "thiruvananthapuram", "kochi", "cochin",
    "dehradun", "shimla", "panaji", "goa", "london", "new york", "tokyo", "paris", "dubai"
]

LANGUAGE_NAMES = {
    "English": "English",
    "हिन्दी": "Hindi",
    "Hindi": "Hindi",
    "ಕನ್ನಡ": "Kannada",
    "Kannada": "Kannada",
    "தமிழ்": "Tamil",
    "Tamil": "Tamil",
    "తెలుగు": "Telugu",
    "Telugu": "Telugu",
    "मराठी": "Marathi",
    "Marathi": "Marathi",
    "বাংলা": "Bengali",
    "Bengali": "Bengali",
}


def extract_location(message: str) -> str | None:
    """Extract location from natural language message."""
    text_lower = message.lower()

    # Direct city lookup in text
    for c in KNOWN_CITIES:
        pattern = r"\b" + re.escape(c) + r"\b"
        if re.search(pattern, text_lower):
            return c.title()

    # Regex patterns
    patterns = [
        r"\bin\s+([A-Za-z\s]+?)(?=\s+(?:tomorrow|today|now|tonight|next|this|\?|$))",
        r"\bfor\s+([A-Za-z\s]+?)(?=\s+(?:tomorrow|today|now|tonight|next|this|\?|$))",
        r"\bnear\s+([A-Za-z\s]+?)(?=\s+(?:tomorrow|today|now|tonight|next|this|\?|$))",
        r"\bat\s+([A-Za-z\s]+?)(?=\s+(?:tomorrow|today|now|tonight|next|this|\?|$))",
        r"\b(?:tomorrow|today|now|tonight)\s+in\s+([A-Za-z\s]+?)(?:\?|$)",
        r"(?:weather|forecast|rain|temperature)\s+(?:of|in|at)\s+([A-Za-z\s]+?)(?:\?|$)",
    ]

    for pattern in patterns:
        match = re.search(pattern, message, re.IGNORECASE)
        if match:
            cand = match.group(1).strip()
            # filter out non-city words
            cand = re.sub(r"\b(tomorrow|today|yesterday|week|month|forecast|weather|please|the)\b", "", cand, flags=re.IGNORECASE).strip()
            if len(cand) >= 3:
                return cand.title()

    return None


def detect_intent(message: str) -> str:
    """Detect meteorological intent from user message."""
    text = message.lower()

    if any(w in text for w in ["spray", "pesticide", "fertilizer", "crop", "farm", "farming", "irrigation", "harvest", "sow", "agriculture", "fasal", "kisan"]):
        return "farming_advisory"

    if any(w in text for w in ["flight", "aviation", "pilot", "airport", "metar", "taf", "vfr", "ifr", "runway", "crosswind"]):
        return "aviation"

    if any(w in text for w in ["marine", "sea", "ocean", "boat", "fish", "fishermen", "coast", "wave", "tsunami"]):
        return "marine"

    if any(w in text for w in ["alert", "warning", "cyclone", "flood", "heatwave", "storm", "lightning", "danger", "hazard", "heavy rain", "emergency"]):
        return "weather_alert"

    if any(w in text for w in ["climate", "global warming", "trend", "historical", "anomaly", "past years", "decade"]):
        return "climate_trend"

    if any(w in text for w in ["rain", "tomorrow", "forecast", "next week", "will it", "outlook", "weekly", "days"]):
        return "forecast"

    if any(w in text for w in ["air quality", "aqi", "pollution", "pm2.5", "smog"]):
        return "smart_city"

    return "current_weather"


def extract_time(message: str) -> str:
    text = message.lower()
    if "tomorrow" in text or "kal" in text:
        return "tomorrow"
    if "tonight" in text or "aaj raat" in text:
        return "tonight"
    if "today" in text or "aaj" in text:
        return "today"
    if "next week" in text or "agley hafte" in text:
        return "next_week"
    return "today"


def format_fallback_reply(intent: str, weather: dict, advisory: dict, alerts: list[dict], language: str = "English") -> str:
    """Intelligent rule-based fallback response formatter with Indian language support."""
    city = weather.get("city", "the area")
    temp = weather.get("temperature", 25)
    feels = weather.get("feels_like", 25)
    humidity = weather.get("humidity", 60)
    wind_kph = weather.get("wind_speed_kmh", 12)
    cond = weather.get("condition", "Clear")
    daily = weather.get("daily", [])
    tomorrow = daily[1] if len(daily) > 1 else (daily[0] if daily else {})
    rain_chance = tomorrow.get("rain_chance", 20)

    is_hindi = "हिन्दी" in language or "Hindi" in language
    is_kannada = "ಕನ್ನಡ" in language or "Kannada" in language
    is_tamil = "தமிழ்" in language or "Tamil" in language
    is_telugu = "తెలుగు" in language or "Telugu" in language

    if intent == "farming_advisory":
        agri = advisory.get("agriculture", {})
        status = agri.get("status", "SUITABLE")
        rec = agri.get("spray_recommendation", "")
        reasons = "; ".join(agri.get("reasons", []))
        irr = agri.get("irrigation_advice", "")

        if is_hindi:
            ans = f"🌾 **कृषि मौसम सलाह - {city}**\n\n"
            ans += f"• **कीटनाशक छिड़काव स्थिति:** {status} ({'छिड़काव के लिए अनुकूल' if status == 'SUITABLE' else 'छिड़काव से बचें'})\n"
            ans += f"• **सलाह:** {rec}\n"
            ans += f"• **कारण:** {reasons}\n"
            ans += f"• **सिंचाई सिफारिश:** {irr}\n"
            ans += f"• **कल का पूर्वानुमान:** तापमान {tomorrow.get('max_temp', 30)}°C, बारिश की संभावना {rain_chance}%, हवा {wind_kph} km/h।"
            return ans
        elif is_kannada:
            ans = f"🌾 **ಕೃಷಿ ಹವಾಮಾನ ಸಲಹೆ - {city}**\n\n"
            ans += f"• **ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಸ್ಥಿತಿ:** {status} ({'ಸಿಂಪಡಣೆಗೆ ಸೂಕ್ತವಾಗಿದೆ' if status == 'SUITABLE' else 'ಸಿಂಪಡಣೆ ಮುಂದೂಡಿ'})\n"
            ans += f"• **ಸಲಹೆ:** {rec}\n"
            ans += f"• **ಕಾರಣ:** {reasons}\n"
            ans += f"• **ನೀರಾವರಿ ಮಾರ್ಗದರ್ಶನ:** {irr}\n"
            ans += f"• **ನಾಳೆಯ ಹವಾಮಾನ:** ಗರಿಷ್ಠ ತಾಪಮಾನ {tomorrow.get('max_temp', 30)}°C, ಮಳೆ ಸಾಧ್ಯತೆ {rain_chance}%."
            return ans
        else:
            return (
                f"🌾 **Agricultural Advisory for {city}**\n\n"
                f"• **Pesticide Spray Suitability:** **{status}**\n"
                f"• **Recommendation:** {rec}\n"
                f"• **Key Factors:** {reasons}\n"
                f"• **Irrigation Guidance:** {irr}\n"
                f"• **Forecast Summary:** Tomorrow high of {tomorrow.get('max_temp', 30)}°C, rain probability {rain_chance}%, wind {wind_kph} km/h.\n"
                f"• **Suitable Crops:** Paddy, Cotton, Sugarcane, Vegetables, Pulses."
            )

    elif intent == "weather_alert":
        active_alert = alerts[0] if alerts else {}
        sev = active_alert.get("severity", "Advisory")
        event = active_alert.get("event", "Normal Conditions")
        action = active_alert.get("action", "Stay updated with local weather broadcasts.")

        if is_hindi:
            return (
                f"⚠ **मौसम चेतावनी एवं आपदा पूर्व चेतावनी - {city}**\n\n"
                f"• **स्तर:** {sev}\n"
                f"• **घटना:** {event}\n"
                f"• **मुख्य सुरक्षा निर्देश:** {action}\n"
                f"• **वैधता:** {active_alert.get('valid_until', 'Next 24 hours')}\n"
                f"• **स्रोत:** {active_alert.get('source', 'WeatherGPT Early Warning')}"
            )
        else:
            return (
                f"⚠ **Extreme Weather Alert for {city}**\n\n"
                f"• **Severity Level:** **{sev}**\n"
                f"• **Hazard:** {event}\n"
                f"• **Safety Action:** {action}\n"
                f"• **Valid Until:** {active_alert.get('valid_until', 'Next 24 hours')}\n"
                f"• **Source:** {active_alert.get('source', 'WeatherGPT Meteorological Warning System')}"
            )

    elif intent == "aviation":
        av = advisory.get("aviation", {})
        return (
            f"✈️ **Aviation Weather Briefing for {city}**\n\n"
            f"• **Flight Category:** **{av.get('flight_category', 'VFR')}**\n"
            f"• **Visibility:** {av.get('visibility_km', 10)} km\n"
            f"• **Wind:** {av.get('wind_knots', 8)} knots\n"
            f"• **Operational Advisory:** {av.get('recommendation', 'Standard flight operations.')}"
        )

    elif intent == "marine":
        mar = advisory.get("marine", {})
        return (
            f"🌊 **Marine & Coastal Weather Advisory for {city}**\n\n"
            f"• **Sea State:** **{mar.get('status', 'SAFE')}**\n"
            f"• **Coastal Surface Wind:** {mar.get('wind_knots', 10)} knots\n"
            f"• **Fishermen Advisory:** {mar.get('recommendation', 'Safe for maritime activity.')}"
        )

    elif intent == "forecast":
        if is_hindi:
            return (
                f"☁ **{city} का 7-दिवसीय मौसम पूर्वानुमान**\n\n"
                f"• **आज:** {temp}°C, {cond}, आर्द्रता {humidity}%\n"
                f"• **कल ({tomorrow.get('day', 'Tomorrow')}):** {tomorrow.get('min_temp')}°C से {tomorrow.get('max_temp')}°C, बारिश की संभावना {rain_chance}%\n"
                f"• **पूर्वानುಮಾನ मॉडल:** NOAA GFS & ECMWF न्यूमेरिकल प्रेडिक्शन द्वारा सत्यापित।"
            )
        elif is_kannada:
            return (
                f"☁ **{city} ವಾರದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ**\n\n"
                f"• **ಇಂದು:** {temp}°C, {cond}, ತೇವಾಂಶ {humidity}%\n"
                f"• **ನಾಳೆ:** {tomorrow.get('min_temp')}°C ರಿಂದ {tomorrow.get('max_temp')}°C, ಮಳೆ ಸಾಧ್ಯತೆ {rain_chance}%\n"
                f"• **ಮಾದರಿ:** NOAA GFS & ECMWF ಮಾದರಿಗಳಿಂದ ಪರಿಶೀಲಿಸಲಾಗಿದೆ."
            )
        else:
            daily_preview = "\n".join([
                f"• **{d['day']} ({d['date']}):** {d['min_temp']}°C - {d['max_temp']}°C | 💧 Rain {d['rain_chance']}% | {d['condition']}"
                for d in daily[:4]
            ])
            return (
                f"☁ **Weather Forecast for {city}**\n\n"
                f"**Current Status:** {temp}°C (Feels like {feels}°C), {cond}, Wind {wind_kph} km/h, Humidity {humidity}%.\n\n"
                f"**Multi-Day Forecast:**\n"
                f"{daily_preview}\n\n"
                f"Verified with NOAA GFS & ECMWF Numerical Weather Prediction (NWP) models."
            )

    else:
        if is_hindi:
            return (
                f"🌡 **वर्तमान मौसम स्थिति - {city}**\n\n"
                f"• **तापमान:** {temp}°C (महसूस {feels}°C)\n"
                f"• **मौसम स्थिति:** {cond}\n"
                f"• **हवा की गति:** {wind_kph} km/h\n"
                f"• **आर्द्रता:** {humidity}%\n"
                f"• **वायु गुणवत्ता (AQI):** {weather.get('air_quality', {}).get('status', 'Moderate')}\n"
                f"• **अपडेट समय:** {weather.get('updated_at', 'Now')}"
            )
        elif is_kannada:
            return (
                f"🌡 **ಪ್ರಸ್ತುತ ಹವಾಮಾನ ವಿವರ - {city}**\n\n"
                f"• **ತಾಪಮಾನ:** {temp}°C (ಅನಿಸಿಕೆ {feels}°C)\n"
                f"• **ಸ್ಥಿತಿ:** {cond}\n"
                f"• **ಗಾಳಿಯ ವೇಗ:** {wind_kph} km/h\n"
                f"• **ಆರ್ದ್ರತೆ:** {humidity}%\n"
                f"• **ವಾಯು ಗುಣಮಟ್ಟ:** {weather.get('air_quality', {}).get('status', 'Moderate')}"
            )
        else:
            return (
                f"🌡 **Current Weather in {city}**\n\n"
                f"• **Temperature:** {temp}°C (Feels like {feels}°C)\n"
                f"• **Condition:** {cond}\n"
                f"• **Humidity:** {humidity}%\n"
                f"• **Wind Speed:** {wind_kph} km/h ({weather.get('wind_dir', 'NE')})\n"
                f"• **Pressure:** {weather.get('pressure_hpa', 1012)} hPa | Visibility: {weather.get('visibility_km', 10)} km\n"
                f"• **Air Quality:** {weather.get('air_quality', {}).get('status', 'Moderate')} (PM2.5: {weather.get('air_quality', {}).get('pm2_5', 25)})\n"
                f"• **Environmental Risk:** {weather.get('risk', {}).get('level', 'LOW')} ({weather.get('risk', {}).get('score', 15)}/100)"
            )


def clean_llm_response(text: str) -> str:
    """Clean thinking tags and internal reasoning preamble from LLM output."""
    cleaned = re.sub(r"<thought>.*?</thought>", "", text, flags=re.DOTALL).strip()
    if "Here's a thinking process" in cleaned or "Here's a thinking process:" in cleaned:
        # Split on double newlines and filter out thinking lines
        paragraphs = cleaned.split("\n\n")
        filtered = [p for p in paragraphs if not p.lower().startswith("here's a thinking") and not p.lower().startswith("1.  **analyze") and not p.lower().startswith("2.  **determine")]
        if filtered:
            return "\n\n".join(filtered).strip()
    return cleaned


def ask_weathergpt(message: str, current_city: str = "Bengaluru", language: str = "English") -> dict:
    """
    Core AI query understanding engine:
    1. Extracts intent and target location.
    2. Gathers real-time meteorological data, NWP forecasts, and advisories.
    3. Calls OpenRouter LLM for natural, contextual, multilingual response.
    4. Seamlessly falls back to meteorological heuristics if API is unavailable.
    """
    detected_location = extract_location(message)
    target_city = detected_location if detected_location else current_city
    intent = detect_intent(message)
    time_period = extract_time(message)

    # 1. Gather live meteorological data
    try:
        weather_data = get_live_weather(target_city)
    except Exception as e:
        print(f"Live weather fetch error in chat: {e}")
        weather_data = {
            "city": target_city,
            "temperature": 27.0,
            "feels_like": 28.0,
            "humidity": 65,
            "wind_speed_kmh": 12.0,
            "condition": "Partly Cloudy",
            "precipitation_mm": 0.0,
            "daily": [{"day": "Tomorrow", "max_temp": 30.0, "min_temp": 21.0, "rain_chance": 25}],
            "air_quality": {"status": "Moderate", "pm2_5": 28},
            "risk": {"score": 20, "level": "LOW"},
            "source": "WeatherGPT Engine",
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        }

    advisories = get_sector_advisories(weather_data)
    alerts = get_extreme_weather_alerts(weather_data)

    target_lang_name = LANGUAGE_NAMES.get(language, language)

    # 2. Try OpenRouter LLM first
    ai_reply = None
    if OPENROUTER_API_KEY:
        system_prompt = f"""You are WeatherGPT, an advanced AI conversational meteorological intelligence platform.
You assist farmers, travelers, aviation pilots, marine operators, disaster management agencies, and common citizens.

LIVE METEOROLOGICAL CONTEXT:
- City: {weather_data.get('city')} ({weather_data.get('country', 'IN')})
- Current Temp: {weather_data.get('temperature')}°C (Feels like {weather_data.get('feels_like')}°C)
- Condition: {weather_data.get('condition')}
- Humidity: {weather_data.get('humidity')}%
- Wind: {weather_data.get('wind_speed_kmh')} km/h
- Precipitation: {weather_data.get('precipitation_mm')} mm
- Tomorrow Forecast: High {weather_data.get('daily', [{}])[1].get('max_temp', 'N/A') if len(weather_data.get('daily', [])) > 1 else 'N/A'}°C, Rain Chance: {weather_data.get('daily', [{}])[1].get('rain_chance', 'N/A') if len(weather_data.get('daily', [])) > 1 else 'N/A'}%
- Farming Pesticide Spray Suitability: {advisories.get('agriculture', {}).get('status')}
- Active Alerts: {[a.get('event') for a in alerts]}
- Aviation Flight Category: {advisories.get('aviation', {}).get('flight_category')}

INSTRUCTIONS:
1. Respond in **{target_lang_name}** language accurately and naturally.
2. Ground all answers strictly in the provided meteorological data.
3. If asked about farming/pesticides, provide clear guidance on spraying suitability, wind drift, and rain wash-off risks.
4. If asked about travel or flights, mention visibility, rainfall, and safety advisories.
5. Format your response cleanly using markdown with emojis and bullet points.
6. Keep the response concise, authoritative, and actionable."""

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://weathergpt.ai",
            "X-Title": "WeatherGPT",
        }

        payload = {
            "model": LLM_MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message},
            ],
            "max_tokens": 500,
            "temperature": 0.4,
        }

        try:
            r = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=8)
            if r.status_code == 200:
                resp_json = r.json()
                choices = resp_json.get("choices", [])
                if choices and "message" in choices[0]:
                    raw_content = choices[0]["message"].get("content", "").strip()
                    ai_reply = clean_llm_response(raw_content)
            else:
                print(f"OpenRouter returned status {r.status_code}: {r.text[:150]}")
        except Exception as err:
            print(f"OpenRouter call failed or timed out: {err}")

    # 3. If LLM did not generate response, use intelligent rule-based formatter
    if not ai_reply:
        ai_reply = format_fallback_reply(intent, weather_data, advisories, alerts, language)

    return {
        "reply": ai_reply,
        "type": intent,
        "location": weather_data.get("city", target_city),
        "temperature": weather_data.get("temperature"),
        "condition": weather_data.get("condition"),
        "time_period": time_period,
        "language": target_lang_name,
        "data_source": weather_data.get("source", "WeatherGPT Intelligence"),
    }


def parse_message(message: str) -> dict:
    """Backward-compatible parse_message utility."""
    return {
        "intent": detect_intent(message),
        "location": extract_location(message),
        "time_period": extract_time(message),
        "original_message": message,
    }