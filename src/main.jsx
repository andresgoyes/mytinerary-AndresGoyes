import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Importa Provider
import store from './store/store';       // Importa tu store de Redux
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>           {/* Envolviendo App en Provider */}
      <App />
    </Provider>
  </StrictMode>
);