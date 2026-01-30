/**
 * Main App component that serves as the root layout.
 * - Renders the navigation bar at the top
 * - Contains the router for page navigation
 * - Sets up full-screen background styling
 */
import "./App.css";
import NavBar from "./Components/LayOut/NavBar";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      {/* Full screen container with background color */}
      <div className="w-full h-screen bg-background">
        {/* Navigation bar component */}
        <NavBar />
        {/* Router component for handling page navigation */}
        <AppRouter />
      </div>
    </>
  );
}

export default App;
