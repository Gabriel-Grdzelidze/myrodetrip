'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { UserPlus, Trash2 } from "lucide-react";
import { ADD_ADMIN, REMOVE_ADMIN } from "../../graphql/mutations";
import {GET_ADMINS} from "../../graphql/query"

export default function Admins() {
  const { data, loading, refetch } = useQuery(GET_ADMINS);
  const [addAdmin, { loading: adding }] = useMutation(ADD_ADMIN);
  const [removeAdmin]                   = useMutation(REMOVE_ADMIN);

  const [form, setForm]         = useState({ name: "", email: "", password: "" });
  const [removing, setRemoving] = useState(null);
  const [toast, setToast]       = useState(null);

  const showToast = (msg, ok) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = async () => {
    if (!form.name || !form.email || !form.password)
      return showToast("All fields are required.", false);
    const { data } = await addAdmin({ variables: form });
    const p = data?.addAdmin;
    showToast(p.message, p.success);
    if (p.success) { setForm({ name: "", email: "", password: "" }); refetch(); }
  };

  const handleRemove = async (email) => {
    if (!confirm(`Remove ${email}?`)) return;
    setRemoving(email);
    const { data } = await removeAdmin({ variables: { email } });
    showToast(data?.removeAdmin.message, data?.removeAdmin.success);
    if (data?.removeAdmin.success) refetch();
    setRemoving(null);
  };

  const admins = data?.getAdmins ?? [];

  return (
    <div className="space-y-6 max-w-2xl">

      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg
          ${toast.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {toast.msg}
        </div>
      )}

      {/* Add form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Add Admin</h3>
        <input
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm transition"
          placeholder="Full name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <input
          type="email"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm transition"
          placeholder="Email address"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <input
          type="password"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm transition"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          onKeyDown={e => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={adding}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
        >
          <UserPlus className="w-4 h-4" />
          {adding ? "Adding…" : "Add Admin"}
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Current Admins</h3>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {admins.length} total
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-5 h-5 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ) : admins.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">No admins yet.</p>
        ) : (
          <ul className="space-y-1">
            {admins.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
                  {a.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{a.name}</p>
                  <p className="text-xs text-slate-400 truncate">{a.email}</p>
                </div>
                <span className="text-xs text-slate-300 hidden sm:block flex-shrink-0">
                  {new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <button
                  onClick={() => handleRemove(a.email)}
                  disabled={removing === a.email}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-40"
                >
                  {removing === a.email
                    ? <div className="w-4 h-4 border-2 border-slate-200 border-t-red-400 rounded-full animate-spin" />
                    : <Trash2 className="w-4 h-4" />
                  }
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}