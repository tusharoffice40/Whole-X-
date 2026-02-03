import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * Main Entry Point
 * Ensures the DOM is ready and handles root mounting with error fallbacks.
 */
const init = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error("CRITICAL ERROR: Root element #root not found in the DOM.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("WholeX application successfully initialized.");
  } catch (err) {
    console.error("CRITICAL ERROR: Failed to render the React application.", err);
    
    // Provide visual feedback for debugging if the app crashes before render
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif; color: #ef4444;">
        <h1 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Initialization Failed</h1>
        <p style="color: #6b7280; margin-bottom: 1.5rem;">The application encountered a critical error during startup.</p>
        <div style="background: #fee2e2; padding: 15px; border-radius: 8px; text-align: left; overflow: auto; max-width: 600px; margin: 0 auto; border: 1px solid #fecaca;">
          <code style="font-size: 0.8rem; white-space: pre-wrap;">${err instanceof Error ? err.stack || err.message : String(err)}</code>
        </div>
        <button onclick="window.location.reload()" style="margin-top: 2rem; background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
          Retry Loading
        </button>
      </div>
    `;
  }
};

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
