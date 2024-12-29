import React from "react";
import ReactDOM from "react-dom/client"; // React 18 API
import "./index.css"; // Global styles
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Ensure compatibility with the given index.html structure
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create React root
  const root = ReactDOM.createRoot(rootElement);

  // Render the app
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Optional: Performance reporting
  reportWebVitals();
} else {
  console.error("Root element not found. Make sure your index.html has a <div id='root'></div>.");
}
