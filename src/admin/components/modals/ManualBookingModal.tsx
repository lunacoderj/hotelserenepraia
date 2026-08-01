import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { RoomType } from '../../types';

interface ManualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookingData: any) => Promise<void>;
  roomTypes: RoomType[];
}

export const ManualBookingModal: React.FC<ManualBookingModalProps> = ({ isOpen, onClose, onSubmit, roomTypes }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    guestName: 'Admin Block',
    guestPhone: '0000000000',
    roomTypeId: roomTypes[0]?.id || '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: 1,
    children: 0,
    numberOfRooms: 1,
    status: 'confirmed',
    specialRequests: 'Manually blocked by Admin',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to create manual booking.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-navy-500/50 hover:text-navy transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display text-heading-sm text-navy mb-6">Create Manual Booking / Block</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-navy-500 mb-1">Guest Name / Block Label</label>
              <input
                type="text"
                required
                value={formData.guestName}
                onChange={e => setFormData({ ...formData, guestName: e.target.value })}
                className="w-full px-3 py-2 border border-navy/10 rounded-lg focus:outline-none focus:border-gold text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-500 mb-1">Room Type</label>
              <select
                required
                value={formData.roomTypeId}
                onChange={e => setFormData({ ...formData, roomTypeId: e.target.value })}
                className="w-full px-3 py-2 border border-navy/10 rounded-lg focus:outline-none focus:border-gold text-sm bg-white"
              >
                {roomTypes.map(rt => (
                  <option key={rt.id} value={rt.id}>{rt.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-navy-500 mb-1">Check-in Date</label>
              <input
                type="date"
                required
                value={formData.checkIn}
                onChange={e => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full px-3 py-2 border border-navy/10 rounded-lg focus:outline-none focus:border-gold text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-500 mb-1">Check-out Date</label>
              <input
                type="date"
                required
                value={formData.checkOut}
                onChange={e => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full px-3 py-2 border border-navy/10 rounded-lg focus:outline-none focus:border-gold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-navy-500 mb-1">No. of Rooms</label>
              <input
                type="number"
                min="1"
                required
                value={formData.numberOfRooms}
                onChange={e => setFormData({ ...formData, numberOfRooms: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-navy/10 rounded-lg focus:outline-none focus:border-gold text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-500 mb-1">Adults</label>
              <input
                type="number"
                min="1"
                required
                value={formData.adults}
                onChange={e => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-navy/10 rounded-lg focus:outline-none focus:border-gold text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy-500 mb-1">Children</label>
              <input
                type="number"
                min="0"
                required
                value={formData.children}
                onChange={e => setFormData({ ...formData, children: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-navy/10 rounded-lg focus:outline-none focus:border-gold text-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-navy/5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-navy-500 hover:text-navy transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-gold hover:bg-gold-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Block / Save Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
