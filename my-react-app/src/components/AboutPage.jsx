import React from "react";

export default function AboutPage({ language = "English", t = {} }) {
  return (
    <div className="about-page-container">
      {/* Hero Header */}
      <div className="about-hero-card card">
        <div className="about-hero-badge-strip">
          <span className="badge-sih">SIH 2026 OFFICIAL SUBMISSION</span>
          <span className="badge-moes">MINISTRY OF EARTH SCIENCES (MoES)</span>
          <span className="badge-theme">SPACE TECHNOLOGY</span>
        </div>

        <div className="about-hero-content">
          <div className="about-hero-icon">✦</div>
          <div>
            <h1>WeatherGPT: Conversational AI Meteorological Intelligence</h1>
            <p className="about-hero-tagline">
              Problem Statement <strong>SIH26068</strong> &bull; Ministry of Earth Sciences (MoES), Government of India
            </p>
          </div>
        </div>

        <p className="about-hero-desc">
          WeatherGPT bridges complex Numerical Weather Prediction (NWP) models, satellite remote sensing observations, and disaster early warnings with 1.4 billion Indian citizens through an intuitive conversational AI interface. Available in 7 Indian languages with voice speech-to-text, real-time audio sirens, and agronomic decision-support.
        </p>

        <div className="about-stats-grid">
          <div className="stat-card">
            <span className="stat-num">7</span>
            <span className="stat-lbl">Indian Languages</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">0.25°</span>
            <span className="stat-lbl">NWP Grid Resolution</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">13</span>
            <span className="stat-lbl">Agro-Climatic Zones</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">4-Tier</span>
            <span className="stat-lbl">IMD Alert Codes</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">100%</span>
            <span className="stat-lbl">WIS2.0 Open Data</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="about-details-grid">
        {/* CARD 1: PROBLEM STATEMENT & MANDATE */}
        <div className="about-card card">
          <div className="about-card-head">
            <span className="about-card-icon">🏛️</span>
            <div>
              <h3>SIH26068 Problem Statement & Scope</h3>
              <small>Smart India Hackathon 2026 Mandate</small>
            </div>
          </div>
          <div className="about-card-body">
            <table className="about-meta-table">
              <tbody>
                <tr>
                  <td><strong>Problem ID:</strong></td>
                  <td>SIH26068</td>
                </tr>
                <tr>
                  <td><strong>Title:</strong></td>
                  <td>WeatherGPT: Conversational AI for Weather Forecasting, Alerts, and Climate Information</td>
                </tr>
                <tr>
                  <td><strong>Nodal Ministry:</strong></td>
                  <td>Ministry of Earth Sciences (MoES)</td>
                </tr>
                <tr>
                  <td><strong>Domain:</strong></td>
                  <td>Space Technology & Atmospheric Sciences</td>
                </tr>
                <tr>
                  <td><strong>Target Beneficiaries:</strong></td>
                  <td>Farmers, Mariners, Fisherfolk, Disaster Response Teams (NDRF/SDMA), Aviation Pilots, and Indian Citizens</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CARD 2: SCIENTIFIC DATA ENGINES & MODELS */}
        <div className="about-card card">
          <div className="about-card-head">
            <span className="about-card-icon">🛰️</span>
            <div>
              <h3>Meteorological Engines & Data Pipelines</h3>
              <small>Numerical Weather Prediction (NWP) & Remote Sensing</small>
            </div>
          </div>
          <div className="about-card-body">
            <ul className="about-feature-list">
              <li>
                <strong>NOAA GFS (Global Forecast System):</strong> 0.25° global grid multi-layer atmospheric model computing temperature, geopotential height, and precipitation.
              </li>
              <li>
                <strong>ECMWF IFS (European Model):</strong> High-precision numerical model providing multi-ensemble comparison and spread uncertainty estimation.
              </li>
              <li>
                <strong>IMD Disaster Protocols:</strong> India Meteorological Department standardized 4-tier color alerts (Green, Yellow, Orange, Red).
              </li>
              <li>
                <strong>INCOIS Ocean Telemetry:</strong> Indian National Centre for Ocean Information Services tsunami bulletins, sea state, and wave swell heights.
              </li>
              <li>
                <strong>CPCB Air Quality Index:</strong> Central Pollution Control Board PM2.5, PM10, and sub-index air quality categorization.
              </li>
              <li>
                <strong>ICAR 13 Agro-Climatic Zones:</strong> Regional agronomy mapping, soil classifications, and pesticide spraying conditions.
              </li>
            </ul>
          </div>
        </div>

        {/* CARD 3: COMPLETE TECHNOLOGY ARCHITECTURE */}
        <div className="about-card card">
          <div className="about-card-head">
            <span className="about-card-icon">💻</span>
            <div>
              <h3>Full-Stack System Architecture</h3>
              <small>SIH26068 Technology Stack Compliance</small>
            </div>
          </div>
          <div className="about-card-body">
            <div className="tech-stack-pills">
              <div className="tech-group">
                <span className="tech-group-title">Backend API Engine:</span>
                <span className="pill">Python 3.11+</span>
                <span className="pill">FastAPI</span>
                <span className="pill">Pydantic v2</span>
                <span className="pill">Uvicorn ASGI</span>
              </div>
              <div className="tech-group">
                <span className="tech-group-title">Database & Persistence:</span>
                <span className="pill">SQLite / PostgreSQL</span>
                <span className="pill">weathergpt.db</span>
                <span className="pill">Thread-Safe Connection Pool</span>
                <span className="pill">Multi-Session History</span>
              </div>
              <div className="tech-group">
                <span className="tech-group-title">Conversational AI & NLP:</span>
                <span className="pill">Google Gemini 2.5 Flash</span>
                <span className="pill">Domain Meteorological Grounding</span>
                <span className="pill">7 Indic Languages</span>
              </div>
              <div className="tech-group">
                <span className="tech-group-title">Frontend & UI/UX:</span>
                <span className="pill">React 18</span>
                <span className="pill">Vite</span>
                <span className="pill">CSS3 Glassmorphism</span>
                <span className="pill">Interactive Spatial Maps</span>
              </div>
              <div className="tech-group">
                <span className="tech-group-title">Voice & Audio Accessibility:</span>
                <span className="pill">Web Speech API (STT)</span>
                <span className="pill">SpeechSynthesis (TTS)</span>
                <span className="pill">Web Audio API Dual-Oscillator Siren</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: DISASTER LIFE-SAFETY & SIREN PROTOCOL */}
        <div className="about-card card">
          <div className="about-card-head">
            <span className="about-card-icon">🚨</span>
            <div>
              <h3>Disaster Early Warnings & Life Safety</h3>
              <small>NDRF / SDMA Life-Safety Compliance</small>
            </div>
          </div>
          <div className="about-card-body">
            <p>
              WeatherGPT features an integrated early-warning disseminator conforming to the National Disaster Management Authority (NDMA) guidelines:
            </p>
            <ul className="about-feature-list" style={{ marginTop: "10px" }}>
              <li>
                <strong>Automated Acoustic Siren:</strong> Real-time dual-oscillator acoustic synthesizer (450Hz &harr; 920Hz sawtooth fundamental + 900Hz &harr; 1840Hz harmonic) designed to alert residents without external media dependencies.
              </li>
              <li>
                <strong>Official Helplines:</strong> Instant 1-click links to NDRF Control Room (1078), State Emergency Operations Centre (1070), and Emergency Ambulance (108).
              </li>
              <li>
                <strong>Multi-Sector Advisories:</strong> Dedicated decision support matrices for agriculture, aviation (ICAO METAR/TAF), marine safety, and urban smart cities.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="about-footer-card card">
        <div>
          <h4>WeatherGPT AI Meteorological Platform &bull; Version 2.0.0</h4>
          <p>
            Compliant with WMO WIS2.0 Standards &bull; Open Government Data (OGD) Platform India &bull; Ministry of Earth Sciences (MoES)
          </p>
        </div>
        <span className="about-status-badge">● PRODUCTION SYSTEM ACTIVE</span>
      </div>
    </div>
  );
}
