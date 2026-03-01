'use client'
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, User, CreditCard, Phone, Loader2, CheckCircle } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { SIGN_UP_USER, SIGN_UP_DRIVER } from "../../../graphql/mutations";

export default function SignUp({ role, onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    idNumber: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [signUpUser] = useMutation(SIGN_UP_USER);
  const [signUpDriver] = useMutation(SIGN_UP_DRIVER);

  useEffect(() => {
    setForm({ name: "", idNumber: "", email: "", password: "", phone: "" });
    setError("");
    setSuccess(false);
  }, [role]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (role === "user") {
        const { data } = await signUpUser({
          variables: {
            name: form.name,
            idNumber: form.idNumber,
            email: form.email,
            password: form.password,
          }
        });
        localStorage.setItem("token", data.signUpUser.token);
        localStorage.setItem("role", data.signUpUser.role);
      } else {
        const { data } = await signUpDriver({
          variables: {
            name: form.name,
            idNumber: form.idNumber,
            email: form.email,
            phone: form.phone,
            password: form.password,
          }
        });
        localStorage.setItem("token", data.signUpDriver.token);
        localStorage.setItem("role", data.signUpDriver.role);
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md flex flex-col items-center justify-center py-8 gap-4">
        <CheckCircle className="w-16 h-16 text-[#1a94b8]" />
        <h2 className="text-2xl font-bold text-gray-900">Account Created!</h2>
        <p className="text-gray-500 text-sm">Redirecting you...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-1">Create account</h2>
      <p className="text-gray-500 mb-4">
        Sign up as <span className="text-[#1a94b8] font-semibold capitalize">{role}</span>
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">

        <div>
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-400 transition text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 mb-1 block">ID Number</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              placeholder="00000000000"
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-400 transition text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-teal-400 transition text-sm"
            />
          </div>
        </div>

        <div className={role === "driver" ? "block" : "hidden"}>
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+995 555 000 000"
              required={role === "driver"}
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
              name="password"
              value={form.password}
              onChange={handleChange}
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
          disabled={loading}
          className="w-full bg-[#1a94b8] hover:bg-[#1580a0] text-white py-3 rounded-2xl font-bold text-sm transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-[#1a94b8] font-semibold hover:underline">
          Sign In
        </button>
      </p>
    </div>
  );
}