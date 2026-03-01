'use client'
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignIn({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in:", { email, password });
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
      <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-400 transition text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-400 transition text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1a94b8] hover:bg-[#1580a0] text-white py-3 rounded-2xl font-bold text-sm transition hover:scale-[1.01] active:scale-[0.99]"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="text-[#1a94b8] font-semibold hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
}