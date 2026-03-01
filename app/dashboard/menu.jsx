'use client'
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_MENUS } from "../../graphql/query";
import { ADD_MENU, DELETE_MENU } from "../../graphql/mutations";
import { useState, useEffect } from "react";
import { Trash2, Plus, Utensils } from "lucide-react";
import GridSkeleton from "../components/ui/GridSkeleton";

export default function Menu() {
  const [menuArr, setMenuArr] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const { data, loading, refetch } = useQuery(GET_MENUS)

  useEffect(() => {
    if (data?.getMenus) {
      setMenuArr(data.getMenus);
    }
  }, [data]);

  const [addMenu, { loading: adding }] = useMutation(ADD_MENU, {
    onCompleted: () => {
      setName("")
      setPrice("")
      setShowForm(false)
      refetch()
    }
  })

  const [deleteMenu] = useMutation(DELETE_MENU, {
    onCompleted: () => refetch()
  })

  const handleAdd = () => {
    if (!name || !price) return
    addMenu({ variables: { name, price: parseFloat(price) } })
  }

  const handleDelete = (id) => {
    deleteMenu({ variables: { id } })
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Food Menu</h2>
          <p className="text-slate-500 text-sm">Manage food menus for destinations.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Menu
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Menu name"
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

      {/* Menu List */}
      {loading ? (
        <GridSkeleton count={4} />
      ) : menuArr.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Utensils className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No menus yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {menuArr.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-teal-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-gray-800 block">{m.name}</span>
                  <span className="text-sm text-gray-500">₾{m.price}/person</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(m.id)}
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