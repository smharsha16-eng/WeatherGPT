import { useState, useEffect, useRef } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import OutfitPlanner from "./components/OutfitPlanner";
import NwpComparison from "./components/NwpComparison";
import WeatherMapPage from "./components/WeatherMapPage";
import WeatherVisualScene from "./components/WeatherVisualScene";

const API_BASE = import.meta.env.VITE_API_BASE || (window.location.port === "5173" ? "http://127.0.0.1:8000" : "");

import {
  TRANSLATIONS,
  LANG_CODE_MAP,
  translateCondition,
  translateRiskLevel,
  translateStatus,
  getTranslation,
} from "./utils/translations";

export default function App() {
  const [city, setCity] = useState("Bengaluru");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [alertsData, setAlertsData] = useState([]);
  const [advisoriesData, setAdvisoriesData] = useState(null);
  const [climateData, setClimateData] = useState(null);
  const [aviationAirport, setAviationAirport] = useState("VOBL");
  const [aviationData, setAviationData] = useState(null);
  const [nwpCompareData, setNwpCompareData] = useState(null);
  const [nwpCompareLoading, setNwpCompareLoading] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [activeDisaster, setActiveDisaster] = useState(null);
  const [showDisasterModal, setShowDisasterModal] = useState(false);
  const [simulatedDisaster, setSimulatedDisaster] = useState(null);
  const audioCtxRef = useRef(null);
  const sirenNodesRef = useRef([]);

  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedNwpModel, setSelectedNwpModel] = useState("weatherapi");
  const [selectedSector, setSelectedSector] = useState("agriculture");
  const [language, setLanguage] = useState("English");
  const t = getTranslation(language);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Theme Management: "default", "dark", or "light"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("weathergpt_theme") || "default";
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("weathergpt_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Audio Emergency Siren Synthesizer using Web Audio API
  // Loud (0.75 gain), authentic dual-oscillator wail (450Hz <-> 920Hz sawtooth fundamental + 900Hz <-> 1840Hz harmonic)
  const stopEmergencySiren = () => {
    try {
      if (sirenNodesRef.current) {
        sirenNodesRef.current.forEach((node) => {
          try {
            if (node.stop) node.stop();
            if (node.disconnect) node.disconnect();
          } catch (e) {}
        });
        sirenNodesRef.current = [];
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch (err) {
      console.warn("Stop siren error:", err);
    }
    setIsSirenActive(false);
  };

  const playEmergencySiren = (loud = true) => {
    try {
      stopEmergencySiren();
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const duration = 7.5; // 7.5 seconds of authentic emergency wail

      // Master Gain: 0.75 loud volume
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(loud ? 0.75 : 0.4, now);
      masterGain.connect(audioCtx.destination);

      // Primary oscillator: Sawtooth wave sweeping 450Hz <-> 920Hz
      const osc1 = audioCtx.createOscillator();
      osc1.type = "sawtooth";

      // Repeating wails
      osc1.frequency.setValueAtTime(450, now);
      osc1.frequency.linearRampToValueAtTime(920, now + 0.6);
      osc1.frequency.linearRampToValueAtTime(450, now + 1.2);
      osc1.frequency.linearRampToValueAtTime(920, now + 1.8);
      osc1.frequency.linearRampToValueAtTime(450, now + 2.4);
      osc1.frequency.linearRampToValueAtTime(920, now + 3.0);
      osc1.frequency.linearRampToValueAtTime(450, now + 3.6);
      osc1.frequency.linearRampToValueAtTime(920, now + 4.2);
      osc1.frequency.linearRampToValueAtTime(450, now + 4.8);
      osc1.frequency.linearRampToValueAtTime(920, now + 5.4);
      osc1.frequency.linearRampToValueAtTime(450, now + 6.0);
      osc1.frequency.linearRampToValueAtTime(920, now + 6.6);
      osc1.frequency.linearRampToValueAtTime(450, now + 7.2);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Secondary oscillator: Piercing harmonic (triangle wave 900Hz <-> 1840Hz)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "triangle";
      gain2.gain.setValueAtTime(0.35, now);

      osc2.frequency.setValueAtTime(900, now);
      osc2.frequency.linearRampToValueAtTime(1840, now + 0.6);
      osc2.frequency.linearRampToValueAtTime(900, now + 1.2);
      osc2.frequency.linearRampToValueAtTime(1840, now + 1.8);
      osc2.frequency.linearRampToValueAtTime(900, now + 2.4);
      osc2.frequency.linearRampToValueAtTime(1840, now + 3.0);
      osc2.frequency.linearRampToValueAtTime(900, now + 3.6);
      osc2.frequency.linearRampToValueAtTime(1840, now + 4.2);
      osc2.frequency.linearRampToValueAtTime(900, now + 4.8);
      osc2.frequency.linearRampToValueAtTime(1840, now + 5.4);
      osc2.frequency.linearRampToValueAtTime(900, now + 6.0);
      osc2.frequency.linearRampToValueAtTime(1840, now + 6.6);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(masterGain);
      osc2.connect(gain2);
      gain2.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      sirenNodesRef.current = [osc1, osc2, masterGain, gain2];
      setIsSirenActive(true);

      setTimeout(() => {
        setIsSirenActive(false);
      }, duration * 1000);
    } catch (e) {
      console.error("Audio siren error:", e);
    }
  };

  // Helper to check if alerts contain an ACTUAL critical severe disaster (Red Alert) & trigger siren
  const checkAndTriggerDisaster = (alertsList, locationLabel = city, autoSound = true) => {
    // Only trigger if an actual Red Alert / Critical Severe Disaster is present
    const severe = (alertsList || []).find(
      (a) =>
        a.is_severe_hazard === true &&
        (a.imd_code === "RED" ||
          a.severity === "Red Alert" ||
          a.severity?.toLowerCase().includes("red") ||
          a.level === "critical")
    );

    if (severe) {
      setActiveDisaster({ ...severe, location: severe.location || locationLabel });
      setShowDisasterModal(true);
      if (autoSound) {
        playEmergencySiren(true);
      }
    } else {
      // Clear disaster status if this location does NOT have an active severe disaster
      setActiveDisaster(null);
      setShowDisasterModal(false);
      stopEmergencySiren();
    }
  };

  // Authentication State with Strict Route Protection
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = localStorage.getItem("weathergpt_token");
      const saved = localStorage.getItem("weathergpt_user");
      return (token && saved) ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Initial Route Protection check: verify JWT session token with backend
  useEffect(() => {
    const token = localStorage.getItem("weathergpt_token");
    if (!token) {
      setCurrentUser(null);
      setActivePage("auth");
      return;
    }
    fetch(`${API_BASE}/auth/verify-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("weathergpt_token");
          localStorage.removeItem("weathergpt_user");
          setCurrentUser(null);
          setActivePage("auth");
        }
      })
      .catch((err) => {
        console.warn("Session verification warning:", err);
      });
  }, []);

  const handleLogout = () => {
    stopEmergencySiren();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    localStorage.removeItem("weathergpt_token");
    localStorage.removeItem("weathergpt_user");
    setCurrentUser(null);
    setUserMenuOpen(false);
    setShowAuthModal(false);
    setActivePage("auth");
  };

  // Chat conversation state
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [dashboardForecastDays, setDashboardForecastDays] = useState(14);
  const [nwpForecastDays, setNwpForecastDays] = useState(14);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      text: "👋 **Hello! I am WeatherGPT**, your conversational AI weather intelligence platform.\n\nAsk me anything in your language about:\n• Real-time weather & up to 14-day outlooks\n• Personalized outfit & clothing recommendations\n• Farming & pesticide spraying advisories\n• Severe cyclone, flood & heatwave alerts",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef(null);

  // Load all weather intelligence data for current city
  const fetchAllData = async (targetCity = city, disasterOverride = simulatedDisaster) => {
    setLoading(true);
    try {
      // 1. Live Weather & Metrics
      const weatherUrl = disasterOverride
        ? `${API_BASE}/weather?city=${encodeURIComponent(targetCity)}&disaster=${disasterOverride}`
        : `${API_BASE}/weather?city=${encodeURIComponent(targetCity)}`;
      const resWeather = await fetch(weatherUrl);
      if (resWeather.ok) {
        const wData = await resWeather.json();
        setWeather(wData);
      }

      // 2. Forecast & NWP
      const resForecast = await fetch(`${API_BASE}/forecast?city=${encodeURIComponent(targetCity)}&model=${selectedNwpModel}`);
      if (resForecast.ok) {
        const fData = await resForecast.json();
        setForecastData(fData);
      }

      // 3. Alerts
      const alertsUrl = disasterOverride
        ? `${API_BASE}/alerts?city=${encodeURIComponent(targetCity)}&disaster=${disasterOverride}`
        : `${API_BASE}/alerts?city=${encodeURIComponent(targetCity)}`;
      const resAlerts = await fetch(alertsUrl);
      if (resAlerts.ok) {
        const aData = await resAlerts.json();
        const incomingAlerts = aData.alerts || [];
        setAlertsData(incomingAlerts);
        checkAndTriggerDisaster(incomingAlerts, targetCity);
      }

      // 4. Sector Advisories
      const resAdv = await fetch(`${API_BASE}/advisories?city=${encodeURIComponent(targetCity)}`);
      if (resAdv.ok) {
        const advData = await resAdv.json();
        setAdvisoriesData(advData.advisories || null);
      }

      // 5. Climate Trends
      const resClimate = await fetch(`${API_BASE}/climate?city=${encodeURIComponent(targetCity)}`);
      if (resClimate.ok) {
        const cData = await resClimate.json();
        setClimateData(cData);
      }

      // 6. NWP Model Comparison (GFS vs ECMWF)
      setNwpCompareLoading(true);
      const resNwpComp = await fetch(`${API_BASE}/nwp-compare?city=${encodeURIComponent(targetCity)}`);
      if (resNwpComp.ok) {
        const ncData = await resNwpComp.json();
        setNwpCompareData(ncData);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setNwpCompareLoading(false);
    }
  };

  const handleSimulateDisaster = (disasterType) => {
    setSimulatedDisaster(disasterType);
    if (!disasterType) {
      setActiveDisaster(null);
      setShowDisasterModal(false);
      stopEmergencySiren();
      fetchAllData(city, null);
      return;
    }
    fetchAllData(city, disasterType);
  };

  // Fetch Aviation Briefing
  const fetchAviation = async (airport = aviationAirport) => {
    try {
      const res = await fetch(`${API_BASE}/aviation?airport=${encodeURIComponent(airport)}`);
      if (res.ok) {
        const data = await res.json();
        setAviationData(data);
      }
    } catch (err) {
      console.error("Aviation fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAllData(city);
    fetchAviation("VOBL");
  }, []);

  useEffect(() => {
    if (activePage === "forecast") {
      fetch(`${API_BASE}/forecast?city=${encodeURIComponent(city)}&model=${selectedNwpModel}`)
        .then((r) => r.json())
        .then((d) => setForecastData(d))
        .catch(console.error);
    }
  }, [selectedNwpModel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // Handle city search
  const handleCitySearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const target = searchInput.trim();
    setCity(target);
    fetchAllData(target);
    setSearchInput("");
  };

  // Chat message submission (text vs voice distinction)
  const handleSendChat = async (userMsgText = chatInput, isVoice = false) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (!userMsgText.trim() || chatLoading) return;

    // When typed in chat, cancel any voice speech so responses remain strictly text-only
    if (!isVoice && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const userText = userMsgText.trim();
    setChatInput("");
    const newHistory = [
      ...chatMessages,
      {
        role: "user",
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isVoice: isVoice,
      },
    ];
    setChatMessages(newHistory);
    setChatLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          city: city,
          language: language,
        }),
      });

      const data = await response.json();
      const botReply = data.reply || "Unable to receive weather response.";

      setChatMessages([
        ...newHistory,
        {
          role: "assistant",
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          source: data.data_source,
          isVoiceReply: isVoice,
        },
      ]);

      // Automatic Conversation Mode: ONLY speak out loud when asked through microphone!
      if (isVoice) {
        speakText(botReply);
      }

      // If location changed in query, sync it
      if (data.location && data.location.toLowerCase() !== city.toLowerCase()) {
        setCity(data.location);
        fetchAllData(data.location);
      }
    } catch (error) {
      console.error(error);
      setChatMessages([
        ...newHistory,
        {
          role: "assistant",
          text: "⚠ Unable to reach WeatherGPT backend. Please verify that the FastAPI service is running on port 8000.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Voice Speech-To-Text
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t.micUnavailable);
      return;
    }

    // Cancel any previous speech playback
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const recognition = new SpeechRecognition();
    recognition.lang = LANG_CODE_MAP[language] || "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setChatInput("");
      // Transition immediately to chat page so the user sees conversational UI
      setActivePage("chat");
      // Trigger chat submission with isVoice = true for automatic conversational voice readout!
      handleSendChat(transcript, true);
    };

    recognition.onerror = (err) => {
      console.warn("Speech recognition error:", err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Text-To-Speech audio readout for Voice Conversation Mode
  const speakText = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();

    // Strip markdown formatting, symbols, and emojis for natural, fluent spoken voice
    const cleanSpeech = text
      .replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
      .replace(/[*#_`•👉✓]/g, " ")
      .replace(/°C/g, " degrees celsius ")
      .replace(/km\/h/g, " kilometers per hour ")
      .replace(/\n+/g, ". ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = LANG_CODE_MAP[language] || "en-IN";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const navigation = [
    { id: "dashboard", icon: "⌂", name: t.dashboard },
    { id: "weathermap", icon: "🗺️", name: t.weatherMap || "Weather Map" },
    { id: "chat", icon: "✦", name: t.chat },
    { id: "outfit", icon: "👔", name: t.outfit || "Outfit & Style" },
    { id: "forecast", icon: "☁", name: t.forecast },
    { id: "alerts", icon: "⚠", name: t.alerts, count: alertsData.length },
    { id: "sectors", icon: "🌾", name: t.sectors },
    { id: "insights", icon: "◈", name: t.insights },
  ];

  // If user is signed out or on auth page, immediately render the full Login Page!
  if (!currentUser || activePage === "auth") {
    return (
      <div className="auth-page-wrapper" data-theme={theme} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg, #071322)" }}>
        <AuthPage
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            setActivePage("dashboard");
          }}
          onClose={() => {
            if (currentUser) setActivePage("dashboard");
          }}
          isModal={false}
          theme={theme}
          onThemeChange={handleThemeChange}
        />
      </div>
    );
  }

  return (
    <div className="app" data-theme={theme}>
      {/* Light Theme Weather Ambient Visuals (Glowing Sun & Fluffy Drifting Clouds) */}
      {theme === "light" && (
        <div className="light-weather-ambient-decor" aria-hidden="true">
          <div className="light-weather-sun-container">
            <div className="light-weather-sun-rays"></div>
            <div className="light-weather-sun"></div>
          </div>
          <svg className="light-weather-cloud light-weather-cloud-1" viewBox="0 0 100 40" fill="#ffffff">
            <path d="M20,35 A15,15 0 0,1 35,20 A20,20 0 0,1 70,20 A15,15 0 0,1 85,35 Z" opacity="0.9" />
          </svg>
          <svg className="light-weather-cloud light-weather-cloud-2" viewBox="0 0 100 40" fill="#ffffff">
            <path d="M15,35 A12,12 0 0,1 28,23 A16,16 0 0,1 58,23 A14,14 0 0,1 80,35 Z" opacity="0.85" />
          </svg>
          <svg className="light-weather-cloud light-weather-cloud-3" viewBox="0 0 100 40" fill="#ffffff">
            <path d="M18,34 A10,10 0 0,1 30,24 A15,15 0 0,1 62,24 A12,12 0 0,1 78,34 Z" opacity="0.8" />
          </svg>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand" onClick={() => setActivePage("dashboard")} style={{ cursor: "pointer" }}>
          <div className="brand-mark">W</div>
          <div>
            <h2>{t.brandTitle || "WeatherGPT"}</h2>
            <span>{t.brandSubtitle || "Weather Intelligence"}</span>
          </div>
        </div>

        <div className="nav-title">{t.mainMenu || "MAIN MENU"}</div>

        <div className="navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={activePage === item.id ? "nav-item active" : "nav-item"}
              onClick={() => setActivePage(item.id)}
            >
              <span>{item.icon}</span>
              {item.name}
              {item.count > 0 && item.id === "alerts" && (
                <span className="nav-badge">{item.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          {/* User Account / Sign In Widget */}
          <div className="sidebar-auth-widget">
            {currentUser ? (
              <div className="sidebar-user-card">
                <div className="sidebar-user-avatar">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} />
                  ) : (
                    <span>{currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}</span>
                  )}
                </div>
                <div className="sidebar-user-info">
                  <strong>{currentUser.name || "User"}</strong>
                  <small>{currentUser.email || (t.guestUser || "Signed In")}</small>
                </div>
                <div className="sidebar-user-actions">
                  <button
                    type="button"
                    className="sidebar-theme-btn"
                    onClick={() => {
                      const next = theme === "default" ? "light" : theme === "light" ? "dark" : "default";
                      handleThemeChange(next);
                    }}
                    title={`Theme: ${theme.toUpperCase()} (Click to toggle)`}
                  >
                    {theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "🌐"}
                  </button>
                  <button
                    className="sidebar-logout-btn"
                    onClick={handleLogout}
                    title={t.signOut || "Sign Out"}
                  >
                    🚪
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="sidebar-signin-btn"
                onClick={() => setShowAuthModal(true)}
              >
                <span>🔑</span> {t.signIn || "Sign In"}
              </button>
            )}
          </div>

          <div className="system-status" style={{ marginTop: "12px" }}>
            <span className="status-dot"></span>
            <div>
              <strong>{t.systemOnline || "Weather System"}</strong>
              <small>{t.systemStatus || "NWP GFS & ECMWF Online"}</small>
            </div>
          </div>
          <div className="system-status" style={{ marginTop: "8px", borderTop: "1px solid var(--border)", paddingTop: "8px" }}>
            <span className="status-dot" style={{ background: "var(--accent)" }}></span>
            <div>
              <strong>{t.activeLocation || "Active Location"}</strong>
              <small>{weather?.city || city}, {weather?.country || "IN"}</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="content">
        {/* PERSISTENT TOP DISASTER HAZARD BANNER */}
        {activeDisaster && (
          <div className="persistent-disaster-banner">
            <div className="persistent-disaster-content">
              <span className="disaster-pulse-icon">🚨</span>
              <div className="disaster-text">
                <strong className="disaster-badge-text">
                  {activeDisaster.hazard_type === "flood"
                    ? (t.heavyFloodAlert || "HEAVY FLOOD WARNING")
                    : activeDisaster.hazard_type === "cyclone"
                    ? (t.cycloneAlert || "SEVERE CYCLONE WARNING")
                    : activeDisaster.hazard_type === "tsunami"
                    ? (t.tsunamiAlert || "TSUNAMI EARLY WARNING")
                    : `${activeDisaster.severity?.toUpperCase() || "RED ALERT"}: ${activeDisaster.event}`}
                  {" "}— {activeDisaster.location}
                </strong>
                <span className="disaster-headline-text"> • {activeDisaster.headline}</span>
              </div>
            </div>
            <div className="persistent-disaster-actions">
              <button
                type="button"
                className="disaster-btn-plan"
                onClick={() => setShowDisasterModal(true)}
              >
                ⚠️ {t.immediateAction || "Action Plan"}
              </button>
              {isSirenActive ? (
                <button
                  type="button"
                  className="disaster-btn-mute"
                  onClick={stopEmergencySiren}
                >
                  🔇 {t.stopSiren || "Stop Siren"}
                </button>
              ) : (
                <button
                  type="button"
                  className="disaster-btn-siren"
                  onClick={() => playEmergencySiren(true)}
                >
                  🔊 {t.resoundSiren || "Sound Siren"}
                </button>
              )}
              <button
                type="button"
                className="disaster-btn-dismiss"
                onClick={() => {
                  stopEmergencySiren();
                  setActiveDisaster(null);
                }}
                title="Dismiss banner"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* TOPBAR */}
        <header className="topbar">
          <div>
            <p className="breadcrumb">
              {t.breadcrumb || "WEATHER INTELLIGENCE"} / {navigation.find(n => n.id === activePage)?.name?.toUpperCase() || activePage.toUpperCase()}
            </p>
            <h1 className="topbar-greeting">
              Hi {currentUser?.name?.split(" ")[0] || "User"}, 👋
            </h1>
          </div>

          <div className="top-actions">
            {/* Quick city search */}
            <form onSubmit={handleCitySearch} className="header-search-form">
              <input
                type="text"
                placeholder={`${t.searchCity}...`}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="header-search-input"
              />
              <button type="submit" className="header-search-btn">🔍</button>
            </form>

            {/* Indian Multilingual Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-select"
              title="Change platform language"
            >
              <option value="English">English</option>
              <option value="हिन्दी">हिन्दी (Hindi)</option>
              <option value="ಕನ್ನಡ">ಕನ್ನಡ (Kannada)</option>
              <option value="தமிழ்">தமிழ் (Tamil)</option>
              <option value="తెలుగు">తెలుగు (Telugu)</option>
              <option value="मराठी">मराठी (Marathi)</option>
              <option value="বাংলা">বাংলা (Bengali)</option>
            </select>

            <button
              className="notification"
              title="Active Alerts"
              onClick={() => setActivePage("alerts")}
            >
              🔔
              {alertsData.length > 0 && <span></span>}
            </button>

            {/* Quick Topbar Theme Switcher */}
            <button
              type="button"
              className="topbar-theme-btn"
              onClick={() => {
                const next = theme === "default" ? "light" : theme === "light" ? "dark" : "default";
                handleThemeChange(next);
              }}
              title={`Active Theme: ${theme.toUpperCase()} (Click to toggle)`}
            >
              {theme === "light" ? "☀️ Light" : theme === "dark" ? "🌙 Dark" : "🌐 Default"}
            </button>

            {/* Topbar User Profile & Authentication Trigger */}
            {currentUser ? (
              <div className="user-profile-menu-container">
                <div
                  className="user-profile-badge"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  title={`Signed in as ${currentUser.name}`}
                >
                  <div className="avatar-mini">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} />
                    ) : (
                      <span>{currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}</span>
                    )}
                  </div>
                  <span className="user-display-name">{currentUser.name?.split(" ")[0]}</span>
                  <span className="menu-caret">▾</span>
                </div>

                {userMenuOpen && (
                  <div className="user-dropdown-popover">
                    <div className="popover-header">
                      <strong>{currentUser.name}</strong>
                      <small>{currentUser.email}</small>
                      <span className="user-auth-badge">
                        {currentUser.auth_provider === "google" ? "Google" : "Email Verified"}
                      </span>
                    </div>
                    <div className="popover-divider"></div>
                    <button
                      className="popover-item"
                      onClick={() => {
                        setActivePage("outfit");
                        setUserMenuOpen(false);
                      }}
                    >
                      👔 Outfit & Suggestions
                    </button>

                    <div className="popover-divider"></div>

                    {/* THEME SELECTOR IN USER SIGNOUT SECTION */}
                    <div className="popover-theme-section">
                      <div className="popover-theme-header">
                        <span>🎨 Theme</span>
                        <span className="popover-theme-badge">
                          {theme === "light" ? "☀️ Light" : theme === "dark" ? "🌙 Dark" : "🌐 Default"}
                        </span>
                      </div>
                      <div className="theme-options-grid">
                        <button
                          type="button"
                          className={`theme-mode-btn ${theme === "default" ? "active" : ""}`}
                          onClick={() => handleThemeChange("default")}
                          title="Default Meteorological Blue Mode"
                        >
                          <span className="theme-icon">🌐</span>
                          <span>Default</span>
                        </button>
                        <button
                          type="button"
                          className={`theme-mode-btn ${theme === "light" ? "active" : ""}`}
                          onClick={() => handleThemeChange("light")}
                          title="Light Mode (Crisp Daylight & Weather Visuals)"
                        >
                          <span className="theme-icon">☀️</span>
                          <span>Light</span>
                        </button>
                        <button
                          type="button"
                          className={`theme-mode-btn ${theme === "dark" ? "active" : ""}`}
                          onClick={() => handleThemeChange("dark")}
                          title="Dark Mode (Obsidian / Carbon Dark)"
                        >
                          <span className="theme-icon">🌙</span>
                          <span>Dark</span>
                        </button>
                      </div>
                    </div>

                    <div className="popover-divider"></div>
                    <button
                      className="popover-item logout"
                      onClick={handleLogout}
                    >
                      🚪 {t.signOut || "Sign Out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="topbar-signin-btn"
                onClick={() => setShowAuthModal(true)}
                title={t.signIn || "Sign In"}
              >
                <span>🔑</span> {t.signIn || "Sign In"}
              </button>
            )}
          </div>
        </header>

        {/* ==================================================== */}
        {/* VIEW 1: DASHBOARD */}
        {/* ==================================================== */}
        {activePage === "dashboard" && (
          <>
            {/* HERO SEARCH & AI CHAT LAUNCHER */}
            <section className="hero-search">
              <div className="search-content">
                <div className="ai-label">✦ AI WEATHER ASSISTANT</div>
                <h2>
                  {t.askTitle}
                  <br />
                  <span>{t.askSubtitle}</span>
                </h2>
                <p>{t.subheading}</p>
              </div>

              <div className="query-box">
                <span>✦</span>
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (!currentUser) {
                        setShowAuthModal(true);
                        return;
                      }
                      setActivePage("chat");
                      handleSendChat(chatInput);
                    }
                  }}
                  placeholder={
                    isListening
                      ? t.listening
                      : !currentUser
                      ? "🔒 Sign in with Mobile OTP or Google to ask WeatherGPT anything..."
                      : t.askPlaceholder
                  }
                />
                <button
                  type="button"
                  className={`mic mic-highlighted ${isListening ? "mic-active" : ""}`}
                  onClick={() => {
                    if (!currentUser) {
                      setShowAuthModal(true);
                      return;
                    }
                    handleVoiceInput();
                  }}
                  title="🎙️ Ask with AI Voice (Voice Conversation Mode)"
                >
                  <span className="mic-icon">🎙️</span>
                  <span className="mic-badge-label">AI Voice</span>
                  {isListening && <span className="mic-pulse-aura"></span>}
                </button>
                <button
                  className="ask-button"
                  onClick={() => {
                    if (!currentUser) {
                      setShowAuthModal(true);
                      return;
                    }
                    setActivePage("chat");
                    handleSendChat(chatInput, false);
                  }}
                >
                  {currentUser ? t.askBtn : (t.signInToAsk || "🔑 Sign In to Ask")}
                </button>
              </div>

              <div className="suggestions">
                <button onClick={() => setActivePage("outfit")}>
                  {t.suggestionWear || "👔 What should I wear? (Outfit Guide)"}
                </button>
                <button
                  onClick={() => {
                    if (!currentUser) {
                      setShowAuthModal(true);
                      return;
                    }
                    setActivePage("chat");
                    handleSendChat(`What should I wear tomorrow in ${city}?`);
                  }}
                >
                  {t.suggestionTomorrow || "✨ Outfit for tomorrow"}
                </button>
                <button
                  onClick={() => {
                    if (!currentUser) {
                      setShowAuthModal(true);
                      return;
                    }
                    setActivePage("chat");
                    handleSendChat(`Will it rain tomorrow in ${city}?`);
                  }}
                >
                  {t.suggestionRain || "🌧 Will it rain tomorrow?"}
                </button>
                <button
                  onClick={() => {
                    if (!currentUser) {
                      setShowAuthModal(true);
                      return;
                    }
                    setActivePage("chat");
                    handleSendChat(`Can I spray pesticides in ${city} tomorrow?`);
                  }}
                >
                  {t.suggestionFarming || "🌾 Farming & spray advice"}
                </button>
              </div>
            </section>

            {/* LOCATION BAR */}
            <div className="location-bar">
              <div>
                <span className="location-pin">📍</span>
                <strong>{weather?.city || city}</strong>
                <span>{weather?.region ? `${weather.region}, ` : ""}{weather?.country || "IN"}</span>
                {weather?.local_time && (
                  <small style={{ marginLeft: "12px", color: "var(--muted)" }}>Local: {weather.local_time}</small>
                )}
              </div>
              <button onClick={() => fetchAllData(city)} className="refresh">
                {t.refresh}
              </button>
            </div>

            {/* CURRENT WEATHER & RISK ROW */}
            <section className="dashboard-grid">
              {/* CURRENT CONDITIONS CARD */}
              <div className="current-weather card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.currentConditions}</span>
                    <h3>{weather?.city || city}</h3>
                  </div>
                  <span className="live">● LIVE</span>
                </div>

                {loading ? (
                  <div className="loading">Fetching live meteorological data...</div>
                ) : weather ? (
                  <>
                    <div className="temperature-row">
                      <div>
                        <div className="big-temp">
                          {weather.temperature}
                          <span>°C</span>
                        </div>
                        <p>{t.feelsLike || "Feels like"} {weather.feels_like}°C</p>
                      </div>
                      <div className="condition">
                        {weather.condition_icon ? (
                          <img
                            src={weather.condition_icon.startsWith("//") ? `https:${weather.condition_icon}` : weather.condition_icon}
                            alt={weather.condition}
                            style={{ width: "64px", height: "64px" }}
                          />
                        ) : (
                          <span style={{ fontSize: "40px" }}>⛅</span>
                        )}
                        <strong>{translateCondition(weather.condition, language)}</strong>
                      </div>
                    </div>

                    <div className="metrics">
                      <Metric icon="💧" label={t.humidity || "Humidity"} value={`${weather.humidity}%`} />
                      <Metric icon="💨" label={t.windSpeed || "Wind"} value={`${weather.wind_speed_kmh} km/h (${weather.wind_dir})`} />
                      <Metric icon="◉" label={t.surfacePressure || "Pressure"} value={`${weather.pressure_hpa} hPa`} />
                      <Metric icon="👁" label={t.surfaceVisibility || "Visibility"} value={`${weather.visibility_km} km`} />
                      <Metric icon="☀" label={t.uvIndex || "UV Index"} value={`${weather.uv_index}`} />
                      <Metric
                        icon="🍃"
                        label={t.airQuality || "Air Quality"}
                        value={`${translateStatus(weather.air_quality?.status, language) || "Moderate"} (PM2.5: ${weather.air_quality?.pm2_5 || 25})`}
                      />
                    </div>
                  </>
                ) : (
                  <div className="empty-weather">
                    <p>No weather data loaded.</p>
                    <button onClick={() => fetchAllData(city)}>Load Weather</button>
                  </div>
                )}
              </div>

              {/* DECISION SUPPORT RISK CARD */}
              <div className="risk-card card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.decisionSupport}</span>
                    <h3>{t.decisionRisks || "Risk Index"}</h3>
                  </div>
                  <span className={`risk-badge ${weather?.risk?.level === "HIGH" ? "badge-red" : weather?.risk?.level === "MODERATE" ? "badge-orange" : "badge-green"}`}>
                    {translateRiskLevel(weather?.risk?.level, language) || "LOW"}
                  </span>
                </div>

                <div className="risk-circle">
                  <div>
                    <strong>{weather?.risk?.score || 18}</strong>
                    <span>/100</span>
                  </div>
                </div>

                <p className="risk-description">
                  {weather?.risk?.level === "LOW"
                    ? "Current weather conditions indicate minimal operational and environmental risk."
                    : weather?.risk?.level === "MODERATE"
                    ? "Moderate weather impact. Check farming spray drift and road travel conditions."
                    : "Elevated hazard warning. Follow early warning safety guidelines."}
                </p>

                <div className="risk-list">
                  <Risk name={t.rainRisk || "Rain Risk"} value={translateRiskLevel(weather?.risk?.rain_risk, language) || "Low"} />
                  <Risk name={t.heatRisk || "Heat Risk"} value={translateRiskLevel(weather?.risk?.heat_risk, language) || "Low"} />
                  <Risk name={t.windRisk || "Wind Risk"} value={translateRiskLevel(weather?.risk?.wind_risk, language) || "Low"} />
                </div>
              </div>
            </section>

            {/* THREE COLUMN ROW: FORECAST, ALERTS, CONFIDENCE */}
            <section className="three-column">
              {/* FORECAST SUMMARY CARD */}
              <div className="forecast-card card">
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <span className="eyebrow">{dashboardForecastDays === 14 ? (t.forecast14d || "14-DAY OUTLOOK") : (t.forecast7d || "7-DAY OUTLOOK")}</span>
                    <h3>{t.upcomingDays || "Upcoming Days"}</h3>
                  </div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "4px", background: "var(--card-light)", padding: "2px", borderRadius: "6px", border: "1px solid var(--border)" }}>
                      <button
                        type="button"
                        onClick={() => setDashboardForecastDays(7)}
                        style={{
                          padding: "2px 7px",
                          fontSize: "11px",
                          borderRadius: "4px",
                          border: "none",
                          background: dashboardForecastDays === 7 ? "var(--primary)" : "transparent",
                          color: dashboardForecastDays === 7 ? "#fff" : "var(--muted)",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        7D
                      </button>
                      <button
                        type="button"
                        onClick={() => setDashboardForecastDays(14)}
                        style={{
                          padding: "2px 7px",
                          fontSize: "11px",
                          borderRadius: "4px",
                          border: "none",
                          background: dashboardForecastDays === 14 ? "var(--primary)" : "transparent",
                          color: dashboardForecastDays === 14 ? "#fff" : "var(--muted)",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        14D
                      </button>
                    </div>
                    <button className="text-button" onClick={() => setActivePage("forecast")}>
                      {t.detailedNwpBtn || "Detailed NWP →"}
                    </button>
                  </div>
                </div>

                <div className="forecast-list forecast-list-scroll">
                  {weather?.daily?.slice(0, dashboardForecastDays).map((f, idx) => (
                    <ForecastRow
                      key={idx}
                      day={idx === 0 ? (t.today || "Today") : `${f.day}${f.date ? ' (' + f.date.slice(5) + ')' : ''}`}
                      icon={f.condition.includes("Rain") ? "🌧️" : f.condition.includes("Cloud") ? "⛅" : "☀️"}
                      temp={`${f.max_temp}°`}
                      low={`${f.min_temp}°`}
                      rain={`${f.rain_chance}%`}
                    />
                  ))}
                </div>
              </div>

              {/* EXTREME ALERTS PREVIEW */}
              <div className="alert-card card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.activeAlerts}</span>
                    <h3>{t.alertsEyebrow || "Early Warning"}</h3>
                  </div>
                  <span className="alert-count">{alertsData.length}</span>
                </div>

                {alertsData.length > 0 ? (
                  <div className="alert-box">
                    <div className="alert-icon">⚠</div>
                    <div>
                      <strong>{alertsData[0].event}</strong>
                      <p>{alertsData[0].headline || alertsData[0].action}</p>
                      <small>{alertsData[0].severity} • {alertsData[0].location}</small>
                    </div>
                  </div>
                ) : (
                  <div className="alert-box">
                    <div className="alert-icon" style={{ background: "rgba(85,217,138,0.2)", color: "var(--green)" }}>✓</div>
                    <div>
                      <strong>{t.noActiveAlerts ? (t.greenNormal || "No Severe Hazards") : "No Severe Hazards"}</strong>
                      <p>{t.noActiveAlerts || `Normal meteorological conditions across ${city}.`}</p>
                      <small>{t.systemOnline || "All sensors operational"}</small>
                    </div>
                  </div>
                )}

                <button className="outline-button" onClick={() => setActivePage("alerts")}>
                  {t.activeAlerts || "View all hazard advisories"} →
                </button>
              </div>

              {/* NWP MODEL CONFIDENCE */}
              <div className="confidence-card card">
                <span className="eyebrow">{t.forecastConfidence}</span>
                <h3>{t.ensembleConfidence || "Ensemble Reliability"}</h3>
                <div className="confidence-number">88%</div>
                <div className="progress">
                  <div style={{ width: "88%" }}></div>
                </div>
                <p>{t.scientificContextDesc || "High multi-model agreement across NOAA GFS, ECMWF and WeatherAPI stations."}</p>
                <div className="model-info">
                  <span>{t.system || "Framework"}</span>
                  <strong>WIS2.0 & NWP Engine</strong>
                </div>
              </div>
            </section>

            {/* SECTOR MODULES */}
            <section className="section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">{t.specializedModules}</span>
                  <h2>{t.decisionSupport || "Decision Support by Sector"}</h2>
                </div>
                <p>{t.sectorsSubtitle || "Tailored recommendations for agriculture, aviation, marine, and urban planning."}</p>
              </div>

              <div className="modules">
                <Module
                  icon="🌾"
                  title={t.agricultureSector || "Agriculture & Farming"}
                  text={advisoriesData?.agriculture?.spray_recommendation || "Pesticide spray suitability & irrigation schedules."}
                  status={translateStatus(advisoriesData?.agriculture?.status, language) || t.suitable}
                  onClick={() => { setSelectedSector("agriculture"); setActivePage("sectors"); }}
                />
                <Module
                  icon="✈️"
                  title={t.aviationSector || "Aviation Briefing"}
                  text={advisoriesData?.aviation?.recommendation || "METAR, TAF, VFR/IFR flight categories."}
                  status={advisoriesData?.aviation?.flight_category || "VFR"}
                  onClick={() => { setSelectedSector("aviation"); setActivePage("sectors"); }}
                />
                <Module
                  icon="🌊"
                  title={t.marineSector || "Marine & Coastal"}
                  text={advisoriesData?.marine?.recommendation || "Coastal wind speeds, wave alerts, and fishing safety."}
                  status={advisoriesData?.marine?.status || "SAFE"}
                  onClick={() => { setSelectedSector("marine"); setActivePage("sectors"); }}
                />
                <Module
                  icon="🏙️"
                  title={t.smartCitySector || "Smart City Monitoring"}
                  text={advisoriesData?.smart_city?.recommendation || "Urban heat index, AQI warnings, and drainage vulnerability."}
                  status={advisoriesData?.smart_city?.comfort_level || "PLEASANT"}
                  onClick={() => { setSelectedSector("smart_city"); setActivePage("sectors"); }}
                />
              </div>
            </section>
          </>
        )}

        {/* ==================================================== */}
        {/* VIEW: WEATHER MAP & GIS METEOROLOGICAL RADAR */}
        {/* ==================================================== */}
        {activePage === "weathermap" && (
          <WeatherMapPage
            apiBase={API_BASE}
            language={language}
            isSirenActive={isSirenActive}
            onTriggerDisasterAlert={(alerts, locName) => checkAndTriggerDisaster(alerts, locName, true)}
            onStopSiren={stopEmergencySiren}
            onPlaySiren={() => playEmergencySiren(true)}
            onOpenInChat={(msg) => {
              setActivePage("chat");
              handleSendChat(msg);
            }}
          />
        )}

        {/* ==================================================== */}
        {/* VIEW 2: ASK WEATHERGPT (CHAT) */}
        {/* ==================================================== */}
        {activePage === "chat" && (
          <section className="chat-view">
            <div className="chat-header card">
              <div className="chat-title-group">
                <div className="brand-mark" style={{ width: "36px", height: "36px", fontSize: "16px" }}>✦</div>
                <div>
                  <h2>{t.chatAssistantTitle || "WeatherGPT Conversational Assistant"}</h2>
                  <p>{t.chatAssistantSubtitle || "Multilingual meteorological intelligence for"} {city} ({language})</p>
                </div>
              </div>
              <div className="chat-header-actions">
                {/* Direct Language Switcher Inside Chat Header */}
                <div className="chat-lang-switcher">
                  <span>🌐 Language:</span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="chat-lang-select"
                    title="Change language directly in chat"
                  >
                    <option value="English">English</option>
                    <option value="हिन्दी">हिन्दी (Hindi)</option>
                    <option value="ಕನ್ನಡ">ಕನ್ನಡ (Kannada)</option>
                    <option value="தமிழ்">தமிழ் (Tamil)</option>
                    <option value="తెలుగు">తెలుగు (Telugu)</option>
                    <option value="मराठी">मराठी (Marathi)</option>
                    <option value="বাংলা">বাংলা (Bengali)</option>
                  </select>
                </div>

                <button
                  className="outline-button"
                  onClick={() => setChatMessages([chatMessages[0]])}
                >
                  {t.clearChat || "Clear Chat"}
                </button>
              </div>
            </div>

            <div className="chat-messages-container card">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble-row ${msg.role === "user" ? "user-row" : "bot-row"}`}
                >
                  <div className={`avatar ${msg.role}`}>
                    {msg.role === "user" ? "You" : "✦"}
                  </div>
                  <div className={`chat-bubble ${msg.role}`}>
                    <div className="bubble-header">
                      <strong>{msg.role === "user" ? "You" : (t.brandTitle || "WeatherGPT AI")}</strong>
                      <div className="bubble-header-meta">
                        {msg.isVoice && <span className="voice-tag">🎙️ {t.spokenResponse || "Spoken"}</span>}
                        <span>{msg.time}</span>
                      </div>
                    </div>
                    <div className="bubble-content" style={{ whiteSpace: "pre-line" }}>
                      {msg.text}
                    </div>
                    {msg.role === "assistant" && (
                      <div className="bubble-footer">
                        <button
                          className="tts-btn"
                          onClick={() => speakText(msg.text)}
                          title="Listen to this advisory"
                        >
                          🔊 {t.listen || "Listen"}
                        </button>
                        {msg.isVoiceReply && <span className="voice-tag">🎙️ {t.spokenResponse || "Spoken Response"}</span>}
                        {msg.source && <small className="source-tag">{t.system || "Source"}: {msg.source}</small>}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="chat-bubble-row bot-row">
                  <div className="avatar assistant">✦</div>
                  <div className="chat-bubble assistant typing-bubble">
                    <div className="typing-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <em>{t.analyzingPrompt || "Analyzing meteorological models & generating advisory..."}</em>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {!currentUser ? (
              <div className="card chat-auth-gate">
                <div className="auth-gate-icon">🔒</div>
                <h3>{t.signInRequired || "Sign In Required to Ask WeatherGPT"}</h3>
                <p>
                  {t.signInPrompt || "You must be logged in to chat or ask questions. Please sign in or register with your Mobile Number (OTP) or Google Account to get permitted to chat and receive personalized weather & outfit suggestions."}
                </p>
                <div className="auth-gate-buttons" style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  <button
                    className="auth-gate-primary-btn"
                    onClick={() => setShowAuthModal(true)}
                  >
                    {t.signInBtn || "🔑 Sign In with Phone OTP or Google →"}
                  </button>
                  <button
                    type="button"
                    className="outline-button"
                    style={{ padding: "10px 18px", borderRadius: "8px", fontWeight: "600" }}
                    onClick={() => {
                      const guest = { name: t.guestUser || "Citizen Evaluator", email: "citizen@weathergpt.gov.in", role: "Citizen / Farmer" };
                      localStorage.setItem("weathergpt_user", JSON.stringify(guest));
                      setCurrentUser(guest);
                    }}
                  >
                    {t.instantAccessBtn || "⚡ Instant Citizen / Evaluator Access →"}
                  </button>
                </div>
                <div className="auth-gate-features">
                  <span>{t.phoneOtpBenefit || "✓ 10-Second Phone OTP Login"}</span>
                  <span>{t.googleSignInBenefit || "✓ Instant Google Sign-In"}</span>
                  <span>{t.freeAccessBenefit || "✓ Free & Instant Access"}</span>
                </div>
              </div>
            ) : (
              <div className="chat-input-card card">
                {/* Real-time Voice Speaking Indicator */}
                {isSpeaking && (
                  <div className="ai-voice-speaking-indicator">
                    <div className="audio-wave-anim">
                      <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <span>🎙️ <strong>{t.voiceSpeaking || "WeatherGPT AI Voice is speaking out loud..."}</strong></span>
                    <button type="button" onClick={stopSpeaking} className="stop-voice-btn" title="Stop Voice">
                      ⏹ {t.stopVoice || "Stop Voice"}
                    </button>
                  </div>
                )}

                {/* Real-time Voice Listening Indicator */}
                {isListening && (
                  <div className="ai-voice-listening-indicator">
                    <span className="listening-pulse-dot"></span>
                    <span>🎙️ <strong>{t.voiceListening || "Listening to your voice... Speak your question now"}</strong></span>
                  </div>
                )}

                <div className="chat-suggestions-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap", overflowX: "auto" }}>
                  <button onClick={() => handleSendChat(`Can I spray pesticides in ${city} tomorrow?`, false)}>
                    {t.pesticideAdviceChip || "🌾 Pesticide Spray Advice"}
                  </button>
                  <button onClick={() => handleSendChat(`Are there any active cyclone, flood, or heatwave alerts?`, false)}>
                    {t.disasterAlertsChip || "🚨 Disaster Alerts & Warnings"}
                  </button>
                  <button onClick={() => handleSendChat(`What is the aviation METAR briefing for VOBL?`, false)}>
                    {t.aviationBriefingChip || "✈️ Aviation Briefing (VOBL)"}
                  </button>
                  <button onClick={() => handleSendChat(`What are the climate trends and temperature anomalies in ${city}?`, false)}>
                    {t.climateTrendsChip || "📊 Climate Trends & Anomalies"}
                  </button>
                  <button onClick={() => handleSendChat(`What should I wear tomorrow in ${city}?`, false)}>
                    {t.outfitAdviceChip || "👔 Outfit & Travel Advice"}
                  </button>
                  <button onClick={() => handleSendChat(`What is the weather in ${city}?`, false)}>
                    {t.liveWeatherChip || "🌡️ Live Weather"}
                  </button>
                </div>

                <div className="query-box" style={{ marginTop: "12px" }}>
                  <span>✦</span>
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendChat(chatInput, false);
                    }}
                    placeholder={isListening ? t.listening : `${t.askAnything || "Ask anything in"} ${language}...`}
                  />
                  <button
                    type="button"
                    className={`mic mic-highlighted ${isListening ? "mic-active" : ""}`}
                    onClick={handleVoiceInput}
                    title="🎙️ Ask with AI Voice (Voice Conversation Mode)"
                  >
                    <span className="mic-icon">🎙️</span>
                    <span className="mic-badge-label">AI Voice</span>
                    {isListening && <span className="mic-pulse-aura"></span>}
                  </button>
                  <button className="ask-button" onClick={() => handleSendChat(chatInput, false)}>
                    {t.askBtn}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================================================== */}
        {/* VIEW 3: FORECAST & NWP MODELS */}
        {/* ==================================================== */}
        {activePage === "forecast" && (
          <section className="forecast-view">
            <div className="card nwp-header-card">
              <div className="nwp-header-top-row">
                <div className="nwp-header-title-col">
                  <span className="eyebrow">{t.forecast || "NUMERICAL WEATHER PREDICTION (NWP)"}</span>
                  <h2>{t.forecast} ({nwpForecastDays}-Day) - {city}</h2>
                </div>
                <div className="nwp-day-toggle-group">
                  <button
                    type="button"
                    className={`nwp-day-toggle-btn ${nwpForecastDays === 7 ? "active" : ""}`}
                    onClick={() => setNwpForecastDays(7)}
                  >
                    7 Days
                  </button>
                  <button
                    type="button"
                    className={`nwp-day-toggle-btn ${nwpForecastDays === 14 ? "active" : ""}`}
                    onClick={() => setNwpForecastDays(14)}
                  >
                    14 Days
                  </button>
                </div>
              </div>

              <div className="nwp-header-bottom-row">
                <p className="nwp-subtitle">
                  {t.nwpSubtitle || "Comparing numerical models reduces forecast uncertainty and improves early disaster preparedness."}
                </p>
                <div className="nwp-model-pills">
                  <button
                    type="button"
                    className={`model-pill ${selectedNwpModel === "weatherapi" ? "active" : ""}`}
                    onClick={() => setSelectedNwpModel("weatherapi")}
                  >
                    WeatherAPI Ensemble
                  </button>
                  <button
                    type="button"
                    className={`model-pill ${selectedNwpModel === "gfs" ? "active" : ""}`}
                    onClick={() => setSelectedNwpModel("gfs")}
                  >
                    NOAA GFS (Global Grid)
                  </button>
                  <button
                    type="button"
                    className={`model-pill ${selectedNwpModel === "ecmwf" ? "active" : ""}`}
                    onClick={() => setSelectedNwpModel("ecmwf")}
                  >
                    ECMWF IFS (European Model)
                  </button>
                </div>
              </div>
            </div>

            <div className="nwp-forecast-grid">
              {(selectedNwpModel === "weatherapi" ? weather?.daily : forecastData?.nwp_forecast?.days)?.slice(0, nwpForecastDays).map((day, idx) => (
                <div key={idx} className="forecast-card card" style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>{idx === 0 ? (t.today || "Today") : (day.day || "Day")}</strong>
                    <small style={{ color: "var(--muted)" }}>{day.date}</small>
                  </div>
                  <div style={{ margin: "16px 0", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "32px" }}>{day.condition?.includes("Rain") ? "🌧️" : "⛅"}</span>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>{day.max_temp}°C</div>
                      <small style={{ color: "var(--muted)" }}>{t.dayLow || "Low"}: {day.min_temp}°C</small>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{t.rainProbability || "Rain Probability"}:</span>
                      <strong style={{ color: day.rain_chance > 50 ? "var(--red)" : "var(--text)" }}>{day.rain_chance}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{t.precipitation || "Precipitation"}:</span>
                      <strong>{day.precipitation_mm} mm</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{t.maxWind || "Max Wind"}:</span>
                      <strong>{day.max_wind_kmh} km/h</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Side-by-side GFS vs ECMWF Numerical Prediction Comparison */}
            <NwpComparison compareData={nwpCompareData} loading={nwpCompareLoading} language={language} />
          </section>
        )}

        {/* ==================================================== */}
        {/* VIEW 4: ALERTS & DISASTER EARLY WARNING */}
        {/* ==================================================== */}
        {activePage === "alerts" && (
          <section className="alerts-view">
            <div className="card" style={{ marginBottom: "20px" }}>
              <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <span className="eyebrow">{t.alertsEyebrow || "EARLY WARNING & DISASTER DISSEMINATION"}</span>
                  <h2>{t.activeAlerts} - {city}</h2>
                  <p style={{ color: "var(--muted)", marginTop: "4px" }}>
                    {t.alertsSubtitle || "Standardized India Meteorological Department (IMD / MoES) multi-hazard early warning dissemination."}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={playEmergencySiren}
                    style={{
                      background: isSirenActive ? "#ef4444" : "rgba(239, 68, 68, 0.15)",
                      color: isSirenActive ? "#fff" : "#f87171",
                      border: "1px solid #ef4444",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    🚨 {isSirenActive ? (t.sirenActive || "Broadcasting Siren...") : (t.emergencySiren || "Sound Siren Alarm")}
                  </button>
                  <span className="alert-count">{alertsData.length} {t.activeBadge || "ACTIVE"}</span>
                </div>
              </div>

              {/* IMD 4-Tier Protocol Legend */}
              <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", padding: "4px 8px", borderRadius: "6px", background: "rgba(239,68,68,0.2)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.4)" }}>
                  🔴 {t.redWarning || "Red: Take Action (Severe Hazard)"}
                </span>
                <span style={{ fontSize: "11px", padding: "4px 8px", borderRadius: "6px", background: "rgba(249,115,22,0.2)", color: "#f97316", border: "1px solid rgba(249,115,22,0.4)" }}>
                  🟠 {t.orangeAlert || "Orange: Be Prepared (High Disruption)"}
                </span>
                <span style={{ fontSize: "11px", padding: "4px 8px", borderRadius: "6px", background: "rgba(234,179,8,0.2)", color: "#eab308", border: "1px solid rgba(234,179,8,0.4)" }}>
                  🟡 {t.yellowWatch || "Yellow: Be Aware (Moderate Watch)"}
                </span>
                <span style={{ fontSize: "11px", padding: "4px 8px", borderRadius: "6px", background: "rgba(34,197,94,0.2)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.4)" }}>
                  🟢 {t.greenNormal || "Green: All Clear (Routine Monitoring)"}
                </span>
              </div>

              {/* Disaster Simulation Testing Controls for Evaluators */}
              <div className="disaster-sim-bar" style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(239, 68, 68, 0.08)", border: "1px dashed rgba(239, 68, 68, 0.4)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>🚨</span>
                    <strong style={{ fontSize: "13px", color: "#ef4444" }}>
                      {t.simulateDisaster || "Simulate Severe Hazard (Evaluator Mode):"}
                    </strong>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => handleSimulateDisaster("flood")}
                      style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                    >
                      {t.testFlood || "🌊 Test Flood Warning"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateDisaster("cyclone")}
                      style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                    >
                      {t.testCyclone || "🌀 Test Cyclone Warning"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateDisaster("tsunami")}
                      style={{ background: "#b91c1c", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
                    >
                      {t.testTsunami || "🌊 Test Tsunami Warning"}
                    </button>
                    {simulatedDisaster && (
                      <button
                        type="button"
                        onClick={() => handleSimulateDisaster(null)}
                        style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--text)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}
                      >
                        {t.clearHazard || "🟢 Normal Weather"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="alerts-list">
              {alertsData.map((alert, index) => (
                <div key={index} className={`alert-detail-card card ${alert.severity?.toLowerCase().includes("red") ? "border-red" : alert.severity?.toLowerCase().includes("orange") ? "border-orange" : "border-yellow"}`}>
                  <div className="alert-header-row">
                    <div className="alert-title-group">
                      <span className="alert-icon-big">⚠</span>
                      <div>
                        <h3>{alert.event}</h3>
                        <p>{alert.headline}</p>
                      </div>
                    </div>
                    <span className={`severity-tag ${alert.severity?.toLowerCase().includes("red") ? "tag-red" : alert.severity?.toLowerCase().includes("orange") ? "tag-orange" : "tag-yellow"}`}>
                      {alert.severity}
                    </span>
                  </div>

                  <div className="alert-actions-box">
                    <strong>{t.safetyActions || "Recommended Safety Actions"}:</strong>
                    <p>{alert.action}</p>
                  </div>

                  <div className="alert-meta-row">
                    <small>📍 {t.target || "Target"}: <strong>{alert.location}</strong></small>
                    <small>⏳ {t.valid || "Valid"}: <strong>{alert.valid_until}</strong></small>
                    <small>📡 {t.system || "System"}: <strong>{alert.source}</strong></small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* VIEW 5: SECTOR DECISION SUPPORT */}
        {/* ==================================================== */}
        {activePage === "sectors" && (
          <section className="sectors-view">
            <div className="sector-navigation">
              <button
                className={`sector-nav-btn ${selectedSector === "agriculture" ? "active" : ""}`}
                onClick={() => setSelectedSector("agriculture")}
              >
                🌾 {t.agricultureSector || "Agriculture & Farming"}
              </button>
              <button
                className={`sector-nav-btn ${selectedSector === "aviation" ? "active" : ""}`}
                onClick={() => setSelectedSector("aviation")}
              >
                ✈️ {t.aviationSector || "Aviation Briefing"}
              </button>
              <button
                className={`sector-nav-btn ${selectedSector === "marine" ? "active" : ""}`}
                onClick={() => setSelectedSector("marine")}
              >
                🌊 {t.marineSector || "Marine & Coastal"}
              </button>
              <button
                className={`sector-nav-btn ${selectedSector === "smart_city" ? "active" : ""}`}
                onClick={() => setSelectedSector("smart_city")}
              >
                🏙️ {t.smartCitySector || "Smart City"}
              </button>
            </div>

            {/* AGRICULTURE PANEL */}
            {selectedSector === "agriculture" && (
              <div className="card sector-detail-card farming-advisory-card">
                {/* Header */}
                <div className="farming-header-row">
                  <div>
                    <span className="eyebrow">{t.cropDecisionEngine || "CROP-WEATHER DECISION ENGINE"}</span>
                    <h2>{t.farmingAdvisory || "Farming & Pesticide Advisory"} ({city})</h2>
                    <p className="farming-header-sub">
                      Real-time agromet decision matrix for chemical spraying, irrigation scheduling, and crop safety.
                    </p>
                  </div>
                  <span className={`suitability-badge ${advisoriesData?.agriculture?.status === "SUITABLE" ? "badge-green" : "badge-red"}`}>
                    {advisoriesData?.agriculture?.status === "SUITABLE" ? "✓" : "⚠️"} {t.sprayStatus || "SPRAY STATUS"}: {translateStatus(advisoriesData?.agriculture?.status, language)}
                  </span>
                </div>

                {/* Farming Agromet Quick Metrics Strip */}
                <div className="farming-metrics-grid">
                  <div className="farming-metric-box metric-rain">
                    <span className="f-icon">🌧️</span>
                    <div className="f-info">
                      <small>Rain Probability</small>
                      <strong>{weather?.daily?.[0]?.rain_chance ?? weather?.humidity ?? 78}%</strong>
                      <span className="f-badge">{weather?.daily?.[0]?.rain_chance > 40 ? "Wash-off Risk" : "Low Wash-off"}</span>
                    </div>
                  </div>
                  <div className="farming-metric-box metric-wind">
                    <span className="f-icon">💨</span>
                    <div className="f-info">
                      <small>Spray Drift Wind</small>
                      <strong>{weather?.wind_speed ?? 14} km/h</strong>
                      <span className="f-badge">{weather?.wind_speed > 20 ? "High Drift" : "Optimal Speed"}</span>
                    </div>
                  </div>
                  <div className="farming-metric-box metric-temp">
                    <span className="f-icon">🌡️</span>
                    <div className="f-info">
                      <small>Canopy Temp</small>
                      <strong>{weather?.temperature ?? 24}°C</strong>
                      <span className="f-badge">Evaporation Safe</span>
                    </div>
                  </div>
                  <div className="farming-metric-box metric-score">
                    <span className="f-icon">🎯</span>
                    <div className="f-info">
                      <small>Suitability Index</small>
                      <strong>{advisoriesData?.agriculture?.suitability_score ?? 60}/100</strong>
                      <span className="f-badge">{advisoriesData?.agriculture?.status}</span>
                    </div>
                  </div>
                </div>

                {/* Advisory Main Recommendation Box */}
                <div className={`advisory-highlight-box farming-highlight-box ${advisoriesData?.agriculture?.status === "SUITABLE" ? "status-suitable" : "status-unsuitable"}`}>
                  <div className="highlight-header">
                    <span className="highlight-icon">
                      {advisoriesData?.agriculture?.status === "SUITABLE" ? "✅" : "⚠️"}
                    </span>
                    <h3>{t.recommendation || "Agrochemical Spray Decision"}:</h3>
                  </div>
                  <p style={{ fontSize: "16px", marginTop: "8px", lineHeight: "1.55" }}>
                    {advisoriesData?.agriculture?.spray_recommendation}
                  </p>
                </div>

                {/* Two-Column Grid: Factors & Irrigation */}
                <div className="farming-two-col-grid">
                  {/* Meteorological Factors */}
                  <div className="farming-sub-card factors-card">
                    <h4>🌾 {t.meteorologicalFactors || "Meteorological Factors Considered"}:</h4>
                    <div className="factors-pills-list">
                      {advisoriesData?.agriculture?.reasons?.map((r, i) => (
                        <div key={i} className="factor-pill-item">
                          <span className="pill-dot">●</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Irrigation Guidance */}
                  <div className="farming-sub-card irrigation-card">
                    <h4>💧 {t.irrigationGuidance || "Irrigation & Soil Moisture Guidance"}:</h4>
                    <p>{advisoriesData?.agriculture?.irrigation_advice}</p>
                  </div>
                </div>

                {/* Harvest Advice (if present) */}
                {advisoriesData?.agriculture?.harvest_advice && (
                  <div className="farming-sub-card harvest-card" style={{ marginTop: "18px" }}>
                    <h4>🚜 Harvest & Post-Harvest Protection Advisory:</h4>
                    <p>{advisoriesData?.agriculture?.harvest_advice}</p>
                  </div>
                )}

                {/* Target Regional Crops */}
                <div className="farming-crops-section" style={{ marginTop: "22px" }}>
                  <h4>🌱 {t.targetCrops || "Target Regional Crops"}:</h4>
                  <div className="crop-chips">
                    {advisoriesData?.agriculture?.target_crops?.map((c, i) => {
                      const cropIcons = {
                        "Paddy / Rice": "🌾",
                        "Cotton": "🌿",
                        "Sugarcane": "🎋",
                        "Wheat": "🌾",
                        "Soybean": "🌱",
                        "Pulses & Vegetables": "🥬",
                      };
                      return (
                        <span key={i} className="crop-chip">
                          <span className="crop-emoji">{cropIcons[c] || "🌱"}</span>
                          {c}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* AVIATION PANEL */}
            {selectedSector === "aviation" && (
              <div className="card sector-detail-card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.aviationBriefing || "ICAO METAR / TAF FLIGHT BRIEFING"}</span>
                    <h2>{t.aviationStation || "Aviation Weather Station"}</h2>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      maxLength={4}
                      value={aviationAirport}
                      onChange={(e) => setAviationAirport(e.target.value.toUpperCase())}
                      placeholder="ICAO Code"
                      style={{ padding: "6px 12px", background: "var(--card-light)", border: "1px solid var(--border)", color: "#fff", borderRadius: "6px", width: "100px", textTransform: "uppercase" }}
                    />
                    <button className="outline-button" onClick={() => fetchAviation(aviationAirport)}>
                      {t.lookup || "Lookup"}
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
                  <div className="aviation-stat card">
                    <small>{t.flightCategory || "Flight Category"}</small>
                    <strong style={{ fontSize: "24px", color: aviationData?.flight_category === "VFR" ? "var(--green)" : "var(--yellow)" }}>
                      {aviationData?.flight_category || "VFR"}
                    </strong>
                  </div>
                  <div className="aviation-stat card">
                    <small>{t.airport || "Airport"}</small>
                    <strong style={{ fontSize: "24px" }}>{aviationData?.airport || aviationAirport}</strong>
                  </div>
                  <div className="aviation-stat card">
                    <small>{t.wind || "Wind"}</small>
                    <strong style={{ fontSize: "24px" }}>{aviationData?.decoded?.wind_speed_kt || 8} kts</strong>
                  </div>
                  <div className="aviation-stat card">
                    <small>{t.altimeter || "Altimeter"}</small>
                    <strong style={{ fontSize: "24px" }}>{aviationData?.decoded?.altimeter_hpa || 1013} hPa</strong>
                  </div>
                </div>

                <div style={{ background: "#040a14", padding: "16px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <small style={{ color: "var(--muted)", display: "block", marginBottom: "6px" }}>{t.rawMetar || "RAW METAR OBSERVATION (NOAA)"}:</small>
                  <code style={{ fontFamily: "monospace", color: "#55d98a", fontSize: "14px" }}>
                    {aviationData?.raw_metar}
                  </code>
                </div>
              </div>
            )}

            {/* MARINE PANEL */}
            {selectedSector === "marine" && (
              <div className="card sector-detail-card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.coastalSafety || "COASTAL & MARITIME SAFETY"}</span>
                    <h2>{t.marineAdvisory || "Marine Weather Advisory"}</h2>
                  </div>
                  <span className={`suitability-badge ${advisoriesData?.marine?.status === "SAFE" ? "badge-green" : "badge-orange"}`}>
                    {t.status || "STATUS"}: {translateStatus(advisoriesData?.marine?.status, language)}
                  </span>
                </div>
                <div className="advisory-highlight-box">
                  <h3>{t.coastalConditions || "Coastal Conditions"}:</h3>
                  <p style={{ fontSize: "16px", marginTop: "8px" }}>
                    {advisoriesData?.marine?.recommendation}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <Metric icon="💨" label={t.surfaceWind || "Surface Wind"} value={`${advisoriesData?.marine?.wind_knots} Knots`} />
                  <Metric icon="🌊" label={t.seaState || "Sea State"} value={translateStatus(advisoriesData?.marine?.status, language)} />
                </div>
              </div>
            )}

            {/* SMART CITY PANEL */}
            {selectedSector === "smart_city" && (
              <div className="card sector-detail-card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.urbanIntelligence || "URBAN ENVIRONMENTAL INTELLIGENCE"}</span>
                    <h2>{t.smartCityTitle || "Smart City Weather Monitoring"} ({city})</h2>
                  </div>
                </div>
                <div className="advisory-highlight-box">
                  <h3>{t.urbanComfort || "Urban Comfort & Air Quality"}:</h3>
                  <p style={{ fontSize: "16px", marginTop: "8px" }}>
                    {advisoriesData?.smart_city?.recommendation}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <Metric icon="🌡️" label={t.apparentHeatIndex || "Apparent Heat Index"} value={`${advisoriesData?.smart_city?.heat_index_c}°C`} />
                  <Metric icon="🍃" label={t.airQualityStatus || "Air Quality Status"} value={translateRiskLevel(weather?.air_quality?.status, language) || "Moderate"} />
                  <Metric icon="🏙️" label={t.urbanFloodRisk || "Urban Flood Risk"} value={translateRiskLevel(weather?.risk?.rain_risk, language) || "Low"} />
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================================================== */}
        {/* VIEW 6: CLIMATE INSIGHTS */}
        {/* ==================================================== */}
        {activePage === "insights" && (
          <section className="insights-view">
            {/* Header Card */}
            <div className="card climate-header-card">
              <div className="climate-header-top">
                <div>
                  <span className="eyebrow">{t.insightsEyebrow || "CLIMATE TRENDS & HISTORICAL ANALYSIS"}</span>
                  <h2>{t.insightsTitle || "Multi-Year Climate Evolution"} ({city})</h2>
                  <p className="climate-header-sub">
                    Decadal temperature anomaly, historical monsoon variance, and long-range climatological projections.
                  </p>
                </div>
                <span className="climate-warming-badge">
                  🔥 {climateData?.warming_trend_percentage || "+4.2%"} {t.warmingTrend || "Warming Trend"}
                </span>
              </div>

              <div className="climate-baseline-banner">
                <span className="baseline-icon">📍</span>
                <p>
                  <strong>{t.warmingBaseline || "Baseline Reference"}:</strong> {climateData?.reference_period || "1991-2020 WMO Standard Baseline"} • {t.temperatureAnomaly || "Mean temperature anomaly"}: <strong>{climateData?.temperature_anomaly_c}</strong>.
                </p>
              </div>

              {/* Climate Key Indicators Strip */}
              <div className="climate-metrics-grid">
                <div className="climate-metric-box warm-box">
                  <div className="c-metric-icon">🌡️</div>
                  <div className="c-metric-info">
                    <small>Mean Surface Temp</small>
                    <strong>{climateData?.historical_series?.[climateData.historical_series.length - 1]?.avg_temp || "25.3"}°C</strong>
                    <span>+1.25°C pre-industrial</span>
                  </div>
                </div>

                <div className="climate-metric-box rain-box">
                  <div className="c-metric-icon">🌧️</div>
                  <div className="c-metric-info">
                    <small>Monsoon Variability</small>
                    <strong>High Variance</strong>
                    <span>Short cloudbursts & dry spells</span>
                  </div>
                </div>

                <div className="climate-metric-box extreme-box">
                  <div className="c-metric-icon">📈</div>
                  <div className="c-metric-info">
                    <small>Heat Extremes (&gt;38°C)</small>
                    <strong>+16% Shift</strong>
                    <span>Decadal increase frequency</span>
                  </div>
                </div>

                <div className="climate-metric-box projection-box">
                  <div className="c-metric-icon">🌐</div>
                  <div className="c-metric-info">
                    <small>2050 MoES Projection</small>
                    <strong>+1.5°C to 2.0°C</strong>
                    <span>SSP2-4.5 Pathway</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Annual Anomalies */}
            <div className="card climate-history-card">
              <div className="climate-card-header">
                <div>
                  <span className="eyebrow">LONGITUDINAL OBSERVATIONS</span>
                  <h3>{t.historicalAnomalies || "Historical Annual Anomalies (2018 - 2026)"}</h3>
                  <p className="climate-card-sub">Annual average temperature variations and Southwest monsoon precipitation anomalies.</p>
                </div>
              </div>

              <div className="history-table-container">
                <table className="climate-table">
                  <thead>
                    <tr>
                      <th>{t.year || "Year"}</th>
                      <th>{t.meanTemp || "Mean Temp (°C)"}</th>
                      <th>{t.temperatureAnomaly || "Temperature Anomaly"}</th>
                      <th>{t.monsoonRainfallVsNormal || "Monsoon Rainfall vs. Normal"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {climateData?.historical_series?.map((row, idx) => (
                      <tr key={idx}>
                        <td><strong>{row.year}</strong></td>
                        <td><span className="temp-val">{row.avg_temp}°C</span></td>
                        <td>
                          <span className={`anomaly-pill ${parseFloat(row.anomaly) > 1.0 ? "anomaly-high" : "anomaly-med"}`}>
                            {row.anomaly}
                          </span>
                        </td>
                        <td>
                          <span className={`rain-pill ${parseInt(row.rainfall_percent) >= 100 ? "rain-above" : "rain-below"}`}>
                            🌧️ {row.rainfall_percent}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Meteorological & Research Insights */}
            <div className="card climate-insights-card">
              <div className="climate-card-header">
                <div>
                  <span className="eyebrow">SCIENTIFIC FINDINGS</span>
                  <h3>{t.keyResearchInsights || "Key Meteorological & Research Insights"}</h3>
                  <p className="climate-card-sub">MoES climate monitoring, agromet adaptation directives, and urban vulnerability assessments.</p>
                </div>
              </div>

              <div className="climate-insights-grid">
                {climateData?.insights?.map((item, i) => {
                  const icons = ["🌡️", "🌧️", "📈", "🌾"];
                  const titles = [
                    "Regional Heatwave Shift",
                    "Precipitation Spikes & Flash Floods",
                    "MoES 2050 Climate Pathways",
                    "Agromet Mitigation & Resilient Crops"
                  ];
                  return (
                    <div key={i} className={`insight-card insight-card-${i % 4}`}>
                      <div className="insight-card-header">
                        <span className="insight-icon">{icons[i % icons.length]}</span>
                        <strong>{titles[i % titles.length]}</strong>
                      </div>
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* VIEW 7: PERSONALIZED OUTFIT & SUGGESTIONS */}
        {/* ==================================================== */}
        {activePage === "outfit" && (
          <OutfitPlanner
            city={weather?.city || city}
            language={language}
            onAskInChat={(msg) => {
              setActivePage("chat");
              handleSendChat(msg);
            }}
          />
        )}

        {/* ==================================================== */}
        {/* VIEW 8: ACCOUNT & AUTHENTICATION (STANDALONE) */}
        {/* ==================================================== */}
        {activePage === "auth" && (
          <AuthPage
            onLoginSuccess={(u) => {
              setCurrentUser(u);
              setActivePage("dashboard");
            }}
            onClose={() => setActivePage("dashboard")}
            isModal={false}
            theme={theme}
            onThemeChange={handleThemeChange}
          />
        )}

        {/* AUTHENTICATION MODAL OVERLAY */}
        {showAuthModal && (
          <AuthPage
            onLoginSuccess={(u) => {
              setCurrentUser(u);
              setShowAuthModal(false);
            }}
            onClose={() => setShowAuthModal(false)}
            isModal={true}
            theme={theme}
            onThemeChange={handleThemeChange}
          />
        )}

        {/* SEVERE DISASTER EMERGENCY ALERT MODAL OVERLAY */}
        {showDisasterModal && activeDisaster && (
          <div className="disaster-modal-overlay">
            <div className="disaster-modal-card">
              <div className="disaster-modal-strobe-header">
                <div className="strobe-badge">
                  <span className="strobe-dot"></span>
                  <span>{t.disasterAlertTitle || "SEVERE DISASTER EARLY WARNING"}</span>
                </div>
                <button
                  type="button"
                  className="disaster-modal-close"
                  onClick={() => setShowDisasterModal(false)}
                  title="Close window"
                >
                  ✕
                </button>
              </div>

              <div className="disaster-modal-body">
                <div className="disaster-hero-section">
                  <div className="disaster-icon-large">
                    {activeDisaster.hazard_type === "flood" ? "🌊" : activeDisaster.hazard_type === "cyclone" ? "🌀" : activeDisaster.hazard_type === "tsunami" ? "🌊" : "🚨"}
                  </div>
                  <div>
                    <div className="disaster-category-pill">
                      {activeDisaster.hazard_type === "flood"
                        ? (t.heavyFloodAlert || "Heavy Floods & Inundation Warning")
                        : activeDisaster.hazard_type === "cyclone"
                        ? (t.cycloneAlert || "Severe Cyclone & Destructive Gale Warning")
                        : activeDisaster.hazard_type === "tsunami"
                        ? (t.tsunamiAlert || "Tsunami Early Warning & Sea Surge")
                        : activeDisaster.event}
                    </div>
                    <h2 className="disaster-title">{activeDisaster.event}</h2>
                    <p className="disaster-location-sub">
                      📍 <strong>{activeDisaster.location}</strong> • {t.system || "Source"}: {activeDisaster.source}
                    </p>
                  </div>
                </div>

                <div className="disaster-headline-box">
                  <p>{activeDisaster.headline}</p>
                </div>

                <div className="disaster-action-callout">
                  <h4>⚠️ {t.immediateAction || "IMMEDIATE LIFE-SAFETY ACTION REQUIRED"} (NDRF / SDMA)</h4>
                  <p>{activeDisaster.action}</p>
                </div>

                <div className="disaster-siren-status-card">
                  <div className="siren-status-indicator">
                    <span className={`siren-beacon ${isSirenActive ? "siren-beacon-active" : ""}`}>🚨</span>
                    <div>
                      <strong>{isSirenActive ? (t.sirenSounding || "LOUD EMERGENCY SIREN SOUNDING") : "EMERGENCY ALARM SYSTEM READY"}</strong>
                      <p>{isSirenActive ? "Loud siren wail is sounding to alert residents of upcoming disaster." : "Siren is currently muted. Click below to sound again."}</p>
                    </div>
                  </div>
                  <div className="siren-controls-row">
                    {isSirenActive ? (
                      <button
                        type="button"
                        className="siren-control-btn mute-siren-btn"
                        onClick={stopEmergencySiren}
                      >
                        🔇 {t.muteSiren || "MUTE SIREN & ACKNOWLEDGE"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="siren-control-btn play-siren-btn"
                        onClick={() => playEmergencySiren(true)}
                      >
                        🔊 {t.resoundSiren || "SOUND LOUD SIREN"}
                      </button>
                    )}
                    <button
                      type="button"
                      className="siren-control-btn dismiss-modal-btn"
                      onClick={() => {
                        stopEmergencySiren();
                        setShowDisasterModal(false);
                      }}
                    >
                      {t.dismissAlert || "Acknowledge & Close"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer>
          <div>
            <strong>{t.brandTitle || "WeatherGPT"}</strong>
            <span>{t.footerTagline || "Conversational AI Platform for Weather Intelligence"}</span>
          </div>
          <span>{t.footerBuiltWith || "Built with FastAPI, Vite React, NWP Models & WIS2.0"}</span>
        </footer>
      </main>
    </div>
  );
}

/* SUB-COMPONENTS */

function Metric({ icon, label, value }) {
  return (
    <div className="metric">
      <span className="metric-icon">{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Risk({ name, value }) {
  return (
    <div className="risk-row">
      <span>{name}</span>
      <strong style={{ color: value === "High" ? "var(--red)" : value === "Moderate" ? "var(--yellow)" : "var(--green)" }}>
        {value}
      </strong>
    </div>
  );
}

function ForecastRow({ day, icon, temp, low, rain }) {
  return (
    <div className="forecast-row">
      <span className="forecast-day">{day}</span>
      <span className="forecast-icon">{icon}</span>
      <span className="forecast-temp">
        <strong>{temp}</strong> <small className="forecast-low">/ {low}</small>
      </span>
      <span className="forecast-rain">💧 {rain}</span>
    </div>
  );
}

function Module({ icon, title, text, status, onClick }) {
  return (
    <div className="module card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="module-icon">{icon}</div>
      <div className="module-content">
        <div className="module-title">
          <h3>{title}</h3>
          <span>{status}</span>
        </div>
        <p>{text}</p>
      </div>
      <button>→</button>
    </div>
  );
}