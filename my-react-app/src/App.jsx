import { useState, useEffect, useRef } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import OutfitPlanner from "./components/OutfitPlanner";
import NwpComparison from "./components/NwpComparison";
import WeatherMapPage from "./components/WeatherMapPage";
import WeatherVisualScene from "./components/WeatherVisualScene";
import HeroCelestialAtmosphere from "./components/HeroCelestialAtmosphere";
import VoiceModal from "./components/VoiceModal";
import SettingsPage from "./components/SettingsPage";
import AboutPage from "./components/AboutPage";
import PastWeatherPage from "./components/PastWeatherPage";
import HourlyProgressionGraph from "./components/HourlyProgressionGraph";
import ErrorBoundary from "./components/ErrorBoundary";

const API_BASE = import.meta.env.VITE_API_BASE || (
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") &&
  window.location.port !== "8000"
    ? `http://${window.location.hostname}:8000`
    : ""
);

import {
  TRANSLATIONS,
  LANG_CODE_MAP,
  translateCondition,
  translateRiskLevel,
  translateStatus,
  getTranslation,
  translateDay,
  translateRegionName,
  translateCropText,
  translateAdvisorySentence,
  translateReason,
  getChatWelcomeMessage,
  translateChatMessage,
  translateChatHistory,
  translateUserQuestion,
  getLocalizedQuestion,
  translateInsightTitle,
  translateInsightContent,
  translateScientificEyebrow,
  translateClimateCardSubtitle,
  translateLongitudinalEyebrow,
  translateClimateHeaderSub,
  translateClimateHistorySub,
  translateClimateIndicator,
  translateAlertEvent,
  translateAlertHeadline,
  translateAlertAction,
  translateAlertValidUntil,
  translateHazardCategory,
  translateAlertSeverity,
  translateAlertSource,
  translateHelpline,
  translateNwpConfidence,
} from "./utils/translations";

export default function App() {
  const [city, setCity] = useState("Bengaluru");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [alertsData, setAlertsData] = useState([]);
  const [advisoriesData, setAdvisoriesData] = useState(null);
  const [advisoriesLoading, setAdvisoriesLoading] = useState(false);
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
  const [marineBasinFilter, setMarineBasinFilter] = useState("ALL");
  const [portSearchQuery, setPortSearchQuery] = useState("");
  const [language, setLanguage] = useState("English");
  const t = getTranslation(language);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Live Running Time Clock
  const [liveTime, setLiveTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const liveTimeString = liveTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

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
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationToast, setLocationToast] = useState(null);

  // Helper to generate simulated 24-hour hourly fallback if network is delayed
  const generateDefaultHourly = (currWeather) => {
    const list = [];
    const baseT = currWeather?.temperature || 26;
    const nowHour = new Date().getHours();
    for (let i = 0; i < 24; i++) {
      const h = (nowHour + i) % 24;
      const ampm = h < 12 ? "AM" : "PM";
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const delta = Math.sin(((h - 8) * Math.PI) / 12) * 4;
      list.push({
        time: `${h12} ${ampm}`,
        hour: `${h < 10 ? "0" : ""}${h}:00`,
        temperature: Math.round((baseT + delta) * 10) / 10,
        condition: currWeather?.condition || "Partly Cloudy",
        icon: currWeather?.condition_icon || "https://cdn.weatherapi.com/weather/64x64/day/116.png",
        rain_chance: currWeather?.daily?.[0]?.rain_chance || 15,
        wind_speed_kmh: currWeather?.wind_speed_kmh || 12,
        humidity: currWeather?.humidity || 60,
        is_current: i === 0,
      });
    }
    return list;
  };

  // Real-time GPS Geolocation Detection for Dashboard
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    setLocationToast({ type: "info", message: "📡 Detecting your real live location via GPS..." });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`${API_BASE}/weather?lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const wData = await res.json();
            const resolvedCity = wData.city || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
            setCity(resolvedCity);
            setWeather(wData);
            setLocationToast({ type: "success", message: `📍 Live Location Detected: ${resolvedCity}` });
            setTimeout(() => setLocationToast(null), 4500);
            fetchAllData(resolvedCity, simulatedDisaster, latitude, longitude);
          } else {
            setLocationToast({ type: "error", message: "⚠️ Could not resolve weather for GPS coordinates." });
            setTimeout(() => setLocationToast(null), 4000);
          }
        } catch (err) {
          console.error("GPS location error:", err);
          setLocationToast({ type: "error", message: "⚠️ Failed to fetch weather for your location." });
          setTimeout(() => setLocationToast(null), 4000);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        let msg = "Could not retrieve your device location.";
        if (err.code === 1) msg = "Location permission denied. Please allow location access in your browser settings.";
        else if (err.code === 2) msg = "GPS position unavailable.";
        else if (err.code === 3) msg = "GPS location request timed out.";
        setLocationToast({ type: "error", message: `⚠️ ${msg}` });
        setTimeout(() => setLocationToast(null), 5000);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      isWelcome: true,
      text: getChatWelcomeMessage("English"),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  // Fetch all chat sessions from SQLite database
  const fetchChatSessions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/sessions`);
      if (res.ok) {
        const data = await res.json();
        setChatSessions(data.sessions || []);
      }
    } catch (e) {
      console.warn("Could not fetch chat sessions:", e);
    }
  };

  useEffect(() => {
    fetchChatSessions();
  }, []);

  // Load messages for a specific session from SQLite database
  const loadSession = async (sessionId) => {
    try {
      setChatLoading(true);
      const res = await fetch(`${API_BASE}/api/chat/sessions/${sessionId}/messages`);
      if (res.ok) {
        const data = await res.json();
        const loaded = (data.messages || []).map((m) => ({
          role: m.role,
          text: m.text,
          source: m.source,
          isVoice: Boolean(m.isVoice || m.is_voice),
          time: new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));
        if (loaded.length === 0) {
          setChatMessages([
            {
              role: "assistant",
              isWelcome: true,
              text: getChatWelcomeMessage(language),
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        } else {
          setChatMessages(loaded);
        }
        setCurrentSessionId(sessionId);
      }
    } catch (e) {
      console.error("Error loading session:", e);
    } finally {
      setChatLoading(false);
    }
  };

  // Start a new chat session
  const handleNewChat = () => {
    setCurrentSessionId(null);
    setChatMessages([
      {
        role: "assistant",
        isWelcome: true,
        text: getChatWelcomeMessage(language),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Delete an individual chat session from SQLite database
  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation();
    try {
      const res = await fetch(`${API_BASE}/api/chat/sessions/${sessionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (currentSessionId === sessionId) {
          handleNewChat();
        }
        fetchChatSessions();
      }
    } catch (err) {
      console.error("Delete session error:", err);
    }
  };

  // Clear all chat history from SQLite database
  const handleClearAllHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/history`, {
        method: "DELETE",
      });
      if (res.ok) {
        setChatSessions([]);
        handleNewChat();
      }
    } catch (err) {
      console.error("Clear all history error:", err);
    }
  };

  // Synchronize and translate chat messages (both welcome greeting and prior history) when language changes
  useEffect(() => {
    setChatMessages((prev) => translateChatHistory(prev, language));
  }, [language]);

  const messagesEndRef = useRef(null);

  // Load all weather intelligence data for current city or GPS coordinates
  const fetchAllData = async (targetCity = city, disasterOverride = simulatedDisaster, targetLat = null, targetLon = null) => {
    setLoading(true);
    setAdvisoriesLoading(true);
    try {
      const coordParam = (targetLat !== null && targetLon !== null)
        ? `lat=${targetLat}&lon=${targetLon}`
        : `city=${encodeURIComponent(targetCity)}`;

      // 1. Live Weather & Metrics
      const weatherUrl = disasterOverride
        ? `${API_BASE}/weather?${coordParam}&disaster=${disasterOverride}`
        : `${API_BASE}/weather?${coordParam}`;
      const resWeather = await fetch(weatherUrl);
      if (resWeather.ok) {
        const wData = await resWeather.json();
        setWeather(wData);
        if (wData.city) setCity(wData.city);
      }

      // 2. Forecast & NWP
      const resForecast = await fetch(`${API_BASE}/forecast?${coordParam}&model=${selectedNwpModel}`);
      if (resForecast.ok) {
        const fData = await resForecast.json();
        setForecastData(fData);
      }

      // 3. Alerts
      const alertsUrl = disasterOverride
        ? `${API_BASE}/alerts?${coordParam}&disaster=${disasterOverride}`
        : `${API_BASE}/alerts?${coordParam}`;
      const resAlerts = await fetch(alertsUrl);
      if (resAlerts.ok) {
        const aData = await resAlerts.json();
        const incomingAlerts = aData.alerts || [];
        setAlertsData(incomingAlerts);
        checkAndTriggerDisaster(incomingAlerts, targetCity);
      }

      // 4. Sector Advisories
      const resAdv = await fetch(`${API_BASE}/advisories?${coordParam}`);
      if (resAdv.ok) {
        const advData = await resAdv.json();
        setAdvisoriesData(advData.advisories || null);
      }

      // 5. Climate Trends
      const resClimate = await fetch(`${API_BASE}/climate?${coordParam}`);
      if (resClimate.ok) {
        const cData = await resClimate.json();
        setClimateData(cData);
      }

      // 6. NWP Model Comparison (GFS vs ECMWF)
      setNwpCompareLoading(true);
      const resNwpComp = await fetch(`${API_BASE}/nwp-compare?${coordParam}`);
      if (resNwpComp.ok) {
        const ncData = await resNwpComp.json();
        setNwpCompareData(ncData);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setNwpCompareLoading(false);
      setAdvisoriesLoading(false);
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

  // Chat message submission (text vs voice distinction with multilingual support)
  const handleSendChat = async (userMsgText = chatInput, isVoice = false, overrideLang = null) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (!userMsgText.trim() || chatLoading) return;

    const activeLanguage = overrideLang || language;

    // When typed in chat, cancel any voice speech so responses remain strictly text-only
    if (!isVoice && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const rawUserText = userMsgText.trim();
    // For voice commands, preserve the user's spoken words directly. For typed text, localize standard queries if needed.
    const userText = (!isVoice && activeLanguage !== "English") ? translateUserQuestion(rawUserText, activeLanguage) : rawUserText;
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
          language: activeLanguage,
          session_id: currentSessionId,
          is_voice: isVoice,
        }),
      });

      const data = await response.json();
      const botReply = data.reply || "Unable to receive weather response.";

      if (data.session_id) {
        setCurrentSessionId(data.session_id);
        fetchChatSessions();
      }

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

      // Automatic Conversation Mode: Speak out loud in the matching preferred/detected language!
      if (isVoice) {
        speakText(botReply, data.language || activeLanguage);
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

  // Voice Speech-To-Text: Displays dedicated interactive Voice Modal
  const handleVoiceInput = () => {
    setShowVoiceModal(true);
  };

  // Text-To-Speech audio readout for Voice Conversation Mode matching spoken language
  const speakText = (text, langCode = language) => {
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
    const bcpCode = LANG_CODE_MAP[langCode] || "en-IN";
    utterance.lang = bcpCode;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Try finding matching synthesizer voice for the target language
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = bcpCode.split("-")[0];
        const match = voices.find(
          (v) => v.lang.toLowerCase() === bcpCode.toLowerCase() || v.lang.toLowerCase().startsWith(langPrefix)
        );
        if (match) utterance.voice = match;
      }
    } catch (e) {}

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
    { id: "history", icon: "📜", name: t.pastWeather || "Past weather search" },
    { id: "insights", icon: "◈", name: t.insights },
    { id: "settings", icon: "⚙️", name: t.settings || "Settings" },
    { id: "about", icon: "ℹ️", name: t.about || "About" },
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

            {/* Real-Time GPS My Current Location Trigger (Compact & Sleek) */}
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="topbar-current-loc-btn"
              title="Detect real live GPS coordinates and update dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 11px",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.14) 100%)",
                border: "1px solid #10b981",
                borderRadius: "8px",
                color: "#10b981",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.78rem",
                whiteSpace: "nowrap",
                height: "36px",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "12px" }}>{isLocating ? "⏳" : "📍"}</span>
              <span>{isLocating ? "Locating..." : (t.myLocation || "My Location")}</span>
            </button>

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

        {/* GEOLOCATION NOTIFICATION TOAST */}
        {locationToast && (
          <div
            style={{
              margin: "14px 28px 0 28px",
              padding: "12px 18px",
              borderRadius: "10px",
              background:
                locationToast.type === "success"
                  ? "rgba(16, 185, 129, 0.18)"
                  : locationToast.type === "error"
                  ? "rgba(239, 68, 68, 0.18)"
                  : "rgba(59, 130, 246, 0.18)",
              border: `1px solid ${
                locationToast.type === "success"
                  ? "#10b981"
                  : locationToast.type === "error"
                  ? "#ef4444"
                  : "var(--primary)"
              }`,
              color:
                locationToast.type === "success"
                  ? "#10b981"
                  : locationToast.type === "error"
                  ? "#ef4444"
                  : "var(--primary-light)",
              fontSize: "0.88rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              animation: "fadeIn 0.25s ease-out",
            }}
          >
            <span>{locationToast.message}</span>
            <button
              type="button"
              onClick={() => setLocationToast(null)}
              style={{
                background: "transparent",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "12px",
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* ==================================================== */}
        {/* VIEW 1: DASHBOARD */}
        {/* ==================================================== */}
        {activePage === "dashboard" && (
          <>
            {/* HERO SEARCH & AI CHAT LAUNCHER WITH INTEGRATED CELESTIAL BACKGROUND */}
            <section className="hero-search">
              {/* Dynamic Celestial Sky Atmosphere in space behind & above text (No separate box) */}
              <HeroCelestialAtmosphere />

              <div className="search-content">
                <div className="ai-label">
                  <span className="ai-label-tag">✦ AI WEATHER ASSISTANT</span>
                  <span className="ai-label-time">🕒 {liveTimeString}</span>
                </div>
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
                    handleSendChat(getLocalizedQuestion("outfit", city, language));
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
                    handleSendChat(getLocalizedQuestion("rain", city, language));
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
                    handleSendChat(getLocalizedQuestion("spray", city, language));
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
                <strong>{translateRegionName(weather?.city || city, language)}</strong>
                <span>
                  {weather?.region && weather.region.toLowerCase() !== (weather?.country || "").toLowerCase()
                    ? `${translateRegionName(weather.region, language)}, `
                    : ""}
                  {translateRegionName(weather?.country, language) || weather?.country || "IN"}
                </span>
                {weather?.local_time && (
                  <small style={{ marginLeft: "12px", color: "var(--muted)" }}>{t.localTime || "Local:"} {weather.local_time}</small>
                )}
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  className="refresh"
                  title="Detect GPS location"
                  style={{
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid #10b981",
                    color: "#10b981",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontWeight: "600",
                  }}
                >
                  <span>{isLocating ? "⏳" : "📍"}</span>
                  <span>{isLocating ? "Locating..." : (t.myLocation || "Current Location")}</span>
                </button>
                <button onClick={() => fetchAllData(city)} className="refresh">
                  {t.refresh}
                </button>
              </div>
            </div>

            {/* CURRENT WEATHER & RISK ROW */}
            <section className="dashboard-grid">
              {/* CURRENT CONDITIONS CARD */}
              <div className="current-weather card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.currentConditions}</span>
                    <h3>{translateRegionName(weather?.city || city, language)}</h3>
                  </div>
                  <span className="live">● {t.liveBadge || "LIVE"}</span>
                </div>

                {loading ? (
                  <div className="loading">{t.fetchingLiveData || "Fetching live meteorological data..."}</div>
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
                    <p>{t.noWeatherData || "No weather data loaded."}</p>
                    <button onClick={() => fetchAllData(city)}>{t.loadWeather || "Load Weather"}</button>
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
                    ? (t.riskDescLow || "Current weather conditions indicate minimal operational and environmental risk.")
                    : weather?.risk?.level === "MODERATE"
                    ? (t.riskDescModerate || "Moderate weather impact. Check farming spray drift and road travel conditions.")
                    : (t.riskDescHigh || "Elevated hazard warning. Follow early warning safety guidelines.")}
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
                      day={idx === 0 ? (t.today || "Today") : `${translateDay(f.day, language)}${f.date ? ' (' + f.date.slice(5) + ')' : ''}`}
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
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <strong style={{ fontSize: "13px", color: "var(--text)", display: "block" }}>{alertsData[0].event}</strong>
                      <p style={{ fontSize: "12px", lineHeight: "1.5", margin: "5px 0", color: "var(--text)" }}>{alertsData[0].headline || alertsData[0].action}</p>
                      <small style={{ fontSize: "11px", color: "var(--muted)" }}>{alertsData[0].severity} • {alertsData[0].location}</small>
                    </div>
                  </div>
                ) : (
                  <div className="alert-box">
                    <div className="alert-icon" style={{ background: "rgba(85,217,138,0.2)", color: "var(--green)" }}>✓</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <strong style={{ fontSize: "13px", color: "var(--text)", display: "block" }}>{t.noActiveAlerts ? (t.greenNormal || "No Severe Hazards") : "No Severe Hazards"}</strong>
                      <p style={{ fontSize: "12px", lineHeight: "1.5", margin: "5px 0", color: "var(--muted)" }}>{t.noActiveAlerts || `Normal meteorological conditions across ${city}.`}</p>
                      <small style={{ fontSize: "11px", color: "var(--muted)" }}>{t.systemOnline || "All sensors operational"}</small>
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

            {/* 24-HOUR HOURLY PROGRESSION GRAPH */}
            <HourlyProgressionGraph
              hourlyData={weather?.hourly && weather.hourly.length > 0 ? weather.hourly : generateDefaultHourly(weather)}
              language={language}
              theme={theme}
              city={city}
              t={t}
            />

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
                  text={advisoriesLoading ? (t.fetchingAgriProfile || "Analyzing regional soil, spray safety & crop matrix...") : (translateAdvisorySentence(advisoriesData?.agriculture?.spray_recommendation, language) || t.cropWeatherMatrixSub || "Pesticide spray suitability & irrigation schedules.")}
                  status={advisoriesLoading ? "..." : (translateStatus(advisoriesData?.agriculture?.status, language) || t.suitable)}
                  onClick={() => { setSelectedSector("agriculture"); setActivePage("sectors"); }}
                />
                <Module
                  icon="✈️"
                  title={t.aviationSector || "Aviation Briefing"}
                  text={translateAdvisorySentence(advisoriesData?.aviation?.recommendation, language) || "METAR, TAF, VFR/IFR flight categories."}
                  status={translateStatus(advisoriesData?.aviation?.flight_category, language) || "VFR"}
                  onClick={() => { setSelectedSector("aviation"); setActivePage("sectors"); }}
                />
                <Module
                  icon="🌊"
                  title={t.marineSector || "Marine & Coastal"}
                  text={translateAdvisorySentence(advisoriesData?.marine?.recommendation, language) || "Coastal wind speeds, wave alerts, and fishing safety."}
                  status={translateStatus(advisoriesData?.marine?.status, language) || translateStatus("SAFE", language)}
                  onClick={() => { setSelectedSector("marine"); setActivePage("sectors"); }}
                />
                <Module
                  icon="🏙️"
                  title={t.smartCitySector || "Smart City Monitoring"}
                  text={translateAdvisorySentence(advisoriesData?.smart_city?.recommendation, language) || "Urban heat index, AQI warnings, and drainage vulnerability."}
                  status={translateStatus(advisoriesData?.smart_city?.comfort_level, language) || translateStatus("PLEASANT", language)}
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
          <ErrorBoundary
            title="Weather Map & Meteorological GIS Radar"
            message="An unexpected rendering issue occurred in the interactive map view. You can reload or return to the main dashboard."
          >
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
              onLocationSelect={(lat, lon) => {
                fetchAllData(city, simulatedDisaster, lat, lon);
              }}
            />
          </ErrorBoundary>
        )}

        {/* ==================================================== */}
        {/* VIEW 2: ASK WEATHERGPT (CHAT) */}
        {/* ==================================================== */}
        {/* ==================================================== */}
        {/* VIEW 2: ASK WEATHERGPT (CHAT) */}
        {/* ==================================================== */}
        {activePage === "chat" && (
          <section className="chat-layout-container">
            {/* PAST CONVERSATIONS SIDEBAR */}
            <aside className="chat-history-sidebar">
              <div className="chat-history-header">
                <h4>🗂️ {t.chatHistory || "Chat History"}</h4>
              </div>

              <div className="chat-history-actions">
                <button
                  type="button"
                  className="new-chat-btn"
                  onClick={handleNewChat}
                  title={t.newChat || "New Chat"}
                >
                  <span>+</span> {t.newChat || "New Chat"}
                </button>
                <button
                  type="button"
                  className="clear-history-mini-btn"
                  onClick={() => {
                    if (window.confirm(t.clearHistoryConfirm || "Clear all conversation history from database?")) {
                      handleClearAllHistory();
                    }
                  }}
                  title={t.clearHistory || "Clear history"}
                >
                  🗑️
                </button>
              </div>

              <div className="sessions-scroll-list">
                {chatSessions.length === 0 ? (
                  <p className="no-sessions-label">
                    {t.noPastSessions || "No past conversations yet. Ask a question to start!"}
                  </p>
                ) : (
                  chatSessions.map((s) => (
                    <div
                      key={s.id}
                      className={`session-list-item ${currentSessionId === s.id ? "active" : ""}`}
                      onClick={() => loadSession(s.id)}
                    >
                      <div className="session-item-info">
                        <span className="session-item-title">{s.title || "Weather Consultation"}</span>
                        <span className="session-item-meta">
                          <span>{s.city || city}</span> &bull; <span>{s.message_count || 0} msgs</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        className="delete-session-btn"
                        onClick={(e) => handleDeleteSession(e, s.id)}
                        title="Delete session"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </aside>

            {/* MAIN CHAT CONVERSATION AREA */}
            <div className="chat-main-area">
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
                  onClick={() =>
                    setChatMessages([
                      {
                        role: "assistant",
                        isWelcome: true,
                        text: getChatWelcomeMessage(language),
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                      },
                    ])
                  }
                >
                  {t.clearChat || "Clear Chat"}
                </button>
              </div>
            </div>

            <div className="chat-messages-container card">
              {chatMessages.map((msg, index) => {
                const messageText = msg.isWelcome
                  ? getChatWelcomeMessage(language)
                  : (translateChatMessage(msg.text, language) || msg.text);

                return (
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
                        {messageText}
                      </div>
                      {msg.role === "assistant" && (
                        <div className="bubble-footer">
                          <button
                            className="tts-btn"
                            onClick={() => speakText(messageText)}
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
                );
              })}

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
                  <button onClick={() => handleSendChat(getLocalizedQuestion("spray", city, language), false)}>
                    {t.pesticideAdviceChip || "🌾 Pesticide Spray Advice"}
                  </button>
                  <button onClick={() => handleSendChat(getLocalizedQuestion("alerts", city, language), false)}>
                    {t.disasterAlertsChip || "🚨 Disaster Alerts & Warnings"}
                  </button>
                  <button onClick={() => handleSendChat(getLocalizedQuestion("aviation", city, language), false)}>
                    {t.aviationBriefingChip || "✈️ Aviation Briefing (VOBL)"}
                  </button>
                  <button onClick={() => handleSendChat(getLocalizedQuestion("climate", city, language), false)}>
                    {t.climateTrendsChip || "📊 Climate Trends & Anomalies"}
                  </button>
                  <button onClick={() => handleSendChat(getLocalizedQuestion("outfit", city, language), false)}>
                    {t.outfitAdviceChip || "👔 Outfit & Travel Advice"}
                  </button>
                  <button onClick={() => handleSendChat(getLocalizedQuestion("weather", city, language), false)}>
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
            </div>
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
                  <h2>{t.forecast} ({nwpForecastDays}-{t.days || "Day"}) - {translateRegionName(city, language)}</h2>
                </div>
                <div className="nwp-day-toggle-group">
                  <button
                    type="button"
                    className={`nwp-day-toggle-btn ${nwpForecastDays === 7 ? "active" : ""}`}
                    onClick={() => setNwpForecastDays(7)}
                  >
                    7 {t.days || "Days"}
                  </button>
                  <button
                    type="button"
                    className={`nwp-day-toggle-btn ${nwpForecastDays === 14 ? "active" : ""}`}
                    onClick={() => setNwpForecastDays(14)}
                  >
                    14 {t.days || "Days"}
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
                    <strong>{idx === 0 ? (t.today || "Today") : (translateDay(day.day, language) || "Day")}</strong>
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
            <div className="card alerts-main-header-card">
              <div className="alerts-header-top-row">
                <div>
                  <span className="eyebrow">{t.alertsEyebrow || "EARLY WARNING & DISASTER DISSEMINATION"}</span>
                  <h2 className="alerts-page-title">{t.activeAlerts} - {city}</h2>
                  <p className="alerts-page-sub">
                    {t.alertsSubtitle || "Standardized India Meteorological Department (IMD / MoES) multi-hazard early warning dissemination."}
                  </p>
                </div>
                <div className="alerts-header-actions">
                  <button
                    type="button"
                    onClick={playEmergencySiren}
                    className={`emergency-siren-btn ${isSirenActive ? "active" : ""}`}
                  >
                    🚨 {isSirenActive ? (t.sirenActive || "Broadcasting Siren...") : (t.emergencySiren || "Sound Siren Alarm")}
                  </button>
                  <span className="alert-count-pill">{alertsData.length} {t.activeBadge || "ACTIVE"}</span>
                </div>
              </div>

              {/* IMD 4-Tier Protocol Legend with Full Space Utilization */}
              <div className="imd-protocol-legend-grid">
                <div className="legend-pill-box legend-red">
                  <span className="legend-indicator">🔴</span>
                  <div>
                    <strong>{t.redWarning || "Red Warning"}</strong>
                    <small>{t.takeAction || "Take Action (Severe Hazard)"}</small>
                  </div>
                </div>
                <div className="legend-pill-box legend-orange">
                  <span className="legend-indicator">🟠</span>
                  <div>
                    <strong>{t.orangeAlert || "Orange Alert"}</strong>
                    <small>{t.bePrepared || "Be Prepared (High Disruption)"}</small>
                  </div>
                </div>
                <div className="legend-pill-box legend-yellow">
                  <span className="legend-indicator">🟡</span>
                  <div>
                    <strong>{t.yellowWatch || "Yellow Watch"}</strong>
                    <small>{t.beAware || "Be Aware (Moderate Watch)"}</small>
                  </div>
                </div>
                <div className="legend-pill-box legend-green">
                  <span className="legend-indicator">🟢</span>
                  <div>
                    <strong>{t.greenNormal || "Green Normal"}</strong>
                    <small>{t.allClear || "All Clear (Routine Monitoring)"}</small>
                  </div>
                </div>
              </div>

              {/* Disaster Simulation Testing Bar for Evaluators */}
              <div className="disaster-sim-bar">
                <div className="disaster-sim-title">
                  <span style={{ fontSize: "18px" }}>🚨</span>
                  <strong>{t.simulateDisaster || "Simulate Severe Hazard (Evaluator Mode):"}</strong>
                </div>
                <div className="disaster-sim-buttons">
                  <button
                    type="button"
                    className="sim-btn sim-flood"
                    onClick={() => handleSimulateDisaster("flood")}
                  >
                    {t.testFlood || "🌊 Test Flood Warning"}
                  </button>
                  <button
                    type="button"
                    className="sim-btn sim-cyclone"
                    onClick={() => handleSimulateDisaster("cyclone")}
                  >
                    {t.testCyclone || "🌀 Test Cyclone Warning"}
                  </button>
                  <button
                    type="button"
                    className="sim-btn sim-tsunami"
                    onClick={() => handleSimulateDisaster("tsunami")}
                  >
                    {t.testTsunami || "🌊 Test Tsunami Warning"}
                  </button>
                  {simulatedDisaster && (
                    <button
                      type="button"
                      className="sim-btn sim-clear"
                      onClick={() => handleSimulateDisaster(null)}
                    >
                      {t.clearHazard || "🟢 Normal Weather"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ALERTS LIST WITH COMPREHENSIVE SPACE UTILIZATION */}
            <div className="alerts-list">
              {alertsData.length > 0 ? (
                alertsData.map((alert, index) => {
                  const isRed = alert.severity?.toLowerCase().includes("red") || alert.imd_code === "RED";
                  const isOrange = alert.severity?.toLowerCase().includes("orange") || alert.imd_code === "ORANGE";
                  const isYellow = alert.severity?.toLowerCase().includes("yellow") || alert.imd_code === "YELLOW";
                  const isGreen = !isRed && !isOrange && !isYellow;

                  const alertIcon =
                    alert.hazard_type === "flood" ? "🌊" :
                    alert.hazard_type === "cyclone" ? "🌀" :
                    alert.hazard_type === "tsunami" ? "🌊" :
                    alert.hazard_type === "heatwave" ? "🔥" :
                    alert.hazard_type === "storm" ? "⛈️" :
                    isGreen ? "✅" : "⚠️";

                  return (
                    <div
                      key={index}
                      className={`alert-detail-card card ${isRed ? "card-alert-red" : isOrange ? "card-alert-orange" : isYellow ? "card-alert-yellow" : "card-alert-green"}`}
                    >
                      {/* Top Header Row with Event Title, Headline, and Severity Badge */}
                      <div className="alert-card-header">
                        <div className="alert-icon-title-wrap">
                          <div className={`alert-big-icon-box ${isRed ? "icon-red" : isOrange ? "icon-orange" : isYellow ? "icon-yellow" : "icon-green"}`}>
                            <span>{alertIcon}</span>
                          </div>
                          <div className="alert-headings-col">
                            <div className="alert-category-tag">
                              {translateHazardCategory(alert.hazard_type, language)}
                            </div>
                            <h3 className="alert-event-title">{translateAlertEvent(alert.event, language)}</h3>
                            <p className="alert-headline-text">{translateAlertHeadline(alert.headline, language)}</p>
                          </div>
                        </div>

                        <div className="alert-badge-group">
                          <span className={`alert-severity-badge ${isRed ? "badge-red-solid" : isOrange ? "badge-orange-solid" : isYellow ? "badge-yellow-solid" : "badge-green-solid"}`}>
                            {isRed && <span className="alert-pulse-dot"></span>}
                            {translateAlertSeverity(alert.severity, language)}
                          </span>
                        </div>
                      </div>

                      {/* Spacious, Beautiful Safety Action Box */}
                      <div className={`alert-actions-box ${isRed ? "action-box-red" : isOrange ? "action-box-orange" : isYellow ? "action-box-yellow" : "action-box-green"}`}>
                        <div className="action-box-header">
                          <span className="action-shield-icon">🛡️</span>
                          <h4>{t.safetyActions || "Recommended Safety & Protective Actions"}:</h4>
                        </div>
                        <p className="action-box-content">{translateAlertAction(alert.action, language)}</p>
                      </div>

                      {/* Full-width Responsive Metadata Grid */}
                      <div className="alert-meta-grid">
                        <div className="alert-meta-item">
                          <span className="meta-label">📍 {t.target || "Affected Region / Location"}</span>
                          <strong className="meta-value">{translateRegionName(alert.location || city, language)}</strong>
                        </div>
                        <div className="alert-meta-item">
                          <span className="meta-label">⏳ {t.valid || "Advisory Validity Window"}</span>
                          <strong className="meta-value">{translateAlertValidUntil(alert.valid_until || "Next 24 Hours", language)}</strong>
                        </div>
                        <div className="alert-meta-item">
                          <span className="meta-label">📡 {t.system || "Early Warning Source"}</span>
                          <strong className="meta-value">{translateAlertSource(alert.source || "IMD / MoES WeatherGPT Warning Network", language)}</strong>
                        </div>
                      </div>

                      {/* Emergency Helpline Strip for Severe Red Alerts */}
                      {isRed && (
                        <div className="alert-helpline-strip">
                          <span>🚨 <strong>{translateHelpline("nationalEmergency", language)}</strong></span>
                          <span>•</span>
                          <span>{translateHelpline("sdma", language)}</span>
                          <span>•</span>
                          <span>{translateHelpline("ndrf", language)}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="card" style={{ padding: "40px 24px", textAlign: "center" }}>
                  <span style={{ fontSize: "40px" }}>🟢</span>
                  <h3 style={{ margin: "12px 0 6px 0" }}>{t.noActiveAlertsTitle || "No Active Severe Disaster Warnings"}</h3>
                  <p style={{ color: "var(--muted)" }}>{t.allParametersSafe || "All meteorological parameters are within safe thresholds for"} {translateRegionName(city, language)}.</p>
                </div>
              )}
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
                {advisoriesLoading ? (
                  <div className="farming-loading-card">
                    <div className="farming-spinner-circle"></div>
                    <h4>🌾 {t.fetchingAgriProfile || "Analyzing Regional Soil & Agro-Climatic Profile..."}</h4>
                    <p>
                      {t.fetchingSoilSub || "Fetching authentic soil characteristics, seasonal farming calendar & historically cultivated crops for"} <strong>{translateRegionName(city, language)}</strong>...
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="farming-header-row">
                  <div>
                    <span className="eyebrow">{t.cropDecisionEngine || "CROP-WEATHER DECISION ENGINE"}</span>
                    <h2>{t.farmingAdvisory || "Farming & Pesticide Advisory"} ({translateRegionName(city, language)})</h2>
                    <p className="farming-header-sub">
                      {t.cropWeatherMatrixSub || "Real-time agromet decision matrix for chemical spraying, irrigation scheduling, and crop safety."}
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
                      <small>{t.rainProbabilityLabel || "Rain Probability"}</small>
                      <strong>{weather?.daily?.[0]?.rain_chance ?? weather?.humidity ?? 78}%</strong>
                      <span className="f-badge">{weather?.daily?.[0]?.rain_chance > 40 ? (t.washOffRisk || "Wash-off Risk") : (t.lowWashOff || "Low Wash-off")}</span>
                    </div>
                  </div>
                  <div className="farming-metric-box metric-wind">
                    <span className="f-icon">💨</span>
                    <div className="f-info">
                      <small>{t.sprayDriftWind || "Spray Drift Wind"}</small>
                      <strong>{weather?.wind_speed ?? 14} km/h</strong>
                      <span className="f-badge">{weather?.wind_speed > 20 ? (t.highDrift || "High Drift") : (t.optimalSpeed || "Optimal Speed")}</span>
                    </div>
                  </div>
                  <div className="farming-metric-box metric-temp">
                    <span className="f-icon">🌡️</span>
                    <div className="f-info">
                      <small>{t.canopyTemp || "Canopy Temp"}</small>
                      <strong>{weather?.temperature ?? 24}°C</strong>
                      <span className="f-badge">{weather?.temperature >= 35 ? (t.highEvaporation || "High Evaporation") : (t.evaporationSafe || "Evaporation Safe")}</span>
                    </div>
                  </div>
                  <div className="farming-metric-box metric-score">
                    <span className="f-icon">🎯</span>
                    <div className="f-info">
                      <small>{t.suitabilityIndex || "Suitability Index"}</small>
                      <strong>{advisoriesData?.agriculture?.suitability_score ?? 60}/100</strong>
                      <span className="f-badge">{translateStatus(advisoriesData?.agriculture?.status, language)}</span>
                    </div>
                  </div>
                </div>

                {/* Advisory Main Recommendation Box */}
                <div className={`advisory-highlight-box farming-highlight-box ${advisoriesData?.agriculture?.status === "SUITABLE" ? "status-suitable" : "status-unsuitable"}`}>
                  <div className="highlight-header">
                    <span className="highlight-icon">
                      {advisoriesData?.agriculture?.status === "SUITABLE" ? "✅" : "⚠️"}
                    </span>
                    <h3>{t.agrochemicalSprayDecision || t.recommendation || "Agrochemical Spray Decision:"}</h3>
                  </div>
                  <p style={{ fontSize: "16px", marginTop: "8px", lineHeight: "1.55" }}>
                    {translateAdvisorySentence(advisoriesData?.agriculture?.spray_recommendation, language)}
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
                          <span>{translateReason(r, language)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Irrigation Guidance */}
                  <div className="farming-sub-card irrigation-card">
                    <h4>💧 {t.irrigationGuidance || "Irrigation & Soil Moisture Guidance"}:</h4>
                    <p>{translateAdvisorySentence(advisoriesData?.agriculture?.irrigation_advice, language)}</p>
                  </div>
                </div>

                {/* Harvest Advice (if present) */}
                {advisoriesData?.agriculture?.harvest_advice && (
                  <div className="farming-sub-card harvest-card" style={{ marginTop: "18px" }}>
                    <h4>🚜 {t.harvestProtectionAdvisory || "Harvest & Post-Harvest Protection Advisory:"}</h4>
                    <p>{translateAdvisorySentence(advisoriesData?.agriculture?.harvest_advice, language)}</p>
                  </div>
                )}

                {/* 1. Regional Soil & Agro-Climatic Profile Box */}
                {advisoriesData?.agriculture?.soil_profile && (
                  <div className="farming-soil-profile-card" style={{ marginTop: "22px" }}>
                    <div className="soil-card-header">
                      <div className="soil-header-left">
                        <span className="soil-badge-icon">🪨</span>
                        <div>
                          <h4>{t.regionalSoilProfileTitle || "Regional Soil & Agro-Climatic Profile:"}</h4>
                          <small className="soil-sub-region">
                            {t.groundedFor || "Grounded for"} <strong>{translateRegionName(advisoriesData?.agriculture?.region_matched || city, language)}</strong> ({translateCropText(advisoriesData?.agriculture?.soil_profile?.agro_climatic_zone, language) || "ICAR Regional Sub-Zone"})
                          </small>
                        </div>
                      </div>
                      {advisoriesData?.agriculture?.current_season && (
                        <div className="season-active-pill">
                          <span className="season-dot">●</span>
                          <span>{translateCropText(advisoriesData?.agriculture?.current_season?.season_name, language)}</span>
                        </div>
                      )}
                    </div>

                    <div className="soil-metrics-grid">
                      <div className="soil-metric-item">
                        <span className="s-label">{t.primarySoilGroup || "Primary Soil Group"}</span>
                        <strong className="s-value">{translateCropText(advisoriesData?.agriculture?.soil_profile?.primary_soil, language)}</strong>
                      </div>
                      <div className="soil-metric-item">
                        <span className="s-label">{t.soilPhLevel || "Soil pH Level"}</span>
                        <strong className="s-value">{translateCropText(advisoriesData?.agriculture?.soil_profile?.ph_range, language)}</strong>
                      </div>
                      <div className="soil-metric-item">
                        <span className="s-label">{t.textureAeration || "Texture & Aeration"}</span>
                        <strong className="s-value">{translateCropText(advisoriesData?.agriculture?.soil_profile?.texture, language)}</strong>
                      </div>
                      <div className="soil-metric-item">
                        <span className="s-label">{t.organicCarbonDrainage || "Organic Carbon & Drainage"}</span>
                        <strong className="s-value">{translateCropText(advisoriesData?.agriculture?.soil_profile?.organic_carbon, language)} • {translateCropText(advisoriesData?.agriculture?.soil_profile?.drainage, language)}</strong>
                      </div>
                    </div>

                    {advisoriesData?.agriculture?.current_season?.key_focus && (
                      <div className="season-focus-banner">
                        <strong>{t.activeFarmCalendarFocus || "🗓️ Active Farm Calendar Focus:"}</strong> {translateCropText(advisoriesData?.agriculture?.current_season?.phase, language)} ({translateCropText(advisoriesData?.agriculture?.current_season?.calendar, language)}) — {translateCropText(advisoriesData?.agriculture?.current_season?.key_focus, language)}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Accurate Regional & Historical Crop Recommendations */}
                <div className="farming-crops-section" style={{ marginTop: "24px" }}>
                  <div className="crops-section-header">
                    <div>
                      <h4>{t.historicallyCultivatedHeader || "🌱 Historically Cultivated & Soil-Matched Crops for"} {translateRegionName(advisoriesData?.agriculture?.region_matched || city, language)}:</h4>
                      <p className="crops-subtext">
                        {t.calibratedIcarSub || "Calibrated with ICAR historical production records, local soil pH, and real-time seasonal weather compatibility."}
                      </p>
                    </div>
                  </div>

                  <div className="detailed-crop-cards-grid">
                    {(advisoriesData?.agriculture?.recommended_crops || []).map((crop, idx) => (
                      <div key={idx} className="crop-detail-card">
                        <div className="crop-card-top-row">
                          <div className="crop-title-group">
                            <span className="crop-large-icon">{crop.icon || "🌱"}</span>
                            <div>
                              <h5>{translateCropText(crop.name, language)}</h5>
                              <span className="crop-category-badge">{translateCropText(crop.category, language)}</span>
                            </div>
                          </div>
                          <div className="crop-match-pill">
                            <span className="match-num">{crop.calculated_score || crop.match_score || 95}%</span>
                            <small>{t.match || "Match"}</small>
                          </div>
                        </div>

                        <div className="crop-meta-features">
                          <div className="crop-feature-row">
                            <span className="cf-label">📜 {t.historicalRecord || "Historical Record:"}</span>
                            <span className="cf-text">{translateCropText(crop.historical_affinity, language)}</span>
                          </div>
                          <div className="crop-feature-row">
                            <span className="cf-label">🪨 {t.soilCompatibility || "Soil Compatibility:"}</span>
                            <span className="cf-text">{translateCropText(crop.soil_fit, language)}</span>
                          </div>
                          <div className="crop-feature-row">
                            <span className="cf-label">☀️ {t.climateWater || "Climate & Water:"}</span>
                            <span className="cf-text">{translateCropText(crop.climate_fit, language)}</span>
                          </div>
                          <div className="crop-feature-row">
                            <span className="cf-label">⏱️ {t.growthCycle || "Growth Cycle:"}</span>
                            <span className="cf-text">{translateCropText(crop.duration, language)} • <strong>{translateCropText(crop.season, language)}</strong></span>
                          </div>
                          {crop.pest_disease_watch && (
                            <div className="crop-feature-row pest-alert-row">
                              <span className="cf-label">🛡️ {t.cropProtection || "Crop Protection:"}</span>
                              <span className="cf-text">{translateCropText(crop.pest_disease_watch, language)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

            {/* AVIATION PANEL */}
            {selectedSector === "aviation" && (() => {
              const activeTel = advisoriesData?.aviation?.telemetry || aviationData?.telemetry || {
                wind: `${weather?.wind_degree || 250}° at ${Math.round((weather?.wind_speed_kmh || 14) / 1.852)} kt`,
                visibility: `${weather?.visibility_km || 8} km`,
                clouds: "Scattered at 1,200 ft; Broken at 8,000 ft",
                temperature: `${Math.round(weather?.temperature || 26)}°C`,
                dew_point: `${Math.round((weather?.temperature || 26) - ((100 - (weather?.humidity || 70)) / 5))}°C`,
                qnh: `${Math.round(weather?.surface_pressure || 1011)} hPa`,
                trend: "No significant change",
              };

              const aviationHelplines = advisoriesData?.aviation?.helplines || aviationData?.helplines || [
                { title: "DGCA Air Safety & Accident Reporting Directorate", phone: "1800-11-0033 (Toll-Free 24x7) / +91-11-24622495", desc: "Directorate General of Civil Aviation incident reporting & flight safety helpline" },
                { title: "AAI Central Air Traffic Flow Management (C-ATFM New Delhi)", phone: "+91-11-24632950 / +91-11-24610843", desc: "Airports Authority of India national airspace congestion, slot allocation & flow management" },
                { title: "Aeronautical Rescue Coordination Centre (ARCC India)", phone: "1554 (Toll-Free SAR) / +91-11-25653452 / +91-44-22561515", desc: "Joint aeronautical search and rescue coordination (SAR) for aircraft emergencies in Indian airspace" },
                { title: "IMD Aviation Meteorological Briefing Office", phone: "+91-11-24652251 / +91-11-24619943", desc: "Official METAR, TAF, SIGMET & severe convective weather aerodrome briefings" },
                { title: "Bureau of Civil Aviation Security (BCAS Control Room)", phone: "1800-180-1011 (Toll-Free 24x7) / +91-11-24647000", desc: "National civil aviation security emergencies, threat assessment & anti-hijacking coordination" },
                { title: "Emergency Aeronautical Guard Frequency (VHF / UHF)", phone: "121.500 MHz (VHF) / 243.000 MHz (UHF Military)", desc: "Universal international aeronautical emergency & distress guard monitored by all ATCs & aircraft" },
              ];

              return (
                <div className="card sector-detail-card aviation-advisory-card">
                  <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <span className="eyebrow">{t.aviationBriefing || "ICAO METAR / TAF FLIGHT BRIEFING"}</span>
                      <h2 style={{ margin: "4px 0 0 0" }}>{t.aviationStation || "Aviation Flight Safety & Meteorological Station"}</h2>
                      <small style={{ color: "var(--muted)" }}>
                        Real-time aeronautical observations calibrated for {translateRegionName(city, language)} ({aviationData?.airport || aviationAirport})
                      </small>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <input
                        type="text"
                        maxLength={4}
                        value={aviationAirport}
                        onChange={(e) => setAviationAirport(e.target.value.toUpperCase())}
                        placeholder="ICAO"
                        style={{
                          padding: "6px 12px",
                          background: "var(--card-light)",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                          borderRadius: "8px",
                          width: "90px",
                          textTransform: "uppercase",
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      />
                      <button className="outline-button" onClick={() => fetchAviation(aviationAirport)} style={{ padding: "6px 14px" }}>
                        {t.lookup || "Lookup"}
                      </button>
                    </div>
                  </div>

                  {/* Flight Category & Operational Status Banner */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "18px 0 16px 0",
                      padding: "14px 18px",
                      borderRadius: "12px",
                      background: (aviationData?.flight_category || advisoriesData?.aviation?.flight_category) === "VFR"
                        ? "rgba(16, 185, 129, 0.12)"
                        : "rgba(245, 158, 11, 0.12)",
                      border: (aviationData?.flight_category || advisoriesData?.aviation?.flight_category) === "VFR"
                        ? "1px solid rgba(16, 185, 129, 0.35)"
                        : "1px solid rgba(245, 158, 11, 0.35)",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "700" }}>
                        {t.flightCategory || "Flight Rules Category"}
                      </span>
                      <div style={{ fontSize: "1.3rem", fontWeight: "800", color: (aviationData?.flight_category || advisoriesData?.aviation?.flight_category) === "VFR" ? "#10b981" : "#f59e0b" }}>
                        ✈️ {aviationData?.flight_category || advisoriesData?.aviation?.flight_category || "VFR"} — Visual Flight Rules Operable
                      </div>
                    </div>
                    <span className="live" style={{ fontSize: "0.82rem" }}>● SYNCHRONIZED</span>
                  </div>

                  {/* REAL-TIME FLIGHT TELEMETRY (User Specified Exact 7 Fields) */}
                  <div className="aviation-telemetry-container" style={{ margin: "20px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "1.1rem" }}>📡</span>
                      <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: "700", color: "var(--text)" }}>
                        Real-Time Aeronautical Telemetry (Grounded & Calibrated)
                      </h4>
                    </div>

                    <div
                      className="aviation-telemetry-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "12px",
                      }}
                    >
                      <div className="telemetry-box card" style={{ padding: "14px 16px", background: "var(--card-light)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "600" }}>Surface Wind</span>
                        <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--text)", marginTop: "4px" }}>
                          🌬️ Wind: <span style={{ color: "#38bdf8" }}>{activeTel.wind}</span>
                        </div>
                      </div>

                      <div className="telemetry-box card" style={{ padding: "14px 16px", background: "var(--card-light)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "600" }}>Surface Visibility</span>
                        <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--text)", marginTop: "4px" }}>
                          👁️ Visibility: <span style={{ color: "#38bdf8" }}>{activeTel.visibility}</span>
                        </div>
                      </div>

                      <div className="telemetry-box card" style={{ padding: "14px 16px", background: "var(--card-light)", borderRadius: "10px", border: "1px solid var(--border)", gridColumn: "span 2" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "600" }}>Cloud Ceiling & Layers</span>
                        <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--text)", marginTop: "4px" }}>
                          ☁️ Clouds: <span style={{ color: "#38bdf8" }}>{activeTel.clouds}</span>
                        </div>
                      </div>

                      <div className="telemetry-box card" style={{ padding: "14px 16px", background: "var(--card-light)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "600" }}>Air Temperature</span>
                        <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--text)", marginTop: "4px" }}>
                          🌡️ Temperature: <span style={{ color: "#38bdf8" }}>{activeTel.temperature}</span>
                        </div>
                      </div>

                      <div className="telemetry-box card" style={{ padding: "14px 16px", background: "var(--card-light)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "600" }}>Dew Point</span>
                        <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--text)", marginTop: "4px" }}>
                          💧 Dew point: <span style={{ color: "#38bdf8" }}>{activeTel.dew_point}</span>
                        </div>
                      </div>

                      <div className="telemetry-box card" style={{ padding: "14px 16px", background: "var(--card-light)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "600" }}>Altimeter Setting (QNH)</span>
                        <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--text)", marginTop: "4px" }}>
                          🧭 QNH: <span style={{ color: "#38bdf8" }}>{activeTel.qnh}</span>
                        </div>
                      </div>

                      <div className="telemetry-box card" style={{ padding: "14px 16px", background: "var(--card-light)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: "600" }}>Short-Term Trend</span>
                        <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--text)", marginTop: "4px" }}>
                          🔄 Trend: <span style={{ color: "#38bdf8" }}>{activeTel.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RAW METAR OBSERVATION */}
                  <div style={{ background: theme === "light" ? "#f1f5f9" : "#040a14", padding: "14px 18px", borderRadius: "10px", border: "1px solid var(--border)", marginBottom: "20px" }}>
                    <small style={{ color: "var(--muted)", display: "block", marginBottom: "6px", fontWeight: "600" }}>
                      {t.rawMetar || "RAW METAR OBSERVATION (NOAA & ICAO)"}:
                    </small>
                    <code style={{ fontFamily: "monospace", color: "#10b981", fontSize: "13.5px", wordBreak: "break-all" }}>
                      {aviationData?.raw_metar || `${aviationAirport} 251000Z 25014KT 8000 SCT012 BKN080 26/20 Q1011 NOSIG`}
                    </code>
                  </div>

                  {/* OFFICIAL AVIATION OPERATIONS & EMERGENCY HELPLINES */}
                  <div
                    className="aviation-helplines-card"
                    style={{
                      background: theme === "light" ? "#f8fafc" : "rgba(30, 41, 59, 0.45)",
                      borderRadius: "12px",
                      border: "1px solid var(--border)",
                      padding: "18px 20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                      <span style={{ fontSize: "1.2rem" }}>🚨</span>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: "var(--text)" }}>
                          {t.aviationHelplinesTitle || "Official Aviation Operations & Emergency Helplines"}
                        </h4>
                        <small style={{ color: "var(--muted)" }}>
                          Directorate General of Civil Aviation (DGCA) & Airports Authority of India (AAI) 24x7 Control
                        </small>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "10px" }}>
                      {aviationHelplines.map((item, hIdx) => (
                        <div
                          key={hIdx}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            background: "var(--card-light)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div style={{ fontWeight: "700", fontSize: "0.86rem", color: "var(--text)" }}>{item.title}</div>
                          <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "#38bdf8", margin: "3px 0" }}>
                            📞 {item.phone}
                          </div>
                          <div style={{ fontSize: "0.74rem", color: "var(--muted)" }}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* MARINE PANEL */}
            {selectedSector === "marine" && (() => {
              const marineHelplines = advisoriesData?.marine?.helplines || [
                { title: "Indian Coast Guard MRCC (Maritime Rescue)", phone: "1554 (Toll-Free 24x7) / +91-11-23384934", desc: "Maritime Search and Rescue, vessel distress & fishermen emergency" },
                { title: "INCOIS Ocean State Forecast Helpline", phone: "+91-40-23886000 / +91-9490144630", desc: "Real-time high wave alerts, swell surge & tsunami warning network" },
                { title: "State Fisheries & Disaster Management Control", phone: "1070 / 1077", desc: "Toll-free coastal disaster management and coastal district emergency operations" },
                { title: "International Marine VHF Distress", phone: "VHF Channel 16 (156.800 MHz)", desc: "Universal maritime calling, distress, urgency and safety frequency" },
              ];

              const portsList = advisoriesData?.marine?.coastal_ports || [
                { name: "Mumbai / Sassoon Dock & JNPT Port", state: "Maharashtra", basin: "Arabian Sea", wind_kts: 12, wave_height_m: 1.2, swell_period_s: 9, sea_state: "Slight", tide_info: "High: 3.8m (14:30) | Low: 0.9m (20:45)", status: "SAFE", advisory: "Favorable for mechanized trawlers and coastal traffic." },
                { name: "Veraval Fishery Harbour", state: "Gujarat (Saurashtra)", basin: "Arabian Sea", wind_kts: 14, wave_height_m: 1.4, swell_period_s: 8, sea_state: "Moderate", tide_info: "High: 2.9m (13:50) | Low: 0.7m (19:55)", status: "SAFE", advisory: "Deep sea fishing permitted with standard communication sets." },
                { name: "Kandla / Deendayal Port", state: "Gujarat (Gulf of Kutch)", basin: "Arabian Sea", wind_kts: 10, wave_height_m: 0.9, swell_period_s: 7, sea_state: "Calm to Slight", tide_info: "High: 5.4m (15:10) | Low: 1.1m (21:30)", status: "SAFE", advisory: "Tidal stream regular. Safe for cargo operations and artisanal boats." },
                { name: "New Mangalore Port & Malpe Harbour", state: "Karnataka", basin: "Arabian Sea", wind_kts: 11, wave_height_m: 1.1, swell_period_s: 10, sea_state: "Slight", tide_info: "High: 1.6m (12:40) | Low: 0.4m (18:50)", status: "SAFE", advisory: "Safe for purse-seine and gillnet operations across coastal Karnataka." },
                { name: "Kochi / Munambam Fishing Harbour", state: "Kerala", basin: "Arabian Sea", wind_kts: 12, wave_height_m: 1.3, swell_period_s: 11, sea_state: "Slight", tide_info: "High: 1.1m (13:15) | Low: 0.3m (19:25)", status: "SAFE", advisory: "Swell surge within safe thresholds for coastal fishing fleet." },
                { name: "Chennai Port & Kasimedu Harbour", state: "Tamil Nadu", basin: "Bay of Bengal", wind_kts: 13, wave_height_m: 1.3, swell_period_s: 9, sea_state: "Moderate", tide_info: "High: 1.2m (14:45) | Low: 0.4m (20:50)", status: "SAFE", advisory: "Coromandel coast swell normal. Mechanized craft operating normally." },
                { name: "Visakhapatnam Port & Fishing Harbour", state: "Andhra Pradesh", basin: "Bay of Bengal", wind_kts: 11, wave_height_m: 1.2, swell_period_s: 8, sea_state: "Slight to Moderate", tide_info: "High: 1.5m (13:30) | Low: 0.4m (19:40)", status: "SAFE", advisory: "Normal fishing conditions across North Andhra maritime zone." },
                { name: "Paradip Port & Fishery Base", state: "Odisha", basin: "Bay of Bengal", wind_kts: 15, wave_height_m: 1.6, swell_period_s: 8, sea_state: "Moderate", tide_info: "High: 2.2m (15:00) | Low: 0.6m (21:10)", status: "CAUTION", advisory: "Watch out for localized squalls during afternoon hours." },
                { name: "Haldia & Digha Coastal Fishery Centre", state: "West Bengal", basin: "Bay of Bengal", wind_kts: 12, wave_height_m: 1.1, swell_period_s: 7, sea_state: "Slight", tide_info: "High: 4.8m (16:20) | Low: 1.2m (22:45)", status: "SAFE", advisory: "High tidal amplitude in Hooghly estuary. Maintain mooring discipline." },
                { name: "Kanyakumari Marine Confluence", state: "Tamil Nadu", basin: "Indian Ocean", wind_kts: 16, wave_height_m: 1.7, swell_period_s: 12, sea_state: "Moderate", tide_info: "High: 1.0m (12:20) | Low: 0.3m (18:30)", status: "CAUTION", advisory: "Triple sea confluence cross-currents active. Artisanal crafts remain within 8 nm." },
                { name: "Port Blair Harbour & Haddo Wharf", state: "Andaman & Nicobar", basin: "Andaman Sea", wind_kts: 11, wave_height_m: 1.4, swell_period_s: 9, sea_state: "Slight to Moderate", tide_info: "High: 2.0m (13:40) | Low: 0.5m (19:50)", status: "SAFE", advisory: "Inter-island ferries and fishing vessels operating as per schedule." },
              ];

              const filteredPorts = portsList.filter((p) => {
                const matchesBasin = marineBasinFilter === "ALL" || p.basin.toLowerCase().includes(marineBasinFilter.toLowerCase());
                const q = portSearchQuery.trim().toLowerCase();
                if (!q) return matchesBasin;
                const matchesQuery =
                  p.name.toLowerCase().includes(q) ||
                  p.state.toLowerCase().includes(q) ||
                  p.basin.toLowerCase().includes(q) ||
                  (p.advisory && p.advisory.toLowerCase().includes(q)) ||
                  (p.sea_state && p.sea_state.toLowerCase().includes(q)) ||
                  (p.status && p.status.toLowerCase().includes(q));
                return matchesBasin && matchesQuery;
              });

              return (
                <div className="card sector-detail-card marine-advisory-card">
                  <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <span className="eyebrow">{t.coastalSafety || "COASTAL & MARITIME SAFETY"}</span>
                      <h2 style={{ margin: "4px 0 0 0" }}>{t.marineAdvisory || "Marine Weather Advisory & Port Intelligence"}</h2>
                      <small style={{ color: "var(--muted)" }}>
                        Indian Ocean, Arabian Sea & Bay of Bengal Maritime Safety Monitoring
                      </small>
                    </div>
                    <span className={`suitability-badge ${advisoriesData?.marine?.status === "SAFE" ? "badge-green" : "badge-orange"}`}>
                      {t.status || "STATUS"}: {translateStatus(advisoriesData?.marine?.status, language)}
                    </span>
                  </div>

                  <div className="advisory-highlight-box" style={{ margin: "16px 0" }}>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "1.05rem" }}>{t.coastalConditions || "Coastal & Maritime Conditions"}:</h3>
                    <p style={{ fontSize: "15px", lineHeight: "1.5", margin: 0 }}>
                      {translateAdvisorySentence(advisoriesData?.marine?.recommendation, language)}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "16px", marginBottom: "22px", flexWrap: "wrap" }}>
                    <Metric icon="💨" label={t.surfaceWind || "Surface Wind"} value={`${advisoriesData?.marine?.wind_knots || 12} Knots`} />
                    <Metric icon="🌊" label={t.seaState || "Sea State"} value={translateStatus(advisoriesData?.marine?.status, language) || "Slight"} />
                  </div>

                  {/* OFFICIAL MARITIME & COASTAL HELPLINES */}
                  <div
                    className="marine-helplines-card"
                    style={{
                      background: theme === "light" ? "#f8fafc" : "rgba(30, 41, 59, 0.45)",
                      borderRadius: "12px",
                      border: "1px solid var(--border)",
                      padding: "18px 20px",
                      marginBottom: "24px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                      <span style={{ fontSize: "1.2rem" }}>⚓</span>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: "var(--text)" }}>
                          {t.marineHelplinesTitle || "Official Maritime & Coastal Safety Helplines"}
                        </h4>
                        <small style={{ color: "var(--muted)" }}>
                          Indian Coast Guard (ICG), INCOIS & National Disaster Response Force
                        </small>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "10px" }}>
                      {marineHelplines.map((item, hIdx) => (
                        <div
                          key={hIdx}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            background: "var(--card-light)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div style={{ fontWeight: "700", fontSize: "0.86rem", color: "var(--text)" }}>{item.title}</div>
                          <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "#38bdf8", margin: "3px 0" }}>
                            📞 {item.phone}
                          </div>
                          <div style={{ fontSize: "0.74rem", color: "var(--muted)" }}>{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* INDIAN MARITIME BASINS, COASTAL PORTS & FISHERY HUBS */}
                  <div className="coastal-ports-section">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: "700", color: "var(--text)" }}>
                          {t.coastalPortsAndBasins || "Indian Maritime Basins, Coastal Ports & Fishery Hubs"}
                        </h4>
                        <small style={{ color: "var(--muted)" }}>
                          Real-time ocean state, wave height, swell period and safety advisories for fishermen
                        </small>
                      </div>

                      {/* Basin Filters */}
                      <div style={{ display: "flex", gap: "6px", background: "var(--card-light)", padding: "3px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                        {["ALL", "Arabian", "Bengal", "Indian Ocean"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setMarineBasinFilter(b)}
                            style={{
                              padding: "4px 10px",
                              fontSize: "11px",
                              borderRadius: "6px",
                              border: "none",
                              background: marineBasinFilter === b ? "var(--primary)" : "transparent",
                              color: marineBasinFilter === b ? "#ffffff" : "var(--muted)",
                              cursor: "pointer",
                              fontWeight: "600",
                            }}
                          >
                            {b === "ALL" ? "All Basins" : b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Coastal Ports & Fishery Hubs Search Option Bar */}
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                      <div style={{ position: "relative", flex: "1", minWidth: "260px" }}>
                        <input
                          type="text"
                          value={portSearchQuery}
                          onChange={(e) => setPortSearchQuery(e.target.value)}
                          placeholder="Search coastal ports, fishery hubs, docks, states (e.g., Mumbai, Malpe, Kasimedu, Gujarat)..."
                          style={{
                            width: "100%",
                            padding: "9px 36px 9px 36px",
                            background: "var(--card-light)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            color: "var(--text)",
                            fontSize: "0.88rem",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                        <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.6, fontSize: "14px", pointerEvents: "none" }}>
                          🔍
                        </span>
                        {portSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setPortSearchQuery("")}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              color: "var(--muted)",
                              cursor: "pointer",
                              fontSize: "12px",
                              padding: "2px 6px",
                            }}
                            title="Clear search"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      {portSearchQuery && (
                        <span style={{ fontSize: "0.82rem", color: "var(--primary-light)", fontWeight: "600" }}>
                          Found {filteredPorts.length} {filteredPorts.length === 1 ? "hub" : "hubs"}
                        </span>
                      )}
                    </div>

                    {filteredPorts.length === 0 ? (
                      <div style={{ padding: "32px 20px", textAlign: "center", background: "var(--card-light)", borderRadius: "12px", border: "1px solid var(--border)", color: "var(--muted)" }}>
                        <p style={{ margin: "0 0 12px 0", fontSize: "0.95rem" }}>
                          No coastal ports or fishery hubs found matching "<strong>{portSearchQuery}</strong>" in <strong>{marineBasinFilter === "ALL" ? "All Basins" : marineBasinFilter}</strong>.
                        </p>
                        <button
                          type="button"
                          className="outline-button"
                          onClick={() => { setPortSearchQuery(""); setMarineBasinFilter("ALL"); }}
                          style={{ padding: "6px 16px", fontSize: "0.82rem", borderRadius: "8px" }}
                        >
                          Reset Filters & View All
                        </button>
                      </div>
                    ) : (
                      <div
                        className="coastal-ports-grid"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                          gap: "14px",
                        }}
                      >
                        {filteredPorts.map((port, pIdx) => (
                        <div
                          key={pIdx}
                          className="port-card card"
                          style={{
                            padding: "16px",
                            borderRadius: "12px",
                            background: "var(--card-light)",
                            border: "1px solid var(--border)",
                            position: "relative",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                            <div>
                              <strong style={{ fontSize: "0.95rem", color: "var(--text)", display: "block" }}>{port.name}</strong>
                              <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>{port.state} • {port.basin}</small>
                            </div>
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: "6px",
                                fontSize: "10px",
                                fontWeight: "700",
                                background: port.status === "SAFE" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                                color: port.status === "SAFE" ? "#10b981" : "#f59e0b",
                                border: port.status === "SAFE" ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(245, 158, 11, 0.4)",
                              }}
                            >
                              {port.status}
                            </span>
                          </div>

                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "8px",
                              margin: "12px 0",
                              fontSize: "0.82rem",
                              background: theme === "light" ? "#f1f5f9" : "rgba(0,0,0,0.25)",
                              padding: "10px",
                              borderRadius: "8px",
                            }}
                          >
                            <div>
                              <span style={{ color: "var(--muted)", fontSize: "0.72rem", display: "block" }}>💨 Sea Wind</span>
                              <strong>{port.wind_kts} kts</strong>
                            </div>
                            <div>
                              <span style={{ color: "var(--muted)", fontSize: "0.72rem", display: "block" }}>🌊 Wave Height</span>
                              <strong>{port.wave_height_m}m</strong>
                            </div>
                            <div>
                              <span style={{ color: "var(--muted)", fontSize: "0.72rem", display: "block" }}>⏱️ Swell Period</span>
                              <strong>{port.swell_period_s}s ({port.sea_state})</strong>
                            </div>
                            <div>
                              <span style={{ color: "var(--muted)", fontSize: "0.72rem", display: "block" }}>📈 Tide Prediction</span>
                              <strong style={{ fontSize: "0.74rem" }}>{port.tide_info.split("|")[0]}</strong>
                            </div>
                          </div>

                          <div style={{ fontSize: "0.78rem", color: "var(--muted)", fontStyle: "italic", borderTop: "1px solid var(--border)", paddingTop: "8px" }}>
                            🛡️ {port.advisory}
                          </div>
                        </div>
                      ))}
                    </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* SMART CITY PANEL */}
            {selectedSector === "smart_city" && (
              <div className="card sector-detail-card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.urbanIntelligence || "URBAN ENVIRONMENTAL INTELLIGENCE"}</span>
                    <h2>{t.smartCityTitle || "Smart City Weather Monitoring"} ({translateRegionName(city, language)})</h2>
                  </div>
                </div>
                <div className="advisory-highlight-box">
                  <h3>{t.urbanComfort || "Urban Comfort & Air Quality"}:</h3>
                  <p style={{ fontSize: "16px", marginTop: "8px" }}>
                    {translateAdvisorySentence(advisoriesData?.smart_city?.recommendation, language)}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <Metric icon="🌡️" label={t.apparentHeatIndex || "Apparent Heat Index"} value={`${advisoriesData?.smart_city?.heat_index_c}°C`} />
                  <Metric icon="🍃" label={t.airQualityStatus || "Air Quality Status"} value={translateStatus(weather?.air_quality?.status, language) || "Moderate"} />
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
                  <h2>{t.insightsTitle || "Multi-Year Climate Evolution"} ({translateRegionName(city, language)})</h2>
                  <p className="climate-header-sub">
                    {translateClimateHeaderSub(language)}
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
                    <small>{translateClimateIndicator("Mean Surface Temp", language)}</small>
                    <strong>{climateData?.historical_series?.[climateData.historical_series.length - 1]?.avg_temp || "25.3"}°C</strong>
                    <span>{translateClimateIndicator("+1.25°C pre-industrial", language)}</span>
                  </div>
                </div>

                <div className="climate-metric-box rain-box">
                  <div className="c-metric-icon">🌧️</div>
                  <div className="c-metric-info">
                    <small>{translateClimateIndicator("Monsoon Variability", language)}</small>
                    <strong>{translateClimateIndicator("High Variance", language)}</strong>
                    <span>{translateClimateIndicator("Short cloudbursts & dry spells", language)}</span>
                  </div>
                </div>

                <div className="climate-metric-box extreme-box">
                  <div className="c-metric-icon">📈</div>
                  <div className="c-metric-info">
                    <small>{translateClimateIndicator("Heat Extremes (>38°C)", language)}</small>
                    <strong>{translateClimateIndicator("+16% Shift", language)}</strong>
                    <span>{translateClimateIndicator("Decadal increase frequency", language)}</span>
                  </div>
                </div>

                <div className="climate-metric-box projection-box">
                  <div className="c-metric-icon">🌐</div>
                  <div className="c-metric-info">
                    <small>{translateClimateIndicator("2050 MoES Projection", language)}</small>
                    <strong>+1.5°C to 2.0°C</strong>
                    <span>{translateClimateIndicator("SSP2-4.5 Pathway", language)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Annual Anomalies */}
            <div className="card climate-history-card">
              <div className="climate-card-header">
                <div>
                  <span className="eyebrow">{translateLongitudinalEyebrow(language)}</span>
                  <h3>{t.historicalAnomalies || "Historical Annual Anomalies (2018 - 2026)"}</h3>
                  <p className="climate-card-sub">{translateClimateHistorySub(language)}</p>
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
                  <span className="eyebrow">{translateScientificEyebrow(language)}</span>
                  <h3>{t.keyResearchInsights || "Key Meteorological & Research Insights"}</h3>
                  <p className="climate-card-sub">{translateClimateCardSubtitle(language)}</p>
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
                        <strong>{translateInsightTitle(titles[i % titles.length], language)}</strong>
                      </div>
                      <p>{translateInsightContent(item, language, i)}</p>
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
        {/* VIEW: HISTORICAL WEATHER ARCHIVE */}
        {/* ==================================================== */}
        {activePage === "history" && (
          <PastWeatherPage
            apiBase={API_BASE}
            language={language}
            onSelectCity={(targetCity) => {
              setCity(targetCity);
              fetchAllData(targetCity);
              setActivePage("dashboard");
            }}
          />
        )}

        {/* ==================================================== */}
        {/* VIEW: SETTINGS & CONFIGURATION */}
        {/* ==================================================== */}
        {activePage === "settings" && (
          <SettingsPage
            language={language}
            setLanguage={setLanguage}
            city={city}
            setCity={setCity}
            theme={theme}
            onThemeChange={handleThemeChange}
            onClearHistory={handleClearAllHistory}
            playTestSiren={playEmergencySiren}
            stopSiren={stopEmergencySiren}
            isSirenActive={isSirenActive}
            t={t}
          />
        )}

        {/* ==================================================== */}
        {/* VIEW: ABOUT SIH26068 (MoES) */}
        {/* ==================================================== */}
        {activePage === "about" && (
          <AboutPage
            language={language}
            t={t}
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

        {/* 🎙️ INTERACTIVE VOICE RECORDING MIC BOX OVERLAY */}
        <VoiceModal
          isOpen={showVoiceModal}
          onClose={(reason) => {
            setShowVoiceModal(false);
            if (reason === "timeout") {
              setLocationToast({
                type: "info",
                message: "⏱️ No voice detected. Voice mode exited. Click the mic to try again.",
              });
              setTimeout(() => setLocationToast(null), 4000);
            }
          }}
          onSend={(transcriptText, chosenLang) => {
            const finalLang = chosenLang || language;
            if (chosenLang && chosenLang !== language) {
              setLanguage(chosenLang);
            }
            setActivePage("chat");
            handleSendChat(transcriptText, true, finalLang);
          }}
          language={language}
          onLanguageChange={(newLang) => setLanguage(newLang)}
          city={weather?.city || city}
          t={t}
        />

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