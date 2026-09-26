import { useState, useEffect, useRef } from "react";
import { LANG_CODE_MAP } from "../utils/translations";

const MODAL_LANGUAGES = [
  { key: "English", label: "English", code: "en-IN" },
  { key: "हिन्दी", label: "हिन्दी (Hindi)", code: "hi-IN" },
  { key: "ಕನ್ನಡ", label: "ಕನ್ನಡ (Kannada)", code: "kn-IN" },
  { key: "தமிழ்", label: "தமிழ் (Tamil)", code: "ta-IN" },
  { key: "తెలుగు", label: "తెలుగు (Telugu)", code: "te-IN" },
  { key: "मराठी", label: "मराठी (Marathi)", code: "mr-IN" },
  { key: "বাংলা", label: "বাংলা (Bengali)", code: "bn-IN" },
];

function detectLanguageFromText(text, fallbackLang = "English") {
  if (!text) return fallbackLang;
  if (/[\u0C80-\u0CFF]/.test(text)) return "ಕನ್ನಡ";
  if (/[\u0B80-\u0BFF]/.test(text)) return "தமிழ்";
  if (/[\u0C00-\u0C7F]/.test(text)) return "తెలుగు";
  if (/[\u0980-\u09FF]/.test(text)) return "বাংলা";
  if (/[\u0900-\u097F]/.test(text)) {
    if (/(आहे|नाही|कसे|उद्या|पाऊस|काय|हवामान)/.test(text)) return "मराठी";
    return "हिन्दी";
  }
  return fallbackLang;
}

export default function VoiceModal({
  isOpen,
  onClose,
  onSend,
  language = "English",
  onLanguageChange,
  city = "Bengaluru",
  t = {},
}) {
  const [currentLang, setCurrentLang] = useState(language);
  const [voiceState, setVoiceState] = useState("recording"); // "recording" | "submitting"
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [volumeLevel, setVolumeLevel] = useState(0);

  // References
  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const animFrameRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const recordTimerRef = useRef(null);
  const fullTextRef = useRef("");
  const isSubmittedRef = useRef(false);
  const currentLangRef = useRef(language);

  useEffect(() => {
    currentLangRef.current = currentLang;
  }, [currentLang]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentLang(language);
    }
  }, [language, isOpen]);

  // Lifecycle on modal open / close: Immediately active recording mode!
  useEffect(() => {
    if (!isOpen) {
      cleanupAll();
      return;
    }

    // Reset flags & state to immediate active recording
    setVoiceState("recording");
    setTranscript("");
    setInterimText("");
    setErrorMessage("");
    setRecordSeconds(0);
    setVolumeLevel(0);
    fullTextRef.current = "";
    isSubmittedRef.current = false;

    // Start audio duration timer right away
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    recordTimerRef.current = setInterval(() => {
      setRecordSeconds((s) => s + 1);
    }, 1000);

    // Launch microphone stream & speech recognition
    startVoiceSystem(currentLang);

    return () => {
      cleanupAll();
    };
  }, [isOpen]);

  const cleanupAll = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch (e) {}
      mediaStreamRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onspeechstart = null;
        recognitionRef.current.onspeechend = null;
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
  };

  const startVoiceSystem = async (langKey) => {
    // Cancel any active TTS speech so microphone doesn't pick up speaker audio
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    // Exit timeout if user never speaks anything for 6.5 seconds
    idleTimeoutRef.current = setTimeout(() => {
      if (!fullTextRef.current.trim() && !isSubmittedRef.current) {
        cleanupAll();
        onClose("timeout");
      }
    }, 6500);

    // 1. Setup Audio Energy Analysis for animated waves
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
        });
        mediaStreamRef.current = stream;

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const checkAudio = () => {
            if (!analyser || isSubmittedRef.current) return;
            analyser.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            setVolumeLevel(Math.min(100, Math.round(avg * 2.2)));

            // Reset silence timer while active voice audio is sounding
            if (avg > 15) {
              if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
                idleTimeoutRef.current = null;
              }
              if (silenceTimeoutRef.current && fullTextRef.current.trim().length > 0) {
                clearTimeout(silenceTimeoutRef.current);
                silenceTimeoutRef.current = null;
              }
            } else if (fullTextRef.current.trim().length > 0) {
              // Once speech has been recorded, 1.3s of quiet automatically finalizes & submits to chatbot
              if (!silenceTimeoutRef.current) {
                silenceTimeoutRef.current = setTimeout(() => {
                  handleFinishAndSend();
                }, 1300);
              }
            }

            animFrameRef.current = requestAnimationFrame(checkAudio);
          };

          animFrameRef.current = requestAnimationFrame(checkAudio);
        }
      }
    } catch (micErr) {
      console.warn("Microphone access notice:", micErr);
      if (micErr.name === "NotAllowedError" || micErr.name === "PermissionDeniedError") {
        setErrorMessage("Microphone permission denied. Please allow microphone access in your browser.");
        return;
      }
    }

    // 2. Setup Web Speech Recognition for transcribing directly in preferred language
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage(
        t.micUnavailable || "Speech recognition is not supported in this browser. Please use Chrome or Edge."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const bcpCode = LANG_CODE_MAP[langKey] || "en-IN";
      recognition.lang = bcpCode;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onspeechstart = () => {
        if (idleTimeoutRef.current) {
          clearTimeout(idleTimeoutRef.current);
          idleTimeoutRef.current = null;
        }
      };

      recognition.onresult = (event) => {
        if (idleTimeoutRef.current) {
          clearTimeout(idleTimeoutRef.current);
          idleTimeoutRef.current = null;
        }

        let finalAccum = "";
        let interimAccum = "";

        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          const chunk = res[0]?.transcript || "";
          if (res.isFinal) {
            finalAccum += chunk + " ";
          } else {
            interimAccum += chunk;
          }
        }

        const combined = (finalAccum + " " + interimAccum).trim();
        setTranscript(finalAccum.trim());
        setInterimText(interimAccum.trim());
        fullTextRef.current = combined;

        // Auto-detect language if script switches
        const detected = detectLanguageFromText(combined, currentLangRef.current);
        if (detected && detected !== currentLangRef.current) {
          setCurrentLang(detected);
          currentLangRef.current = detected;
          onLanguageChange?.(detected);
        }

        // Reset silence timer on newly captured word
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        if (combined.length >= 2) {
          silenceTimeoutRef.current = setTimeout(() => {
            handleFinishAndSend(combined);
          }, 1300);
        }
      };

      recognition.onspeechend = () => {
        if (fullTextRef.current.trim().length > 0 && !isSubmittedRef.current) {
          if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = setTimeout(() => {
            handleFinishAndSend(fullTextRef.current);
          }, 800);
        }
      };

      recognition.onerror = (err) => {
        if (err.error === "not-allowed" || err.error === "permission-denied") {
          setErrorMessage("Microphone permission denied. Please allow access in browser bar.");
          cleanupAll();
        } else if (err.error === "no-speech") {
          // If no speech heard, don't abruptly exit; let the 6s idle timer handle it gracefully
        }
      };

      recognition.onend = () => {
        // If user finished speaking and text was captured, auto send to chatbot
        if (fullTextRef.current.trim().length > 0 && !isSubmittedRef.current) {
          handleFinishAndSend(fullTextRef.current);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Speech recognition startup error:", err);
      setErrorMessage("Could not initialize microphone. Please check audio settings.");
    }
  };

  const handleLanguageSelect = (newLang) => {
    setCurrentLang(newLang);
    currentLangRef.current = newLang;
    onLanguageChange?.(newLang);

    // Restart voice detection with the chosen language
    cleanupAll();
    setTimeout(() => {
      startVoiceSystem(newLang);
    }, 100);
  };

  const handleFinishAndSend = (overrideText = null) => {
    if (isSubmittedRef.current) return;

    const fullText = (overrideText || fullTextRef.current || transcript + " " + interimText).trim();
    if (!fullText) {
      setErrorMessage("Listening for your voice... Please speak your question.");
      return;
    }

    isSubmittedRef.current = true;
    setVoiceState("submitting");
    cleanupAll();

    const resolvedLang = detectLanguageFromText(fullText, currentLangRef.current);

    setTimeout(() => {
      onSend(fullText, resolvedLang || currentLangRef.current);
      onClose("submitted");
    }, 150);
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const currentDisplay = (transcript + " " + interimText).trim();

  return (
    <div className="voice-modal-backdrop" onClick={() => onClose("cancel")}>
      <div className="voice-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="voice-modal-header">
          <div className="voice-header-title">
            <span className="voice-modal-badge">🎙️ REAL-TIME VOICE ASSISTANT</span>
            <h3>{t.voiceRecordTitle || "Speak Your Question"}</h3>
          </div>
          <button
            type="button"
            className="voice-modal-close"
            onClick={() => onClose("cancel")}
            title={t.voiceCancel || "Close"}
          >
            ✕
          </button>
        </div>

        {/* Language Picker Bar */}
        <div className="voice-lang-bar">
          <label htmlFor="voice-lang-select" className="voice-lang-label">
            🌐 Spoken Language:
          </label>
          <select
            id="voice-lang-select"
            value={currentLang}
            onChange={(e) => handleLanguageSelect(e.target.value)}
            className="voice-lang-dropdown"
          >
            {MODAL_LANGUAGES.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Central Visualizer & Ripple Mic */}
        <div className="voice-visualizer-section">
          <div className="voice-mic-core recording-active">
            <div className="voice-ripple ring-1"></div>
            <div className="voice-ripple ring-2"></div>
            <div className="voice-ripple ring-3"></div>
            <button
              type="button"
              className="voice-mic-button"
              onClick={() => {
                if (currentDisplay) {
                  handleFinishAndSend();
                }
              }}
              title={currentDisplay ? "Click to send now" : "Listening in real time..."}
            >
              <span className="mic-symbol">
                {voiceState === "submitting" ? "⏳" : "🎙️"}
              </span>
            </button>
          </div>

          {/* Equalizer Waves reacting in real time */}
          <div className="voice-wave-bars animating">
            <span style={{ height: `${Math.max(6, volumeLevel * 0.22)}px` }}></span>
            <span style={{ height: `${Math.max(8, volumeLevel * 0.26)}px` }}></span>
            <span style={{ height: `${Math.max(10, volumeLevel * 0.32)}px` }}></span>
            <span style={{ height: `${Math.max(12, volumeLevel * 0.38)}px` }}></span>
            <span style={{ height: `${Math.max(10, volumeLevel * 0.32)}px` }}></span>
            <span style={{ height: `${Math.max(8, volumeLevel * 0.26)}px` }}></span>
            <span style={{ height: `${Math.max(6, volumeLevel * 0.22)}px` }}></span>
          </div>

          {/* Dynamic Status Badge */}
          <div className="voice-status-line">
            <div className="recording-indicator">
              <span
                className={`rec-dot ${
                  voiceState === "submitting" ? "rec-waiting" : "rec-pulsing"
                }`}
              ></span>
              <strong>
                {voiceState === "submitting"
                  ? "SENDING TO CHATBOT..."
                  : "LISTENING & RECORDING IN REAL-TIME"}
              </strong>
              <span className="rec-time">{formatTimer(recordSeconds)}</span>
            </div>

            <p className="voice-instruction-label">
              {voiceState === "submitting"
                ? "Passing your voice question into the chatbot..."
                : "Listening to your voice... Speak naturally and it will auto-send to the chatbot."}
            </p>
          </div>
        </div>

        {/* Live Transcript Display Box */}
        <div className="voice-transcript-card">
          <div className="transcript-header">
            <span>📝 Live Transcript ({currentLang}):</span>
            {currentDisplay && (
              <button
                type="button"
                className="clear-transcript-btn"
                onClick={() => {
                  setTranscript("");
                  setInterimText("");
                  fullTextRef.current = "";
                }}
              >
                Clear
              </button>
            )}
          </div>
          <div className="transcript-content">
            {currentDisplay ? (
              <p className="active-transcript-text">
                {currentDisplay}
                <span className="transcript-cursor">|</span>
              </p>
            ) : (
              <p className="placeholder-text">
                {`Listening for your voice in ${currentLang}... (e.g. "Will it rain tomorrow in ${city}?")`}
              </p>
            )}
          </div>
        </div>

        {/* Error Callout if any */}
        {errorMessage && (
          <div className="voice-error-banner">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="voice-modal-actions">
          <button
            type="button"
            className="voice-cancel-btn"
            onClick={() => onClose("cancel")}
          >
            {t.voiceCancel || "Cancel"}
          </button>
          <button
            type="button"
            className="voice-send-btn"
            disabled={!currentDisplay || voiceState === "submitting"}
            onClick={() => handleFinishAndSend()}
          >
            {voiceState === "submitting" ? "⏳ Sending..." : `✓ ${t.voiceStopAndSend || "Done & Send Question"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
