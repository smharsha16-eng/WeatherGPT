import React, { useState, useEffect } from "react";

export default function PastWeatherPage({
  apiBase,
  language = "English",
  onSelectCity,
}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCity, setFilterCity] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // "cards" | "table"
  const [message, setMessage] = useState(null);

  const fetchHistory = async (city = "") => {
    setLoading(true);
    try {
      const url = city
        ? `${apiBase}/api/weather/history?city=${encodeURIComponent(city)}&limit=100`
        : `${apiBase}/api/weather/history?limit=100`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error("Fetch history error:", err);
      setMessage("⚠️ Failed to load historical weather observations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(filterCity);
  }, [filterCity]);

  const handleClearHistory = async () => {
    if (!window.confirm("Are you sure you want to permanently clear past weather observation records?")) {
      return;
    }
    try {
      const url = filterCity
        ? `${apiBase}/api/weather/history?city=${encodeURIComponent(filterCity)}`
        : `${apiBase}/api/weather/history`;
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        setHistory([]);
        setMessage("✓ Historical weather records cleared successfully.");
        setTimeout(() => setMessage(null), 3500);
      }
    } catch (err) {
      console.error("Clear history error:", err);
      setMessage("⚠️ Failed to clear history.");
    }
  };

  const handleExportCSV = () => {
    if (!history.length) return;
    const headers = ["ID", "City", "Latitude", "Longitude", "Temperature (°C)", "Feels Like (°C)", "Condition", "Humidity (%)", "Wind Speed (km/h)", "Pressure (hPa)", "AQI Status", "Recorded At (UTC)"];
    const rows = history.map((r) => [
      r.id,
      `"${r.city}"`,
      r.lat,
      r.lon,
      r.temperature,
      r.feels_like,
      `"${r.condition}"`,
      r.humidity,
      r.wind_speed_kmh,
      r.pressure_hpa,
      `"${r.aqi_status || ''}"`,
      `"${r.recorded_at}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `weathergpt_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Extract unique cities recorded
  const uniqueCities = Array.from(new Set(history.map((h) => h.city))).filter(Boolean);

  // Compute analytics
  const temps = history.map((h) => h.temperature).filter((t) => typeof t === "number");
  const minTemp = temps.length ? Math.min(...temps) : 0;
  const maxTemp = temps.length ? Math.max(...temps) : 0;
  const avgTemp = temps.length ? Math.round((temps.reduce((a, b) => a + b, 0) / temps.length) * 10) / 10 : 0;

  return (
    <div className="past-weather-container" style={{ padding: "8px 0" }}>
      {/* HEADER SECTION */}
      <div className="section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <span className="eyebrow">PERSISTENT OBSERVATIONAL ARCHIVE</span>
          <h2 style={{ fontSize: "1.75rem", margin: "4px 0 6px 0", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>📜</span> Historical Weather Archive
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.92rem", margin: 0 }}>
            Chronological records and past observation snapshots saved to SQLite database.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="action-btn"
            onClick={() => fetchHistory(filterCity)}
            style={{ padding: "8px 14px", borderRadius: "8px", background: "var(--card-light)", border: "1px solid var(--border)", color: "var(--text)", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" }}
          >
            🔄 Refresh
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={handleExportCSV}
            disabled={!history.length}
            style={{ padding: "8px 14px", borderRadius: "8px", background: "var(--card-light)", border: "1px solid var(--border)", color: "var(--text)", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600", opacity: history.length ? 1 : 0.5 }}
          >
            📥 Export CSV
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={handleClearHistory}
            disabled={!history.length}
            style={{ padding: "8px 14px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#ef4444", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600", opacity: history.length ? 1 : 0.5 }}
          >
            🗑️ Clear History
          </button>
        </div>
      </div>

      {message && (
        <div style={{ padding: "10px 16px", marginBottom: "18px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", color: "#10b981", fontSize: "0.88rem" }}>
          {message}
        </div>
      )}

      {/* METRIC KPI ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <div className="card" style={{ padding: "18px 20px" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "700" }}>Total Snapshots</span>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary-light)", marginTop: "4px" }}>
            {history.length}
          </div>
          <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>Recorded in database</small>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "700" }}>Tracked Cities</span>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#10b981", marginTop: "4px" }}>
            {uniqueCities.length}
          </div>
          <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>Unique geographical regions</small>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "700" }}>Average Temperature</span>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#f59e0b", marginTop: "4px" }}>
            {history.length ? `${avgTemp}°C` : "N/A"}
          </div>
          <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>Across all recorded sessions</small>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "700" }}>Temperature Range</span>
          <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#a855f7", marginTop: "4px" }}>
            {history.length ? `${minTemp}° - ${maxTemp}°C` : "N/A"}
          </div>
          <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>Min to max recorded variance</small>
        </div>
      </div>

      {/* FILTER & VIEW TOGGLE BAR */}
      <div className="card" style={{ padding: "14px 18px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Filter past records by city name..."
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text)",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
          {filterCity && (
            <button
              type="button"
              onClick={() => setFilterCity("")}
              style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "14px" }}
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: viewMode === "cards" ? "var(--primary)" : "var(--bg)",
              color: viewMode === "cards" ? "#fff" : "var(--muted)",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: "600",
            }}
          >
            Cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: viewMode === "table" ? "var(--primary)" : "var(--bg)",
              color: viewMode === "table" ? "#fff" : "var(--muted)",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: "600",
            }}
          >
            Table
          </button>
        </div>
      </div>

      {/* CONTENT: CARDS OR TABLE */}
      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
          ⏳ Loading historical weather archive...
        </div>
      ) : history.length === 0 ? (
        <div className="card" style={{ padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📜</div>
          <h3 style={{ margin: "0 0 6px 0", color: "var(--text)" }}>No Past Weather Records Found</h3>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto 16px auto" }}>
            Every time you inspect live weather, search a city, or detect your current GPS location, a persistent observation snapshot is automatically recorded here.
          </p>
          <button
            type="button"
            onClick={() => fetchHistory("")}
            className="ask-btn"
            style={{ padding: "8px 18px", borderRadius: "8px" }}
          >
            Check for New Records
          </button>
        </div>
      ) : viewMode === "cards" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
          {history.map((rec) => {
            const formattedDate = rec.recorded_at
              ? new Date(rec.recorded_at).toLocaleString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Just now";

            return (
              <div
                key={rec.id}
                className="card history-item-card"
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  border: "1px solid var(--border)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <strong style={{ fontSize: "1.1rem", color: "var(--text)", display: "block" }}>
                        📍 {rec.city}
                      </strong>
                      <small style={{ color: "var(--muted)", fontSize: "0.75rem" }}>
                        {formattedDate}
                      </small>
                    </div>
                    {rec.condition_icon ? (
                      <img src={rec.condition_icon} alt={rec.condition} style={{ width: "36px", height: "36px", objectFit: "contain" }} onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn.weatherapi.com/weather/64x64/day/116.png"; }} />
                    ) : (
                      <span style={{ fontSize: "1.8rem" }}>⛅</span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "8px 0" }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--primary-light)" }}>
                      {rec.temperature}°C
                    </span>
                    <span style={{ fontSize: "0.84rem", color: "var(--muted)" }}>
                      Feels {rec.feels_like}°C
                    </span>
                  </div>

                  <div style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: "500", marginBottom: "12px" }}>
                    {rec.condition}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "10px", background: "var(--bg)", borderRadius: "8px", fontSize: "0.78rem", color: "var(--muted)" }}>
                    <div>💧 Humidity: <strong style={{ color: "var(--text)" }}>{rec.humidity}%</strong></div>
                    <div>💨 Wind: <strong style={{ color: "var(--text)" }}>{rec.wind_speed_kmh} km/h</strong></div>
                    <div>⏲️ Pressure: <strong style={{ color: "var(--text)" }}>{rec.pressure_hpa} hPa</strong></div>
                    <div>🌱 AQI: <strong style={{ color: "#10b981" }}>{rec.aqi_status || "Moderate"}</strong></div>
                  </div>
                </div>

                <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "10px" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "monospace" }}>
                    {rec.lat ? `${rec.lat.toFixed(2)}°N, ${rec.lon.toFixed(2)}°E` : ""}
                  </span>
                  {onSelectCity && (
                    <button
                      type="button"
                      onClick={() => onSelectCity(rec.city)}
                      style={{
                        padding: "4px 10px",
                        background: "rgba(37, 99, 235, 0.15)",
                        border: "1px solid var(--primary-light)",
                        borderRadius: "6px",
                        color: "var(--primary-light)",
                        fontSize: "0.76rem",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      View Live →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ padding: "0", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(0,0,0,0.12)", color: "var(--muted)", fontSize: "0.78rem" }}>
                <th style={{ padding: "12px 16px" }}>RECORDED TIME</th>
                <th style={{ padding: "12px 16px" }}>CITY / REGION</th>
                <th style={{ padding: "12px 16px" }}>TEMPERATURE</th>
                <th style={{ padding: "12px 16px" }}>CONDITION</th>
                <th style={{ padding: "12px 16px" }}>HUMIDITY</th>
                <th style={{ padding: "12px 16px" }}>WIND</th>
                <th style={{ padding: "12px 16px" }}>PRESSURE</th>
                <th style={{ padding: "12px 16px" }}>AQI</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {history.map((rec) => (
                <tr key={rec.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--muted)", whiteSpace: "nowrap" }}>
                    {new Date(rec.recorded_at).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text)" }}>
                    📍 {rec.city}
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: "700", color: "var(--primary-light)" }}>
                    {rec.temperature}°C <small style={{ color: "var(--muted)", fontWeight: "400" }}>({rec.feels_like}°)</small>
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--text)" }}>
                    {rec.condition}
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                    {rec.humidity}%
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                    {rec.wind_speed_kmh} km/h
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--muted)" }}>
                    {rec.pressure_hpa} hPa
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "0.72rem", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", fontWeight: "600" }}>
                      {rec.aqi_status || "Good"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    {onSelectCity && (
                      <button
                        type="button"
                        onClick={() => onSelectCity(rec.city)}
                        style={{
                          padding: "4px 10px",
                          background: "transparent",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          color: "var(--primary-light)",
                          fontSize: "0.76rem",
                          cursor: "pointer",
                        }}
                      >
                        Inspect
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
