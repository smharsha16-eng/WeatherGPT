import { useState, useEffect, useRef } from "react";
import "./App.css";
import AuthPage from "./components/AuthPage";
import OutfitPlanner from "./components/OutfitPlanner";

const API_BASE = import.meta.env.VITE_API_BASE || (window.location.port === "5173" ? "http://127.0.0.1:8000" : "");

const TRANSLATIONS = {
  English: {
    dashboard: "Dashboard",
    chat: "Ask WeatherGPT",
    forecast: "Forecast & NWP",
    alerts: "Alerts & Warnings",
    sectors: "Decision Support",
    insights: "Climate Insights",
    greeting: "Good day",
    subheading: "Real-time AI Weather Intelligence & Decision Support",
    askTitle: "Ask about the weather.",
    askSubtitle: "Get intelligent answers with NWP forecasts & advisories.",
    askPlaceholder: "e.g., Can I spray pesticides in Nashik tomorrow?",
    askBtn: "Ask",
    refresh: "↻ Refresh weather",
    currentConditions: "CURRENT CONDITIONS",
    decisionSupport: "DECISION SUPPORT",
    forecast7d: "7-DAY OUTLOOK",
    activeAlerts: "EXTREME WEATHER",
    forecastConfidence: "FORECAST CONFIDENCE",
    specializedModules: "SPECIALIZED WEATHER INTELLIGENCE",
    spatialMap: "SPATIAL WEATHER MAP",
    historicalTrends: "CLIMATE INTELLIGENCE",
    searchCity: "Search City",
    listening: "Listening... speak now",
    micUnavailable: "Speech recognition not supported in this browser.",
  },
  "हिन्दी": {
    dashboard: "डैशबोर्ड",
    chat: "वेदरजीपीटी से पूछें",
    forecast: "पूर्वानुमान एवं NWP",
    alerts: "आपदा चेतावनियाँ",
    sectors: "निर्णय सहायता",
    insights: "जलवायु अंतर्दृष्टि",
    greeting: "नमस्ते",
    subheading: "वास्तविक समय मौसम बुद्धिमत्ता और निर्णय सहायता",
    askTitle: "मौसम के बारे में पूछें।",
    askSubtitle: "संख्यात्मक मौसम मॉडल और सटीक कृषि सलाह प्राप्त करें।",
    askPlaceholder: "जैसे: क्या कल नासिक में कीटनाशक का छिड़काव कर सकते हैं?",
    askBtn: "पूछें",
    refresh: "↻ ताज़ा करें",
    currentConditions: "वर्तमान मौसम स्थिति",
    decisionSupport: "निर्णय समर्थन जोखिम",
    forecast7d: "7-दिवसीय पूर्वानुमान",
    activeAlerts: "मौसम चेतावनी",
    forecastConfidence: "पूर्वानुमान विश्वसनीयता",
    specializedModules: "विशेषज्ञ मौसम सहायता",
    spatialMap: "स्थानिक मौसम मानचित्र",
    historicalTrends: "दीर्घकालिक जलवायु प्रवृत्तियाँ",
    searchCity: "शहर खोजें",
    listening: "सुन रहे हैं... बोलिए",
    micUnavailable: "इस ब्राउज़र में स्पीच रिकॉग्निशन समर्थित नहीं है।",
  },
  "ಕನ್ನಡ": {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    chat: "ವೆದರ್‌ಜಿಪಿಟಿ ಕೇಳಿ",
    forecast: "ಮುನ್ಸೂಚನೆ & NWP",
    alerts: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು",
    sectors: "ನಿರ್ಧಾರ ಬೆಂಬಲ",
    insights: "ಹವಾಮಾನ ಒಳನೋಟ",
    greeting: "ನಮಸ್ಕಾರ",
    subheading: "ನೈಜ ಸಮಯದ ಹವಾಮಾನ ಮಾಹಿತಿ ಮತ್ತು ಕೃಷಿ ಸಲಹೆ",
    askTitle: "ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ.",
    askSubtitle: "ಕೃಷಿ, ಪ್ರಯಾಣ ಮತ್ತು ವಿಪತ್ತು ಮುನ್ಸೂಚನೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
    askPlaceholder: "ಉದಾಹರಣೆಗೆ: ನಾಳೆ ಮಳೆ ಬರುತ್ತದೆಯೇ?",
    askBtn: "ಕೇಳಿ",
    refresh: "↻ ನವೀಕರಿಸಿ",
    currentConditions: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಸ್ಥಿತಿ",
    decisionSupport: "ಪರಿಸರ ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ",
    forecast7d: "7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
    activeAlerts: "ತೀವ್ರ ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ",
    forecastConfidence: "ಮುನ್ಸೂಚನೆ ನಿಖರತೆ",
    specializedModules: "ವಿಶೇಷ ಕ್ಷೇತ್ರಗಳ ಮಾಹಿತಿ",
    spatialMap: "ಸ್ಥಳ ಆಧಾರಿತ ನಕ್ಷೆ",
    historicalTrends: "ಐತಿಹಾಸಿಕ ಹವಾಮಾನ ಬದಲಾವಣೆ",
    searchCity: "ನಗರ ಹುಡುಕಿ",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ...",
    micUnavailable: "ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ಲಭ್ಯವಿಲ್ಲ.",
  },
  "தமிழ்": {
    dashboard: "டாஷ்போர்டு",
    chat: "வானிலை ஜிபிடி",
    forecast: "வானிலை முன்னறிவிப்பு",
    alerts: "எச்சரிக்கைகள்",
    sectors: "முடிவெடுக்கும் ஆதரவு",
    insights: "காலநிலை நுண்ணறிவு",
    greeting: "வணக்கம்",
    subheading: "நேரலை வானிலை மற்றும் விவசாய வழிகாட்டுதல்",
    askTitle: "வானிலை பற்றி கேளுங்கள்.",
    askSubtitle: "துல்லியமான முன்னறிவிப்புகள் மற்றும் ஆலோசனைகள்.",
    askPlaceholder: "எ.கா: நாளை மழை பெய்யுமா?",
    askBtn: "கேள்",
    refresh: "↻ புதுப்பி",
    currentConditions: "தற்போதைய வானிலை",
    decisionSupport: "ஆபத்து மதிப்பீடு",
    forecast7d: "7 நாள் முன்னறிவிப்பு",
    activeAlerts: "தீவிர வானிலை எச்சரிக்கை",
    forecastConfidence: "முன்னறிவிப்பு நம்பிக்கை",
    specializedModules: "சிறப்பு துறைகள்",
    spatialMap: "வானிலை வரைபடம்",
    historicalTrends: "காலநிலை மாற்றங்கள்",
    searchCity: "நகரத்தை தேடுங்கள்",
    listening: "கேட்கிறது... பேசுங்கள்",
    micUnavailable: "குரல் பதிவு ஆதரிக்கப்படவில்லை.",
  },
  "తెలుగు": {
    dashboard: "డ్యాష్‌బోర్డ్",
    chat: "వెదర్‌జిపిటిని అడగండి",
    forecast: "వాతావరణ సూచన",
    alerts: "హెచ్చరికలు",
    sectors: "నిర్ణయ మద్దతు",
    insights: "వాతావరణ విశ్లేషణ",
    greeting: "నమస్కారం",
    subheading: "రియల్ టైమ్ వాతావరణ సమాచారం & సలహాలు",
    askTitle: "వాతావరణం గురించి అడగండి.",
    askSubtitle: "వ్యవసాయం మరియు విపత్తు సలహాలు పొందండి.",
    askPlaceholder: "ఉదాహరణ: రేపు వర్షం పడుతుందా?",
    askBtn: "అడగండి",
    refresh: "↻ తాజా చేయి",
    currentConditions: "ప్రస్తుత వాతావరణం",
    decisionSupport: "ప్రమాద విశ్లేషణ",
    forecast7d: "7 రోజుల సూచన",
    activeAlerts: "తీవ్ర హెచ్చరికలు",
    forecastConfidence: "ఖచ్చితత్వం",
    specializedModules: "ప్రత్యేక విభాగాలు",
    spatialMap: "వాతావరణ మ్యాప్",
    historicalTrends: "చారిత్రక ధోరణులు",
    searchCity: "నగరాన్ని శోధించండి",
    listening: "వింటున్నాము... మాట్లాడండి",
    micUnavailable: "వాయిస్ రికగ్నిషన్ అందుబాటులో లేదు.",
  },
  "मराठी": {
    dashboard: "डॅशबोर्ड",
    chat: "वेदरजीपीटीला विचारा",
    forecast: "हवामान अंदाज",
    alerts: "हवामान इशारे",
    sectors: "निर्णय समर्थन",
    insights: "हवामान विश्लेषण",
    greeting: "नमस्कार",
    subheading: "रिअल-टाइम हवामान आणि शेती सल्ला",
    askTitle: "हवामानाबद्दल विचारा.",
    askSubtitle: "संख्यात्मक मॉडेल्स आणि निर्णय समर्थन मिळवा.",
    askPlaceholder: "उदा: नाशिकमध्ये उद्या कीटकनाशक फवारणी करू शकतो का?",
    askBtn: "विचारा",
    refresh: "↻ ताजे करा",
    currentConditions: "सध्याचे हवामान",
    decisionSupport: "पर्यावरणीय जोखीम",
    forecast7d: "७ दिवसांचा अंदाज",
    activeAlerts: "आपत्कालीन इशारे",
    forecastConfidence: "अंदाज विश्वासार्हता",
    specializedModules: "विशेष विभाग",
    spatialMap: "हवामान नकाशा",
    historicalTrends: "हवामान बदल कल",
    searchCity: "शहर शोधा",
    listening: "ऐकत आहे... बोला",
    micUnavailable: "व्हॉइस इनपुट समर्थित नाही.",
  },
  "বাংলা": {
    dashboard: "ড্যাশবোর্ড",
    chat: "ওয়েদারজিপিটিকে জিজ্ঞাসা",
    forecast: "আবহাওয়া পূর্বাভাস",
    alerts: "সতর্কবার্তা",
    sectors: "সিদ্ধান্ত সহায়তা",
    insights: "জলবায়ু বিশ্লেষণ",
    greeting: "নমস্কার",
    subheading: "রিয়েল-টাইম আবহাওয়া বুদ্ধিমত্তা ও কৃষি পরামর্শ",
    askTitle: "আবহাওয়া সম্পর্কে জানুন।",
    askSubtitle: "সঠিক পূর্বাভাস ও ঝুঁকি ব্যবস্থাপনা।",
    askPlaceholder: "যেমন: কাল কি বৃষ্টি হবে?",
    askBtn: "জিজ্ঞাসা",
    refresh: "↻ রিফ্রেশ করুন",
    currentConditions: "বর্তমান আবহাওয়া",
    decisionSupport: "ঝুঁকি স্তর",
    forecast7d: "৭ দিনের পূর্বাভাস",
    activeAlerts: "জরুরি সতর্কবার্তা",
    forecastConfidence: "মডেল নির্ভরযোগ্যতা",
    specializedModules: "বিশেষায়িত মডিউল",
    spatialMap: "আবহাওয়া মানচিত্র",
    historicalTrends: "ঐতিহাসিক পরিবর্তন",
    searchCity: "শহর খুঁজুন",
    listening: "শুনছি... বলুন",
    micUnavailable: "ভয়েস ইনপুট সমর্থিত নয়।",
  },
};

const LANG_CODE_MAP = {
  English: "en-IN",
  "हिन्दी": "hi-IN",
  "ಕನ್ನಡ": "kn-IN",
  "தமிழ்": "ta-IN",
  "తెలుగు": "te-IN",
  "मराठी": "mr-IN",
  "বাংলা": "bn-IN",
};

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

  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedNwpModel, setSelectedNwpModel] = useState("weatherapi");
  const [selectedSector, setSelectedSector] = useState("agriculture");
  const [language, setLanguage] = useState("English");
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Authentication State (Mandatory Email ID & Google)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("weathergpt_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    localStorage.removeItem("weathergpt_token");
    localStorage.removeItem("weathergpt_user");
    setCurrentUser(null);
    setUserMenuOpen(false);
  };

  // Chat conversation state
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      text: "👋 **Hello! I am WeatherGPT**, your conversational AI weather intelligence platform.\n\nAsk me anything in your language about:\n• Real-time weather & 7-day outlooks\n• Personalized outfit & clothing recommendations\n• Farming & pesticide spraying advisories\n• Severe cyclone, flood & heatwave alerts",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef(null);

  // Load all weather intelligence data for current city
  const fetchAllData = async (targetCity = city) => {
    setLoading(true);
    try {
      // 1. Live Weather & Metrics
      const resWeather = await fetch(`${API_BASE}/weather?city=${encodeURIComponent(targetCity)}`);
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
      const resAlerts = await fetch(`${API_BASE}/alerts?city=${encodeURIComponent(targetCity)}`);
      if (resAlerts.ok) {
        const aData = await resAlerts.json();
        setAlertsData(aData.alerts || []);
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
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
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
    { id: "chat", icon: "✦", name: t.chat },
    { id: "outfit", icon: "👔", name: t.outfit || "Outfit & Style" },
    { id: "forecast", icon: "☁", name: t.forecast },
    { id: "alerts", icon: "⚠", name: t.alerts, count: alertsData.length },
    { id: "sectors", icon: "🌾", name: t.sectors },
    { id: "insights", icon: "◈", name: t.insights },
  ];

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand" onClick={() => setActivePage("dashboard")} style={{ cursor: "pointer" }}>
          <div className="brand-mark">W</div>
          <div>
            <h2>WeatherGPT</h2>
            <span>Weather Intelligence</span>
          </div>
        </div>

        <div className="nav-title">MAIN MENU</div>

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
                  <small>{currentUser.email || "Signed In"}</small>
                </div>
                <button
                  className="sidebar-logout-btn"
                  onClick={handleLogout}
                  title="Sign Out"
                >
                  🚪
                </button>
              </div>
            ) : (
              <button
                className="sidebar-signin-btn"
                onClick={() => setShowAuthModal(true)}
              >
                <span>🔑</span> Sign In / Register
              </button>
            )}
          </div>

          <div className="system-status" style={{ marginTop: "12px" }}>
            <span className="status-dot"></span>
            <div>
              <strong>Weather System</strong>
              <small>NWP GFS & ECMWF Online</small>
            </div>
          </div>
          <div className="system-status" style={{ marginTop: "8px", borderTop: "1px solid var(--border)", paddingTop: "8px" }}>
            <span className="status-dot" style={{ background: "var(--accent)" }}></span>
            <div>
              <strong>Active Location</strong>
              <small>{weather?.city || city}, {weather?.country || "IN"}</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="content">
        {/* TOPBAR */}
        <header className="topbar">
          <div>
            <p className="breadcrumb">
              WEATHER INTELLIGENCE / {activePage.toUpperCase()}
            </p>
            <h1>
              {t.greeting}{currentUser ? `, ${currentUser.name?.split(" ")[0]}` : ""} 👋{" "}
              <span style={{ fontSize: "16px", color: "var(--muted)", fontWeight: "normal" }}>
                ({weather?.city || city})
              </span>
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
                    <button
                      className="popover-item logout"
                      onClick={handleLogout}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="topbar-signin-btn"
                onClick={() => setShowAuthModal(true)}
                title="Sign in with Email ID or Google"
              >
                <span>🔑</span> Sign In
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
                  {currentUser ? t.askBtn : "🔑 Sign In to Ask"}
                </button>
              </div>

              <div className="suggestions">
                <button onClick={() => setActivePage("outfit")}>
                  👔 What should I wear? (Outfit Guide)
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
                  ✨ Outfit for tomorrow
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
                  🌧 Will it rain tomorrow?
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
                  🌾 Farming & spray advice
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
                        <p>Feels like {weather.feels_like}°C</p>
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
                        <strong>{weather.condition}</strong>
                      </div>
                    </div>

                    <div className="metrics">
                      <Metric icon="💧" label="Humidity" value={`${weather.humidity}%`} />
                      <Metric icon="💨" label="Wind" value={`${weather.wind_speed_kmh} km/h (${weather.wind_dir})`} />
                      <Metric icon="◉" label="Pressure" value={`${weather.pressure_hpa} hPa`} />
                      <Metric icon="👁" label="Visibility" value={`${weather.visibility_km} km`} />
                      <Metric icon="☀" label="UV Index" value={`${weather.uv_index}`} />
                      <Metric
                        icon="🍃"
                        label="Air Quality"
                        value={`${weather.air_quality?.status || "Moderate"} (PM2.5: ${weather.air_quality?.pm2_5 || 25})`}
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
                    <h3>Risk Index</h3>
                  </div>
                  <span className={`risk-badge ${weather?.risk?.level === "HIGH" ? "badge-red" : weather?.risk?.level === "MODERATE" ? "badge-orange" : "badge-green"}`}>
                    {weather?.risk?.level || "LOW"}
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
                  <Risk name="Rain Risk" value={weather?.risk?.rain_risk || "Low"} />
                  <Risk name="Heat Risk" value={weather?.risk?.heat_risk || "Low"} />
                  <Risk name="Wind Risk" value={weather?.risk?.wind_risk || "Low"} />
                </div>
              </div>
            </section>

            {/* THREE COLUMN ROW: FORECAST, ALERTS, CONFIDENCE */}
            <section className="three-column">
              {/* FORECAST SUMMARY CARD */}
              <div className="forecast-card card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.forecast7d}</span>
                    <h3>Upcoming Days</h3>
                  </div>
                  <button className="text-button" onClick={() => setActivePage("forecast")}>
                    Detailed NWP →
                  </button>
                </div>

                <div className="forecast-list">
                  {weather?.daily?.slice(0, 5).map((f, idx) => (
                    <ForecastRow
                      key={idx}
                      day={idx === 0 ? "Today" : f.day}
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
                    <h3>Early Warning</h3>
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
                      <strong>No Severe Hazards</strong>
                      <p>Normal meteorological conditions across {city}.</p>
                      <small>All sensors operational</small>
                    </div>
                  </div>
                )}

                <button className="outline-button" onClick={() => setActivePage("alerts")}>
                  View all hazard advisories →
                </button>
              </div>

              {/* NWP MODEL CONFIDENCE */}
              <div className="confidence-card card">
                <span className="eyebrow">{t.forecastConfidence}</span>
                <h3>Ensemble Reliability</h3>
                <div className="confidence-number">88%</div>
                <div className="progress">
                  <div style={{ width: "88%" }}></div>
                </div>
                <p>High multi-model agreement across NOAA GFS, ECMWF and WeatherAPI stations.</p>
                <div className="model-info">
                  <span>Framework</span>
                  <strong>WIS2.0 & NWP Engine</strong>
                </div>
              </div>
            </section>

            {/* SECTOR MODULES */}
            <section className="section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">{t.specializedModules}</span>
                  <h2>Decision Support by Sector</h2>
                </div>
                <p>Tailored recommendations for agriculture, aviation, marine, and urban planning.</p>
              </div>

              <div className="modules">
                <Module
                  icon="🌾"
                  title="Agriculture & Farming"
                  text={advisoriesData?.agriculture?.spray_recommendation || "Pesticide spray suitability & irrigation schedules."}
                  status={advisoriesData?.agriculture?.status || "SUITABLE"}
                  onClick={() => { setSelectedSector("agriculture"); setActivePage("sectors"); }}
                />
                <Module
                  icon="✈️"
                  title="Aviation Briefing"
                  text={advisoriesData?.aviation?.recommendation || "METAR, TAF, VFR/IFR flight categories."}
                  status={advisoriesData?.aviation?.flight_category || "VFR"}
                  onClick={() => { setSelectedSector("aviation"); setActivePage("sectors"); }}
                />
                <Module
                  icon="🌊"
                  title="Marine & Coastal"
                  text={advisoriesData?.marine?.recommendation || "Coastal wind speeds, wave alerts, and fishing safety."}
                  status={advisoriesData?.marine?.status || "SAFE"}
                  onClick={() => { setSelectedSector("marine"); setActivePage("sectors"); }}
                />
                <Module
                  icon="🏙️"
                  title="Smart City Monitoring"
                  text={advisoriesData?.smart_city?.recommendation || "Urban heat index, AQI warnings, and drainage vulnerability."}
                  status={advisoriesData?.smart_city?.comfort_level || "PLEASANT"}
                  onClick={() => { setSelectedSector("smart_city"); setActivePage("sectors"); }}
                />
              </div>
            </section>

            {/* BOTTOM MAP & CLIMATE ROW */}
            <section className="bottom-grid">
              <div className="map-card card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.spatialMap}</span>
                    <h3>Spatial GIS Intelligence</h3>
                  </div>
                  <button className="map-button" onClick={() => alert(`Coordinates for ${weather?.city || city}: Lat ${weather?.lat || 12.97}, Lon ${weather?.lon || 77.59}`)}>
                    View Lat/Lon
                  </button>
                </div>

                <div className="map-placeholder">
                  <div className="map-grid"></div>
                  <div className="map-marker marker-one">🌧</div>
                  <div className="map-marker marker-two">☀️</div>
                  <div className="map-marker marker-three">⚠</div>

                  <div className="map-center">
                    <strong>{weather?.city || city}</strong>
                    <span>{weather?.temperature}°C • {weather?.condition}</span>
                    <small style={{ color: "var(--muted)", display: "block" }}>Lat: {weather?.lat} | Lon: {weather?.lon}</small>
                  </div>

                  <div className="map-controls">
                    <button>+</button>
                    <button>−</button>
                  </div>
                </div>
              </div>

              <div className="climate-card card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">{t.historicalTrends}</span>
                    <h3>Multi-Year Climate Analytics</h3>
                  </div>
                  <button className="text-button" onClick={() => setActivePage("insights")}>
                    Trends →
                  </button>
                </div>

                <div className="chart">
                  <div className="chart-line"></div>
                  <div className="chart-point p1"></div>
                  <div className="chart-point p2"></div>
                  <div className="chart-point p3"></div>
                  <div className="chart-point p4"></div>
                  <div className="chart-point p5"></div>
                </div>

                <div className="chart-labels">
                  <span>2022</span>
                  <span>2023</span>
                  <span>2024</span>
                  <span>2025</span>
                  <span>2026</span>
                </div>

                <div className="trend">
                  <strong>+4.2%</strong>
                  <span>Decadal Temperature Warming Trend</span>
                </div>
              </div>
            </section>
          </>
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
                  <h2>WeatherGPT Conversational Assistant</h2>
                  <p>Multilingual meteorological intelligence for {city} in {language}</p>
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
                  Clear Chat
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
                      <strong>{msg.role === "user" ? "You" : "WeatherGPT AI"}</strong>
                      <div className="bubble-header-meta">
                        {msg.isVoice && <span className="voice-tag">🎙️ Spoken</span>}
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
                          🔊 Listen
                        </button>
                        {msg.isVoiceReply && <span className="voice-tag">🎙️ Spoken Response</span>}
                        {msg.source && <small className="source-tag">Source: {msg.source}</small>}
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
                    <em>Analyzing meteorological models & generating advisory...</em>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {!currentUser ? (
              <div className="card chat-auth-gate">
                <div className="auth-gate-icon">🔒</div>
                <h3>Sign In Required to Ask WeatherGPT</h3>
                <p>
                  You must be logged in to chat or ask questions. Please sign in or register with your <strong>Mobile Number (OTP)</strong> or <strong>Google Account</strong> to get permitted to chat and receive personalized weather & outfit suggestions.
                </p>
                <div className="auth-gate-buttons">
                  <button
                    className="auth-gate-primary-btn"
                    onClick={() => setShowAuthModal(true)}
                  >
                    🔑 Sign In with Phone OTP or Google →
                  </button>
                </div>
                <div className="auth-gate-features">
                  <span>✓ 10-Second Phone OTP Login</span>
                  <span>✓ Instant Google Sign-In</span>
                  <span>✓ Free & Instant Access</span>
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
                    <span>🎙️ <strong>WeatherGPT AI Voice is speaking out loud...</strong></span>
                    <button type="button" onClick={stopSpeaking} className="stop-voice-btn" title="Stop Voice">
                      ⏹ Stop Voice
                    </button>
                  </div>
                )}

                {/* Real-time Voice Listening Indicator */}
                {isListening && (
                  <div className="ai-voice-listening-indicator">
                    <span className="listening-pulse-dot"></span>
                    <span>🎙️ <strong>Listening to your voice...</strong> Speak your question now</span>
                  </div>
                )}

                <div className="chat-suggestions-row">
                  <button onClick={() => handleSendChat(`What should I wear tomorrow in ${city}?`, false)}>
                    👔 What should I wear tomorrow?
                  </button>
                  <button onClick={() => handleSendChat(`Will I need an umbrella tomorrow in ${city}?`, false)}>
                    ☂️ Need an umbrella tomorrow?
                  </button>
                  <button onClick={() => handleSendChat(`What is the weather in ${city}?`, false)}>
                    🌡️ {city} weather summary
                  </button>
                  <button onClick={() => handleSendChat(`Can I spray pesticides in ${city} tomorrow?`, false)}>
                    🌾 Pesticide spray advice
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
                    placeholder={isListening ? t.listening : `Ask anything in ${language} (type text or click highlighted AI Voice)...`}
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
            <div className="card" style={{ marginBottom: "20px" }}>
              <div className="card-header">
                <div>
                  <span className="eyebrow">NUMERICAL WEATHER PREDICTION (NWP)</span>
                  <h2>Multi-Model Forecast for {city}</h2>
                </div>
                <div className="nwp-model-pills">
                  <button
                    className={`model-pill ${selectedNwpModel === "weatherapi" ? "active" : ""}`}
                    onClick={() => setSelectedNwpModel("weatherapi")}
                  >
                    WeatherAPI Ensemble
                  </button>
                  <button
                    className={`model-pill ${selectedNwpModel === "gfs" ? "active" : ""}`}
                    onClick={() => setSelectedNwpModel("gfs")}
                  >
                    NOAA GFS (Global Grid)
                  </button>
                  <button
                    className={`model-pill ${selectedNwpModel === "ecmwf" ? "active" : ""}`}
                    onClick={() => setSelectedNwpModel("ecmwf")}
                  >
                    ECMWF IFS (European Model)
                  </button>
                </div>
              </div>
              <p style={{ color: "var(--muted)", marginTop: "8px" }}>
                Comparing numerical models reduces forecast uncertainty and improves early disaster preparedness.
              </p>
            </div>

            <div className="nwp-forecast-grid">
              {(selectedNwpModel === "weatherapi" ? weather?.daily : forecastData?.nwp_forecast?.days)?.map((day, idx) => (
                <div key={idx} className="forecast-card card" style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>{day.day || "Day"}</strong>
                    <small style={{ color: "var(--muted)" }}>{day.date}</small>
                  </div>
                  <div style={{ margin: "16px 0", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "32px" }}>{day.condition?.includes("Rain") ? "🌧️" : "⛅"}</span>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>{day.max_temp}°C</div>
                      <small style={{ color: "var(--muted)" }}>Low: {day.min_temp}°C</small>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Rain Probability:</span>
                      <strong style={{ color: day.rain_chance > 50 ? "var(--red)" : "var(--text)" }}>{day.rain_chance}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Precipitation:</span>
                      <strong>{day.precipitation_mm} mm</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Max Wind:</span>
                      <strong>{day.max_wind_kmh} km/h</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* VIEW 4: ALERTS & DISASTER EARLY WARNING */}
        {/* ==================================================== */}
        {activePage === "alerts" && (
          <section className="alerts-view">
            <div className="card" style={{ marginBottom: "20px" }}>
              <div className="card-header">
                <div>
                  <span className="eyebrow">EARLY WARNING & DISASTER DISSEMINATION</span>
                  <h2>Active Weather Hazards for {city}</h2>
                </div>
                <span className="alert-count">{alertsData.length} ACTIVE</span>
              </div>
              <p style={{ color: "var(--muted)", marginTop: "8px" }}>
                Integrates meteorological alerts for heatwaves, flash flooding, thunderstorms, and cyclones.
              </p>
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
                    <strong>Recommended Safety Actions:</strong>
                    <p>{alert.action}</p>
                  </div>

                  <div className="alert-meta-row">
                    <small>📍 Target: <strong>{alert.location}</strong></small>
                    <small>⏳ Valid: <strong>{alert.valid_until}</strong></small>
                    <small>📡 System: <strong>{alert.source}</strong></small>
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
                🌾 Agriculture & Farming
              </button>
              <button
                className={`sector-nav-btn ${selectedSector === "aviation" ? "active" : ""}`}
                onClick={() => setSelectedSector("aviation")}
              >
                ✈️ Aviation Briefing
              </button>
              <button
                className={`sector-nav-btn ${selectedSector === "marine" ? "active" : ""}`}
                onClick={() => setSelectedSector("marine")}
              >
                🌊 Marine & Coastal
              </button>
              <button
                className={`sector-nav-btn ${selectedSector === "smart_city" ? "active" : ""}`}
                onClick={() => setSelectedSector("smart_city")}
              >
                🏙️ Smart City
              </button>
            </div>

            {/* AGRICULTURE PANEL */}
            {selectedSector === "agriculture" && (
              <div className="card sector-detail-card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">CROP-WEATHER DECISION ENGINE</span>
                    <h2>Farming & Pesticide Advisory ({city})</h2>
                  </div>
                  <span className={`suitability-badge ${advisoriesData?.agriculture?.status === "SUITABLE" ? "badge-green" : "badge-red"}`}>
                    SPRAY STATUS: {advisoriesData?.agriculture?.status}
                  </span>
                </div>

                <div className="advisory-highlight-box">
                  <h3>Recommendation:</h3>
                  <p style={{ fontSize: "16px", marginTop: "8px" }}>
                    {advisoriesData?.agriculture?.spray_recommendation}
                  </p>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <h4>Meteorological Factors Considered:</h4>
                  <ul className="factor-list">
                    {advisoriesData?.agriculture?.reasons?.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: "20px", padding: "16px", background: "rgba(92,167,255,0.06)", borderRadius: "8px" }}>
                  <h4>Irrigation Guidance:</h4>
                  <p>{advisoriesData?.agriculture?.irrigation_advice}</p>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <h4>Target Regional Crops:</h4>
                  <div className="crop-chips">
                    {advisoriesData?.agriculture?.target_crops?.map((c, i) => (
                      <span key={i} className="crop-chip">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AVIATION PANEL */}
            {selectedSector === "aviation" && (
              <div className="card sector-detail-card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">ICAO METAR / TAF FLIGHT BRIEFING</span>
                    <h2>Aviation Weather Station</h2>
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
                      Lookup
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", margin: "20px 0" }}>
                  <div className="aviation-stat card">
                    <small>Flight Category</small>
                    <strong style={{ fontSize: "24px", color: aviationData?.flight_category === "VFR" ? "var(--green)" : "var(--yellow)" }}>
                      {aviationData?.flight_category || "VFR"}
                    </strong>
                  </div>
                  <div className="aviation-stat card">
                    <small>Airport</small>
                    <strong style={{ fontSize: "24px" }}>{aviationData?.airport || aviationAirport}</strong>
                  </div>
                  <div className="aviation-stat card">
                    <small>Wind</small>
                    <strong style={{ fontSize: "24px" }}>{aviationData?.decoded?.wind_speed_kt || 8} kts</strong>
                  </div>
                  <div className="aviation-stat card">
                    <small>Altimeter</small>
                    <strong style={{ fontSize: "24px" }}>{aviationData?.decoded?.altimeter_hpa || 1013} hPa</strong>
                  </div>
                </div>

                <div style={{ background: "#040a14", padding: "16px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <small style={{ color: "var(--muted)", display: "block", marginBottom: "6px" }}>RAW METAR OBSERVATION (NOAA):</small>
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
                    <span className="eyebrow">COASTAL & MARITIME SAFETY</span>
                    <h2>Marine Weather Advisory</h2>
                  </div>
                  <span className={`suitability-badge ${advisoriesData?.marine?.status === "SAFE" ? "badge-green" : "badge-orange"}`}>
                    STATUS: {advisoriesData?.marine?.status}
                  </span>
                </div>
                <div className="advisory-highlight-box">
                  <h3>Coastal Conditions:</h3>
                  <p style={{ fontSize: "16px", marginTop: "8px" }}>
                    {advisoriesData?.marine?.recommendation}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <Metric icon="💨" label="Surface Wind" value={`${advisoriesData?.marine?.wind_knots} Knots`} />
                  <Metric icon="🌊" label="Sea State" value={advisoriesData?.marine?.status} />
                </div>
              </div>
            )}

            {/* SMART CITY PANEL */}
            {selectedSector === "smart_city" && (
              <div className="card sector-detail-card">
                <div className="card-header">
                  <div>
                    <span className="eyebrow">URBAN ENVIRONMENTAL INTELLIGENCE</span>
                    <h2>Smart City Weather Monitoring ({city})</h2>
                  </div>
                </div>
                <div className="advisory-highlight-box">
                  <h3>Urban Comfort & Air Quality:</h3>
                  <p style={{ fontSize: "16px", marginTop: "8px" }}>
                    {advisoriesData?.smart_city?.recommendation}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                  <Metric icon="🌡️" label="Apparent Heat Index" value={`${advisoriesData?.smart_city?.heat_index_c}°C`} />
                  <Metric icon="🍃" label="Air Quality Status" value={weather?.air_quality?.status || "Moderate"} />
                  <Metric icon="🏙️" label="Urban Flood Risk" value={weather?.risk?.rain_risk || "Low"} />
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
            <div className="card" style={{ marginBottom: "20px" }}>
              <div className="card-header">
                <div>
                  <span className="eyebrow">CLIMATE TRENDS & HISTORICAL ANALYSIS</span>
                  <h2>Multi-Year Climate Evolution ({city})</h2>
                </div>
                <span className="risk-badge badge-orange">{climateData?.warming_trend_percentage || "+4.2%"} Warming</span>
              </div>
              <p style={{ color: "var(--muted)", marginTop: "8px" }}>
                Baseline comparison ({climateData?.reference_period || "1991-2020 Baseline"}): Mean temperature anomaly {climateData?.temperature_anomaly_c}.
              </p>
            </div>

            <div className="card" style={{ marginBottom: "20px" }}>
              <h3>Historical Annual Anomalies (2020 - 2026)</h3>
              <div className="history-table-container" style={{ marginTop: "16px", overflowX: "auto" }}>
                <table className="climate-table">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Mean Temp (°C)</th>
                      <th>Temperature Anomaly</th>
                      <th>Monsoon Rainfall vs. Normal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {climateData?.historical_series?.map((row, idx) => (
                      <tr key={idx}>
                        <td><strong>{row.year}</strong></td>
                        <td>{row.avg_temp}°C</td>
                        <td style={{ color: "var(--yellow)" }}>{row.anomaly}</td>
                        <td style={{ color: "var(--accent)" }}>{row.rainfall_percent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>Key Meteorological & Research Insights</h3>
              <ul className="factor-list" style={{ marginTop: "12px" }}>
                {climateData?.insights?.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* VIEW 7: PERSONALIZED OUTFIT & SUGGESTIONS */}
        {/* ==================================================== */}
        {activePage === "outfit" && (
          <OutfitPlanner
            city={weather?.city || city}
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
          />
        )}

        {/* FOOTER */}
        <footer>
          <div>
            <strong>WeatherGPT</strong>
            <span>Conversational AI Platform for Weather Intelligence</span>
          </div>
          <span>Built with FastAPI, Vite React, NWP Models & WIS2.0</span>
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
      <strong>{day}</strong>
      <span className="forecast-icon">{icon}</span>
      <span>{temp} / {low}</span>
      <span className="rain">💧 {rain}</span>
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