import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    if (isSignup) {
      // SIGN UP
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Signup successful. You can now login.");
        setIsSignup(false);
      }
    } else {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <p className="text-sm text-gray-500 mb-6 text-center">
          {isSignup
            ? "Sign up to start taking notes"
            : "Login to access your notes"}
        </p>

        <input
          className="border border-gray-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border border-gray-300 p-2 w-full mb-5 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 w-full rounded-lg font-medium"
          onClick={handleAuth}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <button
            className="text-indigo-600 underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
