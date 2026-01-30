/**
 * LogIn - User authentication page.
 * Features:
 * - Email input with validation
 * - Password input with show/hide toggle
 * - Form submission and redirect to home page
 * - Uses Material UI icons for password visibility toggle
 */

//=====================Router Hook=====================
import { useNavigate } from "react-router-dom";

//=====================Hooks====================
import { useState } from "react";
// import useShop from "../../hooks/useShop";

//=====================Material UI=====================
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//=====================Motion====================
// import { motion } from "framer-motion";

export default function LogIn() {
  //=====================Router Hooks =====================
  const navigate = useNavigate(); // Hook to navigate programmatically

  //=====================States====================
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // console.log(response);

  //=====================Handlers==================
  /**
   * handleLoginSubmit - Handles form submission.
   * Prevents default behavior and redirects to home page.
   * @param {Event} e - Form submit event
   */
  function handleLoginSubmit(e) {
    // Form submit handler
    e.preventDefault();
    // After successful login, navigate to the home page
    navigate("/"); // Redirect to home page after login
  }
  return (
    <>
      {/* Full-screen login container */}
      <div className="flex justify-center items-center w-full h-screen">
        {/* Login form */}
        <form
          className="flex flex-col gap-6 bg-white p-15 rounded-lg shadow-lg w-96"
          onSubmit={handleLoginSubmit}
        >
          {/* Form heading */}
          <h2 className="text-2xl font-bold text-text-color mb-4 text-center">
            Log In to Your Account
          </h2>
          {/* Email input field with validation styling */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="XXXXXXXXX@gmail.com"
            className={
              email !== `${email}@gmail.com`
                ? "border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
                : "border border-red-600 p-2 bg-red-50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            }
          />
          {/* Password input field with show/hide toggle */}
          <label className="relative flex items-center justify-between w-70">
            {showPassword === false ? (
              <>
                {/* Hidden password input */}
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 p-2 rounded-md w-67 focus:outline-none focus:ring-2 focus:ring-main"
                />
                {/* Eye icon to show password */}
                <VisibilityOffIcon
                  className="absolute left-59 bottom-2.5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </>
            ) : (
              <>
                {/* Visible password input */}
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Password"
                  className="border border-gray-300 p-2 rounded-md w-67 focus:outline-none focus:ring-2 focus:ring-main"
                />
                {
                  {
                    /* Eye-slash icon to hide password */
                  }
                }
                <VisibilityIcon
                  className="absolute left-59 bottom-2.5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </>
            )}
          </label>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-text text-white py-2 rounded-md hover:bg-main-color transition duration-300 cursor-pointer hover:duration-300 hover:bg-hover-color"
            onClick={() => handleLoginSubmit}
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
}
