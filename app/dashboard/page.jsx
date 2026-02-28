'use client'
import { useState } from "react";
import Dashboard from "./Dashboard";
import AllTrips from "./allTrips";
import Destinations from "./destinations";
import Menu from "./menu";

export default function Admin() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "trips":
        return <AllTrips />;
      case "destinations":
        return <Destinations />;
      case "menu":
        return <Menu />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10">Rodetrip</h1>

        <nav className="space-y-4">
          <button
            onClick={() => setActivePage("dashboard")}
            className="block text-left w-full hover:text-blue-400"
          >
            Dashboard
          </button>

          <button
            onClick={() => setActivePage("trips")}
            className="block text-left w-full hover:text-blue-400"
          >
            All Trips
          </button>

          <button
            onClick={() => setActivePage("destinations")}
            className="block text-left w-full hover:text-blue-400"
          >
            Destinations
          </button>

          <button
            onClick={() => setActivePage("menu")}
            className="block text-left w-full hover:text-blue-400"
          >
            Menu
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-slate-800 capitalize">
            {activePage}
          </h2>
        </div>

        {renderPage()}
      </main>
    </div>
  );
}