import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../context/AuthContent";
import SignUpModal from "../components/SignUpModal";

function Login() {
  const navigate = useNavigate();
  const { login, register, authMethod } = useAuth();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithPopup(auth, provider);
      setTimeout(() => navigate("/analysis"), 500);
    } catch (error) {
      console.error(error);
      setError(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginCredentials.username || !loginCredentials.password) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);
    try {
      await login(loginCredentials.username, loginCredentials.password);
      setTimeout(() => navigate("/analysis"), 500);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (userData) => {
    try {
      setError("");
      await register(userData.username, userData.email, userData.password);
      setIsSignUpOpen(false);
      setLoginCredentials({ username: userData.username, password: "" });
      setTimeout(() => navigate("/analysis"), 500);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Top-right authentication buttons */}
      <div className="absolute top-8 right-8 flex items-center gap-3 z-10">
        <button
          onClick={() => setIsSignUpOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white shadow-2xl px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold text-sm md:text-base hover:shadow-3xl hover:scale-105"
        >
          <span>Sign Up</span>
        </button>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center gap-3 bg-white text-slate-900 shadow-2xl px-6 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 font-semibold text-sm md:text-base hover:shadow-3xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Google Sign In</span>
        </button>
      </div>

      {/* Centered Welcome Text and Login Form */}
      <div className="text-center z-10 px-4 w-full max-w-md">
        <div className="mb-8">
          <p className="text-blue-300 text-sm font-semibold tracking-widest uppercase mb-3">
            Professional Resume Analysis
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Resume Analyzer
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 mb-6">
          <div>
            <input
              type="text"
              name="username"
              value={loginCredentials.username}
              onChange={handleLoginChange}
              placeholder="Username"
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 bg-opacity-50 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={loginCredentials.password}
              onChange={handleLoginChange}
              placeholder="Password"
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 bg-opacity-50 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-300 text-sm mb-6">
          Don't have an account?{" "}
          <button
            onClick={() => setIsSignUpOpen(true)}
            className="text-blue-300 hover:text-blue-200 font-semibold underline"
          >
            Sign up here
          </button>
        </p>

        {/* Features */}
        <p className="text-gray-300 mt-8 text-lg md:text-xl leading-relaxed mb-6">
          Transform your resume with <span className="text-blue-300 font-semibold">AI-powered insights</span>
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4 text-sm md:text-base">
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <span className="text-blue-400 text-xl">✓</span>
            <span>Upload Resume</span>
          </div>
          <div className="hidden md:flex text-gray-500">•</div>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <span className="text-purple-400 text-xl">✓</span>
            <span>Get Analysis</span>
          </div>
          <div className="hidden md:flex text-gray-500">•</div>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <span className="text-indigo-400 text-xl">✓</span>
            <span>Receive Suggestions</span>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSignUp={handleSignUp}
      />
    </div>
  );
}

export default Login;
