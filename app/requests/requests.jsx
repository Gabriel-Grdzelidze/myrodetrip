'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_TRIPS } from "../../graphql/query";
import { CONFIRM_BOOKING, DECLINE_BOOKING } from '../../graphql/mutations';
import {
  CheckIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UsersIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const getDriverId = () => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch {
    return null;
  }
};

const StatusBadge = ({ status }) => {
  if (status === 'confirmed') return (
    <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
      <CheckIcon className="h-4 w-4 text-emerald-500" />
      <span className="text-sm font-semibold text-emerald-600">Confirmed</span>
    </div>
  );
  if (status === 'declined') return (
    <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 border border-red-100">
      <XMarkIcon className="h-4 w-4 text-red-400" />
      <span className="text-sm font-semibold text-red-500">Declined</span>
    </div>
  );
  return null;
};

const RequestCard = ({ booking }) => {
  const [confirmBooking, { loading: confirming }] = useMutation(CONFIRM_BOOKING, {
    variables: { bookingId: booking.id },
    optimisticResponse: {
      confirmBooking: { __typename: 'Booking', id: booking.id, status: 'confirmed' },
    },
  });

  const [declineBooking, { loading: declining }] = useMutation(DECLINE_BOOKING, {
    variables: { bookingId: booking.id },
    optimisticResponse: {
      declineBooking: { __typename: 'Booking', id: booking.id, status: 'declined' },
    },
  });

  const isPending = !booking.status || booking.status === 'pending';
  const isLoading = confirming || declining;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#44A194] via-[#0AC4E0] to-[#3BC1A8]" />

      <div className="p-6">
        {/* User info */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#44A194] to-[#0AC4E0] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              {booking.userName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-[15px]">{booking.userName}</p>
              <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                <EnvelopeIcon className="h-3 w-3" />
                <span>{booking.userEmail}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>
              {new Date(booking.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Offer details */}
        {booking.offer && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-5">
            <div className="flex items-start gap-2">
              <MapPinIcon className="h-4 w-4 text-[#44A194] mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium mb-1">Destinations</p>
                <div className="flex flex-wrap gap-1.5">
                  {booking.offer.destinations?.map((dest, i) => (
                    <span key={i} className="text-xs bg-white border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-1">
              <div className="flex items-center gap-1.5">
                <UsersIcon className="h-4 w-4 text-[#0AC4E0]" />
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">{booking.offer.seats}</span> seats
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CurrencyDollarIcon className="h-4 w-4 text-[#3BC1A8]" />
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">₾{booking.offer.price}</span> per seat
                </span>
              </div>
            </div>

            {booking.offer.description && (
              <p className="text-xs text-gray-500 border-t border-gray-200 pt-3 leading-relaxed">
                {booking.offer.description}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        {isPending ? (
          <div className="flex gap-3">
            <button
              onClick={() => declineBooking()}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-200 disabled:opacity-60"
            >
              <XMarkIcon className="h-4 w-4" />
              Decline
            </button>
            <button
              onClick={() => confirmBooking()}
              disabled={isLoading}
              className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#44A194] to-[#0AC4E0] text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-sm disabled:opacity-60"
            >
              {confirming ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <CheckIcon className="h-4 w-4" />
                  Confirm
                </>
              )}
            </button>
          </div>
        ) : (
          <StatusBadge status={booking.status} />
        )}
      </div>
    </div>
  );
};

const RequestsPage = () => {
  const driverId = getDriverId();
  const [filter, setFilter] = useState('all');

  const { data, loading } = useQuery(GET_TRIPS, {
    variables: { driverId },
    skip: !driverId,
  });

  const bookings = data?.getDriverRequests || [];

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !b.status || b.status === 'pending';
    return b.status === filter;
  });

  const pendingCount = bookings.filter((b) => !b.status || b.status === 'pending').length;

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'declined', label: 'Declined' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-10 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Booking Requests</h1>
            {pendingCount > 0 && (
              <span className="bg-gradient-to-r from-[#44A194] to-[#0AC4E0] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {pendingCount} new
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">Manage incoming booking requests for your offers</p>
        </div>

        <div className="flex gap-2 mb-6">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                filter === key
                  ? 'bg-gradient-to-r from-[#44A194] to-[#0AC4E0] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <UserIcon className="h-7 w-7 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No requests here</p>
            <p className="text-gray-400 text-sm mt-1">When users book your offers, they'll show up here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((booking) => (
              <RequestCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;