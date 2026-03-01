'use client'
import { useQuery } from "@apollo/client/react";
import { GET_TRIPS } from "../../graphql/query";
import { MapPin, Users, Utensils, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const TripSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="p-5 rounded-2xl border border-gray-100 bg-gray-50 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
      </div>
    ))}
  </div>
);

export default function AllTrips() {
  const { data, loading, error } = useQuery(GET_TRIPS);
  const [liveTrips, setLiveTrips] = useState([]);

  useEffect(() => {
    console.log('connecting to socket...');
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('socket connected!', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.log('connection error:', err.message);
    });

    socket.on('trip-created', (trip) => {
      setLiveTrips(prev => [trip, ...prev]);
    });

    socket.on('trip-updated', (updated) => {
      setLiveTrips(prev =>
        prev.map(t => t._id === updated._id ? updated : t)
      );
    });

    socket.on('trip-deleted', (id) => {
      setLiveTrips(prev => prev.filter(t => t._id !== id));
    });

    return () => { socket.disconnect(); };
  }, []);

  const allTrips = [
    ...liveTrips,
    ...(data?.getTrips?.filter(
      (t) => !liveTrips.find(l => l._id === t.id)
    ) ?? [])
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">All Trips</h2>
          <p className="text-slate-500 text-sm">Overview of all scheduled school trips.</p>
        </div>
        {!loading && (
          <span className="bg-teal-50 text-teal-600 text-sm font-medium px-3 py-1 rounded-full">
            {allTrips.length} total
          </span>
        )}
      </div>

      {error && (
        <div className="text-center py-12 text-red-400">
          <p>Failed to load trips. Please try again.</p>
        </div>
      )}

      {loading ? (
        <TripSkeleton />
      ) : allTrips.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No trips found yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {allTrips.map((trip) => (
            <div
              key={trip._id || trip.id}
              className="p-5 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-semibold text-gray-800">{trip.Destination}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{trip.TotalParticipants} participants</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Utensils className="w-4 h-4 text-slate-400" />
                  <span>{trip.Menu}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <Wallet className="w-3 h-3" />
                  <span>Total cost</span>
                </div>
                <span className="text-lg font-bold text-[#1a94b8]">₾{trip.Cost}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}