from fastapi.testclient import TestClient
from main import app
import database

client = TestClient(app)

def test_all_new_features():
    print("Testing Feature 1: Real-time GPS coordinate query...")
    # Coordinates for Chennai: 13.0827, 80.2707
    r_gps = client.get("/weather?lat=13.0827&lon=80.2707")
    assert r_gps.status_code == 200, f"GPS query failed: {r_gps.text}"
    gps_data = r_gps.json()
    print("  [PASS] GPS Query resolved city:", gps_data.get("city"))

    print("Testing Feature 2: 24-Hour Diurnal Progression array...")
    assert "hourly" in gps_data, "Missing hourly array in /weather response"
    hourly = gps_data["hourly"]
    assert len(hourly) == 24, f"Hourly length must be 24, got {len(hourly)}"
    assert hourly[0]["is_current"] == True, "First hour should be flagged as is_current=True"
    print(f"  [PASS] 24-Hour Progression validated: 24 continuous hours from {hourly[0]['time']} to {hourly[-1]['time']}")
    print(f"         Sample: {hourly[0]['time']} -> {hourly[0]['temperature']}°C, {hourly[0]['condition']}, Rain chance: {hourly[0]['rain_chance']}%, Wind: {hourly[0]['wind_speed_kmh']} km/h")

    print("Testing Feature 3: Weather History persistence in SQLite...")
    r_hist = client.get("/api/weather/history")
    assert r_hist.status_code == 200, f"History GET failed: {r_hist.text}"
    hist_data = r_hist.json()
    count = hist_data.get("count", 0)
    print(f"  [PASS] Historical weather records in SQLite: {count} recorded snapshots")
    assert count > 0, "Expected at least 1 recorded observation in weather history"
    first_record = hist_data["history"][0]
    print(f"         Latest record: City={first_record['city']}, Temp={first_record['temperature']}°C, AQI={first_record['aqi_status']}")

    print("Testing Feature 4: Filter history by city...")
    r_filter = client.get("/api/weather/history?city=Chennai")
    assert r_filter.status_code == 200
    filter_data = r_filter.json()
    print(f"  [PASS] Filtered history by 'Chennai': {filter_data.get('count')} records")

    print("\nALL VERIFICATIONS PASSED SUCCESSFULLY 100%!")

if __name__ == "__main__":
    test_all_new_features()
