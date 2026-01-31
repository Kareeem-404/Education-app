/**
 * AppRouter - Handles all application routes and navigation.
 * - Defines the path mappings for different pages
 * - Routes available: Home (/), LogIn (/LogIn)
 */

//==================Routes==================
import { Routes, Route } from "react-router-dom";

//===================Components================
import Home from "../Pages/Home";
import LogIn from "../Pages/LogIn";
import FrontEndSection from "../Pages/FrontEndSection/FrontEnd";
import FlowBackEnd from "../Pages/BackEndPage/BackEndPage";
import FlowFullStack from "../Pages/FullStackPage/FullStackPage";

export default function AppRouter() {
  return (
    <>
      {/* Route configurations */}
      <Routes>
        {/* Home page route - displays main content */}
        <Route path="/" element={<Home />} />
        {/* Login page route - handles user authentication */}
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/FrontEndStack" element={<FrontEndSection />} />
        <Route path="/BackEndStack" element={<FlowBackEnd />} />
        <Route path="/FullStack" element={<FlowFullStack />} />
      </Routes>
    </>
  );
}
