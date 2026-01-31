import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LogIn() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const { register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm()

  const handleLoginSubmit = async (data) => {
    try {
      const response = await fetch("https://note-sigma-black.vercel.app/api/v1/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json()
      if (!response.ok) {
        throw result
      }
      localStorage.setItem("token", result.token);
      navigate("/");
      toast.success('Welcome', { autoClose: 1000 })

    } catch (error) {
      handleApiErrors(error)
    }
  }

  const handleApiErrors = (error) => {
    if (error?.msg === "email not exist") {
      setError("email", {
        type: "server",
        message: "Email does not exist"
      });
    } else if (error?.msg === "invalid password") {
      setError("password", {
        type: "server",
        message: "Incorrect password"
      });
    } else {
      setError("root", {
        type: "server",
        message: "Something went wrong, try again"
      });
    }
  };

  // ------------------styles----------------
  const errorStyle = "text-red-500";
  //------------------styles-----------------


  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <form
          className="flex flex-col gap-6 bg-white p-15 rounded-lg shadow-lg w-96"
          onSubmit={handleSubmit(handleLoginSubmit)}
        >
          <h2 className="text-2xl font-bold text-text-color mb-4 text-center">
            Log In to Your Account
          </h2>
          <div className="flex flex-col gap-3">
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
            />
            <p className={errorStyle}>{errors.email && errors.email.message}</p>
            {/* Password input field with show/hide toggle */}
            <span className="relative flex items-center justify-between w-70">
              {showPassword === false ? (
                <>
                  {/* Hidden password input */}
                  <input
                    {...register("password", { required: "Password is required" })}
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
            </span>
            <p className={errorStyle}>{errors.password && errors.password.message}</p>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-text text-white py-2 rounded-md hover:bg-main-color transition duration-300 cursor-pointer hover:duration-300 hover:bg-hover-color"
            onClick={handleSubmit(handleLoginSubmit)}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </>
  );
}
