import { useState, useEffect } from "react";

const POPULAR_CITIES = [
  "Bengaluru",
  "New Delhi",
  "Mumbai",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Guwahati",
];

export default function SettingsPage({
  currentSettings,
  onUpdateSettings,
  onClearHistory,
  language,
  setLanguage,
  city,
  setCity,
  theme,
  onThemeChange,
  playTestSiren,
  stopSiren,
  isSirenActive,
  t = {},
}) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("weathergpt_user_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      tempUnit: "C", // C or F
      windUnit: "kmh", // kmh, ms, knots, mph
      pressureUnit: "hPa", // hPa, inHg, mmHg
      precipUnit: "mm", // mm, in
      defaultNwpModel: "weatherapi", // weatherapi, gfs, ecmwf
      forecastHorizon: 14, // 7 or 14
      autoSirenOnRedAlert: true,
      sirenVolume: 0.75, // 0.4, 0.75, 1.0
      autoSpeakVoiceReply: true,
      speechRate: 1.0, // 0.8, 1.0, 1.2
      timeFormat: "12h", // 12h or 24h
      autoRefreshMinutes: 5, // 0, 1, 5, 15, 30
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [tempCity, setTempCity] = useState(city);
  const [clearStatus, setClearStatus] = useState("");

  const handleChange = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem("weathergpt_user_settings", JSON.stringify(updated));
    if (onUpdateSettings) onUpdateSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCityChange = (newCity) => {
    setTempCity(newCity);
    setCity(newCity);
    localStorage.setItem("weathergpt_default_city", newCity);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all settings to default values?")) {
      const defaults = {
        tempUnit: "C",
        windUnit: "kmh",
        pressureUnit: "hPa",
        precipUnit: "mm",
        defaultNwpModel: "weatherapi",
        forecastHorizon: 14,
        autoSirenOnRedAlert: true,
        sirenVolume: 0.75,
        autoSpeakVoiceReply: true,
        speechRate: 1.0,
        timeFormat: "12h",
        autoRefreshMinutes: 5,
      };
      setSettings(defaults);
      localStorage.setItem("weathergpt_user_settings", JSON.stringify(defaults));
      if (onUpdateSettings) onUpdateSettings(defaults);
      setLanguage("English");
      onThemeChange("default");
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleClearHistoryClick = async () => {
    if (
      window.confirm(
        t.clearHistoryConfirm ||
          "Are you sure you want to permanently clear all conversation history from the database?"
      )
    ) {
      setClearStatus("clearing");
      try {
        await onClearHistory();
        setClearStatus("success");
        setTimeout(() => setClearStatus(""), 3000);
      } catch (err) {
        setClearStatus("error");
        setTimeout(() => setClearStatus(""), 3000);
      }
    }
  };

  return (
    <div className="settings-page-container">
      {/* Header */}
      <div className="settings-header card">
        <div className="settings-title-col">
          <span className="eyebrow">⚙️ PREFERENCES & CONFIGURATION</span>
          <h2>{t.settings || "Settings"}</h2>
          <p className="settings-sub">
            Customize meteorological measurement units, disaster alarm thresholds, AI voice synthesis, and regional defaults.
          </p>
        </div>

        {savedSuccess && (
          <div className="settings-toast-badge">
            <span>✓</span> Preferences saved successfully
          </div>
        )}
      </div>

      <div className="settings-grid">
        {/* SECTION 1: REGIONAL & LANGUAGE PREFERENCES */}
        <div className="settings-card card">
          <div className="settings-section-head">
            <span className="settings-section-icon">🌐</span>
            <div>
              <h3>Regional & Language Preferences</h3>
              <p>Select your native Indic language and default meteorological location.</p>
            </div>
          </div>

          <div className="settings-field-group">
            <label className="settings-label">Preferred Application Language:</label>
            <div className="settings-pills-row">
              {[
                { label: "English", val: "English" },
                { label: "हिन्दी (Hindi)", val: "हिन्दी" },
                { label: "ಕನ್ನಡ (Kannada)", val: "ಕನ್ನಡ" },
                { label: "தமிழ் (Tamil)", val: "தமிழ்" },
                { label: "తెలుగు (Telugu)", val: "తెలుగు" },
                { label: "मराठी (Marathi)", val: "मराठी" },
                { label: "বাংলা (Bengali)", val: "বাংলা" },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  className={`settings-pill-btn ${language === item.val ? "active" : ""}`}
                  onClick={() => setLanguage(item.val)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-field-group" style={{ marginTop: "18px" }}>
            <label className="settings-label">Default City / Monitoring Location:</label>
            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <input
                type="text"
                value={tempCity}
                onChange={(e) => setTempCity(e.target.value)}
                placeholder="Enter city or district name"
                className="settings-input"
              />
              <button
                type="button"
                className="outline-button"
                onClick={() => handleCityChange(tempCity)}
              >
                Set Location
              </button>
            </div>

            <div className="settings-quick-cities">
              <small>Popular Indian Cities:</small>
              <div className="quick-city-tags">
                {POPULAR_CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`city-tag ${city.toLowerCase() === c.toLowerCase() ? "selected" : ""}`}
                    onClick={() => handleCityChange(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: METEOROLOGICAL MEASUREMENT UNITS */}
        <div className="settings-card card">
          <div className="settings-section-head">
            <span className="settings-section-icon">🌡️</span>
            <div>
              <h3>Meteorological Units</h3>
              <p>Configure units for temperature, wind speed, pressure, and rain.</p>
            </div>
          </div>

          <div className="settings-row-pair">
            <div className="settings-subfield">
              <label>Temperature Unit:</label>
              <div className="unit-toggle-group">
                <button
                  type="button"
                  className={settings.tempUnit === "C" ? "active" : ""}
                  onClick={() => handleChange("tempUnit", "C")}
                >
                  Celsius (°C)
                </button>
                <button
                  type="button"
                  className={settings.tempUnit === "F" ? "active" : ""}
                  onClick={() => handleChange("tempUnit", "F")}
                >
                  Fahrenheit (°F)
                </button>
              </div>
            </div>

            <div className="settings-subfield">
              <label>Wind Speed Unit:</label>
              <select
                value={settings.windUnit}
                onChange={(e) => handleChange("windUnit", e.target.value)}
                className="settings-select"
              >
                <option value="kmh">Kilometers / Hour (km/h)</option>
                <option value="ms">Meters / Second (m/s)</option>
                <option value="knots">Knots (Aviation & Marine)</option>
                <option value="mph">Miles / Hour (mph)</option>
              </select>
            </div>
          </div>

          <div className="settings-row-pair" style={{ marginTop: "14px" }}>
            <div className="settings-subfield">
              <label>Surface Pressure Unit:</label>
              <select
                value={settings.pressureUnit}
                onChange={(e) => handleChange("pressureUnit", e.target.value)}
                className="settings-select"
              >
                <option value="hPa">Hectopascals (hPa / mbar)</option>
                <option value="inHg">Inches of Mercury (inHg)</option>
                <option value="mmHg">Millimeters of Mercury (mmHg)</option>
              </select>
            </div>

            <div className="settings-subfield">
              <label>Precipitation Measurement:</label>
              <select
                value={settings.precipUnit}
                onChange={(e) => handleChange("precipUnit", e.target.value)}
                className="settings-select"
              >
                <option value="mm">Millimeters (mm)</option>
                <option value="in">Inches (in)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: NUMERICAL WEATHER PREDICTION (NWP) */}
        <div className="settings-card card">
          <div className="settings-section-head">
            <span className="settings-section-icon">🌐</span>
            <div>
              <h3>Forecasting & NWP Models</h3>
              <p>Configure default numerical model calculation engines.</p>
            </div>
          </div>

          <div className="settings-field-group">
            <label className="settings-label">Primary Forecasting Engine:</label>
            <div className="settings-pills-row">
              <button
                type="button"
                className={`settings-pill-btn ${settings.defaultNwpModel === "weatherapi" ? "active" : ""}`}
                onClick={() => handleChange("defaultNwpModel", "weatherapi")}
              >
                WeatherAPI Multi-Model Ensemble
              </button>
              <button
                type="button"
                className={`settings-pill-btn ${settings.defaultNwpModel === "gfs" ? "active" : ""}`}
                onClick={() => handleChange("defaultNwpModel", "gfs")}
              >
                NOAA GFS (0.25° Global Model)
              </button>
              <button
                type="button"
                className={`settings-pill-btn ${settings.defaultNwpModel === "ecmwf" ? "active" : ""}`}
                onClick={() => handleChange("defaultNwpModel", "ecmwf")}
              >
                ECMWF IFS (European Grid)
              </button>
            </div>
          </div>

          <div className="settings-field-group" style={{ marginTop: "16px" }}>
            <label className="settings-label">Default Forecast Range:</label>
            <div className="unit-toggle-group" style={{ maxWidth: "300px" }}>
              <button
                type="button"
                className={settings.forecastHorizon === 7 ? "active" : ""}
                onClick={() => handleChange("forecastHorizon", 7)}
              >
                7-Day Outlook
              </button>
              <button
                type="button"
                className={settings.forecastHorizon === 14 ? "active" : ""}
                onClick={() => handleChange("forecastHorizon", 14)}
              >
                14-Day Extended Horizon
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: EMERGENCY ALARM & SIREN SETTINGS */}
        <div className="settings-card card">
          <div className="settings-section-head">
            <span className="settings-section-icon">🚨</span>
            <div>
              <h3>Disaster Warnings & Siren Audio</h3>
              <p>Emergency siren alert controls powered by Web Audio API synthesizers.</p>
            </div>
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Automated Siren on Red Alert:</strong>
              <p>Automatically triggers loud dual-oscillator acoustic siren when IMD Red Alert is issued.</p>
            </div>
            <button
              type="button"
              className={`toggle-switch ${settings.autoSirenOnRedAlert ? "on" : "off"}`}
              onClick={() => handleChange("autoSirenOnRedAlert", !settings.autoSirenOnRedAlert)}
            >
              <span className="switch-handle"></span>
            </button>
          </div>

          <div className="settings-toggle-row" style={{ marginTop: "14px" }}>
            <div>
              <strong>Emergency Siren Sound Level:</strong>
              <p>Regulate master acoustic gain for disaster sirens.</p>
            </div>
            <div className="unit-toggle-group">
              <button
                type="button"
                className={settings.sirenVolume === 0.4 ? "active" : ""}
                onClick={() => handleChange("sirenVolume", 0.4)}
              >
                Medium (40%)
              </button>
              <button
                type="button"
                className={settings.sirenVolume === 0.75 ? "active" : ""}
                onClick={() => handleChange("sirenVolume", 0.75)}
              >
                Loud (75%)
              </button>
              <button
                type="button"
                className={settings.sirenVolume === 1.0 ? "active" : ""}
                onClick={() => handleChange("sirenVolume", 1.0)}
              >
                Max NDRF (100%)
              </button>
            </div>
          </div>

          <div style={{ marginTop: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
            {isSirenActive ? (
              <button type="button" className="settings-test-siren-btn stop" onClick={stopSiren}>
                ⏹ Stop Siren
              </button>
            ) : (
              <button
                type="button"
                className="settings-test-siren-btn"
                onClick={() => playTestSiren(settings.sirenVolume > 0.6)}
              >
                🔊 Test Siren Audio (2s Preview)
              </button>
            )}
            <small style={{ color: "var(--muted)" }}>Synthesizes authentic 450Hz &lt;&gt; 920Hz MoES wail</small>
          </div>
        </div>

        {/* SECTION 5: THEME & DISPLAY */}
        <div className="settings-card card">
          <div className="settings-section-head">
            <span className="settings-section-icon">🎨</span>
            <div>
              <h3>Theme & Visual Appearance</h3>
              <p>Configure daylight, midnight, or meteor atmospheric themes.</p>
            </div>
          </div>

          <div className="settings-pills-row">
            <button
              type="button"
              className={`settings-pill-btn ${theme === "default" ? "active" : ""}`}
              onClick={() => onThemeChange("default")}
            >
              🌌 Meteor Atmospheric (Default)
            </button>
            <button
              type="button"
              className={`settings-pill-btn ${theme === "dark" ? "active" : ""}`}
              onClick={() => onThemeChange("dark")}
            >
              🌑 Deep Midnight Dark
            </button>
            <button
              type="button"
              className={`settings-pill-btn ${theme === "light" ? "active" : ""}`}
              onClick={() => onThemeChange("light")}
            >
              ☀️ Daylight Clean Light
            </button>
          </div>
        </div>

        {/* SECTION 6: PERSISTENT DATABASE & CHAT HISTORY MANAGEMENT */}
        <div className="settings-card card danger-card">
          <div className="settings-section-head">
            <span className="settings-section-icon">💾</span>
            <div>
              <h3>Database & Conversation History</h3>
              <p>Persistent SQLite relational database storage for WeatherGPT sessions.</p>
            </div>
          </div>

          <div className="db-status-strip">
            <div className="db-indicator">
              <span className="db-pulse-dot"></span>
              <span><strong>SQLite Database:</strong> weathergpt.db Connected</span>
            </div>
            <span className="db-badge">SIH26068 Compliant</span>
          </div>

          <div className="database-actions-row" style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="clear-history-action-btn"
              onClick={handleClearHistoryClick}
              disabled={clearStatus === "clearing"}
            >
              🗑️ {clearStatus === "clearing" ? "Clearing Database..." : (t.clearHistory || "Clear All Chat History")}
            </button>

            <button
              type="button"
              className="reset-defaults-action-btn"
              onClick={handleResetDefaults}
            >
              ↺ Reset Settings to Defaults
            </button>
          </div>

          {clearStatus === "success" && (
            <p className="db-action-status success">✓ All chat conversations and message logs have been wiped from SQLite database.</p>
          )}
          {clearStatus === "error" && (
            <p className="db-action-status error">⚠ Could not clear history. Please check backend connection.</p>
          )}
        </div>
      </div>
    </div>
  );
}
