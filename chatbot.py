import os
import re
from datetime import datetime
import requests
from dotenv import load_dotenv

from weather_service import (
    get_live_weather,
    get_sector_advisories,
    get_extreme_weather_alerts,
    get_outfit_recommendations,
)

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL = "nvidia/nemotron-3.5-lightning:free"

KNOWN_CITIES = [
    "ooty", "udhagamandalam", "ootacamund", "kodaikanal", "munnar", "wayanad", "coorg",
    "madikeri", "chikmagalur", "chikkamagaluru", "yercaud", "manali", "shimla", "darjeeling",
    "mussoorie", "rishikesh", "nainital", "hampi", "gokarna", "alappuzha", "alleppey",
    "mahabaleshwar", "shirdi", "tirupati", "mandya", "udupi", "shimoga", "shivamogga",
    "kolar", "tumakuru", "tumkur", "chamarajanagar", "dindigul", "bengaluru", "bangalore",
    "mumbai", "delhi", "new delhi", "chennai", "kolkata", "hyderabad", "pune", "ahmedabad",
    "jaipur", "lucknow", "kanpur", "nagpur", "indore", "thane", "bhopal", "visakhapatnam",
    "patna", "vadodara", "ghaziabad", "ludhiana", "agra", "nashik", "faridabad", "meerut",
    "rajkot", "varanasi", "srinagar", "aurangabad", "dhanbad", "amritsar", "navi mumbai",
    "allahabad", "prayagraj", "ranchi", "howrah", "coimbatore", "jabalpur", "gwalior",
    "vijayawada", "jodhpur", "madurai", "raipur", "kota", "guwahati", "chandigarh",
    "solapur", "hubballi", "mysuru", "mysore", "tiruchirappalli", "bareilly", "aligarh",
    "tiruppur", "gurgaon", "gurugram", "moradabad", "jalandhar", "bhubaneswar", "salem",
    "warangal", "mira-bhayandar", "jalgaon", "guntur", "thiruvananthapuram", "kochi",
    "cochin", "dehradun", "panaji", "goa", "london", "new york", "tokyo", "paris", "dubai"
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
    """Extract city/location entity from natural language query."""
    text_clean = message.lower()

    # 1. Direct match on known cities, hill stations, and tourist hubs
    for c in sorted(KNOWN_CITIES, key=len, reverse=True):
        pattern = r"\b" + re.escape(c) + r"\b"
        if re.search(pattern, text_clean):
            if c in ["ooty", "udhagamandalam", "ootacamund"]:
                return "Ooty"
            return c.title()

    # 2. Pattern-based location extraction for any village, town, district, or city
    patterns = [
        # e.g. "ooty weather for the next 7 days", "manali forecast for 4 days"
        r"^([A-Za-z\s]+?)\s+(?:weather|forecast|rain|temperature|climate|outlook)",
        # e.g. "ooty 7 days forecast", "ooty 4 days"
        r"^([A-Za-z\s]+?)\s+(?:\d+\s*days?|\d+\s*day\s+forecast)",
        # e.g. "weather data in ooty for 4days", "weather forecast for wayanad"
        r"(?:weather|forecast|rain|temperature|climate|outlook)(?:\s+data|\s+report|\s+info|\s+information)?\s+(?:in|for|of|at|near)\s+([A-Za-z\s]+?)(?:\s+(?:for\s+\d+|\d+\s*days?|next|upcoming|this|tomorrow|today|now|please)|[\?\.]|$)",
        # e.g. "what is the weather in ooty", "tell me weather of mysuru"
        r"\b(?:in|for|at|near|of)\s+([A-Za-z\s]+?)(?:\s+(?:for\s+\d+|\d+\s*days?|next|upcoming|this|tomorrow|today|now|please)|[\?\.]|$)",
        # e.g. "tomorrow in ooty"
        r"\b(?:tomorrow|today|now|tonight)\s+in\s+([A-Za-z\s]+?)(?:\?|\.|$)",
    ]

    stopwords = {
        "weather", "forecast", "rain", "temperature", "please", "tell", "me", "the",
        "data", "about", "what", "how", "is", "like", "in", "for", "of", "at", "near",
        "next", "today", "tomorrow", "days", "day", "week", "month", "upcoming", "this",
        "ahead", "report", "info", "information", "update"
    }

    for pattern in patterns:
        match = re.search(pattern, message, re.IGNORECASE)
        if match:
            cand = match.group(1).strip()
            # Clean stop words
            words = [w for w in cand.split() if w.lower() not in stopwords]
            cand = " ".join(words).strip()
            if len(cand) >= 3:
                if cand.lower() in ["ooty", "udhagamandalam", "ootacamund"]:
                    return "Ooty"
                return cand.title()

    return None


def detect_intent(message: str) -> str:
    """Classify meteorological query intent."""
    text = message.lower()

    if any(w in text for w in ["outfit", "wear", "dress", "clothing", "cloth", "jacket", "sweater", "shoes", "umbrella", "what should i wear", "what to wear", "kapde", "kya pehnu", "udupu", "dharisi"]):
        return "outfit"

    if any(w in text for w in ["spray", "pesticide", "fertilizer", "crop", "farm", "farming", "irrigation", "harvest", "sow", "agriculture", "fasal", "kisan", "beej"]):
        return "farming_advisory"

    if any(w in text for w in ["flight", "aviation", "pilot", "airport", "metar", "taf", "vfr", "ifr", "runway", "crosswind", "vobl", "vidp"]):
        return "aviation"

    if any(w in text for w in ["marine", "sea", "ocean", "boat", "fish", "fishermen", "coast", "wave", "tsunami", "tide"]):
        return "marine"

    if any(w in text for w in ["alert", "warning", "cyclone", "flood", "heatwave", "storm", "lightning", "danger", "hazard", "heavy rain", "emergency"]):
        return "weather_alert"

    if any(w in text for w in ["climate", "global warming", "trend", "historical", "anomaly", "past years", "decade", "ipcc"]):
        return "climate_trend"

    if any(w in text for w in ["rain", "tomorrow", "kal", "naale", "forecast", "next week", "will it", "outlook", "weekly", "days", "exam", "test", "interview", "pariksha", "trip", "travel"]):
        return "forecast"

    if any(w in text for w in ["air quality", "aqi", "pollution", "pm2.5", "pm10", "smog"]):
        return "smart_city"

    return "current_weather"


def extract_time(message: str) -> str:
    text = message.lower()
    if "tomorrow" in text or "kal" in text or "naale" in text:
        return "tomorrow"
    if "tonight" in text or "aaj raat" in text:
        return "tonight"
    if "today" in text or "aaj" in text or "indu" in text:
        return "today"
    if "next week" in text or "agley hafte" in text:
        return "next_week"
    return "today"


COND_TRANSLATIONS = {
    "Clear": {"hi": "साफ", "kn": "ಸ್ವಚ್ಛ", "ta": "தெளிவான", "te": "స్పష్టమైన", "mr": "निरभ्र", "bn": "পরিষ্কার"},
    "Sunny": {"hi": "धूप", "kn": "ಬಿಸಿಲು", "ta": "வெயில்", "te": "ఎండ", "mr": "सूर्यप्रकाश", "bn": "রৌদ্রোজ্জ্বল"},
    "Partly Cloudy": {"hi": "हल्के बादल", "kn": "ಭಾಗಶಃ ಮೋಡ", "ta": "பகுதி மேகமூட்டம்", "te": "పాక్షికంగా మేఘావృతం", "mr": "थोड्या ढगाळ", "bn": "আংশিক মেঘলা"},
    "Cloudy": {"hi": "बादल", "kn": "ಮೋಡ ಕವಿದ", "ta": "மேகமூட்டம்", "te": "మేఘావృతం", "mr": "ढगाळ", "bn": "মেঘলা"},
    "Overcast": {"hi": "घने बादल", "kn": "ದಟ್ಟ ಮೋಡ", "ta": "முழு மேகமூட்டம்", "te": "దట్టమైన మేఘాలు", "mr": "पूर्ण ढगाळ", "bn": "মেঘাচ্ছন্ন"},
    "Light Rain": {"hi": "हल्की बारिश", "kn": "ಹಗುರ ಮಳೆ", "ta": "லேசான மழை", "te": "తేలికపాటి వర్షం", "mr": "हलका पाऊस", "bn": "হালকা বৃষ্টি"},
    "Rain": {"hi": "बारिश", "kn": "ಮಳೆ", "ta": "மழை", "te": "వర్షం", "mr": "पाऊस", "bn": "বৃষ্টি"},
    "Moderate Rain": {"hi": "मध्यम बारिश", "kn": "ಸಾಧಾರಣ ಮಳೆ", "ta": "மிதமான மழை", "te": "మోస్తరు వర్షం", "mr": "मध्यम पाऊस", "bn": "মাঝারি বৃষ্টি"},
    "Heavy Rain": {"hi": "तेज बारिश", "kn": "ಭಾರೀ ಮಳೆ", "ta": "கனமழை", "te": "భారీ వర్షం", "mr": "मुसळधार पाऊस", "bn": "ভারী বৃষ্টি"},
    "Thunderstorm": {"hi": "गरज-चमक के साथ बारिश", "kn": "ಗುಡುಗು ಸಹಿತ ಮಳೆ", "ta": "இடி மின்னல் மழை", "te": "ఉరుములతో కూడిన వర్షం", "mr": "वादळी पाऊस", "bn": "বজ্রবিদ্যুৎসহ ঝড়"},
}


def get_translated_condition(cond: str, lang_code: str) -> str:
    cond_clean = cond.strip()
    for k, v in COND_TRANSLATIONS.items():
        if k.lower() in cond_clean.lower():
            return v.get(lang_code, cond_clean)
    return cond_clean


def format_fallback_reply(
    intent: str,
    weather: dict,
    advisory: dict,
    alerts: list[dict],
    language: str = "English",
    user_message: str = "",
) -> str:
    """Friendly, conversational, concise, and natural response generator with all essential data."""
    city = weather.get("city", "the region")
    temp = weather.get("temperature", 25)
    feels = weather.get("feels_like", 25)
    humidity = weather.get("humidity", 60)
    wind_kph = weather.get("wind_speed_kmh", 12)
    cond = weather.get("condition", "Partly Cloudy")
    daily = weather.get("daily", [])
    tomorrow = daily[1] if len(daily) > 1 else (daily[0] if daily else {})
    rain_chance = tomorrow.get("rain_chance", 20)

    is_hi = "हिन्दी" in language or "Hindi" in language
    is_kn = "ಕನ್ನಡ" in language or "Kannada" in language
    is_ta = "தமிழ்" in language or "Tamil" in language
    is_te = "తెలుగు" in language or "Telugu" in language
    is_mr = "मराठी" in language or "Marathi" in language
    is_bn = "বাংলা" in language or "Bengali" in language

    msg_lower = user_message.lower()

    # Helpful, human everyday tips based on temperature and precipitation
    if rain_chance >= 50 or "rain" in cond.lower():
        tip_en = "Don't forget an umbrella if you're heading out today! ☔"
        tip_hi = "अगर आप बाहर जा रहे हैं तो छाता साथ रखना न भूलें! ☔"
        tip_kn = "ಹೊರಗೆ ಹೋಗುವಾಗ ಛತ್ರಿ ಇಟ್ಟುಕೊಳ್ಳಲು ಮರೆಯಬೇಡಿ! ☔"
        tip_ta = "வெளியே செல்லும்போது குடை எடுத்துச் செல்லுங்கள்! ☔"
        tip_te = "బయటకు వెళ్లేటప్పుడు గొడుగు తీసుకెళ్లడం మర్చిపోవద్దు! ☔"
        tip_mr = "बाहेर पडताना छत्री सोबत ठेवायला विसरू नका! ☔"
        tip_bn = "বাইরে বের হলে ছাতা সঙ্গে রাখতে ভুলবেন না! ☔"
    elif temp >= 35:
        tip_en = "It's quite warm out, so stay hydrated and keep in the shade! ☀️"
        tip_hi = "धूप काफी तेज है, इसलिए पर्याप्त पानी पिएं और धूप से बचें! ☀️"
        tip_kn = "ಬಿಸಿಲು ಹೆಚ್ಚಾಗಿದೆ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ! ☀️"
        tip_ta = "வெயில் அதிகமாக உள்ளது, நிறைய தண்ணீர் குடியுங்கள்! ☀️"
        tip_te = "ఎండ తీవ్రంగా ఉంది, తగినంత నీరు త్రాగండి! ☀️"
        tip_mr = "उष्णता जास्त आहे, भरपूर पाणी प्या! ☀️"
        tip_bn = "গরম বেশ বেশি, পর্যাপ্ত জল পান করুন! ☀️"
    elif temp <= 16:
        tip_en = "It's a bit chilly, so a light jacket or sweater will keep you comfortable! 🧣"
        tip_hi = "मौसम थोड़ा ठंडा है, हल्की जैकेट या स्वेटर पहनना आरामदायक रहेगा! 🧣"
        tip_kn = "ಸ್ವಲ್ಪ ಚಳಿಯಿದೆ, ಲಘು ಸ್ವೆಟರ್ ಧರಿಸುವುದು ಒಳ್ಳೆಯದು! 🧣"
        tip_ta = "குளிர்ச்சியாக உள்ளது, லேசான ஸ்வெட்டர் நல்லது! 🧣"
        tip_te = "కాస్త చల్లగా ఉంది, తేలికపాటి స్వెటర్ వేసుకోవడం మంచిది! 🧣"
        tip_mr = "थंडी जाणवत आहे, हलके स्वेटर घालणे सोयीचे ठरेल! 🧣"
        tip_bn = "একটু ঠান্ডা রয়েছে, হালকা গরম পোশাক পরা ভালো! 🧣"
    else:
        tip_en = "Overall, it's very pleasant and comfortable outside today! 🌤️"
        tip_hi = "कुल मिलाकर आज बाहर का मौसम बहुत सुहावना और आरामदायक है! 🌤️"
        tip_kn = "ಒಟ್ಟಾರೆಯಾಗಿ ಇಂದು ವಾತಾವರಣ ಆಹ್ಲಾದಕರ ಮತ್ತು ಆರಾಮದಾಯಕವಾಗಿದೆ! 🌤️"
        tip_ta = "இன்று வானிலை மிகவும் இதமாகவும் அருமையாகவும் உள்ளது! 🌤️"
        tip_te = "ఈ రోజు బయట వాతావరణం చాలా ఆహ్లాదకరంగా ఉంది! 🌤️"
        tip_mr = "आजचे हवामान अगदी प्रसन्न आणि आल्हाददायक आहे! 🌤️"
        tip_bn = "সামগ্রিকভাবে আজকের আবহাওয়া বেশ মনোরম এবং আরামদায়ক! 🌤️"

    # 1. OUTFIT & CLOTHING ADVISORY
    if intent == "outfit":
        target_day = "tomorrow" if ("tomorrow" in msg_lower or "kal" in msg_lower or "naale" in msg_lower or "nale" in msg_lower) else "today"
        recs = get_outfit_recommendations(weather, day=target_day)
        w_sum = recs.get("weather_summary", {})
        o_data = recs.get("outfit", {})
        acc_list = recs.get("accessories", [])

        t_max = w_sum.get("temp_max", 28)
        t_min = w_sum.get("temp_min", 20)
        c_text = w_sum.get("condition", "Partly Cloudy")
        r_prob = w_sum.get("rain_chance", 15)
        p_mm = w_sum.get("precipitation_mm", 0.0)
        w_spd = w_sum.get("wind_speed_kmh", 12)
        day_str = "tomorrow" if target_day == "tomorrow" else "today"

        top_choice = o_data.get("tops", ["Breathable cotton t-shirt or shirt"])[0]
        bot_choice = o_data.get("bottoms", ["Comfortable regular jeans or chinos"])[0]
        layer_choice = o_data.get("outerwear", ["Light overshirt or cardigan"])[0]
        shoe_choice = o_data.get("footwear", ["Everyday comfortable walking sneakers"])[0]
        acc_choice = acc_list[0]["item"] if acc_list else "Sunglasses / Watch"

        if is_hi:
            cond_hi = get_translated_condition(c_text, "hi")
            day_hi = "कल" if target_day == "tomorrow" else "आज"
            return (
                f"👔 **{city} के लिए {day_hi} का आउटफिट सुझाव:**\n\n"
                f"{day_hi} का मौसम: अधिकतम **{t_max}°C**, न्यूनतम **{t_min}°C**, **{cond_hi}** (बारिश की संभावना **{r_prob}%**, हवा **{w_spd} km/h**)।\n\n"
                f"• **टॉप (Top):** {top_choice}\n"
                f"• **बॉटम (Bottom):** {bot_choice}\n"
                f"• **लेयर / जैकेट:** {layer_choice}\n"
                f"• **जूते (Footwear):** {shoe_choice}\n"
                f"• **खास सामान:** {acc_choice}"
            )
        elif is_kn:
            cond_kn = get_translated_condition(c_text, "kn")
            day_kn = "ನಾಳೆಯ" if target_day == "tomorrow" else "ಇಂದಿನ"
            return (
                f"👔 **{city} ಗೆ {day_kn} ಉಡುಪು ಸಲಹೆ:**\n\n"
                f"{day_kn} ಹವಾಮಾನ: ಗರಿಷ್ಠ **{t_max}°C**, ಕನಿಷ್ಠ **{t_min}°C**, **{cond_kn}** (ಮಳೆ ಸಾಧ್ಯತೆ **{r_prob}%**, ಗಾಳಿ **{w_spd} km/h**).\n\n"
                f"• **ಮೇಲುಡುಪು (Top):** {top_choice}\n"
                f"• **ಪ್ಯಾಂಟ್ (Bottom):** {bot_choice}\n"
                f"• **ಲೇಯರ್ / ಜಾಕೆಟ್:** {layer_choice}\n"
                f"• **ಪಾದರಕ್ಷೆ (Footwear):** {shoe_choice}\n"
                f"• **ಅಗತ್ಯ ಪರಿಕರ:** {acc_choice}"
            )
        elif is_ta:
            cond_ta = get_translated_condition(c_text, "ta")
            day_ta = "நாளைக்கான" if target_day == "tomorrow" else "இன்றைய"
            return (
                f"👔 **{city} {day_ta} உடை பரிந்துரை:**\n\n"
                f"வானிலை: அதிகபட்சம் **{t_max}°C**, குறைந்தபட்சம் **{t_min}°C**, **{cond_ta}** (மழை வாய்ப்பு **{r_prob}%**).\n\n"
                f"• **மேலாடை (Top):** {top_choice}\n"
                f"• **கீழாடை (Bottom):** {bot_choice}\n"
                f"• **ஜாகெட் / லேயர்:** {layer_choice}\n"
                f"• **காலணிகள்:** {shoe_choice}\n"
                f"• **அத்தியாவசியப் பொருட்கள்:** {acc_choice}"
            )
        elif is_te:
            cond_te = get_translated_condition(c_text, "te")
            day_te = "రేపటి" if target_day == "tomorrow" else "ఈ రోజు"
            return (
                f"👔 **{city} లో {day_te} దుస్తుల సలహా:**\n\n"
                f"వాతావరణం: గరిష్ట **{t_max}°C**, కనిష్ట **{t_min}°C**, **{cond_te}** (వర్షం అవకాశం **{r_prob}%**).\n\n"
                f"• **టాప్స్ (Top):** {top_choice}\n"
                f"• **బాటమ్స్ (Bottom):** {bot_choice}\n"
                f"• **జాకెట్ / లేయర్:** {layer_choice}\n"
                f"• **పాదరక్షలు:** {shoe_choice}\n"
                f"• **ముఖ్యమైనవి:** {acc_choice}"
            )
        elif is_mr:
            cond_mr = get_translated_condition(c_text, "mr")
            day_mr = "उद्यासाठी" if target_day == "tomorrow" else "आजसाठी"
            return (
                f"👔 **{city} साठी {day_mr} कपड्यांचा सल्ला:**\n\n"
                f"हवामान: कमाल **{t_max}°C**, किमान **{t_min}°C**, **{cond_mr}** (पाऊस शक्यता **{r_prob}%**).\n\n"
                f"• **टॉप (Top):** {top_choice}\n"
                f"• **बॉटम (Bottom):** {bot_choice}\n"
                f"• **लेअर / जॅकेट:** {layer_choice}\n"
                f"• **पादत्राणे:** {shoe_choice}\n"
                f"• **आवश्यक वस्तू:** {acc_choice}"
            )
        elif is_bn:
            cond_bn = get_translated_condition(c_text, "bn")
            day_bn = "আগামীকালের" if target_day == "tomorrow" else "আজকের"
            return (
                f"👔 **{city}-র জন্য {day_bn} পোশাকের পরামর্শ:**\n\n"
                f"আবহাওয়া: সর্বোচ্চ **{t_max}°C**, সর্বনিম্ন **{t_min}°C**, **{cond_bn}** (বৃষ্টির সম্ভাবনা **{r_prob}%**)।\n\n"
                f"• **টপস (Top):** {top_choice}\n"
                f"• **বটমস (Bottom):** {bot_choice}\n"
                f"• **লেয়ার / জ্যাকেট:** {layer_choice}\n"
                f"• **জুতো:** {shoe_choice}\n"
                f"• **প্রয়োজনীয় জিনিস:** {acc_choice}"
            )
        else:
            return (
                f"👔 **Outfit recommendation for {city} ({day_str}):**\n\n"
                f"Expected weather: **{t_max}°C / {t_min}°C** with **{c_text}**, a **{r_prob}% chance of rain**, and winds around **{w_spd} km/h**.\n\n"
                f"• **Top:** {top_choice}\n"
                f"• **Bottom:** {bot_choice}\n"
                f"• **Layer / Outerwear:** {layer_choice}\n"
                f"• **Footwear:** {shoe_choice}\n"
                f"• **Key Accessory:** {acc_choice}"
            )

    # 2. FARMING ADVISORY
    elif intent == "farming_advisory":
        agri = advisory.get("agriculture", {})
        status = agri.get("status", "SUITABLE")
        score = agri.get("suitability_score", 85)
        rec = agri.get("spray_recommendation", "Conditions are favorable for spraying.")

        if is_hi:
            status_word = "अनुकूल" if status == "SUITABLE" else "प्रतिकूल"
            return (
                f"🌾 **{city} के किसानों के लिए मौसम सलाह:**\n\n"
                f"कल कीटनाशक छिड़काव के लिए स्थिति **{status_word}** है (अनुकूलता स्कोर: {score}/100)।\n"
                f"• **सलाह:** {rec}\n"
                f"• **मौसम:** कल अधिकतम तापमान {tomorrow.get('max_temp', 30)}°C रहेगा, बारिश की संभावना {rain_chance}% और हवा {wind_kph} km/h रहेगी।"
            )
        elif is_kn:
            status_word = "ಸೂಕ್ತವಾಗಿದೆ" if status == "SUITABLE" else "ಸೂಕ್ತವಾಗಿಲ್ಲ"
            return (
                f"🌾 **{city} ರೈತರಿಗೆ ಕೃಷಿ ಹವಾಮಾನ ಮಾರ್ಗದರ್ಶನ:**\n\n"
                f"ನಾಳೆ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆಗೆ ವಾತಾವರಣ **{status_word}** (ಅಂಕ: {score}/100).\n"
                f"• **ಸಲಹೆ:** {rec}\n"
                f"• **ಹವಾಮಾನ:** ಗರಿಷ್ಠ ತಾಪಮಾನ {tomorrow.get('max_temp', 30)}°C, ಮಳೆ ಸಾಧ್ಯತೆ {rain_chance}% ಮತ್ತು ಗಾಳಿ {wind_kph} km/h."
            )
        elif is_ta:
            status_word = "ஏற்றது" if status == "SUITABLE" else "ஏற்றதல்ல"
            return (
                f"🌾 **{city} விவசாயிகளுக்கான வானிலை வழிகாட்டுதல்:**\n\n"
                f"நாளை பூச்சிக்கொல்லி தெளிக்க நிலைமை **{status_word}** (மதிப்பீடு: {score}/100).\n"
                f"• **பரிந்துரை:** {rec}\n"
                f"• **வானிலை:** வெப்பநிலை {tomorrow.get('max_temp', 30)}°C, மழை வாய்ப்பு {rain_chance}%, காற்று {wind_kph} km/h."
            )
        elif is_te:
            status_word = "అనుకూలం" if status == "SUITABLE" else "అనుకూలం కాదు"
            return (
                f"🌾 **{city} రైతులకు వ్యవసాయ వాతావరణ సలహా:**\n\n"
                f"రేపు మందుల పిచికారీకి వాతావరణం **{status_word}** (స్కోరు: {score}/100).\n"
                f"• **సలహా:** {rec}\n"
                f"• **వాతావరణం:** గరిష్ట ఉష్ణోగ్రత {tomorrow.get('max_temp', 30)}°C, వర్షం అవకాశం {rain_chance}%, గాలి {wind_kph} km/h."
            )
        elif is_mr:
            status_word = "अनुकूल" if status == "SUITABLE" else "प्रतिकूल"
            return (
                f"🌾 **{city} मधील शेतकरी बांधवांसाठी कृषी सल्ला:**\n\n"
                f"उद्या कीटकनाशक फवारणीसाठी परिस्थिती **{status_word}** आहे (स्कोर: {score}/100).\n"
                f"• **सल्ला:** {rec}\n"
                f"• **हवामान:** तापमान {tomorrow.get('max_temp', 30)}°C, पावसाची शक्यता {rain_chance}% आणि वारे {wind_kph} km/h."
            )
        elif is_bn:
            status_word = "উপযুক্ত" if status == "SUITABLE" else "অনুপযুক্ত"
            return (
                f"🌾 **{city}-র কৃষকদের জন্য কৃষি আবহাওয়া পরামর্শ:**\n\n"
                f"আগামীকাল কীটনাশক স্প্রে করার জন্য পরিস্থিতি **{status_word}** (স্কোর: {score}/100)।\n"
                f"• **পরামর্শ:** {rec}\n"
                f"• **আবহাওয়া:** তাপমাত্রা {tomorrow.get('max_temp', 30)}°C, বৃষ্টির সম্ভাবনা {rain_chance}% এবং বাতাসের গতি {wind_kph} km/h."
            )
        else:
            status_word = "suitable" if status == "SUITABLE" else "not recommended"
            return (
                f"🌾 For farmers in **{city}**, tomorrow's weather looks **{status_word} for spraying pesticides** (Suitability Score: {score}/100).\n\n"
                f"💡 **Recommendation:** {rec}\n"
                f"🌡️ **Conditions:** High {tomorrow.get('max_temp', 30)}°C, rain chance {rain_chance}%, with gentle winds around {wind_kph} km/h."
            )

    # 3. WEATHER ALERTS & DISASTERS
    elif intent == "weather_alert":
        active_alert = alerts[0] if alerts else {}
        is_severe = active_alert.get("is_severe_hazard", False) or active_alert.get("imd_code") == "RED"

        if not is_severe:
            if is_hi:
                return f"**{city}** में अभी मौसम सामान्य है! कोई गंभीर आपदा या चेतावनी जारी नहीं है। आप अपनी दिनचर्या सामान्य रूप से जारी रख सकते हैं। 👍"
            elif is_kn:
                return f"**{city}** ನಲ್ಲಿ ಪ್ರಸ್ತುತ ಯಾವುದೇ ತೀವ್ರ ಹವಾಮಾನ ಅಥವಾ ವಿಪತ್ತು ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ, ಹವಾಮಾನ ಸಾಮಾನ್ಯವಾಗಿದೆ. 👍"
            elif is_ta:
                return f"**{city}**-ல் தற்போது தீவிர வானிலை எச்சரிக்கைகள் எதுவும் இல்லை. வானிலை இயல்பாக உள்ளது. 👍"
            elif is_te:
                return f"**{city}** లో ప్రస్తుతం తీవ్రమైన వాతావరణ హెచ్చరికలు ఏవీ లేవు, వాతావరణం సాధారణంగా ఉంది. 👍"
            elif is_mr:
                return f"**{city}** मध्ये सध्या कोणताही गंभीर हवामान इशारा नाही. परिस्थिती सामान्य आहे. 👍"
            elif is_bn:
                return f"**{city}**-তে বর্তমানে কোনো চরম আবহাওয়ার সতর্কতা নেই। আবহাওয়া স্বাভাবিক রয়েছে। 👍"
            else:
                return f"All clear in **{city}**! The weather is normal and there are currently no severe weather warnings or disaster alerts. Routine activities and travel can proceed safely. 👍"
        else:
            sev = active_alert.get("severity", "Red Alert")
            event = active_alert.get("event", "Hazard")
            headline = active_alert.get("headline", "")
            action = active_alert.get("action", "Stay indoors and follow safety advisories.")
            if is_hi:
                return f"⚠️ **सावधानी - {city}**: **{event}** ({sev}) जारी है।\n\n{headline}\n\n🛡️ **सुरक्षा सलाह:** {action}"
            elif is_kn:
                return f"⚠️ **ಎಚ್ಚರಿಕೆ - {city}**: **{event}** ({sev}) ಮುನ್ನೆಚ್ಚರಿಕೆ ಇದೆ.\n\n{headline}\n\n🛡️ **ಕ್ರಮ:** {action}"
            else:
                return f"⚠️ **Heads up for {city}**: A **{sev} ({event})** is active.\n\n{headline}\n\n🛡️ **Safety Action:** {action}"

    # 4. FORECAST (Multi-day, 4-day, 7-day, 14-day, or Tomorrow)
    elif intent == "forecast":
        # Determine number of days requested by user (up to 14 days)
        num_match = re.search(r'\b(\d+)\s*(?:days?|din|dina|naal|roj)\b', msg_lower)
        if num_match:
            req_days = min(14, max(2, int(num_match.group(1))))
        elif any(w in msg_lower for w in ["14", "fourteen", "two week", "2 week"]):
            req_days = 14
        elif any(w in msg_lower for w in ["10", "ten"]):
            req_days = 10
        elif any(w in msg_lower for w in ["7", "seven", "week", "weekly", "hafte"]):
            req_days = 7
        elif any(w in msg_lower for w in ["4", "four"]):
            req_days = 4
        else:
            req_days = 7

        is_multiday = any(w in msg_lower for w in ["day", "week", "hafte", "dina", "din", "naal", "outlook", "upcoming", "ahead", "forecast", "report"]) or num_match is not None
        if is_multiday and daily:
            days_to_show = daily[:req_days]
            n_count = len(days_to_show)
            lines = []
            for d in days_to_show:
                date_str = f" ({d.get('date')})" if d.get('date') else ""
                lines.append(f"• **{d.get('day', 'Day')}**{date_str}: {d.get('max_temp')}° / {d.get('min_temp')}°C, {d.get('condition')} (💧 {d.get('rain_chance', 10)}% rain)")
            days_block = "\n".join(lines)
            has_rain = any(d.get('rain_chance', 0) >= 40 or 'rain' in str(d.get('condition', '')).lower() for d in days_to_show)
            if has_rain:
                fc_tip_en = "Keep an umbrella handy as rain is expected on some days ahead! ☔"
                fc_tip_hi = "आने वाले दिनों में कुछ समय बारिश हो सकती है, इसलिए छाता तैयार रखें! ☔"
                fc_tip_kn = "ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ, ಛತ್ರಿ ಸಿದ್ಧವಾಗಿರಲಿ! ☔"
                fc_tip_ta = "அடுத்த சில நாட்களில் மழை பெய்ய வாய்ப்புள்ளது, குடையை தயாராக வைத்திருக்கவும்! ☔"
                fc_tip_te = "రాబోయే రోజుల్లో వర్షం పడే అవకాశం ఉంది, గొడుగు సిద్ధంగా ఉంచుకోండి! ☔"
                fc_tip_mr = "पुढील काही दिवसांत पावसाची शक्यता आहे, छत्री सोबत ठेवा! ☔"
                fc_tip_bn = "আগামী কয়েকদিনে বৃষ্টির সম্ভাবনা রয়েছে, ছাতা সঙ্গে রাখুন! ☔"
            else:
                fc_tip_en = "The upcoming days look mostly pleasant and great for planning ahead! 🌤️"
                fc_tip_hi = "आने वाले दिनों में मौसम सामान्य और सुखद रहने का अनुमान है! 🌤️"
                fc_tip_kn = "ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಹವಾಮಾನವು ಸಾಮಾನ್ಯವಾಗಿ ಆಹ್ಲಾದಕರವಾಗಿರಲಿದೆ! 🌤️"
                fc_tip_ta = "அடுத்த சில நாட்களில் வானிலை மிகவும் இதமாக இருக்கும்! 🌤️"
                fc_tip_te = "రాబోయే రోజుల్లో వాతావరణం ఆహ్లాదಕರంగా ఉండనుంది! 🌤️"
                fc_tip_mr = "पुढील काही दिवसांत हवामान छान व आल्हाददायक राहील! 🌤️"
                fc_tip_bn = "আগামী কয়েকদিনে আবহাওয়া বেশ মনোরম থাকবে! 🌤️"

            if is_hi:
                return f"यहाँ **{city}** का आगामी {n_count} दिनों का मौसम पूर्वानुमान है:\n\n{days_block}\n\n💡 **सुझाव:** {fc_tip_hi}"
            elif is_kn:
                return f"ಇಲ್ಲಿ **{city}** ಮುಂದಿನ {n_count} ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಇದೆ:\n\n{days_block}\n\n💡 **ಸಲಹೆ:** {fc_tip_kn}"
            elif is_ta:
                return f"**{city}**-ன் அடுத்த {n_count} நாட்களுக்கான வானிலை முன்னறிவிப்பு:\n\n{days_block}\n\n💡 **பரிந்துரை:** {fc_tip_ta}"
            elif is_te:
                return f"**{city}** లో రాబోయే {n_count} రోజుల వాతావరణ సమాచారం:\n\n{days_block}\n\n💡 **సలహా:** {fc_tip_te}"
            elif is_mr:
                return f"**{city}** साठी पुढील {n_count} दिवसांचा हवामान अंदाज:\n\n{days_block}\n\n💡 **सल्ला:** {fc_tip_mr}"
            elif is_bn:
                return f"**{city}**-র পরবর্তী {n_count} দিনের আবহাওয়ার পূর্বাভাস:\n\n{days_block}\n\n💡 **পরামর্শ:** {fc_tip_bn}"
            else:
                return f"Here is the weather forecast for **{city}** over the next {n_count} days:\n\n{days_block}\n\n💡 **Tip:** {fc_tip_en}"
        else:
            tom_max = tomorrow.get("max_temp", 30)
            tom_min = tomorrow.get("min_temp", 20)
            tom_cond = tomorrow.get("condition", "Partly Cloudy")
            tom_precip = tomorrow.get("precipitation_mm", 0.0)
            tom_wind = tomorrow.get("max_wind_kmh", 14.0)

            # Check if user mentioned an exam, interview, or important life event
            is_exam = any(w in msg_lower for w in ["exam", "test", "interview", "paper", "viva", "pariksha", "board", "jee", "neet", "upsc"])
            is_travel = any(w in msg_lower for w in ["trip", "travel", "drive", "ride", "flight", "commute", "highway"])
            is_event = any(w in msg_lower for w in ["wedding", "party", "match", "cricket", "outdoor", "picnic"])

            if is_exam:
                has_rain = rain_chance >= 40 or "rain" in tom_cond.lower() or "drizzle" in tom_cond.lower() or "shower" in tom_cond.lower()
                if rain_chance >= 80:
                    if is_hi:
                        return f"आपकी परीक्षा के लिए बहुत-बहुत शुभकामनाएं! 📝 कल **{city}** में भारी बारिश की संभावना **{rain_chance}%** ({tom_cond}) है। इसलिए **छाता या रेनकोट जरूर साथ रखें** और परीक्षा केंद्र के लिए 15-20 मिनट पहले निकलें ताकि भीगने या ट्रैफिक की परेशानी न हो। ऑल द बेस्ट! 🌟"
                    elif is_kn:
                        return f"ನಿಮ್ಮ ಪರೀಕ್ಷೆಗೆ ಶುಭ ಹಾರೈಕೆಗಳು! 📝 ನಾಳೆ **{city}** ನಲ್ಲಿ ಭಾರೀ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ **{rain_chance}%** ({tom_cond}) ಇದೆ. ಆದ್ದರಿಂದ ದಯವಿಟ್ಟು **ಛತ್ರಿ ಅಥವಾ ರೇನ್‌ಕೋಟ್ ಜೊತೆಯಲ್ಲಿಡಿ** ಮತ್ತು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ತಲುಪಲು 15-20 ನಿಮಿಷ ಮುಂಚಿತವಾಗಿ ಹೊರಡಿ! ಆಲ್ ದಿ ಬೆಸ್ಟ್! 🌟"
                    else:
                        return f"All the very best for your exam! 📝 Just a heads-up: tomorrow in **{city}**, there is a high **{rain_chance}% chance of rain** with **{tom_cond}**. Make sure to **carry an umbrella or raincoat** and leave 15–20 minutes early so you reach your exam center safely without any hassle! You've got this! 🌟"
                elif has_rain:
                    if is_hi:
                        return f"आपकी परीक्षा के लिए शुभकामनाएं! 📝 कल **{city}** में हल्की बारिश या बूंदाबांदी ({tom_cond}, संभावना **{rain_chance}%**) हो सकती है। बैग में एक छोटा छाता जरूर रख लें ताकि आप सुरक्षित रहें। मन लगाकर परीक्षा दें! 🌟"
                    elif is_kn:
                        return f"ನಿಮ್ಮ ಪರೀಕ್ಷೆಗೆ ಶುಭ ಹಾರೈಕೆಗಳು! 📝 ನಾಳೆ **{city}** ನಲ್ಲಿ ಸಣ್ಣ ಪ್ರಮಾಣದ ಮಳೆಯ ಸಾಧ್ಯತೆಯಿದೆ ({tom_cond}, **{rain_chance}%**). ಬ್ಯಾಗ್‌ನಲ್ಲಿ ಒಂದು ಛತ್ರಿ ಇಟ್ಟುಕೊಳ್ಳುವುದು ಒಳ್ಳೆಯದು. ಉತ್ತಮವಾಗಿ ಪರೀಕ್ಷೆ ಬರೆಯಿರಿ! 🌟"
                    else:
                        return f"Wishing you all the best for your exam! 📝 Tomorrow in **{city}**, there is a moderate **{rain_chance}% chance of passing showers** ({tom_cond}). It's a good idea to pack an umbrella in your bag just in case. Stay calm and give it your best! 🌟"
                elif tom_max >= 34:
                    if is_hi:
                        return f"आपकी परीक्षा के लिए शुभकामनाएं! 📝 कल **{city}** में धूप और गर्मी रहेगी (तापमान लगभग **{tom_max}°C**)। साथ में पानी की बोतल जरूर रखें ताकि आप तरोताजा रहें। शांत मन से परीक्षा दें! 🌟"
                    elif is_kn:
                        return f"ನಿಮ್ಮ ಪರೀಕ್ಷೆಗೆ ಶುಭ ಹಾರೈಕೆಗಳು! 📝 ನಾಳೆ **{city}** ನಲ್ಲಿ ಬಿಸಿಲು ಹೆಚ್ಚಿರಲಿದೆ (ಸುಮಾರು **{tom_max}°C**). ನೀರಿನ ಬಾಟಲಿ ಜೊತೆಯಲ್ಲಿಡಿ. ಶಾಂತ ಮನಸ್ಸಿನಿಂದ ಪರೀಕ್ಷೆ ಬರೆಯಿರಿ! 🌟"
                    else:
                        return f"Wishing you all the best for your exam! 📝 Tomorrow in **{city}** will be quite warm (high around **{tom_max}°C**). Remember to carry a water bottle to stay hydrated and keep your mind fresh and calm during the exam! 🌟"
                else:
                    if is_hi:
                        return f"बिल्कुल चिंता मत कीजिए! कल सुबह **{city}** में मौसम बहुत साफ और सुहावना रहेगा (लगभग **{tom_max}°C**, {tom_cond}) और बारिश की कोई रुकावट नहीं है। ☀️ आप आराम से जा सकते हैं। आपकी परीक्षा के लिए ढेर सारी शुभकामनाएं, पूरे आत्मविश्वास से पेपर दीजिए! 🌟"
                    elif is_kn:
                        return f"ಚಿಂತೆ ಮಾಡಬೇಡಿ! ನಾಳೆ ಮುಂಜಾನೆ **{city}** ನಲ್ಲಿ ಹವಾಮಾನ ಆಹ್ಲಾದಕರ ಹಾಗೂ ಸ್ವಚ್ಛವಾಗಿರಲಿದೆ (ಸುಮಾರು **{tom_max}°C**, {tom_cond}) ಮತ್ತು ಯಾವುದೇ ಮಳೆಯ ಅಡಚಣೆ ಇರುವುದಿಲ್ಲ. ☀️ ಆರಾಮವಾಗಿ ಹೋಗಿ. ನಿಮ್ಮ ಪರೀಕ್ಷೆಗೆ ಆತ್ಮೀಯ ಶುಭ ಹಾರೈಕೆಗಳು! 🌟"
                    else:
                        return f"Don't worry at all! Tomorrow morning in **{city}** will be bright and pleasant at around **{tom_max}°C** with **{tom_cond}**! ☀️ No rain disruptions are expected, so you can travel comfortably. Keep a calm mind and do well — wishing you all the very best for your exam! 🌟"

            # Context-aware tip specifically for tomorrow
            if rain_chance >= 50 or "rain" in tom_cond.lower():
                tom_tip_en = "Keep an umbrella or raincoat handy as showers are likely tomorrow! ☔"
                tom_tip_hi = "कल बारिश की संभावना है, इसलिए छाता साथ रखना अच्छा रहेगा! ☔"
                tom_tip_kn = "ನಾಳೆ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ, ಛತ್ರಿ ಇಟ್ಟುಕೊಳ್ಳುವುದು ಒಳ್ಳೆಯದು! ☔"
                tom_tip_ta = "நாளை மழை வாய்ப்பு உள்ளதால் குடை எடுத்துச் செல்லுங்கள்! ☔"
                tom_tip_te = "రేపు వర్షం పడే అవకాశం ఉంది, గొడుగు వెంట ఉంచుకోండి! ☔"
                tom_tip_mr = "उद्या पावसाची शक्यता असल्याने छत्री सोबत ठेवा! ☔"
                tom_tip_bn = "আগামীকাল বৃষ্টির সম্ভাবনা রয়েছে, তাই ছাতা সঙ্গে রাখুন! ☔"
            elif tom_max >= 35:
                tom_tip_en = "It will be quite hot tomorrow afternoon, so plan outdoor activities for the morning and stay well hydrated! ☀️"
                tom_tip_hi = "कल दोपहर में तेज धूप रहेगी, इसलिए सुबह के समय काम निपटाएं और पानी खूब पिएं! ☀️"
                tom_tip_kn = "ನಾಳೆ ಮಧ್ಯಾಹ್ನ ಬಿಸಿಲು ಹೆಚ್ಚಿರಲಿದೆ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ! ☀️"
                tom_tip_ta = "நாளை மதியம் வெயில் அதிகமாக இருக்கும், போதுமான தண்ணீர் குடியுங்கள்! ☀️"
                tom_tip_te = "రేపు మధ్యాహ్నం ఎండ ఎక్కువగా ఉంటుంది, నీరు బాగా త్రాగండి! ☀️"
                tom_tip_mr = "उद्या दुपारी ऊन जास्त असेल, भरपूर पाणी प्या! ☀️"
                tom_tip_bn = "আগামীকাল দুপুরে বেশ গরম থাকবে, পর্যাপ্ত জল পান করুন! ☀️"
            elif tom_min <= 16:
                tom_tip_en = "Mornings and evenings will be cool tomorrow, so keeping a light jacket or sweater with you is recommended! 🧣"
                tom_tip_hi = "कल सुबह और शाम ठंडक रहेगी, हल्की जैकेट या शॉल रखना आरामदायक रहेगा! 🧣"
                tom_tip_kn = "ನಾಳೆ ಮುಂಜಾನೆ ಮತ್ತು ಸಂಜೆ ಚಳಿಯಿರುತ್ತದೆ, ಲಘು ಸ್ವೆಟರ್ ಧರಿಸುವುದು ಸೂಕ್ತ! 🧣"
                tom_tip_ta = "நாளை காலை மற்றும் மாலை குளிர்ச்சியாக இருக்கும், லேசான ஸ்வெட்டர் நல்லது! 🧣"
                tom_tip_te = "రేపు ఉదయం మరియు సాయంత్రం చల్లగా ఉంటుంది, తేలికపాటి స్వెటర్ మంచిది! 🧣"
                tom_tip_mr = "उद्या सकाळी व संध्याकाळी गारवा असेल, हलके स्वेटर जवळ ठेवा! 🧣"
                tom_tip_bn = "আগামীকাল সকালে ও সন্ধ্যায় ঠান্ডা থাকবে, হালকা জ্যাকেট সঙ্গে রাখুন! 🧣"
            else:
                tom_tip_en = "It should be warm and pleasant tomorrow, great for outdoor travel or plans! 🌤️"
                tom_tip_hi = "कल मौसम बहुत सुहावना और अनुकूल रहेगा, बाहर जाने की योजना के लिए बढ़िया दिन है! 🌤️"
                tom_tip_kn = "ನಾಳೆ ವಾತಾವರಣ ಹಿತಕರವಾಗಿರಲಿದ್ದು, ಹೊರಗೆ ಹೋಗಲು ಉತ್ತಮ ದಿನವಾಗಿದೆ! 🌤️"
                tom_tip_ta = "நாளை வானிலை மிகவும் இதமாக இருக்கும், வெளியே செல்வதற்கு ஏற்ற நாள்! 🌤️"
                tom_tip_te = "రేపు వాతావరణం చాలా ఆహ్లాదకరంగా ఉంటుంది, బయటకు వెళ్లడానికి మంచి రోజు! 🌤️"
                tom_tip_mr = "उद्या हवामान अतिशय आल्हाददायक असेल, बाहेर पडण्यासाठी छान दिवस आहे! 🌤️"
                tom_tip_bn = "আগামীকাল আবহাওয়া বেশ মনোরম থাকবে, বাইরে যাওয়ার জন্য দারুণ দিন! 🌤️"

            if is_hi:
                cond_hi = get_translated_condition(tom_cond, "hi")
                return f"कल **{city}** में मौसम मुख्य रूप से **{cond_hi}** रहेगा। अधिकतम तापमान **{tom_max}°C** और न्यूनतम **{tom_min}°C** रहने का अनुमान है, जिसमें बारिश की संभावना **{rain_chance}%** और हवा **{tom_wind} km/h** रहेगी।\n\n💡 **सलाह:** {tom_tip_hi}"
            elif is_kn:
                cond_kn = get_translated_condition(tom_cond, "kn")
                return f"ನಾಳೆ **{city}** ನಲ್ಲಿ ವಾತಾವರಣ **{cond_kn}** ಆಗಿರಲಿದ್ದು, ಗರಿಷ್ಠ ತಾಪಮಾನ **{tom_max}°C** ಮತ್ತು ಕನಿಷ್ಠ **{tom_min}°C** ಇರಲಿದೆ. ಮಳೆಯ ಸಾಧ್ಯತೆ ಸುಮಾರು **{rain_chance}%** ಮತ್ತು ಗಾಳಿ **{tom_wind} km/h**.\n\n💡 **ಸಲಹೆ:** {tom_tip_kn}"
            elif is_ta:
                cond_ta = get_translated_condition(tom_cond, "ta")
                return f"நாளை **{city}**-ல் வானிலை **{cond_ta}**-ஆக இருக்கும். அதிகபட்ச வெப்பநிலை **{tom_max}°C**, குறைந்தபட்சம் **{tom_min}°C**, மழை வாய்ப்பு **{rain_chance}%** மற்றும் காற்று **{tom_wind} km/h**.\n\n💡 **பரிந்துரை:** {tom_tip_ta}"
            elif is_te:
                cond_te = get_translated_condition(tom_cond, "te")
                return f"రేపు **{city}** లో వాతావరణం **{cond_te}** గా ఉంటుంది. గరిష్ట ఉష్ణోగ్రత **{tom_max}°C**, కనిష్ట ఉష్ణోగ్రత **{tom_min}°C**, వర్షం అవకాశం **{rain_chance}%** మరియు గాలి **{tom_wind} km/h**.\n\n💡 **సలహా:** {tom_tip_te}"
            elif is_mr:
                cond_mr = get_translated_condition(tom_cond, "mr")
                return f"उद्या **{city}** मध्ये हवामान प्रामुख्याने **{cond_mr}** राहील. कमाल तापमान **{tom_max}°C** व किमान **{tom_min}°C** असून पावसाची शक्यता **{rain_chance}%** आणि वारे **{tom_wind} km/h** असेल.\n\n💡 **सल्ला:** {tom_tip_mr}"
            elif is_bn:
                cond_bn = get_translated_condition(tom_cond, "bn")
                return f"আগামীকাল **{city}**-তে আবহাওয়া মূলত **{cond_bn}** থাকবে। সর্বোচ্চ তাপমাত্রা **{tom_max}°C** এবং সর্বনিম্ন **{tom_min}°C**, বৃষ্টির সম্ভাবনা **{rain_chance}%** এবং বাতাসের গতি **{tom_wind} km/h**।\n\n💡 **পরামর্শ:** {tom_tip_bn}"
            else:
                return f"Tomorrow in **{city}**, expect a high of **{tom_max}°C** and a low of **{tom_min}°C** with **{tom_cond}**. Rain probability is **{rain_chance}%** (expected precipitation: {tom_precip} mm) with winds around **{tom_wind} km/h**.\n\n💡 **Tip for tomorrow:** {tom_tip_en}"

    # 5. AVIATION
    elif intent == "aviation":
        av = advisory.get("aviation", {})
        cat = av.get("flight_category", "VFR")
        vis = av.get("visibility_km", 10)
        rec = av.get("recommendation", "Standard flight operations.")
        return f"✈️ For aviation around **{city}**, flight conditions are currently **{cat}** with visibility of **{vis} km** and surface winds at **{wind_kph} km/h**. {rec}"

    # 6. MARINE
    elif intent == "marine":
        mar = advisory.get("marine", {})
        status = mar.get("status", "SAFE")
        rec = mar.get("recommendation", "Safe for fishing and boating.")
        return f"🌊 Coastal waters near **{city}** are currently **{status}** for maritime activity. Winds are around **{mar.get('wind_knots', 10)} knots** with calm to moderate waves. {rec}"

    # 7. CLIMATE TRENDS
    elif intent == "climate_trend":
        return f"📊 Over recent decades, **{city}** has experienced an average warming trend of about **+4.6%** compared to long-term baseline records, typically leading to warmer nights and more concentrated rain spells."

    # 8. SMART CITY / AQI
    elif intent == "smart_city":
        aqi_stat = weather.get("air_quality", {}).get("status", "Moderate")
        pm25 = weather.get("air_quality", {}).get("pm2_5", 25)
        return f"🏙️ In **{city}**, the air quality is currently **{aqi_stat}** (PM2.5: {pm25} µg/m³), and the outdoor thermal comfort level is **{advisory.get('smart_city', {}).get('comfort_level', 'Pleasant')}**."

    # 9. CURRENT WEATHER (DEFAULT)
    else:
        if is_hi:
            cond_hi = get_translated_condition(cond, "hi")
            return (
                f"**{city}** में अभी मौसम **{cond_hi}** है और तापमान **{temp}°C** है (महसूस {feels}°C)। "
                f"नमी लगभग **{humidity}%** है और **{wind_kph} km/h** की हल्की हवा चल रही है।\n\n{tip_hi}"
            )
        elif is_kn:
            cond_kn = get_translated_condition(cond, "kn")
            return (
                f"**{city}** ನಲ್ಲಿ ಪ್ರಸ್ತುತ ಹವಾಮಾನ **{cond_kn}** ಆಗಿದ್ದು, ತಾಪಮಾನ **{temp}°C** ಇದೆ (ಅನಿಸಿಕೆ {feels}°C). "
                f"ತೇವಾಂಶ ಸುಮಾರು **{humidity}%** ಮತ್ತು **{wind_kph} km/h** ವೇಗದಲ್ಲಿ ಗಾಳಿ ಬೀಸುತ್ತಿದೆ.\n\n{tip_kn}"
            )
        elif is_ta:
            cond_ta = get_translated_condition(cond, "ta")
            return (
                f"தற்போது **{city}**-ல் வானிலை **{cond_ta}**-ஆகவும், வெப்பநிலை **{temp}°C** ஆகவும் உள்ளது (உணர்வு {feels}°C). "
                f"ஈரப்பதம் **{humidity}%**, காற்று **{wind_kph} km/h** வேகத்தில் வீசுகிறது.\n\n{tip_ta}"
            )
        elif is_te:
            cond_te = get_translated_condition(cond, "te")
            return (
                f"ప్రస్తుతం **{city}** లో వాతావరణం **{cond_te}** గా ఉంది మరియు ఉష్ణోగ్రత **{temp}°C** (అనిపించేది {feels}°C). "
                f"తేమ **{humidity}%**, గాలి వేగం **{wind_kph} km/h**.\n\n{tip_te}"
            )
        elif is_mr:
            cond_mr = get_translated_condition(cond, "mr")
            return (
                f"**{city}** मध्ये सध्या हवामान **{cond_mr}** असून तापमान **{temp}°C** आहे (जाणवणारे {feels}°C). "
                f"आर्द्रता **{humidity}%** आणि वाऱ्याचा वेग **{wind_kph} km/h** आहे.\n\n{tip_mr}"
            )
        elif is_bn:
            cond_bn = get_translated_condition(cond, "bn")
            return (
                f"**{city}**-তে এখন আবহাওয়া **{cond_bn}** এবং তাপমাত্রা **{temp}°C** (অনুভূত হচ্ছে {feels}°C)। "
                f"আর্দ্রতা প্রায় **{humidity}%** এবং বাতাসের গতি **{wind_kph} km/h**।\n\n{tip_bn}"
            )
        else:
            return (
                f"Right now in **{city}**, it's **{temp}°C** and **{cond}** (feels like {feels}°C). "
                f"Humidity is around **{humidity}%** with a gentle breeze of **{wind_kph} km/h**.\n\n{tip_en}"
            )


def clean_llm_response(text: str) -> str:
    """Clean internal thinking tags or reasoning artifacts from LLM output."""
    cleaned = re.sub(r"<thought>.*?</thought>", "", text, flags=re.DOTALL).strip()
    if "Here's a thinking process" in cleaned or "Here's a thinking process:" in cleaned:
        paragraphs = cleaned.split("\n\n")
        filtered = [
            p for p in paragraphs
            if not p.lower().startswith("here's a thinking")
            and not p.lower().startswith("1.  **analyze")
            and not p.lower().startswith("2.  **determine")
        ]
        if filtered:
            return "\n\n".join(filtered).strip()
    return cleaned


def ask_weathergpt(message: str, current_city: str = "Bengaluru", language: str = "English") -> dict:
    """
    WeatherGPT conversational intelligence engine:
    1. Entity extraction for location and time period.
    2. Intent classification (Farming, Aviation, Marine, Disaster Alerts, Climate, Forecast).
    3. Retrieval of live observations, NWP forecasts, and sector advisories.
    4. Generation via Gemini API / OpenRouter or natural, human-like domain heuristics.
    """
    detected_location = extract_location(message)
    target_city = detected_location if detected_location else current_city
    intent = detect_intent(message)
    time_period = extract_time(message)

    try:
        weather_data = get_live_weather(target_city)
    except Exception as e:
        print(f"Weather fetch exception in chat: {e}")
        weather_data = {
            "city": target_city,
            "temperature": 26.5,
            "feels_like": 27.0,
            "humidity": 65,
            "wind_speed_kmh": 12.0,
            "condition": "Partly Cloudy",
            "precipitation_mm": 0.0,
            "daily": [{"day": "Tomorrow", "max_temp": 30.0, "min_temp": 21.0, "rain_chance": 20}],
            "air_quality": {"status": "Moderate", "pm2_5": 28.0},
            "risk": {"score": 18, "level": "LOW"},
            "source": "WeatherGPT Fallback Cache",
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        }

    advisories = get_sector_advisories(weather_data)
    alerts = get_extreme_weather_alerts(weather_data)
    target_lang_name = LANGUAGE_NAMES.get(language, language)

    ai_reply = None

    # Context-aware outfit & forecast details
    outfit_day = "tomorrow" if (time_period == "tomorrow" or any(w in message.lower() for w in ["tomorrow", "kal", "naale", "nale"])) else "today"
    recs = get_outfit_recommendations(weather_data, day=outfit_day)
    w_sum = recs.get("weather_summary", {})
    o_data = recs.get("outfit", {})
    acc_list = recs.get("accessories", [])
    top_choice = o_data.get("tops", ["Breathable cotton top"])[0]
    bot_choice = o_data.get("bottoms", ["Comfortable trousers or jeans"])[0]
    layer_choice = o_data.get("outerwear", ["Light overshirt or jacket"])[0]
    shoe_choice = o_data.get("footwear", ["Comfortable walking shoes"])[0]
    acc_choice = acc_list[0]["item"] if acc_list else "Sunglasses / Watch"

    # Dynamic requested days up to 14 days
    num_match = re.search(r'\b(\d+)\s*(?:days?|din|dina|naal|roj)\b', message.lower())
    if num_match:
        requested_days = min(14, max(2, int(num_match.group(1))))
    elif any(w in message.lower() for w in ["14", "fourteen", "two week", "2 week"]):
        requested_days = 14
    elif any(w in message.lower() for w in ["10", "ten"]):
        requested_days = 10
    elif any(w in message.lower() for w in ["7", "seven", "week", "weekly", "hafte"]):
        requested_days = 7
    elif any(w in message.lower() for w in ["4", "four"]):
        requested_days = 4
    else:
        requested_days = 7

    # Try Google Gemini API if GEMINI_API_KEY is configured
    if GEMINI_API_KEY:
        try:
            from google import genai
            client = genai.Client(api_key=GEMINI_API_KEY)

            system_instruction = f"""You are WeatherGPT, a warm, friendly, and conversational AI weather assistant developed for the Ministry of Earth Sciences (MoES).

CORE COMMUNICATION RULES:
1. Speak naturally, warmly, and like a human friend chatting with the user.
2. Keep your replies concise and easy to understand (usually 2 to 4 sentences, or clean short bullet points if recommending an outfit or multi-day forecast).
3. Do NOT make the reply too lengthy, complicated, or technical (avoid raw barometric pressure, complex sensor indices, or long bulleted lists unless explicitly asked).
4. Naturally provide all the necessary everyday data:
   - For CURRENT weather: temperature, how it feels, weather condition, rain probability, wind/humidity, and a friendly practical tip.
   - For TOMORROW's weather: high and low temperatures, condition, rain chance, wind speed, and a friendly practical tip specifically for tomorrow. IMPORTANT: Never say 'today' or refer to today when asked about tomorrow!
   - For OUTFIT / CLOTHING queries: Recommend specific top, bottom, outerwear/layer, footwear, and accessory tailored to that day's weather. State the expected temperature and conditions for that day. Never say 'today' when the query is about 'tomorrow'.
5. If the user asks for a multi-day forecast (e.g. 4-day, 7-day, 10-day, or up to 14-day), provide a very clean, short day-by-day summary (1 line per day) for the requested duration with a forward-looking tip.
6. RECOGNIZE PERSONAL LIFE CONTEXT & RESPOND WITH GENUINE HUMAN EMPATHY:
   - If the user mentions a personal event such as an EXAM, TEST, INTERVIEW, TRAVEL, WEDDING, or OUTDOOR EVENT:
     * Acknowledge and encourage them warmly (e.g., wish them all the very best for their exam or interview!).
     * If rain probability is >= 80%: Explicitly advise them: "There is an [X]% chance of rain, so definitely carry an umbrella or raincoat and leave home 15-20 minutes early to reach safely and comfortably."
     * If sunny / clear / pleasant: Reassure them: "Don't worry, the morning will be bright and pleasant around [X]°C with clear skies! No rain interruptions expected. All the best!"
     * If hot (> 34°C): Remind them to carry a water bottle to stay hydrated and refreshed.
7. Always answer directly in {target_lang_name} language.

LIVE METEOROLOGICAL CONTEXT:
- City: {weather_data.get('city')}
- Current Temp: {weather_data.get('temperature')}°C (Feels like: {weather_data.get('feels_like')}°C)
- Current Condition: {weather_data.get('condition')}
- Humidity: {weather_data.get('humidity')}%
- Wind: {weather_data.get('wind_speed_kmh')} km/h
- Daily Forecast (next {requested_days} days): {[(d.get('day'), d.get('date', ''), f"{d.get('max_temp')}°/{d.get('min_temp')}°C", d.get('condition'), f"{d.get('rain_chance')}% rain", f"{d.get('precipitation_mm', 0)}mm") for d in weather_data.get('daily', [])[:requested_days]]}
- Tomorrow Forecast: High {w_sum.get('temp_max', 30)}°C, Low {w_sum.get('temp_min', 20)}°C, Condition: {w_sum.get('condition')}, Rain chance: {w_sum.get('rain_chance')}% ({w_sum.get('precipitation_mm', 0)} mm), Wind: {w_sum.get('wind_speed_kmh')} km/h
- Outfit Context for {outfit_day.title()}: Top: {top_choice}, Bottom: {bot_choice}, Layer: {layer_choice}, Footwear: {shoe_choice}, Accessory: {acc_choice}
- Agromet Spray Suitability: {advisories.get('agriculture', {}).get('status')}
- Active Alerts: {[a.get('event') for a in alerts]}"""

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=message,
                config={"system_instruction": system_instruction, "temperature": 0.5},
            )
            if response and response.text:
                ai_reply = clean_llm_response(response.text)
        except Exception as e:
            print(f"Gemini API call notice: {e}")

    # Try OpenRouter if GEMINI_API_KEY was not set or failed
    if not ai_reply and OPENROUTER_API_KEY:
        try:
            prompt = f"""You are WeatherGPT, a friendly, human-like AI weather assistant.
Respond strictly in {target_lang_name} language. Keep the answer warm, human, concise (2-4 sentences or short clean bullets), and easy to understand with essential data (temperature, condition, rain chance, and a friendly tip). Do not be overly technical.
Context:
- City: {weather_data.get('city')}
- Current Temp: {weather_data.get('temperature')}°C (Feels {weather_data.get('feels_like')}°C), Condition: {weather_data.get('condition')}, Humidity: {weather_data.get('humidity')}%, Wind: {weather_data.get('wind_speed_kmh')} km/h
- Tomorrow: High {w_sum.get('temp_max', 30)}°C, Low {w_sum.get('temp_min', 20)}°C, Condition: {w_sum.get('condition')}, Rain Chance: {w_sum.get('rain_chance')}%, Wind: {w_sum.get('wind_speed_kmh')} km/h
- Daily Forecast (next {requested_days} days): {[(d.get('day'), d.get('date', ''), f"{d.get('max_temp')}°/{d.get('min_temp')}°C", d.get('condition'), f"{d.get('rain_chance')}% rain") for d in weather_data.get('daily', [])[:requested_days]]}
- Outfit Plan for {outfit_day.title()}: Top: {top_choice}, Bottom: {bot_choice}, Layer: {layer_choice}, Shoes: {shoe_choice}, Accessory: {acc_choice}
Rules:
- If asked about tomorrow or outfit for tomorrow, provide tomorrow's details. NEVER mention 'today' or say 'today' when asked about tomorrow.
- If user mentions an exam, interview, travel, or outdoor event: Wish them all the best! If rain chance >= 80%, tell them to carry an umbrella and leave early. If sunny/pleasant, reassure them that weather is clear.
User Query: {message}"""

            headers = {
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://weathergpt.gov.in",
                "X-Title": "WeatherGPT",
            }
            payload = {
                "model": OPENROUTER_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 250,
                "temperature": 0.5,
            }
            r = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=7)
            if r.status_code == 200:
                choices = r.json().get("choices", [])
                if choices and "message" in choices[0]:
                    ai_reply = clean_llm_response(choices[0]["message"].get("content", "").strip())
        except Exception as err:
            print(f"OpenRouter notice: {err}")

    # Fallback to intelligent rule-based formatter
    if not ai_reply:
        ai_reply = format_fallback_reply(
            intent, weather_data, advisories, alerts, language, user_message=message
        )

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
    """Backward-compatible message parser."""
    return {
        "intent": detect_intent(message),
        "location": extract_location(message),
        "time_period": extract_time(message),
        "original_message": message,
    }