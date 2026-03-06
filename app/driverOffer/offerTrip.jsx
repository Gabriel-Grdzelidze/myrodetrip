'use client'
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { CREATE_DRIVER_OFFER } from "@/graphql/mutations";
import { SuccessMessage, ErrorMessage } from "../components/ui/message";

const PRESET_DESTINATIONS = ["Tbilisi", "Batumi", "Gudauri", "Kazbegi", "Borjomi", "Signagi", "Kutaisi"];

export default function DriverOffer() {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [selectedDests, setSelectedDests] = useState([]);
  const [customDest, setCustomDest] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("idle");

  const [createDriverOffer, { loading }] = useMutation(CREATE_DRIVER_OFFER, {
    onCompleted: () => {
      setStatus("success");
      setSelectedDests([]);
      setSeats("");
      setPrice("");
      setDescription("");
      setStep(1);
    },
    onError: () => setStatus("error"),
  });

  const toggleDest = (dest) => {
    setSelectedDests((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const addCustomDest = () => {
    const trimmed = customDest.trim();
    if (trimmed && !selectedDests.includes(trimmed)) {
      setSelectedDests((prev) => [...prev, trimmed]);
    }
    setCustomDest("");
  };

  const handleSubmit = () => {
    if (!session?.user?.id) return;
    setStatus("idle");
    createDriverOffer({
      variables: {
        driverId: session.user.id,
        destinations: selectedDests,
        seats: parseInt(seats),
        price: parseInt(price),
        description,
      },
    });
  };

  const canProceedStep1 = selectedDests.length > 0;
  const canProceedStep2 = seats && price && description.trim();

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-[#1a94b8]/10 text-[#1a94b8] font-medium text-sm mb-4">
            Driver Portal
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Create a <span className="text-[#1a94b8] italic">Trip Offer</span>
          </h2>
          <p className="text-gray-500 text-sm">Post your available trips and get bookings from users directly.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

          {/* Step indicators */}
          <div className="flex mb-10">
            {["Destinations", "Details", "Publish"].map((label, i) => (
              <div key={label} className="flex-1 text-center">
                <div
                  className={`pb-3 border-b-2 text-xs font-semibold transition-all ${
                    step === i + 1
                      ? "border-[#1a94b8] text-[#1a94b8]"
                      : step > i + 1
                      ? "border-teal-400 text-teal-400"
                      : "border-gray-100 text-gray-400"
                  }`}
                >
                  {i + 1}. {label}
                </div>
              </div>
            ))}
          </div>

          {/* Step 1 — Destinations */}
          {step === 1 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Select Destinations</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {PRESET_DESTINATIONS.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => toggleDest(dest)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                      selectedDests.includes(dest)
                        ? "bg-[#e8f7fb] border-[#1a94b8] text-[#1a94b8]"
                        : "border-gray-200 text-gray-500 hover:border-[#1a94b8] hover:text-[#1a94b8]"
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>

              {/* Custom destination input */}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={customDest}
                  onChange={(e) => setCustomDest(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomDest()}
                  placeholder="Add custom destination..."
                  className="flex-1 border border-dashed border-gray-300 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1a94b8] text-gray-700"
                />
                <button
                  onClick={addCustomDest}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium hover:bg-gray-200 transition"
                >
                  + Add
                </button>
              </div>

              {/* Selected list */}
              {selectedDests.length > 0 && (
                <div className="mt-6 p-4 bg-[#f0fafe] rounded-2xl">
                  <p className="text-xs font-semibold text-[#1a94b8] uppercase tracking-wider mb-2">Selected</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDests.map((d) => (
                      <span
                        key={d}
                        onClick={() => toggleDest(d)}
                        className="px-3 py-1 bg-white border border-[#1a94b8] text-[#1a94b8] rounded-full text-sm cursor-pointer hover:bg-red-50 hover:border-red-300 hover:text-red-400 transition"
                      >
                        {d} ✕
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full mt-8 bg-[#1a94b8] text-white py-4 rounded-2xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#157fa0] transition"
              >
                Next: Trip Details →
              </button>
            </div>
          )}

          {/* Step 2 — Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Seats Available</label>
                  <input
                    type="number"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    placeholder="e.g. 40"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1a94b8] text-gray-800"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price per Person (₾)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 150"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1a94b8] text-gray-800"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your trip, stops, highlights..."
                  rows={4}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1a94b8] text-gray-800 resize-none"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-2xl border border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 py-4 rounded-2xl bg-[#1a94b8] text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#157fa0] transition"
                >
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Review & Publish */}
          {step === 3 && (
            <div>
              {/* Summary bar */}
              <div className="bg-gradient-to-br from-[#f0fafe] to-[#e8f7fb] rounded-2xl p-6 mb-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#1a94b8]">{selectedDests.length}</div>
                  <div className="text-xs text-gray-400 mt-1">Destinations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#1a94b8]">{seats}</div>
                  <div className="text-xs text-gray-400 mt-1">Seats</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#1a94b8]">₾{price}</div>
                  <div className="text-xs text-gray-400 mt-1">Per Person</div>
                </div>
              </div>

              {/* Details review */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-3 border-b border-gray-100 text-sm">
                  <span className="text-gray-400 font-medium">Destinations</span>
                  <span className="text-gray-800 font-semibold">{selectedDests.join(", ")}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100 text-sm">
                  <span className="text-gray-400 font-medium">Description</span>
                  <span className="text-gray-800 font-semibold text-right max-w-xs">{description}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100 text-sm">
                  <span className="text-gray-400 font-medium">Posted by</span>
                  <span className="text-gray-800 font-semibold">{session?.user?.name}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-2xl border border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !session?.user?.id}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#44A194] to-[#0AC4E0] text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
                >
                  {loading ? "Publishing..." : "Publish Trip Offer 🚌"}
                </button>
              </div>
            </div>
          )}
        </div>

        {status === "success" && <SuccessMessage message="Trip offer published successfully!" />}
        {status === "error" && <ErrorMessage message="Failed to publish offer. Please try again." />}

      </div>
    </section>
  );
}