'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_USERS, GET_DRIVERS } from '../../graphql/query';
import { DELETE_USER, DELETE_DRIVER } from '../../graphql/mutations';
import GridSkeleton from '../components/ui/GridSkeleton';

export default function Users() {
  const [tab, setTab] = useState('users');
  const [search, setSearch] = useState('');
  const [confirmId, setConfirmId] = useState(null);

  const isUsers = tab === 'users';

  const { data: usersData, loading: usersLoading, refetch: refetchUsers } = useQuery(GET_USERS, {
    variables: search ? { search } : {},
    skip: !isUsers,
    fetchPolicy: 'network-only',
  });

  const { data: driversData, loading: driversLoading, refetch: refetchDrivers } = useQuery(GET_DRIVERS, {
    variables: search ? { search } : {},
    skip: isUsers,
    fetchPolicy: 'network-only',
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => refetchUsers(),
  });

  const [deleteDriver] = useMutation(DELETE_DRIVER, {
    onCompleted: () => refetchDrivers(),
  });

  const records = isUsers ? (usersData?.getUsers ?? []) : (driversData?.getDrivers ?? []);
  const loading = isUsers ? usersLoading : driversLoading;

  const handleDelete = (id) => {
    if (isUsers) {
      deleteUser({ variables: { id } });
    } else {
      deleteDriver({ variables: { id } });
    }
    setConfirmId(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">Manage registered users and drivers.</p>
        </div>
        {!loading && (
          <span className="bg-teal-50 text-teal-600 text-sm font-medium px-3 py-1 rounded-full">
            {records.length} total
          </span>
        )}
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => { setTab('users'); setSearch(''); }}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            isUsers ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => { setTab('drivers'); setSearch(''); }}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            !isUsers ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Drivers
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder={`Search ${isUsers ? 'users' : 'drivers'}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
        />
      </div>

      {/* Table / Skeleton */}
      {loading ? (
        <GridSkeleton count={6} />
      ) : records.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          No {isUsers ? 'users' : 'drivers'} found.
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 text-slate-500 font-medium">Name</th>
                <th className="text-left px-5 py-3 text-slate-500 font-medium">ID Number</th>
                <th className="text-left px-5 py-3 text-slate-500 font-medium">Email</th>
                {!isUsers && (
                  <th className="text-left px-5 py-3 text-slate-500 font-medium">Phone</th>
                )}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-800">{record.name}</td>
                  <td className="px-5 py-3 text-slate-600">{record.idNumber}</td>
                  <td className="px-5 py-3 text-slate-600">{record.email}</td>
                  {!isUsers && (
                    <td className="px-5 py-3 text-slate-600">{record.phone}</td>
                  )}
                  <td className="px-5 py-3 text-right">
                    {confirmId === record.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-slate-500">Sure?</span>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-xs px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(record.id)}
                        className="text-xs px-3 py-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Count */}
      {!loading && records.length > 0 && (
        <p className="text-xs text-slate-400">
          {records.length} {isUsers ? 'user' : 'driver'}{records.length !== 1 ? 's' : ''} found
        </p>
      )}
    </div>
  );
}