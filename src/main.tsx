import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ⭐ Add this import
import { registerSW } from 'virtual:pwa-register';

// ⭐ Register service worker BEFORE React app mounts
registerSW();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </PersistGate>
);
