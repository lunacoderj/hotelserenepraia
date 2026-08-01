import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Booking, RoomType } from '../../types';
import { Check, X, Phone, Clock, Loader2, IndianRupee, Plus, Trash2 } from 'lucide-react';
import { useRoomStore } from '../../stores/useRoomStore';
import { useBookingsStore } from '../../stores/useBookingsStore';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';
import { BookingCalendar } from '../../components/bookings/BookingCalendar';
import { ManualBookingModal } from '../../components/modals/ManualBookingModal';

export const Bookings = () => {
  const { bookings, fetchBookings, isLoading } = useBookingsStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOnline = useNetworkStatus();
  
  const { roomTypes, fetchRoomTypes } = useRoomStore();

  useEffect(() => {
    if (roomTypes.length === 0) fetchRoomTypes();
    fetchBookings();
  }, [fetchBookings, fetchRoomTypes, roomTypes.length]);

  const handleManualBooking = async (formData: any) => {
    const { error } = await supabase.from('bookings').insert([{
      guest_name: formData.guestName,
      guest_phone: formData.guestPhone,
      room_type_id: formData.roomTypeId,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      adults: formData.adults,
      children: formData.children,
      number_of_rooms: formData.numberOfRooms,
      status: formData.status,
      special_requests: formData.specialRequests
    }]);

    if (error) throw error;
    fetchBookings(); // refresh
  };

  const updateBookingStatus = async (id: string, newStatus: Booking['status']) => {
    setLoadingId(id);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert('Failed to update booking status');
    } finally {
      setLoadingId(null);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking?')) return;
    setLoadingId(id);
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) throw error;
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert('Failed to delete booking');
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusColor = (s: Booking['status']) => {
    switch(s) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getRoomName = (id: string) => {
    return roomTypes.find(r => r.id === id)?.title || 'Unknown Room';
  };

  if (isLoading) return <div className="p-8 text-navy">Loading bookings...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-heading-md text-navy mb-1">Bookings & Inquiries</h1>
          <p className="text-sm text-navy-500/70">Manage incoming booking requests from the website.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!isOnline}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            !isOnline 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-navy text-white hover:bg-navy-600'
          }`}
        >
          <Plus className="w-4 h-4" />
          Create / Block Booking
        </button>
      </div>

      <BookingCalendar bookings={bookings} roomTypes={roomTypes} />

      <div className="bg-white rounded-xl border border-navy/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy/10 text-xs uppercase tracking-widest text-navy-500/70 bg-slate-50">
                <th className="py-4 px-6 font-medium">Guest Details</th>
                <th className="py-4 px-6 font-medium">Reservation</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-navy-500/50">No bookings found.</td>
                </tr>
              )}
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-medium text-navy">{booking.guestName}</p>
                    <div className="flex items-center gap-2 text-sm text-navy-500 mt-1">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${booking.guestPhone}`} className="hover:text-gold">{booking.guestPhone}</a>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-navy text-sm">{getRoomName(booking.roomTypeId)}</p>
                    <p className="text-xs text-navy-500 mt-1">
                      {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-navy-500/70 mt-1">
                      {booking.numberOfRooms} Room(s) • {booking.adults} Adults, {booking.children} Child
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <p className="text-[10px] text-navy-500/50 mt-2 flex items-center gap-1 uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end items-center gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            disabled={loadingId === booking.id || !isOnline}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors ${!isOnline ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                          >
                            {loadingId === booking.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            Confirm
                          </button>
                          <button 
                            onClick={() => {
                              if(window.confirm('Cancel this booking request?')) {
                                updateBookingStatus(booking.id, 'cancelled');
                              }
                            }}
                            disabled={loadingId === booking.id || !isOnline}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors ${!isOnline ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <>
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            disabled={loadingId === booking.id || !isOnline}
                            className={`px-3 py-1.5 rounded text-sm transition-colors ${!isOnline ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                          >
                            Mark Completed
                          </button>
                          <button 
                            onClick={() => {
                              if(window.confirm('Cancel this confirmed booking?')) {
                                updateBookingStatus(booking.id, 'cancelled');
                              }
                            }}
                            disabled={loadingId === booking.id || !isOnline}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors ${!isOnline ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </>
                      )}

                      <button 
                        onClick={() => deleteBooking(booking.id)}
                        disabled={loadingId === booking.id || !isOnline}
                        className={`p-1.5 rounded transition-colors ml-2 ${!isOnline ? 'text-slate-400 cursor-not-allowed' : 'text-red-500 hover:bg-red-50'}`}
                        title="Delete Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <ManualBookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleManualBooking}
        roomTypes={roomTypes}
      />
    </div>
  );
};
