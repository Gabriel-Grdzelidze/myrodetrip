'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { GET_DRIVER_OFFERS } from "@/graphql/query";
import { BOOK_TRIP } from "@/graphql/mutations";
import { SuccessMessage, ErrorMessage } from "../components/ui/message";
import GridSkeleton from "../components/ui/GridSkeleton";
import { MapPin, Users, Wallet, Bus } from "lucide-react";

export default function Trips() {
  const { data: session } = useSession();
  const [bookingId, setBookingId] = useState(null);
  const [confirming, setConfirming] = useState(null);
  const [status, setStatus] = useState("idle");
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(GET_DRIVER_OFFERS, {
    fetchPolicy: "network-only",
  });

  const [bookTrip, { loading: booking }] = useMutation(BOOK_TRIP, {
    onCompleted: () => {
      setStatus("success");
      setConfirming(null);
      setBookingId(null);
    },
    onError: () => {
      setStatus("error");
      setConfirming(null);
    },
  });

  const handleBook = (offer) => {
    if (!session?.user) return;
    bookTrip({
      variables: {
        offerId: offer.id,
        userId: session.user.id,
        userName: session.user.name,
        userEmail: session.user.email,
      },
    });
  };

  const offers = data?.getDriverOffers ?? [];
  const filtered = search
    ? offers.filter((o) =>
        o.destinations.some((d) =>
          d.toLowerCase().includes(search.toLowerCase())
        ) || o.driverName.toLowerCase().includes(search.toLowerCase())
      )
    : offers;

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-[#1a94b8]/10 text-[#1a94b8] font-medium text-sm mb-4">
            Available Trips
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Find Your <span className="text-[#1a94b8]">Perfect Trip</span>
          </h2>
          <p className="text-gray-500 text-sm">Browse trips posted by drivers and book your seat instantly.</p>
        </div>

        {/* Search */}
        

        {/* Content */}
        {loading ? (
          <GridSkeleton count={6} />
        ) : error ? (
          <div className="text-center py-20 text-red-400 text-sm">Failed to load trips. Please try again.</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Bus className="w-12 h-12 mx-auto mb-4 text-gray-200" />
            <p className="text-gray-400 text-sm">No trips found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-gray-100 p-6 hover:border-[#1a94b8]/30 hover:shadow-md transition-all flex flex-col"
              >
                {/* Driver */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#44A194] to-[#0AC4E0] flex items-center justify-center text-white font-bold text-sm">
                    {offer.driverName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{offer.driverName}</p>
                    <p className="text-xs text-gray-400">Driver</p>
                  </div>
                </div>

                {/* Destinations */}
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#1a94b8] mt-0.5 shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {offer.destinations.map((d) => (
                      <span key={d} className="text-xs bg-[#f0fafe] text-[#1a94b8] px-2 py-1 rounded-full font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-2">{offer.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-5">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{offer.seats} seats</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-[#1a94b8]" />
                    <span className="text-lg font-bold text-[#1a94b8]">₾{offer.price}</span>
                    <span className="text-xs text-gray-400">/person</span>
                  </div>
                </div>

                {/* Book button */}
                {!session?.user ? (
                  <a
                    href="/authentication"
                    className="w-full text-center py-3 rounded-2xl border border-[#1a94b8] text-[#1a94b8] text-sm font-semibold hover:bg-[#f0fafe] transition"
                  >
                    Sign in to Book
                  </a>
                ) : confirming === offer.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBook(offer)}
                      disabled={booking}
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#44A194] to-[#0AC4E0] text-white text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition"
                    >
                      {booking ? "Booking..." : "Confirm ✓"}
                    </button>
                    <button
                      onClick={() => setConfirming(null)}
                      className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setStatus("idle"); setConfirming(offer.id); }}
                    className="w-full py-3 rounded-2xl bg-[#1a94b8] text-white text-sm font-semibold hover:bg-[#157fa0] transition"
                  >
                    Book This Trip
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {status === "success" && <SuccessMessage message="Trip booked! The driver has been notified." />}
        {status === "error" && <ErrorMessage message="Failed to book trip. Please try again." />}

      </div>
    </section>
  );
}