import React from 'react';
import ReactDOM from 'react-dom/client';
import { AllProviders, App } from 'app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AllProviders>
    <App />
  </AllProviders>
);
