"""
Verification script for all WeatherGPT FastAPI endpoints using TestClient.
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_all():
    print("Testing WeatherGPT API Endpoints...")

    # 1. Root / UI endpoint
    r = client.get("/")
    assert r.status_code == 200
    print(f"[PASS] GET / -> HTTP {r.status_code}")

    # 2. Health endpoint
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"
    print(f"[PASS] GET /health -> {r.json()}")

    # 3. Weather endpoint
    r = client.get("/weather?city=Bengaluru")
    assert r.status_code == 200
    data = r.json()
    assert "temperature" in data
    print(f"[PASS] GET /weather?city=Bengaluru -> {data['city']} {data['temperature']}°C ({data['condition']})")

    # 4. Forecast endpoint with GFS
    r = client.get("/forecast?city=Bengaluru&model=gfs")
    assert r.status_code == 200
    fdata = r.json()
    assert fdata["selected_model"] == "gfs"
    print(f"[PASS] GET /forecast?city=Bengaluru&model=gfs -> Model: {fdata['selected_model']}, Days: {len(fdata['nwp_forecast']['days'])}")

    # 5. NWP Comparison endpoint
    r = client.get("/nwp-compare?city=Bengaluru")
    assert r.status_code == 200
    cdata = r.json()
    assert "overall_confidence" in cdata
    assert "daily_comparison" in cdata
    print(f"[PASS] GET /nwp-compare?city=Bengaluru -> Confidence: {cdata['overall_confidence']}, Avg Spread: {cdata['average_temperature_spread_c']}°C")

    # 6. Alerts endpoint
    r = client.get("/alerts?city=Mumbai")
    assert r.status_code == 200
    adata = r.json()
    assert "alerts" in adata
    print(f"[PASS] GET /alerts?city=Mumbai -> Alerts count: {adata['alerts_count']}")

    # 7. Sector Advisories endpoint
    r = client.get("/advisories?city=Nashik")
    assert r.status_code == 200
    adv = r.json()
    assert "advisories" in adv
    assert "agriculture" in adv["advisories"]
    print(f"[PASS] GET /advisories?city=Nashik -> Spray suitability: {adv['advisories']['agriculture']['status']}")

    # 8. Aviation endpoint
    r = client.get("/aviation?airport=VOBL")
    assert r.status_code == 200
    av = r.json()
    assert av["airport"] == "VOBL"
    print(f"[PASS] GET /aviation?airport=VOBL -> {av['airport_name']}: Category {av['flight_category']}")

    # 9. Climate endpoint
    r = client.get("/climate?city=Bengaluru")
    assert r.status_code == 200
    cl = r.json()
    assert "warming_trend_percentage" in cl
    print(f"[PASS] GET /climate?city=Bengaluru -> Trend: {cl['warming_trend_percentage']}, Baseline: {cl['reference_period']}")

    # 10. Chat endpoint (English)
    r = client.post("/chat", json={"message": "Can I spray pesticides in Nashik tomorrow?", "city": "Nashik", "language": "English"})
    assert r.status_code == 200
    chat_resp = r.json()
    assert "reply" in chat_resp
    print(f"[PASS] POST /chat (English) -> Reply length: {len(chat_resp['reply'])} chars, Type: {chat_resp['type']}")

    # 11. Chat endpoint (Hindi)
    r = client.post("/chat", json={"message": "कल का मौसम कैसा रहेगा?", "city": "Delhi", "language": "हिन्दी"})
    assert r.status_code == 200
    chat_hi = r.json()
    assert "reply" in chat_hi
    print(f"[PASS] POST /chat (Hindi) -> Type: {chat_hi['type']}")

    # 12. Auth guest endpoint
    r = client.post("/auth/guest")
    assert r.status_code == 200
    auth_data = r.json()
    assert auth_data["status"] == "success"
    print(f"[PASS] POST /auth/guest -> User: {auth_data['user']['name']}")

    # 13. Auth phone OTP endpoint
    r = client.post("/auth/phone/send-otp", json={"phone": "9876543210", "country_code": "+91"})
    assert r.status_code == 200
    assert r.json()["demo_otp"] == "123456"
    print(f"[PASS] POST /auth/phone/send-otp -> Demo OTP: {r.json()['demo_otp']}")

    print("\n" + "=" * 60)
    print("ALL API ENDPOINT INTEGRATION TESTS PASSED 100%!")
    print("=" * 60)


if __name__ == "__main__":
    test_all()
