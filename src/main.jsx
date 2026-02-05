
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import './echo.jsx'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import App from './App.jsx'

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST || '127.0.0.1',
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
  wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
