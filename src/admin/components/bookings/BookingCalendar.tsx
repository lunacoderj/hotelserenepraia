import React, { useMemo, useState } from 'react';
import { Booking, RoomType } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingCalendarProps {
  bookings: Booking[];
  roomTypes: RoomType[];
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings, roomTypes }) => {
  const [hoverData, setHoverData] = useState<{ dateString: string, bookings: Booking[], x: number, y: number, width: number } | null>(null);

  // Close tooltip on scroll
  React.useEffect(() => {
    const handleScroll = () => setHoverData(null);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  // Generate 30 days from today
  const days = useMemo(() => {
    const arr = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Format as YYYY-MM-DD local time
      const dateString = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      arr.push({ date: d, dateString });
    }
    return arr;
  }, []);

  const getBookingsForDay = (dateString: string) => {
    return bookings.filter(b => 
      b.status !== 'cancelled' && 
      b.checkIn <= dateString && 
      b.checkOut > dateString
    );
  };

  const getRoomImage = (roomTypeId: string) => {
    const room = roomTypes.find(r => r.id === roomTypeId);
    if (!room) return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&h=150&fit=crop';
    return room.images?.find((img: { isFeatured?: boolean, url: string }) => img.isFeatured)?.url || room.images?.[0]?.url;
  };

  const getRoomName = (roomTypeId: string) => {
    return roomTypes.find(r => r.id === roomTypeId)?.title || 'Unknown Room';
  };

  return (
    <div className="bg-white rounded-xl border border-navy/5 shadow-sm p-6 mb-8 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-heading-sm text-navy">30-Day Availability Overview</h2>
        <div className="flex gap-4 text-xs text-navy-500/70 font-medium">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200"></div> Available</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gold"></div> Booked</div>
        </div>
      </div>

      {/* Responsive horizontal scroll for smaller screens */}
      <div className="overflow-x-auto pb-4">
        <div className="grid grid-cols-7 gap-3 min-w-[700px]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-bold uppercase tracking-widest text-navy-500/50 pb-2">
              {day}
            </div>
          ))}

          {/* Padding for first day of the week */}
          {Array.from({ length: days[0].date.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24 rounded-xl bg-slate-50/50 border border-dashed border-slate-200"></div>
          ))}

          {days.map(({ date, dateString }, index) => {
            const dayBookings = getBookingsForDay(dateString);
            const isToday = index === 0;

            return (
              <div 
                key={dateString}
                className={`relative h-24 rounded-xl border p-2 transition-all duration-300 flex flex-col items-center justify-center group ${
                  isToday ? 'bg-gold/5 border-gold/30' : 'bg-white border-navy/10 hover:border-gold/50 hover:shadow-md'
                } ${hoverData?.dateString === dateString ? 'z-50 border-gold/50 shadow-md' : 'z-10'}`}
                onMouseEnter={(e) => {
                  if (dayBookings.length > 0) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoverData({ dateString, bookings: dayBookings, x: rect.left, y: rect.top, width: rect.width });
                  }
                }}
                onMouseLeave={() => setHoverData(null)}
              >
                <span className={`absolute top-2 left-2 text-xs font-bold ${isToday ? 'text-gold' : 'text-navy-500/50'}`}>
                  {date.getDate()}
                </span>
                <span className="absolute top-2 right-2 text-[8px] uppercase tracking-wider text-navy-500/30">
                  {date.toLocaleString('default', { month: 'short' })}
                </span>

                <div className="mt-4 flex items-center justify-center w-full h-full relative">
                  {dayBookings.length === 1 && (
                    <div className="relative pointer-events-none">
                      <img 
                        src={getRoomImage(dayBookings[0].roomTypeId)} 
                        alt="Booked Room" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-gold shadow-sm"
                      />
                    </div>
                  )}

                  {dayBookings.length > 1 && (
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer">
                      +{dayBookings.length}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Position Hover Popover for Multiple Bookings */}
      <AnimatePresence>
        {hoverData && (
          <div 
            className="fixed z-[9999] pointer-events-none"
            style={{ 
              top: hoverData.y - 12, 
              left: hoverData.x + hoverData.width / 2, 
              transform: 'translate(-50%, -100%)' 
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-navy backdrop-blur-xl p-3 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 min-w-[200px]"
            >
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-navy border-b border-r border-white/10 rotate-45"></div>
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-widest text-gold mb-2 border-b border-white/10 pb-2">
                  {hoverData.dateString} • {hoverData.bookings.length} Bookings
                </p>
                <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1 pointer-events-auto">
                  {hoverData.bookings.map((b, i) => {
                    const checkInDate = new Date(b.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    const checkOutDate = new Date(b.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                    
                    return (
                      <div key={b.id + i} className="flex items-center gap-3">
                        <img 
                          src={getRoomImage(b.roomTypeId)} 
                          alt="Room" 
                          className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate w-32">{getRoomName(b.roomTypeId)}</p>
                          <div className="flex items-center justify-between gap-2 mt-0.5">
                            <p className="text-[9px] text-white/70 truncate">{b.guestName || 'Blocked'}</p>
                            <p className="text-[9px] text-gold shrink-0">{checkInDate} - {checkOutDate}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
