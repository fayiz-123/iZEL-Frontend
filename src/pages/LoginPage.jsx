import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login, Logout } from "../services/authService";
import toast from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await Login({ email, password });

    if (response.success) {
      const { role } = response.data;

      // Navigate based on role
      if (role === "admin") {
                toast.success("Login Successfull")

        navigate("/admin");
      } else {
        toast.success("Login Successfull")
        navigate("/");
      }
    } else {
      // Handle invalid credentials gracefully
      toast.dismiss()
      toast.error("Invalid credentials" || response?.message);
    }
  } catch (error) {
    // This only runs on unexpected/unhandled errors
    console.error("Unexpected login error:", error);
    toast.dismiss()
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} iZEL Studio
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
