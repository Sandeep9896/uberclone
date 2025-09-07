import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";

export default function LiveLocation({ coords }) {
  // Fallback coords (Delhi, India) so Map never starts with NaN
  const defaultCoords = { lat: 28.6139, lng: 77.209 };

  // State to store current coords
  const [currentCoords, setCurrentCoords] = useState(
    coords || defaultCoords
  );

  // State for map view
  const [viewState, setViewState] = useState({
    longitude: currentCoords.lng,
    latitude: currentCoords.lat,
    zoom: 12,
  });

  // Update coords + view when props change
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
    <div className="w-screen h-screen">
      <Map
        mapLib={import("mapbox-gl")}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        viewState={viewState}
        onMove={(e) => setViewState(e.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {/* Only render marker if coords are valid */}
        {currentCoords && currentCoords.lat && currentCoords.lng && (
          <Marker
            longitude={currentCoords.lng}
            latitude={currentCoords.lat}
            color="red"
          />
        )}
      </Map>
    </div>
  );
}
