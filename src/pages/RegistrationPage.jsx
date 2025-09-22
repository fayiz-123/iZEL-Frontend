import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Signup, verifyOtp } from "../services/authService";

function Registration() {
  const [step, setStep] = useState(1); // Step 1: Details, Step 2: OTP
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendOtp = async (e) => {
  e.preventDefault();

  // prevent double clicks
  if (loading) return;

  // Check password match before making API call
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  setLoading(true);
  try {
    const response = await Signup(formData);

    if (response.success) {
      toast.success("OTP sent to email!");
      setStep(2);
    } else {
      // handle backend errors like "User already exists"
      const errorMsg =
        response?.message || "Failed to send OTP. Please try again.";
      toast.error(errorMsg);
    }
  } catch (error) {
    console.error("Error Signing Up:", error);

    // if backend sends specific error
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

 
 const handleVerifyOtp = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);
  try {
    // ✅ Send email + otp to backend
    const response = await verifyOtp({
      email: formData.email,
      otp: otp,
    });

    if (response.success) {
      toast.success("Email verified successfully!");
      // redirect to login
      navigate("/login");
    } else {
      const errMessg =
        response?.message || "Failed to verify OTP. Please try again.";
      toast.error(errMessg);
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h1>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP sent to email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Signup"}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-500 cursor-pointer"
          >
            Login
          </span>
        </p>
         <p className="mt-2 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} iZEL Studio
        </p>
      </div>
    </div>
  );
}

export default Registration;
