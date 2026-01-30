/**
 * AppRouter - Handles all application routes and navigation.
 * - Defines the path mappings for different pages
 * - Routes available: Home (/), LogIn (/LogIn)
 */

//==================Routes==================
import { Routes, Route } from "react-router-dom";

//===================Components================
import Home from "../Pages/Home";
import LogIn from "../Pages/LogIn/LogIn";

export default function AppRouter() {
  return (
    <>
      {/* Route configurations */}
      <Routes>
        {/* Home page route - displays main content */}
        <Route path="/" element={<Home />} />
        {/* Login page route - handles user authentication */}
        <Route path="/LogIn" element={<LogIn />} />
      </Routes>
    </>
  );
}
