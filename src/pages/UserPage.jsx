import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserPage({ setLoggedInUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userInfo = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        };

        // Store in localStorage + update parent state immediately
        localStorage.setItem("loggedInUser", JSON.stringify(userInfo));
        setLoggedInUser(userInfo);  // 👈 update icon immediately

        setErrorMessage("");
        setSuccessMessage("Login successful!");
        setEmail("");
        setPassword("");

        // Navigate after brief delay to show success message
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
        setSuccessMessage("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
      setSuccessMessage("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-purple-50 relative">
      <div className="w-full max-w-sm p-8 border border-gray-300 rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-serif font-medium text-center mb-8">Login</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-2">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-green-600 font-semibold text-center mb-2">{successMessage}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none"
            placeholder="enter your email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none"
            placeholder="enter password..."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 mt-2 text-sm tracking-wide font-semibold hover:bg-pink-700 transition"
          >
            SIGN IN
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/register"
            className="block text-pink-600 font-semibold text-sm tracking-widest mb-2 hover:underline"
          >
            REGISTER
          </Link>

          <button
            onClick={() => setShowResetModal(true)}
            className="text-sm  text-pink-600 hover:underline"
          >
            Forgot your password?
          </button> 
          
        </div>

        
      </div>
    </section>
  );
}
