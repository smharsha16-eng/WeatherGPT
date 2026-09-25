import { useState, useEffect, useRef } from "react";
import { LANG_CODE_MAP } from "../utils/translations";

export default function VoiceModal({
  isOpen,
  onClose,
  onSend,
  language = "English",
  city = "Bengaluru",
  t = {},
}) {
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      cleanupRecognition();
      return;
    }

    setTranscript("");
    setInterimText("");
    setErrorMessage("");
    setRecordSeconds(0);
    startRecognition();

    return () => {
      cleanupRecognition();
    };
  }, [isOpen, language]);

  const cleanupRecognition = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage(
        t.micUnavailable || "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );
      setIsRecording(false);
      return;
    }

    // Cancel any TTS reading if active
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = LANG_CODE_MAP[language] || "en-IN";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setErrorMessage("");
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setRecordSeconds((prev) => {
            if (prev >= 45) {
              handleStopAndSend();
              return prev;
            }
            return prev + 1;
          });
        }, 1000);
      };

      recognition.onresult = (event) => {
        let finalStr = "";
        let interimStr = "";
        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) {
            finalStr += res[0].transcript + " ";
          } else {
            interimStr += res[0].transcript;
          }
        }
        if (finalStr) {
          setTranscript((prev) => (prev + " " + finalStr).trim());
        }
        setInterimText(interimStr);
      };

      recognition.onerror = (err) => {
        console.warn("Voice recognition error:", err);
        if (err.error === "not-allowed" || err.error === "permission-denied") {
          setErrorMessage("Microphone permission denied. Please allow microphone access in your browser settings.");
        } else if (err.error === "no-speech") {
          // Keep listening
        } else {
          setErrorMessage(`Microphone notice: ${err.error || "Please speak clearly."}`);
        }
      };

      recognition.onend = () => {
        // Only mark stopped if not closed
        setIsRecording(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Speech recognition startup error:", err);
      setErrorMessage("Could not initialize microphone. Please check your browser audio permissions.");
      setIsRecording(false);
    }
  };

  const handleStopAndSend = () => {
    const fullText = (transcript + " " + interimText).trim();
    cleanupRecognition();
    if (fullText) {
      onSend(fullText, true);
      onClose();
    } else {
      setErrorMessage("No speech detected. Please speak your question and try again.");
    }
  };

  const handleChipClick = (sampleQuestion) => {
    setTranscript(sampleQuestion);
    setInterimText("");
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  const currentDisplay = (transcript + " " + interimText).trim();

  return (
    <div className="voice-modal-backdrop" onClick={onClose}>
      <div className="voice-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="voice-modal-header">
          <div className="voice-header-title">
            <span className="voice-modal-badge">🎙️ AI VOICE MODE</span>
            <h3>{t.voiceRecordTitle || "Voice Weather Assistant"}</h3>
          </div>
          <button className="voice-modal-close" onClick={onClose} title={t.voiceCancel || "Close"}>
            ✕
          </button>
        </div>

        {/* Central Visualizer & Ripple Mic */}
        <div className="voice-visualizer-section">
          <div className={`voice-mic-core ${isRecording ? "recording-active" : ""}`}>
            <div className="voice-ripple ring-1"></div>
            <div className="voice-ripple ring-2"></div>
            <div className="voice-ripple ring-3"></div>
            <button
              type="button"
              className="voice-mic-button"
              onClick={isRecording ? cleanupRecognition : startRecognition}
              title={isRecording ? "Click to Pause" : "Click to Resume Recording"}
            >
              <span className="mic-symbol">{isRecording ? "🎙️" : "🎤"}</span>
            </button>
          </div>

          {/* Equalizer Waves */}
          <div className={`voice-wave-bars ${isRecording ? "animating" : "idle"}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Recording Timer & Status */}
          <div className="voice-status-line">
            <div className="recording-indicator">
              <span className={`rec-dot ${isRecording ? "rec-pulsing" : ""}`}></span>
              <strong>{isRecording ? "RECORDING" : "READY"}</strong>
              <span className="rec-time">{formatTimer(recordSeconds)}</span>
            </div>
            <p className="voice-instruction-label">
              {isRecording
                ? (t.voiceListeningPrompt || "Listening... Speak your weather question now")
                : "Microphone paused. Click the microphone above to speak."}
            </p>
            <span className="voice-lang-pill">
              🌐 {language} ({LANG_CODE_MAP[language] || "en-IN"})
            </span>
          </div>
        </div>

        {/* Live Transcript Display Box */}
        <div className="voice-transcript-card">
          <div className="transcript-header">
            <span>📝 {t.voiceRecognizing || "Live Speech Transcript:"}</span>
            {currentDisplay && (
              <button
                className="clear-transcript-btn"
                onClick={() => {
                  setTranscript("");
                  setInterimText("");
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
                {isRecording && <span className="transcript-cursor">|</span>}
              </p>
            ) : (
              <p className="placeholder-text">
                Speak now... E.g. <em>&quot;Can I spray pesticides in {city} tomorrow?&quot;</em> or <em>&quot;Will it rain today?&quot;</em>
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

        {/* Quick Question Inspiration Prompts */}
        <div className="voice-suggestions-container">
          <small>💡 Quick spoken questions:</small>
          <div className="voice-chips-row">
            <button type="button" onClick={() => handleChipClick(`Will it rain tomorrow in ${city}?`)}>
              🌧️ Will it rain tomorrow?
            </button>
            <button type="button" onClick={() => handleChipClick(`Can I spray pesticides in ${city} tomorrow?`)}>
              🌾 Pesticide spray advice
            </button>
            <button type="button" onClick={() => handleChipClick(`Are there any active cyclone or flood alerts?`)}>
              🚨 Disaster alerts
            </button>
            <button type="button" onClick={() => handleChipClick(`What should I wear tomorrow in ${city}?`)}>
              👔 Outfit & style advice
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="voice-modal-actions">
          <button type="button" className="voice-cancel-btn" onClick={onClose}>
            {t.voiceCancel || "Cancel"}
          </button>
          <button
            type="button"
            className="voice-send-btn"
            disabled={!currentDisplay}
            onClick={handleStopAndSend}
          >
            ✓ {t.voiceStopAndSend || "Done & Send to Chatbot"}
          </button>
        </div>
      </div>
    </div>
  );
}
