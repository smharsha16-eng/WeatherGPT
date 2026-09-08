import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || (window.location.port === "5173" ? "http://127.0.0.1:8000" : "");

export default function OutfitPlanner({ city, onAskInChat }) {
  const [dayType, setDayType] = useState("tomorrow"); // "today" or "tomorrow"
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async (targetDay = dayType) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/recommendations?city=${encodeURIComponent(city)}&day=${targetDay}`);
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
      }
    } catch (err) {
      console.error("Failed to fetch outfit recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(dayType);
  }, [city, dayType]);

  const w = recommendations?.weather_summary;
  const outfit = recommendations?.outfit;
  const act = recommendations?.activities;

  return (
    <section className="outfit-planner-view">
      {/* Header card with Day Toggle */}
      <div className="card outfit-header-card">
        <div className="outfit-header-left">
          <span className="eyebrow">PERSONALIZED SUGGESTIONS & LIFESTYLE</span>
          <h2>What Should You Wear in {city}?</h2>
          <p>
            Context-aware outfit styling, essential accessories checklist, and outdoor activity advisories.
          </p>
        </div>

        <div className="day-toggle-group">
          <button
            className={`day-toggle-btn ${dayType === "today" ? "active" : ""}`}
            onClick={() => setDayType("today")}
          >
            📅 Today
          </button>
          <button
            className={`day-toggle-btn ${dayType === "tomorrow" ? "active" : ""}`}
            onClick={() => setDayType("tomorrow")}
          >
            ☀️ Tomorrow
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card loading-box">
          <div className="typing-dots" style={{ justifyContent: "center" }}>
            <span></span><span></span><span></span>
          </div>
          <p style={{ marginTop: "12px", color: "var(--muted)" }}>
            Analyzing meteorological models & computing personalized outfit...
          </p>
        </div>
      ) : recommendations ? (
        <>
          {/* Weather & Style Summary Banner */}
          <div className="outfit-banner card">
            <div className="outfit-banner-icon">👔</div>
            <div className="outfit-banner-content">
              <div className="banner-meta-row">
                <span className="banner-tag">{recommendations.day_label}</span>
                <span className="banner-condition">
                  🌡️ {w?.temp_min}°C – {w?.temp_max}°C • {w?.condition} • 💧 Rain {w?.rain_chance}%
                </span>
                <span className="banner-feel">{w?.thermal_feel}</span>
              </div>
              <h3>{outfit?.summary}</h3>
            </div>
          </div>

          {/* 4-Grid Clothing Layout */}
          <div className="clothing-cards-grid">
            {/* TOPS */}
            <div className="card clothing-card">
              <div className="clothing-card-header">
                <span className="clothing-icon">👕</span>
                <h4>Recommended Tops</h4>
              </div>
              <ul className="clothing-list">
                {outfit?.tops?.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>

            {/* BOTTOMS */}
            <div className="card clothing-card">
              <div className="clothing-card-header">
                <span className="clothing-icon">👖</span>
                <h4>Recommended Bottoms</h4>
              </div>
              <ul className="clothing-list">
                {outfit?.bottoms?.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>

            {/* OUTERWEAR */}
            <div className="card clothing-card">
              <div className="clothing-card-header">
                <span className="clothing-icon">🧥</span>
                <h4>Outerwear & Layers</h4>
              </div>
              <ul className="clothing-list">
                {outfit?.outerwear?.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>

            {/* FOOTWEAR */}
            <div className="card clothing-card">
              <div className="clothing-card-header">
                <span className="clothing-icon">👟</span>
                <h4>Footwear Suggestion</h4>
              </div>
              <ul className="clothing-list">
                {outfit?.footwear?.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* TWO COLUMN: ACCESSORIES & ACTIVITY RATINGS */}
          <div className="outfit-details-row">
            {/* ACCESSORIES CHECKLIST */}
            <div className="card accessories-card">
              <div className="card-header">
                <div>
                  <span className="eyebrow">BEFORE YOU STEP OUT</span>
                  <h3>Essential Accessories Checklist</h3>
                </div>
              </div>

              <div className="accessories-list">
                {recommendations.accessories?.map((acc, idx) => (
                  <div key={idx} className={`accessory-item ${acc.needed ? "needed" : "optional"}`}>
                    <div className="accessory-icon-box">{acc.icon}</div>
                    <div className="accessory-content">
                      <div className="accessory-title-row">
                        <strong>{acc.name}</strong>
                        <span className={`acc-badge ${acc.needed ? "badge-urgent" : "badge-neutral"}`}>
                          {acc.level}
                        </span>
                      </div>
                      <p>{acc.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVITY ADVISORIES */}
            <div className="card activities-card">
              <div className="card-header">
                <div>
                  <span className="eyebrow">OUTDOOR FEASIBILITY</span>
                  <h3>Daily Activity Outlook</h3>
                </div>
              </div>

              <div className="activity-list">
                {/* Jogging */}
                <div className="activity-row">
                  <div className="activity-badge-col">
                    <span className="act-icon">🏃</span>
                    <strong>Running / Exercise</strong>
                  </div>
                  <div className="activity-info">
                    <span className="activity-status-pill">{act?.running?.status}</span>
                    <p>{act?.running?.note}</p>
                  </div>
                </div>

                {/* Laundry */}
                <div className="activity-row">
                  <div className="activity-badge-col">
                    <span className="act-icon">🧺</span>
                    <strong>Laundry Drying</strong>
                  </div>
                  <div className="activity-info">
                    <span className="activity-status-pill">{act?.laundry?.status}</span>
                    <p>{act?.laundry?.note}</p>
                  </div>
                </div>

                {/* Commute */}
                <div className="activity-row">
                  <div className="activity-badge-col">
                    <span className="act-icon">🚗</span>
                    <strong>Transit & Commute</strong>
                  </div>
                  <div className="activity-info">
                    <span className="activity-status-pill">{act?.commute?.status}</span>
                    <p>{act?.commute?.note}</p>
                  </div>
                </div>
              </div>

              {/* QUICK CHAT ACTIONS */}
              <div className="outfit-quick-prompts">
                <span className="quick-prompt-label">💬 Ask WeatherGPT AI:</span>
                <div className="quick-chips-row">
                  <button
                    onClick={() =>
                      onAskInChat(`What should I wear ${dayType} in ${city}?`)
                    }
                  >
                    👔 What to wear {dayType}?
                  </button>
                  <button
                    onClick={() =>
                      onAskInChat(`Will I need an umbrella ${dayType} in ${city}?`)
                    }
                  >
                    ☂️ Need an umbrella?
                  </button>
                  <button
                    onClick={() =>
                      onAskInChat(`Is it good for jogging ${dayType} morning in ${city}?`)
                    }
                  >
                    🏃 Good for jogging?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
