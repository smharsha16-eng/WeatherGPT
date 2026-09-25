import React, { useState, useEffect, useMemo } from "react";

/**
 * Computes the time-of-day celestial phase:
 * - sunrise / morning: 05:00 - 11:30 (soft morning rays, rising sun)
 * - afternoon: 11:30 - 16:30 (bright blazing sun, energetic corona)
 * - sunset / evening: 16:30 - 19:30 (dim orange setting sun, sunset dusk)
 * - night: 19:30 - 05:00 (deep cosmic sky, realistic real-time moon at top-right, little twinkling stars)
 */
export function getDayNightPhase(date = new Date()) {
  const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

  if (hours >= 5.0 && hours < 11.5) {
    return {
      phase: "morning",
      label: "Sunrise & Morning",
      icon: "🌅",
      desc: "Morning Dawn",
      hours,
    };
  }
  if (hours >= 11.5 && hours < 16.5) {
    return {
      phase: "afternoon",
      label: "Bright Sun & Midday",
      icon: "☀️",
      desc: "Bright Sun",
      hours,
    };
  }
  if (hours >= 16.5 && hours < 19.5) {
    return {
      phase: "sunset",
      label: "Dim Orange Sunset",
      icon: "🌇",
      desc: "Sunset Twilight",
      hours,
    };
  }
  return {
    phase: "night",
    label: "Night Sky & Moon",
    icon: "🌙",
    desc: "Night Sky",
    hours,
  };
}

/**
 * High-precision astronomical moon phase calculation based on current real-time UTC timestamp.
 * Synodic month: ~29.5305877 days.
 */
export function getMoonPhaseDetails(date = new Date()) {
  const LUNAR_MONTH = 29.53058770576; // days
  // Reference epoch: Jan 6, 2000, 18:14 UTC (Known New Moon JD 2451549.26)
  const refDate = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const diffDays = (date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24);
  const phaseAge = ((diffDays % LUNAR_MONTH) + LUNAR_MONTH) % LUNAR_MONTH;
  const phaseFraction = phaseAge / LUNAR_MONTH; // 0.0 to 1.0

  // Illumination % = (1 - cos(phaseFraction * 2 * PI)) / 2 * 100
  const illumination = Math.round(((1 - Math.cos(phaseFraction * 2 * Math.PI)) / 2) * 100);

  let phaseName = "Full Moon";
  let phaseIcon = "🌕";

  if (phaseFraction < 0.03 || phaseFraction >= 0.97) {
    phaseName = "New Moon";
    phaseIcon = "🌑";
  } else if (phaseFraction < 0.22) {
    phaseName = "Waxing Crescent";
    phaseIcon = "🌒";
  } else if (phaseFraction < 0.28) {
    phaseName = "First Quarter";
    phaseIcon = "🌓";
  } else if (phaseFraction < 0.47) {
    phaseName = "Waxing Gibbous";
    phaseIcon = "🌔";
  } else if (phaseFraction < 0.53) {
    phaseName = "Full Moon";
    phaseIcon = "🌕";
  } else if (phaseFraction < 0.72) {
    phaseName = "Waning Gibbous";
    phaseIcon = "🌖";
  } else if (phaseFraction < 0.78) {
    phaseName = "Last Quarter";
    phaseIcon = "🌗";
  } else {
    phaseName = "Waning Crescent";
    phaseIcon = "🌘";
  }

  return {
    age: phaseAge.toFixed(1),
    fraction: phaseFraction,
    illumination,
    phaseName,
    phaseIcon,
  };
}

/**
 * Computes SVG clipping/shadow path for real-time moon phase terminator.
 * Disk radius = 48, Center = (50, 50).
 */
function getLunarShadowPath(fraction) {
  if (fraction < 0.03 || fraction > 0.97) {
    // New Moon: whole disk dark
    return "M 50 2 A 48 48 0 1 0 50 98 A 48 48 0 1 0 50 2 Z";
  }
  if (fraction >= 0.47 && fraction <= 0.53) {
    // Full Moon: no shadow
    return "";
  }
  const k = Math.cos(fraction * 2 * Math.PI);
  const rx = Math.max(0.1, Math.abs(k) * 48).toFixed(1);

  if (fraction < 0.5) {
    // Waxing: right side illuminated, shadow on left
    if (k > 0) {
      return `M 50 2 A 48 48 0 0 0 50 98 A ${rx} 48 0 0 1 50 2 Z`;
    } else {
      return `M 50 2 A 48 48 0 0 0 50 98 A ${rx} 48 0 0 0 50 2 Z`;
    }
  } else {
    // Waning: left side illuminated, shadow on right
    if (k < 0) {
      return `M 50 2 A 48 48 0 0 1 50 98 A ${rx} 48 0 0 1 50 2 Z`;
    } else {
      return `M 50 2 A 48 48 0 0 1 50 98 A ${rx} 48 0 0 0 50 2 Z`;
    }
  }
}

/**
 * RealTimeMoonImage
 * Photorealistic realistic moon visual with authentic lunar crater topography,
 * dark basalt maria seas, Tycho crater rays, realistic 3D limb darkening,
 * and dynamic real-time astronomical phase shadow.
 */
function RealTimeMoonImage({ moonDetails, size = 68 }) {
  const { fraction = 0.5, illumination = 100, phaseName = "Full Moon", phaseIcon = "🌕" } =
    moonDetails || {};
  const shadowPath = useMemo(() => getLunarShadowPath(fraction), [fraction]);

  return (
    <div
      className="hero-top-right-moon"
      aria-label={`Real-Time Moon: ${phaseName} (${illumination}% illuminated)`}
    >
      {/* Outer Moonlight Atmospheric Aura */}
      <div className="moon-atmospheric-glow" />

      {/* Photorealistic Moon SVG */}
      <svg
        className="real-moon-svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
      >
        <defs>
          {/* Base Lunar Regolith Gradient */}
          <radialGradient id="lunarRegolith" cx="38%" cy="36%" r="66%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="35%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="95%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>

          {/* Maria Basalt Dark Seas Gradients */}
          <radialGradient id="mariaDark1" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#334155" stopOpacity="0.88" />
            <stop offset="65%" stopColor="#1e293b" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.65" />
          </radialGradient>

          <radialGradient id="mariaDark2" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#475569" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#1e293b" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.6" />
          </radialGradient>

          {/* Crater Ray & Ejecta Highlight */}
          <radialGradient id="craterBright" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#f1f5f9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
          </radialGradient>

          {/* Spherical Limb Darkening & 3D Shading */}
          <radialGradient id="lunarLimbDarkening" cx="42%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0" />
            <stop offset="85%" stopColor="#0f172a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.8" />
          </radialGradient>

          {/* Circular Mask for Lunar Disk */}
          <clipPath id="lunarDiskClip">
            <circle cx="50" cy="50" r="47.5" />
          </clipPath>

          {/* Soft Blur for Terminator Shadow Edge */}
          <filter id="softTerminatorFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* 1. Ambient Lunar Aura Circle */}
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="rgba(224, 242, 254, 0.12)"
          filter="url(#softTerminatorFilter)"
        />

        {/* 2. Main Lunar Body Clipped to Perfect Sphere */}
        <g clipPath="url(#lunarDiskClip)">
          {/* Base Surface */}
          <circle cx="50" cy="50" r="47.5" fill="url(#lunarRegolith)" />

          {/* Major Lunar Maria (Dark Basalt Seas) */}
          {/* Oceanus Procellarum & Mare Imbrium */}
          <path
            d="M 20 28 C 14 38 16 54 22 66 C 28 74 36 70 34 56 C 32 44 26 34 20 28 Z"
            fill="url(#mariaDark1)"
          />
          <path
            d="M 30 18 C 42 14 50 22 48 34 C 46 44 34 42 28 34 C 24 28 26 20 30 18 Z"
            fill="url(#mariaDark2)"
          />
          {/* Mare Serenitatis & Mare Tranquillitatis */}
          <path
            d="M 50 24 C 62 22 66 32 60 40 C 54 44 46 38 50 24 Z"
            fill="url(#mariaDark1)"
          />
          <path
            d="M 50 40 C 64 36 70 46 62 56 C 54 60 46 50 50 40 Z"
            fill="url(#mariaDark2)"
          />
          {/* Mare Crisium */}
          <ellipse
            cx="76"
            cy="34"
            rx="5.5"
            ry="7.5"
            fill="url(#mariaDark1)"
            transform="rotate(-15 76 34)"
          />
          {/* Mare Fecunditatis & Nectaris */}
          <path
            d="M 56 54 C 68 52 72 66 60 72 C 52 72 50 62 56 54 Z"
            fill="url(#mariaDark1)"
          />
          {/* Mare Nubium & Humorum */}
          <path
            d="M 26 60 C 38 58 42 70 32 76 C 24 76 20 68 26 60 Z"
            fill="url(#mariaDark2)"
          />

          {/* Tycho Crater Ray System (Southern Highlands) */}
          <line x1="45" y1="78" x2="16" y2="52" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
          <line x1="45" y1="78" x2="26" y2="38" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" />
          <line x1="45" y1="78" x2="66" y2="58" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
          <line x1="45" y1="78" x2="74" y2="70" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
          <line x1="45" y1="78" x2="47" y2="32" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
          {/* Tycho Crater Rim */}
          <circle cx="45" cy="78" r="3.2" fill="#e2e8f0" stroke="#475569" strokeWidth="0.6" />
          <circle cx="45" cy="78" r="1.1" fill="#ffffff" />

          {/* Copernicus Crater & Bright Halo */}
          <circle cx="35" cy="40" r="4.2" fill="url(#craterBright)" />
          <circle cx="35" cy="40" r="2.6" fill="#cbd5e1" stroke="#334155" strokeWidth="0.5" />
          <circle cx="35" cy="40" r="0.8" fill="#ffffff" />

          {/* Kepler Crater */}
          <circle cx="25" cy="42" r="2.6" fill="url(#craterBright)" />
          <circle cx="25" cy="42" r="1.5" fill="#cbd5e1" stroke="#334155" strokeWidth="0.4" />
          <circle cx="25" cy="42" r="0.5" fill="#ffffff" />

          {/* Aristarchus Plateau (Brightest feature on the Moon) */}
          <circle cx="23" cy="30" r="2.0" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)" />

          {/* Minor scattered craters */}
          <circle cx="60" cy="76" r="1.6" fill="#94a3b8" stroke="#334155" strokeWidth="0.3" />
          <circle cx="70" cy="66" r="1.4" fill="#94a3b8" stroke="#334155" strokeWidth="0.3" />
          <circle cx="32" cy="80" r="1.5" fill="#94a3b8" stroke="#334155" strokeWidth="0.3" />
          <circle cx="54" cy="16" r="1.3" fill="#94a3b8" stroke="#334155" strokeWidth="0.3" />
          <circle cx="68" cy="22" r="1.4" fill="#94a3b8" stroke="#334155" strokeWidth="0.3" />

          {/* Spherical 3D Shading & Limb Darkening Overlay */}
          <circle cx="50" cy="50" r="47.5" fill="url(#lunarLimbDarkening)" />

          {/* Dynamic Real-Time Astronomical Phase Shadow Mask */}
          {shadowPath && (
            <path
              d={shadowPath}
              fill="rgba(4, 9, 20, 0.92)"
              filter="url(#softTerminatorFilter)"
            />
          )}
        </g>

        {/* 3. Outer Lunar Rim Highlight */}
        <circle
          cx="50"
          cy="50"
          r="47.5"
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="0.6"
        />
      </svg>

      {/* Real-Time Live Lunar Meta Badge */}
      <div className="real-moon-meta-pill">
        <span className="moon-icon-indicator">{phaseIcon}</span>
        <span className="moon-name-text">{phaseName}</span>
        <span className="moon-pct-text">{illumination}%</span>
      </div>
    </div>
  );
}

/**
 * Computes daytime solar trajectory coordinates across the sky.
 */
export function calculateSolarPosition(hours) {
  let leftPct = 16;
  let topPx = 18;

  if (hours >= 5.0 && hours < 11.5) {
    // Morning: rising upwards from lower left to high left
    const t = (hours - 5.0) / 6.5;
    leftPct = 8 + t * 16;
    topPx = 36 - t * 20;
  } else if (hours >= 11.5 && hours < 16.5) {
    // Afternoon: traversing high across the central sky
    const t = (hours - 11.5) / 5.0;
    leftPct = 24 + t * 30;
    topPx = 14 + Math.sin(t * Math.PI) * -4;
  } else if (hours >= 16.5 && hours < 19.5) {
    // Sunset: descending towards the right horizon
    const t = (hours - 16.5) / 3.0;
    leftPct = 54 + t * 28;
    topPx = 14 + t * 24;
  }

  return { leftPct: Math.round(leftPct), topPx: Math.round(topPx) };
}

/**
 * HeroCelestialAtmosphere
 * Atmospheric background visual system located directly in the background space above "Ask about the weather".
 * Features:
 * - Real-time authentic Moon image at the TOP RIGHT CORNER during night with live astronomical phase & craters
 * - Real-time solar visuals for morning, afternoon, and sunset along daytime trajectory
 * - Time-corresponding animated drifting cloud layers (Dawn, Bright Day, Sunset, Night mist)
 * - Sparkling twinkling stars in night cosmos
 * - Strictly non-interactive background layer (z-index: 0, pointer-events: none, no text overlap)
 */
export default function HeroCelestialAtmosphere({ onTimeTick = null }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setNow(d);
      if (onTimeTick) {
        onTimeTick(d);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeTick]);

  const { phase, hours } = useMemo(() => getDayNightPhase(now), [now]);
  const moonDetails = useMemo(() => getMoonPhaseDetails(now), [now]);
  const { leftPct, topPx } = useMemo(() => calculateSolarPosition(hours), [hours]);

  // Scattered twinkling stars for night sky
  const stars = useMemo(() => {
    return [
      { top: "12%", left: "10%", size: "3px", delay: "0s", dur: "2.1s" },
      { top: "22%", left: "22%", size: "2px", delay: "0.5s", dur: "2.8s" },
      { top: "10%", left: "36%", size: "2.5px", delay: "1.2s", dur: "1.9s" },
      { top: "26%", left: "48%", size: "3px", delay: "0.8s", dur: "3.2s" },
      { top: "14%", left: "62%", size: "2px", delay: "1.6s", dur: "2.4s" },
      { top: "24%", left: "74%", size: "3px", delay: "0.3s", dur: "2.6s" },
      { top: "35%", left: "15%", size: "2.5px", delay: "0.9s", dur: "2.5s" },
      { top: "38%", left: "68%", size: "2px", delay: "1.4s", dur: "2.2s" },
      { top: "45%", left: "82%", size: "2.5px", delay: "0.7s", dur: "2.9s" },
    ];
  }, []);

  return (
    <div className={`hero-celestial-atmosphere phase-${phase}`} aria-hidden="true">
      {/* 1. Dynamic Ambient Sky Background Gradient */}
      <div className={`hero-sky-tint sky-${phase}`} />

      {/* 2. Daytime Real-Time Moving Solar Atmosphere (Morning, Afternoon, Sunset) */}
      {phase !== "night" && (
        <div
          className={`hero-celestial-solar-anchor motion-${phase}`}
          style={{
            left: `${leftPct}%`,
            top: `${topPx}px`,
            transition: "left 1s linear, top 1s linear",
          }}
        >
          {phase === "morning" && (
            <div className="hero-morning-sun-scene">
              <div className="hero-morning-glow" />
              <div className="hero-morning-rays" />
              <div className="hero-morning-sun-orb" />
            </div>
          )}

          {phase === "afternoon" && (
            <div className="hero-afternoon-sun-scene">
              <div className="hero-afternoon-glow" />
              <div className="hero-afternoon-corona" />
              <div className="hero-afternoon-sun-orb">
                <div className="sun-inner-flare" />
              </div>
            </div>
          )}

          {phase === "sunset" && (
            <div className="hero-sunset-sun-scene">
              <div className="hero-sunset-glow" />
              <div className="hero-sunset-dusk-bar" />
              <div className="hero-sunset-sun-orb" />
            </div>
          )}
        </div>
      )}

      {/* 3. Night Time: Authentic Real-Time Moon Image at the TOP RIGHT CORNER */}
      {phase === "night" && (
        <RealTimeMoonImage moonDetails={moonDetails} size={66} />
      )}

      {/* 4. Time-Corresponding Drifting Cloud Layers */}
      <div className={`hero-clouds-layer clouds-${phase}`}>
        <svg
          className="hero-cloud-item hero-cloud-1"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <path
            d="M20,35 A15,15 0 0,1 35,20 A20,20 0 0,1 70,20 A15,15 0 0,1 85,35 Z"
            className="cloud-path"
          />
        </svg>

        <svg
          className="hero-cloud-item hero-cloud-2"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <path
            d="M15,35 A12,12 0 0,1 28,23 A16,16 0 0,1 58,23 A14,14 0 0,1 80,35 Z"
            className="cloud-path"
          />
        </svg>

        <svg
          className="hero-cloud-item hero-cloud-3"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <path
            d="M18,34 A10,10 0 0,1 30,24 A15,15 0 0,1 62,24 A12,12 0 0,1 78,34 Z"
            className="cloud-path"
          />
        </svg>
      </div>

      {/* 5. Night Sky Sparkling Twinkling Stars */}
      {phase === "night" && (
        <div className="hero-night-starfield">
          {stars.map((s, i) => (
            <span
              key={i}
              className="hero-star"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
                animationDuration: s.dur,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
