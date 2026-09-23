import React, { useMemo } from "react";

/**
 * WeatherVisualScene
 * Renders an authentic, atmospheric animated weather background inside the Current Conditions card:
 * - Cloudy / Overcast: Realistic 3D drifting clouds with depth layers, moonlight/sunlight illumination.
 * - Rainy / Stormy: Cascading angled raindrops, dark storm clouds, splash ripples, and occasional lightning.
 * - Sunny / Clear: Brilliant radiant sun with pulsing rays and warm lens flare (or starlit night with glowing moon).
 * - Snow: Swaying, tumbling snowflakes with depth.
 * - Mist / Fog: Rolling foggy mist banks.
 */
export default function WeatherVisualScene({ condition = "Clear", isNight = false, temperature = 25 }) {
  const condLower = (condition || "").toLowerCase();

  const isRain =
    condLower.includes("rain") ||
    condLower.includes("drizzle") ||
    condLower.includes("shower") ||
    condLower.includes("downpour") ||
    condLower.includes("monsoon");

  const isThunder =
    condLower.includes("thunder") ||
    condLower.includes("lightning") ||
    condLower.includes("storm");

  const isSnow =
    condLower.includes("snow") ||
    condLower.includes("blizzard") ||
    condLower.includes("sleet") ||
    condLower.includes("flurries");

  const isFog =
    condLower.includes("fog") ||
    condLower.includes("mist") ||
    condLower.includes("haze") ||
    condLower.includes("smoke");

  const isCloudy =
    !isRain &&
    !isSnow &&
    (condLower.includes("cloud") ||
      condLower.includes("overcast") ||
      isFog);

  const isSunny =
    !isRain &&
    !isSnow &&
    !isCloudy &&
    (condLower.includes("sun") ||
      condLower.includes("clear") ||
      condLower.includes("fair"));

  // Generate deterministic rain streak positions & speeds
  const raindrops = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => ({
      id: i,
      left: `${(i * 2.38 + (i % 7) * 1.5) % 98}%`,
      delay: `${((i * 0.17) % 1.6).toFixed(2)}s`,
      duration: `${(0.65 + ((i % 5) * 0.1)).toFixed(2)}s`,
      height: `${18 + (i % 4) * 8}px`,
      opacity: 0.35 + (i % 4) * 0.15,
    }));
  }, []);

  // Generate deterministic snowflake positions & speeds
  const snowflakes = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      left: `${(i * 3.1) % 96}%`,
      delay: `${((i * 0.28) % 3.5).toFixed(2)}s`,
      duration: `${(3.5 + (i % 4) * 0.9).toFixed(2)}s`,
      size: `${5 + (i % 4) * 3}px`,
      opacity: 0.4 + (i % 4) * 0.18,
    }));
  }, []);

  // Generate concentric rain ripples on ground puddles (from Dispur thunderstorm reference image)
  const ripples = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${(i * 7.5 + (i % 3) * 4) % 92}%`,
      bottom: `${6 + (i * 3.8) % 36}%`,
      delay: `${((i * 0.23) % 2.1).toFixed(2)}s`,
      duration: `${(1.4 + (i % 3) * 0.3).toFixed(2)}s`,
    }));
  }, []);

  // Generate twinkling stars for clear night sky
  const stars = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 3.5 + 4) % 94}%`,
      top: `${(i * 4.2 + 6) % 65}%`,
      size: `${1.5 + (i % 3) * 1}px`,
      delay: `${((i * 0.4) % 2.5).toFixed(1)}s`,
      duration: `${(2.0 + (i % 3) * 0.8).toFixed(1)}s`,
    }));
  }, []);

  return (
    <div className="weather-scene-container" aria-hidden="true">
      {/* 1. ATMOSPHERIC SKY BASE GRADIENT */}
      <div
        className={`weather-sky-bg ${
          isThunder
            ? "sky-thunder"
            : isRain
            ? "sky-rain"
            : isSnow
            ? "sky-snow"
            : isCloudy
            ? isNight
              ? "sky-cloudy-night"
              : "sky-cloudy-day"
            : isNight
            ? "sky-clear-night"
            : "sky-clear-day"
        }`}
      />

      {/* 2. NIGHT CELESTIAL: GLOWING REALISTIC MOON */}
      {isNight && (
        <div className="celestial-moon-container">
          <div className="celestial-moon">
            <div className="moon-crater crater-1" />
            <div className="moon-crater crater-2" />
            <div className="moon-crater crater-3" />
            <div className="moon-halo" />
          </div>
        </div>
      )}

      {/* 3. DAY CELESTIAL: RADIANT PULSING SUN */}
      {!isNight && isSunny && (
        <div className="celestial-sun-container">
          <div className="celestial-sun-glow" />
          <div className="celestial-sun-core" />
          <div className="celestial-sun-rays" />
        </div>
      )}

      {/* 4. CLEAR NIGHT TWINKLING STARS */}
      {isNight && (isSunny || condLower.includes("clear")) && (
        <div className="stars-layer">
          {stars.map((s) => (
            <div
              key={s.id}
              className="star-twinkle"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* 5. VOLUMETRIC REALISTIC MOVING CLOUDS (For Cloudy, Rain, or Overcast) */}
      {(isCloudy || isRain || isThunder || condLower.includes("partly")) && (
        <div className="clouds-motion-layer">
          {/* Cloud Tier 1: Deep slow-moving background layer */}
          <div className={`cloud-band cloud-tier-1 ${isNight ? "cloud-night" : "cloud-day"}`}>
            <div className="cloud-puff puff-1" />
            <div className="cloud-puff puff-2" />
            <div className="cloud-puff puff-3" />
            <div className="cloud-puff puff-4" />
          </div>

          {/* Cloud Tier 2: Volumetric puffy midground drifting clouds */}
          <div className={`cloud-band cloud-tier-2 ${isNight ? "cloud-night" : "cloud-day"}`}>
            <div className="cloud-puff puff-5" />
            <div className="cloud-puff puff-6" />
            <div className="cloud-puff puff-7" />
          </div>

          {/* Cloud Tier 3: Soft foreground drifting cloud bank */}
          <div className={`cloud-band cloud-tier-3 ${isNight ? "cloud-night" : "cloud-day"}`}>
            <div className="cloud-puff puff-8" />
            <div className="cloud-puff puff-9" />
          </div>
        </div>
      )}

      {/* 6. RAIN EFFECT: CASCADING ANGLED DROPLETS & SPLASHES */}
      {(isRain || isThunder) && (
        <>
          <div className="rain-layer">
            {raindrops.map((r) => (
              <div
                key={r.id}
                className="raindrop"
                style={{
                  left: r.left,
                  height: r.height,
                  animationDelay: r.delay,
                  animationDuration: r.duration,
                  opacity: r.opacity,
                }}
              />
            ))}
          </div>

          {/* 6.5 CONCENTRIC WATER RIPPLES ON PUDDLES (From Dispur Thunderstorm reference image) */}
          <div className="rain-ripples-layer">
            {ripples.map((rip) => (
              <div
                key={rip.id}
                className="water-ripple"
                style={{
                  left: rip.left,
                  bottom: rip.bottom,
                  animationDelay: rip.delay,
                  animationDuration: rip.duration,
                }}
              >
                <div className="ripple-ring ring-1" />
                <div className="ripple-ring ring-2" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* 7. THUNDERSTORM: OCCASIONAL DRAMATIC LIGHTNING FLASH */}
      {isThunder && <div className="lightning-flash-overlay" />}

      {/* 8. SNOW EFFECT: GENTLE DRIFTING SNOWFLAKES */}
      {isSnow && (
        <div className="snow-layer">
          {snowflakes.map((sn) => (
            <div
              key={sn.id}
              className="snowflake"
              style={{
                left: sn.left,
                width: sn.size,
                height: sn.size,
                animationDelay: sn.delay,
                animationDuration: sn.duration,
                opacity: sn.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* 9. MIST / FOG DRIFTING EFFECT */}
      {isFog && (
        <div className="fog-layer">
          <div className="fog-wave wave-1" />
          <div className="fog-wave wave-2" />
        </div>
      )}

      {/* 10. SOFT GLASS VIGNETTE OVERLAY FOR MAXIMUM TEXT LEGIBILITY */}
      <div className="weather-scene-vignette" />
    </div>
  );
}
