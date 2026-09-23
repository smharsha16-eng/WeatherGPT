"""
Comprehensive Automated Test Suite for WeatherGPT Platform (SIH26068)
Tests AI query parsing, meteorological service, NWP models (GFS/ECMWF),
disaster early warnings, multi-sector advisories, multilingual chat, and climate trends.
"""
from chatbot import detect_intent, extract_location, ask_weathergpt
from weather_service import (
    get_live_weather,
    get_nwp_forecast,
    compare_nwp_models,
    get_extreme_weather_alerts,
    get_sector_advisories,
    get_aviation_briefing,
    get_climate_trends,
)


def test_intent_detection():
    assert detect_intent("Can I spray pesticides in Nashik tomorrow?") == "farming_advisory"
    assert detect_intent("Is it safe for harvesting wheat?") == "farming_advisory"
    assert detect_intent("What is the aviation METAR briefing for VOBL?") == "aviation"
    assert detect_intent("Are there any cyclone or flood warnings?") == "weather_alert"
    assert detect_intent("Will it rain next week in Mumbai?") == "forecast"
    assert detect_intent("What is the current temperature in Delhi?") == "current_weather"
    assert detect_intent("What is the climate trend and anomaly over past decade?") == "climate_trend"
    print("[PASS] Intent detection tests passed.")


def test_location_extraction():
    assert extract_location("What is the weather in Bengaluru tomorrow?") == "Bengaluru"
    assert extract_location("Can I spray in Nashik today?") == "Nashik"
    assert extract_location("Rain forecast for Mumbai?") == "Mumbai"
    assert extract_location("Tell me about Kolkata weather") == "Kolkata"
    print("[PASS] Location extraction tests passed.")


def test_live_weather_service():
    data = get_live_weather("Bengaluru")
    assert "temperature" in data
    assert "humidity" in data
    assert "wind_speed_kmh" in data
    assert "air_quality" in data
    assert "daily" in data
    assert len(data["daily"]) > 0
    print(f"[PASS] Live weather service passed: {data['city']} {data['temperature']}°C, Condition: {data['condition']}")


def test_nwp_models_and_comparison():
    # Test NOAA GFS
    gfs = get_nwp_forecast(12.97, 77.59, model="gfs")
    assert gfs["model_id"] == "gfs"
    assert len(gfs["days"]) > 0

    # Test ECMWF IFS
    ecmwf = get_nwp_forecast(12.97, 77.59, model="ecmwf")
    assert ecmwf["model_id"] == "ecmwf"
    assert len(ecmwf["days"]) > 0

    # Test Comparison & Ensemble Spread
    cmp = compare_nwp_models(12.97, 77.59)
    assert "overall_confidence" in cmp
    assert "daily_comparison" in cmp
    assert len(cmp["daily_comparison"]) > 0
    print(f"[PASS] NWP GFS & ECMWF comparison passed: Confidence {cmp['overall_confidence']}, Avg Spread {cmp['average_temperature_spread_c']}°C")


def test_extreme_alerts_imd():
    sample_weather = {
        "city": "Mumbai",
        "temperature": 42.5,
        "humidity": 78,
        "wind_speed_kmh": 65.0,
        "precipitation_mm": 70.0,
        "condition": "Heavy Rain and Severe Thunderstorm",
        "daily": [{"max_temp": 42.5, "rain_chance": 90, "precipitation_mm": 70.0}],
    }
    alerts = get_extreme_weather_alerts(sample_weather)
    assert len(alerts) >= 2
    events = [a["event"] for a in alerts]
    assert any("Rainfall" in e or "Flood" in e for e in events)
    assert any("Wind" in e or "Cyclone" in e for e in events)
    print(f"[PASS] Extreme weather alert tests passed: detected {len(alerts)} alerts with IMD protocol.")


def test_sector_advisories():
    sample_weather = {
        "city": "Nashik",
        "temperature": 28.0,
        "humidity": 65,
        "wind_speed_kmh": 12.0,
        "precipitation_mm": 0.0,
        "visibility_km": 10.0,
        "daily": [
            {"rain_chance": 10},
            {"rain_chance": 15, "max_temp": 30.0},
        ],
    }
    adv = get_sector_advisories(sample_weather)
    assert adv["agriculture"]["status"] in ["SUITABLE", "UNSUITABLE"]
    assert adv["agriculture"]["suitability_score"] > 0
    assert adv["aviation"]["flight_category"] in ["VFR", "MVFR", "IFR", "LIFR"]
    assert adv["marine"]["status"] in ["SAFE", "CAUTION", "HAZARDOUS"]
    assert "heat_index_c" in adv["smart_city"]
    print(f"[PASS] Sector decision support tests passed: Agriculture status = {adv['agriculture']['status']} (Score {adv['agriculture']['suitability_score']})")


def test_aviation_and_climate():
    av = get_aviation_briefing("VOBL")
    assert av["airport"] == "VOBL"
    assert "raw_metar" in av
    assert "flight_category" in av

    cl = get_climate_trends("Bengaluru")
    assert "warming_trend_percentage" in cl
    assert len(cl["historical_series"]) > 0
    print(f"[PASS] Aviation METAR ({av['airport']}: {av['flight_category']}) and Climate trends ({cl['warming_trend_percentage']}) passed.")


def test_multilingual_ai_conversational_chat():
    # English
    en_res = ask_weathergpt("Can I spray pesticides in Nashik tomorrow?", current_city="Nashik", language="English")
    assert "reply" in en_res
    assert len(en_res["reply"]) > 20
    assert "Nashik" in en_res["location"]

    # Hindi
    hi_res = ask_weathergpt("क्या कल नासिक में कीटनाशक छिड़क सकते हैं?", current_city="Nashik", language="हिन्दी")
    assert "reply" in hi_res
    assert "सलाह" in hi_res["reply"] or "मौसम" in hi_res["reply"]

    # Kannada
    kn_res = ask_weathergpt("ನಾಳೆ ಮಳೆ ಬರುತ್ತದೆಯೇ?", current_city="Bengaluru", language="ಕನ್ನಡ")
    assert "reply" in kn_res
    assert len(kn_res["reply"]) > 10

    print(f"[PASS] Multilingual AI chat passed for English, Hindi, and Kannada.")


if __name__ == "__main__":
    print("=" * 60)
    print("Running WeatherGPT SIH26068 Test Suite...")
    print("=" * 60)
    test_intent_detection()
    test_location_extraction()
    test_live_weather_service()
    test_nwp_models_and_comparison()
    test_extreme_alerts_imd()
    test_sector_advisories()
    test_aviation_and_climate()
    test_multilingual_ai_conversational_chat()
    print("=" * 60)
    print("ALL WEATHERGPT SIH26068 TESTS COMPLETED SUCCESSFULLY!")
    print("=" * 60)
