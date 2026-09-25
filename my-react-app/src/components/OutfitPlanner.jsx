import { useState, useEffect } from "react";
import {
  getTranslation,
  translateDay,
  translateCondition,
  translateRegionName,
  translateOutfitItem,
  translateThermalFeel,
  translateOutfitSummary,
  translateAccessoryName,
  translateAccessoryLevel,
  translateAccessoryNote,
  translateActivityStatus,
  translateActivityNote,
} from "../utils/translations";

const API_BASE = import.meta.env.VITE_API_BASE || (window.location.port === "5173" ? "http://127.0.0.1:8000" : "");

export default function OutfitPlanner({ city, onAskInChat, language = "English" }) {
  const t = getTranslation(language);
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

  // Weather-grounded accessories calculation fallback if backend list is empty
  const computeAccessories = () => {
    if (recommendations?.accessories && recommendations.accessories.length > 0) {
      return recommendations.accessories;
    }
    const accList = [];
    const rainP = w?.rain_chance || 0;
    const tempMax = w?.temp_max || 28;
    const tempMin = w?.temp_min || 20;
    const uv = w?.uv_index || 5;
    const wind = w?.wind_speed_kmh || 10;
    const isRain = rainP >= 40 || (w?.precipitation_mm || 0) > 0;

    if (isRain) {
      accList.push({
        name: "Sturdy Windproof Umbrella",
        level: "Essential",
        needed: true,
        note: `High rain probability (${rainP}%) — essential protection against wet downpours`,
        icon: "☔",
      });
      accList.push({
        name: "Waterproof Bag Cover / Sleeve",
        level: "Essential",
        needed: true,
        note: "Protects laptop, books, papers, and electronics from rain splashes",
        icon: "🎒",
      });
    }
    if (uv >= 4) {
      accList.push({
        name: "UV-Protection Sunglasses",
        level: "Recommended",
        needed: false,
        note: `Daytime UV index is ${uv} (Moderate/High) — shields eyes from harsh midday glare`,
        icon: "🕶️",
      });
      accList.push({
        name: "Sunscreen (SPF 30+)",
        level: "Recommended",
        needed: false,
        note: "Recommended for open outdoor exposure between 10 AM and 4 PM",
        icon: "🧴",
      });
    }
    if (tempMax >= 30) {
      accList.push({
        name: "Insulated Water Bottle",
        level: "Essential",
        needed: true,
        note: `Stay hydrated throughout the warm afternoon (peaks around ${tempMax}°C)`,
        icon: "💧",
      });
      accList.push({
        name: "Breathable Sun Cap / Hat",
        level: "Recommended",
        needed: false,
        note: "Shields scalp and face from direct radiant solar exposure",
        icon: "🧢",
      });
    }
    if (wind >= 20) {
      accList.push({
        name: "Windproof Scarf / Neck Wrap",
        level: "Recommended",
        needed: false,
        note: `Provides comfortable coverage against brisk winds (${wind} km/h)`,
        icon: "🧣",
      });
    }
    if (tempMin <= 16) {
      accList.push({
        name: "Warm Woolen Scarf or Muffler",
        level: "Essential",
        needed: true,
        note: `Keeps neck and chest warm during chilly lows of ${tempMin}°C`,
        icon: "🧣",
      });
      accList.push({
        name: "Thermal Gloves",
        level: "Recommended",
        needed: false,
        note: "Keeps hands cozy during early morning and evening commute",
        icon: "🧤",
      });
    }
    if (accList.length === 0) {
      accList.push({
        name: "Casual Polarized Sunglasses",
        level: "Recommended",
        needed: false,
        note: "Great accessory for pleasant ambient outdoor travel and walking",
        icon: "🕶️",
      });
      accList.push({
        name: "Compact Travel Water Flask",
        level: "Recommended",
        needed: false,
        note: "Convenient hydration while commuting or running errands",
        icon: "💧",
      });
    }
    return accList;
  };

  const activeAccessories = computeAccessories();

  return (
    <section className="outfit-planner-view">
      {/* Header card with Day Toggle */}
      <div className="card outfit-header-card">
        <div className="outfit-header-left">
          <span className="eyebrow">{t.outfit || "PERSONALIZED SUGGESTIONS & LIFESTYLE"}</span>
          <h2>{t.whatShouldWear || "What Should You Wear in"} {translateRegionName(city, language)}?</h2>
          <p>
            {t.outfitSubtitle || "Context-aware outfit styling, essential accessories checklist, and outdoor activity advisories."}
          </p>
        </div>

        <div className="day-toggle-group">
          <button
            className={`day-toggle-btn ${dayType === "today" ? "active" : ""}`}
            onClick={() => setDayType("today")}
          >
            📅 {t.today || "Today"}
          </button>
          <button
            className={`day-toggle-btn ${dayType === "tomorrow" ? "active" : ""}`}
            onClick={() => setDayType("tomorrow")}
          >
            ☀️ {t.tomorrow || "Tomorrow"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card loading-box">
          <div className="typing-dots" style={{ justifyContent: "center" }}>
            <span></span><span></span><span></span>
          </div>
          <p style={{ marginTop: "12px", color: "var(--muted)" }}>
            {t.analyzingOutfit || "Analyzing meteorological models & computing personalized outfit..."}
          </p>
        </div>
      ) : recommendations ? (
        <>
          {/* Weather & Style Summary Banner */}
          <div className="outfit-banner card">
            <div className="outfit-banner-icon">👔</div>
            <div className="outfit-banner-content">
              <div className="banner-meta-row">
                <span className="banner-tag">{translateDay(recommendations.day_label, language)}</span>
                <span className="banner-condition">
                  🌡️ {w?.temp_min}°C – {w?.temp_max}°C • {translateCondition(w?.condition, language)} • 💧 {t.rainProbability || "Rain"} {w?.rain_chance}%
                </span>
                <span className="banner-feel">{translateThermalFeel(w?.thermal_feel, language)}</span>
              </div>
              <h3>{translateOutfitSummary(outfit?.summary, language, w, recommendations?.day_label)}</h3>
            </div>
          </div>

          {/* 4-Grid Clothing Layout */}
          <div className="clothing-cards-grid">
            {/* TOPS */}
            <div className="card clothing-card">
              <div className="clothing-card-header">
                <span className="clothing-icon">👕</span>
                <h4>{t.recommendedTops || "Recommended Tops"}</h4>
              </div>
              <ul className="clothing-list">
                {outfit?.tops?.map((item, idx) => (
                  <li key={idx}>✓ {translateOutfitItem(item, language)}</li>
                ))}
              </ul>
            </div>

            {/* BOTTOMS */}
            <div className="card clothing-card">
              <div className="clothing-card-header">
                <span className="clothing-icon">👖</span>
                <h4>{t.recommendedBottoms || "Recommended Bottoms"}</h4>
              </div>
              <ul className="clothing-list">
                {outfit?.bottoms?.map((item, idx) => (
                  <li key={idx}>✓ {translateOutfitItem(item, language)}</li>
                ))}
              </ul>
            </div>

            {/* OUTERWEAR */}
            <div className="card clothing-card">
              <div className="clothing-card-header">
                <span className="clothing-icon">🧥</span>
                <h4>{t.outerwearLayers || "Outerwear & Layers"}</h4>
              </div>
              <ul className="clothing-list">
                {outfit?.outerwear?.map((item, idx) => (
                  <li key={idx}>✓ {translateOutfitItem(item, language)}</li>
                ))}
              </ul>
            </div>

            {/* FOOTWEAR */}
            <div className="card clothing-card">
              <div className="clothing-card-header">
                <span className="clothing-icon">👟</span>
                <h4>{t.footwearSuggestion || "Footwear Suggestion"}</h4>
              </div>
              <ul className="clothing-list">
                {outfit?.footwear?.map((item, idx) => (
                  <li key={idx}>✓ {translateOutfitItem(item, language)}</li>
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
                  <span className="eyebrow">{t.beforeYouStepOut || "BEFORE YOU STEP OUT"}</span>
                  <h3>{t.essentialAccessories || "Essential Accessories Checklist"}</h3>
                </div>
              </div>

              <div className="accessories-list">
                {activeAccessories.map((acc, idx) => {
                  const accName = acc.name || acc.item || "Accessory";
                  const accLevel = acc.level || (acc.needed ? "Essential" : "Recommended");
                  const accNote = acc.note || acc.reason || "";
                  return (
                    <div key={idx} className={`accessory-item ${acc.needed ? "needed" : "optional"}`}>
                      <div className="accessory-icon-box">{acc.icon || "🎒"}</div>
                      <div className="accessory-content">
                        <div className="accessory-title-row">
                          <strong>{translateAccessoryName(accName, language)}</strong>
                          <span className={`acc-badge ${acc.needed ? "badge-urgent" : "badge-neutral"}`}>
                            {translateAccessoryLevel(accLevel, language)}
                          </span>
                        </div>
                        <p>{translateAccessoryNote(accNote, language, w)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTIVITY ADVISORIES */}
            <div className="card activities-card">
              <div className="card-header">
                <div>
                  <span className="eyebrow">{t.outdoorFeasibility || "OUTDOOR FEASIBILITY"}</span>
                  <h3>{t.dailyActivityOutlook || "Daily Activity Outlook"}</h3>
                </div>
              </div>

              <div className="activity-list">
                {/* Jogging */}
                <div className="activity-row">
                  <div className="activity-badge-col">
                    <span className="act-icon">🏃</span>
                    <strong>{t.runningExercise || "Running / Exercise"}</strong>
                  </div>
                  <div className="activity-info">
                    <span className="activity-status-pill">
                      {translateActivityStatus(act?.running?.status, language)}
                    </span>
                    <p>{translateActivityNote(act?.running?.note || act?.running?.advice, language)}</p>
                  </div>
                </div>

                {/* Laundry */}
                <div className="activity-row">
                  <div className="activity-badge-col">
                    <span className="act-icon">🧺</span>
                    <strong>{t.laundryDrying || "Laundry Drying"}</strong>
                  </div>
                  <div className="activity-info">
                    <span className="activity-status-pill">
                      {translateActivityStatus(act?.laundry?.status, language)}
                    </span>
                    <p>{translateActivityNote(act?.laundry?.note || act?.laundry?.advice, language)}</p>
                  </div>
                </div>

                {/* Commute */}
                <div className="activity-row">
                  <div className="activity-badge-col">
                    <span className="act-icon">🚗</span>
                    <strong>{t.transitCommute || "Transit & Commute"}</strong>
                  </div>
                  <div className="activity-info">
                    <span className="activity-status-pill">
                      {translateActivityStatus(act?.commute?.status, language)}
                    </span>
                    <p>{translateActivityNote(act?.commute?.note || act?.commute?.advice, language)}</p>
                  </div>
                </div>
              </div>

              {/* QUICK CHAT ACTIONS */}
              <div className="outfit-quick-prompts">
                <span className="quick-prompt-label">💬 {t.askWeatherGptAi || "Ask WeatherGPT AI:"}</span>
                <div className="quick-chips-row">
                  <button
                    onClick={() =>
                      onAskInChat(`What should I wear ${dayType} in ${city}?`)
                    }
                  >
                    👔 {t.whatToWearPrompt || "What to wear"} {dayType === "today" ? (t.today || "today") : (t.tomorrow || "tomorrow")}?
                  </button>
                  <button
                    onClick={() =>
                      onAskInChat(`Will I need an umbrella ${dayType} in ${city}?`)
                    }
                  >
                    ☂️ {t.umbrellaPrompt || "Need an umbrella?"}
                  </button>
                  <button
                    onClick={() =>
                      onAskInChat(`Is it good for jogging ${dayType} morning in ${city}?`)
                    }
                  >
                    🏃 {t.joggingPrompt || "Good for jogging?"}
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
