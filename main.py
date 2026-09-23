import os
import random
import time
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import jwt
import requests
from datetime import datetime, timezone, timedelta
from fastapi import FastAPI, HTTPException, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from chatbot import ask_weathergpt, parse_message
from weather_service import (
    get_live_weather,
    get_nwp_forecast,
    compare_nwp_models,
    get_extreme_weather_alerts,
    get_sector_advisories,
    get_outfit_recommendations,
    get_aviation_briefing,
    get_climate_trends,
    get_coordinates,
)

app = FastAPI(
    title="WeatherGPT - AI Meteorological Intelligence Platform",
    description="Conversational AI platform integrating NWP forecasting (GFS/ECMWF), IMD extreme weather warnings, multi-sector decision support, and climate trends for the Ministry of Earth Sciences (MoES).",
    version="2.0.0",
)

# CORS middleware for development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Locate frontend production build if available
FRONTEND_DIST = os.path.join(os.path.dirname(__file__), "my-react-app", "dist")
if not os.path.exists(FRONTEND_DIST):
    FRONTEND_DIST = os.path.join(os.path.dirname(__file__), "weathergpt1", "my-react-app", "dist")

if os.path.exists(FRONTEND_DIST):
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")


class ChatRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        examples=["Can I spray pesticides in Nashik tomorrow?"],
    )
    city: str | None = Field(default="Bengaluru")
    language: str | None = Field(default="English")


@app.get("/")
def home():
    if os.path.exists(FRONTEND_DIST):
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)

    return {
        "project": "WeatherGPT AI Platform - Ministry of Earth Sciences (MoES)",
        "status": "online",
        "version": "2.0.0",
        "modules": [
            "Real-time meteorological retrieval (Zero-Key Open-Meteo & WeatherAPI)",
            "Conversational AI Chatbot with Multilingual Grounding (7 Indian Languages)",
            "Numerical Weather Prediction (NOAA GFS & ECMWF IFS)",
            "NWP Model Ensemble & Spread Comparison",
            "Disaster Early Warnings & Extreme Weather Disseminator (IMD 4-tier codes)",
            "Multi-Sector Decision Support (Agriculture, Aviation, Marine, Smart City)",
            "Climate Trends & Historical Anomaly Analytics",
            "Voice STT & TTS Accessibility",
        ],
        "endpoints": {
            "chat": "POST /chat",
            "weather": "GET /weather?city={city}",
            "forecast": "GET /forecast?city={city}&model={gfs|ecmwf|weatherapi}",
            "nwp_compare": "GET /nwp-compare?city={city}",
            "alerts": "GET /alerts?city={city}",
            "advisories": "GET /advisories?city={city}",
            "aviation": "GET /aviation?airport={icao}",
            "climate": "GET /climate?city={city}",
            "health": "GET /health",
        },
    }


@app.get("/api")
def api_info():
    return home()


@app.get("/health")
def health():
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "service": "WeatherGPT Backend Engine",
        "version": "2.0.0",
    }


@app.get("/weather")
def weather(
    city: str = Query(default="Bengaluru", description="City name to fetch weather for"),
    lat: float | None = Query(default=None, description="Latitude coordinate"),
    lon: float | None = Query(default=None, description="Longitude coordinate"),
    disaster: str | None = Query(default=None, description="Simulate disaster: flood, cyclone, tsunami"),
):
    """Get comprehensive current conditions, air quality (AQI), and 7-day outlook."""
    try:
        target = f"{lat},{lon}" if (lat is not None and lon is not None) else city
        data = get_live_weather(target)
        if disaster:
            disaster_clean = disaster.lower().strip()
            data["disaster"] = disaster_clean
            if disaster_clean == "flood":
                data["precipitation_mm"] = 115.0
                data["condition"] = "Torrential Monsoon Downpour & Flash Flood"
            elif disaster_clean == "cyclone":
                data["wind_speed_kmh"] = 125.0
                data["condition"] = "Very Severe Cyclonic Storm (VSCS)"
            elif disaster_clean == "tsunami":
                data["tsunami"] = True
                data["condition"] = "Oceanic Seismic Surge & Tsunami Warning"
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching weather: {str(e)}")


@app.get("/forecast")
def forecast(
    city: str = Query(default="Bengaluru"),
    lat: float | None = Query(default=None, description="Latitude coordinate"),
    lon: float | None = Query(default=None, description="Longitude coordinate"),
    model: str = Query(default="weatherapi", description="Model: weatherapi, gfs, or ecmwf"),
):
    """
    Get 7-day forecast with Numerical Weather Prediction (NWP) model integration.
    Supports WeatherAPI ensemble, NOAA GFS, and ECMWF IFS models.
    """
    try:
        target = f"{lat},{lon}" if (lat is not None and lon is not None) else city
        live = get_live_weather(target)
        target_lat = live.get("lat", 12.9716)
        target_lon = live.get("lon", 77.5946)

        model_clean = model.lower().strip()
        nwp_data = None
        if model_clean in ["gfs", "ecmwf"]:
            nwp_data = get_nwp_forecast(target_lat, target_lon, model=model_clean)

        return {
            "city": live.get("city", city),
            "coordinates": {"lat": target_lat, "lon": target_lon},
            "selected_model": model_clean,
            "standard_forecast": live.get("daily", []),
            "nwp_forecast": nwp_data,
            "source": live.get("source"),
            "updated_at": live.get("updated_at"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching forecast: {str(e)}")


@app.get("/nwp-compare")
def nwp_compare(
    city: str = Query(default="Bengaluru"),
    lat: float | None = Query(default=None, description="Latitude coordinate"),
    lon: float | None = Query(default=None, description="Longitude coordinate"),
):
    """
    Side-by-side comparison of NOAA GFS and ECMWF IFS NWP models.
    Calculates temperature spread, precipitation agreement, and model ensemble confidence.
    """
    try:
        target = f"{lat},{lon}" if (lat is not None and lon is not None) else city
        target_lat, target_lon, res_name, _ = get_coordinates(target)
        comparison = compare_nwp_models(target_lat, target_lon)
        comparison["city"] = res_name
        comparison["coordinates"] = {"lat": target_lat, "lon": target_lon}
        return comparison
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"NWP comparison error: {str(e)}")


@app.get("/alerts")
def alerts(
    city: str = Query(default="Bengaluru"),
    lat: float | None = Query(default=None, description="Latitude coordinate"),
    lon: float | None = Query(default=None, description="Longitude coordinate"),
    disaster: str | None = Query(default=None, description="Simulate disaster: flood, cyclone, tsunami"),
):
    """Get active extreme weather alerts, early warning dissemination, and IMD disaster actions."""
    try:
        target = f"{lat},{lon}" if (lat is not None and lon is not None) else city
        live = get_live_weather(target)
        if disaster:
            disaster_clean = disaster.lower().strip()
            live["disaster"] = disaster_clean
            if disaster_clean == "flood":
                live["precipitation_mm"] = 115.0
                live["condition"] = "Torrential Monsoon Downpour & Flash Flood"
            elif disaster_clean == "cyclone":
                live["wind_speed_kmh"] = 125.0
                live["condition"] = "Very Severe Cyclonic Storm (VSCS)"
            elif disaster_clean == "tsunami":
                live["tsunami"] = True
                live["condition"] = "Oceanic Seismic Surge & Tsunami Warning"
        alert_list = get_extreme_weather_alerts(live)
        return {
            "city": live.get("city", city),
            "alerts_count": len(alert_list),
            "alerts": alert_list,
            "risk_assessment": live.get("risk", {}),
            "updated_at": live.get("updated_at"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching alerts: {str(e)}")


@app.get("/advisories")
def advisories(
    city: str = Query(default="Bengaluru"),
    lat: float | None = Query(default=None, description="Latitude coordinate"),
    lon: float | None = Query(default=None, description="Longitude coordinate"),
):
    """Get multi-sector decision-support advisories (Agriculture, Aviation, Marine, Smart City)."""
    try:
        target = f"{lat},{lon}" if (lat is not None and lon is not None) else city
        live = get_live_weather(target)
        adv = get_sector_advisories(live)
        return {
            "city": live.get("city", city),
            "advisories": adv,
            "weather_summary": {
                "temperature": live.get("temperature"),
                "humidity": live.get("humidity"),
                "wind_kmh": live.get("wind_speed_kmh"),
                "precipitation_mm": live.get("precipitation_mm"),
                "condition": live.get("condition"),
            },
            "updated_at": live.get("updated_at"),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating advisories: {str(e)}")


@app.get("/recommendations")
def recommendations(
    city: str = Query(default="Bengaluru"),
    day: str = Query(default="tomorrow", description="Day: today or tomorrow"),
    lat: float | None = Query(default=None),
    lon: float | None = Query(default=None),
):
    """Personalized outfit styling, accessories checklist, and activity feasibility."""
    try:
        target = f"{lat},{lon}" if (lat is not None and lon is not None) else city
        live = get_live_weather(target)
        return get_outfit_recommendations(live, day=day)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating outfit recommendations: {str(e)}")


@app.get("/aviation")
def aviation(airport: str = Query(default="VOBL", description="4-letter ICAO airport code")):
    """Fetch live METAR & TAF briefings from AviationWeather.gov."""
    try:
        return get_aviation_briefing(airport)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Aviation briefing error: {str(e)}")


@app.get("/climate")
def climate(city: str = Query(default="Bengaluru")):
    """Get historical climate trends, multi-year anomaly data, and MoES regional insights."""
    try:
        return get_climate_trends(city)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Climate trend error: {str(e)}")


@app.post("/chat")
def chat(request: ChatRequest):
    """
    AI-powered conversational interface for WeatherGPT:
    - Multilingual query understanding (English, Hindi, Kannada, Tamil, Telugu, Marathi, Bengali)
    - Grounded with live weather datasets and NWP models
    - Contextual decision support for farming, aviation, marine, disaster alerts, and planning
    """
    try:
        response = ask_weathergpt(
            message=request.message,
            current_city=request.city or "Bengaluru",
            language=request.language or "English",
        )
        return response
    except Exception as e:
        print(f"Chat processing error: {e}")
        return {
            "reply": "WeatherGPT is currently processing queries with local meteorological sensors. Please specify your location or question.",
            "type": "error_fallback",
            "location": request.city or "Bengaluru",
            "temperature": 26.0,
            "condition": "Partly Cloudy",
            "language": request.language or "English",
            "data_source": "WeatherGPT Recovery Service",
        }


# ==========================================
# AUTHENTICATION & SECURITY CONFIGURATION
# ==========================================

from dotenv import load_dotenv

load_dotenv(override=True)
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "weathergpt-secret-moes-sih26068-auth-key-2026")

# In-memory sliding window rate limiter: key -> list of request timestamps
RATE_LIMIT_STORE: dict[str, list[float]] = {}

# In-memory store for generated Email OTP records: email -> { otp, expires_at, attempts, created_at }
EMAIL_OTP_STORE: dict[str, dict] = {}


def apply_rate_limit(key: str, max_requests: int = 5, window_seconds: int = 300):
    """Enforce sliding window rate limit. Raises HTTP 429 if exceeded."""
    now = time.time()
    timestamps = RATE_LIMIT_STORE.get(key, [])
    # Filter out timestamps older than window
    valid_timestamps = [t for t in timestamps if now - t < window_seconds]
    if len(valid_timestamps) >= max_requests:
        retry_after = int(window_seconds - (now - valid_timestamps[0]))
        raise HTTPException(
            status_code=429,
            detail=f"Too many requests. Rate limit exceeded. Please wait {max(1, retry_after)} seconds before trying again.",
            headers={"Retry-After": str(max(1, retry_after))},
        )
    valid_timestamps.append(now)
    RATE_LIMIT_STORE[key] = valid_timestamps


def dispatch_otp_email(to_email: str, otp_code: str) -> dict:
    """
    Dispatch real OTP verification code using:
    1. Brevo (Sendinblue) REST API if BREVO_API_KEY is configured.
    2. Resend REST API if RESEND_API_KEY is configured.
    3. SMTP Relay (Gmail, Brevo SMTP, etc.) if SMTP_USER & SMTP_PASSWORD are configured.
    """
    load_dotenv(override=True)
    brevo_api_key = os.getenv("BREVO_API_KEY", "").strip()
    resend_api_key = os.getenv("RESEND_API_KEY", "").strip()
    smtp_host = os.getenv("SMTP_HOST", "").strip()
    smtp_port = int(os.getenv("SMTP_PORT", "587") or 587)
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_password = os.getenv("SMTP_PASSWORD", "").strip()
    sender_email = os.getenv("SENDER_EMAIL", "").strip()
    sender_name = os.getenv("SENDER_NAME", "WeatherGPT MoES Security").strip()

    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>WeatherGPT Security Verification</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1528; color: #ffffff; padding: 30px; margin: 0;">
      <div style="max-width: 520px; margin: 0 auto; background: #132238; border-radius: 12px; padding: 32px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #38bdf8; margin: 0; font-size: 26px; font-weight: 700;">WeatherGPT</h1>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Ministry of Earth Sciences (MoES) &bull; SIH26068</p>
        </div>
        
        <h2 style="font-size: 18px; color: #f1f5f9; margin-bottom: 12px;">Your Login Verification Code</h2>
        <p style="color: #cbd5e1; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
          Use the following 6-digit one-time password (OTP) to securely access your WeatherGPT meteorological intelligence dashboard:
        </p>

        <div style="background: rgba(14, 165, 233, 0.15); border: 2px dashed #0284c7; border-radius: 8px; text-align: center; padding: 18px 0; margin-bottom: 20px;">
          <span style="font-family: monospace; font-size: 38px; font-weight: bold; letter-spacing: 8px; color: #38bdf8;">
            {otp_code}
          </span>
        </div>

        <p style="color: #f87171; font-size: 13px; font-weight: 600; margin-bottom: 20px;">
          ⏰ This verification code will expire in 5 minutes.
        </p>
        <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-bottom: 0;">
          If you did not request this verification code, please ignore this email. Do not share this code with anyone.
        </p>
      </div>
    </body>
    </html>
    """

    # 1. Brevo REST API
    if brevo_api_key:
        try:
            from_email = sender_email or "noreply@weathergpt.gov.in"
            headers = {
                "api-key": brevo_api_key,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
            payload = {
                "sender": {"name": sender_name, "email": from_email},
                "to": [{"email": to_email}],
                "subject": f"Your WeatherGPT Login Verification Code: {otp_code}",
                "htmlContent": html_body,
            }
            resp = requests.post("https://api.brevo.com/v3/smtp/email", headers=headers, json=payload, timeout=10)
            if resp.status_code in [200, 201]:
                print(f"[Brevo] Successfully dispatched OTP email to {to_email}")
                return {"provider": "brevo", "status": "sent"}
            else:
                err_msg = resp.text
                print(f"[Brevo Warning] Status {resp.status_code}: {err_msg}")
                return {"provider": "brevo", "status": "failed", "error": err_msg}
        except Exception as ex:
            print(f"[Brevo Dispatch Error]: {ex}")
            return {"provider": "brevo", "status": "failed", "error": str(ex)}

    # 2. Resend REST API
    if resend_api_key:
        try:
            from_email = sender_email or "onboarding@resend.dev"
            headers = {
                "Authorization": f"Bearer {resend_api_key}",
                "Content-Type": "application/json",
            }
            payload = {
                "from": f"{sender_name} <{from_email}>",
                "to": [to_email],
                "subject": f"Your WeatherGPT Login Verification Code: {otp_code}",
                "html": html_body,
            }
            resp = requests.post("https://api.resend.com/emails", headers=headers, json=payload, timeout=10)
            if resp.status_code in [200, 201]:
                print(f"[Resend] Successfully dispatched OTP email to {to_email}")
                return {"provider": "resend", "status": "sent"}
            else:
                err_msg = resp.text
                print(f"[Resend Warning] Status {resp.status_code}: {err_msg}")
                return {"provider": "resend", "status": "failed", "error": err_msg}
        except Exception as ex:
            print(f"[Resend Dispatch Error]: {ex}")
            return {"provider": "resend", "status": "failed", "error": str(ex)}

    # 3. SMTP Relay (Gmail, Outlook, Brevo SMTP, etc.)
    if smtp_user and smtp_password:
        try:
            # Auto-configure Gmail defaults if user has a gmail address
            host = smtp_host
            if not host or host == "smtp-relay.brevo.com":
                if "@gmail.com" in smtp_user.lower():
                    host = "smtp.gmail.com"

            from_email = sender_email
            if not from_email or "weathergpt.gov.in" in from_email:
                if "@gmail.com" in smtp_user.lower():
                    from_email = smtp_user

            clean_pass = smtp_password.replace(" ", "")

            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Your WeatherGPT Login Verification Code: {otp_code}"
            msg["From"] = f"{sender_name} <{from_email}>"
            msg["To"] = to_email
            msg.attach(MIMEText(html_body, "html"))

            if smtp_port == 465:
                with smtplib.SMTP_SSL(host, 465, timeout=12) as server:
                    server.login(smtp_user, clean_pass)
                    server.sendmail(from_email, [to_email], msg.as_string())
            else:
                with smtplib.SMTP(host, smtp_port, timeout=12) as server:
                    server.starttls()
                    server.login(smtp_user, clean_pass)
                    server.sendmail(from_email, [to_email], msg.as_string())

            print(f"[SMTP] Successfully dispatched OTP email to {to_email} via {host}")
            return {"provider": "smtp", "status": "sent"}
        except Exception as ex:
            print(f"[SMTP Dispatch Error]: {ex}")
            return {"provider": "smtp", "status": "failed", "error": str(ex)}

    # 4. No email service configured
    print(f"[Security Notice] Outgoing mail server is not configured in .env! OTP for {to_email} is {otp_code}")
    return {"provider": "none", "status": "unconfigured"}


# Request Models
class PhoneLoginRequest(BaseModel):
    phone: str
    country_code: str = "+91"
    name: str | None = "User"


class EmailCodeRequest(BaseModel):
    email: str


class EmailVerifyRequest(BaseModel):
    email: str
    code: str
    name: str | None = None


class TokenVerifyRequest(BaseModel):
    token: str


class GoogleAuthRequest(BaseModel):
    email: str
    name: str | None = None
    picture: str | None = None


# Endpoints
@app.post("/auth/phone/login")
def phone_direct_login(req: PhoneLoginRequest):
    """Direct mobile login taking name as 'User' without extra SMS waiting."""
    clean_phone = req.phone.replace(" ", "").replace("-", "")
    display_name = req.name or "User"
    payload = {
        "sub": f"phone:{clean_phone}",
        "name": display_name,
        "phone": f"{req.country_code} {clean_phone}",
        "role": "Citizen",
        "iat": int(time.time()),
        "exp": int(time.time()) + (7 * 86400),
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")
    return {
        "status": "success",
        "token": token,
        "user": {
            "name": display_name,
            "phone": f"{req.country_code} {clean_phone}",
            "role": "Citizen",
        },
    }


@app.post("/auth/email/send-code")
def send_email_code(req: EmailCodeRequest, request: Request):
    """
    Generate secure 6-digit OTP code, assign 5-minute expiry, enforce rate limiting,
    and dispatch OTP to recipient's email inbox using Brevo / Resend / SMTP.
    """
    clean_email = req.email.strip().lower()
    if "@" not in clean_email or "." not in clean_email:
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")

    # 1. Rate limiting checks (max 5 requests per 5 minutes per IP and per email)
    client_ip = request.client.host if request.client else "127.0.0.1"
    apply_rate_limit(f"ip:{client_ip}", max_requests=5, window_seconds=300)
    apply_rate_limit(f"email:{clean_email}", max_requests=5, window_seconds=300)

    # 2. Cryptographically secure 6-digit OTP code
    otp_code = f"{secrets.randbelow(900000) + 100000}"

    # 3. Store OTP with strict 5-minute expiry (300 seconds)
    EMAIL_OTP_STORE[clean_email] = {
        "otp": otp_code,
        "expires_at": time.time() + 300,
        "attempts": 0,
        "created_at": time.time(),
    }

    # 4. Dispatch real email via Brevo / Resend / SMTP
    dispatch_result = dispatch_otp_email(clean_email, otp_code)

    if dispatch_result.get("status") == "failed":
        raise HTTPException(
            status_code=500,
            detail=f"Failed to deliver verification email to {clean_email}: {dispatch_result.get('error')}. Please check email credentials in .env."
        )

    if dispatch_result.get("status") == "unconfigured":
        raise HTTPException(
            status_code=503,
            detail="Outgoing mail server is not configured in .env. To send real OTPs to inboxes, please configure your Gmail SMTP or Brevo API credentials in .env on the server."
        )

    return {
        "status": "success",
        "message": f"Verification OTP code sent to {clean_email}. Please check your inbox.",
        "expires_in_seconds": 300,
        "provider": dispatch_result.get("provider"),
        "email": clean_email,
    }


@app.post("/auth/email/verify-code")
def verify_email_code(req: EmailVerifyRequest, response: Response):
    """
    Verify 6-digit OTP code before 5-minute expiry, check attempt limit against brute-force,
    and issue a signed HS256 JWT session token upon success.
    """
    clean_email = req.email.strip().lower()
    record = EMAIL_OTP_STORE.get(clean_email)

    if not record:
        raise HTTPException(
            status_code=400,
            detail="No active OTP found for this email. Please request a new verification code.",
        )

    # Check 5-minute expiry window
    now = time.time()
    if now > record["expires_at"]:
        EMAIL_OTP_STORE.pop(clean_email, None)
        raise HTTPException(
            status_code=400,
            detail="OTP verification code has expired (valid for 5 minutes). Please request a new code.",
        )

    # Track verification attempts (Max 5 attempts to protect against brute-force)
    record["attempts"] += 1
    if record["attempts"] > 5:
        EMAIL_OTP_STORE.pop(clean_email, None)
        raise HTTPException(
            status_code=429,
            detail="Too many failed attempts. This OTP code has been invalidated for security. Please request a new code.",
        )

    # Validate matching real OTP code
    if req.code != record["otp"]:
        remaining_attempts = 5 - record["attempts"]
        if remaining_attempts <= 0:
            EMAIL_OTP_STORE.pop(clean_email, None)
            raise HTTPException(
                status_code=429,
                detail="Too many failed attempts. This OTP code has been invalidated for security. Please request a new code.",
            )
        raise HTTPException(
            status_code=400,
            detail=f"Invalid OTP code. {remaining_attempts} attempt(s) remaining.",
        )

    # OTP is valid! Single-use: remove immediately
    EMAIL_OTP_STORE.pop(clean_email, None)

    name = req.name or clean_email.split("@")[0].title()

    # Generate cryptographically signed HS256 JWT Session Token (7-day validity)
    payload = {
        "sub": clean_email,
        "name": name,
        "role": "Citizen",
        "iat": int(now),
        "exp": int(now) + (7 * 86400),
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")

    # Set secure HTTP-only session cookie
    response.set_cookie(
        key="weathergpt_session",
        value=token,
        max_age=7 * 86400,
        httponly=True,
        samesite="lax",
    )

    return {
        "status": "success",
        "token": token,
        "user": {
            "name": name,
            "email": clean_email,
            "role": "Citizen",
        },
    }


@app.post("/auth/verify-token")
def verify_session_token(req: TokenVerifyRequest):
    """Route Protection endpoint: validates JWT session tokens."""
    try:
        payload = jwt.decode(req.token, JWT_SECRET_KEY, algorithms=["HS256"])
        return {
            "valid": True,
            "user": {
                "name": payload.get("name", "User"),
                "email": payload.get("sub"),
                "role": payload.get("role", "Citizen"),
            },
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired. Please sign in again.")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid session token.")


@app.post("/auth/google")
def google_auth(req: GoogleAuthRequest):
    name = req.name or req.email.split("@")[0].title()
    return {
        "status": "success",
        "token": f"token-google-{req.email}",
        "user": {
            "name": name,
            "email": req.email,
            "picture": req.picture or f"https://api.dicebear.com/7.x/bottts/svg?seed={req.email}",
            "role": "Verified Citizen",
        },
    }


@app.post("/auth/guest")
def guest_auth():
    return {
        "status": "success",
        "token": "token-guest-citizen",
        "user": {
            "name": "Citizen Evaluator",
            "email": "citizen@weathergpt.gov.in",
            "role": "Citizen / Evaluator",
        },
    }