'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { GET_MY_OFFERS } from "@/graphql/query";
import { DELETE_DRIVER_OFFER, UPDATE_DRIVER_OFFER } from "@/graphql/mutations";
import GridSkeleton from "../components/ui/GridSkeleton";
import { MapPin, Users, Wallet, Inbox, Pencil, Trash2, X, Check } from "lucide-react";

export default function MyOffers() {
  const { data: session, status } = useSession();
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const { data, loading, error, refetch } = useQuery(GET_MY_OFFERS, {
    variables: { driverId: session?.user?.id },
    skip: !session?.user?.id,
    fetchPolicy: "network-only",
  });

  const [deleteOffer] = useMutation(DELETE_DRIVER_OFFER, {
    onCompleted: () => { setDeletingId(null); refetch(); },
  });

  const [updateOffer] = useMutation(UPDATE_DRIVER_OFFER, {
    onCompleted: () => { setEditingId(null); refetch(); },
  });

  const startEdit = (offer) => {
    setEditingId(offer.id);
    setEditForm({
      destinations: offer.destinations.join(", "),
      seats: offer.seats,
      price: offer.price,
      description: offer.description,
    });
  };

  const handleUpdate = (id) => {
    updateOffer({
      variables: {
        id,
        destinations: editForm.destinations.split(",").map((d) => d.trim()).filter(Boolean),
        seats: parseInt(editForm.seats),
        price: parseInt(editForm.price),
        description: editForm.description,
      },
    });
  };

  if (status === "loading") {
    return (
      <section className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto"><GridSkeleton count={4} /></div>
      </section>
    );
  }

  if (!session?.user) {
    return (
      <section className="min-h-screen bg-gray-50 py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">You need to be logged in.</p>
          <a href="/authentication" className="px-6 py-3 rounded-2xl bg-[#1a94b8] text-white text-sm font-semibold">Sign In</a>
        </div>
      </section>
    );
  }

  const offers = data?.getMyOffers ?? [];

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-[#1a94b8]/10 text-[#1a94b8] font-medium text-sm mb-4">Driver Portal</span>
            <h2 className="text-4xl font-bold text-gray-900">My Offers</h2>
            <p className="text-gray-400 text-sm mt-2">Your posted trips and who has booked them.</p>
          </div>
          <a href="/driverOffer" className="px-5 py-3 rounded-2xl bg-[#1a94b8] text-white text-sm font-semibold hover:bg-[#157fa0] transition">
            + New Offer
          </a>
        </div>

        {loading ? (
          <GridSkeleton count={4} />
        ) : error ? (
          <div className="text-center py-20 text-red-400 text-sm">Error: {error.message}</div>
        ) : offers.length === 0 ? (
          <div className="text-center py-20">
            <Inbox className="w-12 h-12 mx-auto mb-4 text-gray-200" />
            <p className="text-gray-400 text-sm">No offers yet.</p>
            <a href="/driverOffer" className="inline-block mt-4 px-6 py-3 rounded-2xl bg-[#1a94b8] text-white text-sm font-semibold">Post Your First Offer</a>
          </div>
        ) : (
          <div className="space-y-6">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

                {editingId === offer.id ? (
                  /* ── Edit mode ── */
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Destinations (comma separated)</label>
                      <input
                        value={editForm.destinations}
                        onChange={(e) => setEditForm({ ...editForm, destinations: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1a94b8]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Seats</label>
                        <input
                          type="number"
                          value={editForm.seats}
                          onChange={(e) => setEditForm({ ...editForm, seats: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1a94b8]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Price (₾)</label>
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1a94b8]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Description</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#1a94b8] resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(offer.id)}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1a94b8] text-white text-sm font-semibold hover:bg-[#157fa0] transition"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── View mode ── */
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <MapPin className="w-4 h-4 text-[#1a94b8] shrink-0" />
                        {offer.destinations.map((d) => (
                          <span key={d} className="text-xs bg-[#f0fafe] text-[#1a94b8] px-2 py-1 rounded-full font-medium">{d}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <div className="flex items-center gap-3 text-sm text-gray-500 mr-2">
                          <div className="flex items-center gap-1"><Users className="w-4 h-4" />{offer.seats}</div>
                          <div className="flex items-center gap-1 font-bold text-[#1a94b8]"><Wallet className="w-4 h-4" />₾{offer.price}</div>
                        </div>
                        <button
                          onClick={() => startEdit(offer)}
                          className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deletingId === offer.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Sure?</span>
                            <button
                              onClick={() => deleteOffer({ variables: { id: offer.id } })}
                              className="text-xs px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >Yes</button>
                            <button
                              onClick={() => setDeletingId(null)}
                              className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200"
                            >No</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeletingId(offer.id)}
                            className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-5">{offer.description}</p>

                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Bookings ({offer.bookings?.length ?? 0})</p>
                      {!offer.bookings || offer.bookings.length === 0 ? (
                        <p className="text-sm text-gray-300">No bookings yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {offer.bookings.map((b) => (
                            <div key={b.id} className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
                              <div>
                                <p className="text-sm font-semibold text-gray-700">{b.userName}</p>
                                <p className="text-xs text-gray-400">{b.userEmail}</p>
                              </div>
                              <span className="text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}