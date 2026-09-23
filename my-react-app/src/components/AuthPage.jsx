import { useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || (window.location.port === "5173" ? "http://127.0.0.1:8000" : "");

const COUNTRY_CODES = [
  { code: "+91", country: "India (IN)", flag: "🇮🇳" },
  { code: "+1", country: "USA / Canada (US)", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom (UK)", flag: "🇬🇧" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
];

export default function AuthPage({ onLoginSuccess, onClose, isModal = false, theme = "default", onThemeChange }) {
  // Method selection: "phone" (Mobile Number Direct), "google" (Google Sign-In), or "email" (Email OTP)
  const [authMethod, setAuthMethod] = useState("email");
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"

  // Phone Form fields
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");

  // Email Form fields
  const [email, setEmail] = useState("");

  // OTP / Code step for Email
  const [step, setStep] = useState("input"); // "input" (Email Entry) or "otp" (OTP Validation)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [expirySeconds, setExpirySeconds] = useState(300); // 5-minute expiry (300 seconds)
  const [attempts, setAttempts] = useState(0);

  // Status feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const otpInputsRef = useRef([]);

  // Time formatter: MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Live 5-minute countdown clock for OTP validity
  useEffect(() => {
    let interval = null;
    if (step === "otp" && expirySeconds > 0) {
      interval = setInterval(() => {
        setExpirySeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setErrorMsg("⏰ Verification code has expired (5-minute window). Please click 'Resend OTP Code'.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, expirySeconds]);

  // Cooldown countdown timer for OTP resend (30s cooldown)
  useEffect(() => {
    let interval = null;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // ==========================================
  // 1. MOBILE PHONE DIRECT LOGIN (As "User")
  // ==========================================
  const handleDirectPhoneLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const cleanNum = phone.replace(/\D/g, "");
    if (cleanNum.length < 7 || cleanNum.length > 15) {
      setErrorMsg("Please enter a valid mobile number (7-15 digits).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/phone/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: cleanNum,
          country_code: countryCode,
          name: userName.trim() || "User",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Failed to sign in with mobile number.");
      }

      localStorage.setItem("weathergpt_token", data.token);
      localStorage.setItem("weathergpt_user", JSON.stringify(data.user));

      setSuccessMsg(`Welcome, ${data.user.name || "User"}!`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(data.user);
      }, 400);
    } catch (err) {
      setErrorMsg(err.message || "Failed to sign in with mobile number.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 2. GOOGLE LOGIN HANDLER
  // ==========================================
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const gEmail = email.trim() && email.includes("@")
        ? email.trim().toLowerCase()
        : "user.weathergpt@gmail.com";
      const gName = userName.trim() || gEmail.split("@")[0];

      const res = await fetch(`${API_BASE}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: gEmail,
          name: gName,
          picture: `https://api.dicebear.com/7.x/bottts/svg?seed=${gEmail}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Google authentication failed.");
      }

      localStorage.setItem("weathergpt_token", data.token);
      localStorage.setItem("weathergpt_user", JSON.stringify(data.user));

      setSuccessMsg(`Signed in with Google as ${data.user.name}`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(data.user);
      }, 400);
    } catch (err) {
      setErrorMsg(err.message || "Google sign-in could not be completed.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 3. EMAIL ID OTP HANDLERS
  // ==========================================
  const handleSendEmailCode = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setErrorMsg("Please enter a valid Email ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/email/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to send email code.");

      setStep("otp");
      setResendTimer(30);
      setExpirySeconds(300); // 5-minute countdown clock
      setAttempts(0);
      setSuccessMsg(`Verification code sent to ${data.email || cleanEmail} (Valid for 5 minutes)`);
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 150);
    } catch (err) {
      setErrorMsg(err.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailCode = async (codeToVerify = otp.join("")) => {
    setErrorMsg("");
    setSuccessMsg("");

    if (expirySeconds <= 0) {
      setErrorMsg("⏰ This OTP code has expired. Please request a new verification code.");
      return;
    }

    if (codeToVerify.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit code.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/email/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          code: codeToVerify,
          name: userName.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAttempts((prev) => prev + 1);
        throw new Error(data.detail || "Invalid code.");
      }

      localStorage.setItem("weathergpt_token", data.token);
      localStorage.setItem("weathergpt_user", JSON.stringify(data.user));

      setSuccessMsg(`Welcome, ${data.user.name}!`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(data.user);
      }, 400);
    } catch (err) {
      setErrorMsg(err.message || "Code verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Inputs (Auto-advance & Backspace)
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    const fullOtp = newOtp.join("");
    if (fullOtp.length === 6 && !newOtp.includes("")) {
      handleVerifyEmailCode(fullOtp);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = pasted.split("");
    while (newOtp.length < 6) newOtp.push("");
    setOtp(newOtp);
    if (pasted.length === 6) {
      handleVerifyEmailCode(pasted);
    }
  };

  return (
    <div className={isModal ? "auth-modal-overlay" : "auth-page-container"}>
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-brand">
            <div className="brand-mark" style={{ width: "38px", height: "38px", fontSize: "16px" }}>
              W
            </div>
            <div>
              <h3>WeatherGPT Account</h3>
              <small>Sign In with Email OTP or Mobile Number</small>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            {onThemeChange && (
              <button
                type="button"
                className="sidebar-theme-btn"
                onClick={() => {
                  const next = theme === "default" ? "light" : theme === "light" ? "dark" : "default";
                  onThemeChange(next);
                }}
                title={`Theme: ${theme.toUpperCase()} (Click to toggle)`}
                style={{ fontSize: "12px", padding: "5px 9px" }}
              >
                {theme === "light" ? "☀️ Light" : theme === "dark" ? "🌙 Dark" : "🌐 Default"}
              </button>
            )}
            {isModal && onClose && (
              <button className="auth-close-btn" onClick={onClose} title="Close">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tab switch: Sign In vs Register */}
        <div className="auth-mode-switch">
          <button
            className={`mode-btn ${authMode === "login" ? "active" : ""}`}
            onClick={() => {
              setAuthMode("login");
              setErrorMsg("");
              setStep("input");
            }}
          >
            Sign In
          </button>
          <button
            className={`mode-btn ${authMode === "register" ? "active" : ""}`}
            onClick={() => {
              setAuthMode("register");
              setErrorMsg("");
              setStep("input");
            }}
          >
            Register
          </button>
        </div>

        {/* Authentication Methods: Email ID vs Mobile Number vs Google */}
        <div className="auth-method-pills">
          <button
            className={`method-pill ${authMethod === "email" ? "active" : ""}`}
            onClick={() => {
              setAuthMethod("email");
              setErrorMsg("");
              setStep("input");
            }}
          >
            ✉️ Email ID
          </button>
          <button
            className={`method-pill ${authMethod === "phone" ? "active" : ""}`}
            onClick={() => {
              setAuthMethod("phone");
              setErrorMsg("");
              setStep("input");
            }}
          >
            📱 Mobile Number
          </button>
          <button
            className={`method-pill ${authMethod === "google" ? "active" : ""}`}
            onClick={() => {
              setAuthMethod("google");
              setErrorMsg("");
              setStep("input");
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" style={{ marginRight: "5px" }}>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </button>
        </div>

        {/* Feedback alerts */}
        {errorMsg && <div className="auth-alert error">⚠️ {errorMsg}</div>}
        {successMsg && <div className="auth-alert success">✓ {successMsg}</div>}

        {/* ========================================================== */}
        {/* METHOD 1: EMAIL ID OTP (Verification code to mail) */}
        {/* ========================================================== */}
        {authMethod === "email" && (
          <div className="auth-email-form">
            {step === "input" ? (
              <form onSubmit={handleSendEmailCode}>
                <div style={{ textAlign: "center", marginBottom: "14px" }}>
                  <div style={{ display: "inline-block", background: "rgba(56, 189, 248, 0.15)", color: "var(--accent, #38bdf8)", padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    State 1: Email Entry
                  </div>
                </div>
                {authMode === "register" && (
                  <div className="form-group" style={{ marginBottom: "14px" }}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="e.g. Shushrutha"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="auth-helper-row" style={{ marginTop: "10px", marginBottom: "16px" }}>
                  <small style={{ color: "var(--muted)" }}>
                    🔒 We will send a 6-digit OTP verification code to this email.
                  </small>
                </div>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? "Sending Code..." : "Send Email Verification Code →"}
                </button>
              </form>
            ) : (
              <div className="otp-step-box">
                <div className="otp-prompt">
                  <div style={{ display: "inline-block", background: "rgba(56, 189, 248, 0.15)", color: "var(--accent, #38bdf8)", padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "700", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    State 2: OTP Validation
                  </div>
                  <strong>Enter 6-Digit Email OTP</strong>
                  <p>
                    Dispatched to <span>{email}</span>{" "}
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => {
                        setStep("input");
                        setOtp(["", "", "", "", "", ""]);
                      }}
                    >
                      (Change Email)
                    </button>
                  </p>
                </div>

                {/* 5-minute Live Countdown & Attempt Counter Bar */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: expirySeconds > 60 ? "rgba(56, 189, 248, 0.08)" : "rgba(239, 68, 68, 0.12)",
                  border: `1px solid ${expirySeconds > 60 ? "rgba(56, 189, 248, 0.25)" : "rgba(239, 68, 68, 0.4)"}`,
                  borderRadius: "8px",
                  padding: "8px 12px",
                  margin: "12px 0 16px 0",
                  fontSize: "12px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>⏰</span>
                    <strong style={{ color: expirySeconds > 60 ? "var(--accent, #38bdf8)" : "#f87171" }}>
                      {expirySeconds > 0 ? `Code expires in ${formatTime(expirySeconds)}` : "Expired (5m window)"}
                    </strong>
                  </div>
                  <div style={{ color: attempts >= 4 ? "#f87171" : "var(--muted, #94a3b8)", fontWeight: "600" }}>
                    🛡️ {attempts} / 5 attempts
                  </div>
                </div>

                <div className="otp-boxes-row" onPaste={handleOtpPaste}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="otp-box"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    />
                  ))}
                </div>

                <div className="otp-footer-row">
                  {resendTimer > 0 ? (
                    <small style={{ color: "var(--muted)" }}>Resend code available in {resendTimer}s</small>
                  ) : (
                    <button
                      type="button"
                      className="link-btn"
                      onClick={handleSendEmailCode}
                      disabled={loading}
                    >
                      ↻ Resend OTP Code
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="auth-submit-btn"
                  onClick={() => handleVerifyEmailCode()}
                  disabled={loading || expirySeconds === 0}
                >
                  {loading
                    ? "Verifying..."
                    : expirySeconds === 0
                    ? "Code Expired (Click Resend)"
                    : "Verify & Sign In ✓"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================== */}
        {/* METHOD 2: MOBILE NUMBER (Direct login taking name as "User") */}
        {/* ========================================================== */}
        {authMethod === "phone" && (
          <div className="auth-phone-form">
            <form onSubmit={handleDirectPhoneLogin}>
              <div className="form-group">
                <label>Mobile Phone Number</label>
                <div className="phone-input-row">
                  <select
                    className="country-select"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    className="auth-input phone-number-input"
                    placeholder="e.g. 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="auth-helper-row" style={{ marginTop: "10px", marginBottom: "16px" }}>
                <small style={{ color: "var(--muted)" }}>
                  ⚡ Instant Direct Sign In — Logs in directly taking name as <strong>User</strong>.
                </small>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? "Signing in..." : "Sign In with Mobile Number →"}
              </button>
            </form>
          </div>
        )}

        {/* ========================================================== */}
        {/* METHOD 3: GOOGLE LOGIN */}
        {/* ========================================================== */}
        {authMethod === "google" && (
          <div className="auth-google-box">
            <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "18px", textAlign: "center" }}>
              Sign in instantly with your verified <strong>Google Account</strong>.
            </p>

            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label>Google Account Email</label>
              <input
                type="email"
                className="auth-input"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="google-signin-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? "Connecting to Google..." : "Continue with Google Account"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
