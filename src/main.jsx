/**
 * Main entry point for the React application.
 * - Sets up React Router for navigation
 * - Wraps app in StrictMode for development warnings
 * - Renders the App component into the DOM
 */
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Render the React app with Router and StrictMode enabled
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
