import calDistance from "./caldistance.js";

// userType: 'user' or 'captain'
// userId: id of the user or captain
// onUpdate: callback function to handle location updates

export function startLocationWatcher({ userType, userId, onUpdate }) {
  let lastLocation = null; // closure variable, not React state

  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");
    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      if (lastLocation) {
        const distance = calDistance(
          lastLocation.lat,
          lastLocation.lng,
          latitude,
          longitude
        );

        if (distance >= 50) { // now only updates if moved 50m
          console.log("Moved 50m, updating location...");
          lastLocation = { lat: latitude, lng: longitude };

          const payload = {
            userType,
            userId,
            location: { lat: latitude, lng: longitude },
          };

          if (onUpdate) onUpdate(payload, lastLocation);
        }
      } else {
        // First location
        lastLocation = { lat: latitude, lng: longitude };
        const payload = {
          userType,
          userId,
          location: lastLocation,
        };
        if (onUpdate) onUpdate(payload, lastLocation);
      }
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
