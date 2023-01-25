import React from 'react';
import ReactDOM from 'react-dom/client';
import { AllProviders, App } from 'app';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', sans-serif;
  }
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AllProviders>
    <Global />
    <App />
  </AllProviders>
);
