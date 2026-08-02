import React, { useMemo, useState } from 'react';
import { Booking, RoomType } from '../../types';

interface MiniCalendarProps {
  typeId: string;
  bookings: Booking[];
  totalInventory: number;
  onHover?: (count: number) => void;
  showLabels?: boolean;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({ 
  typeId, 
  bookings, 
  totalInventory,
  onHover,
  showLabels = true
}) => {
  const formatSafeDate = (d: string | undefined | null) => {
    if (!d) return 'N/A';
    const date = new Date(d);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString(undefined, {month: 'numeric', day: 'numeric'});
  };
  const days = useMemo(() => {
    const arr = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateString = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      arr.push({ date: d, dateString });
    }
    return arr;
  }, []);

  return (
    <div className="mt-4 mb-2">
      {showLabels && (
        <div className="flex items-center gap-4 mb-2">
          <p className="text-[10px] uppercase tracking-widest text-navy-500/50 font-medium">30-Day Outlook</p>
          <div className="flex gap-2">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200" /><span className="text-[9px] text-navy-500/50">Available</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gold" /><span className="text-[9px] text-navy-500/50">Partial</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[9px] text-navy-500/50">Full</span></div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {days.map(({ dateString }) => {
          const dayBookings = bookings.filter(b => b.roomTypeId === typeId && b.checkIn <= dateString && b.checkOut > dateString);
          const bookedCount = dayBookings.reduce((sum, b) => sum + (b.numberOfRooms || 1), 0);
          const isBooked = bookedCount >= totalInventory;
          const isPartiallyBooked = bookedCount > 0 && bookedCount < totalInventory;

          return (
            <div 
              key={dateString} 
              className="relative group"
              onMouseEnter={() => onHover && onHover(bookedCount)}
              onMouseLeave={() => onHover && onHover(0)}
            >
              <div 
                className={`w-4 h-4 rounded-full cursor-pointer transition-all border border-black/5 hover:scale-110 ${
                  isBooked ? 'bg-red-500' : isPartiallyBooked ? 'bg-gold' : 'bg-slate-200'
                }`}
              />
              {dayBookings.length > 0 && (
                <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white text-[10px] px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-xl border border-white/10">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-navy rotate-45 border-b border-r border-white/10"></div>
                  <p className="font-bold text-gold mb-1 border-b border-white/10 pb-1">
                    {isNaN(new Date(dateString).getTime()) ? 'Invalid Date' : new Date(dateString).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <div className="flex flex-col gap-1 mt-1">
                    {dayBookings.map((b, i) => (
                      <div key={i} className="flex justify-between gap-4">
                        <span className="text-white/90">{b.guestName ? b.guestName.split(' ')[0] : 'Blocked'}</span>
                        <span className="text-white/50">{formatSafeDate(b.checkIn)} - {formatSafeDate(b.checkOut)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
