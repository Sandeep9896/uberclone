import { createContext, useMemo, useState } from 'react';



export const LocationContext = createContext({
  UserCoords: null,
  setUserCoords: () => {},
  captainCoords: null,
  setCaptainCoords: () => {}
});

export function LocationProvider({ children }) {
  const [UserCoords, setUserCoords] = useState(null);
  const [captainCoords, setCaptainCoords] = useState(null);

  const value = useMemo(
    () => ({ UserCoords, setUserCoords, captainCoords, setCaptainCoords }),
    [UserCoords, captainCoords]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
