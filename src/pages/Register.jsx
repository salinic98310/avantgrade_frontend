import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        setSuccessMessage(data.message || "Registration successful!");
        setFormData({ name: "", email: "", password: "" });
        // Optionally delay before navigating
        // setTimeout(() => navigate("/login"), 1500);
      } else {
        setSuccessMessage("");
        setErrorMessage(data.message || "Registration failed. Please try again.");
        setFormData({ name: "", email: "", password: "" });
        if (nameInputRef.current) nameInputRef.current.focus();
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setSuccessMessage("");
      setErrorMessage("Something went wrong. Please try again later.");
      setFormData({ name: "", email: "", password: "" });
      if (nameInputRef.current) nameInputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center text-sm text-gray-500">
          <Link to="/" className="text-pink-500 hover:underline">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/register" className="text-pink-500 hover:underline">Create Account</Link>
        </div>

        <h2 className="text-2xl font-serif text-center font-medium">Register</h2>

        {errorMessage && (
          <div className="text-red-600 text-sm text-center font-medium">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-600 font-bold text-center text-sm">{successMessage}</div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            ref={nameInputRef}
            className="w-full border-b border-gray-300 py-2 text-sm outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 text-sm outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 text-sm font-semibold tracking-widest hover:bg-pink-700 transition"
          >
            CREATE
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-4">
          Already Registered?{" "}
          <Link to="/login" className="text-pink-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
        
      </div>
    </div>
  );
}
