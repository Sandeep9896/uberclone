import React, { createContext, useState } from 'react';

export const userdataContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
  });

  return (
    <userdataContext.Provider value={{ user, setUser }}>
      {children}
    </userdataContext.Provider>
  );
};