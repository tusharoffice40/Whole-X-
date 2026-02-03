
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * Main Entry Point
 * Intermediate standard: Check for root existence and handle errors.
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Rendering Error:", error);
  }
} else {
  console.error("Critical Error: Could not find the #root element in index.html");
}
