import { useEffect, useRef, useState } from "react";

const REGIONAL_STATIONS = [
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946, region: "Karnataka", type: "Radar + AWS" },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777, region: "Maharashtra", type: "Doppler Radar" },
  { name: "New Delhi", lat: 28.6139, lon: 77.2090, region: "NCR", type: "HQ IMD / AWS" },
  { name: "Chennai", lat: 13.0827, lon: 80.2707, region: "Tamil Nadu", type: "Cyclone Radar" },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639, region: "West Bengal", type: "Doppler Radar" },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867, region: "Telangana", type: "AWS Hub" },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714, region: "Gujarat", type: "Agromet Station" },
  { name: "Nashik", lat: 19.9975, lon: 73.7898, region: "Maharashtra", type: "Kisan Agromet Center" },
  { name: "Kochi", lat: 9.9312, lon: 76.2673, region: "Kerala", type: "Marine Coastal Station" },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873, region: "Rajasthan", type: "Desert Agromet" },
];

export default function InteractiveMap({ currentCity, lat = 12.9716, lon = 77.5946, weather, onSelectCity }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState("osm"); // "osm", "satellite", "radar"

  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    // Destroy existing map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = window.L.map(mapContainerRef.current, {
      center: [lat, lon],
      zoom: 6,
      zoomControl: true,
      attributionControl: false,
    });
    mapInstanceRef.current = map;

    // Tile Layer based on activeLayer
    const tileUrl =
      activeLayer === "satellite"
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    window.L.tileLayer(tileUrl, { maxZoom: 18 }).addTo(map);

    const markersGroup = window.L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;

    // Custom pulse icon for current focused city
    const currentIcon = window.L.divIcon({
      className: "custom-map-marker current-marker",
      html: `<div style="
        background: #0ea5e9;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 15px rgba(14, 165, 233, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
      ">📍</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const currentMarker = window.L.marker([lat, lon], { icon: currentIcon }).addTo(markersGroup);
    currentMarker.bindPopup(`
      <div style="color: #0f172a; font-family: sans-serif; font-size: 13px; line-height: 1.4;">
        <strong style="font-size: 14px; color: #0284c7;">${currentCity || "Selected Station"}</strong><br/>
        <b>Temp:</b> ${weather?.temperature ?? "--"}°C (Feels ${weather?.feels_like ?? "--"}°C)<br/>
        <b>Condition:</b> ${weather?.condition || "Partly Cloudy"}<br/>
        <b>Wind:</b> ${weather?.wind_speed_kmh ?? "--"} km/h<br/>
        <b>Risk Level:</b> <span style="font-weight: bold; color: ${weather?.risk?.level === 'HIGH' ? '#dc2626' : (weather?.risk?.level === 'MODERATE' ? '#d97706' : '#16a34a')}">${weather?.risk?.level || "LOW"}</span>
      </div>
    `).openPopup();

    // Add surrounding regional meteorological radar stations
    REGIONAL_STATIONS.forEach((station) => {
      if (Math.abs(station.lat - lat) > 0.05 || Math.abs(station.lon - lon) > 0.05) {
        const stationIcon = window.L.divIcon({
          className: "custom-map-marker regional-marker",
          html: `<div style="
            background: #475569;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 6px rgba(0,0,0,0.4);
            cursor: pointer;
          "></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const stMarker = window.L.marker([station.lat, station.lon], { icon: stationIcon }).addTo(markersGroup);
        stMarker.bindTooltip(`<b>${station.name}</b> (${station.type})<br/>Click to switch`, {
          direction: "top",
        });

        stMarker.on("click", () => {
          if (onSelectCity) onSelectCity(station.name);
        });
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon, currentCity, weather, activeLayer]);

  const recenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lon], 7, { animate: true });
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "340px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
      {/* Map Layers Toolbar */}
      <div style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        display: "flex",
        gap: "6px",
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(6px)",
        padding: "5px 8px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.15)",
      }}>
        <button
          type="button"
          onClick={() => setActiveLayer("osm")}
          style={{
            background: activeLayer === "osm" ? "#0284c7" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "3px 8px",
            fontSize: "11px",
            cursor: "pointer",
          }}
        >
          Street
        </button>
        <button
          type="button"
          onClick={() => setActiveLayer("satellite")}
          style={{
            background: activeLayer === "satellite" ? "#0284c7" : "transparent",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "3px 8px",
            fontSize: "11px",
            cursor: "pointer",
          }}
        >
          Satellite
        </button>
        <button
          type="button"
          onClick={recenter}
          title="Recenter Map"
          style={{
            background: "#334155",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "3px 8px",
            fontSize: "11px",
            cursor: "pointer",
          }}
        >
          🎯 Recenter
        </button>
      </div>

      {/* Map Container Element */}
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

      {/* Bottom station status bar */}
      <div style={{
        position: "absolute",
        bottom: "8px",
        left: "10px",
        zIndex: 1000,
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(6px)",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "11px",
        color: "#94a3b8",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        📡 <span style={{ color: "#38bdf8", fontWeight: "600" }}>{currentCity} Station</span> • Lat {lat?.toFixed(2)}° N, Lon {lon?.toFixed(2)}° E • 10 IMD Regional Radar Nodes Active
      </div>
    </div>
  );
}
