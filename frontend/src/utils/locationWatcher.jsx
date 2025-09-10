import { setUserLocationWatchId,setCaptainLocationWatchId } from "../slices/locationSlice";


export function startLocationWatcher({ userType, userId, onUpdate }) {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");
    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      const payload = {
        userType,
        userId,
        location: { lat: latitude, lng: longitude },
      };

      if (onUpdate) onUpdate(payload, { lat: latitude, lng: longitude });
    },
    (err) => {
      console.error(`${userType} geolocation error:`, err);
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    }
  );
  return watchId; // so you can clear it later
}

export function stopLocationWatcher(watchId) {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
}
