import React, { createContext } from 'react'
import { useEffect, useState, useContext } from 'react';

export const captaindataContext =createContext();



export const CaptainProvider = ({children}) => {

    const [captain, setCaptain] = useState(null);
    const{isLoading, setIsLoading} = useState(false);
    const {error, setError} = useState(null);
    const updateCaptain=(captainData) => {
        setCaptain(captainData);
    }
    const value={
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

  return (
    <captaindataContext.Provider value={value}>
      {children}    
    </captaindataContext.Provider>
  )
}
