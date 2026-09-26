import React, { useState, useEffect } from "react";
import { translateCondition, LANG_CODE_MAP } from "../utils/translations";

const ARCHIVE_TRANSLATIONS = {
  English: {
    eyebrow: "PERSISTENT OBSERVATIONAL ARCHIVE",
    title: "Historical Weather Archive",
    subtitle: "Chronological records and past observation snapshots saved to SQLite database.",
    refresh: "Refresh",
    exportCsv: "Export CSV",
    clearHistory: "Clear History",
    clearConfirm: "Are you sure you want to permanently clear past weather observation records?",
    clearSuccess: "✓ Historical weather records cleared successfully.",
    loadError: "⚠️ Failed to load historical weather observations.",
    clearError: "⚠️ Failed to clear history.",
    totalSnapshots: "Total Snapshots",
    recordedInDb: "Recorded in database",
    trackedCities: "Tracked Cities",
    uniqueRegions: "Unique geographical regions",
    avgTemp: "Average Temperature",
    acrossSessions: "Across all recorded sessions",
    tempRange: "Temperature Range",
    minMaxVariance: "Min to max recorded variance",
    filterPlaceholder: "Filter past records by city name...",
    cards: "Cards",
    table: "Table",
    loading: "⏳ Loading historical weather archive...",
    noRecordsTitle: "No Past Weather Records Found",
    noRecordsDesc: "Every time you inspect live weather, search a city, or detect your current GPS location, a persistent observation snapshot is automatically recorded here.",
    checkNew: "Check for New Records",
    feels: "Feels",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    aqi: "AQI",
    viewLive: "View Live →",
    inspect: "Inspect",
    colTime: "RECORDED TIME",
    colCity: "CITY / REGION",
    colTemp: "TEMPERATURE",
    colCond: "CONDITION",
    colHum: "HUMIDITY",
    colWind: "WIND",
    colPress: "PRESSURE",
    colAqi: "AQI",
    colAction: "ACTION",
  },
  "हिन्दी": {
    eyebrow: "स्थायी अवलोकन संग्रह",
    title: "ऐतिहासिक मौसम संग्रह",
    subtitle: "डेटाबेस में सहेजे गए कालानुक्रमिक रिकॉर्ड और पिछले मौसम अवलोकन स्नैपशॉट।",
    refresh: "रिफ्रेश",
    exportCsv: "CSV निर्यात करें",
    clearHistory: "इतिहास साफ़ करें",
    clearConfirm: "क्या आप निश्चित रूप से पिछले मौसम अवलोकन रिकॉर्ड को स्थायी रूप से हटाना चाहते हैं?",
    clearSuccess: "✓ ऐतिहासिक मौसम रिकॉर्ड सफलतापूर्वक साफ़ कर दिए गए।",
    loadError: "⚠️ ऐतिहासिक मौसम अवलोकन लोड करने में विफल।",
    clearError: "⚠️ इतिहास साफ़ करने में विफल।",
    totalSnapshots: "कुल स्नैपशॉट",
    recordedInDb: "डेटाबेस में दर्ज",
    trackedCities: "ट्रैक किए गए शहर",
    uniqueRegions: "विशिष्ट भौगोलिक क्षेत्र",
    avgTemp: "औसत तापमान",
    acrossSessions: "सभी दर्ज सत्रों में",
    tempRange: "तापमान सीमा",
    minMaxVariance: "न्यूनतम से अधिकतम दर्ज भिन्नता",
    filterPlaceholder: "शहर के नाम से रिकॉर्ड फ़िल्टर करें...",
    cards: "कार्ड",
    table: "तालिका",
    loading: "⏳ ऐतिहासिक मौसम संग्रह लोड हो रहा है...",
    noRecordsTitle: "कोई पिछला मौसम रिकॉर्ड नहीं मिला",
    noRecordsDesc: "हर बार जब आप लाइव मौसम देखते हैं, किसी शहर को खोजते हैं, या जीपीएस स्थान का पता लगाते हैं, तो एक स्थायी स्नैपशॉट यहाँ स्वतः सहेज लिया जाता है।",
    checkNew: "नए रिकॉर्ड जांचें",
    feels: "महसूस",
    humidity: "नमी",
    wind: "हवा",
    pressure: "दबाव",
    aqi: "वायु गुणवत्ता (AQI)",
    viewLive: "लाइव देखें →",
    inspect: "निरीक्षण करें",
    colTime: "दर्ज समय",
    colCity: "शहर / क्षेत्र",
    colTemp: "तापमान",
    colCond: "मौसम स्थिति",
    colHum: "नमी",
    colWind: "हवा",
    colPress: "दबाव",
    colAqi: "वायु गुणवत्ता",
    colAction: "कार्रवाई",
  },
  "ಕನ್ನಡ": {
    eyebrow: "ನಿರಂತರ ವೀಕ್ಷಣಾ ದಾಖಲೆ",
    title: "ಐತಿಹಾಸಿಕ ಹವಾಮಾನ ದಾಖಲೆಗಳು",
    subtitle: "ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ದಾಖಲಾದ ಕಾಲಾನುಕ್ರಮದ ಹಿಂದಿನ ಹವಾಮಾನ ವೀಕ್ಷಣೆಗಳು.",
    refresh: "ನವೀಕರಿಸಿ",
    exportCsv: "CSV ರಫ್ತು ಮಾಡಿ",
    clearHistory: "ಇತಿಹಾಸ ಅಳಿಸಿ",
    clearConfirm: "ಹಿಂದಿನ ಹವಾಮಾನ ವೀಕ್ಷಣಾ ದಾಖಲೆಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?",
    clearSuccess: "✓ ಐತಿಹಾಸಿಕ ಹವಾಮಾನ ದಾಖಲೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ.",
    loadError: "⚠️ ಹವಾಮಾನ ವೀಕ್ಷಣೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ.",
    clearError: "⚠️ ಇತಿಹಾಸವನ್ನು ತೆರವುಗೊಳಿಸಲು ವಿಫಲವಾಗಿದೆ.",
    totalSnapshots: "ಒಟ್ಟು ದಾಖಲೆಗಳು",
    recordedInDb: "ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ದಾಖಲಾಗಿವೆ",
    trackedCities: "ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ ನಗರಗಳು",
    uniqueRegions: "ವಿಶಿಷ್ಟ ಭೌಗೋಳಿಕ ಪ್ರದೇಶಗಳು",
    avgTemp: "ಸರಾಸರಿ ತಾಪಮಾನ",
    acrossSessions: "ದಾಖಲಾದ ಎಲ್ಲಾ ಅವಧಿಗಳಲ್ಲಿ",
    tempRange: "ತಾಪಮಾನ ಶ್ರೇಣಿ",
    minMaxVariance: "ಕನಿಷ್ಠದಿಂದ ಗರಿಷ್ಠ ತಾಪಮಾನ",
    filterPlaceholder: "ನಗರದ ಹೆಸರಿನಿಂದ ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಿ...",
    cards: "ಕಾರ್ಡ್‌ಗಳು",
    table: "ಕೋಷ್ಟಕ",
    loading: "⏳ ಐತಿಹಾಸಿಕ ಹವಾಮಾನ ದಾಖಲೆಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...",
    noRecordsTitle: "ಹಿಂದಿನ ಹವಾಮಾನ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    noRecordsDesc: "ಪ್ರತಿ ಬಾರಿ ನೀವು ಲೈವ್ ಹವಾಮಾನ ಪರಿಶೀಲಿಸಿದಾಗ, ನಗರ ಹುಡುಕಿದಾಗ ಅಥವಾ ಜಿಪಿಎಸ್ ಸ್ಥಳ ಗುರುತಿಸಿದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಇಲ್ಲಿ ದಾಖಲಾಗುತ್ತದೆ.",
    checkNew: "ಹೊಸ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    feels: "ಅನಿಸಿಕೆ",
    humidity: "ತೇವಾಂಶ",
    wind: "ಗಾಳಿ",
    pressure: "ಒತ್ತಡ",
    aqi: "ವಾಯು ಗುಣಮಟ್ಟ (AQI)",
    viewLive: "ಲೈವ್ ನೋಡಿ →",
    inspect: "ಪರಿಶೀಲಿಸಿ",
    colTime: "ದಾಖಲಾದ ಸಮಯ",
    colCity: "ನಗರ / ಪ್ರದೇಶ",
    colTemp: "ತಾಪಮಾನ",
    colCond: "ಹವಾಮಾನ ಸ್ಥಿತಿ",
    colHum: "ತೇವಾಂಶ",
    colWind: "ಗಾಳಿ",
    colPress: "ಒತ್ತಡ",
    colAqi: "ವಾಯು ಗುಣಮಟ್ಟ",
    colAction: "ಕ್ರಮ",
  },
  "தமிழ்": {
    eyebrow: "நிலையான வானிலை காப்பகம்",
    title: "வரலாற்று வானிலை காப்பகம்",
    subtitle: "தரவுத்தளத்தில் சேமிக்கப்பட்ட முந்தைய வானிலை கண்காணிப்பு பதிவுகள்.",
    refresh: "புதுப்பி",
    exportCsv: "CSV ஏற்றுமதி",
    clearHistory: "வரலாற்றை அழி",
    clearConfirm: "முந்தைய வானிலை பதிவுகளை நிரந்தரமாக அழிக்க விரும்புகிறீர்களா?",
    clearSuccess: "✓ வரலாற்று வானிலை பதிவுகள் வெற்றிகரமாக அழிக்கப்பட்டன.",
    loadError: "⚠️ வரலாற்று வானிலை பதிவுகளை ஏற்றுவதில் தோல்வி.",
    clearError: "⚠️ வரலாற்றை அழிப்பதில் தோல்வி.",
    totalSnapshots: "மொத்த பதிவுகள்",
    recordedInDb: "தரவுத்தளத்தில் பதிவு செய்யப்பட்டுள்ளது",
    trackedCities: "கண்காணிக்கப்பட்ட நகரங்கள்",
    uniqueRegions: "தனித்துவமான புவியியல் பகுதிகள்",
    avgTemp: "சராசரி வெப்பநிலை",
    acrossSessions: "பதிவு செய்யப்பட்ட அமர்வுகளில்",
    tempRange: "வெப்பநிலை வரம்பு",
    minMaxVariance: "குறைந்தபட்சம் முதல் அதிகபட்சம் வரை",
    filterPlaceholder: "நகரத்தின் பெயரால் பதிவுகளை வடிகட்டவும்...",
    cards: "கார்டுகள்",
    table: "அட்டவணை",
    loading: "⏳ வரலாற்று வானிலை காப்பகம் ஏற்றப்படுகிறது...",
    noRecordsTitle: "முந்தைய வானிலை பதிவுகள் எதுவும் கிடைக்கவில்லை",
    noRecordsDesc: "நேரலை வானிலை, நகரத் தேடல் அல்லது ஜி.பி.எஸ் இடத்தைக் கண்டறியும் போதெல்லாம் தானாகவே இங்கு பதிவாகும்.",
    checkNew: "புதிய பதிவுகளைச் சரிபார்க்கவும்",
    feels: "உணர்வு",
    humidity: "ஈரப்பதம்",
    wind: "காற்று",
    pressure: "காற்றழுத்தம்",
    aqi: "காற்றின் தரம் (AQI)",
    viewLive: "நேரலையைக் காண்க →",
    inspect: "ஆராய்க",
    colTime: "பதிவு செய்த நேரம்",
    colCity: "நகரம் / பகுதி",
    colTemp: "வெப்பநிலை",
    colCond: "வானிலை நிலை",
    colHum: "ஈரப்பதம்",
    colWind: "காற்று",
    colPress: "அழுத்தம்",
    colAqi: "காற்றின் தரம்",
    colAction: "செயல்",
  },
  "తెలుగు": {
    eyebrow: "స్థిరమైన వాతావరణ ఆర్కైవ్",
    title: "చారిత్రక వాతావరణ ఆర్కైవ్",
    subtitle: "డేటాబేస్‌లో భద్రపరచబడిన గత వాతావరణ పరిశీలన రికార్డులు.",
    refresh: "రిఫ్రెష్",
    exportCsv: "CSV ఎగుమతి",
    clearHistory: "చరిత్రను క్లియర్ చేయి",
    clearConfirm: "గత వాతావరణ రికార్డులను శాశ్వతంగా తొలగించాలనుకుంటున్నారా?",
    clearSuccess: "✓ చారిత్రక వాతావరణ రికార్డులు విజయవంతంగా తొలగించబడ్డాయి.",
    loadError: "⚠️ వాతావరణ రికార్డులను లోడ్ చేయడంలో విఫలమైంది.",
    clearError: "⚠️ చరిత్రను క్లియర్ చేయడంలో విఫలమైంది.",
    totalSnapshots: "మొత్తం స్నాప్‌షాట్లు",
    recordedInDb: "డేటాబేస్‌లో నమోదైనవి",
    trackedCities: "ట్రాక్ చేయబడిన నగరాలు",
    uniqueRegions: "ప్రత్యేక భౌగోళిక ప్రాంతాలు",
    avgTemp: "సగటు ఉష్ణోగ్రత",
    acrossSessions: "నమోదైన అన్ని సెషన్లలో",
    tempRange: "ఉష్ణోగ్రత పరిధి",
    minMaxVariance: "కనిష్ట నుండి గరిష్ట వ్యత్యాసం",
    filterPlaceholder: "నగరం పేరుతో రికార్డులను శోధించండి...",
    cards: "కార్డులు",
    table: "పట్టిక",
    loading: "⏳ చారిత్రక వాతావరణ ఆర్కైవ్ లోడ్ అవుతోంది...",
    noRecordsTitle: "గత వాతావరణ రికార్డులు ఏవీ కనుగొనబడలేదు",
    noRecordsDesc: "లైవ్ వాతావరణాన్ని తనిఖీ చేసిన ప్రతిసారీ స్వయంచాలకంగా ఇక్కడ రికార్డ్ చేయబడుతుంది.",
    checkNew: "కొత్త రికార్డులను తనిఖీ చేయండి",
    feels: "అనిపించేది",
    humidity: "తేమ",
    wind: "గాలి",
    pressure: "పీడనం",
    aqi: "గాలి నాణ్యత (AQI)",
    viewLive: "లైవ్ చూడండి →",
    inspect: "పరిశీలించు",
    colTime: "నమోదైన సమయం",
    colCity: "నగరం / ప్రాంతం",
    colTemp: "ఉష్ణోగ్రత",
    colCond: "పరిస్థితి",
    colHum: "తేమ",
    colWind: "గాలి",
    colPress: "పీడనం",
    colAqi: "గాలి నాణ్యత",
    colAction: "చర్య",
  },
  "मराठी": {
    eyebrow: "सतत निरीक्षण संग्रह",
    title: "ऐतिहासिक हवामान संग्रह",
    subtitle: "डेटाबेसमध्ये जतन केलेल्या कालक्रमानुसार मागील हवामान नोंदी.",
    refresh: "रिफ्रेश",
    exportCsv: "CSV निर्यात करा",
    clearHistory: "इतिहास साफ करा",
    clearConfirm: "आपण खरोखर मागील नोंदी कायमस्वरूपी हटवू इच्छिता?",
    clearSuccess: "✓ ऐतिहासिक हवामान नोंदी यशस्वीरीत्या हटवल्या.",
    loadError: "⚠️ नोंदी लोड करण्यात अयशस्वी.",
    clearError: "⚠️ इतिहास साफ करण्यात अयशस्वी.",
    totalSnapshots: "एकूण नोंदी",
    recordedInDb: "डेटाबेसमध्ये नोंदवले",
    trackedCities: "ट्रॅक केलेली शहरे",
    uniqueRegions: "विविध भौगोलिक प्रदेश",
    avgTemp: "सरासरी तापमान",
    acrossSessions: "सर्व नोंदवलेल्या सत्रांमध्ये",
    tempRange: "तापमान मर्यादा",
    minMaxVariance: "किमान ते कमाल फरक",
    filterPlaceholder: "शहराच्या नावाने नोंदी शोधा...",
    cards: "कार्ड्स",
    table: "तक्ता",
    loading: "⏳ ऐतिहासिक हवामान संग्रह लोड होत आहे...",
    noRecordsTitle: "मागील हवामान नोंदी आढळल्या नाहीत",
    noRecordsDesc: "प्रत्येक वेळी थेट हवामान पाहताना एक स्नॅपशॉट आपोआप येथे नोंदवला जातो.",
    checkNew: "नवीन नोंदी तपासा",
    feels: "जाणवणारे",
    humidity: "आर्द्रता",
    wind: "वारा",
    pressure: "दाब",
    aqi: "हवेची गुणवत्ता (AQI)",
    viewLive: "थेट पहा →",
    inspect: "तपासा",
    colTime: "नोंदवलेली वेळ",
    colCity: "शहर / प्रदेश",
    colTemp: "तापमान",
    colCond: "हवामान स्थिती",
    colHum: "आर्द्रता",
    colWind: "वारा",
    colPress: "दाब",
    colAqi: "हवेची गुणवत्ता",
    colAction: "कृती",
  },
  "বাংলা": {
    eyebrow: "ধারাবাহিক পর্যবেক্ষণ সংরক্ষণাগার",
    title: "ঐতিহাসিক আবহাওয়া সংরক্ষণাগার",
    subtitle: "ডাটাবেসে সংরক্ষিত অতীত আবহাওয়া পর্যবেক্ষণের ইতিহাস।",
    refresh: "রিফ্রেশ",
    exportCsv: "CSV এক্সপোর্ট",
    clearHistory: "ইতিহাস মুছুন",
    clearConfirm: "আপনি কি নিশ্চিতভাবে পূর্ববর্তী রেকর্ডগুলি মুছে ফেলতে চান?",
    clearSuccess: "✓ ঐতিহাসিক আবহাওয়া রেকর্ড সফলভাবে মুছে ফেলা হয়েছে।",
    loadError: "⚠️ রেকর্ড লোড করতে ব্যর্থ হয়েছে।",
    clearError: "⚠️ ইতিহাস মুছতে ব্যর্থ হয়েছে।",
    totalSnapshots: "মোট রেকর্ড",
    recordedInDb: "ডাটাবেসে সংরক্ষিত",
    trackedCities: "ট্র্যাক করা শহর",
    uniqueRegions: "অনন্য ভৌগোলিক অঞ্চল",
    avgTemp: "গড় তাপমাত্রা",
    acrossSessions: "সকল সেশনের গড়",
    tempRange: "তাপমাত্রার পরিসীমা",
    minMaxVariance: "সর্বনিম্ন থেকে সর্বোচ্চ তারতম্য",
    filterPlaceholder: "শহরের নাম দিয়ে রেকর্ড খুঁজুন...",
    cards: "কার্ড",
    table: "টেবিল",
    loading: "⏳ ঐতিহাসিক আবহাওয়া সংরক্ষণাগার লোড হচ্ছে...",
    noRecordsTitle: "কোনো পূর্ববর্তী রেকর্ড পাওয়া যায়নি",
    noRecordsDesc: "প্রতিবার লাইভ আবহাওয়া দেখার সময় স্বয়ংক্রিয়ভাবে এখানে একটি স্ন্যাপশট সংরক্ষিত হয়।",
    checkNew: "নতুন রেকর্ড পরীক্ষা করুন",
    feels: "অনুভূত",
    humidity: "আর্দ্রতা",
    wind: "বাতাস",
    pressure: "চাপ",
    aqi: "বায়ুর মান (AQI)",
    viewLive: "লাইভ দেখুন →",
    inspect: "পরিদর্শন করুন",
    colTime: "রেকর্ড করার সময়",
    colCity: "শহর / অঞ্চল",
    colTemp: "তাপমাত্রা",
    colCond: "পরিস্থিতি",
    colHum: "আর্দ্রতা",
    colWind: "বাতাস",
    colPress: "বায়ুচাপ",
    colAqi: "বায়ুর মান",
    colAction: "পদক্ষেপ",
  },
};

function translateAqi(aqiStr, lang) {
  if (!aqiStr) return "Good";
  const aqiMap = {
    Good: {
      "हिन्दी": "उत्तम (Good)",
      "ಕನ್ನಡ": "ಉತ್ತಮ (Good)",
      "தமிழ்": "நல்லது (Good)",
      "తెలుగు": "మంచిది (Good)",
      "मराठी": "उत्कृष्ट (Good)",
      "বাংলা": "ভালো (Good)",
    },
    Moderate: {
      "हिन्दी": "मध्यम (Moderate)",
      "ಕನ್ನಡ": "ಮಧ್ಯಮ (Moderate)",
      "தமிழ்": "மிதமான (Moderate)",
      "తెలుగు": "మధ్యస్థం (Moderate)",
      "मराठी": "मध्यम (Moderate)",
      "বাংলা": "মাঝারি (Moderate)",
    },
    Unhealthy: {
      "हिन्दी": "अस्वस्थ (Unhealthy)",
      "ಕನ್ನಡ": "ಅನಾರೋಗ್ಯಕರ (Unhealthy)",
      "தமிழ்": "ஆரோக்கியமற்றது (Unhealthy)",
      "తెలుగు": "అనారోగ్యకరం (Unhealthy)",
      "मराठी": "अस्वस्थ (Unhealthy)",
      "বাংলা": "অস্বাস্থ্যকর (Unhealthy)",
    },
    Poor: {
      "हिन्दी": "खराब (Poor)",
      "ಕನ್ನಡ": "ಕಳಪೆ (Poor)",
      "தமிழ்": "மோசமானது (Poor)",
      "తెలుగు": "పేలవమైన (Poor)",
      "मराठी": "खराब (Poor)",
      "বাংলা": "খারাপ (Poor)",
    },
  };
  return aqiMap[aqiStr]?.[lang] || aqiStr;
}

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

  const t = ARCHIVE_TRANSLATIONS[language] || ARCHIVE_TRANSLATIONS["English"];
  const locale = LANG_CODE_MAP[language] || "en-IN";

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
      setMessage(t.loadError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(filterCity);
  }, [filterCity]);

  const handleClearHistory = async () => {
    if (!window.confirm(t.clearConfirm)) {
      return;
    }
    try {
      const url = filterCity
        ? `${apiBase}/api/weather/history?city=${encodeURIComponent(filterCity)}`
        : `${apiBase}/api/weather/history`;
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        setHistory([]);
        setMessage(t.clearSuccess);
        setTimeout(() => setMessage(null), 3500);
      }
    } catch (err) {
      console.error("Clear history error:", err);
      setMessage(t.clearError);
    }
  };

  const handleExportCSV = () => {
    if (!history.length) return;
    const headers = [
      "ID",
      t.colCity,
      "Latitude",
      "Longitude",
      `${t.colTemp} (°C)`,
      `${t.feels} (°C)`,
      t.colCond,
      `${t.colHum} (%)`,
      `${t.colWind} (km/h)`,
      `${t.colPress} (hPa)`,
      t.colAqi,
      t.colTime,
    ];
    const rows = history.map((r) => [
      r.id,
      `"${r.city}"`,
      r.lat,
      r.lon,
      r.temperature,
      r.feels_like,
      `"${translateCondition(r.condition, language)}"`,
      r.humidity,
      r.wind_speed_kmh,
      r.pressure_hpa,
      `"${translateAqi(r.aqi_status, language)}"`,
      `"${r.recorded_at}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `weathergpt_history_${new Date().toISOString().slice(0, 10)}.csv`
    );
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
  const avgTemp = temps.length
    ? Math.round((temps.reduce((a, b) => a + b, 0) / temps.length) * 10) / 10
    : 0;

  return (
    <div className="past-weather-container" style={{ padding: "8px 0" }}>
      {/* HEADER SECTION */}
      <div
        className="section-heading"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2
            style={{
              fontSize: "1.75rem",
              margin: "4px 0 6px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>📜</span> {t.title}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.92rem", margin: 0 }}>
            {t.subtitle}
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="action-btn"
            onClick={() => fetchHistory(filterCity)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              background: "var(--card-light)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "600",
            }}
          >
            🔄 {t.refresh}
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={handleExportCSV}
            disabled={!history.length}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              background: "var(--card-light)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "600",
              opacity: history.length ? 1 : 0.5,
            }}
          >
            📥 {t.exportCsv}
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={handleClearHistory}
            disabled={!history.length}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#ef4444",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "600",
              opacity: history.length ? 1 : 0.5,
            }}
          >
            🗑️ {t.clearHistory}
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            padding: "10px 16px",
            marginBottom: "18px",
            borderRadius: "8px",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid #10b981",
            color: "#10b981",
            fontSize: "0.88rem",
          }}
        >
          {message}
        </div>
      )}

      {/* METRIC KPI ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div className="card" style={{ padding: "18px 20px" }}>
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            {t.totalSnapshots}
          </span>
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              color: "var(--primary-light)",
              marginTop: "4px",
            }}
          >
            {history.length}
          </div>
          <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>
            {t.recordedInDb}
          </small>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            {t.trackedCities}
          </span>
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              color: "#10b981",
              marginTop: "4px",
            }}
          >
            {uniqueCities.length}
          </div>
          <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>
            {t.uniqueRegions}
          </small>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            {t.avgTemp}
          </span>
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              color: "#f59e0b",
              marginTop: "4px",
            }}
          >
            {history.length ? `${avgTemp}°C` : "N/A"}
          </div>
          <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>
            {t.acrossSessions}
          </small>
        </div>

        <div className="card" style={{ padding: "18px 20px" }}>
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            {t.tempRange}
          </span>
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              color: "#a855f7",
              marginTop: "4px",
            }}
          >
            {history.length ? `${minTemp}° - ${maxTemp}°C` : "N/A"}
          </div>
          <small style={{ color: "var(--muted)", fontSize: "0.76rem" }}>
            {t.minMaxVariance}
          </small>
        </div>
      </div>

      {/* FILTER & VIEW TOGGLE BAR */}
      <div
        className="card"
        style={{
          padding: "14px 18px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            minWidth: "260px",
          }}
        >
          <span>🔍</span>
          <input
            type="text"
            placeholder={t.filterPlaceholder}
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
              style={{
                background: "transparent",
                border: "none",
                color: "var(--muted)",
                cursor: "pointer",
                fontSize: "14px",
              }}
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
            {t.cards}
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
            {t.table}
          </button>
        </div>
      </div>

      {/* CONTENT: CARDS OR TABLE */}
      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
          {t.loading}
        </div>
      ) : history.length === 0 ? (
        <div className="card" style={{ padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📜</div>
          <h3 style={{ margin: "0 0 6px 0", color: "var(--text)" }}>
            {t.noRecordsTitle}
          </h3>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.9rem",
              maxWidth: "480px",
              margin: "0 auto 16px auto",
            }}
          >
            {t.noRecordsDesc}
          </p>
          <button
            type="button"
            onClick={() => fetchHistory("")}
            className="ask-btn"
            style={{ padding: "8px 18px", borderRadius: "8px" }}
          >
            {t.checkNew}
          </button>
        </div>
      ) : viewMode === "cards" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "16px",
          }}
        >
          {history.map((rec) => {
            const formattedDate = rec.recorded_at
              ? new Date(rec.recorded_at).toLocaleString(locale, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Just now";

            const translatedCond = translateCondition(rec.condition, language);
            const translatedAqi = translateAqi(rec.aqi_status, language);

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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      <strong
                        style={{
                          fontSize: "1.1rem",
                          color: "var(--text)",
                          display: "block",
                        }}
                      >
                        📍 {rec.city}
                      </strong>
                      <small style={{ color: "var(--muted)", fontSize: "0.75rem" }}>
                        {formattedDate}
                      </small>
                    </div>
                    {rec.condition_icon ? (
                      <img
                        src={rec.condition_icon}
                        alt={translatedCond}
                        style={{ width: "36px", height: "36px", objectFit: "contain" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://cdn.weatherapi.com/weather/64x64/day/116.png";
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "1.8rem" }}>⛅</span>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "8px",
                      margin: "8px 0",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "800",
                        color: "var(--primary-light)",
                      }}
                    >
                      {rec.temperature}°C
                    </span>
                    <span style={{ fontSize: "0.84rem", color: "var(--muted)" }}>
                      {t.feels} {rec.feels_like}°C
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text)",
                      fontWeight: "500",
                      marginBottom: "12px",
                    }}
                  >
                    {translatedCond}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      padding: "10px",
                      background: "var(--bg)",
                      borderRadius: "8px",
                      fontSize: "0.78rem",
                      color: "var(--muted)",
                    }}
                  >
                    <div>
                      💧 {t.humidity}:{" "}
                      <strong style={{ color: "var(--text)" }}>{rec.humidity}%</strong>
                    </div>
                    <div>
                      💨 {t.wind}:{" "}
                      <strong style={{ color: "var(--text)" }}>
                        {rec.wind_speed_kmh} km/h
                      </strong>
                    </div>
                    <div>
                      ⏲️ {t.pressure}:{" "}
                      <strong style={{ color: "var(--text)" }}>
                        {rec.pressure_hpa} hPa
                      </strong>
                    </div>
                    <div>
                      🌱 {t.aqi}:{" "}
                      <strong style={{ color: "#10b981" }}>{translatedAqi}</strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      fontFamily: "monospace",
                    }}
                  >
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
                      {t.viewLive}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ padding: "0", overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.86rem",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border)",
                  background: "rgba(0,0,0,0.12)",
                  color: "var(--muted)",
                  fontSize: "0.78rem",
                }}
              >
                <th style={{ padding: "12px 16px" }}>{t.colTime}</th>
                <th style={{ padding: "12px 16px" }}>{t.colCity}</th>
                <th style={{ padding: "12px 16px" }}>{t.colTemp}</th>
                <th style={{ padding: "12px 16px" }}>{t.colCond}</th>
                <th style={{ padding: "12px 16px" }}>{t.colHum}</th>
                <th style={{ padding: "12px 16px" }}>{t.colWind}</th>
                <th style={{ padding: "12px 16px" }}>{t.colPress}</th>
                <th style={{ padding: "12px 16px" }}>{t.colAqi}</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>{t.colAction}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((rec) => (
                <tr key={rec.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "var(--muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(rec.recorded_at).toLocaleString(locale, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontWeight: "600",
                      color: "var(--text)",
                    }}
                  >
                    📍 {rec.city}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontWeight: "700",
                      color: "var(--primary-light)",
                    }}
                  >
                    {rec.temperature}°C{" "}
                    <small style={{ color: "var(--muted)", fontWeight: "400" }}>
                      ({rec.feels_like}°)
                    </small>
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--text)" }}>
                    {translateCondition(rec.condition, language)}
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
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "10px",
                        fontSize: "0.72rem",
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#10b981",
                        fontWeight: "600",
                      }}
                    >
                      {translateAqi(rec.aqi_status, language)}
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
                        {t.inspect}
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
