import React, { useState, useMemo, useRef } from "react";

/**
 * HourlyProgressionGraph
 * Interactive graphical curve area/spline chart matching reference image (media_1790328440326.jpg).
 *
 * Improvements:
 * - Perfectly fitted inside the card box with strict overflow protection (never bleeds into left panel)
 * - Clear, high-contrast Y-axis and X-axis meteorological markings with units
 * - Smooth horizontal slide bar with quick navigation buttons to slide through all 24 hours
 * - Clamped floating tooltip card that never clips beyond box boundaries
 * - Responsive metric toggles (Temperature, Precipitation %, Wind Speed)
 * - Synchronized bottom cards row starting with "Now" highlighted in primary blue
 */
export default function HourlyProgressionGraph({
  hourlyData = [],
  language = "English",
  theme = "default",
  city = "Bengaluru",
  t = {},
}) {
  const [activeMetric, setActiveMetric] = useState("temp"); // "temp" | "rain" | "wind"
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const bottomScrollRef = useRef(null);

  // Normalize 24-hour items
  const items = useMemo(() => {
    if (!hourlyData || hourlyData.length === 0) {
      const list = [];
      const now = new Date();
      for (let i = 0; i < 24; i++) {
        const h = (now.getHours() + i) % 24;
        const ampm = h < 12 ? "AM" : "PM";
        const h12 = h % 12 === 0 ? 12 : h % 12;
        list.push({
          time: i === 0 ? (t.now || "Now") : `${h12} ${ampm}`,
          temperature: 26 + Math.round(Math.sin((i / 24) * Math.PI * 2) * 5),
          rain_chance: Math.max(5, Math.min(95, Math.round(20 + Math.cos(i) * 35))),
          wind_speed_kmh: Math.max(5, Math.round(12 + Math.sin(i * 0.8) * 8)),
          condition: i % 4 === 0 ? "Thunderstorm" : i % 2 === 0 ? "Partly Cloudy" : "Clear",
          icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png",
          is_current: i === 0,
        });
      }
      return list;
    }
    return hourlyData.slice(0, 24).map((item, idx) => ({
      ...item,
      time: idx === 0 ? (t.now || "Now") : (item.time || `${idx}:00`),
      temperature: typeof item.temperature === "number" ? Math.round(item.temperature) : 25,
      rain_chance: typeof item.rain_chance === "number" ? Math.round(item.rain_chance) : 10,
      wind_speed_kmh: typeof item.wind_speed_kmh === "number" ? Math.round(item.wind_speed_kmh) : 12,
      condition: item.condition || "Partly Cloudy",
      icon: item.icon || "https://cdn.weatherapi.com/weather/64x64/day/116.png",
      is_current: idx === 0,
    }));
  }, [hourlyData, t.now]);

  // Metric metadata
  const metricConfig = useMemo(() => {
    switch (activeMetric) {
      case "rain":
        return {
          key: "rain_chance",
          unit: "%",
          label: t.hourlyRainMetric || "Precipitation %",
          niceMin: 0,
          niceMax: 100,
          ticks: [100, 75, 50, 25, 0],
          tickFormat: (v) => `${v}%`,
        };
      case "wind":
        return {
          key: "wind_speed_kmh",
          unit: "km/h",
          label: t.hourlyWindMetric || "Wind Speed",
          niceMin: 0,
          niceMax: 40,
          ticks: [40, 30, 20, 10, 0],
          tickFormat: (v) => `${v} km/h`,
        };
      case "temp":
      default: {
        const temps = items.map((it) => it.temperature);
        const minT = Math.min(...temps);
        const maxT = Math.max(...temps);
        let niceMax = Math.max(32, Math.ceil((maxT + 2) / 8) * 8);
        let niceMin = Math.min(0, Math.floor((minT - 2) / 8) * 8);
        if (niceMax - niceMin < 24) {
          niceMax = niceMin + 32;
        }
        const step = (niceMax - niceMin) / 4;
        const ticks = [
          niceMax,
          Math.round(niceMax - step),
          Math.round(niceMax - step * 2),
          Math.round(niceMax - step * 3),
          niceMin,
        ];
        return {
          key: "temperature",
          unit: "°C",
          label: t.hourlyTempMetric || "Temperature",
          niceMin,
          niceMax,
          ticks,
          tickFormat: (v) => `${v}°`,
        };
      }
    }
  }, [activeMetric, items, t]);

  // SVG Chart Geometry with safe margins ensuring markings never touch the box edge
  const svgWidth = 1000;
  const svgHeight = 220;
  const marginLeft = 68; // Safe padding inside SVG for Y-axis markings
  const marginRight = 32;
  const marginTop = 24;
  const marginBottom = 34;

  const plotWidth = svgWidth - marginLeft - marginRight; // 900
  const plotHeight = svgHeight - marginTop - marginBottom; // 162
  const plotBottom = marginTop + plotHeight; // 186

  // Generate points (x, y)
  const points = useMemo(() => {
    const count = items.length;
    if (count === 0) return [];
    const { key, niceMin, niceMax } = metricConfig;
    const range = niceMax - niceMin || 1;

    return items.map((it, idx) => {
      const val = it[key] !== undefined ? it[key] : niceMin;
      const clamped = Math.max(niceMin, Math.min(niceMax, val));
      const x = marginLeft + (idx / Math.max(1, count - 1)) * plotWidth;
      const y = plotBottom - ((clamped - niceMin) / range) * plotHeight;
      return { x, y, value: val, item: it, index: idx };
    });
  }, [items, metricConfig, marginLeft, plotWidth, plotBottom, plotHeight]);

  // Smooth spline curve algorithm (Catmull-Rom to Cubic Bezier)
  const { linePath, areaPath } = useMemo(() => {
    if (points.length < 2) return { linePath: "", areaPath: "" };

    let line = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      line += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }

    const area = `${line} L ${points[points.length - 1].x.toFixed(1)},${plotBottom} L ${points[0].x.toFixed(1)},${plotBottom} Z`;
    return { linePath: line, areaPath: area };
  }, [points, plotBottom]);

  // Handle pointer hover on SVG
  const handleSvgPointer = (e) => {
    const svgEl = e.currentTarget;
    const rect = svgEl.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relX = clientX - rect.left;
    const scaleX = svgWidth / rect.width;
    const svgX = relX * scaleX;

    let closestIdx = 0;
    let minDiff = Infinity;
    points.forEach((p, idx) => {
      const diff = Math.abs(p.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setHoveredIndex(closestIdx);
  };

  const currentHoveredPoint = points[hoveredIndex] || points[0];
  const hoveredItem = items[hoveredIndex] || items[0];

  // Dynamic time display for subtitle
  const nowTimeString = useMemo(() => {
    try {
      return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch {
      return "Current Hour";
    }
  }, []);

  // Slide controls for the bottom row
  const slideLeft = () => {
    if (bottomScrollRef.current) {
      bottomScrollRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (bottomScrollRef.current) {
      bottomScrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  return (
    <div
      className="hourly-progression-graph-card card"
      style={{
        marginTop: "24px",
        padding: "20px 24px",
        background: "var(--card)",
        borderRadius: "16px",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        position: "relative",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden", // STRICT containment so nothing ever bleeds into left panel
      }}
    >
      {/* Top Header Row with Title and Metric Switchers */}
      <div
        className="hourly-graph-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "16px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ minWidth: "220px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.2rem", color: "#3b82f6" }}>📈</span>
            <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700", color: "var(--text)" }}>
              {t.hourlyForecastTitle || "Hourly Forecast (Next 24 Hours)"}
            </h3>
          </div>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "0.82rem",
              color: "var(--muted)",
            }}
          >
            {t.hourlyForecastSubtitle || "24-hour upcoming forecast starting from current hour"} ({nowTimeString})
          </p>
        </div>

        {/* 3 Metric Switchers Pills */}
        <div
          className="hourly-metric-toggles"
          style={{
            display: "flex",
            gap: "6px",
            background: theme === "light" ? "#f1f5f9" : "rgba(255, 255, 255, 0.05)",
            padding: "4px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            className={`hourly-metric-pill ${activeMetric === "temp" ? "active" : ""}`}
            onClick={() => setActiveMetric("temp")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "8px",
              border: activeMetric === "temp" ? "1.5px solid #1d4ed8" : "1px solid transparent",
              background: activeMetric === "temp" ? "#2563eb" : "transparent",
              color: activeMetric === "temp" ? "#ffffff" : (theme === "light" ? "#475569" : "#cbd5e1"),
              fontWeight: "700",
              fontSize: "0.82rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeMetric === "temp" ? "0 2px 8px rgba(37, 99, 235, 0.4)" : "none",
            }}
          >
            <span>🌡️</span>
            <span style={{ color: activeMetric === "temp" ? "#ffffff" : "inherit", fontWeight: "700" }}>
              {t.hourlyTempMetric || "Temperature"}
            </span>
          </button>

          <button
            type="button"
            className={`hourly-metric-pill ${activeMetric === "rain" ? "active" : ""}`}
            onClick={() => setActiveMetric("rain")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "8px",
              border: activeMetric === "rain" ? "1.5px solid #1d4ed8" : "1px solid transparent",
              background: activeMetric === "rain" ? "#2563eb" : "transparent",
              color: activeMetric === "rain" ? "#ffffff" : (theme === "light" ? "#475569" : "#cbd5e1"),
              fontWeight: "700",
              fontSize: "0.82rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeMetric === "rain" ? "0 2px 8px rgba(37, 99, 235, 0.4)" : "none",
            }}
          >
            <span>🌧️</span>
            <span style={{ color: activeMetric === "rain" ? "#ffffff" : "inherit", fontWeight: "700" }}>
              {t.hourlyRainMetric || "Precipitation %"}
            </span>
          </button>

          <button
            type="button"
            className={`hourly-metric-pill ${activeMetric === "wind" ? "active" : ""}`}
            onClick={() => setActiveMetric("wind")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "8px",
              border: activeMetric === "wind" ? "1.5px solid #1d4ed8" : "1px solid transparent",
              background: activeMetric === "wind" ? "#2563eb" : "transparent",
              color: activeMetric === "wind" ? "#ffffff" : (theme === "light" ? "#475569" : "#cbd5e1"),
              fontWeight: "700",
              fontSize: "0.82rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeMetric === "wind" ? "0 2px 8px rgba(37, 99, 235, 0.4)" : "none",
            }}
          >
            <span>💨</span>
            <span style={{ color: activeMetric === "wind" ? "#ffffff" : "inherit", fontWeight: "700" }}>
              {t.hourlyWindMetric || "Wind Speed"}
            </span>
          </button>
        </div>
      </div>

      {/* SVG Chart Inner Box with safe overflow protection */}
      <div
        className="hourly-chart-inner-box"
        style={{
          width: "100%",
          position: "relative",
          userSelect: "none",
          overflow: "hidden", // Guarantees chart never bleeds outside card
          background: theme === "light" ? "rgba(241, 245, 249, 0.4)" : "rgba(15, 23, 42, 0.25)",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          padding: "10px 0",
        }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "220px",
            display: "block",
            overflow: "hidden", // Never spill outside SVG bounds
          }}
          onMouseMove={handleSvgPointer}
          onTouchMove={handleSvgPointer}
        >
          <defs>
            {/* Soft area gradient matching theme background */}
            <linearGradient id="hourlyAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme === "light" ? "#3b82f6" : "#2563eb"}
                stopOpacity={theme === "light" ? "0.32" : "0.45"}
              />
              <stop
                offset="75%"
                stopColor={theme === "light" ? "#60a5fa" : "#1d4ed8"}
                stopOpacity={theme === "light" ? "0.12" : "0.15"}
              />
              <stop
                offset="100%"
                stopColor={theme === "light" ? "#ffffff" : "#071322"}
                stopOpacity="0.01"
              />
            </linearGradient>

            {/* Glowing filter for active cursor dot */}
            <filter id="glowCircle" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Horizontal Gridlines & Y-Axis Markings */}
          {metricConfig.ticks.map((tickVal, tIdx) => {
            const range = metricConfig.niceMax - metricConfig.niceMin || 1;
            const y = plotBottom - ((tickVal - metricConfig.niceMin) / range) * plotHeight;
            return (
              <g key={tIdx} className="grid-line-group">
                <line
                  x1={marginLeft}
                  y1={y}
                  x2={marginLeft + plotWidth}
                  y2={y}
                  stroke={theme === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)"}
                  strokeDasharray={tIdx === metricConfig.ticks.length - 1 ? "none" : "3 3"}
                  strokeWidth="1"
                />
                {/* Left Y-axis marking safely placed inside marginLeft */}
                <text
                  x={marginLeft - 12}
                  y={y + 4}
                  textAnchor="end"
                  fill="var(--muted, #94a3b8)"
                  fontWeight="600"
                  fontSize="11"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {metricConfig.tickFormat(tickVal)}
                </text>
              </g>
            );
          })}

          {/* Spline Area Fill */}
          {areaPath && (
            <path
              d={areaPath}
              fill="url(#hourlyAreaGrad)"
              style={{ transition: "d 0.3s ease-out" }}
            />
          )}

          {/* Spline Curve Stroke Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "d 0.3s ease-out" }}
            />
          )}

          {/* X-Axis Bottom Markings (Clean interval timestamps) */}
          {points.map((p, idx) => {
            const isHovered = idx === hoveredIndex;
            // Show label on alternating hours to avoid cramming, always show first & last
            const showLabel = idx === 0 || idx % 2 === 0 || idx === points.length - 1;
            if (!showLabel && !isHovered) return null;

            return (
              <text
                key={idx}
                x={p.x}
                y={svgHeight - 10}
                textAnchor="middle"
                fill={isHovered ? "#3b82f6" : "var(--muted, #94a3b8)"}
                fontWeight={isHovered ? "700" : "500"}
                fontSize={isHovered ? "11" : "10"}
                fontFamily="system-ui, -apple-system, sans-serif"
                style={{ cursor: "pointer" }}
                onClick={() => setHoveredIndex(idx)}
              >
                {p.item.time}
              </text>
            );
          })}

          {/* Vertical Guide Line on Hover */}
          {currentHoveredPoint && (
            <g className="cursor-guide-group">
              <line
                x1={currentHoveredPoint.x}
                y1={marginTop}
                x2={currentHoveredPoint.x}
                y2={plotBottom}
                stroke={theme === "light" ? "#3b82f6" : "rgba(147, 197, 253, 0.85)"}
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              {/* Glowing Dot on the Curve */}
              <circle
                cx={currentHoveredPoint.x}
                cy={currentHoveredPoint.y}
                r="7"
                fill="#3b82f6"
                filter="url(#glowCircle)"
              />
              <circle
                cx={currentHoveredPoint.x}
                cy={currentHoveredPoint.y}
                r="3.5"
                fill="#ffffff"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip Card (Clamped inside box boundaries) */}
        {currentHoveredPoint && (
          <div
            className="hourly-floating-tooltip"
            style={{
              position: "absolute",
              top: Math.max(12, Math.min(130, (currentHoveredPoint.y / svgHeight) * 220 - 70)),
              left: `${Math.max(8, Math.min(88, (currentHoveredPoint.x / svgWidth) * 100))}%`,
              transform:
                hoveredIndex > 18
                  ? "translate(-95%, 0)"
                  : hoveredIndex < 4
                  ? "translate(5%, 0)"
                  : "translate(-50%, 0)",
              background: theme === "light" ? "#ffffff" : "#0f172a",
              color: theme === "light" ? "#0f172a" : "#ffffff",
              padding: "8px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
              pointerEvents: "none",
              zIndex: 10,
              minWidth: "135px",
              whiteSpace: "nowrap",
              transition: "left 0.1s ease-out, top 0.1s ease-out",
            }}
          >
            <div
              style={{
                fontSize: "0.76rem",
                fontWeight: "700",
                color: "var(--muted)",
                marginBottom: "2px",
              }}
            >
              {hoveredItem.time}
            </div>
            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: "800",
                color: "#3b82f6",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>{metricConfig.label}:</span>
              <span>
                {hoveredItem[metricConfig.key]}
                {metricConfig.unit}
              </span>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "2px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>{hoveredItem.condition}</span>
            </div>
          </div>
        )}
      </div>

      {/* Slide bar row controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          marginBottom: "8px",
        }}
      >
        <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: "600" }}>
          🕒 24-Hour Timeline (Slide or click cards to view progression):
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            type="button"
            onClick={slideLeft}
            title="Slide left"
            style={{
              padding: "3px 10px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--card-light)",
              color: "var(--text)",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            ◀
          </button>
          <button
            type="button"
            onClick={slideRight}
            title="Slide right"
            style={{
              padding: "3px 10px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--card-light)",
              color: "var(--text)",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Synchronized Horizontal Card Timeline Row with Slide Bar */}
      <div
        ref={bottomScrollRef}
        className="hourly-bottom-cards-row"
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "10px",
          scrollBehavior: "smooth",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {items.map((item, idx) => {
          const isSelected = idx === hoveredIndex;
          const isNow = idx === 0;

          return (
            <div
              key={idx}
              className={`hourly-timeline-card ${isSelected ? "selected-card" : ""} ${isNow ? "now-card" : ""}`}
              onClick={() => setHoveredIndex(idx)}
              onMouseEnter={() => setHoveredIndex(idx)}
              style={{
                minWidth: "76px",
                flex: "0 0 76px",
                padding: "12px 6px",
                borderRadius: "14px",
                textAlign: "center",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                background: isNow
                  ? "linear-gradient(145deg, #2563eb 0%, #1d4ed8 100%)"
                  : isSelected
                  ? theme === "light"
                    ? "#e2e8f0"
                    : "rgba(37, 99, 235, 0.22)"
                  : theme === "light"
                  ? "#f8fafc"
                  : "var(--card-light)",
                border: isNow
                  ? "1.5px solid #60a5fa"
                  : isSelected
                  ? "1.5px solid #3b82f6"
                  : "1px solid var(--border)",
                color: isNow ? "#ffffff" : "var(--text)",
                boxShadow: isNow
                  ? "0 4px 14px rgba(37, 99, 235, 0.35)"
                  : isSelected
                  ? "0 2px 10px rgba(59, 130, 246, 0.2)"
                  : "none",
                transform: isSelected ? "translateY(-3px)" : "none",
              }}
            >
              {/* Time Label */}
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: isNow || isSelected ? "700" : "600",
                  color: isNow ? "#ffffff" : isSelected ? "#3b82f6" : "var(--text)",
                  marginBottom: "6px",
                }}
              >
                {item.time}
              </div>

              {/* Weather Icon */}
              <div style={{ margin: "4px 0" }}>
                <img
                  src={item.icon}
                  alt={item.condition}
                  style={{
                    width: "28px",
                    height: "28px",
                    objectFit: "contain",
                    filter: isNow ? "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" : "none",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://cdn.weatherapi.com/weather/64x64/day/116.png";
                  }}
                />
              </div>

              {/* Primary Value: Temperature */}
              <div
                style={{
                  fontSize: "1.05rem",
                  fontWeight: "800",
                  color: isNow ? "#ffffff" : "var(--text)",
                  margin: "4px 0 2px 0",
                }}
              >
                {item.temperature !== undefined ? `${item.temperature}°` : "25°"}
              </div>

              {/* Secondary Sub-stat: Rain % */}
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "600",
                  color: isNow ? "rgba(255, 255, 255, 0.9)" : "#38bdf8",
                }}
              >
                {item.rain_chance !== undefined ? `${item.rain_chance}%` : "15%"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
