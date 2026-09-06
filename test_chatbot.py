"""
Automated Test Suite for WeatherGPT Platform
Tests AI query parsing, meteorological service, NWP models, alerts, and advisories.
"""
from chatbot import detect_intent, extract_location, ask_weathergpt
from weather_service import (
    get_live_weather,
    get_nwp_forecast,
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
    print("[PASS] Intent detection tests passed.")


def test_location_extraction():
    assert extract_location("What is the weather in Bengaluru tomorrow?") == "Bengaluru"
    assert extract_location("Can I spray in Nashik today?") == "Nashik"
    assert extract_location("Rain forecast for Mumbai?") == "Mumbai"
    print("[PASS] Location extraction tests passed.")


def test_live_weather_service():
    data = get_live_weather("Bengaluru")
    assert "temperature" in data
    assert "humidity" in data
    assert "wind_speed_kmh" in data
    assert "air_quality" in data
    assert "daily" in data
    assert len(data["daily"]) > 0
    print(f"[PASS] Live weather service passed: {data['city']} {data['temperature']}C")


def test_nwp_models():
    # Test NOAA GFS NWP model
    gfs = get_nwp_forecast(12.97, 77.59, model="gfs")
    assert gfs["model_id"] == "gfs"
    assert "days" in gfs
    print(f"[PASS] NWP GFS model passed: {gfs['model_name']}")


def test_extreme_alerts():
    sample_weather = {
        "city": "Mumbai",
        "temperature": 41.5,
        "humidity": 75,
        "wind_speed_kmh": 22.0,
        "precipitation_mm": 55.0,
        "condition": "Heavy Rain and Thunderstorm",
        "daily": [{"max_temp": 42.0, "rain_chance": 85, "precipitation_mm": 55.0}],
    }
    alerts = get_extreme_weather_alerts(sample_weather)
    assert len(alerts) > 0
    # Should detect heavy rainfall warning
    events = [a["event"] for a in alerts]
    assert any("Rainfall" in e or "Flooding" in e for e in events)
    print(f"[PASS] Extreme weather alert tests passed: detected {len(alerts)} alerts.")


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
    assert adv["aviation"]["flight_category"] in ["VFR", "MVFR", "IFR"]
    assert adv["marine"]["status"] in ["SAFE", "CAUTION", "HAZARDOUS"]
    assert "heat_index_c" in adv["smart_city"]
    print(f"[PASS] Sector decision support tests passed: Spray status = {adv['agriculture']['status']}")


def test_ai_conversational_chat():
    res = ask_weathergpt("Can I spray pesticides in Nashik tomorrow?", current_city="Nashik")
    assert "reply" in res
    assert len(res["reply"]) > 20
    assert res["location"] == "Nashik"
    print(f"[PASS] AI conversational response generated successfully: {res['location']} {res['type']}")


if __name__ == "__main__":
    print("Running WeatherGPT Test Suite...")
    test_intent_detection()
    test_location_extraction()
    test_live_weather_service()
    test_nwp_models()
    test_extreme_alerts()
    test_sector_advisories()
    test_ai_conversational_chat()
    print("\nALL WEATHERGPT TESTS PASSED!")
