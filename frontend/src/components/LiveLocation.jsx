import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl"; // ✅ Import once, not inside JSX

export default function LiveLocation({ coords }) {
  // Fallback coords (Delhi, India)
  const defaultCoords = { lat: 28.6139, lng: 77.209 };

  const [currentCoords, setCurrentCoords] = useState(
    coords || defaultCoords
  );

  const [viewState, setViewState] = useState({
    longitude: currentCoords.lng,
    latitude: currentCoords.lat,
    zoom: 12,
  });

  useEffect(() => {
    if (coords?.lat && coords?.lng) {
      setCurrentCoords(coords);
      setViewState((prev) => ({
        ...prev,
        latitude: coords.lat,
        longitude: coords.lng,
      }));
    }
  }, [coords]);

  return (
    <Map
      mapLib={mapboxgl} // ✅ Pass imported instance here
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      viewState={viewState}
      onMove={(e) => setViewState(e.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {currentCoords?.lat && currentCoords?.lng && (
        <Marker
          longitude={currentCoords.lng}
          latitude={currentCoords.lat}
          color="red"
        />
      )}
    </Map>
  );
}
