import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '../context/Usercontext';
import { CaptainProvider } from '../context/CaptainContext.jsx'
import { SocketProvider } from '../context/SocketContext.jsx'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; // your ngrok backend
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

// Optional: also append as query param (helps for sockets/polling)
axios.interceptors.request.use((config) => {
  try {
    const isNgrok = new URL(axios.defaults.baseURL).host.endsWith('ngrok-free.app');
    if (isNgrok) {
      config.params = { ...(config.params || {}), 'ngrok-skip-browser-warning': 'true' };
    }
  } catch {}
  return config;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <CaptainProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </CaptainProvider>
    </SocketProvider>
  </StrictMode>,
)
