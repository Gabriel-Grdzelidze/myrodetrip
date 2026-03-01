'use client'
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_DESTINATIONS } from "../../graphql/query";
import { ADD_DESTINATION, DELETE_DESTINATION } from "../../graphql/mutations";
import { useState, useEffect } from "react";
import { Trash2, Plus, MapPin } from "lucide-react";
import GridSkeleton from "../components/ui/GridSkeleton";

export default function Destinations() {
  const [destinationArr, setDestinationArr] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const { data, loading, refetch } = useQuery(GET_DESTINATIONS)

  useEffect(() => {
    if (data?.getDestinations) {
      setDestinationArr(data.getDestinations);
    }
  }, [data]);

  const [addDestination, { loading: adding }] = useMutation(ADD_DESTINATION, {
    onCompleted: () => {
      setName("")
      setPrice("")
      setShowForm(false)
      refetch()
    }
  })

  const [deleteDestination] = useMutation(DELETE_DESTINATION, {
    onCompleted: () => refetch()
  })

  const handleAdd = () => {
    if (!name || !price) return
    addDestination({ variables: { name, price: parseFloat(price) } })
  }

  const handleDelete = (id) => {
    deleteDestination({ variables: { id } })
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Destinations</h2>
          <p className="text-slate-500 text-sm">Manage your travel locations here.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Destination
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Destination name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <input
            type="number"
            placeholder="Price per person (₾)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-48 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <button
            onClick={handleAdd}
            disabled={adding}
            className="bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all"
          >
            {adding ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-5 py-2 rounded-xl text-sm font-medium transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Destination List */}
      {loading ? (
        <GridSkeleton count={4} />
      ) : destinationArr.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No destinations yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {destinationArr.map((dest) => (
            <div
              key={dest.id}
              className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-teal-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-gray-800 block">{dest.name}</span>
                  <span className="text-sm text-gray-500">₾{dest.price}/person</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(dest.id)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}