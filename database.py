"""
WeatherGPT Persistent Database Layer
Relational SQLite implementation for SIH26068 (MoES) Tech Stack.
Handles chat session persistence, multi-turn message history, and user settings.
"""

import os
import sqlite3
import uuid
import json
from datetime import datetime, timezone

# Support writable storage on Vercel Serverless environment (/tmp) vs local development
if os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"):
    DB_PATH = os.path.join("/tmp", "weathergpt.db")
else:
    DB_PATH = os.path.join(os.path.dirname(__file__), "weathergpt.db")


def get_db_connection():
    """Create a thread-safe connection to the SQLite database with row factory enabled."""
    conn = sqlite3.connect(DB_PATH, timeout=10.0, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn


def init_db():
    """Initialize database tables and indexes if they do not exist."""
    conn = get_db_connection()
    try:
        with conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS chat_sessions (
                    id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    language TEXT DEFAULT 'English',
                    city TEXT DEFAULT 'Bengaluru',
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );
            """)

            conn.execute("""
                CREATE TABLE IF NOT EXISTS chat_messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    session_id TEXT NOT NULL,
                    role TEXT NOT NULL,
                    text TEXT NOT NULL,
                    source TEXT,
                    is_voice INTEGER DEFAULT 0,
                    created_at TEXT NOT NULL,
                    FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
                );
            """)

            conn.execute("""
                CREATE TABLE IF NOT EXISTS user_settings (
                    user_id TEXT PRIMARY KEY,
                    settings_json TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );
            """)

            conn.execute("""
                CREATE TABLE IF NOT EXISTS weather_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    city TEXT NOT NULL,
                    lat REAL,
                    lon REAL,
                    temperature REAL,
                    feels_like REAL,
                    condition TEXT,
                    condition_icon TEXT,
                    humidity INTEGER,
                    wind_speed_kmh REAL,
                    pressure_hpa REAL,
                    precipitation_mm REAL,
                    aqi_status TEXT,
                    recorded_at TEXT NOT NULL
                );
            """)

            # Create indexing for rapid session retrieval and chronology
            conn.execute("CREATE INDEX IF NOT EXISTS idx_messages_session ON chat_messages(session_id);")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_messages_created ON chat_messages(created_at);")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_sessions_updated ON chat_sessions(updated_at DESC);")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_weather_history_city ON weather_history(city);")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_weather_history_recorded ON weather_history(recorded_at DESC);")
        print("[Database] SQLite WeatherGPT database initialized successfully.")
    finally:
        conn.close()


def create_session(session_id=None, title="New Weather Consultation", language="English", city="Bengaluru") -> dict:
    """Create a new chat session."""
    if not session_id:
        session_id = f"sess_{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}_{uuid.uuid4().hex[:6]}"
    now_iso = datetime.now(timezone.utc).isoformat()
    conn = get_db_connection()
    try:
        with conn:
            conn.execute(
                """
                INSERT INTO chat_sessions (id, title, language, city, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (session_id, title[:100], language, city, now_iso, now_iso),
            )
        return {
            "id": session_id,
            "title": title[:100],
            "language": language,
            "city": city,
            "created_at": now_iso,
            "updated_at": now_iso,
            "message_count": 0,
        }
    finally:
        conn.close()


def get_or_create_session(session_id=None, title=None, language="English", city="Bengaluru") -> dict:
    """Fetch existing session or create a new one."""
    if session_id:
        conn = get_db_connection()
        try:
            row = conn.execute("SELECT * FROM chat_sessions WHERE id = ?", (session_id,)).fetchone()
            if row:
                return dict(row)
        finally:
            conn.close()
    
    # If not found or not provided, create new
    default_title = title or f"Weather in {city}"
    return create_session(session_id=session_id, title=default_title, language=language, city=city)


def list_sessions(limit: int = 50) -> list[dict]:
    """Retrieve all past chat sessions ordered by latest updated."""
    conn = get_db_connection()
    try:
        query = """
            SELECT 
                s.id, 
                s.title, 
                s.language, 
                s.city, 
                s.created_at, 
                s.updated_at,
                COUNT(m.id) as message_count,
                MAX(m.text) as last_message
            FROM chat_sessions s
            LEFT JOIN chat_messages m ON s.id = m.session_id
            GROUP BY s.id
            ORDER BY s.updated_at DESC
            LIMIT ?
        """
        rows = conn.execute(query, (limit,)).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def get_session_messages(session_id: str) -> list[dict]:
    """Fetch all messages for a specific session in chronological order."""
    conn = get_db_connection()
    try:
        rows = conn.execute(
            """
            SELECT id, session_id, role, text, source, is_voice, created_at
            FROM chat_messages
            WHERE session_id = ?
            ORDER BY id ASC
            """,
            (session_id,),
        ).fetchall()
        
        result = []
        for r in rows:
            d = dict(r)
            d["isVoice"] = bool(d.get("is_voice"))
            result.append(d)
        return result
    finally:
        conn.close()


def add_message(session_id: str, role: str, text: str, source: str = None, is_voice: bool = False) -> dict:
    """Append a new message to a session and update the session updated_at timestamp."""
    conn = get_db_connection()
    now_iso = datetime.now(timezone.utc).isoformat()
    try:
        with conn:
            # Verify session exists, otherwise create it
            row = conn.execute("SELECT id, title FROM chat_sessions WHERE id = ?", (session_id,)).fetchone()
            if not row:
                clean_title = text[:45].strip() if role == "user" else "Weather Consultation"
                conn.execute(
                    """
                    INSERT INTO chat_sessions (id, title, language, city, created_at, updated_at)
                    VALUES (?, ?, 'English', 'Bengaluru', ?, ?)
                    """,
                    (session_id, clean_title, now_iso, now_iso),
                )
            else:
                # Update title from the first meaningful user prompt if still default
                if role == "user" and row["title"] in ["New Weather Consultation", "Weather in Bengaluru"]:
                    new_title = text[:45].strip()
                    conn.execute("UPDATE chat_sessions SET title = ? WHERE id = ?", (new_title, session_id))

            cursor = conn.execute(
                """
                INSERT INTO chat_messages (session_id, role, text, source, is_voice, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (session_id, role, text, source, 1 if is_voice else 0, now_iso),
            )
            msg_id = cursor.lastrowid
            conn.execute("UPDATE chat_sessions SET updated_at = ? WHERE id = ?", (now_iso, session_id))

        return {
            "id": msg_id,
            "session_id": session_id,
            "role": role,
            "text": text,
            "source": source,
            "isVoice": is_voice,
            "created_at": now_iso,
        }
    finally:
        conn.close()


def delete_session(session_id: str) -> bool:
    """Delete a specific session and all its messages."""
    conn = get_db_connection()
    try:
        with conn:
            cursor = conn.execute("DELETE FROM chat_sessions WHERE id = ?", (session_id,))
            return cursor.rowcount > 0
    finally:
        conn.close()


def clear_all_history() -> int:
    """Clear all chat sessions and messages permanently."""
    conn = get_db_connection()
    try:
        with conn:
            c1 = conn.execute("DELETE FROM chat_messages;")
            c2 = conn.execute("DELETE FROM chat_sessions;")
            return c2.rowcount
    finally:
        conn.close()


def save_user_settings(user_id: str, settings: dict) -> dict:
    """Save or update user settings JSON."""
    conn = get_db_connection()
    now_iso = datetime.now(timezone.utc).isoformat()
    try:
        with conn:
            conn.execute(
                """
                INSERT INTO user_settings (user_id, settings_json, updated_at)
                VALUES (?, ?, ?)
                ON CONFLICT(user_id) DO UPDATE SET
                    settings_json = excluded.settings_json,
                    updated_at = excluded.updated_at
                """,
                (user_id, json.dumps(settings), now_iso),
            )
        return {"user_id": user_id, "settings": settings, "updated_at": now_iso}
    finally:
        conn.close()


def get_user_settings(user_id: str) -> dict | None:
    """Fetch user settings JSON."""
    conn = get_db_connection()
    try:
        row = conn.execute("SELECT settings_json FROM user_settings WHERE user_id = ?", (user_id,)).fetchone()
        if row and row["settings_json"]:
            return json.loads(row["settings_json"])
        return None
    finally:
        conn.close()


def save_weather_observation(weather_data: dict) -> dict | None:
    """
    Store an observation snapshot in weather_history.
    De-duplicates if an observation for the same city was saved within the past 120 seconds.
    """
    if not weather_data or not weather_data.get("city"):
        return None

    city = weather_data.get("city", "Unknown")
    lat = float(weather_data.get("lat") or 0.0)
    lon = float(weather_data.get("lon") or 0.0)
    temp = float(weather_data.get("temperature") or 0.0)
    feels_like = float(weather_data.get("feels_like") or temp)
    cond = str(weather_data.get("condition") or "Clear")
    cond_icon = str(weather_data.get("condition_icon") or "")
    humidity = int(weather_data.get("humidity") or 50)
    wind_spd = float(weather_data.get("wind_speed_kmh") or 10.0)
    pressure = float(weather_data.get("pressure_hpa") or 1013.0)
    precip = float(weather_data.get("precipitation_mm") or 0.0)
    aqi_status = str(weather_data.get("air_quality", {}).get("status") or "Moderate")
    now_iso = datetime.now(timezone.utc).isoformat()

    conn = get_db_connection()
    try:
        with conn:
            # Check for recent observation for this city (within past 2 minutes)
            recent = conn.execute(
                """
                SELECT id, recorded_at FROM weather_history
                WHERE city = ?
                ORDER BY recorded_at DESC
                LIMIT 1
                """,
                (city,),
            ).fetchone()

            if recent:
                try:
                    last_rec = datetime.fromisoformat(recent["recorded_at"])
                    if (datetime.now(timezone.utc) - last_rec).total_seconds() < 120:
                        # Skip duplicate log within 2 minutes
                        return {"status": "skipped", "reason": "recent_entry_exists"}
                except Exception:
                    pass

            cursor = conn.execute(
                """
                INSERT INTO weather_history (
                    city, lat, lon, temperature, feels_like, condition,
                    condition_icon, humidity, wind_speed_kmh, pressure_hpa,
                    precipitation_mm, aqi_status, recorded_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    city, lat, lon, temp, feels_like, cond,
                    cond_icon, humidity, wind_spd, pressure,
                    precip, aqi_status, now_iso
                ),
            )
            obs_id = cursor.lastrowid
            return {
                "id": obs_id,
                "city": city,
                "temperature": temp,
                "condition": cond,
                "recorded_at": now_iso,
                "status": "saved"
            }
    finally:
        conn.close()


def get_weather_history(city: str = None, limit: int = 50) -> list[dict]:
    """Retrieve historical weather records, optionally filtered by city."""
    conn = get_db_connection()
    try:
        if city and city.strip():
            query = """
                SELECT * FROM weather_history
                WHERE city LIKE ?
                ORDER BY recorded_at DESC
                LIMIT ?
            """
            rows = conn.execute(query, (f"%{city.strip()}%", limit)).fetchall()
        else:
            query = """
                SELECT * FROM weather_history
                ORDER BY recorded_at DESC
                LIMIT ?
            """
            rows = conn.execute(query, (limit,)).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def clear_weather_history(city: str = None) -> int:
    """Clear past weather history from database."""
    conn = get_db_connection()
    try:
        with conn:
            if city and city.strip():
                cur = conn.execute("DELETE FROM weather_history WHERE city LIKE ?", (f"%{city.strip()}%",))
            else:
                cur = conn.execute("DELETE FROM weather_history")
            return cur.rowcount
    finally:
        conn.close()

