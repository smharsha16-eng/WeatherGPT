from main import chat, ChatRequest


TESTS = [
    # CURRENT WEATHER
    ("What is the weather in Mumbai right now?", "current_weather"),
    ("What is the weather in Bengaluru right now?", "current_weather"),
    ("What is the weather in Delhi right now?", "current_weather"),

    # TODAY / TOMORROW
    ("What is the weather in Mumbai today?", "forecast"),
    ("Will it rain in Mumbai tomorrow?", "forecast"),
    ("What will the weather be in Pune tomorrow?", "forecast"),
    ("What is the weather in Nashik tomorrow?", "forecast"),

    # EXTENDED FORECASTS
    ("Give me the weather in Mumbai for the next 7 days.", "forecast"),
    ("Give me the weather in Bengaluru for the next 14 days.", "forecast"),
    ("Give me the weather in Delhi for the next 16 days.", "forecast"),

    # LEAST RAIN
    ("Which day this week has the least rain in Bengaluru?", "least_rain_day"),
    ("Which day this week has the least rain in Mumbai?", "least_rain_day"),
    ("Which day will have the least rain in Pune?", "least_rain_day"),

    # HOTTEST DAY
    ("Which day will be hottest in Delhi?", "hottest_day"),
    ("Which day will be hottest in Mumbai this week?", "hottest_day"),
    ("Which day will be hottest in Bengaluru?", "hottest_day"),

    # BEST TRAVEL DAY
    ("Is it safe to travel to Pune this weekend?", "best_travel_day"),
    ("Which day is best for travelling to Mumbai this weekend?", "best_travel_day"),
    ("Which day is best for traveling to Mumbai this weekend?", "best_travel_day"),
    ("What is the best day to travel to Bengaluru this week?", "best_travel_day"),
    ("Which day should I travel to Delhi?", "best_travel_day"),

    # SPRAYING
    ("Should I spray pesticides in Nashik tomorrow?", "best_spraying_day"),
    ("What is the best day for spraying crops in Nashik this week?", "best_spraying_day"),
    ("When is the best time to spray pesticides in Nashik?", "best_spraying_day"),

    # FARMING ADVISORY
    ("Is tomorrow suitable for spraying crops in Nashik?", "farming_advisory"),
    ("What are the weather conditions for farming in Nashik?", "farming_advisory"),
    ("Is the weather suitable for farming in Pune tomorrow?", "farming_advisory"),

    # TRAVEL ADVISORY
    ("Is the weather suitable for travelling to Mumbai?", "travel_advisory"),
    ("Should I travel to Bengaluru tomorrow?", "travel_advisory"),
    ("Are weather conditions safe for a trip to Pune?", "travel_advisory"),

    # WEATHER ALERTS
    ("Are there any weather alerts for Mumbai?", "weather_alert"),
    ("Are there any weather warnings for Bengaluru?", "weather_alert"),
    ("Does Delhi have any active weather alerts?", "weather_alert"),

    # LOCATION ALIASES
    ("What is the weather in Bangalore today?", "forecast"),
    ("What is the weather in Bombay today?", "forecast"),
    ("What is the weather in Mysore today?", "forecast"),
    ("What is the weather in Ooty tomorrow?", "forecast"),
    ("What is the weather in Cochin tomorrow?", "forecast"),

    # DATE PARSING
    ("What is the weather in Mumbai on September 10?", "forecast"),
    ("What is the weather in Delhi on 09/12?", "forecast"),
    ("What is the weather in Pune on 2026-09-15?", "forecast"),

    # GENERAL FORECAST
    ("Give me the forecast for Mumbai this week.", "forecast"),
    ("Show me next week's weather in Bengaluru.", "forecast"),
    ("What will the weather be like in Delhi next weekend?", "forecast"),
]


def run_tests():
    passed = 0
    failed = 0
    errors = 0

    print("=" * 80)
    print("WEATHERGPT BACKEND TEST SUITE")
    print("=" * 80)

    for number, (query, expected_intent) in enumerate(TESTS, start=1):

        print("\n" + "-" * 80)
        print(f"TEST {number}/{len(TESTS)}")
        print(f"QUERY:    {query}")
        print(f"EXPECTED: {expected_intent}")

        try:
            request = ChatRequest(message=query)
            result = chat(request)

            actual_intent = result.get("type")
            reply = result.get("reply", "")
            parsed_query = result.get("parsed_query", {})

            location = parsed_query.get("location")
            time_period = parsed_query.get("time_period")

            print(f"ACTUAL:   {actual_intent}")
            print(f"LOCATION: {location}")
            print(f"PERIOD:   {time_period}")
            print(f"REPLY:    {reply}")

            if actual_intent == expected_intent:
                print("STATUS:   ✅ PASS")
                passed += 1
            else:
                print("STATUS:   ❌ FAIL")
                print(
                    f"INTENT MISMATCH: expected "
                    f"'{expected_intent}', got '{actual_intent}'"
                )
                failed += 1

        except Exception as e:
            print("STATUS:   💥 ERROR")
            print(f"ERROR:    {type(e).__name__}: {e}")
            errors += 1

    print("\n")
    print("=" * 80)
    print("FINAL TEST RESULTS")
    print("=" * 80)
    print(f"TOTAL:  {len(TESTS)}")
    print(f"PASSED: {passed}")
    print(f"FAILED: {failed}")
    print(f"ERRORS: {errors}")
    print("=" * 80)

    if failed == 0 and errors == 0:
        print("🔥 ALL TESTS PASSED 🔥")
    else:
        print("⚠️ SOME TESTS NEED ATTENTION")


if __name__ == "__main__":
    run_tests()