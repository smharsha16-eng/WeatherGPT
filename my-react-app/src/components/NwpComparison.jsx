import { getTranslation, translateRiskLevel, translateDay, translateNwpConfidence } from "../utils/translations";

export default function NwpComparison({ compareData, loading, language = "English" }) {
  const t = getTranslation(language);

  if (loading) {
    return (
      <div className="card" style={{ padding: "24px", textAlign: "center", color: "var(--muted)" }}>
        {t.computingNwpSpread || "⏳ Computing ensemble NWP model spread (NOAA GFS vs ECMWF IFS)..."}
      </div>
    );
  }

  if (!compareData || !compareData.daily_comparison) {
    return null;
  }

  const { overall_confidence, average_temperature_spread_c, gfs_model, ecmwf_model, daily_comparison } = compareData;

  return (
    <div className="card nwp-comparison-card" style={{ marginTop: "16px" }}>
      <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <span className="eyebrow">{t.forecast || "NUMERICAL WEATHER PREDICTION ENSEMBLE"}</span>
          <h3 style={{ margin: "4px 0" }}>{t.nwpComparisonTitle || "NOAA GFS vs ECMWF IFS Multi-Model Comparison"}</h3>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)" }}>
            {t.nwpComparisonDesc || "Ensemble spread analysis between Global Forecast System (USA) and Integrated Forecasting System (Europe)."}
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ background: "rgba(14, 165, 233, 0.15)", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(14, 165, 233, 0.3)" }}>
            <span style={{ fontSize: "11px", color: "#38bdf8", display: "block" }}>{t.ensembleConfidence || "ENSEMBLE CONFIDENCE"}</span>
            <strong style={{ fontSize: "15px", color: "#0ea5e9" }}>{translateNwpConfidence(overall_confidence, language)}</strong>
          </div>
          <div style={{ background: "rgba(34, 197, 94, 0.15)", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
            <span style={{ fontSize: "11px", color: "#4ade80", display: "block" }}>{t.avgTempSpread || "AVG TEMP SPREAD"}</span>
            <strong style={{ fontSize: "15px", color: "#22c55e" }}>±{average_temperature_spread_c}°C</strong>
          </div>
        </div>
      </div>

      <div style={{ overflowX: "auto", marginTop: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--muted)", textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
              <th style={{ padding: "14px 12px" }}>{t.forecastDay || "Forecast Day"}</th>
              <th style={{ padding: "14px 12px", color: "#38bdf8" }}>NOAA GFS ({gfs_model?.resolution || "0.25°"})</th>
              <th style={{ padding: "14px 12px", color: "#a855f7" }}>ECMWF IFS ({ecmwf_model?.resolution || "0.25°"})</th>
              <th style={{ padding: "14px 12px" }}>{t.tempSpread || "Temp Spread"}</th>
              <th style={{ padding: "14px 12px" }}>{t.gfsRainVsEcmwf || "GFS Rain vs ECMWF Rain"}</th>
              <th style={{ padding: "14px 12px" }}>{t.modelAgreement || "Model Agreement"}</th>
            </tr>
          </thead>
          <tbody>
            {daily_comparison.map((row, idx) => {
              const isHigh = row.model_agreement === "High";
              const isMod = row.model_agreement === "Moderate";
              const badgeBg = isHigh ? "rgba(34, 197, 94, 0.15)" : (isMod ? "rgba(234, 179, 8, 0.15)" : "rgba(239, 68, 68, 0.15)");
              const badgeColor = isHigh ? "#22c55e" : (isMod ? "#eab308" : "#ef4444");

              return (
                <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "14px 12px", fontWeight: "600", fontSize: "14px" }}>
                    <div>{translateDay(row.day, language)}</div>
                    <span style={{ color: "var(--muted)", fontWeight: "normal", fontSize: "12px" }}>({row.date})</span>
                  </td>
                  <td style={{ padding: "14px 12px", color: "#38bdf8", fontWeight: "600", fontSize: "15px" }}>
                    {row.gfs_max_temp}°C <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "normal" }}>({row.gfs_rain_chance}% {t.precipitation || "rain"})</span>
                  </td>
                  <td style={{ padding: "14px 12px", color: "#a855f7", fontWeight: "600", fontSize: "15px" }}>
                    {row.ecmwf_max_temp}°C <span style={{ color: "var(--muted)", fontSize: "12px", fontWeight: "normal" }}>({row.ecmwf_rain_chance}% {t.precipitation || "rain"})</span>
                  </td>
                  <td style={{ padding: "14px 12px", fontSize: "15px" }}>
                    <span style={{ fontWeight: "600" }}>±{row.temp_spread}°C</span>
                  </td>
                  <td style={{ padding: "14px 12px", color: "var(--muted)", fontSize: "14px" }}>
                    {row.gfs_rain_mm} mm vs {row.ecmwf_rain_mm} mm
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      background: badgeBg,
                      color: badgeColor,
                    }}>
                      {translateRiskLevel(row.model_agreement, language) || row.model_agreement}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "16px", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", fontSize: "12px", color: "var(--muted)" }}>
        💡 <b>{t.scientificContextTitle || "Scientific Context:"}</b> {t.scientificContextDesc || "NOAA GFS runs 4 times daily at 0.25° grid with semi-Lagrangian dynamics; ECMWF IFS uses higher vertical resolution (137 levels). High model agreement indicates reliable synoptic forcing, giving farmers and planners high operational confidence."}
      </div>
    </div>
  );
}
