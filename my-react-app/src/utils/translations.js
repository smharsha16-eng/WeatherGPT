import { AGRI_TRANSLATIONS_MAP } from "./agriTranslations.js";
import { setAlertRegionTranslator } from "./alertTranslations.js";
export {
  translateAlertEvent,
  translateAlertHeadline,
  translateAlertAction,
  translateAlertValidUntil,
  translateHazardCategory,
  translateAlertSeverity,
  translateAlertSource,
  translateHelpline,
  setAlertRegionTranslator,
  ALERT_EVENTS_MAP,
  ALERT_ACTIONS_MAP,
  ALERT_VALID_MAP,
  ALERT_SEVERITY_MAP,
  HAZARD_CATEGORY_MAP,
  ALERT_SOURCES_MAP,
  HELPLINE_STRINGS_MAP,
} from "./alertTranslations.js";

// Comprehensive Multi-Lingual Meteorological Dictionary for WeatherGPT
// Supports 7 Indian Languages: English, Hindi, Kannada, Tamil, Telugu, Marathi, Bengali

export const LANG_CODE_MAP = {
  English: "en-IN",
  "en-IN": "en-IN",
  "हिन्दी": "hi-IN",
  Hindi: "hi-IN",
  "hi-IN": "hi-IN",
  "ಕನ್ನಡ": "kn-IN",
  Kannada: "kn-IN",
  "kn-IN": "kn-IN",
  "தமிழ்": "ta-IN",
  Tamil: "ta-IN",
  "ta-IN": "ta-IN",
  "తెలుగు": "te-IN",
  Telugu: "te-IN",
  "te-IN": "te-IN",
  "मराठी": "mr-IN",
  Marathi: "mr-IN",
  "mr-IN": "mr-IN",
  "বাংলা": "bn-IN",
  Bengali: "bn-IN",
  "bn-IN": "bn-IN",
};

export const SUPPORTED_LANGUAGES = [
  { key: "English", label: "English", code: "en-IN" },
  { key: "हिन्दी", label: "हिन्दी (Hindi)", code: "hi-IN" },
  { key: "ಕನ್ನಡ", label: "ಕನ್ನಡ (Kannada)", code: "kn-IN" },
  { key: "தமிழ்", label: "தமிழ் (Tamil)", code: "ta-IN" },
  { key: "తెలుగు", label: "తెలుగు (Telugu)", code: "te-IN" },
  { key: "मराठी", label: "मराठी (Marathi)", code: "mr-IN" },
  { key: "বাংলা", label: "বাংলা (Bengali)", code: "bn-IN" },
];

export const TRANSLATIONS = {
  English: {
    // Brand & Navigation
    brandTitle: "WeatherGPT",
    brandSubtitle: "Weather Intelligence",
    mainMenu: "MAIN MENU",
    systemOnline: "Weather System Online",
    systemStatus: "NWP GFS & ECMWF Online",
    activeLocation: "Active Location",
    dashboard: "Dashboard",
    weatherMap: "Weather Map",
    chat: "Ask WeatherGPT",
    outfit: "Outfit & Style",
    forecast: "Forecast & NWP",
    alerts: "Alerts & Warnings",
    sectors: "Decision Support",
    insights: "Climate Insights",
    settings: "Settings",
    about: "About",
    pastWeather: "Past weather search",
    hourlyForecastTitle: "Hourly Forecast (Next 24 Hours)",
    hourlyForecastSubtitle: "24-hour upcoming forecast starting from current hour",
    hourlyTempMetric: "Temperature",
    hourlyRainMetric: "Precipitation %",
    hourlyWindMetric: "Wind Speed",
    now: "Now",
    aviationHelplinesTitle: "Official Aviation Operations & Emergency Helplines",
    marineHelplinesTitle: "Official Maritime & Coastal Safety Helplines",
    coastalPortsAndBasins: "Indian Maritime Basins, Coastal Ports & Fishery Hubs",
    chatHistory: "Chat History",
    newChat: "New Chat",
    clearHistory: "Clear History",
    clearHistoryConfirm: "Are you sure you want to permanently clear all conversation history from the database?",
    noPastSessions: "No past conversations yet. Ask a question to start!",
    voiceRecordTitle: "Voice Weather Assistant",
    voiceListeningPrompt: "Listening to your voice... Speak your weather question now",
    voiceRecognizing: "Transcribing speech in real-time...",
    voiceStopAndSend: "Done & Send Question",
    voiceCancel: "Cancel",
    signIn: "Sign In",
    signOut: "Sign Out",
    guestUser: "Citizen Evaluator",
    greeting: "Good day",

    // Search & Launcher
    breadcrumb: "WEATHER INTELLIGENCE",
    searchCity: "Search City",
    searchPlaceholder: "Search any Indian city, district, or place...",
    searchBtn: "Search Location",
    aiAssistant: "✦ AI WEATHER ASSISTANT",
    askTitle: "Ask about the weather.",
    askSubtitle: "Get intelligent answers with NWP forecasts & advisories.",
    askPlaceholder: "e.g., Can I spray pesticides in Nashik tomorrow?",
    askBtn: "Ask",
    refresh: "↻ Refresh weather",
    listening: "Listening... speak now",
    micUnavailable: "Speech recognition not supported in this browser.",

    // Dashboard Cards & Metrics
    currentConditions: "CURRENT CONDITIONS",
    temperature: "Temperature",
    feelsLike: "Feels like",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    surfacePressure: "Surface Pressure",
    uvIndex: "UV Index",
    airQuality: "Air Quality (AQI)",
    rainfallProbability: "Rainfall Probability",
    precipitation: "Precipitation",
    precipExpected: "Precipitation Expected",

    // Decision Support & Risks
    decisionSupport: "DECISION SUPPORT",
    decisionRisks: "DECISION SUPPORT RISKS",
    rainRisk: "Rain Risk",
    heatRisk: "Heat Risk",
    windRisk: "Wind Risk",
    forecastConfidence: "FORECAST CONFIDENCE",
    specializedModules: "SPECIALIZED WEATHER INTELLIGENCE",
    agricultureSector: "Agriculture & Farming",
    aviationSector: "Aviation & Flight Safety",
    marineSector: "Marine & Coastal Safety",
    smartCitySector: "Smart City Monitoring",

    // Spatial Map & Climate on Dashboard
    spatialMap: "SPATIAL WEATHER MAP",
    spatialTitle: "Spatial GIS Intelligence",
    openMapBtn: "Open Weather Map →",
    historicalTrends: "CLIMATE INTELLIGENCE",
    multiYearAnalytics: "Multi-Year Climate Analytics",
    trendsBtn: "Trends →",
    warmingTrend: "Decadal Temperature Warming Trend",
    forecast7d: "7-DAY OUTLOOK",
    forecast14d: "14-DAY OUTLOOK",

    // Weather Map Page
    mapEyebrow: "INDIA METEOROLOGICAL GIS MAP",
    mapHeaderTitle: "Weather Map",
    mapHeaderDesc: "Choose any location across India to fetch real-time WeatherGPT meteorological intelligence and smart outing suggestions.",
    mapConfigBtn: "Google Maps Key",
    suggestionsLabel: "Suggestions:",
    liveRadarActive: "● LIVE RADAR ACTIVE",
    clickMapHelper: "👆 Click anywhere on the map inside India to view weather",
    weatherTelemetry: "REAL-TIME WEATHER TELEMETRY",

    // Outing Suggestions & Umbrella Prompt
    outdoorAdvisory: "OUTDOOR TRAVEL ADVISORY",
    outgoingQuestion: "Do you want to go out today?",
    outgoingNow: "🚶 Yes, heading out now",
    outgoingLater: "🕒 Going out later",
    rainyUmbrellaReply: "Carry an umbrella because it may rain today!",
    rainyUmbrellaSub: "High precipitation likelihood detected in this location.",
    rainyUmbrellaAdvice: "Recommendation: Carry an umbrella or waterproof jacket. Road surfaces may be slippery, and sudden showers are likely during your commute.",
    rainyLaterTip: "Tip for later: Check evening forecasts as monsoon/convective showers often peak in the late afternoon.",
    dryPleasantReply: "Weather is pleasant — safe to go out today without an umbrella!",
    dryPleasantSub: "Low precipitation likelihood. Conditions are dry and clear.",
    dryPleasantAdvice: "Recommendation: No rain gear needed. Pleasant temperature and comfortable winds for outdoor travel.",
    hotWeatherTip: "Warm weather notice: Temperature is elevated. Stay hydrated and use sun protection.",
    askInChatBtn: "💬 Ask WeatherGPT",
    forecast7dTitle: "7-Day Forecast Outlook",
    forecast14dTitle: "14-Day Forecast Outlook",

    // Alerts View
    activeAlerts: "EXTREME WEATHER & ALERTS",
    alertsEyebrow: "EARLY WARNING & DISASTER DISSEMINATION",
    alertsSubtitle: "Standardized India Meteorological Department (IMD / MoES) multi-hazard early warning dissemination.",
    emergencySiren: "EMERGENCY HAZARD SIREN",
    sirenActive: "SIREN ACTIVE",
    stopSiren: "STOP SIREN",
    imdProtocol: "IMD 4-TIER WARNING PROTOCOL",
    redWarning: "Red Warning (Take Action): Severe hazardous weather expected. Follow local authorities.",
    orangeAlert: "Orange Alert (Be Prepared): Significant hazardous weather expected. Prepare for disruptions.",
    yellowWatch: "Yellow Watch (Be Aware): Potentially adverse weather conditions. Stay informed.",
    noActiveAlerts: "No active meteorological disaster warnings for this sector. Operations normal.",
    disasterAlertTitle: "SEVERE DISASTER EARLY WARNING",
    disasterAlertSubtitle: "IMD / MoES & INCOIS multi-hazard disaster early warning system.",
    heavyFloodAlert: "Heavy Floods & Inundation Warning",
    cycloneAlert: "Severe Cyclone & Destructive Gale Warning",
    tsunamiAlert: "Tsunami Early Warning & Sea Surge",
    immediateAction: "IMMEDIATE LIFE-SAFETY ACTION REQUIRED",
    muteSiren: "MUTE SIREN & ACKNOWLEDGE",
    resoundSiren: "SOUND LOUD SIREN",
    sirenSounding: "LOUD EMERGENCY SIREN SOUNDING",
    dismissAlert: "Acknowledge & Close",
    simulateDisaster: "Simulate Severe Hazard:",
    testFlood: "🌊 Test Flood Warning (Red Alert)",
    testCyclone: "🌀 Test Cyclone Strike (Red Alert)",
    testTsunami: "🌊 Test Tsunami Alert (Red Alert)",
    clearHazard: "🟢 Clear / Normal",

    // Sectors View
    sectorsEyebrow: "MULTI-SECTOR DECISION SUPPORT",
    sectorsTitle: "Operational Weather Advisories",
    sectorsSubtitle: "Targeted meteorological intelligence for Agriculture, Aviation, Marine, and Smart City governance.",
    spraySuitability: "Spray Suitability Score",
    soilMoisture: "Soil Moisture Index",
    harvestIrrigation: "Harvest & Irrigation Advice",
    flightCategory: "Flight Rules Category",
    surfaceVisibility: "Surface Visibility",
    cloudBase: "Cloud Ceiling",
    seaState: "Sea State",
    waveHeight: "Significant Wave Height",
    urbanHeat: "Urban Heat Island Index",
    drainageRisk: "Urban Drainage & Flood Risk",

    // Insights View
    insightsEyebrow: "LONG-TERM CLIMATE INTELLIGENCE",
    insightsTitle: "Historical Trends & Extreme Events",
    insightsSubtitle: "Decadal temperature anomalies, precipitation deviations, and regional climate vulnerability indices.",
    warmingBaseline: "WMO Standard Baseline (1991-2020)",
    temperatureAnomaly: "Temperature Anomaly",
    precipitationDeviation: "Monsoon Precipitation Deviation",
    extremeEvents: "Extreme Weather Event Frequency",

    // Status Values
    suitable: "SUITABLE",
    unsuitable: "UNSUITABLE",
    caution: "CAUTION",
    high: "High",
    moderate: "Moderate",
    low: "Low",
    good: "Good",
    unhealthy: "Unhealthy",
    today: "Today",
    tomorrow: "Tomorrow",

    // Additional Detailed UI Labels
    dayLow: "Low",
    rainProbability: "Rain Probability",
    maxWind: "Max Wind",
    safetyActions: "Recommended Safety Actions",
    target: "Target",
    valid: "Valid",
    system: "System",
    activeBadge: "ACTIVE",
    cropDecisionEngine: "CROP-WEATHER DECISION ENGINE",
    farmingAdvisory: "Farming & Pesticide Advisory",
    sprayStatus: "SPRAY STATUS",
    recommendation: "Recommendation",
    meteorologicalFactors: "Meteorological Factors Considered",
    irrigationGuidance: "Irrigation Guidance",
    targetCrops: "Target Regional Crops",
    aviationBriefing: "ICAO METAR / TAF FLIGHT BRIEFING",
    aviationStation: "Aviation Weather Station",
    airport: "Airport",
    wind: "Wind",
    altimeter: "Altimeter",
    lookup: "Lookup",
    rawMetar: "RAW METAR OBSERVATION (NOAA)",
    coastalSafety: "COASTAL & MARITIME SAFETY",
    marineAdvisory: "Marine Weather Advisory",
    status: "STATUS",
    coastalConditions: "Coastal Conditions",
    surfaceWind: "Surface Wind",
    urbanIntelligence: "URBAN ENVIRONMENTAL INTELLIGENCE",
    smartCityTitle: "Smart City Weather Monitoring",
    urbanComfort: "Urban Comfort & Air Quality",
    apparentHeatIndex: "Apparent Heat Index",
    airQualityStatus: "Air Quality Status",
    urbanFloodRisk: "Urban Flood Risk",
    historicalAnomalies: "Historical Annual Anomalies (2020 - 2026)",
    year: "Year",
    meanTemp: "Mean Temp (°C)",
    monsoonRainfallVsNormal: "Monsoon Rainfall vs. Normal",
    keyResearchInsights: "Key Meteorological & Research Insights",
    chatAssistantTitle: "WeatherGPT Conversational Assistant",
    chatAssistantSubtitle: "Multilingual meteorological intelligence for",
    clearChat: "Clear Chat",
    listen: "Listen",
    spokenResponse: "Spoken Response",
    analyzingPrompt: "Analyzing meteorological models & generating advisory...",
    signInRequired: "Sign In Required to Ask WeatherGPT",
    signInPrompt: "You must be logged in to chat or ask questions. Please sign in or register with your Mobile Number (OTP) or Google Account to get permitted to chat and receive personalized weather & outfit suggestions.",
    signInBtn: "🔑 Sign In with Phone OTP or Google →",
    instantAccessBtn: "⚡ Instant Citizen / Evaluator Access →",
    phoneOtpBenefit: "✓ 10-Second Phone OTP Login",
    googleSignInBenefit: "✓ Instant Google Sign-In",
    freeAccessBenefit: "✓ Free & Instant Access",
    voiceSpeaking: "WeatherGPT AI Voice is speaking out loud...",
    stopVoice: "Stop Voice",
    voiceListening: "Listening to your voice... Speak your question now",
    pesticideAdviceChip: "🌾 Pesticide Spray Advice",
    disasterAlertsChip: "🚨 Disaster Alerts & Warnings",
    aviationBriefingChip: "✈️ Aviation Briefing (VOBL)",
    climateTrendsChip: "📊 Climate Trends & Anomalies",
    outfitAdviceChip: "👔 Outfit & Travel Advice",
    liveWeatherChip: "🌡️ Live Weather",
    askAnything: "Ask anything in",
    computingNwpSpread: "Computing ensemble NWP model spread (NOAA GFS vs ECMWF IFS)...",
    nwpComparisonTitle: "NOAA GFS vs ECMWF IFS Multi-Model Comparison",
    nwpComparisonDesc: "Ensemble spread analysis between Global Forecast System (USA) and Integrated Forecasting System (Europe).",
    ensembleConfidence: "ENSEMBLE CONFIDENCE",
    avgTempSpread: "AVG TEMP SPREAD",
    forecastDay: "Forecast Day",
    tempSpread: "Temp Spread",
    gfsRainVsEcmwf: "GFS Rain vs ECMWF Rain",
    modelAgreement: "Model Agreement",
    scientificContextTitle: "Scientific Context:",
    scientificContextDesc: "NOAA GFS runs 4 times daily at 0.25° grid with semi-Lagrangian dynamics; ECMWF IFS uses higher vertical resolution (137 levels). High model agreement indicates reliable synoptic forcing, giving farmers and planners high operational confidence.",
    whatShouldWear: "What Should You Wear in",
    outfitSubtitle: "Context-aware outfit styling, essential accessories checklist, and outdoor activity advisories.",
    analyzingOutfit: "Analyzing meteorological models & computing personalized outfit...",
    recommendedTops: "Recommended Tops",
    recommendedBottoms: "Recommended Bottoms",
    outerwearLayers: "Outerwear & Layers",
    footwearSuggestion: "Footwear Suggestion",
    beforeYouStepOut: "BEFORE YOU STEP OUT",
    essentialAccessories: "Essential Accessories Checklist",
    outdoorFeasibility: "OUTDOOR FEASIBILITY",
    dailyActivityOutlook: "Daily Activity Outlook",
    runningExercise: "Running / Exercise",
    laundryDrying: "Laundry Drying",
    transitCommute: "Transit & Commute",
    askWeatherGptAi: "Ask WeatherGPT AI:",
    whatToWearPrompt: "What to wear",
    umbrellaPrompt: "Need an umbrella?",
    joggingPrompt: "Good for jogging?",
    footerTagline: "Conversational AI Platform for Weather Intelligence",
    footerBuiltWith: "Built with FastAPI, Vite React, NWP Models & WIS2.0",
    signInToAsk: "🔑 Sign In to Ask",
    suggestionWear: "👔 What should I wear? (Outfit Guide)",
    suggestionTomorrow: "✨ Outfit for tomorrow",
    suggestionRain: "🌧 Will it rain tomorrow?",
    suggestionFarming: "🌾 Farming & spray advice",
    upcomingDays: "Upcoming Days",
    detailedNwpBtn: "Detailed NWP →",
    localTime: "Local:",
    liveBadge: "LIVE",
    fetchingLiveData: "Fetching live meteorological data...",
    noWeatherData: "No weather data loaded.",
    loadWeather: "Load Weather",
    riskDescLow: "Current weather conditions indicate minimal operational and environmental risk.",
    riskDescModerate: "Moderate weather impact. Check farming spray drift and road travel conditions.",
    riskDescHigh: "Elevated hazard warning. Follow early warning safety guidelines.",
    cropWeatherMatrixSub: "Real-time agromet decision matrix for chemical spraying, irrigation scheduling, and crop safety.",
    rainProbabilityLabel: "Rain Probability",
    washOffRisk: "Wash-off Risk",
    lowWashOff: "Low Wash-off",
    sprayDriftWind: "Spray Drift Wind",
    optimalSpeed: "Optimal Speed",
    highDrift: "High Drift",
    canopyTemp: "Canopy Temp",
    evaporationSafe: "Evaporation Safe",
    highEvaporation: "High Evaporation",
    suitabilityIndex: "Suitability Index",
    agrochemicalSprayDecision: "Agrochemical Spray Decision:",
    harvestProtectionAdvisory: "Harvest & Post-Harvest Protection Advisory:",
    regionalSoilProfileTitle: "Regional Soil & Agro-Climatic Profile:",
    groundedFor: "Grounded for",
    primarySoilGroup: "Primary Soil Group",
    soilPhLevel: "Soil pH Level",
    textureAeration: "Texture & Aeration",
    organicCarbonDrainage: "Organic Carbon & Drainage",
    activeFarmCalendarFocus: "🗓️ Active Farm Calendar Focus:",
    historicallyCultivatedHeader: "🌱 Historically Cultivated & Soil-Matched Crops for",
    calibratedIcarSub: "Calibrated with ICAR historical production records, local soil pH, and real-time seasonal weather compatibility.",
    match: "Match",
    historicalRecord: "Historical Record:",
    soilCompatibility: "Soil Compatibility:",
    climateWater: "Climate & Water:",
    growthCycle: "Growth Cycle:",
    cropProtection: "Crop Protection:",
    days: "Days",
  },

  "हिन्दी": {
    // Brand & Navigation
    brandTitle: "वेदरजीपीटी",
    brandSubtitle: "मौसम बुद्धिमत्ता",
    mainMenu: "मुख्य मेनू",
    systemOnline: "मौसम प्रणाली सक्रिय",
    systemStatus: "NWP GFS एवं ECMWF ऑनलाइन",
    activeLocation: "सक्रिय स्थान",
    dashboard: "डैशबोर्ड",
    weatherMap: "मौसम मानचित्र",
    chat: "वेदरजीपीटी से पूछें",
    outfit: "पहनावा और शैली",
    forecast: "पूर्वानुमान एवं NWP",
    alerts: "आपदा चेतावनियाँ",
    sectors: "निर्णय सहायता",
    insights: "जलवायु अंतर्दृष्टि",
    settings: "सेटिंग्स",
    about: "के बारे में",
    pastWeather: "पिछला मौसम खोजें",
    hourlyForecastTitle: "प्रति घंटा पूर्वानुमान (अगले 24 घंटे)",
    hourlyForecastSubtitle: "वर्तमान घंटे से शुरू होने वाला 24 घंटे का आगामी पूर्वानुमान",
    hourlyTempMetric: "तापमान",
    hourlyRainMetric: "वर्षा संभावना %",
    hourlyWindMetric: "हवा की गति",
    now: "अभी",
    aviationHelplinesTitle: "आधिकारिक विमानन संचालन और आपातकालीन हेल्पलाइन",
    marineHelplinesTitle: "आधिकारिक समुद्री एवं तटीय सुरक्षा हेल्पलाइन",
    coastalPortsAndBasins: "भारतीय समुद्री बेसिन, तटीय बंदरगाह एवं मत्स्य पालन केंद्र",
    chatHistory: "बातचीत इतिहास",
    newChat: "नई बातचीत",
    clearHistory: "इतिहास मिटाएं",
    clearHistoryConfirm: "क्या आप वाकई डेटाबेस से सभी बातचीत इतिहास हटाना चाहते हैं?",
    noPastSessions: "अभी तक कोई पिछला इतिहास नहीं है। शुरू करने के लिए कोई प्रश्न पूछें!",
    voiceRecordTitle: "ध्वनि मौसम सहायक",
    voiceListeningPrompt: "सुन रहे हैं... अपना मौसम प्रश्न अभी बोलें",
    voiceRecognizing: "आवाज़ पहचानी जा रही है...",
    voiceStopAndSend: "पूर्ण और प्रश्न भेजें",
    voiceCancel: "रद्द करें",
    signIn: "साइन इन करें",
    signOut: "साइन आउट",
    guestUser: "नागरिक मूल्यांकनकर्ता",
    greeting: "नमस्ते",

    // Search & Launcher
    breadcrumb: "मौसम बुद्धिमत्ता",
    searchCity: "शहर खोजें",
    searchPlaceholder: "भारत का कोई भी शहर, जिला या स्थान खोजें...",
    searchBtn: "स्थान खोजें",
    aiAssistant: "✦ एआई मौसम सहायक",
    askTitle: "मौसम के बारे में पूछें।",
    askSubtitle: "संख्यात्मक मौसम मॉडल और सटीक सलाह प्राप्त करें।",
    askPlaceholder: "जैसे: क्या कल नासिक में कीटनाशक का छिड़काव कर सकते हैं?",
    askBtn: "पूछें",
    refresh: "↻ मौसम ताज़ा करें",
    listening: "सुन रहे हैं... बोलिए",
    micUnavailable: "इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं है।",

    // Dashboard Cards & Metrics
    currentConditions: "वर्तमान मौसम स्थिति",
    temperature: "तापमान",
    feelsLike: "महसूस होता है",
    humidity: "आर्द्रता",
    windSpeed: "हवा की गति",
    surfacePressure: "वायुमंडलीय दबाव",
    uvIndex: "यूवी इंडेक्स",
    airQuality: "वायु गुणवत्ता (AQI)",
    rainfallProbability: "वर्षा की संभावना",
    precipitation: "वर्षा",
    precipExpected: "अनुमानित वर्षा",

    // Decision Support & Risks
    decisionSupport: "निर्णय समर्थन",
    decisionRisks: "निर्णय समर्थन जोखिम",
    rainRisk: "बारिश का जोखिम",
    heatRisk: "गर्मी का जोखिम",
    windRisk: "हवा का जोखिम",
    forecastConfidence: "पूर्वानुमान विश्वसनीयता",
    specializedModules: "विशेषज्ञ मौसम बुद्धिमत्ता",
    agricultureSector: "कृषि एवं खेती",
    aviationSector: "उड्डयन एवं उड़ान सुरक्षा",
    marineSector: "समुद्री एवं तटीय सुरक्षा",
    smartCitySector: "स्मार्ट सिटी निगरानी",

    // Spatial Map & Climate on Dashboard
    spatialMap: "स्थानिक मौसम मानचित्र",
    spatialTitle: "स्थानिक जीआईएस बुद्धिमत्ता",
    openMapBtn: "मौसम मानचित्र खोलें →",
    historicalTrends: "जलवायु बुद्धिमत्ता",
    multiYearAnalytics: "बहु-वर्षीय जलवायु विश्लेषण",
    trendsBtn: "रुझान देखें →",
    warmingTrend: "दशकीय तापमान वृद्धि का रुझान",
    forecast7d: "7-दिवसीय पूर्वानुमान",
    forecast14d: "14-दिवसीय पूर्वानुमान",

    // Weather Map Page
    mapEyebrow: "भारतीय मौसम विज्ञान जीआईएस मानचित्र",
    mapHeaderTitle: "मौसम मानचित्र",
    mapHeaderDesc: "वास्तविक समय वेदरजीपीटी डेटा और बाहर जाने की स्मार्ट सलाह के लिए भारत के किसी भी स्थान को चुनें।",
    mapConfigBtn: "गूगल मैप्स कुंजी",
    suggestionsLabel: "सुझाव:",
    liveRadarActive: "● लाइव रडार सक्रिय",
    clickMapHelper: "👆 मौसम देखने के लिए भारत के मानचित्र पर कहीं भी क्लिक करें",
    weatherTelemetry: "वास्तविक समय मौसम टेलीमेट्री",

    // Outing Suggestions & Umbrella Prompt
    outdoorAdvisory: "बाहर जाने हेतु मौसम सलाह",
    outgoingQuestion: "क्या आप आज बाहर जाना चाहते हैं?",
    outgoingNow: "🚶 हाँ, अभी बाहर जा रहे हैं",
    outgoingLater: "🕒 बाद में बाहर जाना है",
    rainyUmbrellaReply: "आज छाता लेकर निकलें क्योंकि बारिश हो सकती है!",
    rainyUmbrellaSub: "इस स्थान पर वर्षा की उच्च संभावना पाई गई है।",
    rainyUmbrellaAdvice: "सिफ़ारिश: छाता या रेनकोट साथ रखें। सड़कें गीली और फिसलन भरी हो सकती हैं, यात्रा के दौरान अचानक बारिश संभव है।",
    rainyLaterTip: "शाम के लिए सुझाव: शाम के पूर्वानुमान पर नज़र रखें, दोपहर बाद बारिश बढ़ सकती है।",
    dryPleasantReply: "मौसम सुहावना है — आज बिना छाते के बाहर जाना सुरक्षित है!",
    dryPleasantSub: "वर्षा की बहुत कम संभावना है। आसमान साफ़ और सूखा रहेगा।",
    dryPleasantAdvice: "सिफ़ारिश: छाते की कोई ज़रूरत नहीं है। सुहावना तापमान और अनुकूल हवाएं हैं।",
    hotWeatherTip: "गर्मी की चेतावनी: तापमान अधिक है। पर्याप्त पानी पिएं और धूप से बचें।",
    askInChatBtn: "💬 वेदरजीपीटी से पूछें",
    forecast7dTitle: "7-दिवसीय मौसम दृष्टिकोण",
    forecast14dTitle: "14-दिवसीय मौसम दृष्टिकोण",

    // Alerts View
    activeAlerts: "आपदा चेतावनियाँ एवं अलर्ट",
    alertsEyebrow: "पूर्व चेतावनी एवं आपदा प्रबंधन",
    alertsSubtitle: "भारतीय मौसम विज्ञान विभाग (IMD / MoES) मानक बहु-आपदा प्रारंभिक चेतावनी प्रणाली।",
    emergencySiren: "आपातकालीन आपदा सायरन",
    sirenActive: "सायरन सक्रिय",
    stopSiren: "सायरन बंद करें",
    imdProtocol: "आईएमडी 4-स्तरीय चेतावनी प्रोटोकॉल",
    redWarning: "लाल चेतावनी (कार्रवाई करें): अत्यंत गंभीर मौसम। स्थानीय प्रशासन के निर्देशों का पालन करें।",
    orangeAlert: "नारंगी चेतावनी (तैयार रहें): भारी ख़राब मौसम की संभावना। सावधानी बरतें।",
    yellowWatch: "पीली चेतावनी (सचेत रहें): संभावित ख़राब मौसम। स्थिति पर नज़र रखें।",
    greenNormal: "हरा (सामान्य): मौसम सामान्य है। किसी प्रतिकूल प्रभाव की संभावना नहीं।",
    noActiveAlerts: "इस क्षेत्र के लिए कोई सक्रिय आपदा चेतावनी नहीं है। स्थिति सामान्य है।",
    disasterAlertTitle: "गंभीर आपदा प्रारंभिक चेतावनी",
    disasterAlertSubtitle: "आईएमडी / MoES एवं इनकॉइस (INCOIS) बहु-आपदा पूर्व चेतावनी प्रणाली।",
    heavyFloodAlert: "भारी बाढ़ एवं जलभराव चेतावनी",
    cycloneAlert: "भीषण चक्रवात एवं विनाशकारी तूफ़ानी हवा चेतावनी",
    tsunamiAlert: "सुनामी प्रारंभिक चेतावनी एवं समुद्री लहरें",
    immediateAction: "तत्काल जीवन-रक्षा कार्रवाई आवश्यक",
    muteSiren: "सायरन बंद करें और पुष्टि करें",
    resoundSiren: "तेज़ सायरन बजाएं",
    sirenSounding: "तेज़ आपातकालीन सायरन बज रहा है",
    dismissAlert: "स्वीकार करें एवं बंद करें",
    simulateDisaster: "आपदा का परीक्षण करें:",
    testFlood: "🌊 बाढ़ चेतावनी का परीक्षण (लाल अलर्ट)",
    testCyclone: "🌀 चक्रवात चेतावनी का परीक्षण (लाल अलर्ट)",
    testTsunami: "🌊 सुनामी चेतावनी का परीक्षण (लाल अलर्ट)",
    clearHazard: "🟢 सामान्य मौसम",

    // Sectors View
    sectorsEyebrow: "बहु-क्षेत्रीय निर्णय समर्थन",
    sectorsTitle: "परिचालन मौसम सलाह",
    sectorsSubtitle: "कृषि, उड्डयन, समुद्री और नगर निगम के लिए लक्षित मौसम बुद्धिमत्ता।",
    spraySuitability: "छिड़काव उपयुक्तता स्कोर",
    soilMoisture: "मिट्टी की नमी सूचकांक",
    harvestIrrigation: "कटाई एवं सिंचाई सलाह",
    flightCategory: "उड़ान नियम श्रेणी",
    surfaceVisibility: "सतह दृश्यता",
    cloudBase: "बादल सीमा",
    seaState: "समुद्र की स्थिति",
    waveHeight: "लहरों की ऊंचाई",
    urbanHeat: "शहरी ताप सूचकांक",
    drainageRisk: "जल निकासी एवं बाढ़ जोखिम",

    // Insights View
    insightsEyebrow: "दीर्घकालिक जलवायु बुद्धिमत्ता",
    insightsTitle: "ऐतिहासिक रुझान और चरम घटनाएँ",
    insightsSubtitle: "दशकीय तापमान विसंगतियाँ और मानसूनी वर्षा विचलन।",
    warmingBaseline: "WMO मानक आधार रेखा (1991-2020)",
    temperatureAnomaly: "तापमान विसंगति",
    precipitationDeviation: "मानसूनी वर्षा विचलन",
    extremeEvents: "चरम मौसम घटनाओं की आवृत्ति",

    // Status Values
    suitable: "उपयुक्त",
    unsuitable: "अनुपयुक्त",
    caution: "सावधानी",
    high: "उच्च",
    moderate: "मध्यम",
    low: "कम",
    good: "उत्तम",
    unhealthy: "अस्वस्थ",
    today: "आज",
    tomorrow: "कल",

    // Additional Detailed UI Labels
    dayLow: "न्यूनतम",
    rainProbability: "वर्षा की संभावना",
    maxWind: "अधिकतम हवा",
    safetyActions: "अनुशंसित सुरक्षा उपाय",
    target: "लक्ष्य",
    valid: "वैधता",
    system: "प्रणाली",
    activeBadge: "सक्रिय",
    cropDecisionEngine: "फसल-मौसम निर्णय इंजन",
    farmingAdvisory: "कृषि एवं कीटनाशक सलाह",
    sprayStatus: "छिड़काव स्थिति",
    recommendation: "सिफ़ारिश",
    meteorologicalFactors: "मौसम संबंधी कारक",
    irrigationGuidance: "सिंचाई मार्गदर्शन",
    targetCrops: "लक्षित क्षेत्रीय फसलें",
    aviationBriefing: "आईसीएओ मेटार / टाफ़ उड़ान ब्रीफिंग",
    aviationStation: "विमानन मौसम केंद्र",
    airport: "हवाई अड्डा",
    wind: "हवा",
    altimeter: "अल्टीमीटर",
    lookup: "खोजें",
    rawMetar: "मूल मेटार अवलोकन (NOAA)",
    coastalSafety: "तटीय एवं समुद्री सुरक्षा",
    marineAdvisory: "समुद्री मौसम सलाह",
    status: "स्थिति",
    coastalConditions: "तटीय स्थितियाँ",
    surfaceWind: "सतही हवा",
    urbanIntelligence: "शहरी पर्यावरणीय बुद्धिमत्ता",
    smartCityTitle: "स्मार्ट सिटी मौसम निगरानी",
    urbanComfort: "शहरी सुविधा एवं वायु गुणवत्ता",
    apparentHeatIndex: "अनुभूत ताप सूचकांक",
    airQualityStatus: "वायु गुणवत्ता स्थिति",
    urbanFloodRisk: "शहरी बाढ़ जोखिम",
    historicalAnomalies: "ऐतिहासिक वार्षिक विसंगतियाँ (2020 - 2026)",
    year: "वर्ष",
    meanTemp: "औसत तापमान (°C)",
    monsoonRainfallVsNormal: "सामान्य की तुलना में मानसूनी वर्षा",
    keyResearchInsights: "प्रमुख मौसम एवं शोध अंतर्दृष्टि",
    chatAssistantTitle: "वेदरजीपीटी संवादात्मक सहायक",
    chatAssistantSubtitle: "बहुभाषी मौसम बुद्धिमत्ता",
    clearChat: "चैट साफ़ करें",
    listen: "सुनें",
    spokenResponse: "आवाज़ उत्तर",
    analyzingPrompt: "मौसम मॉडल का विश्लेषण और सलाह तैयार की जा रही है...",
    signInRequired: "वेदरजीपीटी से पूछने के लिए साइन इन आवश्यक है",
    signInPrompt: "चैट करने या सवाल पूछने के लिए कृपया अपने मोबाइल नंबर (ओटीपी) या गूगल खाते से साइन इन करें।",
    signInBtn: "🔑 फ़ोन ओटीपी या गूगल से साइन इन करें →",
    instantAccessBtn: "⚡ त्वरित नागरिक / मूल्यांकक पहुंच →",
    phoneOtpBenefit: "✓ १०-सेकंड फ़ोन ओटीपी लॉगिन",
    googleSignInBenefit: "✓ त्वरित गूगल साइन-इन",
    freeAccessBenefit: "✓ मुफ़्त एवं तुरंत पहुंच",
    voiceSpeaking: "वेदरजीपीटी एआई आवाज़ बोल रही है...",
    stopVoice: "आवाज़ रोकें",
    voiceListening: "आपकी आवाज़ सुन रहे हैं... अपना प्रश्न बोलें",
    pesticideAdviceChip: "🌾 कीटनाशक छिड़काव सलाह",
    disasterAlertsChip: "🚨 आपदा चेतावनियाँ एवं अलर्ट",
    aviationBriefingChip: "✈️ उड़ान ब्रीफिंग",
    climateTrendsChip: "📊 जलवायु रुझान एवं विसंगतियाँ",
    outfitAdviceChip: "👔 पहनावा एवं यात्रा सलाह",
    liveWeatherChip: "🌡️ लाइव मौसम",
    askAnything: "में कुछ भी पूछें",
    computingNwpSpread: "संख्यात्मक मौसम मॉडल (NOAA GFS बनाम ECMWF IFS) का विश्लेषण हो रहा है...",
    nwpComparisonTitle: "NOAA GFS बनाम ECMWF IFS बहु-मॉडल तुलना",
    nwpComparisonDesc: "ग्लोबल फोरकास्ट सिस्टम (अमेरिका) और एकीकृत पूर्वानुमान प्रणाली (यूरोप) के बीच विश्लेषण।",
    ensembleConfidence: "मॉडल विश्वसनीयता",
    avgTempSpread: "औसत तापमान अंतर",
    forecastDay: "पूर्वानुमान दिन",
    tempSpread: "तापमान अंतर",
    gfsRainVsEcmwf: "GFS वर्षा बनाम ECMWF वर्षा",
    modelAgreement: "मॉडल सहमति",
    scientificContextTitle: "वैज्ञानिक संदर्भ:",
    scientificContextDesc: "NOAA GFS प्रतिदिन 4 बार 0.25° ग्रिड पर चलता है; ECMWF IFS उच्च ऊर्ध्वाधर रिज़ॉल्यूशन का उपयोग करता है।",
    whatShouldWear: "में क्या पहनें?",
    outfitSubtitle: "मौसम-अनुकूल पहनावा, आवश्यक सामग्री चेकलिस्ट और गतिविधि सलाह।",
    analyzingOutfit: "मौसम मॉडल का विश्लेषण और व्यक्तिगत पहनावा तैयार किया जा रहा है...",
    recommendedTops: "अनुशंसित टॉप्स",
    recommendedBottoms: "अनुशंसित बॉटम्स",
    outerwearLayers: "बाहरी वस्त्र एवं जैकेट",
    footwearSuggestion: "जूते / फुटवियर सुझाव",
    beforeYouStepOut: "बाहर निकलने से पहले",
    essentialAccessories: "आवश्यक सामग्री चेकलिस्ट",
    outdoorFeasibility: "बाहरी गतिविधियों की अनुकूलता",
    dailyActivityOutlook: "दैनिक गतिविधि दृष्टिकोण",
    runningExercise: "दौड़ना / व्यायाम",
    laundryDrying: "कपड़े सुखाना",
    transitCommute: "यातायात एवं यात्रा",
    askWeatherGptAi: "वेदरजीपीटी एआई से पूछें:",
    whatToWearPrompt: "क्या पहनें",
    umbrellaPrompt: "क्या छाते की ज़रूरत है?",
    joggingPrompt: "दौड़ने के लिए सही है?",
    footerTagline: "मौसम बुद्धिमत्ता के लिए संवादात्मक एआई प्लेटफॉर्म",
    footerBuiltWith: "फास्टएपीआई, विट रिएक्ट, एनडब्ल्यूपी मॉडल एवं WIS2.0 से निर्मित",
    signInToAsk: "🔑 पूछने के लिए साइन इन करें",
    suggestionWear: "👔 मुझे क्या पहनना चाहिए? (पहनावा गाइड)",
    suggestionTomorrow: "✨ कल के लिए पहनावा",
    suggestionRain: "🌧 क्या कल बारिश होगी?",
    suggestionFarming: "🌾 कृषि एवं कीटनाशक छिड़काव सलाह",
    upcomingDays: "आगामी दिन",
    detailedNwpBtn: "विस्तृत NWP →",
    localTime: "स्थानीय समय:",
    liveBadge: "लाइव",
    fetchingLiveData: "सटीक मौसम डेटा प्राप्त किया जा रहा है...",
    noWeatherData: "कोई मौसम डेटा लोड नहीं हुआ।",
    loadWeather: "मौसम लोड करें",
    riskDescLow: "वर्तमान मौसम की स्थिति न्यूनतम परिचालन और पर्यावरणीय जोखिम दर्शाती है।",
    riskDescModerate: "मध्यम मौसम प्रभाव। कृषि छिड़काव बहाव और सड़क यात्रा स्थितियों की जाँच करें।",
    riskDescHigh: "उच्च जोखिम चेतावनी। पूर्व चेतावनी सुरक्षा दिशानिर्देशों का पालन करें।",
    cropWeatherMatrixSub: "कीटनाशक छिड़काव, सिंचाई निर्धारण और फसल सुरक्षा के लिए वास्तविक समय का मौसम निर्णय ढांचा।",
    rainProbabilityLabel: "वर्षा की संभावना",
    washOffRisk: "धुलने का जोखिम",
    lowWashOff: "कम धुलने का जोखिम",
    sprayDriftWind: "छिड़काव बहाव हवा",
    optimalSpeed: "अनुकूल गति",
    highDrift: "अधिक बहाव",
    canopyTemp: "कैनोपी तापमान",
    evaporationSafe: "वाष्पीकरण सुरक्षित",
    highEvaporation: "तीव्र वाष्पीकरण",
    suitabilityIndex: "उपयुक्तता सूचकांक",
    agrochemicalSprayDecision: "कृषि-रसायन छिड़काव निर्णय:",
    harvestProtectionAdvisory: "फसल कटाई एवं कटाई उपरांत सुरक्षा सलाह:",
    regionalSoilProfileTitle: "क्षेत्रीय मृदा एवं कृषि-जलवायु प्रोफ़ाइल:",
    groundedFor: "के लिए प्रमाणित",
    primarySoilGroup: "प्रमुख मृदा समूह",
    soilPhLevel: "मृदा pH स्तर",
    textureAeration: "बनावट एवं वायु-संचार",
    organicCarbonDrainage: "जैविक कार्बन एवं जल निकासी",
    activeFarmCalendarFocus: "🗓️ सक्रिय कृषि कैलेंडर प्राथमिकता:",
    historicallyCultivatedHeader: "🌱 ऐतिहासिक रूप से उगाई जाने वाली एवं मृदा-अनुकूल फसलें:",
    calibratedIcarSub: "आईसीएआर (ICAR) के ऐतिहासिक उत्पादन रिकॉर्ड, स्थानीय मृदा pH और वास्तविक मौसमी मौसम अनुकूलता के साथ कैलिब्रेट किया गया।",
    match: "अनुकूल",
    historicalRecord: "ऐतिहासिक रिकॉर्ड:",
    soilCompatibility: "मृदा अनुकूलता:",
    climateWater: "जलवायु एवं जल:",
    growthCycle: "विकास चक्र:",
    cropProtection: "फसल सुरक्षा:",
    days: "दिन",
  },

  "ಕನ್ನಡ": {
    // Brand & Navigation
    brandTitle: "ವೆದರ್‌ಜಿಪಿಟಿ",
    brandSubtitle: "ಹವಾಮಾನ ಬುದ್ಧಿಮತ್ತೆ",
    mainMenu: "ಮುಖ್ಯ ಮೆನು",
    systemOnline: "ಹವಾಮಾನ ವ್ಯವಸ್ಥೆ ಸಕ್ರಿಯ",
    systemStatus: "NWP GFS ಮತ್ತು ECMWF ಆನ್‌ಲೈನ್",
    activeLocation: "ಪ್ರಸ್ತುತ ಸ್ಥಳ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    weatherMap: "ಹವಾಮಾನ ನಕ್ಷೆ",
    chat: "ವೆದರ್‌ಜಿಪಿಟಿ ಕೇಳಿ",
    outfit: "ಉಡುಪು ಮತ್ತು ಶೈಲಿ",
    forecast: "ಮುನ್ಸೂಚನೆ & NWP",
    alerts: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು",
    sectors: "ನಿರ್ಧಾರ ಬೆಂಬಲ",
    insights: "ಹವಾಮಾನ ಒಳನೋಟ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    about: "ಬಗ್ಗೆ",
    pastWeather: "ಹಿಂದಿನ ಹವಾಮಾನ ಹುಡುಕಾಟ",
    hourlyForecastTitle: "ಪ್ರತಿ ಗಂಟೆಯ ಮುನ್ಸೂಚನೆ (ಮುಂದಿನ 24 ಗಂಟೆಗಳು)",
    hourlyForecastSubtitle: "ಪ್ರಸ್ತುತ ಗಂಟೆಯಿಂದ ಪ್ರಾರಂಭವಾಗುವ 24 ಗಂಟೆಗಳ ಮುಂಬರುವ ಮುನ್ಸೂಚನೆ",
    hourlyTempMetric: "ತಾಪಮಾನ",
    hourlyRainMetric: "ಮಳೆ ಸಂಭವನೀಯತೆ %",
    hourlyWindMetric: "ಗಾಳಿಯ ವೇಗ",
    now: "ಈಗ",
    aviationHelplinesTitle: "ಅಧಿಕೃತ ವಾಯುಯಾನ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು",
    marineHelplinesTitle: "ಅಧಿಕೃತ ಸಮುದ್ರ ಮತ್ತು ಕರಾವಳಿ ಸುರಕ್ಷತಾ ಸಹಾಯವಾಣಿಗಳು",
    coastalPortsAndBasins: "ಭಾರತೀಯ ಸಮುದ್ರ ಜಲಾನಯನ ಪ್ರದೇಶಗಳು, ಕರಾವಳಿ ಬಂದರುಗಳು & ಮೀನುಗಾರಿಕೆ ಕೇಂದ್ರಗಳು",
    chatHistory: "ಸಂಭಾಷಣೆ ಇತಿಹಾಸ",
    newChat: "ಹೊಸ ಸಂಭಾಷಣೆ",
    clearHistory: "ಇತಿಹಾಸ ಅಳಿಸಿ",
    clearHistoryConfirm: "ಡೇಟಾಬೇಸ್‌ನಿಂದ ಎಲ್ಲಾ ಸಂಭಾಷಣೆ ಇತಿಹಾಸವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?",
    noPastSessions: "ಇನ್ನೂ ಯಾವುದೇ ಹಿಂದಿನ ಇತಿಹಾಸವಿಲ್ಲ. ಪ್ರಾರಂಭಿಸಲು ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ!",
    voiceRecordTitle: "ಧ್ವನಿ ಹವಾಮಾನ ಸಹಾಯಕ",
    voiceListeningPrompt: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ... ನಿಮ್ಮ ಹವಾಮಾನ ಪ್ರಶ್ನೆಯನ್ನು ಈಗ ಮಾತನಾಡಿ",
    voiceRecognizing: "ಧ್ವನಿಯನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...",
    voiceStopAndSend: "ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ಕಳುಹಿಸಿ",
    voiceCancel: "ರದ್ದುಮಾಡಿ",
    signIn: "ಸೈನ್ ಇನ್",
    signOut: "ಸೈನ್ ಔಟ್",
    guestUser: "ನಾಗರಿಕ ಮೌಲ್ಯಮಾಪಕ",
    greeting: "ನಮಸ್ಕಾರ",

    // Search & Launcher
    breadcrumb: "ಹವಾಮಾನ ಮಾಹಿತಿ",
    searchCity: "ನಗರ ಹುಡುಕಿ",
    searchPlaceholder: "ಭಾರತದ ಯಾವುದೇ ನಗರ, ಜಿಲ್ಲೆ ಅಥವಾ ಸ್ಥಳ ಹುಡುಕಿ...",
    searchBtn: "ಸ್ಥಳ ಹುಡುಕಿ",
    aiAssistant: "✦ ಎಐ ಹವಾಮಾನ ಸಹಾಯಕ",
    askTitle: "ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ.",
    askSubtitle: "ಸಂಖ್ಯಾತ್ಮಕ ಮಾದರಿಗಳು ಮತ್ತು ನಿಖರ ಕೃಷಿ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    askPlaceholder: "ಉದಾ: ನಾಳೆ ನಾಶಿಕ್‌ನಲ್ಲಿ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬಹುದೇ?",
    askBtn: "ಕೇಳಿ",
    refresh: "↻ ನವೀಕರಿಸಿ",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ...",
    micUnavailable: "ಸ್ಪೀಚ್ ರೆಕಗ್ನಿಷನ್ ಲಭ್ಯವಿಲ್ಲ.",

    // Dashboard Cards & Metrics
    currentConditions: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಸ್ಥಿತಿ",
    temperature: "ತಾಪಮಾನ",
    feelsLike: "ಅನುಭವವಾಗುವ ತಾಪಮಾನ",
    humidity: "ಆರ್ದ್ರತೆ",
    windSpeed: "ಗಾಳಿಯ ವೇಗ",
    surfacePressure: "ವಾಯುಭಾರ ಒತ್ತಡ",
    uvIndex: "ಯುವಿ ಸೂಚ್ಯಂಕ",
    airQuality: "ಗಾಳಿಯ ಗುಣಮಟ್ಟ (AQI)",
    rainfallProbability: "ಮಳೆಯ ಸಾಧ್ಯತೆ",
    precipitation: "ಮಳೆ ಪ್ರಮಾಣ",
    precipExpected: "ನಿರೀಕ್ಷಿತ ಮಳೆ",

    // Decision Support & Risks
    decisionSupport: "ನಿರ್ಧಾರ ಬೆಂಬಲ",
    decisionRisks: "ಪರಿಸರ ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ",
    rainRisk: "ಮಳೆ ಅಪಾಯ",
    heatRisk: "ಶಾಖದ ಅಪಾಯ",
    windRisk: "ಗಾಳಿಯ ಅಪಾಯ",
    forecastConfidence: "ಮುನ್ಸೂಚನೆ ನಿಖರತೆ",
    specializedModules: "ವಿಶೇಷ ಕ್ಷೇತ್ರಗಳ ಮಾಹಿತಿ",
    agricultureSector: "ಕೃಷಿ ಮತ್ತು ಬೆಳೆ ಮಾಹಿತಿ",
    aviationSector: "ವಿಮಾನಯಾನ ಸುರಕ್ಷತೆ",
    marineSector: "ಕರಾವಳಿ ಮತ್ತು ಮೀನುಗಾರಿಕೆ",
    smartCitySector: "ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ನಿರ್ವಹಣೆ",

    // Spatial Map & Climate on Dashboard
    spatialMap: "ಸ್ಥಳ ಆಧಾರಿತ ನಕ್ಷೆ",
    spatialTitle: "ಸ್ಥಳೀಯ ಜಿಐಎಸ್ ಬುದ್ಧಿಮತ್ತೆ",
    openMapBtn: "ಹವಾಮಾನ ನಕ್ಷೆ ತೆರೆಯಿರಿ →",
    historicalTrends: "ಐತಿಹಾಸಿಕ ಹವಾಮಾನ ಬದಲಾವಣೆ",
    multiYearAnalytics: "ಬಹುವಾರ್ಷಿಕ ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ",
    trendsBtn: "ವಿಶ್ಲೇಷಣೆ ನೋಡಿ →",
    warmingTrend: "ತಾಪಮಾನ ಏರಿಕೆಯ ಪ್ರವೃತ್ತಿ",
    forecast7d: "7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
    forecast14d: "14 ದಿನಗಳ ಮುನ್ಸೂಚನೆ",

    // Weather Map Page
    mapEyebrow: "ಭಾರತೀಯ ಹವಾಮಾನ ಜಿಐಎಸ್ ನಕ್ಷೆ",
    mapHeaderTitle: "ಹವಾಮಾನ ನಕ್ಷೆ",
    mapHeaderDesc: "ನೈಜ ಸಮಯದ ವೆದರ್‌ಜಿಪಿಟಿ ಮಾಹಿತಿ ಮತ್ತು ಹೊರಹೋಗುವ ಸಲಹೆಗಳಿಗಾಗಿ ಭಾರತದ ಯಾವುದೇ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    mapConfigBtn: "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಕೀ",
    suggestionsLabel: "ಸಲಹೆಗಳು:",
    liveRadarActive: "● ಲೈವ್ ರಡಾರ್ ಸಕ್ರಿಯ",
    clickMapHelper: "👆 ಹವಾಮಾನ ನೋಡಲು ಭಾರತದ ನಕ್ಷೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ",
    weatherTelemetry: "ನೈಜ ಸಮಯದ ಹವಾಮಾನ ದತ್ತಾಂಶ",

    // Outing Suggestions & Umbrella Prompt
    outdoorAdvisory: "ಹೊರಹೋಗುವ ಹವಾಮಾನ ಸಲಹೆ",
    outgoingQuestion: "ನೀವು ಇಂದು ಹೊರಗೆ ಹೋಗಲು ಯೋಜಿಸುತ್ತಿದ್ದೀರಾ?",
    outgoingNow: "🚶 ಹೌದು, ಈಗಲೇ ಹೊರಡುತ್ತಿದ್ದೇನೆ",
    outgoingLater: "🕒 ನಂತರ ಹೊರಗೆ ಹೋಗುತ್ತಿದ್ದೇನೆ",
    rainyUmbrellaReply: "ಇಂದು ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ, ದಯವಿಟ್ಟು ಛತ್ರಿ ಜೊತೆಯಲ್ಲಿ ಇಟ್ಟುಕೊಳ್ಳಿ!",
    rainyUmbrellaSub: "ಈ ಪ್ರದೇಶದಲ್ಲಿ ಮಳೆಯಾಗುವ ಹೆಚ್ಚಿನ ಸಾಧ್ಯತೆ ಕಂಡುಬಂದಿದೆ.",
    rainyUmbrellaAdvice: "ಸಲಹೆ: ಛತ್ರಿ ಅಥವಾ ರೇನ್‌ಕೋಟ್ ಜೊತೆಯಲ್ಲಿಡಿ. ರಸ್ತೆಗಳು ಜಾರುವಂತಿರಬಹುದು ಮತ್ತು ಪ್ರಯಾಣದ ವೇಳೆ ಹಠಾತ್ ಮಳೆ ಸುರಿಯಬಹುದು.",
    rainyLaterTip: "ಸಂಜೆಯ ಸಲಹೆ: ಮಧ್ಯಾಹ್ನದ ನಂತರ ಮಳೆ ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆಯಿರುವುದರಿಂದ ಸಂಜೆಯ ಮುನ್ಸೂಚನೆ ಗಮನಿಸಿ.",
    dryPleasantReply: "ಹವಾಮಾನ ಆಹ್ಲಾದಕರವಾಗಿದೆ — ಛತ್ರಿ ಇಲ್ಲದೆ ಧೈರ್ಯವಾಗಿ ಹೊರಹೋಗಬಹುದು!",
    dryPleasantSub: "ಮಳೆಯ ಸಾಧ್ಯತೆ ತೀರಾ ಕಡಿಮೆ. ಒಣ ಮತ್ತು ಸ್ವಚ್ಛ ಹವಾಮಾನವಿದೆ.",
    dryPleasantAdvice: "ಸಲಹೆ: ಯಾವುದೇ ಮಳೆ ಸಾಧನಗಳ ಅಗತ್ಯವಿಲ್ಲ. ತಾಪಮಾನ ಆಹ್ಲಾದಕರವಾಗಿದೆ.",
    hotWeatherTip: "ಶಾಖದ ಸೂಚನೆ: ಬಿಸಿಲು ಹೆಚ್ಚಾಗಿದೆ. ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಸನ್ ಪ್ರೊಟೆಕ್ಷನ್ ಬಳಸಿ.",
    askInChatBtn: "💬 ವೆದರ್‌ಜಿಪಿಟಿ ಕೇಳಿ",
    forecast7dTitle: "7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ ನೋಟ",
    forecast14dTitle: "14 ದಿನಗಳ ಮುನ್ಸೂಚನೆ ನೋಟ",

    // Alerts View
    activeAlerts: "ತೀವ್ರ ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು",
    alertsEyebrow: "ವಿಪತ್ತು ಮುನ್ಸೂಚನೆ ಮತ್ತು ನಿರ್ವಹಣೆ",
    alertsSubtitle: "ಭಾರತೀಯ ಹವಾಮಾನ ಇಲಾಖೆ (IMD / MoES) ಬಹು-ಅಪಾಯ ಮುನ್ನೆಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ.",
    emergencySiren: "ತುರ್ತು ಸೈರನ್ ಬಟನ್",
    sirenActive: "ಸೈರನ್ ಸಕ್ರಿಯ",
    stopSiren: "ಸೈರನ್ ನಿಲ್ಲಿಸಿ",
    imdProtocol: "ಐಎಂಡಿ 4-ಹಂತದ ಎಚ್ಚರಿಕೆ ನಿಯಮಗಳು",
    redWarning: "ಕೆಂಪು ಎಚ್ಚರಿಕೆ (ಕ್ರಮ ಕೈಗೊಳ್ಳಿ): ಅತ್ಯಂತ ತೀವ್ರ ಹವಾಮಾನ. ಸುರಕ್ಷತಾ ನಿಯಮ ಪಾಲಿಸಿ.",
    orangeAlert: "ಕಿತ್ತಳೆ ಎಚ್ಚರಿಕೆ (ಸಿದ್ಧರಾಗಿರಿ): ಅಪಾಯಕಾರಿ ಹವಾಮಾನ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ.",
    yellowWatch: "ಹಳದಿ ಎಚ್ಚರಿಕೆ (ಎಚ್ಚರದಿಂದಿರಿ): ಹವಾಮಾನ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸುತ್ತಿರಿ.",
    greenNormal: "ಹಸಿರು (ಸಾಮಾನ್ಯ): ಹವಾಮಾನ ಸ್ಥಿತಿ ಸಾಮಾನ್ಯವಾಗಿರುತ್ತದೆ.",
    noActiveAlerts: "ಈ ವಲಯಕ್ಕೆ ಯಾವುದೇ ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ. ಪರಿಸ್ಥಿತಿ ಸಹಜವಾಗಿದೆ.",
    disasterAlertTitle: "ಗಂಭೀರ ವಿಪತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ",
    disasterAlertSubtitle: "ಐಎಂಡಿ / MoES ಮತ್ತು ಇನ್‌ಕಾಯಿಸ್ (INCOIS) ಬಹು-ವಿಪತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ.",
    heavyFloodAlert: "ಭಾರಿ ಪ್ರವಾಹ ಮತ್ತು ಜಲಾವೃತ ಎಚ್ಚರಿಕೆ",
    cycloneAlert: "ತೀವ್ರ ಚಂಡಮಾರುತ ಮತ್ತು ವಿನಾಶಕಾರಿ ಗಾಳಿ ಎಚ್ಚರಿಕೆ",
    tsunamiAlert: "ಸುನಾಮಿ ಮುನ್ನೆಚ್ಚರಿಕೆ ಮತ್ತು ಕಡಲ ಉಬ್ಬರ",
    immediateAction: "ತಕ್ಷಣದ ಜೀವ ರಕ್ಷಣಾ ಕ್ರಮ ಅಗತ್ಯ",
    muteSiren: "ಸೈರನ್ ನಿಲ್ಲಿಸಿ ಮತ್ತು ದೃಢೀಕರಿಸಿ",
    resoundSiren: "ಜೋರಾದ ಸೈರನ್ ಬಾರಿಸಿ",
    sirenSounding: "ಜೋರಾದ ತುರ್ತು ಸೈರನ್ ಮೊಳಗುತ್ತಿದೆ",
    dismissAlert: "ಸ್ವೀಕರಿಸಿ ಮತ್ತು ಮುಚ್ಚಿ",
    simulateDisaster: "ವಿಪತ್ತು ಪರೀಕ್ಷೆ:",
    testFlood: "🌊 ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆ ಪರೀಕ್ಷೆ (ರೆಡ್ ಅಲರ್ಟ್)",
    testCyclone: "🌀 ಚಂಡಮಾರುತ ಪರೀಕ್ಷೆ (ರೆಡ್ ಅಲರ್ಟ್)",
    testTsunami: "🌊 ಸುನಾಮಿ ಎಚ್ಚರಿಕೆ ಪರೀಕ್ಷೆ (ರೆಡ್ ಅಲರ್ಟ್)",
    clearHazard: "🟢 ಸಾಮಾನ್ಯ ಹವಾಮಾನ",

    // Sectors View
    sectorsEyebrow: "ವಿವಿಧ ಕ್ಷೇತ್ರಗಳ ನಿರ್ಧಾರ ಬೆಂಬಲ",
    sectorsTitle: "ಕಾರ್ಯಾಚರಣೆ ಹವಾಮಾನ ಸಲಹೆಗಳು",
    sectorsSubtitle: "ಕೃಷಿ, ವಿಮಾನಯಾನ ಮತ್ತು ಮೀನುಗಾರಿಕೆ ಕ್ಷೇತ್ರಗಳಿಗೆ ನಿಖರ ಹವಾಮಾನ ಒಳನೋಟ.",
    spraySuitability: "ಸಿಂಪರಣೆ ಸೂಕ್ತತೆ ಅಂಕ",
    soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    harvestIrrigation: "ಕೊಯ್ಲು ಮತ್ತು ನೀರಾವರಿ ಸಲಹೆ",
    flightCategory: "ಹಾರಾಟ ನಿಯಮ ವರ್ಗ",
    surfaceVisibility: "ಗೋಚರತೆ ಮಟ್ಟ",
    cloudBase: "ಮೋಡಗಳ ಎತ್ತರ",
    seaState: "ಸಮುದ್ರದ ಪರಿಸ್ಥಿತಿ",
    waveHeight: "ಅಲೆಗಳ ಎತ್ತರ",
    urbanHeat: "ನಗರ ತಾಪ ಸೂಚ್ಯಂಕ",
    drainageRisk: "ನೀರು ನಿಲ್ಲುವ ಅಪಾಯ",

    // Insights View
    insightsEyebrow: "ದೀರ್ಘಕಾಲೀನ ಹವಾಮಾನ ಬುದ್ಧಿಮತ್ತೆ",
    insightsTitle: "ಐತಿಹಾಸಿಕ ಬದಲಾವಣೆಗಳು",
    insightsSubtitle: "ದಶಕದ ತಾಪಮಾನ ಬದಲಾವಣೆ ಮತ್ತು ಮಾನ್ಸೂನ್ ಮಳೆ ವ್ಯತ್ಯಾಸಗಳು.",
    warmingBaseline: "WMO ಗುಣಮಟ್ಟದ ಆಧಾರ (1991-2020)",
    temperatureAnomaly: "ತಾಪಮಾನ ವ್ಯತ್ಯಾಸ",
    precipitationDeviation: "ಮಳೆ ವ್ಯತ್ಯಾಸ",
    extremeEvents: "ತೀವ್ರ ಹವಾಮಾನ ಘಟನೆಗಳು",

    // Status Values
    suitable: "ಸೂಕ್ತ",
    unsuitable: "ಸೂಕ್ತವಲ್ಲ",
    caution: "ಎಚ್ಚರಿಕೆ",
    high: "ಹೆಚ್ಚು",
    moderate: "ಮಧ್ಯಮ",
    low: "ಕಡಿಮೆ",
    good: "ಉತ್ತಮ",
    unhealthy: "ಅನಾರೋಗ್ಯಕರ",
    today: "ಇಂದು",
    tomorrow: "ನಾಳೆ",

    // Additional Detailed UI Labels
    dayLow: "ಕನಿಷ್ಠ",
    rainProbability: "ಮಳೆಯ ಸಾಧ್ಯತೆ",
    maxWind: "ಗರಿಷ್ಠ ಗಾಳಿ",
    safetyActions: "ಶಿಫಾರಸು ಮಾಡಿದ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು",
    target: "ಗುರಿ",
    valid: "ಮಾನ್ಯತೆ",
    system: "ವ್ಯವಸ್ಥೆ",
    activeBadge: "ಸಕ್ರಿಯ",
    cropDecisionEngine: "ಬೆಳೆ-ಹವಾಮಾನ ನಿರ್ಧಾರ ಎಂಜಿನ್",
    farmingAdvisory: "ಕೃಷಿ ಮತ್ತು ಕೀಟನಾಶಕ ಸಲಹೆ",
    sprayStatus: "ಸಿಂಪರಣೆ ಸ್ಥಿತಿ",
    recommendation: "ಶಿಫಾರಸು",
    meteorologicalFactors: "ಪರಿಗಣಿಸಲಾದ ಹವಾಮಾನ ಅಂಶಗಳು",
    irrigationGuidance: "ನೀರಾವರಿ ಮಾರ್ಗದರ್ಶನ",
    targetCrops: "ಉದ್ದೇಶಿತ ಪ್ರಾದೇಶಿಕ ಬೆಳೆಗಳು",
    aviationBriefing: "ಐಸಿಎಒ ಮೆಟಾರ್ / ಟಾಫ್ ವಿಮಾನಯಾನ ಬ್ರೀಫಿಂಗ್",
    aviationStation: "ವಿಮಾನಯಾನ ಹವಾಮಾನ ಕೇಂದ್ರ",
    airport: "ವಿಮಾನ ನಿಲ್ದಾಣ",
    wind: "ಗಾಳಿ",
    altimeter: "ಆಲ್ಟಿಮೀಟರ್",
    lookup: "ಹುಡುಕಿ",
    rawMetar: "ಮೂಲ ಮೆಟಾರ್ ಅವಲೋಕನ (NOAA)",
    coastalSafety: "ಕರಾವಳಿ ಮತ್ತು ಸಮುದ್ರ ಸುರಕ್ಷತೆ",
    marineAdvisory: "ಸಾಗರ ಹವಾಮಾನ ಸಲಹೆ",
    status: "ಸ್ಥಿತಿ",
    coastalConditions: "ಕರಾವಳಿ ಪರಿಸ್ಥಿತಿಗಳು",
    surfaceWind: "ಮೇಲ್ಮೈ ಗಾಳಿ",
    urbanIntelligence: "ನಗರ ಪರಿಸರ ಬುದ್ಧಿಮತ್ತೆ",
    smartCityTitle: "ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಹವಾಮಾನ ಮೇಲ್ವಿಚಾರಣೆ",
    urbanComfort: "ನಗರ ಸೌಕರ್ಯ ಮತ್ತು ಗಾಳಿಯ ಗುಣಮಟ್ಟ",
    apparentHeatIndex: "ತಾಪಮಾನ ಅನುಭವ ಸೂಚ್ಯಂಕ",
    airQualityStatus: "ಗಾಳಿಯ ಗುಣಮಟ್ಟ ಸ್ಥಿತಿ",
    urbanFloodRisk: "ನಗರ ಪ್ರವಾಹ ಅಪಾಯ",
    historicalAnomalies: "ಐತಿಹಾಸಿಕ ವಾರ್ಷಿಕ ಬದಲಾವಣೆಗಳು (2020 - 2026)",
    year: "ವರ್ಷ",
    meanTemp: "ಸರಾಸರಿ ತಾಪಮಾನ (°C)",
    monsoonRainfallVsNormal: "ಸಾಮಾನ್ಯಕ್ಕೆ ಹೋಲಿಸಿದರೆ ಮಾನ್ಸೂನ್ ಮಳೆ",
    keyResearchInsights: "ಪ್ರಮುಖ ಹವಾಮಾನ ಸಂಶೋಧನಾ ಒಳನೋಟಗಳು",
    chatAssistantTitle: "ವೆದರ್‌ಜಿಪಿಟಿ ಸಂವಾದಾತ್ಮಕ ಸಹಾಯಕ",
    chatAssistantSubtitle: "ಬಹುಭಾಷಾ ಹವಾಮಾನ ಬುದ್ಧಿಮತ್ತೆ",
    clearChat: "ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ",
    listen: "ಕೇಳಿ",
    spokenResponse: "ಧ್ವನಿ ಪ್ರತಿಕ್ರಿಯೆ",
    analyzingPrompt: "ಹವಾಮಾನ ಮಾದರಿಗಳ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...",
    signInRequired: "ವೆದರ್‌ಜಿಪಿಟಿ ಕೇಳಲು ಸೈನ್ ಇನ್ ಅಗತ್ಯವಿದೆ",
    signInPrompt: "ಚಾಟ್ ಮಾಡಲು ಮೊಬೈಲ್ ಒಟಿಪಿ ಅಥವಾ ಗೂಗಲ್ ಖಾತೆಯೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ.",
    signInBtn: "🔑 ಮೊಬೈಲ್ ಒಟಿಪಿ ಅಥವಾ ಗೂಗಲ್ ಸೈನ್ ಇನ್ →",
    instantAccessBtn: "⚡ ತಕ್ಷಣದ ನಾಗರಿಕ ಪ್ರವೇಶ →",
    phoneOtpBenefit: "✓ ೧೦-ಸೆಕೆಂಡ್ ಫೋನ್ ಒಟಿಪಿ ಲಾಗಿನ್",
    googleSignInBenefit: "✓ ತಕ್ಷಣ ಗೂಗಲ್ ಸೈನ್ ಇನ್",
    freeAccessBenefit: "✓ ಉಚಿತ ಮತ್ತು ತ್ವರಿತ ಪ್ರವೇಶ",
    voiceSpeaking: "ವೆದರ್‌ಜಿಪಿಟಿ ಎಐ ಧ್ವನಿ ಮಾತನಾಡುತ್ತಿದೆ...",
    stopVoice: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    voiceListening: "ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಆಲಿಸುತ್ತಿದ್ದೇವೆ... ಪ್ರಶ್ನೆ ಕೇಳಿ",
    pesticideAdviceChip: "🌾 ಕೀಟನಾಶಕ ಸಿಂಪರಣೆ ಸಲಹೆ",
    disasterAlertsChip: "🚨 ವಿಪತ್ತು ಎಚ್ಚರಿಕೆಗಳು",
    aviationBriefingChip: "✈️ ವಿಮಾನಯಾನ ಮಾಹಿತಿ",
    climateTrendsChip: "📊 ಹವಾಮಾನ ಪ್ರವೃತ್ತಿಗಳು",
    outfitAdviceChip: "👔 ಉಡುಪು ಮತ್ತು ಪ್ರಯಾಣ ಸಲಹೆ",
    liveWeatherChip: "🌡️ ಲೈವ್ ಹವಾಮಾನ",
    askAnything: "ನಲ್ಲಿ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ",
    computingNwpSpread: "ಸಂಖ್ಯಾತ್ಮಕ ಹವಾಮಾನ ಮಾದರಿಗಳ ತುಲನೆ ನಡೆಯುತ್ತಿದೆ...",
    nwpComparisonTitle: "NOAA GFS vs ECMWF IFS ಬಹು-ಮಾದರಿ ಹೋಲಿಕೆ",
    nwpComparisonDesc: "ಅಮೆರಿಕದ ಜಿಎಫ್‌ಎಸ್ ಮತ್ತು ಯುರೋಪಿನ ಇಸಿಎಂಡಬ್ಲ್ಯುಎಫ್ ನಡುವಿನ ವಿಶ್ಲೇಷಣೆ.",
    ensembleConfidence: "ಮಾದರಿ ನಿಖರತೆ",
    avgTempSpread: "ಸರಾಸರಿ ತಾಪಮಾನ ವ್ಯತ್ಯಾಸ",
    forecastDay: "ಮುನ್ಸೂಚನೆ ದಿನ",
    tempSpread: "ತಾಪಮಾನ ವ್ಯತ್ಯಾಸ",
    gfsRainVsEcmwf: "GFS ಮಳೆ vs ECMWF ಮಳೆ",
    modelAgreement: "ಮಾದರಿ ಒಪ್ಪಂದ",
    scientificContextTitle: "ವೈಜ್ಞಾನಿಕ ಹಿನ್ನೆಲೆ:",
    scientificContextDesc: "NOAA GFS ಮತ್ತು ECMWF ಮಾದರಿಗಳ ಹೆಚ್ಚಿನ ಹೊಂದಾಣಿಕೆಯು ನಿಖರ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    whatShouldWear: "ನಲ್ಲಿ ಏನು ಧರಿಸಬೇಕು?",
    outfitSubtitle: "ಹವಾಮಾನಕ್ಕೆ ತಕ್ಕ ಉಡುಪು, ಅಗತ್ಯ ಪರಿಕರಗಳ ಪಟ್ಟಿ ಮತ್ತು ಹೊರಾಂಗಣ ಚಟುವಟಿಕೆಗಳ ಸಲಹೆ.",
    analyzingOutfit: "ಉಡುಪು ಶಿಫಾರಸುಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    recommendedTops: "ಶಿಫಾರಸು ಮಾಡಿದ ಮೇಲುಡುಪು",
    recommendedBottoms: "ಶಿಫಾರಸು ಮಾಡಿದ ಕೆಳಉಡುಪು",
    outerwearLayers: "ಜಾಕೆಟ್ ಮತ್ತು ಕೋಟ್",
    footwearSuggestion: "ಪಾದರಕ್ಷೆಗಳ ಸಲಹೆ",
    beforeYouStepOut: "ಹೊರಹೋಗುವ ಮೊದಲು",
    essentialAccessories: "ಅಗತ್ಯ ಸಾಮಗ್ರಿಗಳ ಪಟ್ಟಿ",
    outdoorFeasibility: "ಹೊರಾಂಗಣ ಚಟುವಟಿಕೆಗಳ ಯೋಗ್ಯತೆ",
    dailyActivityOutlook: "ದೈನಂದಿನ ಚಟುವಟಿಕೆ ನೋಟ",
    runningExercise: "ಓಟ / ವ್ಯಾಯಾಮ",
    laundryDrying: "ಬಟ್ಟೆ ಒಣಗಿಸುವುದು",
    transitCommute: "ಪ್ರಯಾಣ ಮತ್ತು ಸಂಚಾರ",
    askWeatherGptAi: "ವೆದರ್‌ಜಿಪಿಟಿಗೆ ಕೇಳಿ:",
    whatToWearPrompt: "ಏನು ಧರಿಸಬೇಕು",
    umbrellaPrompt: "ಛತ್ರಿ ಬೇಕೇ?",
    joggingPrompt: "ಓಟಕ್ಕೆ ಸೂಕ್ತವೇ?",
    footerTagline: "ಹವಾಮಾನ ಬುದ್ಧಿಮತ್ತೆಯ ಸಂವಾದಾತ್ಮಕ ಎಐ ವೇದಿಕೆ",
    footerBuiltWith: "FastAPI, Vite React, NWP Models ಮತ್ತು WIS2.0 ನೊಂದಿಗೆ ನಿರ್ಮಿಸಲಾಗಿದೆ",
    signInToAsk: "🔑 ಕೇಳಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
    suggestionWear: "👔 ನಾನು ಏನು ಧರಿಸಬೇಕು? (ಉಡುಪು ಮಾರ್ಗದರ್ಶಿ)",
    suggestionTomorrow: "✨ ನಾಳಿನ ಉಡುಪು",
    suggestionRain: "🌧 ನಾಳೆ ಮಳೆ ಬರುತ್ತದೆಯೇ?",
    suggestionFarming: "🌾 ಕೃಷಿ ಮತ್ತು ಸಿಂಪಡಣೆ ಸಲಹೆ",
    upcomingDays: "ಮುಂಬರುವ ದಿನಗಳು",
    detailedNwpBtn: "ವಿವರವಾದ NWP →",
    localTime: "ಸ್ಥಳೀಯ ಸಮಯ:",
    liveBadge: "ಲೈವ್",
    fetchingLiveData: "ನೇರ ಹವಾಮಾನ ಡೇಟಾ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    noWeatherData: "ಯಾವುದೇ ಹವಾಮಾನ ಡೇಟಾ ಲೋಡ್ ಆಗಿಲ್ಲ.",
    loadWeather: "ಹವಾಮಾನ ಲೋಡ್ ಮಾಡಿ",
    riskDescLow: "ಪ್ರಸ್ತುತ ಹವಾಮಾನವು ಕನಿಷ್ಠ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ಪರಿಸರ ಅಪಾಯವನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    riskDescModerate: "ಮಧ್ಯಮ ಹವಾಮಾನ ಪರಿಣಾಮ. ಕೃಷಿ ಸಿಂಪಡಣೆ ಡ್ರಿಫ್ಟ್ ಮತ್ತು ರಸ್ತೆ ಪ್ರಯಾಣ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    riskDescHigh: "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಎಚ್ಚರಿಕೆ. ಮುನ್ನೆಚ್ಚರಿಕೆ ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಅನುಸರಿಸಿ.",
    cropWeatherMatrixSub: "ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ, ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ಬೆಳೆ ಸುರಕ್ಷತೆಗಾಗಿ ನೈಜ ಸಮಯದ ಕೃಷಿ-ಹವಾಮಾನ ನಿರ್ಧಾರ ಕೋಷ್ಟಕ.",
    rainProbabilityLabel: "ಮಳೆಯ ಸಂಭವನೀಯತೆ",
    washOffRisk: "ತೊಳೆಯುವ ಅಪಾಯ",
    lowWashOff: "ಕಡಿಮೆ ತೊಳೆಯುವಿಕೆ",
    sprayDriftWind: "ಸಿಂಪಡಣೆ ಡ್ರಿಫ್ಟ್ ಗಾಳಿ",
    optimalSpeed: "ಅತ್ಯುತ್ತಮ ವೇಗ",
    highDrift: "ಹೆಚ್ಚಿನ ಡ್ರಿಫ್ಟ್",
    canopyTemp: "ಬೆಳೆ ಮೇಲಾವರಣ ತಾಪಮಾನ",
    evaporationSafe: "ಆವಿಯಾಗುವಿಕೆ ಸುರಕ್ಷಿತ",
    highEvaporation: "ಹೆಚ್ಚು ಆವಿಯಾಗುವಿಕೆ",
    suitabilityIndex: "ಸೂಕ್ತತೆ ಸೂಚ್ಯಂಕ",
    agrochemicalSprayDecision: "ಕೃಷಿ-ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ ನಿರ್ಧಾರ:",
    harvestProtectionAdvisory: "ಕೊಯ್ಲು ಮತ್ತು ಕೊಯ್ಲೋತ್ತರ ರಕ್ಷಣಾ ಸಲಹೆ:",
    regionalSoilProfileTitle: "ಪ್ರಾದೇಶಿಕ ಮಣ್ಣು ಮತ್ತು ಕೃಷಿ-ಹವಾಮಾನ ವಿವರ:",
    groundedFor: "ಆಧಾರಿತ",
    primarySoilGroup: "ಮುಖ್ಯ ಮಣ್ಣಿನ ವಿಧ",
    soilPhLevel: "ಮಣ್ಣಿನ pH ಮಟ್ಟ",
    textureAeration: "ರಚನೆ ಮತ್ತು ವಾತಾಯನ",
    organicCarbonDrainage: "ಸಾವಯವ ಇಂಗಾಲ ಮತ್ತು ಒಳಚರಂಡಿ",
    activeFarmCalendarFocus: "🗓️ ಸಕ್ರಿಯ ಕೃಷಿ ಕ್ಯಾಲೆಂಡರ್ ಆದ್ಯತೆ:",
    historicallyCultivatedHeader: "🌱 ಐತಿಹಾಸಿಕವಾಗಿ ಬೆಳೆಯಲಾಗುವ ಮತ್ತು ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆಗಳು:",
    calibratedIcarSub: "ಐಸಿಎಆರ್ (ICAR) ಐತಿಹಾಸಿಕ ಉತ್ಪಾದನಾ ದಾಖಲೆಗಳು, ಸ್ಥಳೀಯ ಮಣ್ಣಿನ pH ಮತ್ತು ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ಹೊಂದಾಣಿಕೆಯೊಂದಿಗೆ ಮಾಪನಾಂಕ ನಿರ್ಣಯಿಸಲಾಗಿದೆ.",
    match: "ಹೊಂದಾಣಿಕೆ",
    historicalRecord: "ಐತಿಹಾಸಿಕ ದಾಖಲೆ:",
    soilCompatibility: "ಮಣ್ಣಿನ ಹೊಂದಾಣಿಕೆ:",
    climateWater: "ಹವಾಮಾನ ಮತ್ತು ನೀರು:",
    growthCycle: "ಬೆಳವಣಿಗೆಯ ಚಕ್ರ:",
    cropProtection: "ಬೆಳೆ ಸಂರಕ್ಷಣೆ:",
    days: "ದಿನಗಳು",
  },

  "தமிழ்": {
    brandTitle: "வானிலை ஜிபிಡಿ",
    brandSubtitle: "வானிலை நுண்ணறிவு",
    mainMenu: "முதன்மை பட்டியல்",
    systemOnline: "வானிலை அமைப்பு இயங்குகிறது",
    systemStatus: "NWP GFS & ECMWF ஆன்லைன்",
    activeLocation: "தற்போதைய இடம்",
    dashboard: "டாஷ்போர்டு",
    weatherMap: "வானிலை வரைபடம்",
    chat: "வானிலை ஜிபிடி",
    outfit: "உடை மற்றும் பாணி",
    forecast: "முன்னறிவிப்பு & NWP",
    alerts: "எச்சரிக்கைகள்",
    sectors: "முடிவெடுக்கும் ஆதரவு",
    insights: "காலநிலை நுண்ணறிவு",
    settings: "அமைப்புகள்",
    about: "பற்றி",
    pastWeather: "கடந்த கால வானிலை தேடல்",
    hourlyForecastTitle: "மணிநேர முன்னறிவிப்பு (அடுத்த 24 மணிநேரம்)",
    hourlyForecastSubtitle: "தற்போதைய மணியிலிருந்து தொடங்கும் 24 மணிநேர முன்னறிவிப்பு",
    hourlyTempMetric: "வெப்பநிலை",
    hourlyRainMetric: "மழை வாய்ப்பு %",
    hourlyWindMetric: "காற்றின் வேகம்",
    now: "இப்போது",
    aviationHelplinesTitle: "அதிகாரப்பூர்வ வான்வழி செயல்பாடுகள் & அவசர உதவி எண்கள்",
    marineHelplinesTitle: "அதிகாரப்பூர்வ கடல் மற்றும் கடலோர பாதுகாப்பு உதவி எண்கள்",
    coastalPortsAndBasins: "இந்திய கடல்சார் படுகைகள், கடலோர துறைமுகங்கள் & மீன்பிடி மையங்கள்",
    chatHistory: "உரையாடல் வரலாறு",
    newChat: "புதிய உரையாடல்",
    clearHistory: "வரலாற்றை அழிக்கவும்",
    clearHistoryConfirm: "தரவுத்தளத்திலிருந்து அனைத்து உரையாடல் வரலாற்றையும் அழிக்க விரும்புகிறீர்களா?",
    noPastSessions: "இன்னும் உரையாடல் வரலாறு இல்லை. தொடங்க ஒரு கேள்வியைக் கேளுங்கள்!",
    voiceRecordTitle: "குரல் வானிலை உதவியாளர்",
    voiceListeningPrompt: "கேட்கிறது... உங்கள் வானிலை கேள்வியை இப்போது பேசுங்கள்",
    voiceRecognizing: "குரல் அடையாளம் காணப்படுகிறது...",
    voiceStopAndSend: "முடிக்கவும் அனுப்பவும்",
    voiceCancel: "ரத்து செய்",
    signIn: "உள்நுழைக",
    signOut: "வெளியேறு",
    guestUser: "மதிப்பீட்டாளர்",
    greeting: "வணக்கம்",

    breadcrumb: "வானிலை தகவல்",
    searchCity: "நகரத்தை தேடுங்கள்",
    searchPlaceholder: "இந்தியாவின் ஏதேனும் ஒரு நகரம் அல்லது இடத்தை தேடுங்கள்...",
    searchBtn: "தேடு",
    aiAssistant: "✦ ஏஐ வானிலை உதவியாளர்",
    askTitle: "வானிலை பற்றி கேளுங்கள்.",
    askSubtitle: "துல்லியமான முன்னறிவிப்புகள் மற்றும் ஆலோசனைகள்.",
    askPlaceholder: "எ.கா: நாளை மழை பெய்யுமா?",
    askBtn: "கேள்",
    refresh: "↻ புதுப்பி",
    listening: "கேட்கிறது... பேசுங்கள்",
    micUnavailable: "குரல் பதிவு ஆதரிக்கப்படவில்லை.",

    currentConditions: "தற்போதைய வானிலை",
    temperature: "வெப்பநிலை",
    feelsLike: "உணரப்படும் வெப்பநிலை",
    humidity: "ஈரப்பதம்",
    windSpeed: "காற்றின் வேகம்",
    surfacePressure: "காற்றழுத்தம்",
    uvIndex: "யுவி குறியீடு",
    airQuality: "காற்று தரம் (AQI)",
    rainfallProbability: "மழை வாய்ப்பு",
    precipitation: "மழைப்பொழிவு",
    precipExpected: "எதிர்பார்க்கப்படும் மழை",

    decisionSupport: "முடிவெடுக்கும் ஆதரவு",
    decisionRisks: "ஆபத்து மதிப்பீடு",
    rainRisk: "மழை ஆபத்து",
    heatRisk: "வெப்ப ஆபத்து",
    windRisk: "காற்று ஆபத்து",
    forecastConfidence: "முன்னறிவிப்பு நம்பிக்கை",
    specializedModules: "சிறப்பு துறைகள்",
    agricultureSector: "விவசாயம் மற்றும் பயிர்",
    aviationSector: "விமான போக்குவரத்து",
    marineSector: "கடல் மற்றும் மீனவர் பாதுகாப்பு",
    smartCitySector: "ஸ்மார்ட் சிட்டி கண்காணிப்பு",

    spatialMap: "வானிலை வரைபடம்",
    spatialTitle: "புவியியல் தகவல் நுண்ணறிவு",
    openMapBtn: "வரைபடத்தை திறக்கவும் →",
    historicalTrends: "காலநிலை மாற்றங்கள்",
    multiYearAnalytics: "பல ஆண்டு காலநிலை பகுப்பாய்வு",
    trendsBtn: "மாற்றங்கள் →",
    warmingTrend: "வெப்பநிலை உயர்வு போக்கு",
    forecast7d: "7 நாள் முன்னறிவிப்பு",
    forecast14d: "14 நாள் முன்னறிவிப்பு",

    mapEyebrow: "இந்திய வானிலை வரைபடம்",
    mapHeaderTitle: "வானிலை வரைபடம்",
    mapHeaderDesc: "நேரலை வானிலை தகவல்களைப் பெற இந்தியாவின் எந்தவொரு இடத்தையும் வரைபடத்தில் தேர்வு செய்யவும்.",
    mapConfigBtn: "கூகிள் வரைபட சாவி",
    suggestionsLabel: "பரிந்துரைகள்:",
    liveRadarActive: "● நேரலை ரேடார் இயங்குகிறது",
    clickMapHelper: "👆 வானிலை அறிய வரைபடத்தில் கிளிக் செய்யவும்",
    weatherTelemetry: "நேரலை வானிலை அளவீடுகள்",

    outdoorAdvisory: "வெளியே செல்வதற்கான ஆலோசனை",
    outgoingQuestion: "நீங்கள் இன்று வெளியே செல்ல திட்டமிடுகிறீர்களா?",
    outgoingNow: "🚶 ஆம், இப்போது வெளியே செல்கிறேன்",
    outgoingLater: "🕒 பிறகு வெளியே செல்ல திட்டமிட்டுள்ளேன்",
    rainyUmbrellaReply: "இன்று மழை பெய்யக்கூடும், எனவே குடை எடுத்துச் செல்லுங்கள்!",
    rainyUmbrellaSub: "இந்த பகுதியில் மழை பெய்வதற்கான அதிக வாய்ப்பு உள்ளது.",
    rainyUmbrellaAdvice: "பரிந்துரை: குடை அல்லது ரெயின்கோட் எடுத்துச் செல்லுங்கள். சாலைகளில் வழுக்கல் ஏற்படலாம் மற்றும் திடீர் மழை பெய்யலாம்.",
    rainyLaterTip: "மாலை ஆலோசனை: பிற்பகலில் மழை தீவிரமடைய வாய்ப்புள்ளதால் மாலை முன்னறிவிப்பை கவனியுங்கள்.",
    dryPleasantReply: "வானிலை இதமாக உள்ளது — இன்று குடை இல்லாமல் வெளியே செல்லலாம்!",
    dryPleasantSub: "மழைக்கான வாய்ப்பு குறைவு. வானம் தெளிவாக இருக்கும்.",
    dryPleasantAdvice: "பரிந்துரை: குடை தேவையில்லை. வானிலை பயணத்திற்கு உகந்ததாக உள்ளது.",
    hotWeatherTip: "வெப்ப எச்சரிக்கை: வெயில் அதிகமாக உள்ளது. நிறைய தண்ணீர் குடியுங்கள்.",
    askInChatBtn: "💬 வானிலை ஜிபிடி கேளுங்கள்",
    forecast7dTitle: "7 நாள் வானிலை கண்ணோட்டம்",
    forecast14dTitle: "14 நாள் வானிலை கண்ணோட்டம்",

    activeAlerts: "தீவிர வானிலை எச்சரிக்கை",
    alertsEyebrow: "பேரிடர் முன்னெச்சரிக்கை அமைப்பு",
    alertsSubtitle: "இந்திய வானிலை ஆய்வு மையத்தின் (IMD / MoES) பாதுகாப்பு வழிகாட்டுதல்கள்.",
    emergencySiren: "அவசர எச்சரிக்கை அலாரம்",
    sirenActive: "அலாரம் ஒலிக்கிறது",
    stopSiren: "அலாரத்தை நிறுத்து",
    imdProtocol: "IMD 4-நிலை எச்சரிக்கை நெறிமுறைகள்",
    redWarning: "சிவப்பு எச்சரிக்கை (நடவடிக்கை எடுங்கள்): மிகக் கடுமையான வானிலை.",
    orangeAlert: "ஆரஞ்சு எச்சரிக்கை (தயாராக இருங்கள்): எச்சரிக்கையுடன் இருங்கள்.",
    yellowWatch: "மஞ்சள் எச்சரிக்கை (கவனமாக இருங்கள்): வானிலை மாற்றங்களை கவனியுங்கள்.",
    greenNormal: "பச்சை (வழக்கமானது): வானிலை இயல்பாக உள்ளது.",
    noActiveAlerts: "இந்த பகுதிக்கு எந்த எச்சரிக்கையும் இல்லை. நிலைமை சீராக உள்ளது.",
    disasterAlertTitle: "தீவிர பேரழிவு அவசர எச்சரிக்கை",
    disasterAlertSubtitle: "IMD / MoES & INCOIS பேரிடர் முன் எச்சரிக்கை அமைப்பு.",
    heavyFloodAlert: "கடும் வெள்ளம் மற்றும் நீர் தேங்குதல் எச்சரிக்கை",
    cycloneAlert: "தீவிர புயல் மற்றும் பேரழிவு காற்று எச்சரிக்கை",
    tsunamiAlert: "சுனாமி முன் எச்சரிக்கை மற்றும் கடல் அலைகள்",
    immediateAction: "உடனடி உயிர் பாதுகாப்பு நடவடிக்கை தேவை",
    muteSiren: "அலாரத்தை நிறுத்து & உறுதிசெய்",
    resoundSiren: "உரத்த அலாரத்தை ஒலிக்க செய்",
    sirenSounding: "உரத்த அவசர அலாரம் ஒலிக்கிறது",
    dismissAlert: "ஏற்றுக்கொண்டு மூடு",
    simulateDisaster: "பேரிடர் சோதனை:",
    testFlood: "🌊 வெள்ள எச்சரிக்கை சோதனை (ரெட் அலர்ட்)",
    testCyclone: "🌀 புயல் எச்சரிக்கை சோதனை (ரெட் அலர்ட்)",
    testTsunami: "🌊 சுனாமி எச்சரிக்கை சோதனை (ரெட் அலர்ட்)",
    clearHazard: "🟢 இயல்பான வானிலை",

    sectorsEyebrow: "துறைசார் முடிவெடுக்கும் உதவி",
    sectorsTitle: "வானிலை செயல்முறை ஆலோசனைகள்",
    sectorsSubtitle: "விவசாயம், விமான போக்குவரத்து மற்றும் கடலோர பகுதிகளுக்கான வழிகாட்டல்.",
    spraySuitability: "மருந்து தெளிக்கும் தகுதி",
    soilMoisture: "மண் ஈரப்பதம்",
    harvestIrrigation: "அறுவடை மற்றும் பாசனம்",
    flightCategory: "விமான இயக்க வகை",
    surfaceVisibility: "பார்வைத்திறன்",
    cloudBase: "மேக உயரம்",
    seaState: "கடல் நிலை",
    waveHeight: "அலை உயரம்",
    urbanHeat: "நகர வெப்ப குறியீடு",
    drainageRisk: "நீர் தேங்குதல் ஆபத்து",

    insightsEyebrow: "நீண்ட கால காலநிலை நுண்ணறிவு",
    insightsTitle: "வரலாற்று மாற்றங்கள்",
    insightsSubtitle: "வெப்பநிலை மற்றும் மழைப்பொழிவு மாறுபாடுகள்.",
    warmingBaseline: "WMO உலகளாவிய தரநிலை (1991-2020)",
    temperatureAnomaly: "வெப்பநிலை விலகல்",
    precipitationDeviation: "மழைப்பொழிவு விலகல்",
    extremeEvents: "தீவிர நிகழ்வுகள்",

    // Status Values
    suitable: "பொருத்தமானது",
    unsuitable: "பொருத்தமற்றது",
    caution: "எச்சரிக்கை",
    high: "அதிகம்",
    moderate: "நடுத்தரம்",
    low: "குறைவு",
    good: "நல்லது",
    unhealthy: "ஆரோக்கியமற்றது",
    today: "இன்று",
    tomorrow: "நாளை",

    // Additional Detailed UI Labels
    dayLow: "குறைந்தபட்சம்",
    rainProbability: "மழை வாய்ப்பு",
    maxWind: "அதிகபட்ச காற்று",
    safetyActions: "பரிந்துரைக்கப்பட்ட பாதுகாப்பு நடவடிக்கைகள்",
    target: "இலக்கு",
    valid: "செல்லுபடியாகும்",
    system: "அமைப்பு",
    activeBadge: "செயலில் உள்ளது",
    cropDecisionEngine: "பயிர்-வானிலை முடிவு இயந்திரம்",
    farmingAdvisory: "விவசாய மற்றும் பூச்சிக்கொல்லி ஆலோசனை",
    sprayStatus: "தெளிப்பு நிலை",
    recommendation: "பரிந்துரை",
    meteorologicalFactors: "வானிலை காரணிகள்",
    irrigationGuidance: "பாசன வழிகாட்டல்",
    targetCrops: "இலக்கு பயிர்கள்",
    aviationBriefing: "விமான பயண வானிலை அறிக்கை",
    aviationStation: "விமான நிலைய வானிலை நிலையம்",
    airport: "விமான நிலையம்",
    wind: "காற்று",
    altimeter: "காற்றழுத்தமானி",
    lookup: "தேடு",
    rawMetar: "அசல் METAR தரவு (NOAA)",
    coastalSafety: "கடலோர மற்றும் கடல் பாதுகாப்பு",
    marineAdvisory: "கடல் வானிலை ஆலோசனை",
    status: "நிலை",
    coastalConditions: "கடலோர நிலைமை",
    surfaceWind: "மேற்பரப்பு காற்று",
    urbanIntelligence: "நகர்ப்புற சுற்றுச்சூழல் நுண்ணறிவு",
    smartCityTitle: "ஸ்மார்ட் சிட்டி வானிலை கண்காணிப்பு",
    urbanComfort: "நகர வசதி மற்றும் காற்றின் தரம்",
    apparentHeatIndex: "வெப்ப உணர்வு குறியீடு",
    airQualityStatus: "காற்றின் தர நிலை",
    urbanFloodRisk: "நகர வெள்ள அபாயம்",
    historicalAnomalies: "வரலாற்று ஆண்டு மாறுபாடுகள் (2020 - 2026)",
    year: "ஆண்டு",
    meanTemp: "சராசரி வெப்பநிலை (°C)",
    monsoonRainfallVsNormal: "வழக்கத்தை விட பருவமழை அளவு",
    keyResearchInsights: "முக்கிய வானிலை ஆராய்ச்சி முடிவுகள்",
    chatAssistantTitle: "வானிலை ஜிபிடி உரையாடல் உதவியாளர்",
    chatAssistantSubtitle: "பல்மொழி வானிலை நுண்ணறிவு",
    clearChat: "அரட்டையை அழிக்கவும்",
    listen: "கேட்க",
    spokenResponse: "குரல் பதில்",
    analyzingPrompt: "வானிலை மாதிரிகள் ஆய்வு செய்யப்படுகின்றன...",
    signInRequired: "வானிலை ஜிபிடி கேட்க உள்நுழையவும்",
    signInPrompt: "உரையாட மொபைல் OTP அல்லது கூகிள் கணக்கு மூலம் உள்நுழைக.",
    signInBtn: "🔑 மொபைல் OTP அல்லது கூகிள் உள்நுழைவு →",
    instantAccessBtn: "⚡ உடனடி மதிப்பீட்டாளர் அணுகல் →",
    phoneOtpBenefit: "✓ 10-வினாடி தொலைபேசி OTP உள்நுழைவு",
    googleSignInBenefit: "✓ உடனடி கூகிள் உள்நுழைவு",
    freeAccessBenefit: "✓ இலவச உடனடி அணுகல்",
    voiceSpeaking: "வானிலை ஜிபிடி குரல் ஒலிக்கிறது...",
    stopVoice: "குரலை நிறுத்து",
    voiceListening: "உங்கள் குரலைக் கேட்கிறது... பேசுங்கள்",
    pesticideAdviceChip: "🌾 பூச்சிக்கொல்லி தெளிப்பு ஆலோசனை",
    disasterAlertsChip: "🚨 பேரிடர் எச்சரிக்கைகள்",
    aviationBriefingChip: "✈️ விமான அறிக்கை",
    climateTrendsChip: "📊 காலநிலை மாற்றங்கள்",
    outfitAdviceChip: "👔 உடை மற்றும் பயண ஆலோசனை",
    liveWeatherChip: "🌡️ நேரலை வானிலை",
    askAnything: "இல் எதையும் கேளுங்கள்",
    computingNwpSpread: "வானிலை மாதிரிகள் ஒப்பிடப்படுகின்றன...",
    nwpComparisonTitle: "NOAA GFS vs ECMWF IFS மாதிரி ஒப்பீடு",
    nwpComparisonDesc: "அமெரிக்க GFS மற்றும் ஐரோப்பிய ECMWF இடையேயான ஒப்பீடு.",
    ensembleConfidence: "மாதிரி நம்பிக்கை",
    avgTempSpread: "சராசரி வெப்பநிலை இடைவெளி",
    forecastDay: "முன்னறிவிப்பு நாள்",
    tempSpread: "வெப்பநிலை இடைவெளி",
    gfsRainVsEcmwf: "GFS மழை vs ECMWF மழை",
    modelAgreement: "மாதிரி உடன்பாடு",
    scientificContextTitle: "அறிவியல் பின்னணி:",
    scientificContextDesc: "NOAA GFS மற்றும் ECMWF மாதிரிகளின் அதிக உடன்பாடு நம்பகமான முன்னறிவிப்பை காட்டுகிறது.",
    whatShouldWear: "இல் என்ன உடை அணியலாம்?",
    outfitSubtitle: "வானிலைக்கேற்ற ஆடை தேர்வுகள் மற்றும் வெளிப்புற ஆலோசனை.",
    analyzingOutfit: "உடை பரிந்துரைகள் தயார் செய்யப்படுகின்றன...",
    recommendedTops: "பரிந்துரைக்கப்பட்ட மேல் உடைகள்",
    recommendedBottoms: "பரிந்துரைக்கப்பட்ட கீழ் உடைகள்",
    outerwearLayers: "ஜாகெட் மற்றும் மேலங்கி",
    footwearSuggestion: "காலணி பரிந்துரை",
    beforeYouStepOut: "வெளியே செல்வதற்கு முன்",
    essentialAccessories: "அத்தியாவசிய பொருட்கள் சரிபார்ப்பு",
    outdoorFeasibility: "வெளிப்புற சாத்தியக்கூறு",
    dailyActivityOutlook: "தினசரி செயல்பாடுகள் பார்வை",
    runningExercise: "ஓட்டம் / உடற்பயிற்சி",
    laundryDrying: "துணி உலர்த்துதல்",
    transitCommute: "பயணம் மற்றும் போக்குவரத்து",
    askWeatherGptAi: "வானிலை ஜிபிடியிடம் கேளுங்கள்:",
    whatToWearPrompt: "என்ன அணியலாம்",
    umbrellaPrompt: "குடை தேவையா?",
    joggingPrompt: "ஓட்டத்திற்கு ஏற்றதா?",
    footerTagline: "வானிலை நுண்ணறிவுக்கான உரையாடல் ஏஐ தளம்",
    footerBuiltWith: "FastAPI, Vite React, NWP மாதிரிகள் மற்றும் WIS2.0 கொண்டு உருவாக்கப்பட்டது",
    signInToAsk: "🔑 கேட்க உள்நுழைக",
    suggestionWear: "👔 நான் என்ன அணிய வேண்டும்? (ஆடை வழிகாட்டி)",
    suggestionTomorrow: "✨ நாளைக்கான ஆடை",
    suggestionRain: "🌧 நாளை மழை பெய்யுமா?",
    suggestionFarming: "🌾 விவசாயம் மற்றும் தெளிப்பு ஆலோசனை",
    upcomingDays: "வரவிருக்கும் நாட்கள்",
    detailedNwpBtn: "விரிவான NWP →",
    localTime: "உள்ளூர் நேரம்:",
    liveBadge: "நேரலை",
    fetchingLiveData: "நேரடி வானிலை தரவு பெறப்படுகிறது...",
    noWeatherData: "வானிலை தரவு ஏற்றப்படவில்லை.",
    loadWeather: "வானிலையை ஏற்று",
    riskDescLow: "தற்போதைய வானிலை குறைந்த செயல்பாட்டு மற்றும் சுற்றுச்சூழல் அபாயத்தைக் காட்டுகிறது.",
    riskDescModerate: "மிதமான வானிலை தாக்கம். விவசாய தெளிப்பு மற்றும் சாலை பயண நிலைமைகளை சரிபார்க்கவும்.",
    riskDescHigh: "அதிக ஆபத்து எச்சரிக்கை. முன்கூட்டிய எச்சரிக்கை பாதுகாப்பு வழிகாட்டுதல்களைப் பின்பற்றவும்.",
    cropWeatherMatrixSub: "பூச்சிக்கொல்லி தெளிப்பு, பாசன அட்டவணை மற்றும் பயிர் பாதுகாப்புக்கான நிகழ்நேர வேளாண் வானிலை மேட்ரிக்ஸ்.",
    rainProbabilityLabel: "மழைக்கான வாய்ப்பு",
    washOffRisk: "கழுவிச் செல்லும் ஆபத்து",
    lowWashOff: "குறைந்த கழுவல் ஆபத்து",
    sprayDriftWind: "தெளிப்பு விலகல் காற்று",
    optimalSpeed: "உகந்த வேகம்",
    highDrift: "அதிக விலகல்",
    canopyTemp: "பயிர் விதான வெப்பநிலை",
    evaporationSafe: "ஆவியாதல் பாதுகாப்பானது",
    highEvaporation: "அதிக ஆவியாதல்",
    suitabilityIndex: "பொருத்த குறியீடு",
    agrochemicalSprayDecision: "வேளாண் இரசாயன தெளிப்பு முடிவு:",
    harvestProtectionAdvisory: "அறுவடை & அறுவடைக்குப் பிந்தைய பாதுகாப்பு ஆலோசனை:",
    regionalSoilProfileTitle: "பிராந்திய மண் & வேளாண்-காலநிலை சுயவிவரம்:",
    groundedFor: "அடிப்படையிலானது",
    primarySoilGroup: "முதன்மை மண் வகை",
    soilPhLevel: "மண் pH அளவு",
    textureAeration: "அமைப்பு & காற்றோட்டம்",
    organicCarbonDrainage: "கரிம கார்பன் & வடிகால்",
    activeFarmCalendarFocus: "🗓️ செயலில் உள்ள பண்ணை காலண்டர் கவனம்:",
    historicallyCultivatedHeader: "🌱 வரலாற்று ரீதியாக பயிரிடப்படும் & மண்ணுக்கு ஏற்ற பயிர்கள்:",
    calibratedIcarSub: "ICAR வரலாற்று உற்பத்தி பதிவுகள், உள்ளூர் மண் pH மற்றும் நிகழ்நேர பருவகால வானிலை இணக்கத்துடன் அளவீடு செய்யப்பட்டது.",
    match: "பொருத்தம்",
    historicalRecord: "வரலாற்று பதிவு:",
    soilCompatibility: "மண் இணக்கத்தன்மை:",
    climateWater: "காலநிலை & நீர்:",
    growthCycle: "வளர்ச்சி சுழற்சி:",
    cropProtection: "பயிர் பாதுகாப்பு:",
    days: "நாட்கள்",
  },

  "తెలుగు": {
    brandTitle: "వెదర్‌జిపిటి",
    brandSubtitle: "వాతావరణ మేధస్సు",
    mainMenu: "ప్రధాన మెనూ",
    systemOnline: "వాతావరణ వ్యవస్థ ఆన్‌లైన్",
    systemStatus: "NWP GFS & ECMWF ప్రత్యక్ష ప్రసారం",
    activeLocation: "ప్రస్తుత ప్రాంతం",
    dashboard: "డ్యాష్‌బోర్డ్",
    weatherMap: "వాతావరణ మ్యాప్",
    chat: "వెదర్‌జిపిటిని అడగండి",
    outfit: "దుస్తులు & శైలి",
    forecast: "వాతావరణ సూచన",
    alerts: "హెచ్చరికలు",
    sectors: "నిర్ణయ మద్దతు",
    insights: "వాతావరణ విశ్లేషణ",
    settings: "సెట్టింగ్‌లు",
    about: "గురించి",
    pastWeather: "గత వాతావరణ శోధన",
    hourlyForecastTitle: "గంటల వారీ సూచన (తదుపరి 24 గంటలు)",
    hourlyForecastSubtitle: "ప్రస్తుత గంట నుండి ప్రారంభమయ్యే 24 గంటల రాబోయే సూచన",
    hourlyTempMetric: "ఉష్ణోగ్రత",
    hourlyRainMetric: "వర్షపాతం %",
    hourlyWindMetric: "గాలి వేగం",
    now: "ఇప్పుడు",
    aviationHelplinesTitle: "అధికారిక విమానయాన కార్యకలాపాలు & అత్యవసర హెల్ప్‌లైన్లు",
    marineHelplinesTitle: "అధికారిక సముద్ర మరియు తీర భద్రతా హెల్ప్‌లైన్లు",
    coastalPortsAndBasins: "భారతీయ సముద్ర బేసిన్లు, తీరప్రాంత ఓడరేవులు & మత్స్య కేంద్రాలు",
    chatHistory: "సంభాషణ చరిత్ర",
    newChat: "కొత్త సంభాషణ",
    clearHistory: "చరిత్రను క్లియర్ చేయండి",
    clearHistoryConfirm: "డేటాబేస్ నుండి అన్ని సంభాషణ చరిత్రను శాశ్వతంగా తొలగించాలనుకుంటున్నారా?",
    noPastSessions: "ఇంకా మునుపటి సంభాషణలు లేవు. ప్రారంభించడానికి ప్రశ్న అడగండి!",
    voiceRecordTitle: "వాయిస్ వాతావరణ సహాయకుడు",
    voiceListeningPrompt: "వింటోంది... మీ వాతావరణ ప్రశ్నను ఇప్పుడు మాట్లాడండి",
    voiceRecognizing: "స్వర గుర్తింపు జరుగుతోంది...",
    voiceStopAndSend: "పూర్తి చేసి పంపండి",
    voiceCancel: "రద్దు చేయి",
    signIn: "సైన్ ఇన్",
    signOut: "లాగ్ అవుట్",
    guestUser: "పౌర మూల్యాంకకుడు",
    greeting: "నమస్కారం",

    breadcrumb: "వాతావరణ సమాచారం",
    searchCity: "నగరాన్ని శోధించండి",
    searchPlaceholder: "భారతదేశంలోని ఏదైనా నగరం లేదా ప్రాంతాన్ని వెతకండి...",
    searchBtn: "శోధించండి",
    aiAssistant: "✦ ఏఐ వాతావరణ సహాయకుడు",
    askTitle: "వాతావరణం గురించి అడగండి.",
    askSubtitle: "వ్యవసాయం మరియు విపత్తు సలహాలు పొందండి.",
    askPlaceholder: "ఉదాహరణ: రేపు వర్షం పడుతుందా?",
    askBtn: "అడగండి",
    refresh: "↻ తాజా చేయి",
    listening: "వింటున్నాము... మాట్లాడండి",
    micUnavailable: "వాయిస్ రికగ్నిషన్ అందుబాటులో లేదు.",

    currentConditions: "ప్రస్తుత వాతావరణం",
    temperature: "ఉష్ణోగ్రత",
    feelsLike: "అనిపించే ఉష్ణోగ్రత",
    humidity: "తేమ",
    windSpeed: "గాలి వేగం",
    surfacePressure: "వాయు పీడనం",
    uvIndex: "యూవీ సూచిక",
    airQuality: "గాలి నాణ్యత (AQI)",
    rainfallProbability: "వర్షం పడే అవకాశం",
    precipitation: "వర్షపాతం",
    precipExpected: "అంచనా వర్షపాతం",

    decisionSupport: "నిర్ణయ మద్దతు",
    decisionRisks: "ప్రమాద విశ్లేషణ",
    rainRisk: "వర్షం ప్రమాదం",
    heatRisk: "వేడి ప్రమాదం",
    windRisk: "గాలి ప్రమాదం",
    forecastConfidence: "ఖచ్చితత్వం",
    specializedModules: "ప్రత్యేక విభాగాలు",
    agricultureSector: "వ్యవసాయం & పంటలు",
    aviationSector: "విమానయాన భద్రత",
    marineSector: "తీరప్రాంతం & మత్స్యకారులు",
    smartCitySector: "స్మార్ట్ సిటీ పర్యవేక్షణ",

    spatialMap: "వాతావరణ మ్యాప్",
    spatialTitle: "భౌగోళిక సమాచార విశ్లేషణ",
    openMapBtn: "మ్యాప్ తెరవండి →",
    historicalTrends: "చారిత్రక ధోరణులు",
    multiYearAnalytics: "బహుళ సంవత్సరాల వాతావరణ విశ్లేషణ",
    trendsBtn: "విశ్లేషణలు →",
    warmingTrend: "ఉష్ణోగ్రత పెరుగుదల ధోరణి",
    forecast7d: "7 రోజుల సూచన",
    forecast14d: "14 రోజుల సూచన",

    mapEyebrow: "భారతీయ వాతావరణ జీఐఎస్ మ్యాప్",
    mapHeaderTitle: "వాతావరణ మ్యాప్",
    mapHeaderDesc: "నిజ సమయ వాతావరణ సమాచారం మరియు ప్రయాణ సలహాల కోసం భారతదేశంలోని ఏదైనా ప్రదేశాన్ని ఎంచుకోండి.",
    mapConfigBtn: "గూగుల్ మ్యాప్స్ కీ",
    suggestionsLabel: "సూచనలు:",
    liveRadarActive: "● ప్రత్యక్ష రాడార్ సక్రియం",
    clickMapHelper: "👆 వాతావరణం చూడటానికి మ్యాప్‌పై క్లిక్ చేయండి",
    weatherTelemetry: "ప్రత్యక్ష వాతావరణ గణాంకాలు",

    outdoorAdvisory: "బయటకు వెళ్లే వారికి సలహా",
    outgoingQuestion: "మీరు ఈరోజు బయటకు వెళ్లాలని అనుకుంటున్నారా?",
    outgoingNow: "🚶 అవును, ఇప్పుడే బయలుదేరుతున్నాను",
    outgoingLater: "🕒 తర్వాత బయటకు వెళ్తాను",
    rainyUmbrellaReply: "ఈరోజు వర్షం పడే అవకాశం ఉంది, కాబట్టి గొడుగు వెంట తీసుకెళ్లండి!",
    rainyUmbrellaSub: "ఈ ప్రాంతంలో భారీగా వర్షం పడే అవకాశం ఉంది.",
    rainyUmbrellaAdvice: "సిఫార్సు: గొడుగు లేదా రెయిన్‌కోట్ వెంట ఉంచుకోండి. రోడ్లు జారే అవకాశం ఉంది మరియు ఆకస్మిక వర్షాలు పడవచ్చు.",
    rainyLaterTip: "సాయంత్రం కోసం చిట్కా: మధ్యాహ్నం తర్వాత వర్షం పెరిగే అవకాశం ఉన్నందున సాయంత్రం వాతావరణాన్ని పరిశీలించండి.",
    dryPleasantReply: "వాతావరణం అనుకూలంగా ఉంది — గొడుగు లేకుండా హాయిగా బయటకు వెళ్ళవచ్చు!",
    dryPleasantSub: "వర్షం పడే అవకాశం చాలా తక్కువ. పొడి వాతావరణం ఉంటుంది.",
    dryPleasantAdvice: "సిఫార్సు: వర్షపు గేర్ అవసరం లేదు. ప్రయాణానికి అనుకూలమైన వాతావరణం ఉంది.",
    hotWeatherTip: "ఎండ హెచ్చరిక: ఉష్ణోగ్రత ఎక్కువగా ఉంది. నీరు ఎక్కువగా తాగండి.",
    askInChatBtn: "💬 వెదర్‌జిపిటిని అడగండి",
    forecast7dTitle: "7 రోజుల సూచన దృక్పథం",
    forecast14dTitle: "14 రోజుల సూచన దృక్పథం",

    activeAlerts: "తీవ్ర హెచ్చరికలు",
    alertsEyebrow: "విపత్తు ముందస్తు హెచ్చరిక",
    alertsSubtitle: "భారత వాతావరణ విభాగం (IMD / MoES) ప్రమాద హెచ్చరికల వ్యవస్థ.",
    emergencySiren: "అత్యవసర సైరన్",
    sirenActive: "సైరన్ మోగుతోంది",
    stopSiren: "సైరన్ ఆపండి",
    imdProtocol: "IMD 4-స్థాయి హెచ్చరిక నిబంధనలు",
    redWarning: "ఎరుపు హెచ్చరిక (చర్య తీసుకోండి): అత్యంత తీవ్రమైన వాతావరణం.",
    orangeAlert: "నారింజ హెచ్చరిక (సిద్ధంగా ఉండండి): జాగ్రత్తగా ఉండండి.",
    yellowWatch: "పసుపు హెచ్చరిక (గమనించండి): వాతావరణ మార్పులను పరిశీలించండి.",
    greenNormal: "ఆకుపచ్చ (సాధారణం): వాతావరణం సాధారణంగా ఉంది.",
    noActiveAlerts: "ఈ ప్రాంతానికి ఎలాంటి హెచ్చరికలు లేవు. పరిస్థితులు సాధారణంగా ఉన్నాయి.",
    disasterAlertTitle: "తీవ్ర విపత్తు ముందస్తు హెచ్చరిక",
    disasterAlertSubtitle: "IMD / MoES & INCOIS బహుళ-విపత్తు ముందస్తు హెచ్చరిక వ్యవస్థ.",
    heavyFloodAlert: "భారీ వరదలు మరియు నీటి ముంపు హెచ్చరిక",
    cycloneAlert: "తీవ్ర తుఫాను మరియు వినాశకరమైన ఈదురు గాలుల హెచ్చరిక",
    tsunamiAlert: "సునామి ముందస్తు హెచ్చరిక మరియు సముద్ర అలల ఉధృతి",
    immediateAction: "తక్షణ ప్రాణ రక్షణ చర్యలు అవసరం",
    muteSiren: "సైరన్ ఆపండి & నిర్ధారించండి",
    resoundSiren: "పెద్ద సైరన్ మోగించండి",
    sirenSounding: "భారీ అత్యవసర సైరన్ మోగుతోంది",
    dismissAlert: "అంగీకరించి మూసివేయండి",
    simulateDisaster: "విపత్తు అనుకరణ:",
    testFlood: "🌊 వరద హెచ్చరిక పరీక్ష (రెడ్ అలర్ట్)",
    testCyclone: "🌀 తుఫాను పరీక్ష (రెడ్ అలర్ట్)",
    testTsunami: "🌊 సునామి పరీక్ష (రెడ్ అలర్ట్)",
    clearHazard: "🟢 సాధారణ వాతావరణం",

    sectorsEyebrow: "బహుళ రంగాల నిర్ణయ మద్దతు",
    sectorsTitle: "కార్యాచరణ వాతావరణ సలహాలు",
    sectorsSubtitle: "వ్యవసాయం, విమానయానం మరియు తీరప్రాంతాల కోసం ప్రత్యేక సమాచారం.",
    spraySuitability: "పిచికారీ అనుకూలత స్కోర్",
    soilMoisture: "నేల తేమ శాతం",
    harvestIrrigation: "కోత మరియు నీటిపారుదల సలహా",
    flightCategory: "విమాన ప్రయాణ వర్గం",
    surfaceVisibility: "దృశ్యమానత",
    cloudBase: "మేఘాల ఎత్తు",
    seaState: "సముద్ర పరిస్థితి",
    waveHeight: "అలల ఎత్తు",
    urbanHeat: "నగర ఉష్ణ సూచిక",
    drainageRisk: "మురుగునీరు నిలిచే ప్రమాదం",

    insightsEyebrow: "దీర్ఘకాలిక వాతావరణ మేధస్సు",
    insightsTitle: "చారిత్రక ధోరణులు & తీవ్ర మార్పులు",
    insightsSubtitle: "ఉష్ణోగ్రత మరియు వర్షపాత మార్పుల సమగ్ర విశ్లేషణ.",
    warmingBaseline: "WMO ప్రామాణిక బేస్‌లైన్ (1991-2020)",
    temperatureAnomaly: "ఉష్ణోగ్రత తేడా",
    precipitationDeviation: "వర్షపాత తేడా",
    extremeEvents: "తీవ్ర వాతావరణ సంఘటనలు",

    // Status Values
    suitable: "అనుకూలం",
    unsuitable: "అనుకూలం కాదు",
    caution: "జాగ్రత్త",
    high: "ఎక్కువ",
    moderate: "మధ్యస్థం",
    low: "తక్కువ",
    good: "మంచిది",
    unhealthy: "అనారోగ్యకరం",
    today: "ఈరోజు",
    tomorrow: "రేపు",

    // Additional Detailed UI Labels
    dayLow: "కనిష్టం",
    rainProbability: "వర్షం పడే అవకాశం",
    maxWind: "గరిష్ట గాలి",
    safetyActions: "సిఫార్సు చేయబడిన భద్రతా చర్యలు",
    target: "లక్ష్యం",
    valid: "చెల్లుబాటు",
    system: "వ్యవస్థ",
    activeBadge: "సక్రియం",
    cropDecisionEngine: "పంట-వాతావరణ నిర్ణయ ఇంజిన్",
    farmingAdvisory: "వ్యవసాయ & పురుగుమందుల సలహా",
    sprayStatus: "పిచికారీ స్థితి",
    recommendation: "సిఫార్సు",
    meteorologicalFactors: "వాతావరణ అంశాలు",
    irrigationGuidance: "నీటిపారుదల మార్గదర్శకత్వం",
    targetCrops: "లక్ష్య పంటలు",
    aviationBriefing: "విమానయాన బ్రీఫింగ్",
    aviationStation: "విమానాశ్రయ వాతావరణ కేంద్రం",
    airport: "విమానాశ్రయం",
    wind: "గాలి",
    altimeter: "ఆల్టిమీటర్",
    lookup: "వెతకండి",
    rawMetar: "అసలు METAR పరిశీలన (NOAA)",
    coastalSafety: "తీరప్రాంత మరియు సముద్ర భద్రత",
    marineAdvisory: "సముద్ర వాతావరణ సలహా",
    status: "స్థితి",
    coastalConditions: "తీరప్రాంత పరిస్థితులు",
    surfaceWind: "ఉపరితల గాలి",
    urbanIntelligence: "పట్టణ పర్యావరణ మేధస్సు",
    smartCityTitle: "స్మార్ట్ సిటీ వాతావరణ పర్యవేక్షణ",
    urbanComfort: "పట్టణ సౌకర్యం మరియు గాలి నాణ్యత",
    apparentHeatIndex: "వేడి సూచిక",
    airQualityStatus: "గాలి నాణ్యత స్థితి",
    urbanFloodRisk: "నగర వరద ప్రమాదం",
    historicalAnomalies: "చారిత్రక వార్షిక మార్పులు (2020 - 2026)",
    year: "సంవత్సరం",
    meanTemp: "సగటు ఉష్ణోగ్రత (°C)",
    monsoonRainfallVsNormal: "సాధారణంతో పోలిస్తే వర్షపాతం",
    keyResearchInsights: "కీలక వాతావరణ పరిశోధనా ఫలితాలు",
    chatAssistantTitle: "వెదర్‌జిపిటి సంభాషణ సహాయకుడు",
    chatAssistantSubtitle: "బహుభాషా వాతావరణ మేధస్సు",
    clearChat: "చాట్ క్లియర్ చేయండి",
    listen: "వినండి",
    spokenResponse: "వాయిస్ ప్రతిస్పందన",
    analyzingPrompt: "వాతావరణ నమూనాల విశ్లేషణ జరుగుతోంది...",
    signInRequired: "వెదర్‌జిపిటిని అడగడానికి సైన్ ఇన్ అవసరం",
    signInPrompt: "చాట్ చేయడానికి మొబైల్ OTP లేదా గూగుల్ ఖాతాతో సైన్ ఇన్ చేయండి.",
    signInBtn: "🔑 ఫోన్ OTP లేదా గూగుల్ సైన్ ఇన్ →",
    instantAccessBtn: "⚡ తక్షణ పౌర ప్రాప్యత →",
    phoneOtpBenefit: "✓ 10-సెకన్ల ఫోన్ OTP లాగిన్",
    googleSignInBenefit: "✓ తక్షణ గూగుల్ సైన్-ఇన్",
    freeAccessBenefit: "✓ ఉచిత & తక్షణ ప్రాప్యత",
    voiceSpeaking: "వెదర్‌జిపిటి ఏఐ మాట్లాడుతోంది...",
    stopVoice: "వాయిస్ ఆపండి",
    voiceListening: "మీ వాయిస్ వింటున్నాము... మాట్లాడండి",
    pesticideAdviceChip: "🌾 పురుగుమందుల పిచికారీ సలహా",
    disasterAlertsChip: "🚨 విపత్తు హెచ్చరికలు",
    aviationBriefingChip: "✈️ విమానయాన బ్రీఫింగ్",
    climateTrendsChip: "📊 వాతావరణ పోకడలు",
    outfitAdviceChip: "👔 దుస్తులు మరియు ప్రయాణ సలహా",
    liveWeatherChip: "🌡️ లైవ్ వాతావరణం",
    askAnything: "లో ఏదైనా అడగండి",
    computingNwpSpread: "వాతావరణ నమూనాల పోలిక జరుగుతోంది...",
    nwpComparisonTitle: "NOAA GFS vs ECMWF IFS బహుళ-నమూనా పోలిక",
    nwpComparisonDesc: "అమెరికన్ GFS మరియు యూరోపియన్ ECMWF మధ్య విశ్లేషణ.",
    ensembleConfidence: "నమూనా విశ్వసనీయత",
    avgTempSpread: "సగటు ఉష్ణోగ్రత వ్యత్యాసం",
    forecastDay: "సూచన రోజు",
    tempSpread: "ఉష్ణోగ్రత వ్యత్యాసం",
    gfsRainVsEcmwf: "GFS వర్షం vs ECMWF వర్షం",
    modelAgreement: "నమూనాల ఒప్పందం",
    scientificContextTitle: "శాస్త్రీయ నేపథ్యం:",
    scientificContextDesc: "నమూనాల అధిక ఒప్పందం ఖచ్చితమైన సమాచారాన్ని అందిస్తుంది.",
    whatShouldWear: "లో ఏమి ధరించాలి?",
    outfitSubtitle: "వాతావరణానికి తగిన దుస్తులు మరియు బాహ్య కార్యకలాపాల సలహా.",
    analyzingOutfit: "దుస్తుల సిఫార్సులు సిద్ధం చేయబడుతున్నాయి...",
    recommendedTops: "సిఫార్సు చేయబడిన పై దుస్తులు",
    recommendedBottoms: "సిఫార్సు చేయబడిన క్రింది దుస్తులు",
    outerwearLayers: "జాకెట్ మరియు కోటు",
    footwearSuggestion: "పాదరక్షల సూచన",
    beforeYouStepOut: "బయటకు వెళ్లే ముందు",
    essentialAccessories: "అవసరమైన వస్తువుల జాబితా",
    outdoorFeasibility: "బయటి కార్యకలాపాల సాధ్యత",
    dailyActivityOutlook: "రోజువారీ కార్యకలాపాల దృక్పథం",
    runningExercise: "రన్నింగ్ / వ్యాయామం",
    laundryDrying: "బట్టలు ఆరబెట్టడం",
    transitCommute: "ప్రయాణం మరియు రాకపోకలు",
    askWeatherGptAi: "వెదర్‌జిపిటి ఏఐని అడగండి:",
    whatToWearPrompt: "ఏమి ధరించాలి",
    umbrellaPrompt: "గొడుగు అవసరమా?",
    joggingPrompt: "జాగింగ్‌కు అనుకూలమా?",
    footerTagline: "వాతావరణ మేధస్సు కోసం సంభాషణ AI ప్లాట్‌ఫారమ్",
    footerBuiltWith: "FastAPI, Vite React, NWP నమూనాలు మరియు WIS2.0తో నిర్మించబడింది",
    signInToAsk: "🔑 అడగడానికి సైన్ ఇన్ చేయండి",
    suggestionWear: "👔 నేను ఏమి ధరించాలి? (దుస్తుల గైడ్)",
    suggestionTomorrow: "✨ రేపటి దుస్తులు",
    suggestionRain: "🌧 రేపు వర్షం పడుతుందా?",
    suggestionFarming: "🌾 వ్యవసాయ మరియు పిచికారీ సలహా",
    upcomingDays: "రాబోయే రోజులు",
    detailedNwpBtn: "వివరణాత్మక NWP →",
    localTime: "స్థానిక సమయం:",
    liveBadge: "లైవ్",
    fetchingLiveData: "ప్రత్యక్ష వాతావరణ సమాచారం సేకరించబడుతోంది...",
    noWeatherData: "వాతావరణ సమాచారం లోడ్ కాలేదు.",
    loadWeather: "వాతావరణాన్ని లోడ్ చేయండి",
    riskDescLow: "ప్రస్తుత వాతావరణ పరిస్థితులు తక్కువ కార్యాచరణ మరియు పర్యావరణ ప్రమాదాన్ని సూచిస్తున్నాయి.",
    riskDescModerate: "మధ్యస్థ వాతావరణ ప్రభావం. వ్యవసాయ పిచికారీ మరియు రహదారి ప్రయాణ పరిస్థితులను తనిఖీ చేయండి.",
    riskDescHigh: "తీవ్రమైన ప్రమాద హెచ్చరిక. ముందస్తు భద్రతా మార్గదర్శకాలను పాటించండి.",
    cropWeatherMatrixSub: "పురుగుమందుల పిచికారీ, నీటిపారుదల షెడ్యూల్ మరియు పంట భద్రత కోసం రియల్-టైమ్ వ్యవసాయ-వాతావరణ నిర్ణయ మాత్రిక.",
    rainProbabilityLabel: "వర్షపాత సంభావ్యత",
    washOffRisk: "కొట్టుకుపోయే ప్రమాదం",
    lowWashOff: "తక్కువ కొట్టుకుపోవుట",
    sprayDriftWind: "పిచికారీ డ్రిఫ్ట్ గాలి",
    optimalSpeed: "అనుకూల వేగం",
    highDrift: "ఎక్కువ డ్రిఫ్ట్",
    canopyTemp: "పంట ఉపరితల ఉష్ణోగ్రత",
    evaporationSafe: "బాష్పీభవన సురక్షితం",
    highEvaporation: "ఎక్కువ బాష్పీభవనం",
    suitabilityIndex: "అనుకూలత సూచిక",
    agrochemicalSprayDecision: "వ్యవసాయ రసాయనాల పిచికారీ నిర్ణయం:",
    harvestProtectionAdvisory: "పంట కోత మరియు కోత అనంతర రక్షణ సలహా:",
    regionalSoilProfileTitle: "ప్రాంతీయ నేల & వ్యవసాయ-వాతావరణ ప్రొఫైల్:",
    groundedFor: "ఆధారితం",
    primarySoilGroup: "ప్రాథమిక నేల రకం",
    soilPhLevel: "నేల pH స్థాయి",
    textureAeration: "నిర్మాణం & గాలి ప్రసరణ",
    organicCarbonDrainage: "సేంద్రీయ కార్బన్ & డ్రైనేజీ",
    activeFarmCalendarFocus: "🗓️ క్రియాశీల వ్యవసాయ క్యాలెండర్ ప్రాధాన్యత:",
    historicallyCultivatedHeader: "🌱 చారిత్రాత్మకంగా సాగు చేయబడే & నేలకు సరిపోయే పంటలు:",
    calibratedIcarSub: "ICAR చారిత్రక ఉత్పత్తి రికార్డులు, స్థానిక నేల pH మరియు రియల్-టైమ్ వాతావరణ అనుకూలతతో అమర్చబడింది.",
    match: "సరిపోలిక",
    historicalRecord: "చారిత్రక రికార్డు:",
    soilCompatibility: "నేల అనుకూలత:",
    climateWater: "వాతావరణం & నీరు:",
    growthCycle: "పెరుగుదల చక్రం:",
    cropProtection: "పంట రక్షణ:",
    days: "రోజులు",
  },

  "मराठी": {
    brandTitle: "वेदरजीपीटी",
    brandSubtitle: "हवामान बुद्धिमत्ता",
    mainMenu: "मुख्य मेनू",
    systemOnline: "हवामान प्रणाली कार्यरत",
    systemStatus: "NWP GFS आणि ECMWF ऑनलाइन",
    activeLocation: "सध्याचे ठिकाण",
    dashboard: "डॅशबोर्ड",
    weatherMap: "हवामान नकाशा",
    chat: "वेदरजीपीटीला विचारा",
    outfit: "पोशाख आणि शैली",
    forecast: "हवामान अंदाज",
    alerts: "हवामान इशारे",
    sectors: "निर्णय समर्थन",
    insights: "हवामान विश्लेषण",
    settings: "सेटिंग्ज",
    about: "माहिती",
    pastWeather: "मागील हवामान शोध",
    hourlyForecastTitle: "तासाभराचा अंदाज (पुढील 24 तास)",
    hourlyForecastSubtitle: "सध्याच्या तासापासून सुरू होणारा 24 तासांचा आगामी अंदाज",
    hourlyTempMetric: "तापमान",
    hourlyRainMetric: "पाऊस शक्यता %",
    hourlyWindMetric: "वाऱ्याचा वेग",
    now: "आता",
    aviationHelplinesTitle: "अधिकृत विमान वाहतूक ऑपरेशन्स आणि आपत्कालीन हेल्पलाइन",
    marineHelplinesTitle: "अधिकृत सागरी आणि किनारी सुरक्षा हेल्पलाइन",
    coastalPortsAndBasins: "भारतीय सागरी खोरी, किनारी बंदरे आणि मत्स्यव्यवसाय केंद्रे",
    chatHistory: "चॅट इतिहास",
    newChat: "नवीन चॅट",
    clearHistory: "इतिहास साफ करा",
    clearHistoryConfirm: "डेटाबेसमधून सर्व चॅट इतिहास कायमचा साफ करायचा आहे का?",
    noPastSessions: "अद्याप कोणताही मागील इतिहास नाही. सुरू करण्यासाठी प्रश्न विचारा!",
    voiceRecordTitle: "आवाज हवामान सहाय्यक",
    voiceListeningPrompt: "ऐकत आहे... आता आपला हवामान प्रश्न बोला",
    voiceRecognizing: "आवाज ओळख चालू आहे...",
    voiceStopAndSend: "पूर्ण आणि पाठवा",
    voiceCancel: "रद्द करा",
    signIn: "साइन इन",
    signOut: "साइन आउट",
    guestUser: "नागरिक मूल्यमापक",
    greeting: "नमस्कार",

    breadcrumb: "हवामान माहिती",
    searchCity: "शहर शोधा",
    searchPlaceholder: "भारतातील कोणतेही शहर, जिल्हा किंवा ठिकाण शोधा...",
    searchBtn: "शोधा",
    aiAssistant: "✦ एआय हवामान सहाय्यक",
    askTitle: "हवामानाबद्दल विचारा.",
    askSubtitle: "संख्यात्मक मॉडेल्स आणि निर्णय समर्थन मिळवा.",
    askPlaceholder: "उदा: नाशिकमध्ये उद्या कीटकनाशक फवारणी करू शकतो का?",
    askBtn: "विचारा",
    refresh: "↻ ताजे करा",
    listening: "ऐकत आहे... बोला",
    micUnavailable: "व्हॉइस इनपुट समर्थित नाही.",

    currentConditions: "सध्याचे हवामान",
    temperature: "तापमान",
    feelsLike: "जावणारे तापमान",
    humidity: "आर्द्रता",
    windSpeed: "वाऱ्याचा वेग",
    surfacePressure: "हवेचा दाब",
    uvIndex: "यूव्ही इंडेक्स",
    airQuality: "हवेची गुणवत्ता (AQI)",
    rainfallProbability: "पावसाची शक्यता",
    precipitation: "पाऊस",
    precipExpected: "अपेक्षित पाऊस",

    decisionSupport: "निर्णय समर्थन",
    decisionRisks: "पर्यावरणीय जोखीम",
    rainRisk: "पाऊस जोखीम",
    heatRisk: "उष्णता जोखीम",
    windRisk: "वारा जोखीम",
    forecastConfidence: "अंदाज विश्वासार्हता",
    specializedModules: "विशेष विभाग",
    agricultureSector: "शेती आणि पिके",
    aviationSector: "विमान वाहतूक सुरक्षा",
    marineSector: "सागरी आणि मच्छीमार सुरक्षा",
    smartCitySector: "स्मार्ट सिटी देखरेख",

    spatialMap: "हवामान नकाशा",
    spatialTitle: "स्थानिक जीआयएस बुद्धिमत्ता",
    openMapBtn: "हवामान नकाशा उघडा →",
    historicalTrends: "हवामान बदल कल",
    multiYearAnalytics: "अनेक वर्षांचे हवामान विश्लेषण",
    trendsBtn: "कल पहा →",
    warmingTrend: "तापमान वाढीचा कल",
    forecast7d: "७ दिवसांचा अंदाज",
    forecast14d: "१४ दिवसांचा अंदाज",

    mapEyebrow: "भारतीय हवामान जीआयएस नकाशा",
    mapHeaderTitle: "हवामान नकाशा",
    mapHeaderDesc: "थेट हवामान माहिती आणि प्रवासाच्या सल्ल्यासाठी भारतातील कोणतेही ठिकाण निवडा.",
    mapConfigBtn: "गूगल मॅप्स की",
    suggestionsLabel: "सुझाव:",
    liveRadarActive: "● थेट रडार सक्रिय",
    clickMapHelper: "👆 हवामान पाहण्यासाठी नकाशावर क्लिक करा",
    weatherTelemetry: "थेट हवामान आकडेवारी",

    outdoorAdvisory: "बाहेर पडणाऱ्यांसाठी सल्ला",
    outgoingQuestion: "तुम्ही आज बाहेर पडण्याचा विचार करत आहात का?",
    outgoingNow: "🚶 होय, आत्ताच बाहेर पडत आहे",
    outgoingLater: "🕒 नंतर बाहेर पडणार आहे",
    rainyUmbrellaReply: "आज पाऊस पडू शकतो, त्यामुळे छत्री सोबत ठेवा!",
    rainyUmbrellaSub: "या भागात पाऊस पडण्याची दाट शक्यता आहे.",
    rainyUmbrellaAdvice: "सल्ला: छत्री किंवा रेनकोट सोबत ठेवा. रस्ते निसरडे असू शकतात आणि अचानक पाऊस पडू शकतो.",
    rainyLaterTip: "संध्याकाळसाठी टीप: दुपारनंतर पाऊस वाढू शकतो, त्यामुळे संध्याकाळच्या अंदाजाकडे लक्ष ठेवा.",
    dryPleasantReply: "हवामान आल्हाददायक आहे — छत्रीशिवाय बाहेर जाणे पूर्णपणे सुरक्षित आहे!",
    dryPleasantSub: "पावसाची शक्यता खूप कमी आहे. हवा कोरडी आणि स्वच्छ राहील.",
    dryPleasantAdvice: "सल्ला: छत्रीची गरज नाही. प्रवासासाठी हवामान अतिशय उत्तम आहे.",
    hotWeatherTip: "उष्णतेचा इशारा: तापमान जास्त आहे. भरपूर पाणी प्या.",
    askInChatBtn: "💬 वेदरजीपीटीला विचारा",
    forecast7dTitle: "७ दिवसांचा हवामान दृष्टिकोन",
    forecast14dTitle: "१४ दिवसांचा हवामान दृष्टिकोन",

    activeAlerts: "आपत्कालीन इशारे",
    alertsEyebrow: "आपत्ती पूर्वसूचना व्यवस्था",
    alertsSubtitle: "भारतीय हवामान विभाग (IMD / MoES) चे आपत्ती व्यवस्थापन दिशानिर्देश.",
    emergencySiren: "आपत्कालीन सायरन",
    sirenActive: "सायरन वाजत आहे",
    stopSiren: "सायरन थांबवा",
    imdProtocol: "IMD ४-स्तरीय चेतावणी प्रणाली",
    redWarning: "लाल इशारा (कारवाई करा): अत्यंत धोकादायक हवामान.",
    orangeAlert: "केशरी इशारा (तयार राहा): सतर्क राहा.",
    yellowWatch: "पिवळा इशारा (लक्ष ठेवा): हवामान बदलांवर लक्ष ठेवा.",
    greenNormal: "हिरवा (सामान्य): हवामान सामान्य आहे.",
    noActiveAlerts: "या भागासाठी कोणताही इशारा नाही. परिस्थिती सामान्य आहे.",
    disasterAlertTitle: "गंभीर आपत्ती पूर्वसूचना",
    disasterAlertSubtitle: "आयएमडी / MoES आणि इनकॉइस (INCOIS) बहु-आपत्ती पूर्वसूचना प्रणाली.",
    heavyFloodAlert: "प्रचंड पूर आणि पाणी साचण्याची चेतावणी",
    cycloneAlert: "तीव्र चक्रीवादळ आणि विध्वंसक वादळी वारे",
    tsunamiAlert: "त्सुनामी पूर्वसूचना आणि सागरी लाटांची उसळी",
    immediateAction: "तातडीने जीवितरक्षण उपाययोजना आवश्यक",
    muteSiren: "सायरन थांबवा आणि खात्री करा",
    resoundSiren: "मोठ्या आवाजात सायरन वाजवा",
    sirenSounding: "मोठा आपत्कालीन सायरन वाजत आहे",
    dismissAlert: "मान्य करा आणि बंद करा",
    simulateDisaster: "आपत्ती चाचणी:",
    testFlood: "🌊 पूर चेतावणी चाचणी (रेड अलर्ट)",
    testCyclone: "🌀 चक्रीवादळ चाचणी (रेड अलर्ट)",
    testTsunami: "🌊 त्सुनामी चेतावणी चाचणी (रेड अलर्ट)",
    clearHazard: "🟢 सामान्य हवामान",

    sectorsEyebrow: "विविध क्षेत्रांसाठी निर्णय समर्थन",
    sectorsTitle: "हवामान विषयक सल्ले",
    sectorsSubtitle: "शेती, विमान वाहतूक आणि सागरी क्षेत्रासाठी विशेष माहिती.",
    spraySuitability: "फवारणी योग्यता स्कोअर",
    soilMoisture: "मातीतील ओलावा",
    harvestIrrigation: "कापणी आणि सिंचन सल्ला",
    flightCategory: "उड्डाण नियम श्रेणी",
    surfaceVisibility: "दृश्यमानता",
    cloudBase: "ढगांची उंची",
    seaState: "समुद्राची स्थिती",
    waveHeight: "लाटांची उंची",
    urbanHeat: "शहरी उष्णता निर्देशांक",
    drainageRisk: "पाणी साचण्याचा धोका",

    insightsEyebrow: "दीर्घकालीन हवामान बुद्धिमत्ता",
    insightsTitle: "ऐतिहासिक कल आणि नोंदी",
    insightsSubtitle: "तापमान आणि पर्जन्यमानातील बदलांचे सर्वसमावेशक विश्लेषण.",
    warmingBaseline: "WMO प्रमाण आधार (1991-2020)",
    temperatureAnomaly: "तापमान फरक",
    precipitationDeviation: "पाऊस फरक",
    extremeEvents: "धोकादायक घटना",

    // Status Values
    suitable: "योग्य",
    unsuitable: "अयोग्य",
    caution: "सावधान",
    high: "जास्त",
    moderate: "मध्यम",
    low: "कमी",
    good: "चांगले",
    unhealthy: "अस्वस्थ",
    today: "आज",
    tomorrow: "उद्या",

    // Additional Detailed UI Labels
    dayLow: "किमान",
    rainProbability: "पावसाची शक्यता",
    maxWind: "कमाल वारा",
    safetyActions: "शिफारस केलेल्या सुरक्षा कृती",
    target: "लक्ष्य",
    valid: "वैधता",
    system: "प्रणाली",
    activeBadge: "सक्रिय",
    cropDecisionEngine: "पीक-हवामान निर्णय इंजिन",
    farmingAdvisory: "शेती आणि कीटकनाशक सल्ला",
    sprayStatus: "फवारणी स्थिती",
    recommendation: "शिफारस",
    meteorologicalFactors: "हवामान घटक",
    irrigationGuidance: "सिंचन मार्गदर्शन",
    targetCrops: "लक्ष्य पिके",
    aviationBriefing: "विमान उड्डाण माहिती",
    aviationStation: "विमानतळ हवामान केंद्र",
    airport: "विमानतळ",
    wind: "वारा",
    altimeter: "अल्टीमीटर",
    lookup: "शोधा",
    rawMetar: "मूळ METAR निरीक्षण (NOAA)",
    coastalSafety: "किनारपट्टी आणि सागरी सुरक्षा",
    marineAdvisory: "सागरी हवामान सल्ला",
    status: "स्थिती",
    coastalConditions: "किनारपट्टी परिस्थिती",
    surfaceWind: "पृष्ठभागावरील वारा",
    urbanIntelligence: "शहरी पर्यावरणीय बुद्धिमत्ता",
    smartCityTitle: "स्मार्ट सिटी हवामान निरीक्षण",
    urbanComfort: "शहरी सुविधा आणि हवेची गुणवत्ता",
    apparentHeatIndex: "उष्णता निर्देशांक",
    airQualityStatus: "हवेची गुणवत्ता स्थिती",
    urbanFloodRisk: "शहरी पूर धोका",
    historicalAnomalies: "ऐतिहासिक वार्षिक नोंदी (2020 - 2026)",
    year: "वर्ष",
    meanTemp: "सरासरी तापमान (°C)",
    monsoonRainfallVsNormal: "नेहमीपेक्षा मान्सून पाऊस",
    keyResearchInsights: "महत्त्वाचे हवामान संशोधन निष्कर्ष",
    chatAssistantTitle: "वेदरजीपीटी संवादात्मक सहाय्यक",
    chatAssistantSubtitle: "बहुभाषिक हवामान बुद्धिमत्ता",
    clearChat: "चॅट साफ करा",
    listen: "ऐका",
    spokenResponse: "व्हॉइस प्रतिसाद",
    analyzingPrompt: "हवामान मॉडेलचे विश्लेषण चालू आहे...",
    signInRequired: "वेदरजीपीटीला विचारण्यासाठी साइन इन आवश्यक",
    signInPrompt: "चॅट करण्यासाठी मोबाइल OTP किंवा Google खात्याने साइन इन करा.",
    signInBtn: "🔑 फोन OTP किंवा Google ने साइन इन करा →",
    instantAccessBtn: "⚡ त्वरित नागरिक प्रवेश →",
    phoneOtpBenefit: "✓ १०-सेकंद फोन OTP लॉगिन",
    googleSignInBenefit: "✓ त्वरित Google साइन-इन",
    freeAccessBenefit: "✓ मोफत आणि त्वरित प्रवेश",
    voiceSpeaking: "वेदरजीपीटी व्हॉइस बोलत आहे...",
    stopVoice: "व्हॉइस थांबवा",
    voiceListening: "तुमचा आवाज ऐकत आहे... बोला",
    pesticideAdviceChip: "🌾 कीटकनाशक फवारणी सल्ला",
    disasterAlertsChip: "🚨 आपत्ती इशारे",
    aviationBriefingChip: "✈️ विमान उड्डाण माहिती",
    climateTrendsChip: "📊 हवामान कल",
    outfitAdviceChip: "👔 पोशाख आणि प्रवास सल्ला",
    liveWeatherChip: "🌡️ थेट हवामान",
    askAnything: "मध्ये काहीही विचारा",
    computingNwpSpread: "संख्यात्मक हवामान मॉडेलची तुलना चालू आहे...",
    nwpComparisonTitle: "NOAA GFS vs ECMWF IFS बहु-मॉडेल तुलना",
    nwpComparisonDesc: "अमेरिकन GFS आणि युरोपियन ECMWF मधील तुलनात्मक विश्लेषण.",
    ensembleConfidence: "मॉडेल विश्वासार्हता",
    avgTempSpread: "सरासरी तापमान फरक",
    forecastDay: "अंदाज दिवस",
    tempSpread: "तापमान फरक",
    gfsRainVsEcmwf: "GFS पाऊस vs ECMWF पाऊस",
    modelAgreement: "मॉडेल सहमती",
    scientificContextTitle: "वैज्ञानिक संदर्भ:",
    scientificContextDesc: "मॉडेल्समधील उच्च सहमती विश्वासार्ह अंदाज दर्शवते.",
    whatShouldWear: "मध्ये काय परिधान करावे?",
    outfitSubtitle: "हवामानानुसार पोशाख आणि बाहेरील कामांसाठी सल्ला.",
    analyzingOutfit: "पोशाखाच्या शिफारसी तयार केल्या जात आहेत...",
    recommendedTops: "शिफारस केलेले टॉप्स",
    recommendedBottoms: "शिफारस केलेले बॉटम्स",
    outerwearLayers: "जॅकेट आणि लेयर्स",
    footwearSuggestion: "पादत्राणे सूचना",
    beforeYouStepOut: "बाहेर पडण्यापूर्वी",
    essentialAccessories: "आवश्यक वस्तूंची यादी",
    outdoorFeasibility: "बाहेरील कामांची शक्यता",
    dailyActivityOutlook: "दैनंदिन कामांचा अंदाज",
    runningExercise: "धावणे / व्यायाम",
    laundryDrying: "कपडे वाळवणे",
    transitCommute: "प्रवास आणि वाहतूक",
    askWeatherGptAi: "वेदरजीपीटीला विचारा:",
    whatToWearPrompt: "काय घालावे",
    umbrellaPrompt: "छत्री हवी का?",
    joggingPrompt: "धावण्यासाठी योग्य आहे का?",
    footerTagline: "हवामान बुद्धिमत्तेसाठी संवादात्मक AI प्लॅटफॉर्म",
    footerBuiltWith: "FastAPI, Vite React, NWP मॉडेल्स आणि WIS2.0 सह विकसित",
    signInToAsk: "🔑 विचारण्यासाठी साइन इन करा",
    suggestionWear: "👔 मी काय घालावे? (पोशाख मार्गदर्शक)",
    suggestionTomorrow: "✨ उद्यासाठी पोशाख",
    suggestionRain: "🌧 उद्या पाऊस पडेल का?",
    suggestionFarming: "🌾 शेती व फवारणी सल्ला",
    upcomingDays: "येणारे दिवस",
    detailedNwpBtn: "सविस्तर NWP →",
    localTime: "स्थानिक वेळ:",
    liveBadge: "थेट",
    fetchingLiveData: "थेट हवामान माहिती मिळवली जात आहे...",
    noWeatherData: "हवामान माहिती लोड झाली नाही.",
    loadWeather: "हवामान लोड करा",
    riskDescLow: "सध्याची हवामान परिस्थिती किमान ऑपरेशनल आणि पर्यावरणीय धोका दर्शवते.",
    riskDescModerate: "मध्यम हवामान प्रभाव. शेती फवारणी आणि रस्ते प्रवासाची स्थिती तपासा.",
    riskDescHigh: "गंभीर धोका चेतावणी. पूर्वसूचना सुरक्षा मार्गदर्शक तत्त्वांचे पालन करा.",
    cropWeatherMatrixSub: "कीटकनाशक फवारणी, सिंचन नियोजन आणि पीक सुरक्षेसाठी रिअल-टाइम कृषी-हवामान निर्णय मॅट्रिक्स.",
    rainProbabilityLabel: "पावसाची शक्यता",
    washOffRisk: "धुवून जाण्याचा धोका",
    lowWashOff: "कमी वाहून जाणे",
    sprayDriftWind: "फवारणी वाहून नेणारा वारा",
    optimalSpeed: "इष्टतम गती",
    highDrift: "जास्त विस्थापन",
    canopyTemp: "कॅनॉपी तापमान",
    evaporationSafe: "बाष्पीभवन सुरक्षित",
    highEvaporation: "जास्त बाष्पीभवन",
    suitabilityIndex: "योग्यता निर्देशांक",
    agrochemicalSprayDecision: "कृषी-रासायनिक फवारणी निर्णय:",
    harvestProtectionAdvisory: "पीक कापणी आणि कापणीनंतरचा सुरक्षा सल्ला:",
    regionalSoilProfileTitle: "प्रादेशिक माती आणि कृषी-हवामान प्रोफाइल:",
    groundedFor: "आधारित",
    primarySoilGroup: "प्राथमिक माती गट",
    soilPhLevel: "मातीचा pH स्तर",
    textureAeration: "रचना आणि हवा खेळती राहणे",
    organicCarbonDrainage: "सेंद्रिय कर्ब आणि निचरा",
    activeFarmCalendarFocus: "🗓️ सक्रिय शेती दिनदर्शिका प्राधान्य:",
    historicallyCultivatedHeader: "🌱 ऐतिहासिकदृष्ट्या पिकवली जाणारी आणि मातीशी जुळणारी पिके:",
    calibratedIcarSub: "ICAR ऐतिहासिक उत्पादन नोंदी, स्थानिक मातीचा pH आणि रिअल-टाइम हंगामी हवामान अनुकूलतेसह कॅलिब्रेट केलेले.",
    match: "जुळणी",
    historicalRecord: "ऐतिहासिक नोंद:",
    soilCompatibility: "माती सुसंगतता:",
    climateWater: "हवामान आणि पाणी:",
    growthCycle: "वाढीचे चक्र:",
    cropProtection: "पीक संरक्षण:",
    days: "दिवस",
  },

  "বাংলা": {
    brandTitle: "ওয়েদারজিপিটি",
    brandSubtitle: "আবহাওয়া বুদ্ধিমত্তা",
    mainMenu: "প্রধান মেনু",
    systemOnline: "আবহাওয়া ব্যবস্থা অনলাইন",
    systemStatus: "NWP GFS এবং ECMWF সক্রিয়",
    activeLocation: "বর্তমান অবস্থান",
    dashboard: "ড্যাশবোর্ড",
    weatherMap: "আবহাওয়া মানচিত্র",
    chat: "ওয়েদারজিপিটিকে জিজ্ঞাসা",
    outfit: "পোশাক ও শৈলী",
    forecast: "আবহাওয়া পূর্বাভাস",
    alerts: "সতর্কবার্তা",
    sectors: "সিদ্ধান্ত সহায়তা",
    insights: "জলবায়ু বিশ্লেষণ",
    settings: "সেটিংস",
    about: "সম্পর্কে",
    pastWeather: "অতীত আবহাওয়া অনুসন্ধান",
    hourlyForecastTitle: "প্রতি ঘণ্টার পূর্বাভাস (পরবর্তী ২৪ ঘণ্টা)",
    hourlyForecastSubtitle: "বর্তমান ঘণ্টা থেকে শুরু হওয়া ২৪ ঘণ্টার পূর্বাভাস",
    hourlyTempMetric: "तापমাত্রা",
    hourlyRainMetric: "বৃষ্টির সম্ভাবনা %",
    hourlyWindMetric: "বাতাসের গতি",
    now: "এখন",
    aviationHelplinesTitle: "সরকারী বিমান চালনা কার্যক্রম ও জরুরি হেল্পলাইন",
    marineHelplinesTitle: "সরকারী সামুদ্রিক ও উপকূলীয় নিরাপত্তা হেল্পলাইন",
    coastalPortsAndBasins: "ভারতীয় সামুদ্রিক অববাহিকা, উপকূলীয় বন্দর এবং মৎস্য কেন্দ্র",
    chatHistory: "চ্যাট ইতিহাস",
    newChat: "নতুন চ্যাট",
    clearHistory: "ইতিহাস মুছুন",
    clearHistoryConfirm: "আপনি কি নিশ্চিত যে ডেটাবেস থেকে সমস্ত চ্যাট ইতিহাস মুছে ফেলতে চান?",
    noPastSessions: "এখনও কোনও অতীতের কথোপকথন নেই। শুরু করতে একটি প্রশ্ন জিজ্ঞাসা করুন!",
    voiceRecordTitle: "ভয়েস আবহাওয়া সহকারী",
    voiceListeningPrompt: "শুনছি... এখন আপনার আবহাওয়া প্রশ্ন বলুন",
    voiceRecognizing: "কণ্ঠস্বর সনাক্ত করা হচ্ছে...",
    voiceStopAndSend: "সম্পূর্ণ ও পাঠান",
    voiceCancel: "বাতিল",
    signIn: "সাইন ইন",
    signOut: "সাইন আউট",
    guestUser: "মূল্যায়নকারী",
    greeting: "নমস্কার",

    breadcrumb: "আবহাওয়া তথ্য",
    searchCity: "শহর খুঁজুন",
    searchPlaceholder: "ভারতের যেকোনো শহর, জেলা বা স্থান খুঁজুন...",
    searchBtn: "অনুসন্ধান",
    aiAssistant: "✦ এআই আবহাওয়া সহকারী",
    askTitle: "আবহাওয়া সম্পর্কে জানুন।",
    askSubtitle: "সঠিক পূর্বাভাস ও ঝুঁকি ব্যবস্থাপনা।",
    askPlaceholder: "যেমন: কাল কি বৃষ্টি হবে?",
    askBtn: "জিজ্ঞাসা",
    refresh: "↻ রিফ্রেশ করুন",
    listening: "শুনছি... বলুন",
    micUnavailable: "ভয়েস ইনপুট সমর্থিত নয়।",

    currentConditions: "বর্তমান আবহাওয়া",
    temperature: "তাপমাত্রা",
    feelsLike: "অনুভূত তাপমাত্রা",
    humidity: "আর্দ্রতা",
    windSpeed: "বাতাসের গতি",
    surfacePressure: "বায়ুচাপ",
    uvIndex: "ইউভি সূচক",
    airQuality: "বায়ুর মান (AQI)",
    rainfallProbability: "বৃষ্টির সম্ভাবনা",
    precipitation: "বৃষ্টিপাত",
    precipExpected: "প্রত্যাশিত বৃষ্টি",

    decisionSupport: "সিদ্ধান্ত সহায়তা",
    decisionRisks: "ঝুঁকি স্তর",
    rainRisk: "বৃষ্টির ঝুঁকি",
    heatRisk: "তাপের ঝুঁকি",
    windRisk: "বাতাসের ঝুঁকি",
    forecastConfidence: "মডেল নির্ভরযোগ্যতা",
    specializedModules: "বিশেষায়িত মডিউল",
    agricultureSector: "কৃষি ও ফসল",
    aviationSector: "বিমান চলাচল নিরাপত্তা",
    marineSector: "উপকূল ও মৎস্যজীবী সুরক্ষা",
    smartCitySector: "স্মার্ট সিটি পর্যবেক্ষণ",

    spatialMap: "আবহাওয়া মানচিত্র",
    spatialTitle: "ভৌগোলিক তথ্য বুদ্ধিমত্তা",
    openMapBtn: "মানচিত্র খুলুন →",
    historicalTrends: "ঐতিহাসিক পরিবর্তন",
    multiYearAnalytics: "বহুবর্ষীয় জলবায়ু বিশ্লেষণ",
    trendsBtn: "পরিবর্তন দেখুন →",
    warmingTrend: "তাপমাত্রা বৃদ্ধির প্রবণতা",
    forecast7d: "৭ দিনের পূর্বাভাস",
    forecast14d: "১৪ দিনের পূর্বাভাস",

    mapEyebrow: "ভারতীয় আবহাওয়া জিআইএস মানচিত্র",
    mapHeaderTitle: "আবহাওয়া মানচিত্র",
    mapHeaderDesc: "রিয়েল-টাইম আবহাওয়া তথ্য এবং ভ্রমণের পরামর্শ পেতে ভারতের যেকোনো স্থান নির্বাচন করুন।",
    mapConfigBtn: "গুগল ম্যাপস কী",
    suggestionsLabel: "পরামর্শ:",
    liveRadarActive: "● লাইভ রাডার সক্রিয়",
    clickMapHelper: "👆 আবহাওয়া দেখতে মানচিত্রে ক্লিক করুন",
    weatherTelemetry: "লাইভ আবহাওয়া ডেটা",

    outdoorAdvisory: "বাইরে যাওয়ার জন্য আবহাওয়া পরামর্শ",
    outgoingQuestion: "আপনি কি আজ বাইরে যেতে চান?",
    outgoingNow: "🚶 হ্যাঁ, এখনই বের হচ্ছি",
    outgoingLater: "🕒 পরে বের হওয়ার পরিকল্পনা আছে",
    rainyUmbrellaReply: "আজ বৃষ্টি হতে পারে, তাই ছাতা সাথে রাখুন!",
    rainyUmbrellaSub: "এই এলাকায় বৃষ্টির প্রবল সম্ভাবনা রয়েছে।",
    rainyUmbrellaAdvice: "পরামর্শ: একটি ছাতা বা রেইনকোট সাথে রাখুন। রাস্তা পিচ্ছিল হতে পারে এবং হঠাৎ বৃষ্টি নামতে পারে।",
    rainyLaterTip: "সন্ধ্যার টিপ: বিকেলে বৃষ্টি বাড়তে পারে, তাই সন্ধ্যার পূর্বাভাসের দিকে নজর রাখুন।",
    dryPleasantReply: "আবহাওয়া মনোরম — ছাতা ছাড়াই বাইরে বের হওয়া নিরাপদ!",
    dryPleasantSub: "বৃষ্টির সম্ভাবনা খুবই কম। আকাশ পরিষ্কার ও শুকনো থাকবে।",
    dryPleasantAdvice: "পরামর্শ: ছাতার প্রয়োজন নেই। ভ্রমণের জন্য মনোরম আবহাওয়া।",
    hotWeatherTip: "গরমের সতর্কতা: তাপমাত্রা বেশি। পর্যাপ্ত জল পান করুন।",
    askInChatBtn: "💬 ওয়েদারজিপিটিকে জিজ্ঞাসা করুন",
    forecast7dTitle: "৭ দিনের আবহাওয়া দৃষ্টিভঙ্গি",
    forecast14dTitle: "১৪ দিনের আবহাওয়া দৃষ্টিভঙ্গি",

    activeAlerts: "জরুরি সতর্কবার্তা",
    alertsEyebrow: "দুর্যোগের পূর্ব সতর্কতা ব্যবস্থা",
    alertsSubtitle: "ভারতীয় আবহাওয়া বিভাগ (IMD / MoES) এর দুর্যোগ নির্দেশিকা।",
    emergencySiren: "জরুরি বিপদ সংকেত সাইরেন",
    sirenActive: "সাইরেন বাজছে",
    stopSiren: "সাইরেন বন্ধ করুন",
    imdProtocol: "IMD ৪-স্তরীয় সতর্কতা প্রোটোকল",
    redWarning: "লাল সতর্কতা (পদক্ষেপ নিন): অত্যন্ত বিপজ্জনক আবহাওয়া।",
    orangeAlert: "কমলা সতর্কতা (প্রস্তুত থাকুন): সতর্ক থাকুন।",
    yellowWatch: "হলুদ সতর্কতা (নজর রাখুন): আবহাওয়ার পরিবর্তনের দিকে খেয়াল রাখুন।",
    greenNormal: "সবুজ (স্বাভাবিক): আবহাওয়া স্বাভাবিক রয়েছে।",
    noActiveAlerts: "এই অঞ্চলের জন্য কোনো সক্রিয় সতর্কতা নেই। পরিস্থিতি স্বাভাবিক।",
    disasterAlertTitle: "ভয়াবহ দুর্যোগ আগাম সতর্কবার্তা",
    disasterAlertSubtitle: "আইএমডি / MoES এবং ইনকোইস (INCOIS) বহু-বিপদ আগাম সতর্কতা ব্যবস্থা।",
    heavyFloodAlert: "প্রবল বন্যা ও জলমগ্নতা সতর্কতা",
    cycloneAlert: "মারাত্মক ঘূর্ণিঝড় ও বিধ্বংসী ঝড়ো বাতাস সতর্কতা",
    tsunamiAlert: "সুনামি আগাম সতর্কতা ও সামুদ্রিক জলোচ্ছ্বাস",
    immediateAction: "অবিলম্বে জীবন রক্ষাকারী ব্যবস্থা গ্রহণ প্রয়োজন",
    muteSiren: "সাইরেন বন্ধ করুন ও নিশ্চিত করুন",
    resoundSiren: "উচ্চ শব্দে সাইরেন বাজান",
    sirenSounding: "উচ্চ শব্দে জরুরি সাইরেন বাজছে",
    dismissAlert: "স্বীকার করুন ও বন্ধ করুন",
    simulateDisaster: "দুর্যোগ পরীক্ষা:",
    testFlood: "🌊 বন্যা সতর্কবার্তা পরীক্ষা (লাল সতর্কতা)",
    testCyclone: "🌀 ঘূর্ণিঝড় পরীক্ষা (লাল সতর্কতা)",
    testTsunami: "🌊 সুনামি সতর্কবার্তা পরীক্ষা (লাল সতর্কতা)",
    clearHazard: "🟢 স্বাভাবিক আবহাওয়া",

    sectorsEyebrow: "বহু-ক্ষেত্রের সিদ্ধান্ত সহায়তা",
    sectorsTitle: "কার্যক্ষম আবহাওয়া পরামর্শ",
    sectorsSubtitle: "কৃষি, বিমান চলাচল এবং মৎস্যজীবীদের জন্য বিশেষ নির্দেশিকা।",
    spraySuitability: "কীটনাশক স্প্রে উপযুক্ততা",
    soilMoisture: "মাটির আর্দ্রতা সূচক",
    harvestIrrigation: "ফসল কাটা ও সেচ পরামর্শ",
    flightCategory: "উড়ান নিয়ম বিভাগ",
    surfaceVisibility: "দৃশ্যমানতা",
    cloudBase: "মেঘের উচ্চতা",
    seaState: "সমুদ্রের অবস্থা",
    waveHeight: "ঢেউয়ের উচ্চতা",
    urbanHeat: "শহুরে তাপ সূচক",
    drainageRisk: "জল জমার ঝুঁকি",

    insightsEyebrow: "দীর্ঘমেয়াদী জলবায়ু বিশ্লেষণ",
    insightsTitle: "ঐতিহাসিক পরিবর্তন ও চরম ঘটনা",
    insightsSubtitle: "তাপমাত্রা ও বৃষ্টিপাতের পরিবর্তনের সামগ্রিক বিশ্লেষণ।",
    warmingBaseline: "WMO স্ট্যান্ডার্ড বেসলাইন (1991-2020)",
    temperatureAnomaly: "তাপমাত্রার পরিবর্তন",
    precipitationDeviation: "বৃষ্টিপাতের পরিবর্তন",
    extremeEvents: "চরম আবহাওয়ার ঘটনা",

    // Status Values
    suitable: "উপযুক্ত",
    unsuitable: "অনুপযুক্ত",
    caution: "সতর্কতা",
    high: "উচ্চ",
    moderate: "মাঝারি",
    low: "কম",
    good: "ভালো",
    unhealthy: "অস্বাস্থ্যকর",
    today: "আজ",
    tomorrow: "কাল",

    // Additional Detailed UI Labels
    dayLow: "সর্বনিম্ন",
    rainProbability: "বৃষ্টির সম্ভাবনা",
    maxWind: "সর্বোচ্চ বাতাস",
    safetyActions: "সুপারিশকৃত নিরাপত্তা ব্যবস্থা",
    target: "লক্ষ্য",
    valid: "বৈধতা",
    system: "সিস্টেম",
    activeBadge: "সক্রিয়",
    cropDecisionEngine: "ফসল-আবহাওয়া সিদ্ধান্ত ইঞ্জিন",
    farmingAdvisory: "কৃষি ও কীটনাশক পরামর্শ",
    sprayStatus: "স্প্রে স্থিতি",
    recommendation: "সুপারিশ",
    meteorologicalFactors: "আবহাওয়াগত উপাদানসমূহ",
    irrigationGuidance: "সেচ নির্দেশিকা",
    targetCrops: "আঞ্চলিক ফসল",
    aviationBriefing: "বিমান চলাচল আবহাওয়া ব্রিফিং",
    aviationStation: "বিমানবন্দর আবহাওয়া কেন্দ্র",
    airport: "বিমানবন্দর",
    wind: "বাতাস",
    altimeter: "অল্টিমিটার",
    lookup: "অনুসন্ধান",
    rawMetar: "মূল METAR পর্যবেক্ষণ (NOAA)",
    coastalSafety: "উপকূলীয় ও সামুদ্রিক নিরাপত্তা",
    marineAdvisory: "সামুদ্রিক আবহাওয়া পরামর্শ",
    status: "স্থিতি",
    coastalConditions: "উপকূলীয় পরিস্থিতি",
    surfaceWind: "পৃষ্ঠের বাতাস",
    urbanIntelligence: "শহুরে পরিবেশগত বুদ্ধিমত্তা",
    smartCityTitle: "স্মার্ট সিটি আবহাওয়া পর্যবেক্ষণ",
    urbanComfort: "শহরের আরাম ও বায়ুর মান",
    apparentHeatIndex: "অনুভূত তাপ সূচক",
    airQualityStatus: "বায়ুর মান স্থিতি",
    urbanFloodRisk: "শহুরে বন্যার ঝুঁকি",
    historicalAnomalies: "ঐতিহাসিক বার্ষিক পরিবর্তন (2020 - 2026)",
    year: "বছর",
    meanTemp: "গড় তাপমাত্রা (°C)",
    monsoonRainfallVsNormal: "স্বাভাবিকের তুলনায় বর্ষার বৃষ্টিপাত",
    keyResearchInsights: "প্রধান আবহাওয়া গবেষণা অন্তর্দৃষ্টি",
    chatAssistantTitle: "ওয়েদারজিপিটি কথোপকথন সহকারী",
    chatAssistantSubtitle: "বহুভাষিক আবহাওয়া বুদ্ধিমত্তা",
    clearChat: "চ্যাট মুছুন",
    listen: "শুনুন",
    spokenResponse: "ভয়েস প্রতিক্রিয়া",
    analyzingPrompt: "আবহাওয়া মডেল বিশ্লেষণ করা হচ্ছে...",
    signInRequired: "ওয়েদারজিপিটিকে জিজ্ঞাসা করতে সাইন ইন প্রয়োজন",
    signInPrompt: "চ্যাট করতে মোবাইল OTP বা গুগল অ্যাকাউন্ট দিয়ে সাইন ইন করুন।",
    signInBtn: "🔑 ফোন OTP বা গুগল সাইন ইন →",
    instantAccessBtn: "⚡ তাৎক্ষণিক মূল্যায়নকারী প্রবেশাধিকার →",
    phoneOtpBenefit: "✓ ১০-সেকেন্ড ফোন OTP লগইন",
    googleSignInBenefit: "✓ তাৎক্ষণিক গুগল সাইন-ইন",
    freeAccessBenefit: "✓ বিনামূল্যে ও তাৎক্ষণিক প্রবেশাধিকার",
    voiceSpeaking: "ওয়েদারজিপিটি ভয়েস কথা বলছে...",
    stopVoice: "ভয়েস থামান",
    voiceListening: "আপনার ভয়েস শুনছি... কথা বলুন",
    pesticideAdviceChip: "🌾 কীটনাশক স্প্রে পরামর্শ",
    disasterAlertsChip: "🚨 দুর্যোগের সতর্কতা",
    aviationBriefingChip: "✈️ বিমান ব্রিফিং",
    climateTrendsChip: "📊 জলবায়ুর প্রবণতা",
    outfitAdviceChip: "👔 পোশাক ও ভ্রমণের পরামর্শ",
    liveWeatherChip: "🌡️ লাইভ আবহাওয়া",
    askAnything: "এ যেকোনো কিছু জিজ্ঞাসা করুন",
    computingNwpSpread: "আবহাওয়া মডেল তুলনা করা হচ্ছে...",
    nwpComparisonTitle: "NOAA GFS vs ECMWF IFS মডেল তুলনা",
    nwpComparisonDesc: "আমেরিকান GFS এবং ইউরোপীয় ECMWF এর মধ্যে বিশ্লেষণ।",
    ensembleConfidence: "মডেল নির্ভরযোগ্যতা",
    avgTempSpread: "গড় তাপমাত্রার পার্থক্য",
    forecastDay: "পূর্বাভাস দিন",
    tempSpread: "তাপমাত্রার পার্থক্য",
    gfsRainVsEcmwf: "GFS বৃষ্টি vs ECMWF বৃষ্টি",
    modelAgreement: "মডেল সম্মতি",
    scientificContextTitle: "বৈজ্ঞানিক প্রেক্ষাপট:",
    scientificContextDesc: "মডেলগুলির উচ্চ সম্মতি নির্ভরযোগ্য পূর্বাভাস নির্দেশ করে।",
    whatShouldWear: "এ কি পরিধান করবেন?",
    outfitSubtitle: "আবহাওয়া উপযোগী পোশাক ও বহিরঙ্গন পরামর্শ।",
    analyzingOutfit: "পোশাকের সুপারিশ তৈরি করা হচ্ছে...",
    recommendedTops: "সুপারিশকৃত টপস",
    recommendedBottoms: "সুপারিশকৃত বটমস",
    outerwearLayers: "জ্যাকেট এবং কোট",
    footwearSuggestion: "জুতার পরামর্শ",
    beforeYouStepOut: "বাইরে বের হওয়ার আগে",
    essentialAccessories: "প্রয়োজনীয় সামগ্রীর তালিকা",
    outdoorFeasibility: "বাইরের কার্যক্রমের উপযুক্ততা",
    dailyActivityOutlook: "দৈনন্দিন কাজের দৃষ্টিভঙ্গি",
    runningExercise: "দৌড় / ব্যায়াম",
    laundryDrying: "কাপড় শুকানো",
    transitCommute: "ভ্রমণ ও যাতায়াত",
    askWeatherGptAi: "ওয়েদারজিপিটিকে জিজ্ঞাসা করুন:",
    whatToWearPrompt: "কি পরবেন",
    umbrellaPrompt: "ছাতা লাগবে?",
    joggingPrompt: "জগিংয়ের জন্য ভালো?",
    footerTagline: "আবহাওয়া বুদ্ধিমত্তার জন্য কথোপকথন AI প্ল্যাটফর্ম",
    footerBuiltWith: "FastAPI, Vite React, NWP মডেল এবং WIS2.0 দিয়ে নির্মিত",
    signInToAsk: "🔑 জিজ্ঞাসা করতে সাইন ইন করুন",
    suggestionWear: "👔 আমার কি পরা উচিত? (পোশাক গাইড)",
    suggestionTomorrow: "✨ आगामीকালের পোশাক",
    suggestionRain: "🌧 কাল কি বৃষ্টি হবে?",
    suggestionFarming: "🌾 কৃষি ও স্প্রে পরামর্শ",
    upcomingDays: "আসন্ন দিনগুলি",
    detailedNwpBtn: "বিস্তারিত NWP →",
    localTime: "স্থানীয় সময়:",
    liveBadge: "লাইভ",
    fetchingLiveData: "লাইভ আবহাওয়ার তথ্য আনা হচ্ছে...",
    noWeatherData: "কোনো আবহাওয়ার তথ্য লোড হয়নি।",
    loadWeather: "আবহাওয়া লোড করুন",
    riskDescLow: "বর্তমান আবহাওয়া ন্যূনতম পরিচালনা ও পরিবেশগত ঝুঁকি নির্দেশ করে।",
    riskDescModerate: "মাঝারি আবহাওয়া প্রভাব। কৃষি স্প্রে এবং সড়ক ভ্রমণের অবস্থা পরীক্ষা করুন।",
    riskDescHigh: "উচ্চ ঝুঁকি সতর্কতা। আগাম সতর্কবার্তা নিরাপত্তা নির্দেশিকা মেনে চলুন।",
    cropWeatherMatrixSub: "কীটনাশক স্প্রে, সেচ নির্ধারণ এবং ফসল সুরক্ষার জন্য রিয়েল-টাইম কৃষি-আবহাওয়া সিদ্ধান্ত ম্যাট্রিক্স।",
    rainProbabilityLabel: "বৃষ্টির সম্ভাবনা",
    washOffRisk: "ধুয়ে যাওয়ার ঝুঁকি",
    lowWashOff: "কম ধুয়ে যাওয়ার ঝুঁকি",
    sprayDriftWind: "স্প্রে প্রবাহ বাতাস",
    optimalSpeed: "অনুকূল গতি",
    highDrift: "উচ্চ প্রবাহ",
    canopyTemp: "ক্যানোপি তাপমাত্রা",
    evaporationSafe: "বাষ্পীভবন নিরাপদ",
    highEvaporation: "উচ্চ বাষ্পীভবন",
    suitabilityIndex: "উপযুক্ততা সূচক",
    agrochemicalSprayDecision: "কৃষি-রাসায়নিক স্প্রে সিদ্ধান্ত:",
    harvestProtectionAdvisory: "ফসল কাটা ও ফসল-পরবর্তী সুরক্ষা পরামর্শ:",
    regionalSoilProfileTitle: "আঞ্চলিক মৃত্তিকা ও কৃষি-জলবায়ু প্রোফাইল:",
    groundedFor: "ভিত্তিতে নির্ধারিত",
    primarySoilGroup: "প্রধান মাটির গ্রুপ",
    soilPhLevel: "মাটির pH মাত্রা",
    textureAeration: "গঠন ও বায়ু চলাচল",
    organicCarbonDrainage: "জৈব কার্বন ও নিষ্কাশন",
    activeFarmCalendarFocus: "🗓️ সক্রিয় কৃষি ক্যালেন্ডার অগ্রাধিকার:",
    historicallyCultivatedHeader: "🌱 ঐতিহাসিকভাবে চাষ করা এবং মাটির সাথে সামঞ্জস্যপূর্ণ ফসল:",
    calibratedIcarSub: "ICAR ঐতিহাসিক উৎপাদন রেকর্ড, স্থানীয় মাটির pH এবং রিয়েল-টাইম ঋতুভিত্তিক আবহাওয়ার সামঞ্জস্যের সাথে ক্যালিব্রেট করা হয়েছে।",
    match: "সামঞ্জস্য",
    historicalRecord: "ঐতিহাসিক রেকর্ড:",
    soilCompatibility: "মাটির সামঞ্জস্য:",
    climateWater: "জলবায়ু ও পানি:",
    growthCycle: "বৃদ্ধি চক্র:",
    cropProtection: "ফসল সুরক্ষা:",
    days: "দিন",
  },
};

// Weather Condition Translation Dictionary
const WEATHER_CONDITIONS_MAP = {
  "clear sky": {
    "हिन्दी": "साफ़ आसमान",
    "ಕನ್ನಡ": "ಸ್ಪಷ್ಟ ಆಕಾಶ",
    "தமிழ்": "தெளிவான வானம்",
    "తెలుగు": "స్వచ్ఛమైన ఆకాశం",
    "मराठी": "निरभ्र आकाश",
    "বাংলা": "পরিষ্কার আকাশ",
  },
  "sunny": {
    "हिन्दी": "धूप खिली",
    "ಕನ್ನಡ": "ಬಿಸಿಲು",
    "தமிழ்": "வெயில்",
    "తెలుగు": "ఎండ",
    "मराठी": "सूर्यप्रकाश",
    "বাংলা": "রৌদ্রোজ্জ্বল",
  },
  "mainly clear": {
    "हिन्दी": "मुख्यतः साफ़",
    "ಕನ್ನಡ": "ಹೆಚ್ಚಾಗಿ ಸ್ಪಷ್ಟ",
    "தமிழ்": "பெரும்பாலும் தெளிவானது",
    "తెలుగు": "ఎక్కువగా నిర్మలంగా",
    "मराठी": "मुख्यत्वे निरभ्र",
    "বাংলা": "প্রধানত পরিষ্কার",
  },
  "partly cloudy": {
    "हिन्दी": "आंशिक रूप से बादल",
    "ಕನ್ನಡ": "ಭಾಗಶಃ ಮೋಡ ಕವಿದ",
    "தமிழ்": "பகுதி மேகமூட்டம்",
    "తెలుగు": "పాక్షికంగా మేఘావృతం",
    "मराठी": "अंशतः ढगाळ",
    "বাংলা": "আংশিক মেঘলা",
  },
  "overcast": {
    "हिन्दी": "घने बादल / बादलों से घिरा",
    "ಕನ್ನಡ": "ಸಂಪೂರ್ಣ ಮೋಡ ಕವಿದ",
    "தமிழ்": "முழு மேகமூட்டம்",
    "తెలుగు": "పూర్తిగా మేఘావృతం",
    "मराठी": "पूर्ण ढगाळ",
    "বাংলা": "মেঘলা আকাশ",
  },
  "fog": {
    "हिन्दी": "कोहरा",
    "ಕನ್ನಡ": "ದಟ್ಟ ಮಂಜು",
    "தமிழ்": "பனிமூட்டம்",
    "తెలుగు": "పొగమంచు",
    "मराठी": "धુके",
    "বাংলা": "কুয়াশা",
  },
  "light drizzle": {
    "हिन्दी": "हल्की बूंदाबांदी",
    "ಕನ್ನಡ": "ಹಗುರ ತುಂತುರು ಮಳೆ",
    "தமிழ்": "லேசான தூறல்",
    "తెలుగు": "చిరుజల్లులు",
    "मराठी": "हलकी रिमझिम",
    "বাংলা": "হালকা গুঁড়ি গুঁড়ি বৃষ্টি",
  },
  "moderate drizzle": {
    "हिन्दी": "मध्यम बूंदाबांदी",
    "ಕನ್ನಡ": "ಮಧ್ಯಮ ತುಂತುರು ಮಳೆ",
    "தமிழ்": "மிதமான தூறல்",
    "తెలుగు": "మధ్యస్థ జల్లులు",
    "मराठी": "मध्यम रिमझिम",
    "বাংলা": "মাঝারি গুঁড়ি গুঁড়ি বৃষ্টি",
  },
  "slight rain": {
    "हिन्दी": "हल्की बारिश",
    "ಕನ್ನಡ": "ಸಣ್ಣ ಮಳೆ",
    "தமிழ்": "லேசான மழை",
    "తెలుగు": "తేలికపాటి వర్షం",
    "मराठी": "हलका पाऊस",
    "বাংলা": "হালকা বৃষ্টি",
  },
  "moderate rain": {
    "हिन्दी": "मध्यम बारिश",
    "ಕನ್ನಡ": "ಮಧ್ಯಮ ಮಳೆ",
    "தமிழ்": "மிதமான மழை",
    "తెలుగు": "మధ్యస్థ వర్షం",
    "मराठी": "मध्यम पाऊस",
    "বাংলা": "মাঝারি বৃষ্টি",
  },
  "heavy rain": {
    "हिन्दी": "भारी बारिश",
    "ಕನ್ನಡ": "ಭಾರೀ ಮಳೆ",
    "தமிழ்": "கனமழை",
    "తెలుగు": "భారీ వర్షం",
    "मराठी": "मुसळधार पाऊस",
    "বাংলা": "ভারী বৃষ্টিপাত",
  },
  "thunderstorm": {
    "हिन्दी": "गरज के साथ बारिश",
    "ಕನ್ನಡ": "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
    "தமிழ்": "இடியுடன் கூடிய மழை",
    "తెలుగు": "ఉరుములతో కూడిన వర్షం",
    "मराठी": "वादळी पाऊस",
    "বাংলা": "বজ্রবিদ্যুৎ সহ বৃষ্টি",
  },
};

export function translateCondition(conditionStr, language) {
  if (!conditionStr || language === "English") return conditionStr || "Clear";
  const clean = String(conditionStr).toLowerCase().trim();
  for (const [key, map] of Object.entries(WEATHER_CONDITIONS_MAP)) {
    if (clean.includes(key) && map[language]) {
      return map[language];
    }
  }
  return conditionStr;
}

export function translateRiskLevel(risk, language) {
  if (!risk || language === "English") return risk;
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;
  const clean = String(risk).toLowerCase().trim();
  if (clean === "high") return t.high;
  if (clean === "moderate") return t.moderate;
  if (clean === "low") return t.low;
  return risk;
}

export const STATUS_TRANSLATIONS_MAP = {
  // Agricultural & General Suitability
  SUITABLE: {
    "हिन्दी": "उपयुक्त",
    "ಕನ್ನಡ": "ಸೂಕ್ತ",
    "தமிழ்": "பொருத்தமானது",
    "తెలుగు": "అనుకూలమైనది",
    "मराठी": "योग्य",
    "বাংলা": "উপযুক্ত"
  },
  UNSUITABLE: {
    "हिन्दी": "अनुपयुक्त",
    "ಕನ್ನಡ": "ಅನುಚಿತ",
    "தமிழ்": "பொருத்தமற்றது",
    "తెలుగు": "అనుకూలం కాదు",
    "मराठी": "अयोग्य",
    "বাংলা": "অনুপযুক্ত"
  },
  CAUTION: {
    "हिन्दी": "सावधानी",
    "ಕನ್ನಡ": "ಎಚ್ಚರಿಕೆ",
    "தமிழ்": "எச்சரிக்கை",
    "తెలుగు": "హెచ్చరిక",
    "मराठी": "सावधगिरी",
    "বাংলা": "সতর্কতা"
  },
  // Maritime States
  SAFE: {
    "हिन्दी": "सुरक्षित",
    "ಕನ್ನಡ": "ಸುರಕ್ಷಿತ",
    "தமிழ்": "பாதுகாப்பானது",
    "తెలుగు": "సురక్షితం",
    "मराठी": "सुरक्षित",
    "বাংলা": "নিরাপদ"
  },
  HAZARDOUS: {
    "हिन्दी": "खतरनाक",
    "ಕನ್ನಡ": "ಅಪಾಯಕಾರಿ",
    "தமிழ்": "ஆபத்தானது",
    "తెలుగు": "ప్రమాదకరమైనది",
    "मराठी": "धोकादायक",
    "বাংলা": "বিপজ্জনক"
  },
  // Smart City Urban Comfort Levels
  PLEASANT: {
    "हिन्दी": "सुखद",
    "ಕನ್ನಡ": "ಆಹ್ಲಾದಕರ",
    "தமிழ்": "இதமான",
    "తెలుగు": "ఆహ్లాదకరమైనది",
    "मराठी": "आल्हाददायक",
    "বাংলা": "মনোরম"
  },
  WARM: {
    "हिन्दी": "गर्म",
    "ಕನ್ನಡ": "ಬೆಚ್ಚಗಿನ",
    "தமிழ்": "வெதுவெதுப்பான",
    "తెలుగు": "వెచ్చని",
    "मराठी": "उबदार",
    "বাংলা": "উষ্ণ"
  },
  "VERY WARM / CAUTION": {
    "हिन्दी": "काफी गर्म / सावधानी",
    "ಕನ್ನಡ": "ಬಹಳ ಬೆಚ್ಚಗೆ / ಮುನ್ನೆಚ್ಚರಿಕೆ",
    "தமிழ்": "மிகவும் வெப்பம் / எச்சரிக்கை",
    "తెలుగు": "చాలా వెచ్చగా / జాగ్రత్త",
    "मराठी": "अतिशय उष्ण / सावधगिरी",
    "বাংলা": "খুব উষ্ণ / সতর্কতা"
  },
  "VERY WARM": {
    "हिन्दी": "काफी गर्म",
    "ಕನ್ನಡ": "ಬಹಳ ಬೆಚ್ಚಗೆ",
    "தமிழ்": "மிகவும் வெப்பம்",
    "తెలుగు": "చాలా వెచ్చగా",
    "मराठी": "अतिशय उष्ण",
    "বাংলা": "খুব উষ্ণ"
  },
  "DANGEROUS HEAT": {
    "हिन्दी": "खतरनाक गर्मी",
    "ಕನ್ನಡ": "ಅಪಾಯಕಾರಿ ಶಾಖ",
    "தமிழ்": "ஆபத்தான வெப்பம்",
    "తెలుగు": "ప్రమాదకరమైన వేడి",
    "मराठी": "धोकादायक उष्णता",
    "বাংলা": "বিপজ্জনক তাপ"
  },
  "EXTREME HEAT": {
    "हिन्दी": "अत्यधिक भीषण गर्मी",
    "ಕನ್ನಡ": "ತೀವ್ರ ಶಾಖ",
    "தமிழ்": "கடுமையான வெப்பம்",
    "తెలుగు": "తీవ్రమైన వేడి",
    "मराठी": "अतिउष्णता",
    "বাংলা": "তীব্র তাপপ্রবাহ"
  },
  COOL: {
    "हिन्दी": "ठंडा",
    "ಕನ್ನಡ": "ತಂಪಾದ",
    "தமிழ்": "குளிர்ந்த",
    "తెలుగు": "చల్లని",
    "मराठी": "थंड",
    "বাংলা": "শীতল"
  },
  COLD: {
    "हिन्दी": "अति ठंडा",
    "ಕನ್ನಡ": "ಅತಿ ಶೀತ",
    "தமிழ்": "அதிக குளிர்",
    "తెలుగు": "తీవ్ర చలి",
    "मराठी": "गार",
    "বাংলা": "ঠাণ্ডা"
  },
  // Air Quality Statuses
  GOOD: {
    "हिन्दी": "अच्छा",
    "ಕನ್ನಡ": "ಉತ್ತಮ",
    "தமிழ்": "நல்லது",
    "తెలుగు": "మంచిది",
    "मराठी": "चांगली",
    "বাংলা": "ভালো"
  },
  MODERATE: {
    "हिन्दी": "मध्यम",
    "ಕನ್ನಡ": "ಮಧ್ಯಮ",
    "தமிழ்": "மிதமான",
    "తెలుగు": "మితమైన",
    "मराठी": "मध्यम",
    "বাংলা": "মাঝারি"
  },
  "UNHEALTHY FOR SENSITIVE GROUPS": {
    "हिन्दी": "संवेदनशील समूहों के लिए अस्वास्थ्यकर",
    "ಕನ್ನಡ": "ಸೂಕ್ಷ್ಮ ಗುಂಪುಗಳಿಗೆ ಅನಾರೋಗ್ಯಕರ",
    "தமிழ்": "உணர்திறன் கொண்ட பிரிவினருக்கு ஆரோக்கியமற்றது",
    "తెలుగు": "సున్నిత సమూహాలకు అనారోగ్యకరం",
    "मराठी": "संवेदनशील घटकांसाठी अस्वस्थकर",
    "বাংলা": "সংবেদনশীল গোষ্ঠীর জন্য অস্বাস্থ্যকর"
  },
  UNHEALTHY: {
    "हिन्दी": "अस्वास्थ्यकर",
    "ಕನ್ನಡ": "ಅನಾರೋಗ್ಯಕರ",
    "தமிழ்": "ஆரோக்கியமற்றது",
    "తెలుగు": "అనారోగ్యకరం",
    "मराठी": "अस्वस्थकर",
    "বাংলা": "অस्वास्थ्यকর"
  },
  "VERY UNHEALTHY": {
    "हिन्दी": "बहुत अस्वास्थ्यकर",
    "ಕನ್ನಡ": "ಬಹಳ ಅನಾರೋಗ್ಯಕರ",
    "தமிழ்": "மிகவும் ஆரோக்கியமற்றது",
    "తెలుగు": "చాలా అనారోగ్యకరం",
    "मराठी": "अतिशय अस्वस्थकर",
    "বাংলা": "খুব অস্বাস্থ্যকর"
  },
  // Drainage Load Statuses
  NORMAL: {
    "हिन्दी": "सामान्य",
    "ಕನ್ನಡ": "ಸಾಮಾನ್ಯ",
    "தமிழ்": "இயல்பானது",
    "తెలుగు": "సాధారణం",
    "मराठी": "सामान्य",
    "বাংলা": "স্বাভাবিক"
  },
  ELEVATED: {
    "हिन्दी": "बढ़ा हुआ",
    "ಕನ್ನಡ": "ಹೆಚ್ಚಳಗೊಂಡ",
    "தமிழ்": "அதிகரித்தது",
    "తెలుగు": "పెరిగింది",
    "मराठी": "वाढलेला",
    "বাংলা": "বর্ধিত"
  },
  CRITICAL: {
    "हिन्दी": "गंभीर",
    "ಕನ್ನಡ": "ಗಂಭೀರ",
    "தமிழ்": "முக்கியமானது",
    "తెలుగు": "తీవ్రమైన",
    "मराठी": "गंभीर",
    "বাংলা": "সংকটজনক"
  },
  "HIGH (FLASH RUNOFF RISK)": {
    "हिन्दी": "उच्च (आकस्मिक बाढ़ जोखिम)",
    "ಕನ್ನಡ": "ಹೆಚ್ಚು (ಧಿಡೀರ್ ಪ್ರವಾಹ ಅಪಾಯ)",
    "தமிழ்": "அதிகம் (திடீர் வெள்ள அபாயம்)",
    "తెలుగు": "అధికం (ఆకస్మిక వరద ముప్పు)",
    "मराठी": "उच्च (अचानक पूर धोका)",
    "বাংলা": "উচ্চ (হঠাৎ বন্যা ঝুঁকি)"
  },
  // Aviation Flight Categories
  VFR: {
    "हिन्दी": "VFR (दृश्य उड़ान)",
    "ಕನ್ನಡ": "VFR (ದೃಶ್ಯ ಹಾರಾಟ)",
    "தமிழ்": "VFR (பார்வை விமானம்)",
    "తెలుగు": "VFR (విజువల్ ఫ్లైట్)",
    "मराठी": "VFR (दृश्यमान उड्डाण)",
    "বাংলা": "VFR (ভিজ্যুয়াল ফ্লাইট)"
  },
  MVFR: {
    "हिन्दी": "MVFR (सीमांत दृश्य उड़ान)",
    "ಕನ್ನಡ": "MVFR (ಮಾರ್ಜಿನಲ್ VFR)",
    "தமிழ்": "MVFR (விளிம்புநிலை VFR)",
    "తెలుగు": "MVFR (మార్జినల్ VFR)",
    "मराठी": "MVFR (सीमांत VFR)",
    "বাংলা": "MVFR (প্রান্তিক VFR)"
  },
  IFR: {
    "हिन्दी": "IFR (उपकरण उड़ान)",
    "ಕನ್ನಡ": "IFR (ಉಪಕರಣ ಹಾರಾಟ)",
    "தமிழ்": "IFR (கருவி விமானம்)",
    "తెలుగు": "IFR (ఇన్‌స్ట్రుమెంట్ ఫ్లైట్)",
    "मराठी": "IFR (उपकरण उड्डाण)",
    "বাংলা": "IFR (ইনস্ট্রুমেন্ট ফ্লাইট)"
  },
  LIFR: {
    "हिन्दी": "LIFR (निम्न उपकरण उड़ान)",
    "ಕನ್ನಡ": "LIFR (ಕಡಿಮೆ IFR)",
    "தமிழ்": "LIFR (குறைந்த IFR)",
    "తెలుగు": "LIFR (తక్కువ IFR)",
    "मराठी": "LIFR (कमी IFR)",
    "বাংলা": "LIFR (নিম্ন IFR)"
  },
  // NWP Model Agreement / Levels
  HIGH: {
    "हिन्दी": "उच्च",
    "ಕನ್ನಡ": "ಹೆಚ್ಚು",
    "தமிழ்": "அதிகம்",
    "తెలుగు": "అధికం",
    "मराठी": "उच्च",
    "বাংলা": "উচ্চ"
  },
  LOW: {
    "हिन्दी": "निम्न",
    "ಕನ್ನಡ": "ಕಡಿಮೆ",
    "தமிழ்": "குறைவு",
    "తెలుగు": "తక్కువ",
    "मराठी": "कमी",
    "বাংলা": "কম"
  }
};

export function translateStatus(status, language = "English") {
  if (!status || language === "English") return status;
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;
  const raw = String(status).trim();
  const clean = raw.toUpperCase();

  if (STATUS_TRANSLATIONS_MAP[clean] && STATUS_TRANSLATIONS_MAP[clean][language]) {
    return STATUS_TRANSLATIONS_MAP[clean][language];
  }
  for (const [key, map] of Object.entries(STATUS_TRANSLATIONS_MAP)) {
    if (clean === key.toUpperCase() && map[language]) {
      return map[language];
    }
  }

  // Handle percentages like "High (85%)"
  const pctMatch = raw.match(/^(High|Moderate|Low)\s*(\(\d+%\))?$/i);
  if (pctMatch) {
    const lvlKey = pctMatch[1].toUpperCase();
    const pct = pctMatch[2] ? ` ${pctMatch[2]}` : "";
    if (STATUS_TRANSLATIONS_MAP[lvlKey] && STATUS_TRANSLATIONS_MAP[lvlKey][language]) {
      return `${STATUS_TRANSLATIONS_MAP[lvlKey][language]}${pct}`;
    }
  }

  if (clean === "SUITABLE") return t.suitable;
  if (clean === "UNSUITABLE") return t.unsuitable;
  if (clean === "CAUTION") return t.caution;
  return status;
}

export function translateNwpConfidence(confidence, language = "English") {
  if (!confidence || language === "English") return confidence;
  return translateStatus(confidence, language) || confidence;
}

export function getTranslation(language) {
  const current = TRANSLATIONS[language] || TRANSLATIONS.English;
  if (language === "English") return current;
  return { ...TRANSLATIONS.English, ...current };
}

// ====================================================
// WEEKDAYS TRANSLATION MAP
// ====================================================
export const WEEKDAYS_MAP = {
  Monday: {
    English: "Monday",
    "हिन्दी": "सोमवार",
    "ಕನ್ನಡ": "ಸೋಮವಾರ",
    "தமிழ்": "திங்கட்கிழமை",
    "తెలుగు": "సోమవారం",
    "मराठी": "सोमवार",
    "বাংলা": "সোমবার",
  },
  Tuesday: {
    English: "Tuesday",
    "हिन्दी": "मंगलवार",
    "ಕನ್ನಡ": "ಮಂಗಳವಾರ",
    "தமிழ்": "செவ்வாய்க்கிழமை",
    "తెలుగు": "మంగళవారం",
    "मराठी": "मंगळवार",
    "বাংলা": "মঙ্গলবার",
  },
  Wednesday: {
    English: "Wednesday",
    "हिन्दी": "बुधवार",
    "ಕನ್ನಡ": "ಬುಧವಾರ",
    "தமிழ்": "புதன்கிழமை",
    "తెలుగు": "బుధవారం",
    "मराठी": "बुधवार",
    "বাংলা": "বুধবার",
  },
  Thursday: {
    English: "Thursday",
    "हिन्दी": "गुरुवार",
    "ಕನ್ನಡ": "ಗುರುವಾರ",
    "தமிழ்": "வியாழக்கிழமை",
    "తెలుగు": "గురువారం",
    "मराठी": "गुरुवार",
    "বাংলা": "বৃহস্পতিবার",
  },
  Friday: {
    English: "Friday",
    "हिन्दी": "शुक्रवार",
    "ಕನ್ನಡ": "ಶುಕ್ರವಾರ",
    "தமிழ்": "வெள்ளிக்கிழமை",
    "తెలుగు": "శుక్రవారం",
    "मराठी": "शुक्रवार",
    "বাংলা": "শুক্রবার",
  },
  Saturday: {
    English: "Saturday",
    "हिन्दी": "शनिवार",
    "ಕನ್ನಡ": "ಶನಿವಾರ",
    "தமிழ்": "சனிக்கிழமை",
    "తెలుగు": "శనివారం",
    "मराठी": "शनिवार",
    "বাংলা": "শনিবার",
  },
  Sunday: {
    English: "Sunday",
    "हिन्दी": "रविवार",
    "ಕನ್ನಡ": "ಭಾನುವಾರ",
    "தமிழ்": "ஞாயிற்றுக்கிழமை",
    "తెలుగు": "ఆదివారం",
    "मराठी": "रविवार",
    "বাংলা": "রবিবার",
  },
  Mon: {
    English: "Mon",
    "हिन्दी": "सोम",
    "ಕನ್ನಡ": "ಸೋಮ",
    "தமிழ்": "திங்",
    "తెలుగు": "సోమ",
    "मराठी": "सोम",
    "বাংলা": "সোম",
  },
  Tue: {
    English: "Tue",
    "हिन्दी": "मंगल",
    "ಕನ್ನಡ": "ಮಂಗಳ",
    "தமிழ்": "செவ்",
    "తెలుగు": "మంగళ",
    "मराठी": "मंगळ",
    "বাংলা": "মঙ্গল",
  },
  Wed: {
    English: "Wed",
    "हिन्दी": "बुध",
    "ಕನ್ನಡ": "ಬುಧ",
    "தமிழ்": "புதன்",
    "తెలుగు": "బుధ",
    "मराठी": "बुध",
    "বাংলা": "বুধ",
  },
  Thu: {
    English: "Thu",
    "हिन्दी": "गुरु",
    "ಕನ್ನಡ": "ಗುರು",
    "தமிழ்": "வியா",
    "తెలుగు": "గురు",
    "मराठी": "गुरु",
    "বাংলা": "বৃহঃ",
  },
  Fri: {
    English: "Fri",
    "हिन्दी": "शुक्र",
    "ಕನ್ನಡ": "ಶುಕ್ರ",
    "தமிழ்": "வெள்",
    "తెలుగు": "శుక్ర",
    "मराठी": "शुक्र",
    "বাংলা": "শুক্র",
  },
  Sat: {
    English: "Sat",
    "हिन्दी": "शनि",
    "ಕನ್ನಡ": "ಶನಿ",
    "தமிழ்": "சனி",
    "తెలుగు": "శని",
    "मराठी": "शनि",
    "বাংলা": "শনি",
  },
  Sun: {
    English: "Sun",
    "हिन्दी": "रवि",
    "ಕನ್ನಡ": "ಭಾನು",
    "தமிழ்": "ஞாயி",
    "తెలుగు": "ఆది",
    "मराठी": "रवि",
    "বাংলা": "রবি",
  },
  Today: {
    English: "Today",
    "हिन्दी": "आज",
    "ಕನ್ನಡ": "ಇಂದು",
    "தமிழ்": "இன்று",
    "తెలుగు": "ఈరోజు",
    "मराठी": "आज",
    "বাংলা": "আজ",
  },
  Tomorrow: {
    English: "Tomorrow",
    "हिन्दी": "कल",
    "ಕನ್ನಡ": "ನಾಳೆ",
    "தமிழ்": "நாளை",
    "తెలుగు": "రేపు",
    "मराठी": "उद्या",
    "বাংলা": "কাল",
  },
};

export function translateDay(dayStr, language = "English") {
  if (!dayStr || language === "English") return dayStr || "";
  const raw = String(dayStr).trim();
  if (WEEKDAYS_MAP[raw] && WEEKDAYS_MAP[raw][language]) {
    return WEEKDAYS_MAP[raw][language];
  }
  for (const [key, map] of Object.entries(WEEKDAYS_MAP)) {
    if (raw.toLowerCase() === key.toLowerCase() && map[language]) {
      return map[language];
    }
  }
  for (const [key, map] of Object.entries(WEEKDAYS_MAP)) {
    const regex = new RegExp(`\\b${key}\\b`, "i");
    if (regex.test(raw) && map[language]) {
      return raw.replace(regex, map[language]);
    }
  }
  return dayStr;
}

// ====================================================
// REGIONAL PLACES TRANSLATION MAP
// ====================================================
export const REGION_NAMES_MAP = {
  "Delhi & NCR": {
    "हिन्दी": "दिल्ली एवं एनसीआर",
    "ಕನ್ನಡ": "ದೆಹಲಿ ಮತ್ತು ಎನ್‌ಸಿಆರ್",
    "தமிழ்": "டெல்லி & என்சிஆர்",
    "తెలుగు": "ఢిల్లీ & ఎన్‌సిఆర్",
    "मराठी": "दिल्ली आणि एनसीआर",
    "বাংলা": "দিল্লি ও এনসিআর",
  },
  "Karnataka": {
    "हिन्दी": "कर्नाटक",
    "ಕನ್ನಡ": "ಕರ್ನಾಟಕ",
    "தமிழ்": "கர்நாடகா",
    "తెలుగు": "కర్ణాటక",
    "मराठी": "कर्नाटक",
    "বাংলা": "কর্ণাটক",
  },
  "Punjab & Haryana": {
    "हिन्दी": "पंजाब एवं हरियाणा",
    "ಕನ್ನಡ": "ಪಂಜಾಬ್ ಮತ್ತು ಹರಿಯಾಣ",
    "தமிழ்": "பஞ்சாப் & ஹரியானா",
    "తెలుగు": "పంజాబ్ & హర్యానా",
    "मराठी": "पंजाब आणि हरियाणा",
    "বাংলা": "পাঞ্জাব ও হরিয়ানা",
  },
  "Uttar Pradesh": {
    "हिन्दी": "उत्तर प्रदेश",
    "ಕನ್ನಡ": "ಉತ್ತರ ಪ್ರದೇಶ",
    "தமிழ்": "உத்தரப் பிரதேசம்",
    "తెలుగు": "ఉత్తర ప్రదేశ్",
    "मराठी": "उत्तर प्रदेश",
    "বাংলা": "উত্তর প্রদেশ",
  },
  "Maharashtra": {
    "हिन्दी": "महाराष्ट्र",
    "ಕನ್ನಡ": "ಮಹಾರಾಷ್ಟ್ರ",
    "தமிழ்": "மகாராஷ்டிரா",
    "తెలుగు": "మహారాష్ట్ర",
    "मराठी": "महाराष्ट्र",
    "বাংলা": "মহারাষ্ট্র",
  },
  "West Bengal": {
    "हिन्दी": "पश्चिम बंगाल",
    "ಕನ್ನಡ": "ಪಶ್ಚಿಮ ಬಂಗಾಳ",
    "தமிழ்": "மேற்கு வங்காளம்",
    "తెలుగు": "పశ్చిమ బెంగాల్",
    "मराठी": "पश्चिम बंगाल",
    "বাংলা": "পশ্চিমবঙ্গ",
  },
  "Tamil Nadu": {
    "हिन्दी": "तमिलनाडु",
    "ಕನ್ನಡ": "ತಮಿಳುನಾಡು",
    "தமிழ்": "தமிழ்நாடு",
    "తెలుగు": "తమిళనాడు",
    "मराठी": "तामिळनाडू",
    "বাংলা": "তামিলনাড়ু",
  },
  "Kerala": {
    "हिन्दी": "केरल",
    "ಕನ್ನಡ": "ಕೇರಳ",
    "தமிழ்": "கேரளா",
    "తెలుగు": "కేరళ",
    "मराठी": "केरळ",
    "বাংলা": "কেরালা",
  },
  "Rajasthan": {
    "हिन्दी": "राजस्थान",
    "ಕನ್ನಡ": "ರಾಜಸ್ಥಾನ",
    "தமிழ்": "ராஜஸ்தான்",
    "తెలుగు": "రాజస్థాన్",
    "मराठी": "राजस्थान",
    "বাংলা": "রাজস্থান",
  },
  "Gujarat": {
    "हिन्दी": "गुजरात",
    "ಕನ್ನಡ": "ಗುಜರಾತ್",
    "தமிழ்": "குஜராத்",
    "తెలుగు": "గుజరాత్",
    "मराठी": "गुजरात",
    "বাংলা": "গুজরাট",
  },
  "Himachal Pradesh": {
    "हिन्दी": "हिमाचल प्रदेश",
    "ಕನ್ನಡ": "ಹಿಮಾಚಲ ಪ್ರದೇಶ",
    "தமிழ்": "இமாச்சலப் பிரதேசம்",
    "తెలుగు": "హిమాచల్ ప్రదేశ్",
    "मराठी": "हिमाचल प्रदेश",
    "বাংলা": "হিমাচল প্রদেশ",
  },
  "Jammu and Kashmir": {
    "हिन्दी": "जम्मू और कश्मीर",
    "ಕನ್ನಡ": "ಜಮ್ಮು ಮತ್ತು ಕಾಶ್ಮೀರ",
    "தமிழ்": "ஜம்மு காஷ்மீர்",
    "తెలుగు": "జమ్మూ కాశ్మీర్",
    "मराठी": "जम्मू आणि काश्मीर",
    "বাংলা": "জম্মু ও কাশ্মীর",
  },
  "Bengaluru": {
    "हिन्दी": "बेंगलुरु",
    "ಕನ್ನಡ": "ಬೆಂಗಳೂರು",
    "தமிழ்": "பெங்களூரு",
    "తెలుగు": "బెంగళూరు",
    "मराठी": "बंगळुरू",
    "বাংলা": "বেঙ্গালুরু",
  },
  "Delhi": {
    "हिन्दी": "दिल्ली",
    "ಕನ್ನಡ": "ದೆಹಲಿ",
    "தமிழ்": "டெல்லி",
    "తెలుగు": "ఢిల్లీ",
    "मराठी": "दिल्ली",
    "বাংলা": "দিল্লি",
  },
  "New Delhi": {
    "हिन्दी": "नई दिल्ली",
    "ಕನ್ನಡ": "ಹೊಸ ದೆಹಲಿ",
    "தமிழ்": "புது டெல்லி",
    "తెలుగు": "న్యూఢిల్లీ",
    "मराठी": "नवी दिल्ली",
    "বাংলা": "নতুন দিল্লি",
  },
  "Mumbai": {
    "हिन्दी": "मुंबई",
    "ಕನ್ನಡ": "ಮುಂಬೈ",
    "தமிழ்": "மும்பை",
    "తెలుగు": "ముంబై",
    "मराठी": "मुंबई",
    "বাংলা": "মুম্বই",
  },
  "Kolkata": {
    "हिन्दी": "कोलकाता",
    "ಕನ್ನಡ": "ಕೋಲ್ಕತ್ತಾ",
    "தமிழ்": "கொல்கத்தா",
    "తెలుగు": "కోల్‌కతా",
    "मराठी": "कोलकाता",
    "বাংলা": "কলকাতা",
  },
  "Chennai": {
    "हिन्दी": "चेन्नई",
    "ಕನ್ನಡ": "ಚೆನ್ನೈ",
    "தமிழ்": "சென்னை",
    "తెలుగు": "చెన్నై",
    "मराठी": "चेन्नई",
    "বাংলা": "চেন্নাই",
  },
  "Hyderabad": {
    "हिन्दी": "हैदराबाद",
    "ಕನ್ನಡ": "ಹೈದರಾಬಾದ್",
    "தமிழ்": "ஹைதராபாத்",
    "తెలుగు": "హైదరాబాద్",
    "मराठी": "हैदराबाद",
    "বাংলা": "হায়দ্রাবাদ",
  },
  "Lucknow": {
    "हिन्दी": "लखनऊ",
    "ಕನ್ನಡ": "ಲಕ್ನೋ",
    "தமிழ்": "லக்னோ",
    "తెలుగు": "లక్నో",
    "मराठी": "लखनौ",
    "বাংলা": "লখনউ",
  },
  "Ludhiana": {
    "हिन्दी": "लुधियाना",
    "ಕನ್ನಡ": "ಲುಧಿಯಾನ",
    "தமிழ்": "லுதியானா",
    "తెలుగు": "లూధియానా",
    "मराठी": "लुधियाना",
    "বাংলা": "লুধিয়ানা",
  },
};

export function translateRegionName(regionName, language = "English") {
  if (!regionName || language === "English") return regionName || "";
  const raw = String(regionName).trim();
  if (REGION_NAMES_MAP[raw] && REGION_NAMES_MAP[raw][language]) {
    return REGION_NAMES_MAP[raw][language];
  }
  for (const [key, map] of Object.entries(REGION_NAMES_MAP)) {
    if (raw.toLowerCase() === key.toLowerCase() && map[language]) {
      return map[language];
    }
  }
  return regionName;
}

setAlertRegionTranslator(translateRegionName);

// ====================================================
// CROPS, SOIL & AGRONOMY TRANSLATION MAP
// ====================================================
export const CROPS_TRANSLATION_MAP = {
  // Crop Names
  "Wheat (Sharbati & HD-2967 / HD-3086)": {
    "हिन्दी": "गेहूं (शरबती एवं HD-2967 / HD-3086)",
    "ಕನ್ನಡ": "ಗೋಧಿ (ಶರ್ಬತಿ ಮತ್ತು HD-2967 / HD-3086)",
    "தமிழ்": "கோதுமை (சர்பதி & HD-2967 / HD-3086)",
    "తెలుగు": "గోధుమ (శర్బతి & HD-2967 / HD-3086)",
    "मराठी": "गहू (शरबती आणि HD-2967 / HD-3086)",
    "বাংলা": "গম (শরবতী এবং HD-2967 / HD-3086)",
  },
  "Mustard / Pusa Bold (Raya)": {
    "हिन्दी": "सरसों / पूसा बोल्ड (राया)",
    "ಕನ್ನಡ": "ಸಾಸಿವೆ / ಪೂಸಾ ಬೋಲ್ಡ್ (ರಾಯಾ)",
    "தமிழ்": "கடுகு / பூசா போல்ட் (ராயா)",
    "తెలుగు": "ఆవాలు / పూసా బోల్డ్ (రాయా)",
    "मराठी": "मोहरी / पुसा बोल्ड (राया)",
    "বাংলা": "সরিষা / পুসা বোল্ড (রায়া)",
  },
  "Cauliflower, Cabbage & Spinach": {
    "हिन्दी": "फूलगोभी, पत्तागोभी एवं पालक",
    "ಕನ್ನಡ": "ಹೂಕೋಸು, ಎಲೆಕೋಸು ಮತ್ತು ಪಾಲಕ್",
    "தமிழ்": "காலிஃபிளவர், முட்டைக்கோஸ் & கீரை",
    "తెలుగు": "కాలీఫ్లవర్, క్యాబేజీ & పాలకూర",
    "मराठी": "फ्लॉवर, कोबी आणि पालक",
    "বাংলা": "ফুলকপি, বাঁধাকপি ও পালংশাক",
  },
  "Basmati Rice (Pusa 1121 & 1509)": {
    "हिन्दी": "बासमती धान (पूसा 1121 एवं 1509)",
    "ಕನ್ನಡ": "ಬಾಸ್ಮತಿ ಭತ್ತ (ಪೂಸಾ 1121 ಮತ್ತು 1509)",
    "தமிழ்": "பாசுமதி அரிசி (பூசா 1121 & 1509)",
    "తెలుగు": "బాస్మతి వరి (పూసా 1121 & 1509)",
    "मराठी": "बासमती तांदूळ (पुसा 1121 आणि 1509)",
    "বাংলা": "বাসমতী ধান (পুসা ১১২১ এবং ১৫০৯)",
  },
  "Pearl Millet / Bajra": {
    "हिन्दी": "बाजरा / मोती बाजरा",
    "ಕನ್ನಡ": "ಸಜ್ಜೆ (ಬಾಜ್ರಾ)",
    "தமிழ்": "கம்பு (பாஜ்ரா)",
    "తెలుగు": "సజ్జలు (బాజ్రా)",
    "मराठी": "बाजरी",
    "বাংলা": "বাজরা",
  },
  "Riverbed Summer Cucurbits & Tomato": {
    "हिन्दी": "नदी कछार ग्रीष्मकालीन ककड़ी-तरबूज एवं टमाटर",
    "ಕನ್ನಡ": "ನದಿಪಾತ್ರದ ಬೇಸಿಗೆ ಸೌತೆಕಾಯಿ ಮತ್ತು ಟೊಮೆಟೊ",
    "தமிழ்": "ஆற்றுப்படுகை கோடை வெள்ளரி & தக்காளி",
    "తెలుగు": "నదీ తీర వేసవి దోసకాయ & టమోటా",
    "मराठी": "नदीकाठची उन्हाळी काकडी आणि टोमॅटो",
    "বাংলা": "নদীর তীরের গ্রীষ্মকালীন শসা ও টমেটো",
  },
  "Ragi (Finger Millet)": {
    "हिन्दी": "रागी (मडुआ / नाचनी)",
    "ಕನ್ನಡ": "ರಾಗಿ (ಫಿಂಗರ್ ರಾಗಿ)",
    "தமிழ்": "கேழ்வரகு (ராகி)",
    "తెలుగు": "రాగులు (తైదలు)",
    "मराठी": "नाचणी (रागी)",
    "বাংলা": "রাগি (মারুয়া)",
  },
  "Red Gram (Tur / Pigeon Pea)": {
    "हिन्दी": "अरहर / तुअर (लाल चना)",
    "ಕನ್ನಡ": "ತೊಗರಿ ಬೇಳೆ (ತೊಗರಿ)",
    "தமிழ்": "துவரம் பருப்பு (துவரை)",
    "తెలుగు": "కందిపప్పు (కందులు)",
    "मराठी": "तूर डाळ (तूर)",
    "বাংলা": "অড়হর ডাল",
  },
  "Mulberry & Silk (Sericulture)": {
    "हिन्दी": "शहतूत एवं रेशमकीट पालन (रेशम उद्योग)",
    "ಕನ್ನಡ": "ಹಿಪ್ಪುನೇರಳೆ ಮತ್ತು ರೇಷ್ಮೆ ಕೃಷಿ",
    "தமிழ்": "மல்பெரி & பட்டு வளர்ப்பு",
    "తెలుగు": "మల్బరీ & పట్టు పరిశ్రమ",
    "मराठी": "तुती आणि रेशीम उद्योग",
    "বাংলা": "তুঁত ও রেশম চাষ",
  },
  "Maize (Hybrid Corn)": {
    "हिन्दी": "मक्का (संकर मक्का)",
    "ಕನ್ನಡ": "ಮೆಕ್ಕೆಜೋಳ (ಹೈಬ್ರಿಡ್ ಮುಸುಕಿನ ಜೋಳ)",
    "தமிழ்": "மக்காச்சோளம் (ஹைப்ரிட் கார்ன்)",
    "తెలుగు": "మొక్కజొన్న (హైబ్రిడ్ కార్న్)",
    "मराठी": "मका (हायब्रिड कॉर्न)",
    "বাংলা": "ভুট্টা (হাইব্রিড কর্ন)",
  },
  "Tomato & Field Vegetables": {
    "हिन्दी": "टमाटर एवं मौसमी सब्जियाँ",
    "ಕನ್ನಡ": "ಟೊಮೆಟೊ ಮತ್ತು ತರಕಾರಿಗಳು",
    "தமிழ்": "தக்காளி & காய்கறிகள்",
    "తెలుగు": "టమోటా & కూరగాయలు",
    "मराठी": "टोमॅटो आणि भाजीपाला",
    "বাংলা": "টমেটো ও সবজি",
  },
  "Arecanut & Betelvine": {
    "हिन्दी": "सुपारी एवं पान की बेल",
    "ಕನ್ನಡ": "ಅಡಿಕೆ ಮತ್ತು ವೀಳ್ಯದೆಲೆ",
    "தமிழ்": "பாக்கு & வெற்றிலைக்கொடி",
    "తెలుగు": "పోక చెక్క & తమలపాకు తోటలు",
    "मराठी": "सुपारी आणि विड्याची पाने",
    "বাংলা": "সুপারি ও পানের বরজ",
  },
  "Sugarcane (Co-0238 & High-Sucrose)": {
    "हिन्दी": "गन्ना (Co-0238 एवं उच्च-शर्करा किस्म)",
    "ಕನ್ನಡ": "ಕಬ್ಬು (ಹೆಚ್ಚು ಸಕ್ಕರೆ ಅಂಶದ ತಳಿ)",
    "தமிழ்": "கரும்பு (அதிக சர்க்கரை ரகம்)",
    "తెలుగు": "చెరకు (అధిక చక్కెర రకం)",
    "मराठी": "ऊस (जास्त साखरेची जात)",
    "বাংলা": "আখ (উচ্চ চিনিযুক্ত জাত)",
  },
  "Potato (Kufri Pukhraj / Chipsona)": {
    "हिन्दी": "आलू (कुफरी पुखराज / चिप्सोना)",
    "ಕನ್ನಡ": "ಆಲೂಗಡ್ಡೆ (ಕುಫ್ರಿ ಪುಖ್‌ರಾಜ್ / ಚಿಪ್ಸೋನಾ)",
    "தமிழ்": "உருளைக்கிழங்கு (குப்ரி புக்ராஜ் / சிப்சோனா)",
    "తెలుగు": "బంగాళాదుంప (కుఫ్రి పుఖ్‌రాజ్)",
    "मराठी": "बटाटा (कुफरी पुखराज / चिप्सोना)",
    "বাংলা": "আলু (কুফরি পুখরাজ / চিপসোনা)",
  },
  "Mango (Dasheri & Langra)": {
    "हिन्दी": "आम (दशहरी एवं लंगड़ा)",
    "ಕನ್ನಡ": "ಮಾವಿನ ಹಣ್ಣು (ದಶೇರಿ ಮತ್ತು ಲಂಗ್ರಾ)",
    "தமிழ்": "மாம்பழம் (தசேரி & லங்கரா)",
    "తెలుగు": "మామిడి (దశేరి & లంగ్రా)",
    "मराठी": "आंबा (दशेरी आणि लंगडा)",
    "বাংলা": "আম (দশেরী ও ল্যাংড়া)",
  },
  "BT Cotton (Bollgard II)": {
    "हिन्दी": "बीटी कपास (बोलगार्ड II)",
    "ಕನ್ನಡ": "ಬಿಟಿ ಹತ್ತಿ (ಬೋಲ್‌ಗಾರ್ಡ್ II)",
    "தமிழ்": "பிடி பருத்தி (போல் கார்டு II)",
    "తెలుగు": "బీటీ పత్తి (బోల్‌గార్డ్ II)",
    "मराठी": "बीटी कापूस (बोलगार्ड II)",
    "বাংলা": "বিটি তুলো (বোলগার্ড II)",
  },
  "Soybean (JS-335 & JS-9560)": {
    "हिन्दी": "सोयाबीन (JS-335 एवं JS-9560)",
    "ಕನ್ನಡ": "ಸೋಯಾಬೀನ್ (JS-335 ಮತ್ತು JS-9560)",
    "தமிழ்": "சோயாபீன் (JS-335 & JS-9560)",
    "తెలుగు": "సోయాబీన్ (JS-335 & JS-9560)",
    "मराठी": "सोयाबीन (JS-335 आणि JS-9560)",
    "বাংলা": "সয়াবিন (JS-335 এবং JS-9560)",
  },
  "Jute (Golden Fibre)": {
    "हिन्दी": "जूट / पटसन (स्वर्ण रेशा)",
    "ಕನ್ನಡ": "ಸೆಣಬು (ಚಿನ್ನದ ನಾರು)",
    "தமிழ்": "சணல் (தங்க நார்)",
    "తెలుగు": "జనపనార (బంగారు నార)",
    "मराठी": "ताग (गोल्डन फायबर)",
    "বাংলা": "পাট (সোনালী আঁশ)",
  },
  "Black Pepper (Malabar GI)": {
    "हिन्दी": "काली मिर्च (मालाबार जीआई)",
    "ಕನ್ನಡ": "ಕರಿಮೆಣಸು (ಮಲಬಾರ್ ಜಿಐ)",
    "தமிழ்": "மிளகு (மலபார் ஜிஐ)",
    "తెలుగు": "మిరియాలు (మలబార్ GI)",
    "मराठी": "काळी मिरी (मलबार GI)",
    "বাংলা": "গোলমরিচ (মালাবার GI)",
  },
  "Cardamom (Idukki Green GI)": {
    "हिन्दी": "हरी इलायची (इडुक्की जीआई)",
    "ಕನ್ನಡ": "ಏಲಕ್ಕಿ (ಇಡುಕ್ಕಿ ಹಸಿರು ಜಿಐ)",
    "தமிழ்": "ஏலக்காய் (இடுக்கி பச்சை ஜிஐ)",
    "తెలుగు": "ఏలకులు (ఇడుక్కి గ్రీన్ GI)",
    "मराठी": "वेलची (इडुक्की ग्रीन GI)",
    "বাংলা": "সবুজ এলাচ (ইডুক্কি GI)",
  },
  "Natural Rubber": {
    "हिन्दी": "प्राकृतिक रबर",
    "ಕನ್ನಡ": "ನೈಸರ್ಗಿಕ ರಬ್ಬರ್",
    "தமிழ்": "இயற்கை ரப்பர்",
    "తెలుగు": "సహజ రబ్బరు",
    "मराठी": "नैसर्गिक रबर",
    "বাংলা": "প্রাকৃতিক রাবার",
  },
  "Coffee (Robusta & Arabica)": {
    "हिन्दी": "कॉफ़ी (रोबस्टा एवं अरेबिका)",
    "ಕನ್ನಡ": "ಕಾಫಿ (ರೊಬಸ್ಟಾ ಮತ್ತು ಅರೇಬಿಕಾ)",
    "தமிழ்": "காபி (ரோபஸ்டா & அரேபிகா)",
    "తెలుగు": "కాఫీ (రోబస్టా & అరేబికా)",
    "मराठी": "कॉफी (रोबस्टा आणि अरेबिका)",
    "বাংলা": "কফি (রোবাস্টা ও অ্যারাবিকা)",
  },
  "Apple (Royal Delicious)": {
    "हिन्दी": "सेब (रॉयल डिलीशियस)",
    "ಕನ್ನಡ": "ಸೇಬು (ರಾಯಲ್ ಡೆಲಿಶಿಯಸ್)",
    "தமிழ்": "ஆப்பிள் (ராயல் டெலிசியஸ்)",
    "తెలుగు": "యాపిల్ (రాయల్ డెలిషియస్)",
    "मराठी": "सफरचंद (रॉयल डेलिशियस)",
    "বাংলা": "আপেল (রয়্যাল ডেলিশিয়াস)",
  },

  // Categories
  "Historical Staple Cereal": {
    "हिन्दी": "ऐतिहासिक मुख्य अनाज",
    "ಕನ್ನಡ": "ಐತಿಹಾಸಿಕ ಪ್ರಮುಖ ಧಾನ್ಯ",
    "தமிழ்": "வரலாற்று முக்கிய தானியம்",
    "తెలుగు": "చారిత్రక ప్రధాన తృణధాన్యం",
    "मराठी": "ऐतिहासिक मुख्य धान्य",
    "বাংলা": "ঐতিহাসিক প্রধান শস্য",
  },
  "High-Yield Winter Oilseed": {
    "हिन्दी": "उच्च उपज वाली शीतकालीन तिलहन",
    "ಕನ್ನಡ": "ಹೆಚ್ಚಿನ ಇಳುವರಿ ಚಳಿಗಾಲದ ಎಣ್ಣೆಕಾಳು",
    "தமிழ்": "அதிக மகசூல் குளிர்கால எண்ணெய் வித்து",
    "తెలుగు": "అధిక దిగుబడి శీతాకాల నూనెగింజలు",
    "मराठी": "उच्च उत्पन्न देणारे हिवाळी गळित धान्य",
    "বাংলা": "উচ্চ ফলনশীল শীতকালীন তৈলবীজ",
  },
  "Peri-Urban Vegetable Belt": {
    "हिन्दी": "उपनगरीय सब्जी बेल्ट",
    "ಕನ್ನಡ": "ನಗರ ಸಮೀಪದ ತರಕಾರಿ ಪಟ್ಟಿ",
    "தமிழ்": "நகர்ப்புற புறநகர் காய்கறி மண்டலம்",
    "తెలుగు": "నగర శివారు కూరగాయల బెల్ట్",
    "मराठी": "उपनगरीय भाजीपाला पट्टा",
    "বাংলা": "শহরতলি সবজি বেল্ট",
  },
  "High-Protein Pulse": {
    "हिन्दी": "उच्च प्रोटीन दलहन",
    "ಕನ್ನಡ": "ಹೆಚ್ಚಿನ ಪ್ರೋಟೀನ್ ಕಾಳು",
    "தமிழ்": "அதிக புரத பருப்பு",
    "తెలుగు": "అధిక ప్రొటీన్ పప్పుధాన్యం",
    "मराठी": "उच्च प्रथिनयुक्त डाळ",
    "বাংলা": "উচ্চ প্রোটিন ডাল",
  },
  "Commercial Cash Crop": {
    "हिन्दी": "व्यावसायिक नकदी फसल",
    "ಕನ್ನಡ": "ವಾಣಿಜ್ಯ ನಗದು ಬೆಳೆ",
    "தமிழ்": "வணிக பணப்பயிர்",
    "తెలుగు": "వాణిజ్య నగదు పంట",
    "मराठी": "व्यावसायिक नगदी पीक",
    "বাংলা": "বাণিজ্যিক অর্থকরী ফসল",
  },
  "Traditional Native Staple": {
    "हिन्दी": "पारंपरिक स्थानीय मुख्य फसल",
    "ಕನ್ನಡ": "ಸಾಂಪ್ರದಾಯಿಕ ಸ್ಥಳೀಯ ಬೆಳೆ",
    "தமிழ்": "பாரம்பரிய பூர்வீக பயிர்",
    "తెలుగు": "సాంప్రదాయ స్థానిక ఆహారం",
    "मराठी": "पारंपारिक स्थानिक मुख्य पीक",
    "বাংলা": "ঐতিহ্যবাহী স্থানীয় প্রধান ফসল",
  },
  "Commercial Fiber & Textile": {
    "हिन्दी": "व्यावसायिक रेशा एवं कपड़ा फसल",
    "ಕನ್ನಡ": "ವಾಣಿಜ್ಯ ನಾರು ಮತ್ತು ಜವಳಿ ಬೆಳೆ",
    "தமிழ்": "வணிக நார் & ஜவுளி பயிர்",
    "తెలుగు": "వాణిజ్య నార & వస్త్ర పంట",
    "मराठी": "व्यावसायिक फायबर आणि कापड पीक",
    "বাংলা": "বাণিজ্যিক আঁশ ও বস্ত্র ফসল",
  },
  "Commercial Oilseed": {
    "हिन्दी": "व्यावसायिक तिलहन फसल",
    "ಕನ್ನಡ": "ವಾಣಿಜ್ಯ ಎಣ್ಣೆಕಾಳು ಬೆಳೆ",
    "தமிழ்": "வணிக எண்ணெய் வித்து",
    "తెలుగు": "వాణిజ్య నూనెగింజలు",
    "मराठी": "व्यावसायिक गळित धान्य",
    "বাংলা": "বাণিজ্যিক তৈলবীজ",
  },
  "High-Value Spice & Plantation": {
    "हिन्दी": "उच्च मूल्य मसाला एवं बागवानी",
    "ಕನ್ನಡ": "ಹೆಚ್ಚು ಮೌಲ್ಯದ ಮಸಾಲೆ ಮತ್ತು ತೋಟಗಾರಿಕೆ",
    "தமிழ்": "உயர் மதிப்பு மசாலா & தோட்டம்",
    "తెలుగు": "అధిక విలువైన సుగంధ ద్రవ్యాలు & తోటలు",
    "मराठी": "उच्च मूल्य मसाले आणि बागायती",
    "বাংলা": "উচ্চমূল্যের মশলা ও বাগান ফসল",
  },
  "Temperate Fruit & Orchard": {
    "हिन्दी": "शीतोष्ण फल एवं फलोद्यान",
    "ಕನ್ನಡ": "ಸಮಶೀತೋಷ್ಣ ಹಣ್ಣು ಮತ್ತು ತೋಟ",
    "தமிழ்": "குளிர் மிதவெப்ப பழங்கள் & தோட்டம்",
    "తెలుగు": "సమశీతోష్ణ పండ్లు & పండ్ల తోటలు",
    "मराठी": "समशीतोष्ण फळे आणि फळबाग",
    "বাংলা": "নাতিশীতোষ্ণ ফল ও ফলের বাগান",
  },

  // Seasons
  "Rabi (Nov–Apr)": {
    "हिन्दी": "रबी (नवंबर–अप्रैल)",
    "ಕನ್ನಡ": "ರಬಿ (ನವೆಂಬರ್–ಏಪ್ರಿಲ್)",
    "தமிழ்": "ரபி (நவம்பர்–ஏப்ரல்)",
    "తెలుగు": "రబీ (నవంబర్–ఏప్రిల్)",
    "मराठी": "रब्बी (नोव्हेंबर–एप्रिल)",
    "বাংলা": "রবি (নভেম্বর–এপ্রিল)",
  },
  "Rabi (Oct–Mar)": {
    "हिन्दी": "रबी (अक्टूबर–मार्च)",
    "ಕನ್ನಡ": "ರಬಿ (ಅಕ್ಟೋಬರ್–ಮಾರ್ಚ್)",
    "தமிழ்": "ரபி (அக்டோபர்–மார்ச்)",
    "తెలుగు": "రబీ (అక్టోబర్–మార్చి)",
    "मराठी": "रब्बी (ऑक्टोबर–मार्च)",
    "বাংলা": "রবি (অক্টোবর–মার্চ)",
  },
  "Kharif (Jun–Oct)": {
    "हिन्दी": "खरीफ (जून–अक्टूबर)",
    "ಕನ್ನಡ": "ಖಾರಿಫ್ (ಜೂನ್–ಅಕ್ಟೋಬರ್)",
    "தமிழ்": "காரீப் (ஜூன்–அக்டோபர்)",
    "తెలుగు": "ఖరీఫ్ (జూన్–అక్టోబర్)",
    "मराठी": "खरीप (जून–ऑक्टोबर)",
    "বাংলা": "খরিফ (জুন–অক্টোবর)",
  },
  "Rabi": {
    "हिन्दी": "रबी",
    "ಕನ್ನಡ": "ರಬಿ",
    "தமிழ்": "ரபி",
    "తెలుగు": "రబీ",
    "मराठी": "रब्बी",
    "বাংলা": "রবি",
  },
  "Kharif": {
    "हिन्दी": "खरीफ",
    "ಕನ್ನಡ": "ಖಾರಿಫ್",
    "தமிழ்": "காரீப்",
    "తెలుగు": "ఖరీఫ్",
    "मराठी": "खरीप",
    "বাংলা": "খরিফ",
  },
  "Zaid / Summer": {
    "हिन्दी": "जायद / ग्रीष्म",
    "ಕನ್ನಡ": "ಜೈದ್ / ಬೇಸಿಗೆ",
    "தமிழ்": "சையத் / கோடை",
    "తెలుగు": "జైద్ / వేసవి",
    "मराठी": "झैद / उन्हाळा",
    "বাংলা": "জায়েদ / গ্রীষ্ম",
  },
  "Summer": {
    "हिन्दी": "ग्रीष्मकालीन",
    "ಕನ್ನಡ": "ಬೇಸಿಗೆ",
    "தமிழ்": "கோடை",
    "తెలుగు": "వేసవి",
    "मराठी": "उन्हाळी",
    "বাংলা": "গ্রীষ্মকালীন",
  },
  "Perennial": {
    "हिन्दी": "बारहमासी",
    "ಕನ್ನಡ": "ಬಹುವಾರ್ಷಿಕ",
    "தமிழ்": "பல்லாண்டு பயிர்",
    "తెలుగు": "బహువార్షిక",
    "मराठी": "बारामाही",
    "বাংলা": "বারোমাসি",
  },
  "Kharif Season (Monsoon Crop)": {
    "हिन्दी": "खरीफ मौसम (मानसून फसल)",
    "ಕನ್ನಡ": "ಖಾರಿಫ್ ಋತು (ಮುಂಗಾರು ಬೆಳೆ)",
    "தமிழ்": "காரீப் பருவம் (பருவமழை பயிர்)",
    "తెలుగు": "ఖరీఫ్ సీజన్ (వర్షాకాల పంట)",
    "मराठी": "खरीप हंगाम (पावसाळी पीक)",
    "বাংলা": "খরিফ মরশুম (বর্ষাকালীন ফসল)",
  },
  "Rabi Season (Winter Crop)": {
    "हिन्दी": "रबी मौसम (शीतकालीन फसल)",
    "ಕನ್ನಡ": "ರಬಿ ಋತು (ಚಳಿಗಾಲದ ಬೆಳೆ)",
    "தமிழ்": "ரபி பருவம் (குளிர்கால பயிர்)",
    "తెలుగు": "రబీ సీజన్ (శీతాకాల పంట)",
    "मराठी": "रब्बी हंगाम (हिवाळी पीक)",
    "বাংলা": "রবি মরশুম (শীতকালীন ফসল)",
  },
  "Zaid / Summer Season (Pre-Monsoon)": {
    "हिन्दी": "जायद / ग्रीष्मकालीन मौसम (प्री-मानसून)",
    "ಕನ್ನಡ": "ಜೈದ್ / ಬೇಸಿಗೆ ಋತು (ಮುಂಗಾರು ಪೂರ್ವ)",
    "தமிழ்": "சையத் / கோடை பருவம் (பருவமழைக்கு முந்தைய)",
    "తెలుగు": "జైద్ / వేసవి సీజన్ (రుతుపవనాల ముందు)",
    "मराठी": "झैद / उन्हाळी हंगाम (पावसाळा पूर्व)",
    "বাংলা": "জায়েদ / গ্রীষ্মকালীন মরশুম (প্রাক-বর্ষা)",
  },

  // Soil Types
  "Indo-Gangetic Yamuna Alluvial Soil & Sandy Loam": {
    "हिन्दी": "सिंधु-गंगा यमुना जलोढ़ मृदा एवं बलुई दोमट",
    "ಕನ್ನಡ": "ಇಂಡೋ-ಗಂಗಾ ಯಮುನಾ ಮೆಕ್ಕಲು ಮಣ್ಣು ಮತ್ತು ಮರಳು ಜೇಡಿಮಣ್ಣು",
    "தமிழ்": "இண்டோ-கங்கை யமுனை வண்டல் மண் & மணல் களிமண்",
    "తెలుగు": "ఇండో-గంగా యమునా ఒండ్రు నేల & ఇసుక లోమ్",
    "मराठी": "सिंधू-गंगा यमुना गाळाची माती आणि वालुकामय पोयटा",
    "বাংলা": "সিন্ধু-গাঙ্গেয় যমুনা পলিমাটি ও বেলে দোআঁশ",
  },
  "Red Sandy Loam (Alfisol)": {
    "हिन्दी": "लाल बलुई दोमट मृदा (अल्फीसोल)",
    "ಕನ್ನಡ": "ಕೆಂಪು ಮರಳು ಜೇಡಿಮಣ್ಣು (ಆಲ್ಫಿಸೋಲ್)",
    "தமிழ்": "சிவப்பு மணல் கலந்த களிமண் (ஆல்பிசோல்)",
    "తెలుగు": "ఎర్ర ఇసుక లోమ్ (ఆల్ఫిసోల్)",
    "मराठी": "तांबडी वालुकामय पोयटा माती (अल्फीसोल)",
    "বাংলা": "লাল বেলে দোআঁশ মাটি (আলফিসল)",
  },
  "Deep Black Cotton Soil (Regur / Vertisol)": {
    "हिन्दी": "गहरी काली कपास मृदा (रेगुर / वर्टिसोल)",
    "ಕನ್ನಡ": "ಆಳವಾದ ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು (ರೆಗೂರ್ / ವರ್ಟಿಸೋಲ್)",
    "தமிழ்": "ஆழமான கரிசல் மண் (ரெகுர் / வெர்டிசோல்)",
    "తెలుగు": "లోతైన నల్లరేగడి నేల (రెగూర్ / వెర్టిసోల్)",
    "मराठी": "खोल काळी कापसाची माती (रेगूर / व्हर्टिसोल)",
    "বাংলা": "গভীর কালো তুলো মাটি (রেগুর / ভার্টিসল)",
  },
  "Indo-Gangetic Deep Alluvial Loam": {
    "हिन्दी": "सिंधु-गंगा गहरी जलोढ़ दोमट",
    "ಕನ್ನಡ": "ಇಂಡೋ-ಗಂಗಾ ಆಳವಾದ ಮೆಕ್ಕಲು ಜೇಡಿಮಣ್ಣು",
    "தமிழ்": "இண்டோ-கங்கை ஆழமான வண்டல் மண்",
    "తెలుగు": "ఇండో-గంగా లోతైన ఒండ్రు లోమ్",
    "मराठी": "सिंधू-गंगा खोल गाळाची पोयटा माती",
    "বাংলা": "সিন্ধু-গাঙ্গেয় গভীর পলি দোআঁশ",
  },
  "Gangetic Deep Fertile Alluvial Silt Loam": {
    "हिन्दी": "गंगा की गहरी उपजाऊ जलोढ़ गाद दोमट",
    "ಕನ್ನಡ": "ಗಂಗಾನದಿಯ ಆಳವಾದ ಫಲವತ್ತಾದ ಮೆಕ್ಕಲು ಹೂಳು ಮಣ್ಣು",
    "தமிழ்": "கங்கை ஆழமான வளமான வண்டல் மண்",
    "తెలుగు": "గంగా లోతైన సారవంతమైన ఒండ్రు సిల్ట్ లోమ్",
    "मराठी": "गंगेची खोल सुपीक गाळाची पोयटा माती",
    "বাংলা": "গাঙ্গেয় গভীর উর্বর পলিমাটি",
  },
  "Deltaic Alluvial & Red Sandy Loam": {
    "हिन्दी": "डेल्टाई जलोढ़ एवं लाल बलुई दोमट",
    "ಕನ್ನಡ": "ಡೆಲ್ಟಾ ಮೆಕ್ಕಲು ಮತ್ತು ಕೆಂಪು ಮರಳು ಜೇಡಿಮಣ್ಣು",
    "தமிழ்": "டெல்டா வண்டல் & சிவப்பு மணல் களிமண்",
    "తెలుగు": "డెల్టా ఒండ్రు & ఎర్ర ఇసుక లోమ్",
    "मराठी": "त्रिभुज प्रदेशातील गाळ आणि तांबडी माती",
    "বাংলা": "বদ্বীপ পলি ও লাল বেলে দোআঁশ",
  },
  "Ganga-Brahmaputra Deltaic Alluvial Soil": {
    "हिन्दी": "गंगा-ब्रह्मपुत्र डेल्टाई जलोढ़ मृदा",
    "ಕನ್ನಡ": "ಗಂಗಾ-ಬ್ರಹ್ಮಪುತ್ರ ಡೆಲ್ಟಾ ಮೆಕ್ಕಲು ಮಣ್ಣು",
    "தமிழ்": "கங்கை-பிரம்மபுத்திரா டெல்டா வண்டல் மண்",
    "తెలుగు": "గంగా-బ్రహ్మపుత్ర డెల్టా ఒండ్రు నేల",
    "मराठी": "गंगा-ब्रह्मपुत्रा त्रिभुज प्रदेशातील गाळाची माती",
    "বাংলা": "গঙ্গা-ব্রহ্মপুত্র বদ্বীপ পলিমাটি",
  },
  "Arid Desert Sandy Soil (Aridisol)": {
    "हिन्दी": "शुष्क मरुस्थलीय रेतीली मृदा (एरिडिसोल)",
    "ಕನ್ನಡ": "ಶುಷ್ಕ ಮರುಭೂಮಿ ಮರಳು ಮಣ್ಣು (ಅರಿಡಿಸೋಲ್)",
    "தமிழ்": "வறண்ட பாலைவன மணல் மண் (அரிடிசோல்)",
    "తెలుగు": "శుష్క ఎడారి ఇసుక నేల (అరిడిసోల్)",
    "मराठी": "शुष्क वाळवंटी वालुकामय माती (अ‍ॅरिडिसोल)",
    "বাংলা": "শুষ্ক মরুভূমির বেলে মাটি (অ্যারিডিসল)",
  },
  "Humid Laterite & Coastal Alluvium": {
    "हिन्दी": "आर्द्र लैटेराइट एवं तटीय जलोढ़",
    "ಕನ್ನಡ": "ಆರ್ದ್ರ ಲ್ಯಾಟರೈಟ್ ಮತ್ತು ಕರಾವಳಿ ಮೆಕ್ಕಲು",
    "தமிழ்": "ஈரப்பதமான செம்மண் & கடலோர வண்டல்",
    "తెలుగు": "తేమతో కూడిన లేటరైట్ & తీరప్రాంత ఒండ్రు",
    "मराठी": "दमट जांभा आणि किनारपट्टीवरील गाळाची माती",
    "বাংলা": "আর্দ্র ল্যাটেরাইট ও উপকূলীয় পলিমাটি",
  },
  "Mountain Brown Forest Soil (Podzolic)": {
    "हिन्दी": "पर्वतीय भूरी वन मृदा (पॉडजोलिक)",
    "ಕನ್ನಡ": "ಪರ್ವತದ ಕಂದು ಅರಣ್ಯ ಮಣ್ಣು (ಪಾಡ್ಜೋಲಿಕ್)",
    "தமிழ்": "மலை பழுப்பு வன மண் (பாட்சோலிக்)",
    "తెలుగు": "పర్వత గోధుమ అటవీ నేల (పాడ్జోలిక్)",
    "मराठी": "पर्वतीय तपकिरी वन माती (पॉडझोलिक)",
    "বাংলা": "পার্বত্য বাদামী বন মৃত্তিকা (পডজলিক)",
  },
  "Fertile Alluvial Agricultural Loam": {
    "हिन्दी": "उपजाऊ जलोढ़ कृषि दोमट",
    "ಕನ್ನಡ": "ಫಲವತ್ತಾದ ಮೆಕ್ಕಲು ಕೃಷಿ ಜೇಡಿಮಣ್ಣು",
    "தமிழ்": "வளமான வண்டல் விவசாய மண்",
    "తెలుగు": "సారవంతమైన ఒండ్రు వ్యవసాయ లోమ్",
    "मराठी": "सुपीक गाळाची शेतीयोग्य पोयटा माती",
    "বাংলা": "উর্বর পলিযুক্ত কৃষি দোআঁশ",
  },

  // Soil Textures & pH Ranges
  "7.2 – 8.2 (Neutral to Mildly Alkaline)": {
    "हिन्दी": "7.2 – 8.2 (तटस्थ से हल्का क्षारीय)",
    "ಕನ್ನಡ": "7.2 – 8.2 (ತಟಸ್ಥದಿಂದ ಸ್ವಲ್ಪ ಕ್ಷಾರೀಯ)",
    "தமிழ்": "7.2 – 8.2 (நடுநிலை முதல் மிதமான காரத்தன்மை)",
    "తెలుగు": "7.2 – 8.2 (తటస్థం నుండి కొద్దిగా క్షారయుతం)",
    "मराठी": "7.2 – 8.2 (तटस्थ ते सौम्य अल्कधर्मी)",
    "বাংলা": "৭.২ – ৮.২ (নিরপেক্ষ থেকে মৃদু ক্ষারীয়)",
  },
  "5.8 – 6.8 (Slightly Acidic to Neutral)": {
    "हिन्दी": "5.8 – 6.8 (हल्का अम्लीय से तटस्थ)",
    "ಕನ್ನಡ": "5.8 – 6.8 (ಸ್ವಲ್ಪ ಆಮ್ಲೀಯದಿಂದ ತಟಸ್ಥ)",
    "தமிழ்": "5.8 – 6.8 (சற்று அமிலத்தன்மை முதல் நடுநிலை)",
    "తెలుగు": "5.8 – 6.8 (కొద్దిగా ఆమ్లత్వం నుండి తటస్థం)",
    "मराठी": "5.8 – 6.8 (किंचित आम्लधर्मी ते तटस्थ)",
    "বাংলা": "৫.৮ – ৬.৮ (সামান্য অম্লীয় থেকে নিরপেক্ষ)",
  },
  "7.2 – 8.5 (Mildly Alkaline)": {
    "हिन्दी": "7.2 – 8.5 (हल्का क्षारीय)",
    "ಕನ್ನಡ": "7.2 – 8.5 (ಸ್ವಲ್ಪ ಕ್ಷಾರೀಯ)",
    "தமிழ்": "7.2 – 8.5 (மிதமான காரத்தன்மை)",
    "తెలుగు": "7.2 – 8.5 (కొద్దిగా క్షారయుతం)",
    "मराठी": "7.2 – 8.5 (सौम्य अल्कधर्मी)",
    "বাংলা": "৭.২ – ৮.৫ (মৃদু ক্ষারীয়)",
  },
  "6.8 – 7.8 (Balanced Neutral)": {
    "हिन्दी": "6.8 – 7.8 (संतुलित तटस्थ)",
    "ಕನ್ನಡ": "6.8 – 7.8 (ಸಮತೋಲಿತ ತಟಸ್ಥ)",
    "தமிழ்": "6.8 – 7.8 (சமச்சீர் நடுநிலை)",
    "తెలుగు": "6.8 – 7.8 (సమతుల్య తటస్థం)",
    "मराठी": "6.8 – 7.8 (संतुलित तटस्थ)",
    "বাংলা": "৬.৮ – ৭.৮ (ভারসাম্যপূর্ণ নিরপেক্ষ)",
  },
  "Medium Silt Loam & Sandy Clay Loam (Yamuna River Floodplain)": {
    "हिन्दी": "मध्यम गाद दोमट एवं बलुई चिकनी दोमट (यमुना कछार)",
    "ಕನ್ನಡ": "ಮಧ್ಯಮ ಹೂಳು ಜೇಡಿಮಣ್ಣು ಮತ್ತು ಮರಳು ಜೇಡಿಮಣ್ಣು (ಯಮುನಾ ಪ್ರವಾಹ ಬಯಲು)",
    "தமிழ்": "நடுத்தர வண்டல் களிமண் & மணல் களிமண் (யமுனை ஆற்றுப்படுகை)",
    "తెలుగు": "మధ్యస్థ సిల్ట్ లోమ్ & ఇసుక బంకమట్టి లోమ్ (యమునా వరద మైదానం)",
    "मराठी": "मध्यम पोयटा माती आणि वालुकामय चिकणमाती (यमुना पूर मैदान)",
    "বাংলা": "মাঝারি পলি দোআঁশ ও বেলে এঁটেল দোআঁশ (যমুনা প্লাবনভূমি)",
  },
  "Medium Coarse Loam with good aeration": {
    "हिन्दी": "अच्छे वायु-संचार वाली मध्यम खुरदरी दोमट",
    "ಕನ್ನಡ": "ಉತ್ತಮ ವಾತಾಯನ ಹೊಂದಿರುವ ಮಧ್ಯಮ ಒರಟು ಜೇಡಿಮಣ್ಣು",
    "தமிழ்": "நல்ல காற்றோட்டத்துடன் கூடிய நடுத்தர கடினமான மண்",
    "తెలుగు": "మంచి గాలి ప్రసరణతో మధ్యస్థ ముతక లోమ్",
    "मराठी": "चांगले हवा खेळती असलेली मध्यम खडबडीत पोयटा माती",
    "বাংলা": "ভালো বায়ু চলাচল সহ মাঝারি দানাদার দোআঁশ",
  },
  "Medium (0.45% – 0.65%)": {
    "हिन्दी": "मध्यम (0.45% – 0.65%)",
    "ಕನ್ನಡ": "ಮಧ್ಯಮ (0.45% – 0.65%)",
    "தமிழ்": "நடுத்தர (0.45% – 0.65%)",
    "తెలుగు": "మధ్యస్థం (0.45% – 0.65%)",
    "मराठी": "मध्यम (0.45% – 0.65%)",
    "বাংলা": "মাঝারি (০.৪৫% – ০.৬৫%)",
  },
  "Well-drained with balanced water permeability": {
    "हिन्दी": "संतुलित जल पारगम्यता के साथ उत्तम जल निकासी",
    "ಕನ್ನಡ": "ಸಮತೋಲಿತ ನೀರು ಪ್ರವೇಶ್ಯತೆಯೊಂದಿಗೆ ಉತ್ತಮ ಒಳಚರಂಡಿ",
    "தமிழ்": "சமச்சீர் நீர் ஊடுருவலுடன் கூடிய நல்ல வடிகால்",
    "తెలుగు": "సమతుల్య నీటి పారగమ్యతతో మంచి డ్రైనేజీ",
    "मराठी": "संतुलित पाणी पारगम्यतेसह उत्तम निचरा",
    "বাংলা": "ভারসাম্যপূর্ণ পানি প্রবেশ্যতা সহ সুনিষ্কাশিত",
  },
  "Well-drained (minimal waterlogging risk)": {
    "हिन्दी": "उत्तम जल निकासी (जलभराव का न्यूनतम जोखिम)",
    "ಕನ್ನಡ": "ಉತ್ತಮ ಒಳಚರಂಡಿ (ಕನಿಷ್ಠ ನೀರು ನಿಲ್ಲುವ ಅಪಾಯ)",
    "தமிழ்": "நல்ல வடிகால் (குறைந்த நீர் தேங்கும் ஆபத்து)",
    "తెలుగు": "మంచి డ్రైనేజీ (కనీస నీరు నిలిచే ప్రమాదం)",
    "मराठी": "उत्तम निचरा (किमान पाणी साचण्याचा धोका)",
    "বাংলা": "সুনিষ্কাশিত (ন্যূনতম জলাবদ্ধতার ঝুঁকি)",
  },
  "Sowing, Tillering & Grain Filling Stage": {
    "हिन्दी": "बुवाई, कल्ले निकलना एवं दाना भराव अवस्था",
    "ಕನ್ನಡ": "ಬಿತ್ತನೆ, ಚಿಗುರುವಿಕೆ ಮತ್ತು ಕಾಳು ತುಂಬುವ ಹಂತ",
    "தமிழ்": "விதைத்தல், தூர்கட்டுதல் & தானியம் நிரப்பும் நிலை",
    "తెలుగు": "విత్తనం వేయడం, పిలకలు రావడం & గింజ నిండే దశ",
    "मराठी": "पेरणी, फुटवे फुटणे आणि दाणे भरण्याची अवस्था",
    "বাংলা": "বপন, কুশি গজানো ও দানা ভরাট পর্যায়",
  },
  "Vegetative Growth & Maturation Stage": {
    "हिन्दी": "वानस्पतिक वृद्धि एवं परिपक्वता अवस्था",
    "ಕನ್ನಡ": "ಸಸ್ಯಕ ಬೆಳವಣಿಗೆ ಮತ್ತು ಪಕ್ವತೆಯ ಹಂತ",
    "தமிழ்": "தாவர வளர்ச்சி & முதிர்வு நிலை",
    "తెలుగు": "శాకీయ పెరుగుదల & పరిపక్వత దశ",
    "मराठी": "शाकीय वाढ आणि परिपक्वता अवस्था",
    "বাংলা": "অঙ্গজ বৃদ্ধি ও পরিপক্কতা পর্যায়",
  },
  "Short Duration & Horticulture Crop Cycle": {
    "हिन्दी": "अल्पकालिक एवं उद्यानिकी फसल चक्र",
    "ಕನ್ನಡ": "ಅಲ್ಪಾವಧಿ ಮತ್ತು ತೋಟಗಾರಿಕೆ ಬೆಳೆ ಚಕ್ರ",
    "தமிழ்": "குறுகிய கால & தோட்டக்கலை பயிர் சுழற்சி",
    "తెలుగు": "స్వల్పకాలిక & ఉద్యానవన పంట చక్రం",
    "मराठी": "अल्पकालीन आणि बागायती पीक चक्र",
    "বাংলা": "স্বল্পমেয়াদী ও উদ্যান ফসল চক্র",
  },
  "October to April (Post-Monsoon & Winter)": {
    "हिन्दी": "अक्टूबर से अप्रैल (मानसून पश्चात एवं शीतकाल)",
    "ಕನ್ನಡ": "ಅಕ್ಟೋಬರ್‌ನಿಂದ ಏಪ್ರಿಲ್ (ಮುಂಗಾರು ನಂತರ ಮತ್ತು ಚಳಿಗಾಲ)",
    "தமிழ்": "அக்டோபர் முதல் ஏப்ரல் (பருவமழைக்கு பிந்தைய & குளிர்காலம்)",
    "తెలుగు": "అక్టోబర్ నుండి ఏప్రిల్ (రుతుపవనాల అనంతరం & శీతాకాలం)",
    "मराठी": "ऑक्टोबर ते एप्रिल (पावसाळ्यानंतर आणि हिवाळा)",
    "বাংলা": "অক্টোবর থেকে এপ্রিল (বর্ষা-পরবর্তী ও শীতকাল)",
  },
  "June to October (Southwest Monsoon)": {
    "हिन्दी": "जून से अक्टूबर (दक्षिण-पश्चिम मानसून)",
    "ಕನ್ನಡ": "ಜೂನ್‌ನಿಂದ ಅಕ್ಟೋಬರ್ (ನೈಋತ್ಯ ಮಾನ್ಸೂನ್)",
    "தமிழ்": "ஜூன் முதல் அக்டோபர் (தென்மேற்கு பருவமழை)",
    "తెలుగు": "జూన్ నుండి అక్టోబర్ (నైరుతి రుతుపవనాలు)",
    "मराठी": "जून ते ऑक्टोबर (नैऋत्य मान्सून)",
    "বাংলা": "জুন থেকে অক্টোবর (দক্ষিণ-পশ্চিম মৌসুমি বায়ু)",
  },
  "March to June (Summer Irrigated)": {
    "हिन्दी": "मार्च से जून (ग्रीष्मकालीन सिंचित)",
    "ಕನ್ನಡ": "ಮಾರ್ಚ್‌ನಿಂದ ಜೂನ್ (ಬೇಸಿಗೆ ನೀರಾವರಿ)",
    "தமிழ்": "மார்ச் முதல் ஜூன் (கோடை பாசனம்)",
    "తెలుగు": "మార్చి నుండి జూన్ (వేసవి నీటిపారుదల)",
    "मराठी": "मार्च ते जून (उन्हाळी बागायत)",
    "বাংলা": "মার্চ থেকে জুন (গ্রীষ্মকালীন সেচ)",
  },
};

export function translateCropText(text, language = "English") {
  if (!text || language === "English") return text || "";
  const raw = String(text).trim();
  if (typeof AGRI_TRANSLATIONS_MAP !== "undefined" && AGRI_TRANSLATIONS_MAP[raw] && AGRI_TRANSLATIONS_MAP[raw][language]) {
    return AGRI_TRANSLATIONS_MAP[raw][language];
  }
  if (CROPS_TRANSLATION_MAP[raw] && CROPS_TRANSLATION_MAP[raw][language]) {
    return CROPS_TRANSLATION_MAP[raw][language];
  }
  if (typeof AGRI_TRANSLATIONS_MAP !== "undefined") {
    for (const [key, map] of Object.entries(AGRI_TRANSLATIONS_MAP)) {
      if (raw.toLowerCase() === key.toLowerCase() && map[language]) {
        return map[language];
      }
    }
  }
  for (const [key, map] of Object.entries(CROPS_TRANSLATION_MAP)) {
    if (raw.toLowerCase() === key.toLowerCase() && map[language]) {
      return map[language];
    }
  }
  // Try partial phrase replacement
  let translated = raw;
  if (typeof AGRI_TRANSLATIONS_MAP !== "undefined") {
    for (const [key, map] of Object.entries(AGRI_TRANSLATIONS_MAP)) {
      if (map[language] && translated.includes(key)) {
        translated = translated.replaceAll(key, map[language]);
      }
    }
  }
  for (const [key, map] of Object.entries(CROPS_TRANSLATION_MAP)) {
    if (map[language] && translated.includes(key)) {
      translated = translated.replaceAll(key, map[language]);
    }
  }
  return translated;
}

// ====================================================
// ADVISORY SENTENCES TRANSLATION
// ====================================================
export function translateAdvisorySentence(text, language = "English") {
  if (!text || language === "English") return text || "";
  const raw = String(text);
  // Smart City Dynamic Recommendation
  const smartCityMatch = raw.match(/Urban Comfort Index:\s*([^(\n]+?)\s*\(Apparent Temp\s*([\d.]+)°?C\)\.\s*Drainage system load:\s*([^.\n]+?)\.\s*Air Quality Status:\s*([^.\n]+?)\.?$/i);
  if (smartCityMatch) {
    const comfort = translateStatus(smartCityMatch[1].trim(), language);
    const temp = smartCityMatch[2];
    const load = translateStatus(smartCityMatch[3].trim(), language);
    const aqi = translateStatus(smartCityMatch[4].trim(), language);
    const m = {
      "हिन्दी": `शहरी आराम सूचकांक: ${comfort} (आभासी तापमान ${temp}°C)। जल निकासी प्रणाली भार: ${load}। वायु गुणवत्ता स्थिति: ${aqi}।`,
      "ಕನ್ನಡ": `ನಗರ ಸೌಕರ್ಯ ಸೂಚ್ಯಂಕ: ${comfort} (ಗೋಚರ ತಾಪಮಾನ ${temp}°C). ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆಯ ಹೊರೆ: ${load}. ಗಾಳಿಯ ಗುಣಮಟ್ಟ ಸ್ಥಿತಿ: ${aqi}.`,
      "தமிழ்": `நகர்ப்புற வசதி குறியீடு: ${comfort} (வெளிப்படையான வெப்பநிலை ${temp}°C). வடிகால் அமைப்பு சுமை: ${load}. காற்றின் தர நிலை: ${aqi}.`,
      "తెలుగు": `నగర సౌకర్య సూచిక: ${comfort} (స్పష్టమైన ఉష్ణోగ్రత ${temp}°C). డ్రైనేజీ వ్యవస్థ భారం: ${load}. గాలి నాణ్యత స్థితి: ${aqi}.`,
      "मराठी": `शहरी आराम निर्देशांक: ${comfort} (भासमान तापमान ${temp}°C). निचरा प्रणालीचा भार: ${load}. हवेची गुणवत्ता स्थिती: ${aqi}.`,
      "বাংলা": `শহুরে স্বাচ্ছন্দ্য সূচক: ${comfort} (অনুভূত তাপমাত্রা ${temp}°C)। নিষ্কাশন ব্যবস্থার লোড: ${load}। বায়ুর গুণমান অবস্থা: ${aqi}।`
    };
    return m[language] || text;
  }

  // Marine Safe Conditions
  const marineSafeMatch = raw.match(/Calm to moderate sea state\.\s*Coastal winds\s*([\d.]+)\s*knots\.\s*Safe for traditional artisanal fishing craft and offshore operations\./i);
  if (marineSafeMatch) {
    const knots = marineSafeMatch[1];
    const m = {
      "हिन्दी": `शांत से मध्यम समुद्र स्थिति। तटीय हवाएँ ${knots} नॉट्स। पारंपरिक मछली पकड़ने वाली नौकाओं और अपतटीय कार्यों के लिए सुरक्षित।`,
      "ಕನ್ನಡ": `ಶಾಂತದಿಂದ ಮಧ್ಯಮ ಸಮುದ್ರ ಸ್ಥಿತಿ. ಕರಾವಳಿ ಗಾಳಿ ${knots} ನಾಟ್ಸ್. ಸಾಂಪ್ರದಾಯಿಕ ಮೀನುಗಾರಿಕೆ ದೋಣಿಗಳು ಮತ್ತು ಕಡಲಾಚೆಯ ಕಾರ್ಯಾಚರಣೆಗಳಿಗೆ ಸುರಕ್ಷಿತ.`,
      "தமிழ்": `அமைதியான முதல் மிதமான கடல் நிலை. கடலோர காற்று ${knots} நாட்ஸ். பாரம்பரிய மீன்பிடி படகுகள் மற்றும் கடல்சார் பணிகளுக்கு பாதுகாப்பானது.`,
      "తెలుగు": `ప్రశాంతమైన నుండి మధ్యస్థ సముద్ర స్థితి. తీరప్రాంత గాలులు ${knots} నాట్స్. సాంప్రదాయ చేపల వేట పడవలు మరియు సముద్రపు కార్యకలాపాలకు సురక్షితం.`,
      "मराठी": `शांत ते मध्यम समुद्राची स्थिती. किनारपट्टीवरील वारे ${knots} नॉट्स. पारंपरिक मासेमारी नौका आणि ऑफशोअर कामकाजासाठी सुरक्षित.`,
      "বাংলা": `শান্ত থেকে মাঝারি সমুদ্র অবস্থা। উপকূলীয় বাতাস ${knots} নটস। ঐতিহ্যবাহী মাছ ধরার নৌকা এবং উপকূলীয় কার্যক্রমের জন্য নিরাপদ।`
    };
    return m[language] || text;
  }

  // Marine Rough Warning
  const marineRoughMatch = raw.match(/Rough sea condition warning\.\s*Wind gusts up to\s*([\d.]+)\s*knots\.\s*Small craft advisory in effect\.\s*Fishermen are advised not to venture into deep sea\./i);
  if (marineRoughMatch) {
    const knots = marineRoughMatch[1];
    const m = {
      "हिन्दी": `अशांत समुद्र स्थिति चेतावनी। हवा के झोंके ${knots} नॉट्स तक। छोटी नौकाओं के लिए सलाह प्रभावी। मछुआरों को गहरे समुद्र में न जाने की सलाह दी जाती है।`,
      "ಕನ್ನಡ": `ಪ್ರಕ್ಷುಬ್ಧ ಸಮುದ್ರ ಸ್ಥಿತಿ ಎಚ್ಚರಿಕೆ. ಗಾಳಿಯ ವೇಗ ${knots} ನಾಟ್ಸ್‌ವರೆಗೆ. ಸಣ್ಣ ದೋಣಿಗಳ ಎಚ್ಚರಿಕೆ ಜಾರಿಯಲ್ಲಿದೆ. ಮೀನುಗಾರರು ಆಳ ಸಮುದ್ರಕ್ಕೆ ಇಳಿಯದಂತೆ ಸೂಚಿಸಲಾಗಿದೆ.`,
      "தமிழ்": `கொந்தளிப்பான கடல் நிலை எச்சரிக்கை. காற்றின் வேகம் ${knots} நாட்ஸ் வரை. சிறிய படகுகளுக்கான எச்சரிக்கை நடைமுறையில் உள்ளது. மீனவர்கள் ஆழ்கடலுக்கு செல்ல வேண்டாம் என அறிவுறுத்தப்படுகிறார்கள்.`,
      "తెలుగు": `ప్రమాదకరమైన సముద్ర స్థితి హెచ్చరిక. గాలుల వేగం ${knots} నాట్స్ వరకు. చిన్న పడవల హెచ్చరిక అమలులో ఉంది. మత్స్యకారులు లోతైన సముద్రంలోకి వెళ్లవద్దని సూచించడమైనది.`,
      "मराठी": `खवळलेल्या समुद्राची चेतावणी. वाऱ्याचा वेग ${knots} नॉट्सपर्यंत. लहान बोटींसाठी सूचना लागू. मच्छीमारांनी खोल समुद्रात न जाण्याचा सल्ला देण्यात आला आहे.`,
      "বাংলা": `উত্তাল সমুদ্রের সতর্কবার্তা। বাতাসের দমকা ${knots} নটস পর্যন্ত। ছোট নৌকার জন্য সতর্কতা জারি। মৎস্যজীবীদের গভীর সমুদ্রে না যাওয়ার পরামর্শ দেওয়া হচ্ছে।`
    };
    return m[language] || text;
  }

  // Aviation VFR
  const vfrMatch = raw.match(/Visual Flight Rules \(VFR\) operable in\s*(.+?)\s*airspace\.\s*Surface wind\s*([\d.]+)\s*kts,\s*visibility\s*([\d.]+)\s*km\./i);
  if (vfrMatch) {
    const loc = translateRegionName(vfrMatch[1].trim(), language);
    const wind = vfrMatch[2];
    const vis = vfrMatch[3];
    const m = {
      "हिन्दी": `${loc} के हवाई क्षेत्र में दृश्य उड़ान नियम (VFR) संचालन योग्य हैं। सतही हवा ${wind} नॉट्स, दृश्यता ${vis} किमी। सुरक्षित उड़ान स्थितियाँ।`,
      "ಕನ್ನಡ": `${loc} ವಾಯುಪ್ರದೇಶದಲ್ಲಿ ದೃಶ್ಯ ಹಾರಾಟ ನಿಯಮಗಳು (VFR) ಕಾರ್ಯನಿರ್ವಹಿಸಲು ಯೋಗ್ಯವಾಗಿವೆ. ಮೇಲ್ಮೈ ಗಾಳಿ ${wind} ನಾಟ್ಸ್, ಗೋಚರತೆ ${vis} ಕಿಮೀ.`,
      "தமிழ்": `${loc} வான்வெளியில் பார்வை விமான விதிகள் (VFR) செயல்பட உகந்ததாக உள்ளன. தரைக்காற்று ${wind} நாட்ஸ், பார்வைத்திறன் ${vis} கிமீ.`,
      "తెలుగు": `${loc} గగనతలంలో విజువల్ ఫ్లైట్ రూల్స్ (VFR) పనిచేయడానికి అనుకూలంగా ఉన్నాయి. ఉపరితల గాలి ${wind} నాట్స్, దృశ్యమానత ${vis} కిమీ.`,
      "मराठी": `${loc} च्या हवाई क्षेत्रात व्हिज्युअल फ्लाइट नियम (VFR) कार्यक्षम आहेत. जमिनीवरील वारे ${wind} नॉट्स, दृश्यमानता ${vis} किमी.`,
      "বাংলা": `${loc} আকাশসীমায় ভিজ্যুয়াল ফ্লাইট রুলস (VFR) পরিচালনার জন্য উপযুক্ত। ভূপৃষ্ঠের বাতাস ${wind} নটস, দৃশ্যমানতা ${vis} কিমি।`
    };
    return m[language] || text;
  }

  // Aviation IFR
  const ifrMatch = raw.match(/Instrument Flight Rules \(IFR \/ MVFR\) in effect\.\s*Reduced visibility\s*\(([\d.]+)\s*km\)\s*and crosswinds require standard instrument approach procedures\./i);
  if (ifrMatch) {
    const vis = ifrMatch[1];
    const m = {
      "हिन्दी": `उपकरण उड़ान नियम (IFR / MVFR) प्रभावी हैं। कम दृश्यता (${vis} किमी) और क्रॉसविंड के कारण मानक प्रक्रियाओं का पालन करें।`,
      "ಕನ್ನಡ": `ಉಪಕರಣ ಹಾರಾಟ ನಿಯಮಗಳು (IFR / MVFR) ಜಾರಿಯಲ್ಲಿವೆ. ಕಡಿಮೆ ಗೋಚರತೆ (${vis} ಕಿಮೀ) ಮತ್ತು ಕ್ರಾಸ್‌ವಿಂಡ್‌ಗಳಿಂದಾಗಿ ಮುನ್ನೆಚ್ಚರಿಕೆ ಅಗತ್ಯ.`,
      "தமிழ்": `கருவி விமான விதிகள் (IFR / MVFR) நடைமுறையில் உள்ளன. குறைக்கப்பட்ட பார்வைத்திறன் (${vis} கிமீ) மற்றும் குறுக்குக்காற்று காரணமாக எச்சரிக்கை தேவை.`,
      "తెలుగు": `ఇన్‌స్ట్రుమెంట్ ఫ్లైట్ రూల్స్ (IFR / MVFR) అమలులో ఉన్నాయి. తగ్గిన దృశ్యమానత (${vis} కిమీ) మరియు క్రాస్‌విండ్‌ల దృష్ట్యా ప్రామాణిక విధానాలు పాటించండి.`,
      "मराठी": `इन्स्ट्रुमेंट फ्लाइट नियम (IFR / MVFR) लागू आहेत. कमी दृश्यमानता (${vis} किमी) आणि क्रॉसविंडमुळे प्रमाणित प्रक्रियेचे पालन करा.`,
      "বাংলা": `ইনস্ট্রুমেন্ট ফ্লাইট রুলস (IFR / MVFR) কার্যকর রয়েছে। কম দৃশ্যমানতা (${vis} কিমি) এবং তীব্র বাতাসের কারণে সতর্কতা অবলম্বন করুন।`
    };
    return m[language] || text;
  }

  if (raw.includes("Favorable conditions for pesticide") || raw.includes("fertilizer application")) {
    const maps = {
      "हिन्दी": "कीटनाशक एवं उर्वरक छिड़काव के लिए अनुकूल मौसम परिस्थितियाँ हैं। अनुशंसित समय: सुबह (06:00 - 09:00) या देर शाम (16:00 - 18:30)।",
      "ಕನ್ನಡ": "ಕೀಟನಾಶಕ ಮತ್ತು ರಸಗೊಬ್ಬರ ಸಿಂಪಡಣೆಗೆ ಅನುಕೂಲಕರ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳಿವೆ. ಶಿಫಾರಸು ಮಾಡಿದ ಸಮಯ: ಮುಂಜಾನೆ (06:00 - 09:00) ಅಥವಾ ಸಂಜೆ (16:00 - 18:30).",
      "தமிழ்": "பூச்சிக்கொல்லி மற்றும் உரமிடுவதற்கு சாதகமான வானிலை நிலவுகிறது. பரிந்துரைக்கப்பட்ட நேரம்: அதிகாலை (06:00 - 09:00) அல்லது மாலை (16:00 - 18:30).",
      "తెలుగు": "పురుగుమందులు మరియు ఎరువుల పిచికారీకి అనుకూలమైన వాతావరణ పరిస్థితులు ఉన్నాయి. సిఫార్సు చేయబడిన సమయం: ఉదయం (06:00 - 09:00) లేదా సాయంత్రం (16:00 - 18:30).",
      "मराठी": "कीटकनाशक आणि खत फवारणीसाठी अनुकूल हवामान परिस्थिती आहे. शिफारस केलेली वेळ: सकाळ (06:00 - 09:00) किंवा संध्याकाळ (16:00 - 18:30).",
      "বাংলা": "কীটনাশক এবং সার প্রয়োগের জন্য অনুকূল আবহাওয়া রয়েছে। প্রস্তাবিত সময়: সকাল (০৬:০০ - ০৯:০০) বা বিকেল (১৬:০০ - ১৮:৩০)।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Postpone pesticide") || raw.includes("herbicide application")) {
    const maps = {
      "हिन्दी": "कीटनाशक एवं खरपतवारनाशी का छिड़काव स्थगित करें। प्रतिकूल मौसम से छिड़काव के बहाव और रसायन के धुलने का उच्च जोखिम है।",
      "ಕನ್ನಡ": "ಕೀಟನಾಶಕ ಮತ್ತು ಕಳೆನಾಶಕ ಸಿಂಪಡಣೆಯನ್ನು ಮುಂದೂಡಿ. ಪ್ರತಿಕೂಲ ಪರಿಸ್ಥಿತಿಗಳು ಸಿಂಪಡಣೆ ವ್ಯರ್ಥವಾಗುವ ಮತ್ತು ಕೊಚ್ಚಿಹೋಗುವ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತವೆ.",
      "தமிழ்": "பூச்சிக்கொல்லி தெளிப்பதை ஒத்திவைக்கவும். பாதகமான வானிலை மருந்து அடித்துச் செல்லப்படும் அபாயத்தை அதிகரிக்கிறது.",
      "తెలుగు": "పురుగుమందుల పిచికారీని వాయిదా వేయండి. ప్రతికూల పరిస్థితులు మందు కొట్టుకుపోయే ప్రమాదాన్ని పెంచుతాయి.",
      "मराठी": "कीटकनाशक फवारणी पुढे ढकला. प्रतिकूल हवामानामुळे फवारणी वाहून जाण्याचा धोका वाढतो.",
      "বাংলা": "কীটনাশক প্রয়োগ স্থগিত রাখুন। প্রতিকূল আবহাওয়া রাসায়নিক ধুয়ে যাওয়ার ঝুঁকি বাড়ায়।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Hold irrigation")) {
    const maps = {
      "हिन्दी": "सिंचाई रोकें: हाल ही में हुई या आने वाली वर्षा मिट्टी में पर्याप्त नमी प्रदान करती है।",
      "ಕನ್ನಡ": "ನೀರಾವರಿ ನಿಲ್ಲಿಸಿ: ಇತ್ತೀಚಿನ ಅಥವಾ ಮುಂಬರುವ ಮಳೆಯು ಮಣ್ಣಿಗೆ ಸಾಕಷ್ಟು ತೇವಾಂಶವನ್ನು ನೀಡುತ್ತದೆ.",
      "தமிழ்": "பாசனத்தை நிறுத்துங்கள்: சமீபத்திய அல்லது வரவிருக்கும் மழை மண்ணில் போதுமான ஈரப்பதத்தை அளிக்கிறது.",
      "తెలుగు": "నీటిపారుదలని నిలిపివేయండి: ఇటీవల కురిసిన లేదా రాబోయే వర్షం నేలలో తగినంత తేమను అందిస్తుంది.",
      "मराठी": "सिंचन थांबवा: अलीकडील किंवा येणारा पाऊस मातीमध्ये पुरेसा ओलावा प्रदान करतो.",
      "বাংলা": "সেচ স্থগিত রাখুন: সাম্প্রতিক বা আসন্ন বৃষ্টি মাটিতে পর্যাপ্ত আর্দ্রতা সরবরাহ করে।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Schedule light irrigation")) {
    const maps = {
      "हिन्दी": "वाष्पीकरण हानि के बिना जड़ों में इष्टतम नमी बनाए रखने के लिए शाम के समय हल्की सिंचाई करें।",
      "ಕನ್ನಡ": "ಆವಿಯಾಗುವಿಕೆಯಿಂದ ನೀರು ನಷ್ಟವಾಗದಂತೆ ಸಂಜೆಯ ಸಮಯದಲ್ಲಿ ಲಘು ನೀರಾವರಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ.",
      "தமிழ்": "ஆவியாதல் இழப்பின்றி வேர் பகுதியில் ஈரப்பதத்தை பராமரிக்க மாலை நேரங்களில் லேசான பாசனம் செய்யவும்.",
      "తెలుగు": "బాష్పీభవన నష్టం లేకుండా వేరు భాగంలో తేమను కాపాడటానికి సాయంత్రం వేళల్లో తేలికపాటి నీటిపారుదల చేయండి.",
      "मराठी": "बाष्पीभवन टाळून मुळांमध्ये ओलावा टिकवण्यासाठी संध्याकाळच्या वेळी हलके सिंचन करा.",
      "বাংলা": "বাষ্পীভবন ক্ষতি এড়িয়ে মূল অঞ্চলে আর্দ্রতা বজায় রাখতে সন্ধ্যার সময় হালকা সেচ দিন।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Delay harvesting") || raw.includes("threshing")) {
    const maps = {
      "हिन्दी": "खड़ी फसलों की कटाई और गहाई में देरी करें; नमी से होने वाले नुकसान से बचाने के लिए कटी हुई फसल को तिरपाल से ढकें।",
      "ಕನ್ನಡ": "ಬೆಳೆಗಳ ಕೊಯ್ಲು ಮತ್ತು ಒಕ್ಕಣೆಯನ್ನು ಮುಂದೂಡಿ; ತೇವಾಂಶದ ಹಾನಿ ತಡೆಯಲು ಕೊಯ್ಲು ಮಾಡಿದ ಉತ್ಪನ್ನವನ್ನು ಟಾರ್ಪೌಲಿನ್‌ಗಳಿಂದ ಮುಚ್ಚಿ.",
      "தமிழ்": "பயிர் அறுவடையை ஒத்திவைக்கவும்; ஈரப்பதம் சேதமடைவதைத் தடுக்க அறுவடை செய்த விளைபொருட்களை தார்ப்பாய்களால் மூடவும்.",
      "తెలుగు": "పంట కోతను వాయిదా వేయండి; తేమ నష్టాన్ని నివారించడానికి కోసిన పంటను టార్పాలిన్లతో కప్పండి.",
      "मराठी": "पिकांची कापणी पुढे ढकला; ओलाव्यापासून नुकसान टाळण्यासाठी काढलेले पीक ताडपत्रीने झाकून ठेवा.",
      "বাংলা": "ফসল কাটা স্থগিত রাখুন; আর্দ্রতার ক্ষতি রোধ করতে কাটা ফসল ত্রিপল দিয়ে ঢেকে রাখুন।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Favorable dry window")) {
    const maps = {
      "हिन्दी": "फसल कटाई, सुखाने और सुरक्षित भंडारण के लिए अनुकूल सूखा मौसम।",
      "ಕನ್ನಡ": "ಬೆಳೆ ಕೊಯ್ಲು, ಒಣಗಿಸುವಿಕೆ ಮತ್ತು ಸಂಗ್ರಹಣೆಗೆ ಅನುಕೂಲಕರವಾದ ಒಣ ಹವಾಮಾನ.",
      "தமிழ்": "அறுவடை, உலர்த்துதல் மற்றும் சேமிப்பிற்கு சாதகமான வறண்ட வானிலை.",
      "తెలుగు": "పంట కోత, ఆరబెట్టడం మరియు నిల్వ చేయడానికి అనుకూలమైన పొడి వాతావరణం.",
      "मराठी": "पीक कापणी, वाळवणे आणि साठवणुकीसाठी अनुकूल कोरडे हवामान.",
      "বাংলা": "ফসল কাটা, শুকানো এবং সংরক্ষণের জন্য অনুকূল শুষ্ক আবহাওয়া।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Visual Flight Rules (VFR) operable")) {
    const maps = {
      "हिन्दी": "हवाई क्षेत्र में दृश्य उड़ान नियम (VFR) संचालन योग्य हैं। सुरक्षित उड़ान स्थितियाँ।",
      "ಕನ್ನಡ": "ವಾಯುಪ್ರದೇಶದಲ್ಲಿ ದೃಶ್ಯ ಹಾರಾಟ ನಿಯಮಗಳು (VFR) ಕಾರ್ಯನಿರ್ವಹಿಸಲು ಯೋಗ್ಯವಾಗಿವೆ.",
      "தமிழ்": "வான்வெளியில் பார்வை விமான விதிகள் (VFR) செயல்பட உகந்ததாக உள்ளன.",
      "తెలుగు": "గగనతలంలో విజువల్ ఫ్లైట్ రూల్స్ (VFR) పనిచేయడానికి అనుకూలంగా ఉన్నాయి.",
      "मराठी": "हवाई क्षेत्रात व्हिज्युअल फ्लाइट नियम (VFR) कार्यक्षम आहेत.",
      "বাংলা": "আকাশসীমায় ভিজ্যুয়াল ফ্লাইট রুলস (VFR) পরিচালনার জন্য অনুকূল।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Instrument Flight Rules")) {
    const maps = {
      "हिन्दी": "उपकरण उड़ान नियम (IFR / MVFR) प्रभावी हैं। कम दृश्यता और क्रॉसविंड के कारण मानक प्रक्रियाओं का पालन करें।",
      "ಕನ್ನಡ": "ಉಪಕರಣ ಹಾರಾಟ ನಿಯಮಗಳು (IFR / MVFR) ಜಾರಿಯಲ್ಲಿವೆ. ಕಡಿಮೆ ಗೋಚರತೆಯಿಂದ ಮುನ್ನೆಚ್ಚರಿಕೆ ಅಗತ್ಯ.",
      "தமிழ்": "கருவி விமான விதிகள் (IFR) நடைமுறையில் உள்ளன. குறைக்கப்பட்ட பார்வைத்திறனால் எச்சரிக்கை தேவை.",
      "తెలుగు": "ఇన్‌స్ట్రుమెంట్ ఫ్లైట్ రూల్స్ (IFR) అమలులో ఉన్నాయి. దృశ్యమానత తగ్గడంతో ప్రామాణిక విధానాలు పాటించండి.",
      "मराठी": "इन्स्ट्रुमेंट फ्लाइट नियम (IFR) लागू आहेत. कमी दृश्यमानतेमुळे सावधगिरी बाळगा.",
      "বাংলা": "ইনস্ট্রুমেন্ট ফ্লাইট রুলস (IFR) কার্যকর রয়েছে। দৃশ্যমানতা কম থাকায় সতর্কতা অবলম্বন করুন।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Safe conditions for coastal fishing") || raw.includes("Coastal wind") || raw.includes("SAFE")) {
    const maps = {
      "हिन्दी": "तटीय मछली पकड़ने और निकटवर्ती समुद्री गतिविधियों के लिए सुरक्षित स्थितियाँ।",
      "ಕನ್ನಡ": "ಕರಾವಳಿ ಮೀನುಗಾರಿಕೆ ಮತ್ತು ಹತ್ತಿರದ ಸಮುದ್ರ ಕಾರ್ಯಾಚರಣೆಗಳಿಗೆ ಸುರಕ್ಷಿತ ಪರಿಸ್ಥಿತಿಗಳು.",
      "தமிழ்": "கடலோர மீன்பிடித்தல் மற்றும் கடல் செயல்பாடுகளுக்கு பாதுகாப்பான நிலைமைகள்.",
      "తెలుగు": "తీరప్రాంత చేపల వేట మరియు సముద్ర కార్యకలాపాలకు సురక్షితమైన పరిస్థితులు.",
      "मराठी": "किनारपट्टीवरील मासेमारी आणि सागरी कामकाजासाठी सुरक्षित परिस्थिती.",
      "বাংলা": "উপকূলীয় মাছ ধরা এবং সামুদ্রিক কার্যক্রমের জন্য নিরাপদ পরিস্থিতি।",
    };
    return maps[language] || text;
  }

  if (raw.includes("Normal urban comfort levels") || raw.includes("Good outdoor ambient") || raw.includes("PLEASANT")) {
    const maps = {
      "हिन्दी": "सामान्य शहरी आराम स्तर। बाहरी परिवेश में अच्छी वायु गुणवत्ता।",
      "ಕನ್ನಡ": "ಸಾಮಾನ್ಯ ನಗರ ಸೌಕರ್ಯ ಮಟ್ಟಗಳು. ಉತ್ತಮ ಹೊರಾಂಗಣ ಗಾಳಿಯ ಗುಣಮಟ್ಟ.",
      "தமிழ்": "சாதாரண நகர்ப்புற வசதி நிலைகள். வெளிப்புற காற்றின் தரம் நன்று.",
      "తెలుగు": "సాధారణ నగర సౌకర్య స్థాయిలు. మంచి బహిరంగ గాలి నాణ్యత.",
      "मराठी": "सामान्य शहरी आराम पातळी. बाहेरील हवेची गुणवत्ता चांगली आहे.",
      "বাংলা": "স্বাভাবিক শহুরে আরামদায়ক স্তর। ভালো বহিরঙ্গন বায়ুর মান।",
    };
    return maps[language] || text;
  }

  return text;
}

// ====================================================
// REASONS TRANSLATION
// ====================================================
export function translateReason(reason, language = "English") {
  if (!reason || language === "English") return reason || "";
  const raw = String(reason);

  if (raw.includes("Elevated rain probability")) {
    const maps = {
      "हिन्दी": "वर्षा की अधिक संभावना: रासायनिक धुलाई का उच्च जोखिम",
      "ಕನ್ನಡ": "ಹೆಚ್ಚಿನ ಮಳೆ ಸಂಭವನೀಯತೆ: ರಾಸಾಯನಿಕ ಕೊಚ್ಚಿಹೋಗುವ ಹೆಚ್ಚಿನ ಅಪಾಯ",
      "தமிழ்": "மழைக்கான அதிக வாய்ப்பு: இரசாயனம் கழுவிச் செல்லும் அதிக ஆபத்து",
      "తెలుగు": "ఎక్కువ వర్షపాత సంభావ్యత: రసాయనాలు కొట్టుకుపోయే అధిక ప్రమాదం",
      "मराठी": "पावसाची अधिक शक्यता: रासायनिक वाहून जाण्याचा उच्च धोका",
      "বাংলা": "বৃষ্টির উচ্চ সম্ভাবনা: রাসায়নিক ধুয়ে যাওয়ার উচ্চ ঝুঁকি",
    };
    return maps[language] || reason;
  }

  if (raw.includes("Wind speed") && raw.includes("safe threshold")) {
    const maps = {
      "हिन्दी": "हवा की गति सुरक्षित सीमा से अधिक: रासायनिक बहाव का उच्च जोखिम",
      "ಕನ್ನಡ": "ಗಾಳಿಯ ವೇಗ ಸುರಕ್ಷಿತ ಮಿತಿಗಿಂತ ಹೆಚ್ಚು: ರಾಸಾಯನಿಕ ಡ್ರಿಫ್ಟ್ ಅಪಾಯ",
      "தமிழ்": "காற்றின் வேகம் பாதுகாப்பான வரம்பை மீறுகிறது: தெளிப்பு விலகல் ஆபத்து",
      "తెలుగు": "గాలి వేగం సురక్షిత పరిమితిని మించింది: రసాయన డ్రిఫ్ట్ ప్రమాదం",
      "मराठी": "वाऱ्याचा वेग सुरक्षित मर्यादेपेक्षा जास्त: फवारणी विस्थापन धोका",
      "বাংলা": "বাতাসের গতি নিরাপদ সীমা অতিক্রম করেছে: স্প্রে প্রবাহের উচ্চ ঝুঁকি",
    };
    return maps[language] || reason;
  }

  if (raw.includes("High temperature") && raw.includes("evaporation")) {
    const maps = {
      "हिन्दी": "उच्च तापमान रासायनिक वाष्पीकरण को तेज करता है",
      "ಕನ್ನಡ": "ಹೆಚ್ಚಿನ ತಾಪಮಾನವು ರಾಸಾಯನಿಕ ಆವಿಯಾಗುವಿಕೆಯನ್ನು ವೇಗಗೊಳಿಸುತ್ತದೆ",
      "தமிழ்": "அதிக வெப்பநிலை இரசாயன ஆவியாதலை துரிதப்படுத்துகிறது",
      "తెలుగు": "అధిక ఉష్ణోగ్రత రసాయనాల బాష్పీభవనాన్ని వేగవంతం చేస్తుంది",
      "मराठी": "उच्च तापमान रासायनिक बाष्पीभवन वेगवान करते",
      "বাংলা": "উচ্চ তাপমাত্রা রাসায়নিক বাষ্পীভবনকে ত্বরান্বিত করে",
    };
    return maps[language] || reason;
  }

  if (raw.includes("Optimal wind") || raw.includes("minimal rain probability")) {
    const maps = {
      "हिन्दी": "अनुकूल हवा (<15 किमी/घंटा), न्यूनतम वर्षा की संभावना और मध्यम आर्द्रता",
      "ಕನ್ನಡ": "ಅತ್ಯುತ್ತಮ ಗಾಳಿ (<15 ಕಿಮೀ/ಗಂ), ಕನಿಷ್ಠ ಮಳೆ ಸಂಭವನೀಯತೆ ಮತ್ತು ಮಧ್ಯಮ ಆರ್ದ್ರತೆ",
      "தமிழ்": "உகந்த காற்று (<15 கிமீ/மணி), குறைந்த மழை வாய்ப்பு மற்றும் மிதமான ஈரப்பதம்",
      "తెలుగు": "అనుకూలమైన గాలి (<15 కి.మీ/గం), కనీస వర్షపాత సంభావ్యత మరియు మధ్యస్థ తేమ",
      "मराठी": "इष्टतम वारा (<15 किमी/तास), किमान पावसाची शक्यता आणि मध्यम आर्द्रता",
      "বাংলা": "অনুকূল বাতাস (<১৫ কিমি/ঘণ্টা), ন্যূনতম বৃষ্টির সম্ভাবনা এবং মাঝারি আর্দ্রতা",
    };
    return maps[language] || reason;
  }

  return reason;
}

// ====================================================
// CHATBOT WELCOME & CHAT HISTORY MULTILINGUAL TRANSLATION
// ====================================================

export function getChatWelcomeMessage(language = "English") {
  const welcomes = {
    "English": "👋 **Hello! I am WeatherGPT**, your conversational AI weather intelligence platform.\n\nAsk me anything in your language about:\n• Real-time weather & up to 14-day outlooks\n• Personalized outfit & clothing recommendations\n• Farming & pesticide spraying advisories\n• Severe cyclone, flood & heatwave alerts",
    "हिन्दी": "👋 **नमस्ते! मैं WeatherGPT हूँ**, आपका संवादात्मक AI मौसम आसूचना मंच।\n\nअपनी भाषा में मुझसे कुछ भी पूछें:\n• वास्तविक समय का मौसम और 14 दिनों तक का पूर्वानुमान\n• व्यक्तिगत पोशाक और परिधान सिफारिशें\n• कृषि और कीटनाशक छिड़काव परामर्श\n• गंभीर चक्रवात, बाढ़ और लू की चेतावनी",
    "ಕನ್ನಡ": "👋 **ನಮಸ್ಕಾರ! ನಾನು WeatherGPT**, ನಿಮ್ಮ ಸಂವಾದಾತ್ಮಕ AI ಹವಾಮಾನ ಮಾಹಿತಿ ವೇದಿಕೆ.\n\nನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ನನ್ನನ್ನು ಏನೆಂದರೂ ಕೇಳಿ:\n• ನೈಜ ಸಮಯದ ಹವಾಮಾನ ಮತ್ತು 14 ದಿನಗಳವರೆಗಿನ ಮುನ್ಸೂಚನೆ\n• ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಉಡುಪು ಮತ್ತು ವಸ್ತ್ರ ಶಿಫಾರಸುಗಳು\n• ಕೃಷಿ ಮತ್ತು ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಸಲಹೆಗಳು\n• ತೀವ್ರ ಚಂಡಮಾರುತ, ಪ್ರವಾಹ ಮತ್ತು ಶಾಖದ ಅಲೆ ಎಚ್ಚರಿಕೆಗಳು",
    "தமிழ்": "👋 **வணக்கம்! நான் WeatherGPT**, உங்கள் உரையாடல் AI வானிலை நுண்ணறிவு தளம்.\n\nஉங்கள் மொழியில் என்னிடம் எதையும் கேளுங்கள்:\n• நிகழ்நேர வானிலை மற்றும் 14 நாட்கள் வரையிலான கண்ணோட்டம்\n• தனிப்பயனாக்கப்பட்ட ஆடை பரிந்துரைகள்\n• விவசாயம் மற்றும் பூச்சிக்கொல்லி தெளிப்பு ஆலோசனைகள்\n• கடுமையான புயல், வெள்ளம் மற்றும் வெப்ப அலை எச்சரிக்கைகள்",
    "తెలుగు": "👋 **నమస్కారం! నేను WeatherGPT**, మీ సంభాషణాత్మక AI వాతావరణ సమాచార వేదిక.\n\nమీ భాషలో నన్ను ఏదైనా అడగండి:\n• నిజ-సమయ వాతావరణం & 14 రోజుల వరకు అంచనాలు\n• వ్యక్తిగతీకరించిన దుస్తుల సిఫార్సులు\n• వ్యవసాయ & పురుగుమందుల పిచికారీ సలహాలు\n• తీవ్ర తుఫాను, వరదలు & వడగాల్పుల హెచ్చరికలు",
    "मराठी": "👋 **नमस्कार! मी WeatherGPT आहे**, तुमचे संवादात्मक AI हवामान माहिती व्यासपीठ.\n\nतुमच्या भाषेत मला काहीही विचारा:\n• रिअल-टाइम हवामान आणि 14 दिवसांपर्यंतचा अंदाज\n• वैयक्तिकृत कपडे आणि पोशाख शिफारसी\n• शेती आणि कीटकनाशक फवारणी सल्ला\n• तीव्र चक्रीवादळ, पूर आणि उष्णतेच्या लाटेचा इशारा",
    "বাংলা": "👋 **নমস্কার! আমি WeatherGPT**, আপনার ইন্টারেক্টিভ AI আবহাওয়া তথ্য প্ল্যাটফর্ম।\n\nআপনার ভাষায় আমাকে যেকোনো প্রশ্ন করুন:\n• রিয়েল-টাইম আবহাওয়া এবং ১৪ দিন পর্যন্ত পূর্বাভাস\n• ব্যক্তিগতকৃত পোশাক ও সাজসজ্জা সংক্রান্ত সুপারিশ\n• কৃষি ও কীটনাশক স্প্রে সংক্রান্ত পরামর্শ\n• তীব্র ঘূর্ণিঝড়, বন্যা ও তাপপ্রবাহ সতর্কতা",
  };
  return welcomes[language] || welcomes["English"];
}

const COMMON_BOT_TIPS = {
  umbrella: {
    "English": "Don't forget to carry an umbrella if you are heading outside! ☔",
    "हिन्दी": "अगर आप बाहर जा रहे हैं तो छाता साथ रखना न भूलें! ☔",
    "ಕನ್ನಡ": "ಹೊರಗೆ ಹೋಗುವಾಗ ಛತ್ರಿ ಕೊಂಡೊಯ್ಯಲು ಮರೆಯದಿರಿ! ☔",
    "தமிழ்": "வெளியே செல்வதானால் குடை எடுத்துச் செல்ல மறக்காதீர்கள்! ☔",
    "తెలుగు": "బయటకు వెళ్తుంటే గొడుగు వెంట తీసుకెళ్లడం మర్చిపోవద్దు! ☔",
    "मराठी": "बाहेर पडत असाल तर छत्री सोबत ठेवायला विसरू नका! ☔",
    "বাংলা": "বাইরে বের হলে ছাতা সঙ্গে নিতে ভুলবেন না! ☔",
  },
  heat: {
    "English": "Drink plenty of water and stay in the shade during midday! ☀️",
    "हिन्दी": "खूब पानी पिएं और दोपहर के समय तेज धूप से बचें! ☀️",
    "ಕನ್ನಡ": "ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಮಧ್ಯಾಹ್ನದ ಬಿಸಿಲಿನಿಂದ ದೂರವಿರಿ! ☀️",
    "தமிழ்": "நிறைய தண்ணீர் குடிக்கவும், நண்பகல் வெயிலை தவிர்க்கவும்! ☀️",
    "తెలుగు": "పుష్కలంగా నీరు త్రాగండి మరియు మధ్యాహ్నం ఎండకు దూరంగా ఉండండి! ☀️",
    "मराठी": "भरपूर पाणी प्या आणि दुपारच्या उन्हापासून सावध राहा! ☀️",
    "বাংলা": "প্রচুর জল পান করুন এবং দুপুরের রোদ এড়িয়ে চলুন! ☀️",
  },
  pleasant: {
    "English": "Great weather for outdoor activities and travel! 🌤️",
    "हिन्दी": "बाहर टहलने या यात्रा के लिए मौसम बहुत सुहावना है! 🌤️",
    "ಕನ್ನಡ": "ಹೊರಾಂಗಣ ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಪ್ರಯಾಣಕ್ಕೆ ಉತ್ತಮ ವಾತಾವರಣ! 🌤️",
    "தமிழ்": "வெளிப்புற நடவடிக்கைகள் மற்றும் பயணத்திற்கு ஏற்ற வானிலை! 🌤️",
    "తెలుగు": "బయటి పనులు మరియు ప్రయాణానికి చాలా అనుకూలమైన వాతావರಣం! 🌤️",
    "मराठी": "बाहेरील कामे आणि प्रवासासाठी अतिशय आल्हाददायक हवामान! 🌤️",
    "বাংলা": "বাইরের কাজকর্ম এবং ভ্রমণের জন্য মনোরম আবহাওয়া! 🌤️",
  },
  cold: {
    "English": "Keep a light jacket or sweater handy as it might feel chilly! 🧣",
    "हिन्दी": "ठंडक महसूस हो सकती है, इसलिए हल्की जैकेट या शॉल साथ रखें! 🧣",
    "ಕನ್ನಡ": "ಚಳಿಯ ಅನುಭವವಾಗಬಹುದು, ಲಘು ಸ್ವೆಟರ್ ಇಟ್ಟುಕೊಳ್ಳುವುದು ಸೂಕ್ತ! 🧣",
    "தமிழ்": "குளிராக உணரலாம், லேசான ஸ்வெட்டர் எடுத்துச் செல்லுங்கள்! 🧣",
    "తెలుగు": "చలిగా అనిపించవచ్చు, తేలికపాటి స్వెటర్ వెంట ఉంచుకోండి! 🧣",
    "मराठी": "गारवा जाणवू शकतो, हलके स्वेटर जवळ ठेवा! 🧣",
    "বাংলা": "ঠান্ডা লাগতে পারে, তাই হালকা জ্যাকেট সঙ্গে রাখুন! 🧣",
  },
};

const COMMON_BOT_ERRORS = {
  backend_down: {
    "English": "⚠ Unable to reach WeatherGPT backend. Please verify that the FastAPI service is running on port 8000.",
    "हिन्दी": "⚠ WeatherGPT बैकएंड से संपर्क नहीं हो पा रहा है। कृपया सुनिश्चित करें कि पोर्ट 8000 पर फास्टएपीआई सेवा चालू है।",
    "ಕನ್ನಡ": "⚠ WeatherGPT ಬ್ಯಾಕೆಂಡ್ ತಲುಪಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಪೋರ್ಟ್ 8000 ರಲ್ಲಿ FastAPI ಸೇವೆ ಚಾಲನೆಯಲ್ಲಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    "தமிழ்": "⚠ WeatherGPT பின்தளத்தை அணுக முடியவில்லை. போர்ட் 8000-ல் FastAPI இயங்குகிறது என்பதை உறுதிப்படுத்தவும்.",
    "తెలుగు": "⚠ WeatherGPT బ్యాకెండ్‌ను చేరుకోలేకపోతున్నాము. పోర్ట్ 8000 లో FastAPI నడుస్తోందని నిర్ధారించుకోండి.",
    "मराठी": "⚠ WeatherGPT बॅकएंडशी संपर्क साधता येत नाही. कृपया पोर्ट 8000 वर FastAPI सेवा चालू असल्याची खात्री करा.",
    "বাংলা": "⚠ WeatherGPT ব্যাকএন্ডের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে যাচাই করুন পোর্ট 8000-এ FastAPI চলছে।",
  },
  offline_sensor: {
    "English": "WeatherGPT is currently processing queries with local meteorological sensors. Please specify your location or question.",
    "हिन्दी": "WeatherGPT वर्तमान में स्थानीय मौसम सेंसर के साथ जानकारी संसाधित कर रहा है। कृपया अपना स्थान या प्रश्न निर्दिष्ट करें।",
    "ಕನ್ನಡ": "WeatherGPT ಪ್ರಸ್ತುತ ಸ್ಥಳೀಯ ಹವಾಮಾನ ಸಂವೇದಕಗಳೊಂದಿಗೆ ಮಾಹಿತಿಯನ್ನು ಸಂಸ್ಕರಿಸುತ್ತಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸ್ಥಳ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ.",
    "தமிழ்": "WeatherGPT தற்போது உள்ளூர் வானிலை சென்சார்கள் மூலம் தகவல்களை செயலாக்குகிறது. உங்கள் இடம் அல்லது கேள்வியைக் குறிப்பிடவும்.",
    "తెలుగు": "WeatherGPT ప్రస్తుతం స్థానిక వాతావరణ సెన్సార్లతో సమాచారాన్ని ప్రాసెస్ చేస్తోంది. దయచేసి మీ స్థానం లేదా ప్రశ్నను పేర్కొనండి.",
    "मराठी": "WeatherGPT सध्या स्थानिक हवामान सेन्सर्ससह माहिती प्रक्रिया करत आहे. कृपया तुमचे स्थान किंवा प्रश्न नमूद करा.",
    "বাংলা": "WeatherGPT বর্তমানে স্থানীয় আবহাওয়া সেন্সরের সাথে তথ্য প্রক্রিয়া করছে। অনুগ্রহ করে আপনার অবস্থান বা প্রশ্ন উল্লেখ করুন।",
  },
};

export const QUESTION_TYPES = ["rain", "spray", "outfit", "weather", "alerts", "aviation", "climate"];

export function getLocalizedQuestion(type, city = "Bengaluru", language = "English") {
  const map = {
    rain: {
      English: `Will it rain tomorrow in ${city}?`,
      "हिन्दी": `क्या कल ${city} में बारिश होगी?`,
      "ಕನ್ನಡ": `ನಾಳೆ ${city} ನಲ್ಲಿ ಮಳೆ ಬರುತ್ತಾ?`,
      "தமிழ்": `நாளை ${city} யில் மழை வருமா?`,
      "తెలుగు": `రేపు ${city} లో వర్షం పడుతుందా?`,
      "मराठी": `उद्या ${city} मध्ये पाऊस पडेल का?`,
      "বাংলা": `কাল কি ${city}-তে বৃষ্টি হবে?`,
    },
    spray: {
      English: `Can I spray pesticides in ${city} tomorrow?`,
      "हिन्दी": `क्या मैं कल ${city} में कीटनाशक छिड़काव कर सकता हूँ?`,
      "ಕನ್ನಡ": `ನಾಳೆ ${city} ನಲ್ಲಿ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬಹುದೇ?`,
      "தமிழ்": `நாளை ${city} யில் பூச்சிக்கொல்லಿ மருந்து தெளிக்கலாமா?`,
      "తెలుగు": `రేపు ${city} లో పురుగుమందుల పిచికారీ చేయవచ్చా?`,
      "मराठी": `उद्या ${city} मध्ये कीटकनाशक फवारणी करता येईल का?`,
      "বাংলা": `কাল ${city}-তে কি কীটনাশক স্প্রে করা যাবে?`,
    },
    outfit: {
      English: `What should I wear tomorrow in ${city}?`,
      "हिन्दी": `कल ${city} में मौसम के अनुसार क्या पहनना सही रहेगा?`,
      "ಕನ್ನಡ": `ನಾಳೆ ${city} ನಲ್ಲಿ ಯಾವ ಉಡುಪು ಧರಿಸಬೇಕು?`,
      "தமிழ்": `நாளை ${city} யில் என்ன ஆடை அணியலாம்?`,
      "తెలుగు": `రేపు ${city} లో ఏ దుస్తులు వేసుకోవాలి?`,
      "मराठी": `उद्या ${city} मध्ये कोणते कपडे घालावे?`,
      "বাংলা": `কাল ${city}-তে কী জামাকাপড় পরা উচিত?`,
    },
    weather: {
      English: `What is the weather in ${city}?`,
      "हिन्दी": `${city} का मौसम कैसा है?`,
      "ಕನ್ನಡ": `${city} ನ ಹವಾಮಾನ ಹೇಗಿದೆ?`,
      "தமிழ்": `${city} வானிலை நிலவரம் என்ன?`,
      "తెలుగు": `${city} లో వాతావరణం ఎలా ఉంది?`,
      "मराठी": `${city} चे हवामान कसे आहे?`,
      "বাংলা": `${city}-র আবহাওয়া কেমন?`,
    },
    alerts: {
      English: `Are there any active cyclone, flood, or heatwave alerts?`,
      "हिन्दी": `क्या कोई सक्रिय चक्रवात, बाढ़ या लू का अलर्ट है?`,
      "ಕನ್ನಡ": `ಯಾವುದಾದರೂ ಸಕ್ರಿಯ ಚಂಡಮಾರುತ ಅಥವಾ ಪ್ರವಾಹ ಎಚ್ಚರಿಕೆ ಇದೆಯೇ?`,
      "தமிழ்": `ஏதேனும் தீவிர புயல் அல்லது வெள்ள எச்சரிக்கை உள்ளதா?`,
      "తెలుగు": `ఏవైనా తుఫాను లేదా వరద హెచ్చరికలు ఉన్నాయా?`,
      "मराठी": `काही सक्रिय चक्रीवादळ किंवा पुराचा इशारा आहे का?`,
      "বাংলা": `কোনো সক্রিয় ঘূর্ণিঝড় বা বন্যার সতর্কতা আছে কি?`,
    },
    aviation: {
      English: `What is the aviation METAR briefing for VOBL?`,
      "हिन्दी": `VOBL के लिए विमानन METAR ब्रीफिंग क्या है?`,
      "ಕನ್ನಡ": `VOBL ಗಾಗಿ ವಾಯುಯಾನ METAR ಬ್ರೀಫಿಂಗ್ ಏನು?`,
      "தமிழ்": `VOBL விமான போக்குவரத்து METAR தகவல் என்ன?`,
      "తెలుగు": `VOBL కోసం ఏవియేషన్ METAR బ్రీఫింగ్ ఏమిటి?`,
      "मराठी": `VOBL साठी एव्हिएशन METAR ब्रीफिंग काय आहे?`,
      "বাংলা": `VOBL-এর জন্য বিমান চলাচল METAR ব্রিফিং কী?`,
    },
    climate: {
      English: `What are the climate trends and temperature anomalies in ${city}?`,
      "हिन्दी": `${city} में जलवायु के रुझान और तापमान विसंगतियां क्या हैं?`,
      "ಕನ್ನಡ": `${city} ನಲ್ಲಿ ಹವಾಮಾನ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ತಾಪಮಾನ ವ್ಯತ್ಯಾಸಗಳೇನು?`,
      "தமிழ்": `${city} காலநிலை போக்குகள் மற்றும் வெப்பநிலை மாற்றங்கள் என்ன?`,
      "తెలుగు": `${city} లో వాతావరణ ధోరణులు మరియు ఉష్ಣోగ్రత క్రమరాహిత్యాలు ఏమిటి?`,
      "मराठी": `${city} मधील हवामान ट्रेंड आणि तापमान विसंगती काय आहेत?`,
      "বাংলা": `${city}-তে জলবায়ু প্রবণতা এবং তাপমাত্রার অসঙ্গতি কী?`,
    },
  };
  return map[type]?.[language] || map[type]?.["English"] || `What is the weather in ${city}?`;
}

export function translateUserQuestion(text, targetLanguage = "English") {
  if (!text || typeof text !== "string") return text || "";
  const tLower = text.toLowerCase();

  // Extract city entity if specified
  let city = "Bengaluru";
  const cityMatch = text.match(/(?:in|for|में|ನಲ್ಲಿ|யில்|లో|मध्ये|তে)\s+([A-Za-z\u0900-\u0DFF]+)/i);
  if (cityMatch) {
    city = cityMatch[1].replace(/[?,.!]/g, "").trim();
  }

  if (tLower.includes("rain") || tLower.includes("बारिश") || tLower.includes("ಮಳೆ") || tLower.includes("மழை") || tLower.includes("వర్షం") || tLower.includes("पाऊस") || tLower.includes("বৃষ্টি")) {
    return getLocalizedQuestion("rain", city, targetLanguage);
  }
  if (tLower.includes("spray") || tLower.includes("pesticide") || tLower.includes("कीटनाशक") || tLower.includes("ಕೀಟನಾಶಕ") || tLower.includes("பூச்சிக்கொல்லி") || tLower.includes("పురుగుమందు") || tLower.includes("फवारणी") || tLower.includes("কীটনাশক")) {
    return getLocalizedQuestion("spray", city, targetLanguage);
  }
  if (tLower.includes("wear") || tLower.includes("outfit") || tLower.includes("पहन") || tLower.includes("ಉಡುಪು") || tLower.includes("ಬಟ್ಟೆ") || tLower.includes("ஆடை") || tLower.includes("దుస్తులు") || tLower.includes("कपडे") || tLower.includes("পোশাক")) {
    return getLocalizedQuestion("outfit", city, targetLanguage);
  }
  if (tLower.includes("alert") || tLower.includes("cyclone") || tLower.includes("flood") || tLower.includes("आपदा") || tLower.includes("ವಿಪತ್ತು") || tLower.includes("பேரிடர்") || tLower.includes("తుఫాను") || tLower.includes("आपत्ती") || tLower.includes("দুর্যোগ")) {
    return getLocalizedQuestion("alerts", city, targetLanguage);
  }
  if (tLower.includes("aviation") || tLower.includes("metar") || tLower.includes("vobl") || tLower.includes("विमानन") || tLower.includes("ವಾಯುಯಾನ")) {
    return getLocalizedQuestion("aviation", city, targetLanguage);
  }
  if (tLower.includes("climate") || tLower.includes("anomal") || tLower.includes("trend") || tLower.includes("जलवायु") || tLower.includes("ಪ್ರವೃತ್ತಿ")) {
    return getLocalizedQuestion("climate", city, targetLanguage);
  }
  if (tLower.includes("weather") || tLower.includes("temperature") || tLower.includes("मौसम") || tLower.includes("ಹವಾಮಾನ") || tLower.includes("வானிலை") || tLower.includes("వాతావరణం") || tLower.includes("हवामान") || tLower.includes("আবহাওয়া")) {
    return getLocalizedQuestion("weather", city, targetLanguage);
  }
  return text;
}

export function translateChatMessage(text, language = "English") {
  if (!text || typeof text !== "string") return text || "";

  // 1. Welcome Message
  if (
    text.includes("WeatherGPT") &&
    (text.includes("conversational AI") ||
      text.includes("Ask me anything") ||
      text.includes("संवादात्मक") ||
      text.includes("ಸಂವಾದಾತ್ಮಕ") ||
      text.includes("உரையாடல்") ||
      text.includes("సంభాషణాత్మక") ||
      text.includes("ইন্টারেক্টিভ") ||
      text.includes("• Real-time weather") ||
      text.includes("• वास्तविक समय") ||
      text.includes("• ನೈಜ ಸಮಯದ") ||
      text.includes("• நிகழ்நேர") ||
      text.includes("• నిజ-సమయ") ||
      text.includes("• रिअल-टाइम") ||
      text.includes("• রিয়েল-টাইম"))
  ) {
    return getChatWelcomeMessage(language);
  }

  // 2. Error fallbacks
  if (text.includes("Unable to reach WeatherGPT backend") || text.includes("WeatherGPT बैकएंड से संपर्क नहीं") || text.includes("WeatherGPT ಬ್ಯಾಕೆಂಡ್ ತಲುಪಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ")) {
    return COMMON_BOT_ERRORS.backend_down[language] || text;
  }
  if (text.includes("local meteorological sensors") || text.includes("स्थानीय मौसम सेंसर") || text.includes("ಸ್ಥಳೀಯ ಹವಾಮಾನ ಸಂವೇದಕಗಳೊಂದಿಗೆ")) {
    return COMMON_BOT_ERRORS.offline_sensor[language] || text;
  }

  // 3. Outfit recommendation translation
  if (text.includes("👔") || text.includes("आउटफिट") || text.includes("ಉಡುಪು") || text.includes("உடை") || text.includes("దుస్తుల") || text.includes("कपड्यांचा") || text.includes("পোশাকের")) {
    const locMatch = text.match(/\*\*([^*]+)\*\*/);
    const loc = locMatch ? locMatch[1].replace(/[^\w\s\u0900-\u0DFF]/g, "").trim() : "Bengaluru";
    const tempMatch = text.match(/(\d+(?:\.\d+)?)\s*°C/);
    const temp = tempMatch ? tempMatch[1] : "26";

    const outfitTexts = {
      English: `👔 **Outfit & Style Guide for ${loc}:**\n\nWith expected temperatures around **${temp}°C**, comfortable lightweight cotton clothing, breathable layers, and comfortable walking shoes are recommended. If rain is expected, carry an umbrella!`,
      "हिन्दी": `👔 **${loc} के लिए परिधान एवं पोशाक सुझाव:**\n\nलगभग **${temp}°C** तापमान के साथ, आरामदायक हल्के सूती कपड़े और चलने के लिए सहज जूते पहनना सही रहेगा। यदि बारिश की संभावना हो तो छाता अवश्य साथ रखें!`,
      "ಕನ್ನಡ": `👔 **${loc} ಗಾಗಿ ಉಡುಪು ಮತ್ತು ಶೈಲಿ ಸಲಹೆ:**\n\nಅಂದಾಜು **${temp}°C** ತಾಪಮಾನವಿರುವುದರಿಂದ, ಹಿತಕರವಾದ ಹತ್ತಿ ಬಟ್ಟೆಗಳು, ಲಘು ಪದರಗಳು ಮತ್ತು ಆರಾಮದಾಯಕ ಪಾದರಕ್ಷೆಗಳು ಸೂಕ್ತವಾಗಿವೆ. ಮಳೆ ಸಾಧ್ಯತೆಯಿದ್ದರೆ ಛತ್ರಿ ಕೊಂಡೊಯ್ಯಿರಿ!`,
      "தமிழ்": `👔 **${loc} உடை மற்றும் ஆடை பரிந்துரை:**\n\nசுமார் **${temp}°C** வெப்பநிலை நிலவுவதால், வசதியான பருத்தி ஆடைகள் மற்றும் லேசான மேலாடைகள் பரிந்துரைக்கப்படுகின்றன. மழை வாய்ப்பு இருந்தால் குடை எடுத்துச் செல்லவும்!`,
      "తెలుగు": `👔 **${loc} లో దుస్తుల మరియు శైలి సలహా:**\n\nదాదాపు **${temp}°C** ఉష్ణోగ్రత ఉన్నందున, తేలికపాటి కాటన్ దుస్తులు మరియు సౌకర్యవంతమైన బూట్లు అనుకూలంగా ఉంటాయి. వర్షం పడే అవకాశం ఉంటే గొడుగు తీసుకెళ్లండి!`,
      "मराठी": `👔 **${loc} साठी कपड्यांचा सल्ला:**\n\nअंदाजे **${temp}°C** तापमानासाठी आरामदायक सुती कपडे आणि हलकी लेयर घालणे उत्तम राहील. पाऊस असल्यास छत्री सोबत ठेवा!`,
      "বাংলা": `👔 **${loc}-র জন্য পোশাকের পরামর্শ:**\n\nআনুমানিক **${temp}°C** তাপমাত্রায় আরামদায়ক সুতি পোশাক এবং সুবিধাজনক জুতো পরা উপযুক্ত। বৃষ্টির সম্ভাবনা থাকলে ছাতা সঙ্গে রাখুন!`,
    };
    return outfitTexts[language] || outfitTexts["English"];
  }

  // 4. Pesticide spray advice translation
  if (text.includes("🌾") || text.includes("कीटनाशक") || text.includes("ಕೀಟನಾಶಕ") || text.includes("பூச்சிக்கொல்லி") || text.includes("పురుగుమందు") || text.includes("फवारणी") || text.includes("কীটনাশক")) {
    const locMatch = text.match(/\*\*([^*]+)\*\*/);
    const loc = locMatch ? locMatch[1].replace(/[^\w\s\u0900-\u0DFF]/g, "").trim() : "Bengaluru";

    const sprayTexts = {
      English: `🌾 **Agromet Advisory for ${loc}:**\n\nPesticide spraying is generally favorable during dry hours with wind speeds below 15 km/h. Ensure leaves are dry before application and avoid spraying if showers are imminent.`,
      "हिन्दी": `🌾 **${loc} के लिए कृषि परामर्श (कीटनाशक छिड़काव):**\n\n15 किमी/घंटा से कम हवा की गति और शुष्क मौसम में कीटनाशक छिड़काव करना सबसे उपयुक्त है। बारिश की संभावना होने पर छिड़काव टालें।`,
      "ಕನ್ನಡ": `🌾 **${loc} ಗಾಗಿ ಕೃಷಿ ಸಲಹೆ (ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ):**\n\nಗಾಳಿಯ ವೇಗ ಗಂಟೆಗೆ 15 ಕಿ.ಮೀ ಗಿಂತ ಕಡಿಮೆಯಿದ್ದಾಗ ಮತ್ತು ಶುಷ್ಕ ವಾತಾವರಣವಿದ್ದಾಗ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸುವುದು ಸೂಕ್ತ. ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇದ್ದರೆ ಸಿಂಪಡಿಸಬೇಡಿ.`,
      "தமிழ்": `🌾 **${loc} விவசாய ஆலோசனை (பூச்சிக்கொல்லி தெளிப்பு):**\n\nகாற்றின் வேகம் 15 கி.மீ/மணிக்கு குறைவாக உள்ள உலர்ந்த நேரத்தில் பூச்சிக்கொல்லி தெளிப்பது நல்லது. மழை எதிர்பார்க்கப்பட்டால் தெளிப்பதைத் தவிர்க்கவும்.`,
      "తెలుగు": `🌾 **${loc} వ్యవసాయ సలహా (పురుగుమందుల పిచికారీ):**\n\nగాలి వేగం 15 కి.మీ/గం కంటే తక్కువ ఉన్నప్పుడు పురుగుమందుల పిచికారీ అనుకూలం. వర్షం సూచన ఉంటే పిచికారీని వాయిదా వేయండి.`,
      "मराठी": `🌾 **${loc} साठी कृषी सल्ला (कीटकनाशक फवारणी):**\n\nवाऱ्याचा वेग 15 किमी/तास पेक्षा कमी असताना कीटकनाशक फवारणी अनुकूल ठरते. पाऊस पडण्याची शक्यता असल्यास फवारणी टाळा.`,
      "বাংলা": `🌾 **${loc}-র জন্য কৃষি পরামর্শ (কীটনাশক স্প্রে):**\n\nবাতাসের গতিবেগ ১৫ কিমি/ঘণ্টার কম হলে কীটনাশক স্প্রে করা নিরাপদ। বৃষ্টির সম্ভাবনা থাকলে স্প্রে করা স্থগিত রাখুন।`,
    };
    return sprayTexts[language] || sprayTexts["English"];
  }

  // 5. Current Live Weather Pattern match across languages
  const liveMatch = text.match(/\*\*([^*]+)\*\*.*?(\d+(?:\.\d+)?)\s*°C.*?(?:महसूस|feels like|ಅನಿಸಿಕೆ|உணர்வு|అనిపించేది|जाणवणारे|অনুভূত)?\s*(\d+(?:\.\d+)?)?\s*°C?/is);
  if (liveMatch && (text.includes("°C") || text.includes("km/h") || text.includes("%"))) {
    const loc = liveMatch[1].replace(/[^\w\s\u0900-\u0DFF]/g, "").trim();
    const temp = liveMatch[2] || "25";
    const feels = liveMatch[3] || temp;

    // Detect condition
    let cond = "Partly Cloudy";
    const condMatch = text.match(/\*\*([A-Za-z\s]+)\*\*/g);
    if (condMatch && condMatch.length > 1) {
      cond = condMatch[1].replace(/\*/g, "").trim();
    }
    const condTr = translateCondition(cond, language);

    // Tip selection
    let tip = "";
    if (text.includes("छाता") || text.includes("umbrella") || text.includes("ಛತ್ರಿ") || text.includes("குடை") || text.includes("గొడుగు") || text.includes("छत्री") || text.includes("ছাতা")) {
      tip = COMMON_BOT_TIPS.umbrella[language] || "";
    } else if (text.includes("पानी") || text.includes("water") || text.includes("ನೀರು") || text.includes("தண்ணீர்") || text.includes("ఎండ") || text.includes("ऊन")) {
      tip = COMMON_BOT_TIPS.heat[language] || "";
    } else {
      tip = COMMON_BOT_TIPS.pleasant[language] || "";
    }

    if (language === "हिन्दी") {
      return `🌡️ **${loc}** में अभी मौसम **${condTr}** है और तापमान **${temp}°C** है (महसूस ${feels}°C)।\n\n${tip}`;
    }
    if (language === "ಕನ್ನಡ") {
      return `🌡️ **${loc}** ನಲ್ಲಿ ಪ್ರಸ್ತುತ ಹವಾಮಾನ **${condTr}** ಆಗಿದ್ದು, ತಾಪಮಾನ **${temp}°C** ಇದೆ (ಅನಿಸಿಕೆ ${feels}°C).\n\n${tip}`;
    }
    if (language === "தமிழ்") {
      return `🌡️ தற்போது **${loc}**-ல் வானிலை **${condTr}**-ஆகவும், வெப்பநிலை **${temp}°C** ஆகவும் உள்ளது (உணர்வு ${feels}°C).\n\n${tip}`;
    }
    if (language === "తెలుగు") {
      return `🌡️ ప్రస్తుతం **${loc}** లో వాతావరణం **${condTr}** గా ఉంది మరియు ఉష్ణోగ్రత **${temp}°C** (అనిపించేది ${feels}°C).\n\n${tip}`;
    }
    if (language === "मराठी") {
      return `🌡️ **${loc}** मध्ये सध्या हवामान **${condTr}** असून तापमान **${temp}°C** आहे (जाणवणारे ${feels}°C).\n\n${tip}`;
    }
    if (language === "বাংলা") {
      return `🌡️ **${loc}**-তে এখন আবহাওয়া **${condTr}** এবং তাপমাত্রা **${temp}°C** (অনুভূত হচ্ছে ${feels}°C)।\n\n${tip}`;
    }
    return `🌡️ Currently in **${loc}**, the weather is **${cond}** and temperature is **${temp}°C** (feels like ${feels}°C).\n\n${tip}`;
  }

  // 6. Tomorrow Forecast Pattern match
  const tomMatch = text.match(/(?:कल|ನಾಳೆ|Tomorrow|நாளை|రేపు|उद्या|আগামীকাল).*?\*\*([^*]+)\*\*.*?(\d+(?:\.\d+)?)\s*°C/is);
  if (tomMatch) {
    const loc = tomMatch[1].replace(/[^\w\s\u0900-\u0DFF]/g, "").trim();
    const max = tomMatch[2] || "28";

    if (language === "हिन्दी") {
      return `🌧️ कल **${loc}** में मौसम सुहावना रहेगा और तापमान अधिकतम **${max}°C** के आसपास रहने का अनुमान है।`;
    }
    if (language === "ಕನ್ನಡ") {
      return `🌧️ ನಾಳೆ **${loc}** ನಲ್ಲಿ ಹವಾಮಾನ ಆಹ್ಲಾದಕರವಾಗಿದ್ದು, ಗರಿಷ್ಠ ತಾಪಮಾನ **${max}°C** ಇರಲಿದೆ.`;
    }
    if (language === "தமிழ்") {
      return `🌧️ நாளை **${loc}**-ல் அதிகபட்ச வெப்பநிலை சுமார் **${max}°C** ஆக இருக்கும்.`;
    }
    if (language === "తెలుగు") {
      return `🌧️ రేపు **${loc}** లో గరిష్ట ఉష్ణోగ్రత సుమారు **${max}°C** గా నమోదవుతుంది.`;
    }
    if (language === "मराठी") {
      return `🌧️ उद्या **${loc}** मध्ये कमाल तापमान सुमारे **${max}°C** राहण्याचा अंदाज आहे.`;
    }
    if (language === "বাংলা") {
      return `🌧️ আগামীকাল **${loc}**-তে সর্বোচ্চ তাপমাত্রা প্রায় **${max}°C** থাকবে।`;
    }
    return `🌧️ Tomorrow in **${loc}**, expect pleasant weather with a high around **${max}°C**.`;
  }

  return text;
}

export function translateChatHistory(messages, targetLanguage = "English") {
  if (!Array.isArray(messages)) return [];
  return messages.map((msg, index) => {
    if (
      index === 0 ||
      msg.isWelcome ||
      (msg.role === "assistant" &&
        msg.text &&
        (msg.text.includes("WeatherGPT") || msg.text.includes("conversational AI")) &&
        (msg.text.includes("•") || msg.text.includes("14-day") || msg.text.includes("outlooks")))
    ) {
      return {
        ...msg,
        isWelcome: true,
        text: getChatWelcomeMessage(targetLanguage),
      };
    }
    if (msg.role === "user") {
      return {
        ...msg,
        text: translateUserQuestion(msg.text, targetLanguage),
      };
    }
    if (msg.role === "assistant") {
      return {
        ...msg,
        text: translateChatMessage(msg.text, targetLanguage),
      };
    }
    return msg;
  });
}

// ====================================================
// OUTFIT & STYLE TRANSLATIONS
// ====================================================

export const OUTFIT_ITEMS_MAP = {
  // Tops
  "Breathable cotton or linen t-shirt": {
    "हिन्दी": "हवादार सूती या लिनन टी-शर्ट",
    "ಕನ್ನಡ": "ಗಾಳಿಯಾಡುವ ಹತ್ತಿ ಅಥವಾ ಲಿನನ್ ಟಿ-ಶರ್ಟ್",
    "தமிழ்": "காற்றோட்டமான பருத்தி அல்லது லினன் டி-சர்ட்",
    "తెలుగు": "గాలి ఆడే కాటన్ లేదా లినెన్ టి-షర్ట్",
    "मराठी": "हवेशीर सुती किंवा लिनन टी-शर्ट",
    "বাংলা": "হাওয়া চলাচলকারী সুতি বা লিনেন টি-শার্ট",
  },
  "Light half-sleeve shirt or airy polo": {
    "हिन्दी": "हल्की हाफ-स्लीव शर्ट या पोलो",
    "ಕನ್ನಡ": "ಹಗುರವಾದ ಅರ್ಧ ತೋಳಿನ ಶರ್ಟ್ ಅಥವಾ ಏರಿ ಪೋಲೋ",
    "தமிழ்": "லேசான அரைக்கை சட்டை அல்லது போலோ",
    "తెలుగు": "తేలికపాటి హాఫ్-స్లీవ్ షర్ట్ లేదా పోలో",
    "मराठी": "हलका हाफ-स्लीव्ह शर्ट किंवा पोलो",
    "বাংলা": "হালকা হাফ-হাতা শার্ট বা পোলো",
  },
  "Moisture-wicking light fabric": {
    "हिन्दी": "पसीना सोखने वाला हल्का कपड़ा",
    "ಕನ್ನಡ": "ಬೆವರು ಹೀರಿಕೊಳ್ಳುವ ಹಗುರವಾದ ಬಟ್ಟೆ",
    "தமிழ்": "ஈரப்பதத்தை உறிஞ்சும் மெல்லிய ஆடை",
    "తెలుగు": "చెమటను పీల్చుకునే తేలికపాటి వస్త్రం",
    "मराठी": "घाम शोषून घेणारे हलके कापड",
    "বাংলা": "ঘাম শোষণকারী হালকা কাপড়",
  },
  "Casual cotton shirt or polo": {
    "हिन्दी": "कैजुअल सूती शर्ट या पोलो",
    "ಕನ್ನಡ": "ಕ್ಯಾಶುಯಲ್ ಹತ್ತಿ ಶರ್ಟ್ ಅಥವಾ ಪೋಲೋ",
    "தமிழ்": "கேஷுவல் பருத்தி சட்டை அல்லது போலோ",
    "తెలుగు": "క్యాజువల్ కాటన్ షర్ట్ లేదా పోలో",
    "मराठी": "कॅज्युअल सुती शर्ट किंवा पोलो",
    "বাংলা": "ক্যাজুয়াল সুতি শার্ট বা পোলো",
  },
  "Classic t-shirt with optional light layer": {
    "हिन्दी": "क्लासिक टी-शर्ट (हल्की परत के साथ)",
    "ಕನ್ನಡ": "ಕ್ಲಾಸಿಕ್ ಟಿ-ಶರ್ಟ್ (ಐಚ್ಛಿಕ ತಿಳಿ ಪದರದೊಂದಿಗೆ)",
    "தமிழ்": "கிளாசிக் டி-சர்ட் (லேசான மேலாடையுடன்)",
    "తెలుగు": "క్లాసిక్ టి-షర్ట్ (తేలికపాటి లేయర్‌తో)",
    "मराठी": "क्लासिक टी-शर्ट (हवे असल्यास हलक्या लेयरसह)",
    "বাংলা": "ক্লাসিক টি-শার্ট (প্রয়োজনে হালকা স্তর সহ)",
  },
  "Comfortable henley or casual blouse": {
    "हिन्दी": "आरामदायक हेनले या कैजुअल ब्लाउज",
    "ಕನ್ನಡ": "ಆರಾಮದಾಯಕ ಹೆನ್ಲಿ ಅಥವಾ ಕ್ಯಾಶುಯಲ್ ಬ್ಲೌಸ್",
    "தமிழ்": "வசதியான ஹென்லி அல்லது கேஷுவல் பிளவுஸ்",
    "తెలుగు": "సౌకర్యవంతమైన హెన్లీ లేదా క్యాజువల్ బ్లౌజ్",
    "मराठी": "आरामदायी हेनले किंवा कॅज्युअल ब्लाउज",
    "বাংলা": "আরামদায়ক হেনলি বা ক্যাজুয়াল ব্লাউজ",
  },
  "Full-sleeve cotton or linen shirt": {
    "हिन्दी": "पूरी आस्तीन की सूती या लिनन शर्ट",
    "ಕನ್ನಡ": "ಪೂರ್ಣ ತೋಳಿನ ಹತ್ತಿ ಅಥವಾ ಲಿನನ್ ಶರ್ಟ್",
    "தமிழ்": "முழுக்கை பருத்தி அல்லது லினன் சட்டை",
    "తెలుగు": "పూర్తి చేతుల కాటన్ లేదా లినెನ್ షర్ట్",
    "मराठी": "फुल-स्लीव्ह सुती किंवा लिनन शर्ट",
    "বাংলা": "ফুলহাতা সুতি বা লিনেন শার্ট",
  },
  "Light knit pullover or layered t-shirt": {
    "हिन्दी": "हल्का बुना हुआ पुलओवर या लेयर्ड टी-शर्ट",
    "ಕನ್ನಡ": "ಹಗುರವಾದ ನೇಯ್ದ ಪುಲ್‌ಓವರ್ ಅಥವಾ ಲೇಯರ್ಡ್ ಟಿ-ಶರ್ಟ್",
    "தமிழ்": "மெல்லிய பின்னல் புல்ஓவர் அல்லது லேயர்டு டி-சர்ட்",
    "తెలుగు": "తేలికపాటి నిట్ పుಲ್‌ಓవర్ లేదా లేయర్డ్ టి-షర్ట్",
    "मराठी": "हलका निट पुलओव्हर किंवा लेअर्ड टी-शर्ट",
    "বাংলা": "হালকা নিট পুলওভার বা লেয়ার্ড টি-শার্ট",
  },
  "Denim or flannel overshirt": {
    "हिन्दी": "डेनिम या फलालैन ओवरशर्ट",
    "ಕನ್ನಡ": "ಡೆನಿಮ್ ಅಥವಾ ಫ್ಲಾನೆಲ್ ಓವರ್‌ಶರ್ಟ್",
    "தமிழ்": "டெனிம் அல்லது ஃபிளானல் மேலாடை",
    "తెలుగు": "డెనిమ్ లేదా ఫ్లాన్నెల్ ఓవర్‌షర్ట్",
    "मराठी": "डेनिम किंवा फ्लॅनेल ओव्हरशर्ट",
    "বাংলা": "ডেনিম বা ফ্ল্যানেল ওভারশার্ট",
  },
  "Warm thermal base layer": {
    "हिन्दी": "गर्म थर्मल बेस लेयर",
    "ಕನ್ನಡ": "ಬೆಚ್ಚಗಿನ ಥರ್ಮಲ್ ಒಳಉಡುಪು",
    "தமிழ்": "வெதுவெதுப்பான தெர்மல் உள்ளாடை",
    "తెలుగు": "వెచ్చని థర్మల్ బేస్ లేయర్",
    "मराठी": "उबदार थर्मल बेस लेयर",
    "বাংলা": "উষ্ণ থার্মাল বেস লেয়ার",
  },
  "Woolen sweater or knit pullover": {
    "हिन्दी": "ऊनी स्वेटर या बुना हुआ पुलओवर",
    "ಕನ್ನಡ": "ಉಣ್ಣೆಯ ಸ್ವೆಟರ್ ಅಥವಾ ನೇಯ್ದ ಪುಲ್‌ಓವರ್",
    "தமிழ்": "கம்பளி ஸ்வெட்டர் அல்லது பின்னல் புல்ஓவர்",
    "తెలుగు": "ఉన్ని స్వెటర్ లేదా నిట్ పుల్‌ఓవర్",
    "मराठी": "उबदार स्वेटर किंवा विणलेला पुलओव्हर",
    "বাংলা": "উলের সোয়েটার বা নিট পুলওভার",
  },
  "Fleece-lined sweatshirt or turtleneck": {
    "हिन्दी": "फ्लीस-लाइन्ड स्वेटशर्ट या टर्टलनेक",
    "ಕನ್ನಡ": "ಫ್ಲೀಸ್-ಲೈನ್ಡ್ ಸ್ವೆಟ್‌ಶರ್ಟ್ ಅಥವಾ ಟರ್ಟಲ್‌ನೆಕ್",
    "தமிழ்": "ஃபிளீஸ் ஸ்வெட்ஷர்ட் அல்லது டர்டில்நெக்",
    "తెలుగు": "ఫ్లీస్-లైన్డ్ స్వెట్‌షర్ట్ లేదా టర్టిల్‌నెక్",
    "मराठी": "फ्लीस-लाइन्ड स्वेटशर्ट किंवा टर्टलनेक",
    "বাংলা": "ফ্লিস-লাইনড সোয়েটশার্ট বা টার্টলনেক",
  },

  // Bottoms
  "Quick-drying ankle-length chinos or dark jeans (resists rain splashes)": {
    "हिन्दी": "जल्दी सूखने वाले एंकल-लेंथ चिनोस या डार्क जींस (छींटों से बचाव)",
    "ಕನ್ನಡ": "ಬೇಗ ಒಣಗುವ ಮೊಣಕಾಲುದ್ದದ ಚಿನೋಸ್ ಅಥವಾ ಗಾಢ ಬಣ್ಣದ ಜೀನ್ಸ್ (ಮಳೆ ಸಿಡಿಯುವುದನ್ನು ತಡೆಯುತ್ತದೆ)",
    "தமிழ்": "விரைவில் உலரும் கணுக்கால் அளவு சினோஸ் அல்லது அடர் ஜீன்ஸ் (மழைத் துளிகளை எதிர்க்கும்)",
    "తెలుగు": "త్వరగా ఆరిపోయే యాంకిల్-లెంగ్త్ చినోస్ లేదా డార్క్ జీన్స్ (బురద మరకల నిరోధకం)",
    "मराठी": "त्वरित सुकणारे अँकल-लेंथ चिनोज किंवा गडद जीन्स (पाण्याच्या शिंतोड्यांपासून संरक्षण)",
    "বাংলা": "দ্রুত শুকিয়ে যাওয়া গোড়ালি দৈর্ঘ্যের চিনোস বা ডার্ক জিন্স (বৃষ্টির দাগ প্রতিরোধী)",
  },
  "Moisture-wicking joggers or casual trousers": {
    "हिन्दी": "पसीना सोखने वाले जॉगर्स या कैजुअल पैंट",
    "ಕನ್ನಡ": "ತೇವಾಂಶ ಹೀರಿಕೊಳ್ಳುವ ಜಾಗರ್ಸ್ ಅಥವಾ ಕ್ಯಾಶುಯಲ್ ಪ್ಯಾಂಟ್ಸ್",
    "தமிழ்": "ஈரப்பதம் உறிஞ்சும் ஜாகர்ஸ் அல்லது கேஷுவல் பேண்ட்",
    "తెలుగు": "తేమ పీల్చుకునే జాగార్స్ లేదా క్యాజువల్ ట్రౌజర్స్",
    "मराठी": "घाम शोषून घेणारे जॉगर्स किंवा कॅज्युअल ट्राउझर्स",
    "বাংলা": "ঘাম শোষণকারী জগার্স বা ক্যাজুয়াল ট্রাউজার্স",
  },
  "Avoid long trailing cuffs that can drag on wet roads": {
    "हिन्दी": "लंबे बॉटम्स से बचें जो गीली सड़कों पर भीग सकते हैं",
    "ಕನ್ನಡ": "ತೇವವಾದ ರಸ್ತೆಯಲ್ಲಿ ಎಳೆಯುವಂತಹ ಉದ್ದನೆಯ ಪ್ಯಾಂಟ್ ಧರಿಸಬೇಡಿ",
    "தமிழ்": "ஈரமான சாலையில் நனையும் நீண்ட ஓரங்கள் கொண்ட கால்சட்டைகளைத் தவிர்க்கவும்",
    "తెలుగు": "తడి రోడ్లపై తగిలే పొడవైన ప్యాంటులను నివారించండి",
    "मराठी": "ओल्या रस्त्यांवर लोळणारे लांब बॉटम्स घालणे टाळा",
    "বাংলা": "ভেজা রাস্তায় ভিজে যেতে পারে এমন লম্বা ট্রাউজার এড়িয়ে চলুন",
  },
  "Breathable cotton chinos or linen trousers": {
    "हिन्दी": "हवादार सूती चिनोस या लिनन पैंट",
    "ಕನ್ನಡ": "ಗಾಳಿಯಾಡುವ ಹತ್ತಿ ಚಿನೋಸ್ ಅಥವಾ ಲಿನನ್ ಪ್ಯಾಂಟ್ಸ್",
    "தமிழ்": "காற்றோட்டமான பருத்தி சினோஸ் அல்லது லினன் பேண்ட்",
    "తెలుగు": "గాలి ఆడే కాటన్ చినోస్ లేదా లినెన్ ట్రౌజర్స్",
    "मराठी": "हवेशीर सुती चिनोज किंवा लिनन ट्राउझर्स",
    "বাংলা": "হাওয়া চলাচলকারী সুতি চিনোস বা লিনেন ট্রাউজার্স",
  },
  "Lightweight casual trousers or relaxed denim": {
    "हिन्दी": "हल्की कैजुअल पतलून या रिलैक्स्ड डेनिम",
    "ಕನ್ನಡ": "ತಿಳಿ ತೂಕದ ಕ್ಯಾಶುಯಲ್ ಪ್ಯಾಂಟ್ಸ್ ಅಥವಾ ಡೆನಿಮ್",
    "தமிழ்": "எடை குறைந்த கேஷுவல் பேண்ட் அல்லது டெனிம்",
    "తెలుగు": "తేలికపాటి క్యాజువల్ ట్రౌజర్స్ లేదా డెనిమ్",
    "मराठी": "हलकी कॅज्युअल पँट किंवा रिलॅक्स्ड डेनिम",
    "বাংলা": "হালকা ওজনের ক্যাজুয়াল ট্রাউজার বা রিল্যাক্সড ডেনিম",
  },
  "Airy shorts or linen-blend pants for casual outings": {
    "हिन्दी": "आरामदायक शॉर्ट्स या लिनन-ब्लेंड पैंट",
    "ಕನ್ನಡ": "ಕ್ಯಾಶುಯಲ್ ಹೊರಸಂಚಾರಕ್ಕೆ ಹಗುರವಾದ ಶಾರ್ಟ್ಸ್ ಅಥವಾ ಲಿನನ್ ಪ್ಯಾಂಟ್ಸ್",
    "தமிழ்": "சுற்றுலாவுக்கு வசதியான ஷார்ட்ஸ் அல்லது லினன் பேண்ட்",
    "తెలుగు": "సాధారణ ప్రయాణాలకు సౌకర్యవంతమైన షార్ట్స్ లేదా లినెన్ ప్యాంట్లు",
    "मराठी": "बाहेर फिरण्यासाठी हवेशीर शॉर्ट्स किंवा लिनन पँट",
    "বাংলা": "আরামদায়ক শর্টস বা লিনেন প্যান্ট",
  },
  "Classic denim jeans": {
    "हिन्दी": "क्लासिक डेनिम जींस",
    "ಕನ್ನಡ": "ಕ್ಲಾಸಿಕ್ ಡೆನಿಮ್ ಜೀನ್ಸ್",
    "தமிழ்": "கிளாசிக் டெனிம் ஜீன்ஸ்",
    "తెలుగు": "క్లాసిక్ డెనిమ్ జీన్స్",
    "मराठी": "क्लासिक डेनिम जीन्स",
    "বাংলা": "ক্লাসিক ডেনিম জিন্স",
  },
  "Casual slim or regular chinos": {
    "हिन्दी": "कैजुअल स्लिम या रेगुलर चिनोस",
    "ಕನ್ನಡ": "ಕ್ಯಾಶುಯಲ್ ಸ್ಲಿಮ್ ಅಥವಾ ರೆಗ್ಯುಲರ್ ಚಿನೋಸ್",
    "தமிழ்": "கேஷுவல் ஸ்லிம் அல்லது ரெகுலர் சினோஸ்",
    "తెలుగు": "క్యాజువల్ స్లిమ్ లేదా రెగ్యులర్ చినోస్",
    "मराठी": "कॅज्युअल स्लिम किंवा रेग्युलर चिनोज",
    "বাংলা": "ক্যাজুয়াল স্লিম বা রেগুলার চিনোস",
  },
  "Comfortable stretch trousers": {
    "हिन्दी": "आरामदायक स्ट्रेच ट्राउजर",
    "ಕನ್ನಡ": "ಆರಾಮದಾಯಕ ಸ್ಟ್ರೆಚ್ ಪ್ಯಾಂಟ್ಸ್",
    "தமிழ்": "வசதியான ஸ்ட்ரெட்ச் பேண்ட்",
    "తెలుగు": "సౌకర్యవంతమైన స్ట్రెచ్ ట్రౌజర్స్",
    "मराठी": "आरामदायी स्ट्रेच ट्राउझर्स",
    "বাংলা": "আরামদায়ক স্ট্রেচ ট্রাউজার্স",
  },
  "Heavy denim jeans": {
    "हिन्दी": "मजबूत हेवी डेनिम जींस",
    "ಕನ್ನಡ": "ದಪ್ಪನೆಯ ಡೆನಿಮ್ ಜೀನ್ಸ್",
    "தமிழ்": "தடிமனான டெனிம் ஜீன்ஸ்",
    "తెలుగు": "మందపాటి డెనిమ్ జీన్స్",
    "मराठी": "जाड डेनिम जीन्स",
    "বাংলা": "ভারী ডেনিম জিন্স",
  },
  "Corduroy or woolen-blend trousers": {
    "हिन्दी": "कॉर्डुरॉय या वूलन-ब्लेंड ट्राउजर",
    "ಕನ್ನಡ": "ಕಾರ್ಡುರಾಯ್ ಅಥವಾ ಉಣ್ಣೆಯ ಪ್ಯಾಂಟ್ಸ್",
    "தமிழ்": "கார்டுராய் அல்லது கம்பளி கலந்த பேண்ட்",
    "తెలుగు": "కార్డురాయ్ లేదా ఉన్ని-బ్లెండ్ ట్రౌజర్స్",
    "मराठी": "कॉर्डुरॉय किंवा उबदार विणलेली पँट",
    "বাংলা": "কর্ডুরয় বা উলের মিশ্রিত ট্রাউজার্স",
  },
  "Thermal-lined chinos or fleece joggers": {
    "हिन्दी": "थर्मल-लाइन्ड चिनोस या फ्लीस जॉगर्स",
    "ಕನ್ನಡ": "ಥರ್ಮಲ್-ಲೈನ್ಡ್ ಚಿನೋಸ್ ಅಥವಾ ಫ್ಲೀಸ್ ಜಾಗರ್ಸ್",
    "தமிழ்": "தெர்மல் லைனிங் சினோஸ் அல்லது ஃபிளீஸ் ஜாகர்ஸ்",
    "తెలుగు": "థర్మల్-లైన్డ్ చినోస్ లేదా ఫ్లీస్ జాగార్స్",
    "मराठी": "थर्मल-लाइन्ड चिनोज किंवा फ्लीस जॉगर्स",
    "বাংলা": "থার্মাল-লাইনড চিনোস বা ফ্লিস জগার্স",
  },

  // Outerwear & Layers
  "Waterproof rain jacket or water-repellent windbreaker": {
    "हिन्दी": "वाटरप्रूफ रेन जैकेट या विंडब्रेकर",
    "ಕನ್ನಡ": "ಜಲನಿರೋಧಕ ಮಳೆ ಜಾಕೆಟ್ ಅಥವಾ ವಿಂಡ್‌ಬ್ರೇಕರ್",
    "தமிழ்": "நீர்ப்புகா ரெயின் ஜாக்கெட் அல்லது விண்ட்பிரேக்கர்",
    "తెలుగు": "వాటర్‌ప్రూఫ్ రెయిన్ జాకెట్ లేదా విండ్‌బ్రేకర్‌",
    "मराठी": "वॉटरप्रूफ रेन जॅकेट किंवा विंडब्रेकर",
    "বাংলা": "জলরোধী রেইন জ্যাকেট বা উইন্ডব্রেকার",
  },
  "Light hooded waterproof trench or poncho": {
    "हिन्दी": "हुड वाली वाटरप्रूफ ट्रेंच या पोंचो",
    "ಕನ್ನಡ": "ಹುಡ್ ಇರುವ ವಾಟರ್‌ಪ್ರೂಫ್ ಟ್ರೆಂಚ್ ಅಥವಾ ಪೊಂಚೊ",
    "தமிழ்": "ஹூட் கொண்ட நீர்ப்புகா டிரெஞ்ச் அல்லது போன்சோ",
    "తెలుగు": "హుడ్ ఉన్న వాటర్‌ప్రూఫ్ ట్రెంచ్ లేదా పోంచో",
    "मराठी": "हुड असलेले वॉटरप्रूफ ट्रेंच किंवा पॉंचो",
    "বাংলা": "হুডযুক্ত জলরোধী ট্রেঞ্চ বা পোঞ্চো",
  },
  "Compact packable wind-cheater": {
    "हिन्दी": "कॉम्पैक्ट फोल्डेबल विंड-चीटर",
    "ಕನ್ನಡ": "ಸುಲಭವಾಗಿ ಮಡಚಬಹುದಾದ ಕಾಂಪ್ಯಾಕ್ಟ್ ವಿಂಡ್‌ಚೀಟರ್",
    "தமிழ்": "மடிக்கக்கூடிய இலகுவான விண்ட்சீட்டர்",
    "తెలుగు": "తేలికగా మడతపెట్టే విండ్‌చీటర్",
    "मराठी": "सहज दुमडता येणारे कॉम्पॅक्ट विंड-चीटर",
    "বাংলা": "সহজে ভাঁজযোগ্য কম্প্যাক্ট উইন্ড-চিটার",
  },
  "No heavy layers needed during the day": {
    "हिन्दी": "दिन के समय भारी कपड़ों की आवश्यकता नहीं",
    "ಕನ್ನಡ": "ಹಗಲಿನಲ್ಲಿ ಭಾರವಾದ ಜಾಕೆಟ್‌ಗಳ ಅಗತ್ಯವಿಲ್ಲ",
    "தமிழ்": "பகலில் தடிமனான மேலாடைகள் தேவையில்லை",
    "తెలుగు": "పగటిపూట బరువైన బట్టలు అవసరం లేదు",
    "मराठी": "दिवसा जास्त जाड कपड्यांची गरज नाही",
    "বাংলা": "দিনের বেলা ভারী পোশাকের প্রয়োজন নেই",
  },
  "Light cotton overshirt for air-conditioned indoor spaces": {
    "हिन्दी": "एसी वाले इनडोर स्थानों के लिए हल्की सूती शर्ट",
    "ಕನ್ನಡ": "ಎಸಿ ಕೋಣೆಗಳಿಗಾಗಿ ಹಗುರವಾದ ಹತ್ತಿ ಓವರ್‌ಶರ್ಟ್",
    "தமிழ்": "குளிர்சாதன வசதி கொண்ட அறைகளுக்கான லேசான பருத்தி மேலாடை",
    "తెలుగు": "ఏసీ గదుల కోసం తేలికపాటి కాటన్ ఓవర్‌షర్ట్",
    "मराठी": "एअर-कंडिशन्ड जागांसाठी हलका सुती शर्ट",
    "বাংলা": "শীতাতপ নিয়ন্ত্রিত ঘরের জন্য হালকা সুতি ওভারশার্ট",
  },
  "UV-protection light shrug or thin cardigan": {
    "हिन्दी": "धूप से बचाव के लिए हल्का श्रग या पतला कार्डिगन",
    "ಕನ್ನಡ": "ಯುವಿ ರಕ್ಷಣೆಯ ಹಗುರವಾದ ಶ್ರಗ್ ಅಥವಾ ತೆಳುವಾದ ಕಾರ್ಡಿಗನ್",
    "தமிழ்": "புற ஊதா கதிர் தடுப்பு மெல்லிய ஷ்ரக் அல்லது கார்டிகன்",
    "తెలుగు": "యూవీ రక్షణ ఇచ్చే తేలికపాటి శ్రగ్ లేదా కార్డిగాన్",
    "मराठी": "अतिनील किरणांपासून संरक्षणासाठी हलके श्रग किंवा कार्डिगन",
    "বাংলা": "ইউভি সুরক্ষা হালকা স্রাগ বা পাতলা কার্ডিগান",
  },
  "Light denim jacket or casual zip-up hoodie": {
    "हिन्दी": "हल्की डेनिम जैकेट या ज़िप-अप हुडी",
    "ಕನ್ನಡ": "ಹಗುರವಾದ ಡೆನಿಮ್ ಜಾಕೆಟ್ ಅಥವಾ ಜಿಪ್-ಅಪ್ ಹೂಡಿ",
    "தமிழ்": "லேசான டெனிம் ஜாக்கெட் அல்லது ஜிப் ஹூடி",
    "తెలుగు": "తేలికపాటి డెనిమ్ జాకెట్ లేదా జిప్-అప్ హూడీ",
    "मराठी": "हलके डेनिम जॅकेट किंवा कॅज्युअल झिप-अप हुडी",
    "বাংলা": "হালকা ডেনিম জ্যাকেট বা জিপ-আপ হুডি",
  },
  "Cotton cardigan or light bomber jacket for evening breeze": {
    "हिन्दी": "शाम की ठंडी हवा के लिए कॉटन कार्डिगन या बॉम्बर जैकेट",
    "ಕನ್ನಡ": "ಸಂಜೆಯ ತಂಗಾಳಿಗೆ ಹತ್ತಿ ಕಾರ್ಡಿಗನ್ ಅಥವಾ ಹಗುರವಾದ ಬಾಂಬರ್ ಜಾಕೆಟ್",
    "தமிழ்": "மாலை தென்றலுக்கு பருத்தி கார்டிகன் அல்லது பாம்பர் ஜாக்கெட்",
    "తెలుగు": "సాయంత్రపు చల్లటి గాలికి కాటన్ కార్డిగాన్ లేదా బాంబర్ జాకెట్",
    "मराठी": "संध्याकाळच्या गारव्यासाठी कॉटन कार्डिगन किंवा बॉम्बर जॅकेट",
    "বাংলা": "সন্ধ্যার বাতাসের জন্য সুতির কার্ডিগান বা বম্বার জ্যাকেট",
  },
  "Versatile overshirt": {
    "हिन्दी": "आरामदायक बहुउद्देशीय ओवरशर्ट",
    "ಕನ್ನಡ": "ಬಹುಪಯೋಗಿ ಆರಾಮದಾಯಕ ಓವರ್‌ಶರ್ಟ್",
    "தமிழ்": "பயனுள்ள பருத்தி மேலாடை",
    "తెలుగు": "అన్ని వేళలా సరిపోయే ఓవర్‌షర్ట్",
    "मराठी": "सोयीस्कर ओव्हरशर्ट",
    "বাংলা": "বহুমুখী ওভারশার্ট",
  },
  "Insulated jacket or warm padded parka": {
    "हिन्दी": "इंसुलेटेड जैकेट या गर्म गद्देदार पार्का",
    "ಕನ್ನಡ": "ಬೆಚ್ಚಗಿನ ಇನ್ಸುಲೇಟೆಡ್ ಜಾಕೆಟ್ ಅಥವಾ ಪ್ಯಾಡೆಡ್ ಪಾರ್ಕಾ",
    "தமிழ்": "வெப்பமான பேடட் பார்கா அல்லது இன்சுலேட்டட் ஜாக்கெட்",
    "తెలుగు": "వెచ్చని ఇన్సులేటెడ్ జాకెట్ లేదా ప్యాడెడ్ పార్కా",
    "मराठी": "उबदार इन्सुलेटेड जॅकेट किंवा पॅडेड पार्का",
    "বাংলা": "উষ্ণ ইনসুলেটেড জ্যাকেট বা প্যাডেড পারকা",
  },
  "Fleece-lined winter jacket or woolen coat": {
    "हिन्दी": "फ्लीस-लाइन्ड विंटर जैकेट या ऊनी कोट",
    "ಕನ್ನಡ": "ಫ್ಲೀಸ್-ಲೈನ್ಡ್ ಚಳಿಗಾಲದ ಜಾಕೆಟ್ ಅಥವಾ ಉಣ್ಣೆಯ ಕೋಟು",
    "தமிழ்": "ஃபிளீஸ் குளிர்கால ஜாக்கெட் அல்லது கம்பளி கோட்",
    "తెలుగు": "శీతాకాలపు ఫ్లీస్-లైన్డ్ జాకెట్ లేదా ఉన్ని కోటు",
    "मराठी": "फ्लीस-लाइन्ड विंटर जॅकेट किंवा उबदार कोट",
    "বাংলা": "ফ্লিস-লাইনড শীতের জ্যাকেট বা উলের কোট",
  },
  "Wind-resistant bomber or puffer jacket": {
    "हिन्दी": "हवा प्रतिरोधी बॉम्बर या पफर जैकेट",
    "ಕನ್ನಡ": "ತಣ್ಣನೆಯ ಗಾಳಿ ತಡೆಯುವ ಬಾಂಬರ್ ಅಥವಾ ಪಫರ್ ಜಾಕೆಟ್",
    "தமிழ்": "காற்றுப் புகாத பாம்பர் அல்லது பஃபர் ஜாக்கெட்",
    "తెలుగు": "గాలి నిరోధక బాంబర్ లేదా పఫర్ జాకెట్",
    "मराठी": "थंड वाऱ्यापासून वाचवणारे पफर जॅकेट",
    "বাংলা": "বাতাস প্রতিরোধী বোম্বার বা পাফার জ্যাকেট",
  },

  // Footwear
  "Water-resistant sneakers or waterproof boots": {
    "हिन्दी": "वाटर-रेसिस्टेंट स्नीकर्स या वाटरप्रूफ जूते",
    "ಕನ್ನಡ": "ಜಲನಿರೋಧಕ ಸ್ನೀಕರ್ಸ್ ಅಥವಾ ಜಲನಿರೋಧಕ ಶೂಗಳು",
    "தமிழ்": "நீர்ப்புகா ஸ்னீக்கர்கள் அல்லது வாட்டர்ப்ரூப் பூட்ஸ்",
    "తెలుగు": "నీటిని తట్టుకునే స్నీకర్స్ లేదా వాటర్‌ప్రూఫ్ బూట్లు",
    "मराठी": "वॉटर-रेझिस्टंट स्नीकर्स किंवा वॉटरप्रूफ बूट",
    "বাংলা": "জলরোধী স্নিকার্স বা ওয়াটারপ্রুফ বুট",
  },
  "Comfortable sandals or clogs with high-traction wet grip": {
    "हिन्दी": "फिसलन से बचाने वाली ग्रिप वाली सैंडल या क्लॉग्स",
    "ಕನ್ನಡ": "ತೇವದಲ್ಲಿ ಜಾರದ ಉತ್ತಮ ಹಿಡಿತವಿರುವ ಸ್ಯಾಂಡಲ್ಸ್ ಅಥವಾ ಶೂಗಳು",
    "தமிழ்": "வழுக்காத பிடிப்பு கொண்ட வசதியான காலணிகள்",
    "తెలుగు": "జారకుండా గ్రిప్ ఉండే సౌకర్యవంతమైన చెప్పులు లేదా శాండల్స్",
    "मराठी": "ओल्या रस्त्यांवर उत्तम ग्रीप असणारे सँडल्स किंवा क्लॉग्स",
    "বাংলা": "ভেজা রাস্তায় ভালো গ্রিপযুক্ত আরামদায়ক স্যান্ডেল বা জুতো",
  },
  "Avoid canvas or suede shoes that absorb water easily": {
    "हिन्दी": "कैनवास या साबर के जूते न पहनें जो पानी सोखते हैं",
    "ಕನ್ನಡ": "ನೀರು ಹೀರಿಕೊಳ್ಳುವ ಕ್ಯಾನ್ವಾಸ್ ಅಥವಾ ಸ್ಯೂಡ್ ಶೂಗಳನ್ನು ಧರಿಸಬೇಡಿ",
    "தமிழ்": "தண்ணீரை உறிஞ்சும் கேன்வாஸ் அல்லது சூயெட் காலணிகளைத் தவிர்க்கவும்",
    "తెలుగు": "నీటిని పీల్చుకునే కాన్వాస్ లేదా స్వెడ్ బూట్లను నివారించండి",
    "मराठी": "पाणी शोषून घेणारे कॅनव्हास किंवा लेदर शूज वापरणे टाळा",
    "বাংলা": "সহজে জল শুষে নেয় এমন ক্যানভাস বা সোয়েড জুতো এড়িয়ে চলুন",
  },
  "Everyday walking sneakers or casual loafers": {
    "हिन्दी": "आरामदायक वॉकिंग स्नीकर्स या कैजुअल लोफर्स",
    "ಕನ್ನಡ": "ದೈನಂದಿನ ನಡಿಗೆಯ ಸ್ನೀಕರ್ಸ್ ಅಥವಾ ಕ್ಯಾಶುಯಲ್ ಲೋಫರ್ಸ್",
    "தமிழ்": "நடைப்பயிற்சி ஸ்னீக்கர்கள் அல்லது கேஷுவல் லோஃபர்கள்",
    "తెలుగు": "నడకకు అనుకూలమైన స్నీకర్స్ లేదా క్యాజువల్ లోఫర్స్",
    "मराठी": "नेहमीचे वॉकिंग स्नीकर्स किंवा कॅज्युअल लोफर्स",
    "বাংলা": "প্রতিদিনের হাঁটার স্নিকার্স বা ক্যাজুয়াল লোফার্স",
  },
  "Comfortable lifestyle shoes with good arch support": {
    "हिन्दी": "अच्छे सपोर्ट वाले आरामदायक लाइफस्टाइल जूते",
    "ಕನ್ನಡ": "ಉತ್ತಮ ಬೆಂಬಲ ನೀಡುವ ಆರಾಮದಾಯಕ ಶೂಗಳು",
    "தமிழ்": "பாதத்திற்கு வசதியான லைஃப்ஸ்டைல் காலணிகள்",
    "తెలుగు": "మంచి సపోర్ట్ ఇచ్చే సౌకర్యవంతమైన లైఫ్‌స్టైల్ షూస్",
    "मराठी": "चांगला आधार देणारे आरामदायी शूज",
    "বাংলা": "পায়ের পক্ষে আরামদায়ক ও সহায়ক জুতো",
  },
  "Standard breathable cotton socks": {
    "हिन्दी": "हवादार सूती मोज़े",
    "ಕನ್ನಡ": "ಸಾಮಾನ್ಯ ಗಾಳಿಯಾಡುವ ಹತ್ತಿ ಸಾಕ್ಸ್‌ಗಳು",
    "தமிழ்": "சாதாரண பருத்தி காலுறைகள்",
    "తెలుగు": "సాధారణ కాటన్ సాక్సులు",
    "मराठी": "साधे हवेशीर सुती मोजे",
    "বাংলা": "সাধারণ সুতির মোজা",
  },
  "Breathable mesh sneakers or canvas slip-ons": {
    "हिन्दी": "हवादार मेश स्नीकर्स या कैनवास स्लिप-ऑन",
    "ಕನ್ನಡ": "ಗಾಳಿಯಾಡುವ ಮೆಶ್ ಸ್ನೀಕರ್ಸ್ ಅಥವಾ ಕ್ಯಾನ್ವಾಸ್ ಸ್ಲಿಪ್-ಆನ್‌ಗಳು",
    "தமிழ்": "காற்றோட்டமான மெஷ் ஸ்னீக்கர்கள் அல்லது கேன்வாஸ் காலணிகள்",
    "తెలుగు": "గాలి ఆడే మెష్ స్నీకర్స్ లేదా కాన్వాస్ స్లిప్-ఆన్స్",
    "मराठी": "हवेशीर मेश स्नीकर्स किंवा कॅनव्हास स्लिप-ऑन",
    "বাংলা": "হাওয়া চলাচলকারী মেশ স্নিকার্স বা ক্যানভাস স্লিপ-অন",
  },
  "Comfortable open sandals or loafers": {
    "हिन्दी": "आरामदायक खुली सैंडल या लोफर्स",
    "ಕನ್ನಡ": "ಆರಾಮದಾಯಕ ತೆರೆದ ಸ್ಯಾಂಡಲ್ಸ್ ಅಥವಾ ಲೋಫರ್ಸ್",
    "தமிழ்": "வசதியான திறந்த சாண்டல்ஸ் அல்லது லோஃபர்கள்",
    "తెలుగు": "సౌకర్యవంతమైన ఓపెన్ శాండల్స్ లేదా లోఫర్స్",
    "मराठी": "आरामदायी मोकळे सँडल्स किंवा लोफर्स",
    "বাংলা": "আরামদায়ক খোলা স্যান্ডেল বা লোফার",
  },
  "Moisture-wicking cotton socks": {
    "हिन्दी": "पसीना सोखने वाले सूती मोज़े",
    "ಕನ್ನಡ": "ಬೆವರು ಹೀರಿಕೊಳ್ಳುವ ಹತ್ತಿ ಸಾಕ್ಸ್‌ಗಳು",
    "தமிழ்": "ஈரப்பதம் உறிஞ்சும் பருத்தி காலுறைகள்",
    "తెలుగు": "చెమట పీల్చే కాటన్ సాక్సులు",
    "मराठी": "घाम शोषून घेणारे सुती मोजे",
    "বাংলা": "ঘাম শোষণকারী সুতির মোজা",
  },
  "Closed-toe leather boots or sturdy sneakers": {
    "हिन्दी": "बंद चमड़े के जूते या मजबूत स्नीकर्स",
    "ಕನ್ನಡ": "ಮುಚ್ಚಿದ ಚರ್ಮದ ಬೂಟುಗಳು ಅಥವಾ ಗಟ್ಟಿಮುಟ್ಟಾದ ಸ್ನೀಕರ್ಸ್",
    "தமிழ்": "லெதர் பூட்ஸ் அல்லது உறுதியான ஸ்னீக்கர்கள்",
    "తెలుగు": "క్లోజ్డ్ లెదర్ బూట్లు లేదా బలమైన స్నీకర్స్",
    "मराठी": "बंद लेदर बूट किंवा मजबूत स्नीकर्स",
    "বাংলা": "বন্ধ চামড়ার বুট বা মজবুত স্নিকার্স",
  },
  "Warm cushioned walking shoes": {
    "हिन्दी": "गर्म कुशन वाले चलने के जूते",
    "ಕನ್ನಡ": "ಬೆಚ್ಚಗಿನ ಕುಶನ್ ಇರುವ ನಡಿಗೆಯ ಶೂಗಳು",
    "தமிழ்": "வெதுவெதுப்பான மெத்தை நடைப்பயிற்சி காலணிகள்",
    "తెలుగు": "వెచ్చని కుషన్ వాకింగ్ షూస్",
    "मराठी": "उबदार गादीदार चालण्याचे शूज",
    "বাংলা": "উষ্ণ কুশনযুক্ত হাঁটার জুতো",
  },
  "Thermal or woolen socks": {
    "हिन्दी": "थर्मल या ऊनी मोज़े",
    "ಕನ್ನಡ": "ಥರ್ಮಲ್ ಅಥವಾ ಉಣ್ಣೆಯ ಸಾಕ್ಸ್‌ಗಳು",
    "தமிழ்": "தெர்மல் அல்லது கம்பளி காலுறைகள்",
    "తెలుగు": "థర్మల్ లేదా ఉన్ని సాక్సులు",
    "मराठी": "थर्मल किंवा उबदार लोकरी मोजे",
    "বাংলা": "থার্মাল বা উলের মোজা",
  },
};

export function translateOutfitItem(item, language = "English") {
  if (!item || language === "English") return item || "";
  const trimmed = String(item).trim();
  if (OUTFIT_ITEMS_MAP[trimmed] && OUTFIT_ITEMS_MAP[trimmed][language]) {
    return OUTFIT_ITEMS_MAP[trimmed][language];
  }
  for (const [key, map] of Object.entries(OUTFIT_ITEMS_MAP)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(trimmed.toLowerCase())) {
      if (map[language]) return map[language];
    }
  }
  return item;
}

// Thermal feel translations
export const THERMAL_FEEL_MAP = {
  "Hot & Sunny": {
    "हिन्दी": "गर्म और धूपदार",
    "ಕನ್ನಡ": "ಬಿಸಿ ಮತ್ತು ಬಿಸಿಲು",
    "தமிழ்": "வெப்பம் & வெயில்",
    "తెలుగు": "వేడి & ఎండ",
    "मराठी": "उष्ण आणि ऊन",
    "বাংলা": "গরম ও রৌদ্রোজ্জ্বল",
  },
  "Warm & Pleasant": {
    "हिन्दी": "सुखद गर्म और सुहावना",
    "ಕನ್ನಡ": "ಬೆಚ್ಚಗೆ ಮತ್ತು ಹಿತಕರ",
    "தமிழ்": "இதமான வெப்பம்",
    "తెలుగు": "వెచ్చగా & ఆహ్లాదకరం",
    "मराठी": "उबदार व आल्हाददायक",
    "বাংলা": "উষ্ণ ও মনোরম",
  },
  "Mild & Comfortable": {
    "हिन्दी": "हल्का और आरामदायक",
    "ಕನ್ನಡ": "ಮಧ್ಯಮ ಮತ್ತು ಆರಾಮದಾಯಕ",
    "தமிழ்": "மிதமான & வசதியானது",
    "తెలుగు": "మితమైన & సౌకర్యవంతం",
    "मराठी": "सौम्य व आरामदायी",
    "বাংলা": "মৃদু ও আরামদায়ক",
  },
  "Cool & Breezy": {
    "हिन्दी": "ठंडा और हवादार",
    "ಕನ್ನಡ": "ತಂಪಾದ ಮತ್ತು ತಂಗಾಳಿ",
    "தமிழ்": "குளிர்ச்சியான தென்றல்",
    "తెలుగు": "చల్లని & గాలి కూడిన",
    "मराठी": "थंड व हवेशीर",
    "বাংলা": "ঠান্ডা ও মনোরম বাতাস",
  },
  "Chilly / Cold": {
    "हिन्दी": "काफ़ी ठंडा / शीत लहर",
    "ಕನ್ನಡ": "ತೀವ್ರ ಚಳಿ / ಶೀತ ವಾತಾವರಣ",
    "தமிழ்": "கடும் குளிர்",
    "తెలుగు": "చాలా చల్లగా / చలి",
    "मराठी": "कडाक्याची थंडी",
    "বাংলা": "হাড়কাঁপানো শীত",
  },
};

export function translateThermalFeel(feel, language = "English") {
  if (!feel || language === "English") return feel || "";
  const trimmed = String(feel).trim();
  if (THERMAL_FEEL_MAP[trimmed] && THERMAL_FEEL_MAP[trimmed][language]) {
    return THERMAL_FEEL_MAP[trimmed][language];
  }
  for (const [key, map] of Object.entries(THERMAL_FEEL_MAP)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase()) && map[language]) {
      return map[language];
    }
  }
  return feel;
}

// ====================================================
// ACCESSORIES TRANSLATIONS
// ====================================================

export const ACCESSORY_NAMES_MAP = {
  "Sturdy Windproof Umbrella": {
    "हिन्दी": "मजबूत विंडप्रूफ छाता",
    "ಕನ್ನಡ": "ಗಟ್ಟಿಮುಟ್ಟಾದ ಗಾಳಿ ನಿರೋಧಕ ಛತ್ರಿ",
    "தமிழ்": "காற்றுப்புகா உறுதியான குடை",
    "తెలుగు": "బలమైన గాలి-నిరోధక గొడుగు",
    "मराठी": "मजबूत विंडप्रूफ छत्री",
    "বাংলা": "মজবুত বাতাস-প্রতিরোধী ছাতা",
  },
  "Waterproof Bag Cover / Sleeve": {
    "हिन्दी": "वाटरप्रूफ बैग कवर / स्लीव",
    "ಕನ್ನಡ": "ಜಲನಿರೋಧಕ ಬ್ಯಾಗ್ ಕವರ್ / ಸ್ಲೀವ್",
    "தமிழ்": "நீர்ப்புகா பேக் கவர்",
    "తెలుగు": "వాటర్‌ప్రూఫ్ బ్యాగ్ కవర్",
    "मराठी": "वॉटरप्रूफ बॅग कव्हर",
    "বাংলা": "জলরোধী ব্যাগ কভার",
  },
  "UV-Protection Sunglasses": {
    "हिन्दी": "यूवी-प्रोटेक्शन धूप का चश्मा",
    "ಕನ್ನಡ": "ಯುವಿ ರಕ್ಷಣೆಯ ಸನ್‌ಗ್ಲಾಸ್‌ಗಳು",
    "தமிழ்": "புற ஊதா கதிர் தடுப்பு கூலிங்கிளாஸ்",
    "తెలుగు": "యూవీ రక్షణ సన్‌గ్లాసెస్",
    "मराठी": "अतिनील किरण संरक्षक सनग्लासेस",
    "বাংলা": "ইউভি সুরক্ষা সানগ্লাস",
  },
  "Sunscreen (SPF 30+)": {
    "हिन्दी": "सनस्क्रीन (एसपीएफ 30+)",
    "ಕನ್ನಡ": "ಸನ್‌ಸ್ಕ್ರೀನ್ ಲೋಷನ್ (SPF 30+)",
    "தமிழ்": "சன்ஸ்கிரீன் (SPF 30+)",
    "తెలుగు": "సన్‌స్క్రీన్ (SPF 30+)",
    "मराठी": "सनस्क्रीन (SPF 30+)",
    "বাংলা": "সানস্ক্রিন (SPF 30+)",
  },
  "Insulated Water Bottle": {
    "हिन्दी": "इंसुलेटेड पानी की बोतल",
    "ಕನ್ನಡ": "ಇನ್ಸುಲೇಟೆಡ್ ನೀರಿನ ಬಾಟಲಿ",
    "தமிழ்": "வெப்பம் காக்கும் தண்ணீர் பாட்டில்",
    "తెలుగు": "ఇన్సులేటెడ్ వాటర్ బాటిల్",
    "मराठी": "इन्सुलेटेड पाण्याची बाटली",
    "বাংলা": "ইনসুলেটেড জলের বোতল",
  },
  "Breathable Sun Cap / Hat": {
    "हिन्दी": "हवादार धूप की टोपी",
    "ಕನ್ನಡ": "ಗಾಳಿಯಾಡುವ ಸನ್ ಕ್ಯಾಪ್ / ಟೋಪಿ",
    "தமிழ்": "காற்றோட்டமான தொப்பி",
    "తెలుగు": "గాలి ఆడే ఎండ టోపీ",
    "मराठी": "हवेशीर सन कॅप / टोपी",
    "বাংলা": "হাওয়া চলাচলকারী রোদের টুপি",
  },
  "Windproof Scarf / Neck Wrap": {
    "हिन्दी": "विंडप्रूफ मफलर या स्कार्फ",
    "ಕನ್ನಡ": "ಗಾಳಿ ತಡೆಯುವ ಸ್ಕಾರ್ಫ್ / ಮಫ್ಲರ್",
    "தமிழ்": "காற்றுத் தடுப்பு ஸ்கார்ஃப்",
    "తెలుగు": "గాలి-నిరోధక స్కార్ఫ్ / మఫ్లర్",
    "मराठी": "विंडप्रूफ मफलर / स्कार्फ",
    "বাংলা": "বাতাস নিরোধক স্কার্ফ বা মাফলার",
  },
  "Warm Woolen Scarf or Muffler": {
    "हिन्दी": "गर्म ऊनी मफलर या स्कार्फ",
    "ಕನ್ನಡ": "ಬೆಚ್ಚಗಿನ ಉಣ್ಣೆಯ ಮಫ್ಲರ್ ಅಥವಾ ಸ್ಕಾರ್ಫ್",
    "தமிழ்": "கம்பளி மஃப்ளர் அல்லது ஸ்கார்ஃப்",
    "తెలుగు": "వెచ్చని ఉన్ని మఫ్లర్ లేదా స్కార్ఫ్",
    "मराठी": "उबदार लोकरी मफलर किंवा स्कार्फ",
    "বাংলা": "উষ্ণ উলের মাফলার বা স্কার্ফ",
  },
  "Thermal Gloves": {
    "हिन्दी": "थर्मल दस्ताने",
    "ಕನ್ನಡ": "ಥರ್ಮಲ್ ಕೈಗವಸುಗಳು",
    "தமிழ்": "தெர்மல் கையுறைகள்",
    "తెలుగు": "థర్మల్ గ್ಲೌವ್ಸ್ (చేతి తొడుగులు)",
    "मराठी": "थर्मल हातमोजे",
    "বাংলা": "থার্মাল গ্লাভস (হাতের দস্তানা)",
  },
  "Casual Polarized Sunglasses": {
    "हिन्दी": "कैजुअल पोलराइज्ड सनग्लासेस",
    "ಕನ್ನಡ": "ಕ್ಯಾಶುಯಲ್ ಪೋಲರೈಸ್ಡ್ ಸನ್‌ಗ್ಲಾಸ್‌ಗಳು",
    "தமிழ்": "கேஷுவல் கூலிங்கிளாஸ்",
    "తెలుగు": "సాధారణ పోలరైజ్డ్ సన్‌గ్లాసెస్",
    "मराठी": "कॅज्युअल पोलराइज्ड सनग्लासेस",
    "বাংলা": "ক্যাজুয়াল পোলারাইজড সানগ্লাস",
  },
  "Compact Travel Water Flask": {
    "हिन्दी": "कॉम्पैक्ट ट्रैवल पानी की बोतल",
    "ಕನ್ನಡ": "ಕಾಂಪ್ಯಾಕ್ಟ್ ಪ್ರಯಾಣದ ವಾಟರ್ ಫ್ಲಾಸ್ಕ್",
    "தமிழ்": "சிறிய பயண தண்ணீர் பாட்டில்",
    "తెలుగు": "తేలికపాటి ట్రావెల్ వాటర్ ఫ్లాస్క్",
    "मराठी": "प्रवासासाठी पाण्याची बाटली",
    "বাংলা": "কম্প্যাক্ট ট্রাভেল জলের ফ্লাস্ক",
  },
};

export function translateAccessoryName(name, language = "English") {
  if (!name || language === "English") return name || "";
  const trimmed = String(name).trim();
  if (ACCESSORY_NAMES_MAP[trimmed] && ACCESSORY_NAMES_MAP[trimmed][language]) {
    return ACCESSORY_NAMES_MAP[trimmed][language];
  }
  for (const [key, map] of Object.entries(ACCESSORY_NAMES_MAP)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(trimmed.toLowerCase())) {
      if (map[language]) return map[language];
    }
  }
  return name;
}

export function translateAccessoryLevel(level, language = "English") {
  if (!level || language === "English") return level || "";
  const clean = String(level).trim().toLowerCase();
  const levels = {
    essential: {
      "हिन्दी": "अनिवार्य",
      "ಕನ್ನಡ": "ಅಗತ್ಯ",
      "தமிழ்": "அவசியம்",
      "తెలుగు": "తప్పనిసరి",
      "मराठी": "अत्यावश्यक",
      "বাংলা": "অপরিহার্য",
    },
    recommended: {
      "हिन्दी": "अनुशंसित",
      "ಕನ್ನಡ": "ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ",
      "தமிழ்": "பரிந்துரைக்கப்படுகிறது",
      "తెలుగు": "సిఫార్సు చేయబడింది",
      "मराठी": "शिफारस केलेले",
      "বাংলা": "পরামর্শিত",
    },
    optional: {
      "हिन्दी": "ऐच्छिक",
      "ಕನ್ನಡ": "ಐಚ್ಛಿಕ",
      "தமிழ்": "விருப்பத்தேர்வு",
      "తెలుగు": "ఐచ్ఛికం",
      "मराठी": "पर्यायी",
      "বাংলা": "ঐচ্ছিক",
    },
  };
  if (levels[clean] && levels[clean][language]) {
    return levels[clean][language];
  }
  return level;
}

export function translateAccessoryNote(note, language = "English", weatherSummary = {}) {
  if (!note || language === "English") return note || "";
  const raw = String(note);

  // Rain probability match
  const rainMatch = raw.match(/rain probability\s*\((\d+)%\)/i);
  if (rainMatch || raw.includes("wet downpours") || raw.includes("High rain probability")) {
    const p = rainMatch ? rainMatch[1] : (weatherSummary?.rain_chance || "70");
    const map = {
      "हिन्दी": `बारिश की उच्च संभावना (${p}%) — भारी बारिश और छींटों से बचाव के लिए जरूरी`,
      "ಕನ್ನಡ": `ಹೆಚ್ಚಿನ ಮಳೆಯ ಸಾಧ್ಯತೆ (${p}%) — ಮಳೆಯಿಂದ ರಕ್ಷಣೆಗೆ ಅತ್ಯಗತ್ಯ ಸಾಧನ`,
      "தமிழ்": `அதிக மழை வாய்ப்பு (${p}%) — கனமழையிலிருந்து பாதுகாப்பு பெற அவசியம்`,
      "తెలుగు": `వర్షం పడే అవకాశం ఎక్కువ (${p}%) — వర్షం నుండి రక్షణకు తప్పనిసరి`,
      "मराठी": `पावसाची जास्त शक्यता (${p}%) — पावसात भिजण्यापासून संरक्षणासाठी गरजेचे`,
      "বাংলা": `বৃষ্টির প্রবল সম্ভাবনা (${p}%) — ভারী বৃষ্টি থেকে সুরক্ষার জন্য প্রয়োজনীয়`,
    };
    return map[language] || note;
  }

  // Bag cover note
  if (raw.includes("laptop") || raw.includes("electronics") || raw.includes("splashes") || raw.includes("books")) {
    const map = {
      "हिन्दी": "लैपटॉप, किताबें, दस्तावेज और इलेक्ट्रॉनिक्स को पानी से बचाता है",
      "ಕನ್ನಡ": "ಲ್ಯಾಪ್ಟಾಪ್, ಪುಸ್ತಕಗಳು ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್‌ಗಳನ್ನು ಮಳೆ ನೀರಿನಿಂದ ರಕ್ಷಿಸುತ್ತದೆ",
      "தமிழ்": "மடிக்கணினி, புத்தகங்கள் மற்றும் மின்னணு சாதனங்களை நீரிலிருந்து பாதுகாக்கிறது",
      "తెలుగు": "ల్యాప్‌టాప్, పుస్తకాలు మరియు ఎలక్ట్రానిక్స్‌ను తడవకుండా కాపాడుతుంది",
      "मराठी": "लॅपटॉप, पुस्तके आणि इलेक्ट्रॉनिक वस्तूंना पाण्यापासून वाचवते",
      "বাংলা": "ল্যাপটপ, বইপত্র এবং ইলেকট্রনিক জিনিসপত্রকে জল থেকে রক্ষা করে",
    };
    return map[language] || note;
  }

  // UV Sunglasses note
  const uvMatch = raw.match(/UV index is\s*([\d.]+)/i);
  if (uvMatch || raw.includes("UV index") || raw.includes("midday glare")) {
    const u = uvMatch ? uvMatch[1] : (weatherSummary?.uv_index || "5");
    const map = {
      "हिन्दी": `दिन का यूवी इंडेक्स ${u} है — तेज धूप की चमक से आंखों की सुरक्षा करता है`,
      "ಕನ್ನಡ": `ಹಗಲಿನ ಯುವಿ ಸೂಚ್ಯಂಕ ${u} ಇದೆ — ಕಣ್ಣುಗಳನ್ನು ತೀಕ್ಷ್ಣವಾದ ಬಿಸಿಲಿನಿಂದ ರಕ್ಷಿಸುತ್ತದೆ`,
      "தமிழ்": `பகலின் புற ஊதா குறியீடு ${u} — கண்களை பிரகாசமான வெயிலில் இருந்து பாதுகாக்கிறது`,
      "తెలుగు": `పగటిపూట యూవీ ఇండెక్స్ ${u} — తీవ్రమైన ఎండ నుండి కళ్ళను కాపాడుతుంది`,
      "मराठी": `दिवसाचा अतिनील निर्देशांक ${u} आहे — डोळ्यांचे कडक उन्हापासून रक्षण करते`,
      "বাংলা": `দিনের ইউভি সূচক ${u} — তীব্র রোদ থেকে চোখকে রক্ষা করে`,
    };
    return map[language] || note;
  }

  // Sunscreen note
  if (raw.includes("10 AM") || raw.includes("4 PM") || raw.includes("Sunscreen") || raw.includes("exposure")) {
    const map = {
      "हिन्दी": "सुबह 10 बजे से शाम 4 बजे के बीच धूप में निकलने पर अनुशंसित",
      "ಕನ್ನಡ": "ಬೆಳಗ್ಗೆ 10 ರಿಂದ ಸಂಜೆ 4 ರವರೆಗೆ ಹೊರಗೆ ಓಡಾಡುವಾಗ ಹಚ್ಚಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ",
      "தமிழ்": "காலை 10 மணி முதல் மாலை 4 மணி வரை வெளியில் செல்லும்போது பரிந்துரைக்கப்படுகிறது",
      "తెలుగు": "ఉదయం 10 నుండి సాయంత్రం 4 వరకు బయటకు వెళ్ళేటప్పుడు రాసుకోవడం మంచిది",
      "मराठी": "सकाळी १० ते दुपारी ४ दरम्यान उन्हात बाहेर पडताना लावण्याची शिफारस",
      "বাংলা": "সকাল ১০টা থেকে বিকেল ৪টার মধ্যে রোদে বের হলে ব্যবহারের পরামর্শ",
    };
    return map[language] || note;
  }

  // Water bottle note
  const peakMatch = raw.match(/peaks around\s*(\d+)°C/i);
  if (peakMatch || raw.includes("Stay hydrated") || raw.includes("warm afternoon")) {
    const tMax = peakMatch ? peakMatch[1] : (weatherSummary?.temp_max || "32");
    const map = {
      "हिन्दी": `दोपहर की गर्मी (लगभग ${tMax}°C) में शरीर में पानी की कमी न होने दें`,
      "ಕನ್ನಡ": `ಬಿಸಿಲಿನ ಮಧ್ಯಾಹ್ನ (ಗರಿಷ್ಠ ${tMax}°C) ನಿರ್ಜಲೀಕರಣವಾಗದಂತೆ ನೀರು ಕುಡಿಯಿರಿ`,
      "தமிழ்": `வெப்பமான மதிய வேளையில் (${tMax}°C) போதுமான தண்ணீர் குடிக்கவும்`,
      "తెలుగు": `మధ్యాహ్నపు ఎండలో (${tMax}°C) శరీరానికి తగినంత నీరు అందేలా చూసుకోండి`,
      "मराठी": `दुपारच्या उकाड्यात (कमाल ${tMax}°C) पुरेसे पाणी पिऊन हायड्रेटेड राहा`,
      "বাংলা": `গরমের দুপুরে (${tMax}°C) পর্যাপ্ত জল পান করে শরীর সুস্থ রাখুন`,
    };
    return map[language] || note;
  }

  // Sun cap note
  if (raw.includes("scalp") || raw.includes("radiant solar") || raw.includes("Sun Cap")) {
    const map = {
      "हिन्दी": "सिर और चेहरे को सीधी तेज धूप से बचाता है",
      "ಕನ್ನಡ": "ತಲೆ ಮತ್ತು ಮುಖವನ್ನು ನೇರವಾದ ಸೂರ್ಯನ ಶಾಖದಿಂದ ರಕ್ಷಿಸುತ್ತದೆ",
      "தமிழ்": "நேரடி வெயிலில் இருந்து தலை மற்றும் முகத்தைப் பாதுகாக்கிறது",
      "తెలుగు": "ముఖం మరియు తలపై నేరుగా ఎండ పడకుండా కాపాడుతుంది",
      "मराठी": "डोके आणि चेहऱ्याचे थेट कडक उन्हापासून रक्षण करते",
      "বাংলা": "মাথা এবং মুখকে সরাসরি তীব্র রোদ থেকে রক্ষা করে",
    };
    return map[language] || note;
  }

  // Windproof scarf note
  const windMatch = raw.match(/brisk winds\s*\((\d+)\s*km\/h\)/i);
  if (windMatch || raw.includes("brisk winds") || raw.includes("Windproof Scarf")) {
    const w = windMatch ? windMatch[1] : (weatherSummary?.wind_speed_kmh || "20");
    const map = {
      "हिन्दी": `तेज हवाओं (${w} km/h) के खिलाफ आरामदायक सुरक्षा प्रदान करता है`,
      "ಕನ್ನಡ": `ಬಲವಾದ ತಣ್ಣನೆಯ ಗಾಳಿಯಿಂದ (${w} km/h) ಹಿತಕರ ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ`,
      "தமிழ்": `வேகமான காற்றில் (${w} km/h) இருந்து இதமான பாதுகாப்பு அளிக்கிறது`,
      "తెలుగు": `చల్లటి వేగవంతమైన గాలుల నుండి (${w} km/h) సౌకర్యవంతమైన రక్షణ`,
      "मराठी": `वेगाने वाहणाऱ्या वाऱ्यापासून (${w} km/h) आरामदायी संरक्षण देते`,
      "বাংলা": `তীক্ষ্ণ বাতাসের বিরুদ্ধে (${w} km/h) আরামদায়ক সুরক্ষা প্রদান করে`,
    };
    return map[language] || note;
  }

  // Woolen scarf note
  const lowMatch = raw.match(/chilly lows of\s*(\d+)°C/i);
  if (lowMatch || raw.includes("chilly lows") || raw.includes("neck and chest warm")) {
    const tMin = lowMatch ? lowMatch[1] : (weatherSummary?.temp_min || "14");
    const map = {
      "हिन्दी": `सुबह-शाम की ठंड (${tMin}°C) में गले और सीने को गर्म रखता है`,
      "ಕನ್ನಡ": `ತಂಪಾದ ವಾತಾವರಣದಲ್ಲಿ (${tMin}°C) ಕುತ್ತಿಗೆ ಮತ್ತು ಎದೆಯನ್ನು ಬೆಚ್ಚಗಿಡುತ್ತದೆ`,
      "தமிழ்": `குளிர்ந்த நேரத்தில் (${tMin}°C) கழுத்து மற்றும் மார்பை வெதுவெதுப்பாக வைக்கிறது`,
      "తెలుగు": `చలి సమయంలో (${tMin}°C) గొంతు మరియు ఛాతీని వెచ్చగా ఉంచుతుంది`,
      "मराठी": `थंडीच्या वेळी (${tMin}°C) गळा आणि छाती उबदार ठेवते`,
      "বাংলা": `ঠান্ডার সময় (${tMin}°C) গলা ও বুক উষ্ণ রাখে`,
    };
    return map[language] || note;
  }

  // Thermal gloves note
  if (raw.includes("hands cozy") || raw.includes("Thermal Gloves")) {
    const map = {
      "हिन्दी": "सुबह और शाम के सफर के दौरान हाथों को गर्म रखता है",
      "ಕನ್ನಡ": "ಮುಂಜಾನೆ ಮತ್ತು ಸಂಜೆಯ ಪ್ರಯಾಣದಲ್ಲಿ ಕೈಗಳನ್ನು ಬೆಚ್ಚಗಿಡುತ್ತದೆ",
      "தமிழ்": "அதிகாலை மற்றும் மாலை பயணங்களின் போது கைகளை இதமாக வைக்கிறது",
      "తెలుగు": "తెల్లవారుజామున మరియు సాయంత్రం ప్రయాణాలలో చేతులను వెచ్చగా ఉంచుతుంది",
      "मराठी": "सकाळच्या आणि संध्याकाळच्या प्रवासात हात उबदार ठेवतात",
      "বাংলা": "ভোর ও সন্ধ্যার যাতায়াতের সময় হাত উষ্ণ রাখে",
    };
    return map[language] || note;
  }

  // Casual sunglasses note
  if (raw.includes("pleasant ambient outdoor") || raw.includes("Polarized Sunglasses")) {
    const map = {
      "हिन्दी": "सुखद मौसम में बाहर घूमने और टहलने के लिए बेहतरीन",
      "ಕನ್ನಡ": "ಹಿತಕರ ವಾತಾವರಣದಲ್ಲಿ ಹೊರಗೆ ಓಡಾಡಲು ಮತ್ತು ವಾಕಿಂಗ್‌ಗೆ ಸೂಕ್ತ",
      "தமிழ்": "சுற்றுலா மற்றும் நடைப்பயணத்திற்கு ஏற்ற துணைப்பொருள்",
      "తెలుగు": "ఆహ్లాదకరమైన వాతావరణంలో ప్రయాణానికి మరియు నడవడానికి ఉత్తమం",
      "मराठी": "छान हवेत बाहेर फिरण्यासाठी आणि चालण्यासाठी उत्तम",
      "বাংলা": "মনোরম আবহাওয়ায় বাইরে হাঁটাচলা ও ভ্রমণের জন্য চমৎকার",
    };
    return map[language] || note;
  }

  // Travel flask note
  if (raw.includes("Convenient hydration") || raw.includes("Travel Water Flask")) {
    const map = {
      "हिन्दी": "सफर या रोजमर्रा के कामों के दौरान पानी पीने की सुविधा",
      "ಕನ್ನಡ": "ಪ್ರಯಾಣ ಅಥವಾ ಕೆಲಸದ ಸಮಯದಲ್ಲಿ ನೀರು ಕುಡಿಯಲು ಸುಲಭ",
      "தமிழ்": "பயணத்தின் போது தண்ணீர் குடிக்க வசதியானது",
      "తెలుగు": "ప్రయాణాలలో సౌకర్యవంతంగా నీరు త్రాగడానికి ఉపయోగపడుతుంది",
      "मराठी": "प्रवासात किंवा कामाच्या वेळी पाणी पिण्यासाठी सोयीस्कर",
      "বাংলা": "যাতায়াত বা দৈনন্দিন কাজের সময় সুবিধাজনক জলপান",
    };
    return map[language] || note;
  }

  return note;
}

// ====================================================
// OUTFIT SUMMARY BANNER TRANSLATION
// ====================================================

export function translateOutfitSummary(summary, language = "English", weatherSummary = {}, dayLabel = "") {
  if (!summary || language === "English") return summary || "";
  const raw = String(summary);

  const isToday = raw.toLowerCase().includes("today") || (dayLabel && dayLabel.toLowerCase().includes("today"));
  const dayTr = isToday
    ? {
        "हिन्दी": "आज",
        "ಕನ್ನಡ": "ಇಂದು",
        "தமிழ்": "இன்று",
        "తెలుగు": "ఈరోజు",
        "मराठी": "आज",
        "বাংলা": "আজ",
      }[language] || "आज"
    : {
        "हिन्दी": "कल",
        "ಕನ್ನಡ": "ನಾಳೆ",
        "தமிழ்": "நாளை",
        "తెలుగు": "రేపు",
        "मराठी": "उद्या",
        "বাংলা": "আগামীকাল",
      }[language] || "कल";

  const rainMatch = raw.match(/(\d+)%\s*chance(?:,\s*([\d.]+)\s*mm)?/i);
  const rainChance = rainMatch ? rainMatch[1] : (weatherSummary?.rain_chance || "60");
  const rainMm = rainMatch && rainMatch[2] ? rainMatch[2] : (weatherSummary?.precipitation_mm || "2.5");

  const tempMax = weatherSummary?.temp_max || "30";
  const tempMin = weatherSummary?.temp_min || "21";

  // Rain summary
  if (raw.includes("With rain expected") || raw.includes("umbrella handy") || raw.includes("quick-drying")) {
    const map = {
      "हिन्दी": `${dayTr} बारिश की संभावना (${rainChance}%, ${rainMm} mm) है, जल्दी सूखने वाले कपड़े व वाटरप्रूफ जूते पहनें और साथ में छाता जरूर रखें!`,
      "ಕನ್ನಡ": `${dayTr} ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ (${rainChance}%, ${rainMm} mm) ಇರುವುದರಿಂದ, ಬೇಗ ಒಣಗುವ ಬಟ್ಟೆಗಳು ಮತ್ತು ಜಲನಿರೋಧಕ ಶೂಗಳನ್ನು ಧರಿಸಿ ಹಾಗೂ ಛತ್ರಿ ಜೊತೆಯಲ್ಲಿಡಿ!`,
      "தமிழ்": `${dayTr} மழை வாய்ப்பு (${rainChance}%, ${rainMm} mm) இருப்பதால், விரைவில் உலரும் ஆடைகள், நீர்ப்புகா காலணிகள் மற்றும் கையில் ஒரு குடை வைத்திருக்கவும்!`,
      "తెలుగు": `${dayTr} వర్షం పడే అవకాశం (${rainChance}%, ${rainMm} mm) ఉంది, త్వరగా ఆరే బట్టలు, వాటర్‌ప్రూఫ్ షూస్ ధరించండి మరియు గొడుగు వెంట ఉంచుకోండి!`,
      "मराठी": `${dayTr} पावसाची शक्यता (${rainChance}%, ${rainMm} mm) असल्याने, लवकर सुकणारे कपडे व वॉटरप्रूफ शूज वापरा आणि सोबत छत्री ठेवा!`,
      "বাংলা": `${dayTr} বৃষ্টির সম্ভাবনা (${rainChance}%, ${rainMm} mm) রয়েছে, দ্রুত শুকিয়ে যাওয়া পোশাক ও জলরোধী জুতো পরুন এবং সঙ্গে ছাতা রাখুন!`,
    };
    return map[language] || summary;
  }

  // Warm & sunny summary
  if (raw.includes("warm and sunny") || raw.includes("stay hydrated") || raw.includes("breathable cottons")) {
    const map = {
      "हिन्दी": `${dayTr} मौसम गर्म और धूपदार रहेगा (अधिकतम ${tempMax}°C)। हल्के सूती कपड़े पहनें, धूप का चश्मा लगाएं और भरपूर पानी पिएं!`,
      "ಕನ್ನಡ": `${dayTr} ಹವಾಮಾನವು ಬಿಸಿಯಾಗಿರುತ್ತದೆ (ಗರಿಷ್ಠ ${tempMax}°C). ಹಗುರವಾದ ಹತ್ತಿ ಬಟ್ಟೆಗಳನ್ನು ಧರಿಸಿ, ಸನ್‌ಗ್ಲಾಸ್ ಬಳಸಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ!`,
      "தமிழ்": `${dayTr} வானிலை வெப்பமாகவும் வெயிலாகவும் இருக்கும் (${tempMax}°C). மெல்லிய பருத்தி ஆடைகள், கூலிங்கிளாஸ் அணியுங்கள் மற்றும் நிறைய தண்ணீர் குடியுங்கள்!`,
      "తెలుగు": `${dayTr} వాతావరణం వేడిగా ఉంటుంది (గరిష్టం ${tempMax}°C). తేలికపాటి కాటన్ దుస్తులు ధరించండి, ఎండ కళ్ళద్దాలు వాడండి మరియు పుష్కలంగా నీరు త్రాగండి!`,
      "मराठी": `${dayTr} हवामान उष्ण आणि सूर्यप्रकाशाचे राहील (कमाल ${tempMax}°C). हलके सुती कपडे वापरा, सनग्लासेस घाला आणि भरपूर पाणी प्या!`,
      "বাংলা": `${dayTr} আবহাওয়া উষ্ণ ও রৌদ্রোজ্জ্বল থাকবে (সর্বোচ্চ ${tempMax}°C)। হালকা সুতির পোশাক পরুন, সানগ্লাস ব্যবহার করুন এবং পর্যাপ্ত জল পান করুন!`,
    };
    return map[language] || summary;
  }

  // Cooler temperatures summary
  if (raw.includes("Cooler temperatures") || raw.includes("jacket or sweater") || raw.includes("warm layers")) {
    const map = {
      "हिन्दी": `${dayTr} ठंड रहने का अनुमान है (न्यूनतम ${tempMin}°C)। जैकेट या स्वेटर के साथ आरामदायक गर्म कपड़े पहनें।`,
      "ಕನ್ನಡ": `${dayTr} ತಂಪಾದ ಹವಾಮಾನವಿರಲಿದೆ (ಕನಿಷ್ಠ ${tempMin}°C). ಜಾಕೆಟ್ ಅಥವಾ ಸ್ವೆಟರ್‌ನೊಂದಿಗೆ ಆರಾಮದಾಯಕ ಬೆಚ್ಚಗಿನ ಬಟ್ಟೆಗಳನ್ನು ಧರಿಸಿ.`,
      "தமிழ்": `${dayTr} குளிர்ந்த வானிலை எதிர்பார்க்கப்படுகிறது (குறைந்தபட்சம் ${tempMin}°C). ஜாக்கெட் அல்லது ஸ்வெட்டருடன் கூடிய வெதுவெதுப்பான ஆடைகளை அணியுங்கள்.`,
      "తెలుగు": `${dayTr} చల్లటి వాతావరణం ఉంటుంది (కనిష్టం ${tempMin}°C). జాకెట్ లేదా స్వెటర్‌తో కూడిన వెచ్చని దుస్తులు ధరించండి.`,
      "मराठी": `${dayTr} थंड हवामानाचा अंदाज आहे (किमान ${tempMin}°C). जॅकेट किंवा स्वेटरसह उबदार कपडे वापरा.`,
      "বাংলা": `${dayTr} ঠান্ডা আবহাওয়ার সম্ভাবনা রয়েছে (সর্বনিম্ন ${tempMin}°C)। জ্যাকেট বা সোয়েটার সহ আরামদায়ক উষ্ণ পোশাক পরুন।`,
    };
    return map[language] || summary;
  }

  // Pleasant weather summary
  if (raw.includes("pleasant and comfortable") || raw.includes("casual cottons")) {
    const map = {
      "हिन्दी": `${dayTr} मौसम अत्यंत सुहावना और सुखद रहेगा (${tempMax}°C / ${tempMin}°C)। रोजमर्रा के सामान्य सूती कपड़े या हल्की परतें सबसे उपयुक्त रहेंगी!`,
      "ಕನ್ನಡ": `${dayTr} ಹವಾಮಾನವು ಅತ್ಯಂತ ಆಹ್ಲಾದಕರ ಮತ್ತು ಹಿತಕರವಾಗಿರುತ್ತದೆ (${tempMax}°C / ${tempMin}°C). ಸಾಮಾನ್ಯ ಹತ್ತಿ ಉಡುಪುಗಳು ಅತ್ಯಂತ ಸೂಕ್ತವಾಗಿವೆ!`,
      "தமிழ்": `${dayTr} வானிலை மிகவும் இதமாகவும் வசதியாகவும் இருக்கும் (${tempMax}°C / ${tempMin}°C). வழக்கமான பருத்தி ஆடைகள் சிறந்த தேர்வாகும்!`,
      "తెలుగు": `${dayTr} వాతావరణం చాలా ఆహ్లాదకరంగా ఉంటుంది (${tempMax}°C / ${tempMin}°C). సాధారణ కాటన్ దుస్తులు ధరించడం ఉత్తమం!`,
      "मराठी": `${dayTr} हवामान अतिशय आल्हाददायक आणि सुखद राहील (${tempMax}°C / ${tempMin}°C). नेहमीचे सुती कपडे वापरणे उत्तम ठरेल!`,
      "বাংলা": `${dayTr} আবহাওয়া অত্যন্ত মনোরম ও আরামদায়ক থাকবে (${tempMax}°C / ${tempMin}°C)। দৈনন্দিন সাধারণ সুতির পোশাক সবচেয়ে উপযুক্ত!`,
    };
    return map[language] || summary;
  }

  return summary;
}

// ====================================================
// OUTDOOR ACTIVITIES STATUS & NOTES TRANSLATION
// ====================================================

export const ACTIVITY_STATUS_MAP = {
  "Cautious": {
    "हिन्दी": "सतर्क रहें",
    "ಕನ್ನಡ": "ಎಚ್ಚರವಿರಲಿ",
    "தமிழ்": "எச்சரிக்கை",
    "తెలుగు": "జాగ్రత్త",
    "मराठी": "सावध राहा",
    "বাংলা": "সতর্ক থাকুন",
  },
  "Avoid Afternoon": {
    "हिन्दी": "दोपहर में बचें",
    "ಕನ್ನಡ": "ಮಧ್ಯಾಹ್ನ ತಪ್ಪಿಸಿ",
    "தமிழ்": "மதிய வேளையை தவிர்க்கவும்",
    "తెలుగు": "మధ్యాహ్నం నివారించండి",
    "मराठी": "दुपारी टाळा",
    "বাংলা": "দুপুরবেলা এড়িয়ে চলুন",
  },
  "Great": {
    "हिन्दी": "उत्कृष्ट",
    "ಕನ್ನಡ": "ಉತ್ತಮ",
    "தமிழ்": "மிக நன்று",
    "తెలుగు": "చాలా బాగుంది",
    "मराठी": "उत्कृष्ट",
    "বাংলা": "চমৎকার",
  },
  "Indoor Only": {
    "हिन्दी": "केवल घर के अंदर",
    "ಕನ್ನಡ": "ಮನೆಯೊಳಗೆ ಮಾತ್ರ",
    "தமிழ்": "வீட்டிற்குள் மட்டும்",
    "తెలుగు": "ఇంట్లోనే ఆరబెట్టండి",
    "मराठी": "फक्त घरातच",
    "বাংলা": "শুধুমাত্র ঘরের ভেতরে",
  },
  "Fast": {
    "हिन्दी": "तेज धूप",
    "ಕನ್ನಡ": "ವೇಗವಾಗಿ ಒಣಗುತ್ತದೆ",
    "தமிழ்": "விரைவாக உலரும்",
    "తెలుగు": "త్వరగా ఆరుతాయి",
    "मराठी": "झटपट सुकतील",
    "বাংলা": "দ্রুত শুকাবে",
  },
  "Normal": {
    "हिन्दी": "सामान्य",
    "ಕನ್ನಡ": "ಸಾಮಾನ್ಯ",
    "தமிழ்": "சாதாரண நிலை",
    "తెలుగు": "సాధారణం",
    "मराठी": "सामान्य",
    "বাংলা": "স্বাভাবিক",
  },
  "Waterlogging Delay": {
    "हिन्दी": "जलभराव / देरी",
    "ಕನ್ನಡ": "ನೀರು ನಿಲ್ಲುವುದು / ವಿಳಂಬ",
    "தமிழ்": "வெள்ளம் / தாமதம்",
    "తెలుగు": "నీరు నిల్వ / ఆలస్యం",
    "मराठी": "पाणी साचणे / विलंब",
    "বাংলা": "জলমগ্নতা / বিলম্ব",
  },
  "Smooth": {
    "हिन्दी": "सुगम आवागमन",
    "ಕನ್ನಡ": "ಸುಗಮ ಸಂಚಾರ",
    "தமிழ்": "சீரான பயணம்",
    "తెలుగు": "సులభ ప్రయాణం",
    "मराठी": "सुरळीत प्रवास",
    "বাংলা": "সহজ যাতায়াত",
  },
};

export function translateActivityStatus(status, language = "English") {
  if (!status || language === "English") return status || "";
  const clean = String(status).trim();
  if (ACTIVITY_STATUS_MAP[clean] && ACTIVITY_STATUS_MAP[clean][language]) {
    return ACTIVITY_STATUS_MAP[clean][language];
  }
  for (const [key, map] of Object.entries(ACTIVITY_STATUS_MAP)) {
    if (clean.toLowerCase().includes(key.toLowerCase()) && map[language]) {
      return map[language];
    }
  }
  return status;
}

export function translateActivityNote(note, language = "English") {
  if (!note || language === "English") return note || "";
  const raw = String(note).trim();

  if (raw.includes("Wet pavements") || raw.includes("cautious footing")) {
    const map = {
      "हिन्दी": "गीली सड़कों पर फिसलने से बचने के लिए संभलकर चलें।",
      "ಕನ್ನಡ": "ಒದ್ದೆಯಾದ ರಸ್ತೆಯಲ್ಲಿ ಜಾರದಂತೆ ಎಚ್ಚರಿಕೆಯಿಂದ ಓಡಿ.",
      "தமிழ்": "ஈரமான நடைபாதைகளில் கவனமாக நடக்கவும்.",
      "తెలుగు": "తడి రోడ్లపై జారకుండా జాగ్రత్తగా నడవండి.",
      "मराठी": "ओल्या रस्त्यांवर पाय घसरू नये म्हणून काळजीपूर्वक धावा.",
      "বাংলা": "ভেজা রাস্তায় সাবধানে চলাচল করুন।",
    };
    return map[language] || note;
  }

  if (raw.includes("early morning before peak heat") || raw.includes("Best in early morning")) {
    const map = {
      "हिन्दी": "दोपहर की तेज धूप से पहले सुबह जल्दी दौड़ना सबसे अच्छा है।",
      "ಕನ್ನಡ": "ತೀವ್ರ ಬಿಸಿಲಿಗಿಂತ ಮುಂಚೆ ಬೆಳಗಿನ ಜಾವದಲ್ಲಿ ಓಡುವುದು ಉತ್ತಮ.",
      "தமிழ்": "கடும் வெயிலுக்கு முன் அதிகாலையில் உடற்பயிற்சி செய்வது சிறந்தது.",
      "తెలుగు": "ఎండ తీవ్రత పెరగకముందే ఉదయాన్నే రన్నింగ్ చేయడం మంచిది.",
      "मराठी": "कडक उन्हापूर्वी पहाटे लवकर धावणे सर्वात योग्य.",
      "বাংলা": "তীব্র রোদের আগে ভোরে ব্যায়াম করা সবচেয়ে ভালো।",
    };
    return map[language] || note;
  }

  if (raw.includes("Optimal temperature and air") || raw.includes("conditions for running")) {
    const map = {
      "हिन्दी": "दौड़ने व व्यायाम के लिए तापमान और हवा की स्थिति बहुत अनुकूल है।",
      "ಕನ್ನಡ": "ಓಟ ಮತ್ತು ವ್ಯಾಯಾಮಕ್ಕೆ ಅನುಕೂಲಕರವಾದ ತಾಪಮಾನವಿದೆ.",
      "தமிழ்": "ஓட்டப்பயிற்சிக்கு உகந்த வெப்பநிலை மற்றும் நல்ல காற்று.",
      "తెలుగు": "రన్నింగ్ మరియు వ్యాయామాలకు అనువైన వాతావరణం.",
      "मराठी": "धावण्यासाठी आणि व्यायामासाठी पोषक तापमान आणि हवा.",
      "বাংলা": "দৌড়ানো এবং শরীরচর্চার জন্য অনুকূল তাপমাত্রা ও পরিবেশ।",
    };
    return map[language] || note;
  }

  if (raw.includes("dry clothes indoors") || raw.includes("High precipitation risk")) {
    const map = {
      "हिन्दी": "बारिश का अधिक खतरा; कपड़े घर के अंदर ही सुखाएं।",
      "ಕನ್ನಡ": "ಮಳೆಯ ಸಾಧ್ಯತೆ ಹೆಚ್ಚಿದೆ; ಬಟ್ಟೆಗಳನ್ನು ಮನೆಯೊಳಗೆ ಒಣಗಿಸಿ.",
      "தமிழ்": "மழை பெய்ய வாய்ப்புள்ளது; துணிகளை வீட்டிற்குள் உலர வைக்கவும்.",
      "తెలుగు": "వర్షం పడే ప్రమాదం ఉంది; బట్టలను ఇంట్లోనే ఆరబెట్టండి.",
      "मराठी": "पावसाची जास्त शक्यता; कपडे घरातच वाळवा.",
      "বাংলা": "বৃষ্টির প্রবল সম্ভাবনা; ঘরের ভেতরে কাপড় শুকান।",
    };
    return map[language] || note;
  }

  if (raw.includes("Direct sunlight and dry air") || raw.includes("dry laundry quickly")) {
    const map = {
      "हिन्दी": "तेज धूप और शुष्क हवा के कारण कपड़े बहुत जल्दी सूखेंगे।",
      "ಕನ್ನಡ": "ಬಿಸಿಲು ಮತ್ತು ಒಣ ಗಾಳಿಯಿಂದ ಬಟ್ಟೆಗಳು ತ್ವರಿತವಾಗಿ ಒಣಗುತ್ತವೆ.",
      "தமிழ்": "நேரடி சூரிய ஒளி மற்றும் வறண்ட காற்று துணிகளை வேகமாக உலர்த்தும்.",
      "తెలుగు": "ఎండ మరియు పొడి గాలి వల్ల బట్టలు త్వరగా ఆరిపోతాయి.",
      "मराठी": "कडक ऊन आणि कोरड्या हवेमुळे कपडे पटकन वाळतील.",
      "বাংলা": "তীব্র রোদ ও শুষ্ক বাতাসের কারণে কাপড় দ্রুত শুকিয়ে যাবে।",
    };
    return map[language] || note;
  }

  if (raw.includes("Good drying conditions outdoors")) {
    const map = {
      "हिन्दी": "कपड़े बाहर सुखाने के लिए अच्छा मौसम है।",
      "ಕನ್ನಡ": "ಬಟ್ಟೆಗಳನ್ನು ಹೊರಗೆ ಒಣಗಿಸಲು ಉತ್ತಮ ಹವಾಮಾನವಿದೆ.",
      "தமிழ்": "துணிகளை வெளியே உலர்த்துவதற்கு ஏற்ற வானிலை.",
      "తెలుగు": "బయట బట్టలు ఆరబెట్టడానికి మంచి వాతావరణం.",
      "मराठी": "कपडे बाहेर वाळवण्यासाठी उत्तम परिस्थिती आहे.",
      "বাংলা": "বাইরে কাপড় শুকানোর জন্য ভালো পরিবেশ।",
    };
    return map[language] || note;
  }

  if (raw.includes("15-20 mins extra travel time") || raw.includes("wet traffic")) {
    const map = {
      "हिन्दी": "बारिश के कारण ट्रैफिक धीमा हो सकता है, 15-20 मिनट अतिरिक्त समय लेकर निकलें।",
      "ಕನ್ನಡ": "ಮಳೆ ಮತ್ತು ಟ್ರಾಫಿಕ್ ಕಾರಣ 15-20 ನಿಮಿಷ ಮುಂಚಿತವಾಗಿ ಹೊರಡಿ.",
      "தமிழ்": "மழைப் போக்குவரத்து காரணமாக பயணத்திற்கு 15-20 நிமிடங்கள் கூடுதல் நேரம் ஒதுக்குங்கள்.",
      "తెలుగు": "వర్షం మరియు ట్రాఫిక్ కారణంగా ప్రయాణానికి 15-20 నిమిషాల అదనపు సమయం కేటాయించండి.",
      "मराठी": "पावसामुळे ट्रॅफिक वाढू शकते, प्रवासासाठी १५-२० मिनिटे जादा वेळ ठेवा.",
      "বাংলা": "বৃষ্টির ট্রাফিকের জন্য যাতায়াতে ১৫-২০ মিনিট অতিরিক্ত সময় হাতে রাখুন।",
    };
    return map[language] || note;
  }

  if (raw.includes("Favorable road and transit conditions")) {
    const map = {
      "हिन्दी": "सड़क और आवागमन की स्थिति बिल्कुल सामान्य और अनुकूल है।",
      "ಕನ್ನಡ": "ರಸ್ತೆ ಮತ್ತು ಪ್ರಯಾಣದ ಪರಿಸ್ಥಿತಿಗಳು ಅನುಕೂಲಕರವಾಗಿವೆ.",
      "தமிழ்": "சாலை மற்றும் போக்குவரத்து நிலைமைகள் சீராக உள்ளன.",
      "తెలుగు": "రోడ్లు మరియు ప్రయాణ పరిస్థితులు అనుకూలంగా ఉన్నాయి.",
      "मराठी": "रस्ते आणि वाहतुकीची परिस्थिती सुरळीत व अनुकूल आहे.",
      "বাংলা": "রাস্তা এবং যাতায়াতের পরিস্থিতি অত্যন্ত অনুকূল।",
    };
    return map[language] || note;
  }

  return note;
}

// ====================================================
// CLIMATE RESEARCH & SCIENTIFIC FINDINGS TRANSLATIONS
// ====================================================

export const INSIGHT_TITLES_MAP = {
  "Regional Heatwave Shift": {
    "हिन्दी": "क्षेत्रीय लू व गर्मी का बदलाव",
    "ಕನ್ನಡ": "ಪ್ರಾದೇಶಿಕ ಶಾಖದ ಅಲೆಯ ಬದಲಾವಣೆ",
    "தமிழ்": "பிராந்திய வெப்ப அலை மாற்றம்",
    "తెలుగు": "ప్రాంతీయ తీవ్ర వడగాల్పుల మార్పు",
    "मराठी": "प्रादेशिक उष्णतेच्या लाटेचा बदल",
    "বাংলা": "আঞ্চলিক তাপপ্রবাহের পরিবর্তন",
  },
  "Precipitation Spikes & Flash Floods": {
    "हिन्दी": "अचानक भारी बारिश और बाढ़ का खतरा",
    "ಕನ್ನಡ": "ಅನಿರೀಕ್ಷಿತ ಧಾರಾಕಾರ ಮಳೆ ಮತ್ತು ಹಠಾತ್ ಪ್ರವಾಹ",
    "தமிழ்": "திடீர் கனமழை மற்றும் வெள்ளப்பெருக்கு",
    "తెలుగు": "ఆకస్మిక భారీ వర్షాలు & మెరుపు వరదలు",
    "मराठी": "अचानक मुसळधार पाऊस आणि पूर धोका",
    "বাংলা": "হঠাৎ অতিবৃষ্টি ও আকস্মিক বন্যা",
  },
  "MoES 2050 Climate Pathways": {
    "हिन्दी": "पृथ्वी विज्ञान मंत्रालय (MoES) 2050 जलवायु मॉडल",
    "ಕನ್ನಡ": "ಭೂ ವಿಜ್ಞಾನ ಸಚಿವಾಲಯ (MoES) 2050 ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
    "தமிழ்": "புவி அறிவியல் அமைச்சகம் (MoES) 2050 காலநிலை மாதிரி",
    "తెలుగు": "భూ విజ్ఞాన మంత్రిత్వ శాఖ (MoES) 2050 వాతావరణ అంచనాలు",
    "मराठी": "भूविज्ञान मंत्रालय (MoES) २०५० हवामान प्रारूप",
    "বাংলা": "ভূ-বিজ্ঞান মন্ত্রক (MoES) ২০৫০ জলবায়ু অনুমান",
  },
  "Agromet Mitigation & Resilient Crops": {
    "हिन्दी": "कृषि-मौसम अनुकूलन और सहनशील फसलें",
    "ಕನ್ನಡ": "ಕೃಷಿ-ಹವಾಮಾನ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ನಿರೋಧಕ ಬೆಳೆಗಳು",
    "தமிழ்": "வேளாண் வானிலை மேலாண்மை & எதிர்ப்புத் திறன் கொண்ட பயிர்கள்",
    "తెలుగు": "వ్యవసాయ వాతావరణ అనుకూలత & తట్టుకునే పంటలు",
    "मराठी": "कृषी-हवामान अनुकूलन आणि प्रतिकारक पिके",
    "বাংলা": "কৃষি-আবহাওয়া অভিযোজন ও সহনশীল ফসল",
  },
};

export function translateInsightTitle(title, language = "English") {
  if (!title || language === "English") return title || "";
  const trimmed = String(title).trim();
  if (INSIGHT_TITLES_MAP[trimmed] && INSIGHT_TITLES_MAP[trimmed][language]) {
    return INSIGHT_TITLES_MAP[trimmed][language];
  }
  for (const [key, map] of Object.entries(INSIGHT_TITLES_MAP)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(trimmed.toLowerCase())) {
      if (map[language]) return map[language];
    }
  }
  return title;
}

export const INSIGHT_CONTENTS_MAP = [
  // Index 0: Heatwave
  {
    pattern: /Regional heat extremes|heat extremes|38°C/i,
    map: {
      "हिन्दी": "पिछले एक दशक में 38°C से अधिक अत्यधिक गर्मी के दिनों की आवृत्ति में 16% की वृद्धि हुई है।",
      "ಕನ್ನಡ": "ಕಳೆದ ಒಂದು ದಶಕದಲ್ಲಿ 38°C ಗಿಂತ ಹೆಚ್ಚಿನ ತೀವ್ರ ಶಾಖದ ದಿನಗಳ ಪ್ರಮಾಣವು 16% ಹೆಚ್ಚಾಗಿದೆ.",
      "தமிழ்": "கடந்த பத்தாண்டுகளில் 38°C-க்கு அதிகமான தீவிர வெப்ப நிகழ்வுகள் 16% அதிகரித்துள்ளன.",
      "తెలుగు": "గడచిన దశాబ్దంలో 38°C కంటే ఎక్కువ తీవ్ర ఉష్ణోగ్రత నమోదయ్యే రోజుల సంఖ్య 16% పెరిగింది.",
      "मराठी": "गेल्या दशकात ३८°C पेक्षा जास्त तीव्र उष्णतेच्या दिवसांमध्ये १६% वाढ झाली आहे.",
      "বাংলা": "বিগত এক দশকে ৩৮°C-এর বেশি তীব্র তাপপ্রবাহের ঘটনা ১৬% বৃদ্ধি পেয়েছে।",
    },
  },
  // Index 1: Precipitation Spikes & Floods
  {
    pattern: /Short-duration heavy rainfall|flash-flood|cloudburst/i,
    map: {
      "हिन्दी": "कम समय में अत्यधिक बारिश की घटनाओं में 24% की वृद्धि हुई है, जिससे शहरों में अचानक जलभराव का खतरा बढ़ा है।",
      "ಕನ್ನಡ": "ಕಡಿಮೆ ಅವಧಿಯಲ್ಲಿ ಸುರಿಯುವ ಭಾರಿ ಮಳೆಯ ಪ್ರಮಾಣ 24% ರಷ್ಟು ಹೆಚ್ಚಾಗಿದ್ದು, ನಗರ ಪ್ರದೇಶಗಳಲ್ಲಿ ಹಠಾತ್ ಪ್ರವಾಹದ ಅಪಾಯ ಹೆಚ್ಚಿದೆ.",
      "தமிழ்": "குறுகிய நேர அதிதீவிர மழை நிகழ்வுகள் 24% உயர்ந்துள்ளன, இதனால் நகர்ப்புறங்களில் திடீர் வெள்ள அபாயம் அதிகரித்துள்ளது.",
      "తెలుగు": "తక్కువ సమయంలో కురిసే భారీ వర్షాలు 24% పెరిగాయి, ఇది నగరాలలో ఆకస్మిక వరద ప్రమాదాన్ని పెంచుతోంది.",
      "मराठी": "कमी वेळेत होणाऱ्या मुसळधार पावसाच्या घटनांमध्ये २४% वाढ झाली असून शहरांमध्ये पूर येण्याचा धोका वाढला आहे.",
      "বাংলা": "স্বল্পস্থায়ী ভারী বৃষ্টির ঘটনা ২৪% বৃদ্ধি পেয়েছে, যা শহরগুলিতে আকস্মিক বন্যার ঝুঁকি বাড়িয়ে তুলছে।",
    },
  },
  // Index 2: MoES Pathways
  {
    pattern: /MoES climate projections|SSP2-4\.5|1\.5°C-2\.0°C/i,
    map: {
      "हिन्दी": "NWP और MoES जलवायु अनुमानों के अनुसार SSP2-4.5 परिदृश्य के तहत 2050 तक क्षेत्रीय औसत तापमान में 1.5°C-2.0°C की वृद्धि का अनुमान है।",
      "ಕನ್ನಡ": "NWP ಮತ್ತು MoES ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳ ಪ್ರಕಾರ, SSP2-4.5 ಸನ್ನಿವೇಶದ ಅಡಿಯಲ್ಲಿ 2050 ರ ವೇಳೆಗೆ ಪ್ರಾದೇಶಿಕ ಸರಾಸರಿ ತಾಪಮಾನವು 1.5°C-2.0°C ಹೆಚ್ಚಾಗುವ ಅಂದಾಜಿದೆ.",
      "தமிழ்": "NWP மற்றும் MoES கணிப்புகளின்படி, SSP2-4.5 சூழ்நிலையில் 2050-க்குள் பிராந்திய சராசரி வெப்பநிலை 1.5°C முதல் 2.0°C வரை உயரும் என மதிப்பிடப்பட்டுள்ளது.",
      "తెలుగు": "NWP మరియు MoES అంచనాల ప్రకారం, SSP2-4.5 కింద 2050 నాటికి ప్రాంతీయ సగటు ఉష్ణోగ్రత 1.5°C-2.0°C పెరిగే అవకాశం ఉంది.",
      "मराठी": "NWP आणि MoES अंदाजानुसार, SSP2-4.5 परिस्थितीनुसार २०५० पर्यंत प्रादेशिक सरासरी तापमानात १.५°C-२.०°C वाढ होण्याची शक्यता आहे.",
      "বাংলা": "NWP এবং MoES জলবায়ু অনুমান অনুযায়ী, SSP2-4.5 পরিস্থিতিতে ২০৫০ সালের মধ্যে আঞ্চলিক গড় তাপমাত্রা ১.৫°C-২.০°C বৃদ্ধি পেতে পারে।",
    },
  },
  // Index 3: Agromet Mitigation
  {
    pattern: /Agromet advisories emphasize|drought-resistant|flood-tolerant/i,
    map: {
      "हिन्दी": "कृषि-मौसम परामर्श में जलवायु परिवर्तन के प्रभाव को कम करने के लिए सूखा-प्रतिरोधी और बाढ़-सहनशील फसलों पर विशेष बल दिया गया है।",
      "ಕನ್ನಡ": "ಹವಾಮಾನ ಬದಲಾವಣೆಗಳನ್ನು ಎದುರಿಸಲು ಬರ-ನಿರೋಧಕ ಮತ್ತು ಪ್ರವಾಹ-ಸಹಿಷ್ಣು ಬೆಳೆ ತಳಿಗಳನ್ನು ಬೆಳೆಯಲು ಕೃಷಿ-ಹವಾಮಾನ ಸಲಹೆಗಳು ಒತ್ತು ನೀಡುತ್ತವೆ.",
      "தமிழ்": "காலநிலை மாற்றங்களை எதிர்கொள்ள வறட்சியைத் தாங்கும் மற்றும் வெள்ளத்தைத் தாங்கும் பயிர் ரகங்களை பயிரிட வேளாண் ஆலோசனைகள் வலியுறுத்துகின்றன.",
      "తెలుగు": "వాతావరణ మార్పులను తట్టుకోవడానికి కరవు-నిరోధక మరియు వరదలను తట్టుకునే పంట రకాలను సాగు చేయాలని వ్యవసాయ సలహాలు సూచిస్తున్నాయి.",
      "मराठी": "हवामान बदलांचा मुकाबला करण्यासाठी दुष्काळ-प्रतिरोधक आणि पूर-सहनशील पिकांच्या जातींवर कृषी सल्लागारात भर देण्यात आला आहे.",
      "বাংলা": "জলবায়ু পরিবর্তনের প্রভাব মোকাবিলায় খরা-প্রতিরোধী ও বন্যা-সহনশীল ফসলের জাত চাষের ওপর কৃষি পরামর্শে গুরুত্ব দেওয়া হয়েছে।",
    },
  },
];

export function translateInsightContent(content, language = "English", index = 0) {
  if (!content || language === "English") return content || "";
  const raw = String(content);

  // Match by pattern
  for (const item of INSIGHT_CONTENTS_MAP) {
    if (item.pattern.test(raw) && item.map[language]) {
      return item.map[language];
    }
  }

  // Fallback by index
  const safeIdx = index % INSIGHT_CONTENTS_MAP.length;
  if (INSIGHT_CONTENTS_MAP[safeIdx] && INSIGHT_CONTENTS_MAP[safeIdx].map[language]) {
    return INSIGHT_CONTENTS_MAP[safeIdx].map[language];
  }

  return content;
}

export function translateScientificEyebrow(language = "English") {
  const map = {
    English: "SCIENTIFIC FINDINGS",
    "हिन्दी": "वैज्ञानिक निष्कर्ष",
    "ಕನ್ನಡ": "ವೈಜ್ಞಾನಿಕ ಸಂಶೋಧನಾ ಫಲಿತಾಂಶಗಳು",
    "தமிழ்": "அறிவியல் கண்டுபிடிப்புகள்",
    "తెలుగు": "శాస్త్రీయ పరిశోధన ఫలితాలు",
    "मराठी": "वैज्ञानिक निष्कर्ष",
    "বাংলা": "বৈজ্ঞানিক গবেষণা ফলাফল",
  };
  return map[language] || "SCIENTIFIC FINDINGS";
}

export function translateClimateCardSubtitle(language = "English") {
  const map = {
    English: "MoES climate monitoring, agromet adaptation directives, and urban vulnerability assessments.",
    "हिन्दी": "पृथ्वी विज्ञान मंत्रालय (MoES) जलवायु निगरानी, कृषि-मौसम अनुकूलन और शहरी जोखिम आकलन।",
    "ಕನ್ನಡ": "ಭೂ ವಿಜ್ಞಾನ ಸಚಿವಾಲಯದ (MoES) ಹವಾಮಾನ ಮೇಲ್ವಿಚಾರಣೆ, ಕೃಷಿ-ಹವಾಮಾನ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ನಗರ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ.",
    "தமிழ்": "புவி அறிவியல் அமைச்சக (MoES) காலநிலை கண்காணிப்பு, வேளாண்-வானிலை வழிகாட்டுதல்கள் மற்றும் நகர பாதிப்பு மதிப்பீடுகள்.",
    "తెలుగు": "భూ విజ్ఞాన మంత్రిత్వ శాఖ (MoES) వాతావరణ పర్యవేక్షణ, వ్యవసాయ-వాతావరణ అనుసరణ మరియు నగర ముప్పు అంచనాలు.",
    "मराठी": "भूविज्ञान मंत्रालय (MoES) हवामान देखरेख, कृषी-हवामान अनुकूलन मार्गदर्शक तत्त्वे आणि शहरी जोखीम मूल्यमापन.",
    "বাংলা": "ভূ-বিজ্ঞান মন্ত্রক (MoES) জলবায়ু পর্যবেক্ষণ, কৃষি-আবহাওয়া অভিযোজন নির্দেশিকা এবং নগর ঝুঁকি মূল্যায়ন।",
  };
  return map[language] || "MoES climate monitoring, agromet adaptation directives, and urban vulnerability assessments.";
}

export function translateLongitudinalEyebrow(language = "English") {
  const map = {
    English: "LONGITUDINAL OBSERVATIONS",
    "हिन्दी": "दीर्घकालिक अवलोकन",
    "ಕನ್ನಡ": "ದೀರ್ಘಾವಧಿಯ ವೀಕ್ಷಣೆಗಳು",
    "தமிழ்": "நீண்டகால அவதானிப்புகள்",
    "తెలుగు": "దీర్ఘకాలిక పరిశీలనలు",
    "मराठी": "दीर्घकालीन निरीक्षणे",
    "বাংলা": "দীর্ঘমেয়াদী পর্যবেক্ষণ",
  };
  return map[language] || "LONGITUDINAL OBSERVATIONS";
}

export function translateClimateHeaderSub(language = "English") {
  const map = {
    English: "Decadal temperature anomaly, historical monsoon variance, and long-range climatological projections.",
    "हिन्दी": "दशकवार तापमान विसंगति, ऐतिहासिक मानसून भिन्नता और दीर्घकालिक जलवायु अनुमान।",
    "ಕನ್ನಡ": "ದಶಕದ ತಾಪಮಾನ ಬದಲಾವಣೆ, ಐತಿಹಾಸಿಕ ಮುಂಗಾರು ವ್ಯತ್ಯಾಸ ಮತ್ತು ದೀರ್ಘಾವಧಿಯ ಹವಾಮಾನ ಪ್ರಕ್ಷೇಪಗಳು.",
    "தமிழ்": "பத்தாண்டுகால வெப்பநிலை முரண்பாடு, வரலாற்று பருவமழை மாறுபாடு மற்றும் நீண்டகால காலநிலை கணிப்புகள்.",
    "తెలుగు": "దశాబ్దపు ఉష్ణోగ్రత మార్పులు, చారిత్రక రుతుపవనాల వ్యత్యాసం మరియు దీర్ఘకాలిక వాతావరణ అంచనాలు.",
    "मराठी": "दशकनिहाय तापमान तफावत, ऐतिहासिक मान्सून फरक आणि दीर्घकालीन हवामान अंदाज.",
    "বাংলা": "দশকভিত্তিক তাপমাত্রার পরিবর্তন, ঐতিহাসিক বর্ষার তারতম্য এবং দীর্ঘমেয়াদী জলবায়ু অনুমান।",
  };
  return map[language] || "Decadal temperature anomaly, historical monsoon variance, and long-range climatological projections.";
}

export function translateClimateHistorySub(language = "English") {
  const map = {
    English: "Annual average temperature variations and Southwest monsoon precipitation anomalies.",
    "हिन्दी": "वार्षिक औसत तापमान भिन्नताएं और दक्षिण-पश्चिम मानसून वर्षा की विसंगतियां।",
    "ಕನ್ನಡ": "ವಾರ್ಷಿಕ ಸರಾಸರಿ ತಾಪಮಾನದ ವ್ಯತ್ಯಾಸಗಳು ಮತ್ತು ನೈಋತ್ಯ ಮುಂಗಾರು ಮಳೆಯ ಏರಿಳಿತಗಳು.",
    "தமிழ்": "ஆண்டு சராசரி வெப்பநிலை மாறுபாடுகள் மற்றும் தென்மேற்கு பருவமழை முரண்பாடுகள்.",
    "తెలుగు": "వార్షిక సగటు ఉష్ణోగ్రత వైవిధ్యాలు మరియు నైరుతి రుతుపవనాల వర్షపాత అసమానతలు.",
    "मराठी": "वार्षिक सरासरी तापमानातील बदल आणि नैऋत्य मान्सून पर्जन्यमानातील तफावत.",
    "বাংলা": "বার্ষিক গড় তাপমাত্রার তারতম্য এবং দক্ষিণ-পশ্চিম মৌসুমি বৃষ্টিপাতের অসঙ্গতি।",
  };
  return map[language] || "Annual average temperature variations and Southwest monsoon precipitation anomalies.";
}

export const CLIMATE_INDICATORS_MAP = {
  "Mean Surface Temp": {
    "हिन्दी": "औसत सतही तापमान",
    "ಕನ್ನಡ": "ಸರಾಸರಿ ಮೇಲ್ಮೈ ತಾಪಮಾನ",
    "தமிழ்": "சராசரி மேற்பரப்பு வெப்பநிலை",
    "తెలుగు": "సగటు ఉపరితల ఉష్ణోగ్రత",
    "मराठी": "सरासरी पृष्ठभाग तापमान",
    "বাংলা": "গড় পৃষ্ঠীয় তাপমাত্রা",
  },
  "+1.25°C pre-industrial": {
    "हिन्दी": "+1.25°C पूर्व-औद्योगिक स्तर से",
    "ಕನ್ನಡ": "+1.25°C ಕೈಗಾರಿಕಾ ಪೂರ್ವ ಮಟ್ಟಕ್ಕಿಂತ",
    "தமிழ்": "+1.25°C தொழிற்புரட்சிக்கு முந்தைய",
    "తెలుగు": "+1.25°C పూర్వ-పారిశ్రామిక స్థాయి కంటే",
    "मराठी": "+1.25°C पूर्व-औद्योगिक स्तरापेक्षा",
    "বাংলা": "+1.25°C প্রাক-শিল্প স্তর থেকে",
  },
  "Monsoon Variability": {
    "हिन्दी": "मानसून परिवर्तनशीलता",
    "ಕನ್ನಡ": "ಮುಂಗಾರು ಏರಿಳಿತ",
    "தமிழ்": "பருவமழை மாறுபாடு",
    "తెలుగు": "రుతుపవనాల వైవిధ్యం",
    "मराठी": "मान्सून अस्थिरता",
    "বাংলা": "মৌসুমি বায়ুর পরিবর্তনশীলতা",
  },
  "High Variance": {
    "हिन्दी": "अत्यधिक भिन्नता",
    "ಕನ್ನಡ": "ಹೆಚ್ಚಿನ ವ್ಯತ್ಯಾಸ",
    "தமிழ்": "அதிக மாறுபாடு",
    "తెలుగు": "అధిక వైవిధ్యం",
    "मराठी": "जास्त तफावत",
    "বাংলা": "উচ্চ তারতম্য",
  },
  "Short cloudbursts & dry spells": {
    "हिन्दी": "अल्पकालिक भारी बारिश व सूखा दौर",
    "ಕನ್ನಡ": "ಹಠಾತ್ ಧಾರಾಕಾರ ಮಳೆ ಮತ್ತು ಒಣ ಹವೆ",
    "தமிழ்": "திடீர் கனமழை மற்றும் வறண்ட காலம்",
    "తెలుగు": "తక్కువ వ్యవధి కుంభవృష్టి & పొడి రోజులు",
    "मराठी": "कमी वेळात मुसळधार पाऊस व कोरडे दिवस",
    "বাংলা": "স্বল্পস্থায়ী ভারী বৃষ্টি ও অনাবৃষ্টি",
  },
  "Heat Extremes (>38°C)": {
    "हिन्दी": "अत्यधिक गर्मी (>38°C)",
    "ಕನ್ನಡ": "ತೀವ್ರ ಶಾಖ (>38°C)",
    "தமிழ்": "தீவிர வெப்பம் (>38°C)",
    "తెలుగు": "తీవ్ర ఉష్ణోగ్రత (>38°C)",
    "मराठी": "अति उष्णता (>38°C)",
    "বাংলা": "চরম তাপপ্রবাহ (>38°C)",
  },
  "+16% Shift": {
    "हिन्दी": "+16% वृद्धि",
    "ಕನ್ನಡ": "+16% ಹೆಚ್ಚಳ",
    "தமிழ்": "+16% உயர்வு",
    "తెలుగు": "+16% పెరుగుదల",
    "मराठी": "+16% वाढ",
    "বাংলা": "+16% বৃদ্ধি",
  },
  "Decadal increase frequency": {
    "हिन्दी": "दशक में आवृत्ति में वृद्धि",
    "ಕನ್ನಡ": "ದಶಕದಲ್ಲಿ ಸಂಭವನೀಯತೆ ಹೆಚ್ಚಳ",
    "தமிழ்": "பத்தாண்டுகளில் நிகழ்வு அதிகரிப்பு",
    "తెలుగు": "దశాబ్దంలో పునరావృత పెరుగుదల",
    "मराठी": "दशकातील वारंवारतेत वाढ",
    "বাংলা": "দশকভিত্তিক পুনরাবৃত্তি বৃদ্ধি",
  },
  "2050 MoES Projection": {
    "हिन्दी": "2050 MoES जलवायु अनुमान",
    "ಕನ್ನಡ": "2050 MoES ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
    "தமிழ்": "2050 MoES காலநிலை கணிப்பு",
    "తెలుగు": "2050 MoES వాతావరణ అంచనా",
    "मराठी": "२०५० MoES हवामान अंदाज",
    "বাংলা": "২০৫০ MoES জলবায়ু অনুমান",
  },
  "SSP2-4.5 Pathway": {
    "हिन्दी": "SSP2-4.5 जलवायु परिदृश्य",
    "ಕನ್ನಡ": "SSP2-4.5 ಹವಾಮಾನ ಸನ್ನಿವೇಶ",
    "தமிழ்": "SSP2-4.5 காலநிலை பாதை",
    "తెలుగు": "SSP2-4.5 వాతావరణ మార్గం",
    "मराठी": "SSP2-4.5 हवामान मार्ग",
    "বাংলা": "SSP2-4.5 জলবায়ু পথ",
  },
};

export function translateClimateIndicator(text, language = "English") {
  if (!text || language === "English") return text || "";
  const trimmed = String(text).trim();
  if (CLIMATE_INDICATORS_MAP[trimmed] && CLIMATE_INDICATORS_MAP[trimmed][language]) {
    return CLIMATE_INDICATORS_MAP[trimmed][language];
  }
  for (const [key, map] of Object.entries(CLIMATE_INDICATORS_MAP)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase()) && map[language]) {
      return map[language];
    }
  }
  return text;
}


