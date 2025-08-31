import React, { createContext, useContext, useEffect, useRef, useCallback, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if the user is logged in
    if (!token) {
      console.warn('User not logged in - Socket connection not initialized');
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return; // Do not initialize the socket if the user is not logged in
    }

    const url = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    socketRef.current = io(url, {
      transports: ['websocket', 'polling'],
      auth: { token },
      withCredentials: true,
      reconnectionAttempts: 5,
    });
    setSocket(socketRef.current);
    const s = socketRef.current;
    s.on('connect', () => console.log('Socket connected', s.id));
    s.on('connect_error', (err) => console.warn('Socket connect_error', err));
    s.on('disconnect', (reason) => console.log('Socket disconnected', reason));

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isLoggedIn]); // Re-run when login state changes

  // Generic emit
  const sendMessage = useCallback((eventName, payload = {}) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(eventName, payload);
      console.log(`Event emitted: ${eventName}`, payload);
    } else {
      console.warn('Socket not connected - cannot emit', eventName);
      if (socketRef.current) {
        socketRef.current.once('connect', () => {
          socketRef.current.emit(eventName, payload);
          console.log(`Event emitted after reconnect: ${eventName}`, payload);
        });
      }
    }
  }, []);

  // Emit to a specific recipient
  const sendTo = useCallback((eventName, recipientId, payload = {}) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(eventName, { ...payload, to: recipientId });
    } else {
      console.warn('Socket not connected - cannot emit to', eventName);
    }
  }, []);

  // Subscribe to an event
  const receiveMessage = useCallback((eventName, handler) => {
    const s = socketRef.current;
    if (!s) {
      console.warn('Socket not initialized - cannot subscribe to', eventName);
      return () => {};
    }
    s.on(eventName, handler);
    return () => {
      s.off(eventName, handler);
    };
  }, []);

  const value = {
    socket,
    sendMessage,
    sendTo,
    receiveMessage,
    setIsLoggedIn, // Expose this to update login state
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within SocketProvider');
  return ctx;
};
