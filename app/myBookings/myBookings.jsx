'use client'
import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { GET_MY_BOOKINGS } from "@/graphql/query";
import GridSkeleton from "../components/ui/GridSkeleton";
import { MapPin, Wallet, Bus, Inbox } from "lucide-react";

export default function MyBookings() {
  const { data: session } = useSession();

  const { data, loading, error } = useQuery(GET_MY_BOOKINGS, {
    variables: { userId: session?.user?.id },
    skip: !session?.user?.id,
    fetchPolicy: "network-only",
  });

  const bookings = data?.getMyBookings ?? [];

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-[#1a94b8]/10 text-[#1a94b8] font-medium text-sm mb-4">
            My Account
          </span>
          <h2 className="text-4xl font-bold text-gray-900">My Bookings</h2>
          <p className="text-gray-400 text-sm mt-2">All the trips you've booked.</p>
        </div>

        {loading ? (
          <GridSkeleton count={4} />
        ) : error ? (
          <div className="text-center py-20 text-red-400 text-sm">Failed to load bookings.</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <Inbox className="w-12 h-12 mx-auto mb-4 text-gray-200" />
            <p className="text-gray-400 text-sm">You haven't booked any trips yet.</p>
            <a href="/trips" className="inline-block mt-4 px-6 py-3 rounded-2xl bg-[#1a94b8] text-white text-sm font-semibold hover:bg-[#157fa0] transition">
              Browse Trips
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-6">

                {/* Driver avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#44A194] to-[#0AC4E0] flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {booking.offer?.driverName?.charAt(0).toUpperCase() ?? <Bus className="w-6 h-6" />}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 mb-1">{booking.offer?.driverName ?? "Driver"}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {booking.offer?.destinations?.map((d) => (
                      <span key={d} className="text-xs bg-[#f0fafe] text-[#1a94b8] px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{d}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">{booking.offer?.description}</p>
                </div>

                {/* Price + date */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end text-[#1a94b8] font-bold text-xl mb-1">
                    <Wallet className="w-4 h-4" />
                    ₾{booking.offer?.price}
                  </div>
                  <p className="text-xs text-gray-400">
                    Booked {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}