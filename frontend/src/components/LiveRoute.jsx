import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/mapbox";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LiveRoute({ role, nextStep }) {
  const captainCoords = useSelector((state) => state.location.captainLocation);
  const userCoords = useSelector((state) => state.location.userLocation);
  const liveRoute = useSelector((state) => state.location.liveRoute);
  console.log("LiveRoute component - liveRoute from store:", liveRoute?.ride);

  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 77.23,
    latitude: 28.65,
    zoom: 10,
  });

  // console.log(captainCoords);
  // Update when liveRoute changes
  useEffect(() => {
    if (liveRoute?.ride) {
      // Ensure proper GeoJSON
      setRoute({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: liveRoute.ride.route?.coordinates || [],
        },
      });

      setDistance(liveRoute.ride.distanceKm);

      // Initial center on captain
      if (liveRoute.ride.captainCoords) {
        setViewState((prev) => ({
          ...prev,
          longitude: liveRoute.ride.captainCoords.lng,
          latitude: liveRoute.ride.captainCoords.lat,
        }));
      }
    }
  }, [liveRoute]);

  // Keep recentering when captain moves
  useEffect(() => {
    if (captainCoords?.lng && captainCoords?.lat) {
      setViewState((prev) => ({
        ...prev,
        longitude: captainCoords.lng,
        latitude: captainCoords.lat,
      }));
    }
  }, [captainCoords]);

  return (
    <div className="w-full h-full">
      <div className="h-full mt-2 mx-2 rounded-2xl">
        {liveRoute?.ride && (
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            style={{ width: "100%", height: "100%", borderRadius: "20px" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            {/* Captain Marker */}
            {captainCoords?.lng && captainCoords?.lat && (
              <Marker
                longitude={captainCoords.lng}
                latitude={captainCoords.lat}
                color="blue"
              />
            )}

            {/* User Marker */}
            {liveRoute?.ride?.destCoords && (
              <Marker
                longitude={liveRoute.ride.destCoords.lng}
                latitude={liveRoute.ride.destCoords.lat}
                color="red"
              />
            )}

            {/* Route line */}
            {route && (
              <Source id="routeSource" type="geojson" data={route}>
                <Layer
                  id="routeLayer"
                  type="line"
                  source="routeSource"
                  layout={{ "line-cap": "round", "line-join": "round" }}
                  paint={{ "line-color": "#1DA1F2", "line-width": 5 }}
                />
              </Source>
            )}
          </Map>
        )}
      </div>

      {role === "captain" && (
        <div className="h-1/5 p-5 bg-yellow-400 flex relative justify-between items-center">
          <h4 className="text-xl font-semibold">{distance} away</h4>
          <button
            onClick={nextStep}
            className="bg-green-600 text-white font-semibold rounded-lg px-10 p-3 hover:bg-green-700"
          >
            Reached Location
          </button>
        </div>
      )}
    </div>
  );
}
