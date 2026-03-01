'use client'
import { useState } from "react";
import { TruckIcon } from "@heroicons/react/24/outline";
import SignIn from "../components/ui/SignIn";
import SignUp from "../components/ui/SignUp";

export default function MembershipPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [role, setRole] = useState("user");

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 text-white overflow-hidden">
        <img
          src="/images/auth.jpg"
          alt="Kids on school trip"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="rounded-xl bg-white/20 p-2">
            <TruckIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-bold text-lg">
            SchoolTrip<span className="opacity-70">.ge</span>
          </h3>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Plan amazing<br />school trips<br />with ease.
          </h1>
          <p className="opacity-80 text-lg">
            Join thousands of schools already using SchoolTrip.ge to organize safe, fun, and affordable trips.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-sm opacity-70">
          <span>500+ Schools</span>
          <span>•</span>
          <span>10,000+ Trips</span>
          <span>•</span>
          <span>Georgia Wide</span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-start pt-16 px-4">
        <div className="w-full max-w-md">

          <div className="flex-shrink-0 mb-6">
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-2">
              <button
                onClick={() => setIsSignIn(true)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isSignIn ? "bg-white text-[#1a94b8] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  !isSignIn ? "bg-white text-[#1a94b8] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="flex bg-gray-100 rounded-xl p-1 w-44">
              <button
                onClick={() => setRole("user")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === "user" ? "bg-white text-[#1a94b8] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                User
              </button>
              <button
                onClick={() => setRole("driver")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === "driver" ? "bg-white text-[#1a94b8] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Driver
              </button>
            </div>
          </div>

          {isSignIn
            ? <SignIn role={role} onSwitch={() => setIsSignIn(false)} />
            : <SignUp role={role} onSwitch={() => setIsSignIn(true)} />
          }

        </div>
      </div>
    </div>
  );
}