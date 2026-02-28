'use client'
import { useQuery } from "@apollo/client/react";
import { GET_TRIPS } from "../../graphql/query";

export default function AllTrips() {
  const { data, loading, error } = useQuery(GET_TRIPS);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Trips</h2>

      {loading && <p className="text-slate-400">Loading Data...</p>}
      {error && <p className="text-red-500">Failed to load trips.</p>}

      <div className="space-y-3">
        {data?.getTrips?.map((trip) => (
          <div key={trip.id} className="flex justify-between items-center border-b pb-3 last:border-none">
            <div>
              <span className="font-medium">{trip.Destination}</span>
              <span className="text-slate-400 text-sm ml-2">({trip.TotalParticipants} people)</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-slate-500 text-sm">{trip.Menu}</span>
              <span className="font-semibold text-[#1a94b8]">₾{trip.Cost}</span>
            </div>
          </div>
        ))}

        {!loading && data?.getTrips?.length === 0 && (
          <p className="text-slate-400">No trips found.</p>
        )}
      </div>
    </div>
  );
}