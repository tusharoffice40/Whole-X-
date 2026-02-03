import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Main Entry Point
 * Mounts the React application to the DOM.
 */
const mountApp = () => {
  const container = document.getElementById('root');

  if (!container) {
    console.error("Critical: Could not find root element.");
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("WholeX: Application mounted.");
  } catch (error) {
    console.error("WholeX: Mount failed.", error);
  }
};

// Execute mount
mountApp();
