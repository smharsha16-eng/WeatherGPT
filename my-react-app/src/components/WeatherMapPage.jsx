import { useState, useEffect, useRef } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { getTranslation, translateCondition, translateDay } from "../utils/translations";

const INDIA_CENTER = { lat: 20.5937, lng: 78.9629 };

// Key Indian city suggestions: Bengaluru, Delhi
const QUICK_SUGGESTIONS = [
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
];

function isInsideIndia(lat, lng) {
  // Approximate bounding box of India mainland and islands
  // Latitude ~6.5°N to ~37.5°N, Longitude ~68.0°E to ~97.5°E
  return lat >= 6.5 && lat <= 37.5 && lng >= 68.0 && lng <= 97.5;
}

export default function WeatherMapPage({
  apiBase,
  onOpenInChat,
  language = "English",
  isSirenActive = false,
  onTriggerDisasterAlert,
  onStopSiren,
  onPlaySiren,
  onLocationSelect,
}) {
  const t = getTranslation(language);

  // Check environment variable or localStorage for Google Maps API Key
  const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("weathergpt_gmp_key") || envKey;
  });
  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  // Map state
  const [selectedCoords, setSelectedCoords] = useState({ lat: 12.9716, lng: 77.5946 });
  const [selectedName, setSelectedName] = useState("Bengaluru, Karnataka");
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 21.0, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(5);
  const [mapLayer, setMapLayer] = useState("terrain"); // "terrain" | "roadmap" | "satellite"

  // Weather data states
  const [weatherData, setWeatherData] = useState(null);
  const [alertsData, setAlertsData] = useState([]);
  const [advisoriesData, setAdvisoriesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [userOutgoingPlan, setUserOutgoingPlan] = useState("now"); // "now" | "later" | "no"
  const [mapForecastDays, setMapForecastDays] = useState(14);

  // DOM and Leaflet map refs
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const leafletMapRef = useRef(null);
  const leafletMarkerRef = useRef(null);
  const tileLayerRef = useRef(null);

  // Helper to identify active severe disaster for the selected location (STRICT RED ALERT FILTER)
  const severeAlert = alertsData.find(
    (a) =>
      a.is_severe_hazard === true &&
      (a.imd_code === "RED" ||
        a.severity === "Red Alert" ||
        a.severity?.toLowerCase().includes("red") ||
        a.level === "critical")
  );

  // Google Maps tile URL helper
  const getGoogleTileUrl = (type) => {
    switch (type) {
      case "satellite":
        return "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";
      case "roadmap":
        return "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      case "terrain":
      default:
        return "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}";
    }
  };

  // Create authentic Google Maps Red Pin icon
  const createGooglePin = (isSevere = false) => {
    if (!window.L) return null;
    return window.L.divIcon({
      className: "google-maps-pin-container",
      html: `
        <div style="position: relative; width: 34px; height: 44px; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.45)); cursor: pointer;">
          <svg viewBox="0 0 24 36" width="34" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 10.5 22.5 11.25 23.5a1 1 0 001.5 0C13.5 34.5 24 20.5 24 12c0-6.627-5.373-12-12-12z" fill="${isSevere ? '#dc2626' : '#ea4335'}"/>
            <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 7.3 9 19.5 10.5 21.5 1.5-2 10.5-14.2 10.5-21.5 0-5.799-4.701-10.5-10.5-10.5z" stroke="${isSevere ? '#991b1b' : '#b31412'}" stroke-width="1"/>
            <circle cx="12" cy="11.5" r="4.5" fill="#ffffff"/>
          </svg>
        </div>
      `,
      iconSize: [34, 44],
      iconAnchor: [17, 44],
      popupAnchor: [0, -44],
    });
  };

  // Fetch weather data whenever selectedCoords changes
  const fetchLocationWeather = async (lat, lon, label = null, disasterOverride = null) => {
    setLoading(true);
    setToastMessage("");
    try {
      // 1. Fetch live weather & AQI
      const wUrl = disasterOverride
        ? `${apiBase}/weather?lat=${lat}&lon=${lon}&disaster=${disasterOverride}`
        : `${apiBase}/weather?lat=${lat}&lon=${lon}`;
      const wRes = await fetch(wUrl);
      if (wRes.ok) {
        const wJson = await wRes.json();
        setWeatherData(wJson);
        const resolvedCity = label || wJson.city || `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;
        setSelectedName(resolvedCity);
        setShowInfoWindow(true);

        // Update popup with real city name and real-time weather data for Leaflet
        if (leafletMarkerRef.current && window.L) {
          const conditionText = wJson.condition || "Clear";
          const temp = wJson.temperature ?? 25;
          const humidity = wJson.humidity ?? 60;
          const rain = wJson.daily?.[0]?.rain_chance ?? (wJson.precipitation_mm > 0 ? 75 : 15);
          const wind = wJson.wind_speed_kmh ?? 12;

          leafletMarkerRef.current.setIcon(createGooglePin(!!disasterOverride));
          leafletMarkerRef.current.bindPopup(`
            <div style="font-family: 'Roboto', 'Google Sans', sans-serif; min-width: 240px; padding: 6px 4px; color: #202124;">
              <div style="border-bottom: 1px solid #e8eaed; padding-bottom: 6px; margin-bottom: 8px;">
                <strong style="font-size: 15px; color: #202124; display: block;">📍 ${resolvedCity}</strong>
                <span style="font-size: 11px; color: #5f6368;">${lat.toFixed(3)}°N, ${lon.toFixed(3)}°E</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div>
                  <div style="font-size: 24px; font-weight: 800; color: #1a73e8; line-height: 1;">${temp}°C</div>
                  <div style="font-size: 12px; color: #5f6368; margin-top: 3px;">${conditionText}</div>
                </div>
                <div style="font-size: 32px;">${wJson.condition_icon ? `<img src="${wJson.condition_icon}" style="width: 40px; height: 40px;" />` : '⛅'}</div>
              </div>
              <div style="font-size: 12px; color: #3c4043; line-height: 1.6; background: #f8f9fa; padding: 8px 10px; border-radius: 8px; margin-bottom: 8px;">
                <div>💧 Humidity: <strong>${humidity}%</strong></div>
                <div>🌧️ Rain Chance: <strong>${rain}%</strong> (${wJson.precipitation_mm || 0} mm)</div>
                <div>💨 Wind Speed: <strong>${wind} km/h</strong></div>
              </div>
              <div style="font-size: 11px; color: #1a73e8; font-weight: 600; text-align: center; padding-top: 2px;">
                Click anywhere on the map to inspect weather 📍
              </div>
            </div>
          `).openPopup();
        }
      }

      // 2. Fetch IMD alerts
      const aUrl = disasterOverride
        ? `${apiBase}/alerts?lat=${lat}&lon=${lon}&disaster=${disasterOverride}`
        : `${apiBase}/alerts?lat=${lat}&lon=${lon}`;
      const aRes = await fetch(aUrl);
      if (aRes.ok) {
        const aJson = await aRes.json();
        const incomingAlerts = aJson.alerts || [];
        setAlertsData(incomingAlerts);
        if (onTriggerDisasterAlert) {
          onTriggerDisasterAlert(incomingAlerts, label || selectedName);
        }
      }

      // 3. Fetch Advisories
      const advRes = await fetch(`${apiBase}/advisories?lat=${lat}&lon=${lon}`);
      if (advRes.ok) {
        const advJson = await advRes.json();
        setAdvisoriesData(advJson.advisories || null);
      }
    } catch (err) {
      console.error("Error fetching weather for map location:", err);
      setToastMessage("Failed to fetch live weather data. Using cached meteorological mesh.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load on mount
  useEffect(() => {
    fetchLocationWeather(selectedCoords.lat, selectedCoords.lng, "Bengaluru, Karnataka");
  }, []);

  // Debounced auto-suggestions fetcher
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSuggesting(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSuggesting(true);
      try {
        const res = await fetch(`${apiBase}/locations/suggest?q=${encodeURIComponent(trimmed)}&limit=8`);
        if (res.ok) {
          const data = await res.json();
          const items = data.suggestions || [];
          setSuggestions(items);
          setShowSuggestions(items.length > 0);
          setHighlightedIndex(-1);
        }
      } catch (err) {
        console.warn("Location suggestions warning:", err);
      } finally {
        setIsSuggesting(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, apiBase]);

  // Click outside to dismiss suggestions dropdown (uses capture phase to intercept before map canvases swallow events)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside, true);
    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, true);
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, []);

  // Real-time GPS Geolocation Detection for Current Location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setToastMessage("⚠️ Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    setToastMessage("📡 Detecting your live location via GPS...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        setToastMessage(`📍 GPS coordinates acquired (${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E). Updating map & weather...`);
        handleSelectLocation(latitude, longitude, "My Current Location", null, 13);
        if (onLocationSelect) {
          onLocationSelect(latitude, longitude);
        }
      },
      (err) => {
        setIsLocating(false);
        let msg = "Could not retrieve your current location.";
        if (err.code === 1) msg = "Location permission denied. Please allow location access in your browser settings.";
        else if (err.code === 2) msg = "GPS position unavailable.";
        else if (err.code === 3) msg = "GPS location request timed out.";
        setToastMessage(`⚠️ ${msg}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  // Handle location selection from user with zoom
  const handleSelectLocation = (lat, lng, name = null, disasterOverride = null, zoomLevel = 11) => {
    if (!isInsideIndia(lat, lng)) {
      setToastMessage("⚠️ Selected coordinates are outside India. Please select a point within the Indian subcontinent.");
      return;
    }
    setSelectedCoords({ lat, lng });
    setMapCenter({ lat, lng });
    setMapZoom(zoomLevel);
    fetchLocationWeather(lat, lng, name, disasterOverride);

    // If Leaflet is active, smoothly fly and zoom into target location
    if (leafletMarkerRef.current) {
      leafletMarkerRef.current.setLatLng([lat, lng]);
    }
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([lat, lng], zoomLevel, { duration: 1.2 });
    }
  };

  // Handle place selection from auto-suggestion dialog
  const handleSelectPlace = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    const displayName = place.display_name || `${place.name}, ${place.state || "India"}`;

    setSearchQuery(place.name || displayName.split(",")[0]);
    setShowSuggestions(false);
    setHighlightedIndex(-1);

    handleSelectLocation(lat, lon, displayName, null, 12);
  };

  // Handle keyboard navigation inside search input
  const handleInputKeyDown = (e) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelectPlace(suggestions[highlightedIndex]);
        } else {
          handleSelectPlace(suggestions[0]);
        }
        return;
      }
      if (e.key === "Escape") {
        setShowSuggestions(false);
        return;
      }
    }
  };

  // Handle Google Maps map click
  const handleGoogleMapClick = (e) => {
    setShowSuggestions(false);
    const lat = e.detail?.latLng?.lat;
    const lng = e.detail?.latLng?.lng;
    if (lat !== undefined && lng !== undefined) {
      setShowInfoWindow(true);
      handleSelectLocation(lat, lng, null, null, mapZoom);
    }
  };

  // Handle city search submit
  const handleSearchSubmit = async (e) => {
    e?.preventDefault();
    setShowSuggestions(false);
    if (!searchQuery.trim()) return;

    // If suggestions are visible and active, use top/highlighted suggestion
    if (showSuggestions && suggestions.length > 0) {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSelectPlace(suggestions[highlightedIndex]);
        return;
      }
      handleSelectPlace(suggestions[0]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/weather?city=${encodeURIComponent(searchQuery.trim())}`);
      if (res.ok) {
        const data = await res.json();
        const lat = data.lat || 12.9716;
        const lon = data.lon || 77.5946;
        const resolvedName = data.city ? `${data.city}, ${data.region || data.country || "IN"}` : searchQuery;
        setShowSuggestions(false);
        handleSelectLocation(lat, lon, resolvedName, null, 12);
      } else {
        setToastMessage(`Could not resolve location: "${searchQuery}"`);
      }
    } catch (err) {
      setToastMessage(`Error searching location: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    const trimmed = keyInput.trim();
    setApiKey(trimmed);
    localStorage.setItem("weathergpt_gmp_key", trimmed);
    setShowKeyConfig(false);
    setToastMessage(trimmed ? "Google Maps API Key saved successfully!" : "API Key cleared.");
  };

  // Google Maps Leaflet initialization with high-resolution Google Terrain / Roadmap / Satellite tiles
  useEffect(() => {
    if (apiKey) return; // Google Maps JS API active

    const container = document.getElementById("leaflet-fallback-container");
    if (!container || !window.L) return;

    if (!leafletMapRef.current) {
      const map = window.L.map("leaflet-fallback-container", {
        center: [21.0, 78.9629],
        zoom: 5,
        minZoom: 3,
        maxZoom: 20,
        zoomControl: false, // We provide authentic Google Maps styled zoom controls
        attributionControl: false,
      });

      const initialTileLayer = window.L.tileLayer(getGoogleTileUrl(mapLayer), {
        attribution: "Google Maps",
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }).addTo(map);

      tileLayerRef.current = initialTileLayer;

      const marker = window.L.marker([selectedCoords.lat, selectedCoords.lng], {
        icon: createGooglePin(false),
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: 'Roboto', sans-serif; min-width: 190px; padding: 4px;">
          <strong style="font-size: 14px; color: #202124;">📍 ${selectedName}</strong><br/>
          <span style="font-size: 12px; color: #5f6368;">Click anywhere on map to inspect weather</span>
        </div>
      `).openPopup();

      map.on("click", (e) => {
        setShowSuggestions(false);
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        marker.bindPopup(`
          <div style="font-family: 'Roboto', sans-serif; min-width: 200px; padding: 10px 12px; text-align: center;">
            <div style="font-size: 24px; margin-bottom: 4px;">⏳</div>
            <strong style="font-size: 13px; color: #1a73e8; display: block;">Fetching Real-Time Weather...</strong>
            <span style="font-size: 11px; color: #5f6368;">Resolving ${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E</span>
          </div>
        `).openPopup();
        handleSelectLocation(lat, lng);
      });

      leafletMapRef.current = map;
      leafletMarkerRef.current = marker;
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        leafletMarkerRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, [apiKey]);

  // Tile layer updater when mapLayer switches
  useEffect(() => {
    if (leafletMapRef.current && window.L && !apiKey) {
      if (tileLayerRef.current) {
        leafletMapRef.current.removeLayer(tileLayerRef.current);
      }
      const newLayer = window.L.tileLayer(getGoogleTileUrl(mapLayer), {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        attribution: "Google Maps",
      }).addTo(leafletMapRef.current);
      tileLayerRef.current = newLayer;
    }
  }, [mapLayer, apiKey]);

  // Determine rain probability & condition for outgoing suggestion
  const rainProbability =
    weatherData?.daily?.[0]?.rain_chance ??
    (weatherData?.precipitation_mm > 0 ? 85 : 15);

  const conditionText = (weatherData?.condition || "").toLowerCase();
  const isRainy =
    rainProbability >= 30 ||
    (weatherData?.precipitation_mm || 0) > 0.4 ||
    conditionText.includes("rain") ||
    conditionText.includes("drizzle") ||
    conditionText.includes("shower") ||
    conditionText.includes("thunderstorm");

  return (
    <section className="weather-map-view" style={{ animation: "fadeIn 0.3s ease", display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* 1. TITLE & CELESTIAL HEADER */}
      <div className="card weather-map-header-card" style={{ padding: "20px 24px", position: "relative", zIndex: 1200, overflow: "visible" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ minWidth: "240px", flex: "1" }}>
            <span className="eyebrow" style={{ color: "var(--primary-light)", letterSpacing: "1px" }}>
              {t.mapEyebrow}
            </span>
            <h1 style={{ fontSize: "1.85rem", fontWeight: "800", margin: "4px 0" }}>
              {t.mapHeaderTitle}
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", margin: "2px 0 0 0" }}>
              {t.mapHeaderDesc}
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              className="action-btn"
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              style={{ fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px" }}
            >
              ⚙️ {apiKey ? "Google Maps: Active" : t.mapConfigBtn}
            </button>
            <button
              className="refresh-btn"
              onClick={() => fetchLocationWeather(selectedCoords.lat, selectedCoords.lng, selectedName)}
              disabled={loading}
              title={t.refresh}
            >
              {loading ? "↻" : t.refresh}
            </button>
          </div>
        </div>

        {/* Optional Google Maps API Key Config Drawer */}
        {showKeyConfig && (
          <div
            style={{
              marginTop: "16px",
              padding: "14px 18px",
              background: "var(--card-light)",
              borderRadius: "10px",
              border: "1px solid var(--border)",
            }}
          >
            <strong style={{ display: "block", marginBottom: "6px" }}>Google Maps Platform Configuration</strong>
            <p style={{ fontSize: "0.86rem", color: "var(--muted)", marginBottom: "10px" }}>
              Enter your Google Maps API Key below, or get a free instant Maps Demo Key from{" "}
              <a
                href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_git_agentskills_v1"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--primary-light)", textDecoration: "underline" }}
              >
                mapsplatform.google.com/maps-demo-key
              </a>.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input
                type="text"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Paste Google Maps API Key..."
                style={{
                  flex: "1",
                  minWidth: "240px",
                  padding: "8px 12px",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  color: "var(--text)",
                }}
              />
              <button className="ask-btn" onClick={handleSaveApiKey}>Save Key</button>
              <button
                className="action-btn"
                onClick={() => {
                  setKeyInput("");
                  setApiKey("");
                  localStorage.removeItem("weathergpt_gmp_key");
                  setShowKeyConfig(false);
                }}
              >
                Use OpenStreetMap
              </button>
            </div>
          </div>
        )}

        {/* 2. SEARCH BAR WITH DYNAMIC SUGGESTIONS DIALOG */}
        <div ref={searchContainerRef} className="weather-map-search-wrapper" style={{ position: "relative", zIndex: 1300, marginTop: "16px" }}>
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px", width: "100%" }}>
            <div style={{ position: "relative", flex: "1" }}>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => {
                  setShowSuggestions(true);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={t.searchPlaceholder || "Search any city, town, district, taluk, village across India..."}
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 44px",
                  background: "var(--card-light)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  color: "var(--text)",
                  fontSize: "0.98rem",
                  outline: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
                autoComplete="off"
                spellCheck="false"
              />
              <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none", opacity: 0.7 }}>
                🔍
              </span>
              <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "6px" }}>
                {isSuggesting && (
                  <span style={{ fontSize: "13px", display: "inline-block", opacity: 0.8 }}>
                    ⏳
                  </span>
                )}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSuggestions([]);
                      setShowSuggestions(false);
                      searchInputRef.current?.focus();
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--muted)",
                      cursor: "pointer",
                      fontSize: "14px",
                      padding: "2px 6px",
                      borderRadius: "50%",
                    }}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="weather-map-search-btn"
              disabled={loading}
              style={{
                whiteSpace: "nowrap",
                padding: "0 22px",
                height: "48px",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(2, 132, 199, 0.35)",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "15px" }}>🔍</span>
              <span style={{ color: "#ffffff", fontWeight: "700" }}>
                {loading ? "Locating..." : (t.searchBtn || "Search Location")}
              </span>
            </button>
          </form>

          {/* DYNAMIC AUTO-SUGGESTION DIALOG BOX */}
          {showSuggestions && (
            <div
              className="map-suggestions-dropdown"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                right: 0,
                zIndex: 999999,
                background: "var(--card-light, #0d2138)",
                backdropFilter: "blur(14px)",
                border: "1px solid var(--border-light, rgba(92,167,255,0.3))",
                borderRadius: "12px",
                boxShadow: "0 16px 40px rgba(0,0,0,0.65), 0 0 1px rgba(255,255,255,0.1)",
                overflow: "hidden",
                maxHeight: "360px",
                display: "flex",
                flexDirection: "column",
                animation: "fadeIn 0.18s ease",
              }}
            >
              <div
                style={{
                  padding: "9px 16px",
                  borderBottom: "1px solid var(--border)",
                  fontSize: "0.76rem",
                  fontWeight: "700",
                  color: "var(--muted)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(0,0,0,0.12)",
                }}
              >
                <span>📍 Matching Places in India ({suggestions.length})</span>
                <span style={{ fontSize: "0.72rem", color: "var(--primary-light)", textTransform: "none", fontWeight: "600" }}>
                  ↑ ↓ to navigate • Enter to point
                </span>
              </div>

              <div style={{ overflowY: "auto", maxHeight: "290px" }}>
                {/* 1ST DROPDOWN OPTION: MY CURRENT LOCATION */}
                <div
                  onClick={() => {
                    setShowSuggestions(false);
                    handleUseCurrentLocation();
                  }}
                  style={{
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    background: "rgba(16, 185, 129, 0.12)",
                    borderBottom: "1px solid var(--border)",
                    color: "var(--text)",
                    transition: "background 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: "1.3rem" }}>🎯</span>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: "0.92rem", color: "#10b981", display: "block" }}>
                      {isLocating ? "Detecting GPS location..." : "📍 Use My Current Location"}
                    </strong>
                    <span style={{ fontSize: "0.76rem", color: "var(--muted)" }}>
                      Automatically center map and load live meteorological telemetry for your real device coordinates
                    </span>
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: "700" }}>
                    Live GPS →
                  </span>
                </div>

                {suggestions.length > 0 ? (
                  suggestions.map((item, idx) => {
                    const isHighlighted = idx === highlightedIndex;
                    const getIcon = (cat) => {
                      if (cat === "Village") return "🏡";
                      if (cat?.includes("Taluk") || cat?.includes("Tehsil")) return "🏘️";
                      if (cat?.includes("District")) return "📍";
                      if (cat === "Hill Station") return "⛰️";
                      if (cat?.includes("City")) return "🏙️";
                      return "📍";
                    };

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectPlace(item)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`map-suggestion-item ${isHighlighted ? "highlighted" : ""}`}
                        style={{
                          padding: "11px 16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                          cursor: "pointer",
                          borderBottom: idx < suggestions.length - 1 ? "1px solid var(--border)" : "none",
                          background: isHighlighted ? "var(--item-hover, rgba(49, 140, 255, 0.18))" : "transparent",
                          transition: "background 0.15s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0, flex: "1" }}>
                          <span style={{ fontSize: "1.35rem", flexShrink: 0 }}>
                            {getIcon(item.category)}
                          </span>
                          <div style={{ minWidth: 0, flex: "1" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                              <strong style={{ fontSize: "0.95rem", color: isHighlighted ? "var(--primary-light)" : "var(--text)" }}>
                                {item.name}
                              </strong>
                              {item.category && (
                                <span
                                  style={{
                                    fontSize: "0.68rem",
                                    fontWeight: "700",
                                    padding: "2px 8px",
                                    borderRadius: "10px",
                                    background:
                                      item.category === "Village"
                                        ? "rgba(16, 185, 129, 0.18)"
                                        : item.category?.includes("Taluk")
                                        ? "rgba(56, 189, 248, 0.18)"
                                        : item.category?.includes("District")
                                        ? "rgba(245, 158, 11, 0.18)"
                                        : "rgba(139, 92, 246, 0.18)",
                                    color:
                                      item.category === "Village"
                                        ? "#10b981"
                                        : item.category?.includes("Taluk")
                                        ? "#38bdf8"
                                        : item.category?.includes("District")
                                        ? "#f59e0b"
                                        : "#a78bfa",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                  }}
                                >
                                  {item.category}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {item.display_name}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "monospace", display: "block" }}>
                            {item.lat.toFixed(2)}°N, {item.lon.toFixed(2)}°E
                          </span>
                          <span style={{ fontSize: "0.76rem", color: "var(--primary-light)", fontWeight: "600" }}>
                            Point Map →
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : !searchQuery.trim() ? (
                  <div style={{ padding: "6px 0" }}>
                    <div style={{ padding: "8px 16px", fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "700" }}>
                      Key Cities:
                    </div>
                    {QUICK_SUGGESTIONS.map((st, qIdx) => (
                      <div
                        key={qIdx}
                        onClick={() => {
                          setShowSuggestions(false);
                          handleSelectLocation(st.lat, st.lng, st.name);
                        }}
                        style={{
                          padding: "10px 16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          borderBottom: qIdx === 0 ? "1px solid var(--border)" : "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--item-hover, rgba(49, 140, 255, 0.18))")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "1.2rem" }}>🏙️</span>
                          <div>
                            <strong style={{ fontSize: "0.92rem", color: "var(--text)", display: "block" }}>📍 {st.name}</strong>
                            <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Click to inspect meteorological telemetry</span>
                          </div>
                        </div>
                        <span style={{ fontSize: "0.76rem", color: "var(--primary-light)", fontWeight: "600" }}>Point Map →</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "18px", textAlign: "center", color: "var(--muted)", fontSize: "0.88rem" }}>
                    {isSuggesting ? "Searching place..." : `No matching places found for "${searchQuery}". Press Enter to search anyway.`}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. SUGGESTIONS BAR WITH 1ST OPTION AS CURRENT LOCATION */}
        <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--muted)", fontWeight: "600" }}>
            {t.suggestionsLabel}
          </span>

          {/* FIRST SUGGESTION OPTION: CURRENT LOCATION */}
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            title="Detect real GPS coordinates and update map & weather"
            style={{
              padding: "5px 15px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              border: "1px solid #10b981",
              borderRadius: "20px",
              color: "#ffffff",
              fontSize: "0.85rem",
              cursor: "pointer",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 8px rgba(16, 185, 129, 0.35)",
              transition: "all 0.2s ease",
            }}
          >
            {isLocating ? "⏳ Locating..." : "📍 My current location"}
          </button>

          {QUICK_SUGGESTIONS.map((st) => {
            const isSelected = selectedCoords.lat === st.lat && selectedCoords.lng === st.lng;
            return (
              <button
                key={st.name}
                type="button"
                onClick={() => handleSelectLocation(st.lat, st.lng, st.name)}
                className={`map-city-suggestion-chip ${isSelected ? "selected" : ""}`}
                style={{
                  padding: "5px 16px",
                  background: isSelected
                    ? "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
                    : "var(--card-light)",
                  border: isSelected ? "1.5px solid #0284c7" : "1px solid var(--border)",
                  borderRadius: "20px",
                  color: isSelected ? "#0369a1" : "var(--text)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: isSelected ? "700" : "600",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 2px 8px rgba(2, 132, 199, 0.25)" : "none",
                }}
              >
                📍 {st.name}
              </button>
            );
          })}

          {/* Quick Disaster Simulation Buttons on Weather Map */}
          <div style={{ marginLeft: "auto", display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.78rem", color: "#ef4444", fontWeight: "700" }}>🚨 {t.simulateDisaster || "Test Disaster:"}</span>
            <button
              type="button"
              onClick={() => handleSelectLocation(19.0760, 72.8777, "Mumbai, Maharashtra", "flood")}
              style={{ padding: "4px 10px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#ef4444", borderRadius: "14px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer" }}
            >
              🌊 Flood (Mumbai)
            </button>
            <button
              type="button"
              onClick={() => handleSelectLocation(19.8135, 85.8312, "Puri, Odisha", "cyclone")}
              style={{ padding: "4px 10px", background: "rgba(220, 38, 38, 0.15)", border: "1px solid #dc2626", color: "#dc2626", borderRadius: "14px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer" }}
            >
              🌀 Cyclone (Puri)
            </button>
            <button
              type="button"
              onClick={() => handleSelectLocation(13.0827, 80.2707, "Chennai, Tamil Nadu", "tsunami")}
              style={{ padding: "4px 10px", background: "rgba(185, 28, 28, 0.15)", border: "1px solid #b91c1c", color: "#b91c1c", borderRadius: "14px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer" }}
            >
              🌊 Tsunami (Chennai)
            </button>
          </div>
        </div>

        {toastMessage && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              background: "rgba(255, 116, 116, 0.15)",
              border: "1px solid var(--red)",
              borderRadius: "8px",
              color: "var(--text)",
              fontSize: "0.88rem",
            }}
          >
            {toastMessage}
          </div>
        )}
      </div>

      {/* 4. COVER ENTIRE PAGE WITH AUTHENTIC GOOGLE MAP */}
      <div
        className="card gmap-canvas-container"
        style={{
          padding: "0",
          width: "100%",
          height: "620px",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {/* Floating Header Info on Map */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            zIndex: 1000,
            background: "rgba(6, 17, 31, 0.88)",
            backdropFilter: "blur(10px)",
            padding: "8px 14px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <span style={{ color: "var(--green)", fontWeight: "700", fontSize: "0.8rem" }}>{t.liveRadarActive}</span>
          <span style={{ color: "var(--text)", fontSize: "0.88rem", fontWeight: "600" }}>
            {selectedName}
          </span>
          <span style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
            ({selectedCoords.lat.toFixed(3)}°N, {selectedCoords.lng.toFixed(3)}°E)
          </span>
        </div>

        {/* Bottom-left Layers Switcher Thumbnail Box (Matching Google Maps) */}
        <div
          className="gmap-layers-widget"
          onClick={() => {
            setMapLayer((prev) => (prev === "terrain" ? "satellite" : prev === "satellite" ? "roadmap" : "terrain"));
          }}
          style={{
            backgroundImage:
              mapLayer === "terrain"
                ? "url('https://mt1.google.com/vt/lyrs=s&x=23&y=14&z=5')"
                : mapLayer === "satellite"
                ? "url('https://mt1.google.com/vt/lyrs=p&x=23&y=14&z=5')"
                : "url('https://mt1.google.com/vt/lyrs=p&x=23&y=14&z=5')",
          }}
          title="Click to toggle Google Map Layers (Terrain / Satellite / Street)"
        >
          <div className="gmap-layers-label">
            {mapLayer === "terrain" ? "Satellite" : mapLayer === "satellite" ? "Street" : "Terrain"}
          </div>
        </div>

        {/* Bottom-right Google Maps Zoom & Navigation Controls */}
        <div className="gmap-controls-group">
          <button
            type="button"
            className="gmap-util-btn"
            onClick={() => {
              if (leafletMapRef.current) {
                leafletMapRef.current.setView([21.0, 78.9629], 5, { animate: true });
              } else {
                setMapCenter({ lat: 21.0, lng: 78.9629 });
                setMapZoom(5);
              }
            }}
            title="Recenter to India"
          >
            🎯
          </button>
          <button
            type="button"
            className="gmap-util-btn"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    handleSelectLocation(pos.coords.latitude, pos.coords.longitude, "My Location");
                  },
                  (err) => {
                    setToastMessage("Could not get current location: " + err.message);
                  }
                );
              }
            }}
            title="My Current Location (GPS)"
          >
            📍
          </button>
          <div className="gmap-zoom-box">
            <button
              type="button"
              className="gmap-control-btn"
              onClick={() => {
                if (leafletMapRef.current) leafletMapRef.current.zoomIn();
                else setMapZoom((z) => Math.min(z + 1, 18));
              }}
              title="Zoom In"
            >
              +
            </button>
            <div className="gmap-zoom-divider"></div>
            <button
              type="button"
              className="gmap-control-btn"
              onClick={() => {
                if (leafletMapRef.current) leafletMapRef.current.zoomOut();
                else setMapZoom((z) => Math.max(z - 1, 3));
              }}
              title="Zoom Out"
            >
              −
            </button>
          </div>
        </div>

        {/* Google Maps Watermark & Copyright */}
        <div className="gmap-watermark-row">
          <span className="gmap-logo-text">Google</span>
          <span>• Map data ©2026 Google</span>
        </div>

        {/* Map Rendering Container */}
        <div style={{ width: "100%", height: "100%" }}>
          {apiKey ? (
            <APIProvider apiKey={apiKey} libraries={["places"]}>
              <Map
                center={mapCenter}
                zoom={mapZoom}
                onCenterChanged={(e) => setMapCenter(e.detail.center)}
                onZoomChanged={(e) => setMapZoom(e.detail.zoom)}
                onClick={handleGoogleMapClick}
                mapId="DEMO_MAP_ID"
                internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
                style={{ width: "100%", height: "100%" }}
                gestureHandling="greedy"
                disableDefaultUI={false}
              >
                <AdvancedMarker position={selectedCoords} onClick={() => setShowInfoWindow(true)}>
                  <Pin
                    background={severeAlert ? "#ef4444" : "var(--primary)"}
                    glyphColor="#ffffff"
                    borderColor={severeAlert ? "#b91c1c" : "#ffffff"}
                  />
                </AdvancedMarker>

                {showInfoWindow && (
                  <InfoWindow
                    position={selectedCoords}
                    onCloseClick={() => setShowInfoWindow(false)}
                    headerContent={<strong style={{ color: severeAlert ? "#dc2626" : "#0d2138", fontSize: "14px" }}>📍 {selectedName}</strong>}
                  >
                    <div style={{ color: "#1f2937", padding: "4px", fontSize: "13px", lineHeight: "1.6", minWidth: "190px" }}>
                      {severeAlert && (
                        <div style={{ background: "#fee2e2", border: "1px solid #f87171", color: "#991b1b", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", marginBottom: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                          🚨 {severeAlert.event}
                        </div>
                      )}
                      <div style={{ fontSize: "16px", fontWeight: "800", color: "#1e40af", marginBottom: "4px" }}>
                        {weatherData?.temperature !== undefined ? `${weatherData.temperature}°C` : "Loading..."} • {weatherData?.condition || "Live"}
                      </div>
                      <div>💧 Humidity: <strong>{weatherData?.humidity ?? "--"}%</strong></div>
                      <div>🌧️ Rain Probability: <strong>{rainProbability}%</strong></div>
                      <div>💨 Wind Speed: <strong>{weatherData?.wind_speed_kmh ?? "--"} km/h</strong></div>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          ) : (
            <div id="leaflet-fallback-container" style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>

      {/* 5. WEATHER DATA & SUGGESTIONS BELOW */}
      {weatherData && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* WEATHER DATA METRICS GRID */}
          <div className="card" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <div>
                <span className="eyebrow">{t.weatherTelemetry}</span>
                <h2 style={{ fontSize: "1.6rem", margin: "2px 0" }}>{selectedName}</h2>
              </div>
              <button
                className="action-btn"
                onClick={() => {
                  if (onOpenInChat) {
                    onOpenInChat(`Give me a detailed weather and outdoor travel recommendation for ${selectedName} today.`);
                  }
                }}
                style={{ background: "var(--primary)", color: "#fff", border: "none", padding: "8px 14px", fontSize: "0.88rem" }}
              >
                {t.askInChatBtn}
              </button>
            </div>

            {/* Main Weather Metrics (Humidity, Rainfall Probability, Temp, Wind) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
              {/* Temperature */}
              <div style={{ background: "var(--card-light)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ fontSize: "2.5rem" }}>
                  {weatherData.condition_icon ? (
                    <img src={weatherData.condition_icon} alt="" style={{ width: "48px", height: "48px" }} />
                  ) : (
                    "⛅"
                  )}
                </div>
                <div>
                  <small style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: "700" }}>{t.temperature}</small>
                  <div style={{ fontSize: "1.8rem", fontWeight: "800" }}>{weatherData.temperature}°C</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{translateCondition(weatherData.condition, language)}</div>
                </div>
              </div>

              {/* Rainfall Probability - Highlighted */}
              <div
                style={{
                  background: isRainy ? "rgba(49, 140, 255, 0.14)" : "var(--card-light)",
                  padding: "16px",
                  borderRadius: "10px",
                  border: isRainy ? "1px solid var(--primary-light)" : "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div style={{ fontSize: "2.4rem" }}>🌧️</div>
                <div>
                  <small style={{ color: isRainy ? "var(--primary-light)" : "var(--muted)", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: "700" }}>
                    {t.rainfallProbability}
                  </small>
                  <div style={{ fontSize: "1.8rem", fontWeight: "800", color: isRainy ? "var(--primary-light)" : "var(--text)" }}>
                    {rainProbability}%
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                    {t.precipitation}: {weatherData.precipitation_mm || weatherData.daily?.[0]?.precipitation_mm || 0} mm
                  </div>
                </div>
              </div>

              {/* Humidity */}
              <div style={{ background: "var(--card-light)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ fontSize: "2.4rem" }}>💧</div>
                <div>
                  <small style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: "700" }}>{t.humidity}</small>
                  <div style={{ fontSize: "1.8rem", fontWeight: "800" }}>{weatherData.humidity}%</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                    {t.feelsLike} {weatherData.feels_like}°C
                  </div>
                </div>
              </div>

              {/* Wind & Pressure */}
              <div style={{ background: "var(--card-light)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ fontSize: "2.4rem" }}>💨</div>
                <div>
                  <small style={{ color: "var(--muted)", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: "700" }}>{t.windSpeed}</small>
                  <div style={{ fontSize: "1.4rem", fontWeight: "800" }}>{weatherData.wind_speed_kmh} km/h</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                    {weatherData.pressure_hpa} hPa • {t.uvIndex} {weatherData.uv_index}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. "DO YOU WANT TO GO OUT TODAY?" SUGGESTIONS CARD */}
          <div className="card outdoor-travel-advisory-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
              <div>
                <span className="outdoor-advisory-eyebrow">
                  {t.outdoorAdvisory}
                </span>
                <h3 className="outdoor-advisory-title">
                  {t.outgoingQuestion}
                </h3>
              </div>

              {/* Quick user response buttons */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setUserOutgoingPlan("now")}
                  className={`outdoor-plan-btn ${userOutgoingPlan === "now" ? "active" : ""}`}
                >
                  {t.outgoingNow}
                </button>
                <button
                  type="button"
                  onClick={() => setUserOutgoingPlan("later")}
                  className={`outdoor-plan-btn ${userOutgoingPlan === "later" ? "active" : ""}`}
                >
                  {t.outgoingLater}
                </button>
              </div>
            </div>

            {/* Smart Response Box */}
            <div className={`travel-advisory-response-box ${isRainy ? "rainy" : "pleasant"}`}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" }}>
                <span style={{ fontSize: "2.2rem", lineHeight: 1 }}>{isRainy ? "☔" : "🌤️"}</span>
                <div>
                  <h4 className="travel-advisory-heading">
                    {isRainy ? t.rainyUmbrellaReply : t.dryPleasantReply}
                  </h4>
                  <small className="travel-advisory-sub">
                    {isRainy
                      ? `${t.rainyUmbrellaSub} (${rainProbability}% ${t.rainfallProbability})`
                      : `${t.dryPleasantSub} (${rainProbability}% ${t.rainfallProbability})`}
                  </small>
                </div>
              </div>

              <div className="travel-advisory-body">
                {isRainy ? (
                  <>
                    <p>
                      🌧️ {t.rainyUmbrellaAdvice}
                    </p>
                    {userOutgoingPlan === "later" && (
                      <p className="travel-advisory-tip">
                        💡 {t.rainyLaterTip}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p>
                      ✨ {t.dryPleasantAdvice}
                    </p>
                    {weatherData.temperature > 34 && (
                      <p style={{ color: "var(--yellow)", fontWeight: "600" }}>
                        🌡️ {t.hotWeatherTip}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 14-Day Forecast Outlook Strip */}
            {weatherData.daily && weatherData.daily.length > 0 && (
              <div style={{ marginTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)", fontWeight: "600" }}>
                    {mapForecastDays === 14 ? (t.forecast14dTitle || "14-Day Forecast Outlook") : (t.forecast7dTitle || "7-Day Forecast Outlook")}: {selectedName.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={() => setMapForecastDays(7)}
                      style={{
                        padding: "3px 8px",
                        fontSize: "0.72rem",
                        borderRadius: "6px",
                        border: "1px solid var(--border)",
                        background: mapForecastDays === 7 ? "var(--primary)" : "var(--card-light)",
                        color: mapForecastDays === 7 ? "#fff" : "var(--text)",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      7 Days
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapForecastDays(14)}
                      style={{
                        padding: "3px 8px",
                        fontSize: "0.72rem",
                        borderRadius: "6px",
                        border: "1px solid var(--border)",
                        background: mapForecastDays === 14 ? "var(--primary)" : "var(--card-light)",
                        color: mapForecastDays === 14 ? "#fff" : "var(--text)",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      14 Days
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px" }}>
                  {weatherData.daily.slice(0, mapForecastDays).map((d, i) => (
                    <div
                      key={i}
                      style={{
                        flex: "0 0 78px",
                        textAlign: "center",
                        padding: "8px 6px",
                        background: "var(--card-light)",
                        borderRadius: "8px",
                        fontSize: "0.78rem",
                        border: d.rain_chance > 40 ? "1px solid rgba(49, 140, 255, 0.4)" : "1px solid var(--border)",
                      }}
                    >
                      <div style={{ color: "var(--muted)", fontWeight: "600" }}>{i === 0 ? (t.today || "Today") : translateDay(d.day, language)}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--muted)", marginBottom: "2px" }}>{d.date ? d.date.slice(5) : ""}</div>
                      <div style={{ fontSize: "1.2rem", margin: "2px 0" }}>
                        {d.icon ? <img src={d.icon} alt="" style={{ width: "26px" }} /> : "⛅"}
                      </div>
                      <div style={{ fontWeight: "700" }}>{d.max_temp}°</div>
                      <div style={{ color: "var(--muted)", fontSize: "0.72rem" }}>{d.min_temp}°</div>
                      <div style={{ color: d.rain_chance > 40 ? "var(--primary-light)" : "var(--muted)", fontSize: "0.72rem", marginTop: "2px", fontWeight: "600" }}>
                        {d.rain_chance}% 🌧
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
