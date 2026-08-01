import React, { useEffect } from 'react';
import { useRoomStore } from '../../stores/useRoomStore';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, LayoutDashboard, Calendar as CalendarIcon } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { Booking } from '../../types';
import { MiniCalendar } from '../../components/bookings/MiniCalendar';

export const Rooms = () => {
  const { roomTypes, fetchRoomTypes, inventory, fetchInventory, isLoading } = useRoomStore();
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const navigate = useNavigate();
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const basePath = isLocal ? '/admin' : '';

  useEffect(() => {
    fetchRoomTypes();
    fetchInventory();
    
    const fetchBookings = async () => {
      const { data } = await supabase.from('bookings').select('*').in('status', ['pending', 'confirmed']);
      if (data) {
        setBookings(data.map(b => ({
          id: b.id,
          guestName: b.guest_name,
          roomTypeId: b.room_type_id,
          checkIn: b.check_in,
          checkOut: b.check_out,
          numberOfRooms: b.number_of_rooms,
          status: b.status
        })) as Booking[]);
      }
    };
    fetchBookings();
  }, [fetchRoomTypes, fetchInventory]);

  if (isLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-48 bg-slate-200 rounded-xl w-full max-w-md"></div>
    </div>;
  }

  // Calculate stats for each room type
  const getStats = (typeId: string) => {
    const rooms = inventory.filter(i => i.roomTypeId === typeId);
    const physicallyAvailable = rooms.filter(r => r.status === 'Available').length;
    const baseOccupied = rooms.filter(r => r.status === 'Occupied').length;
    
    // Calculate how many are booked TODAY
    const today = new Date().toISOString().split('T')[0];
    const todayBookingsCount = bookings.filter(b => b.roomTypeId === typeId && b.checkIn <= today && b.checkOut > today)
      .reduce((sum, b) => sum + (b.numberOfRooms || 1), 0);
      
    return {
      total: rooms.length,
      available: Math.max(0, physicallyAvailable - todayBookingsCount),
      occupied: baseOccupied + Math.min(physicallyAvailable, todayBookingsCount),
    };
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-heading-md text-navy mb-1">Room Types</h1>
          <p className="text-sm text-navy-500/70">Manage your hotel's room categories and configurations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {roomTypes.map(type => {
          const stats = getStats(type.id);
          const featuredImage = type.images.find(img => img.isFeatured)?.url || type.images[0]?.url;

          return (
            <div 
              key={type.id}
              onClick={() => navigate(`${basePath}/rooms/${type.id}`)}
              className="bg-white rounded-xl border border-navy/5 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={featuredImage} 
                  alt={type.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="font-display text-heading-sm text-pearl leading-tight">{type.title}</h3>
                </div>
                
                {/* Mini Calendar Overlay on Hover */}
                <div className="absolute inset-0 bg-navy/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                    <CalendarIcon className="w-4 h-4 text-gold" />
                    <span className="text-white font-medium text-sm">30-Day Outlook</span>
                  </div>
                  <MiniCalendar typeId={type.id} bookings={bookings} totalInventory={stats.total} showLabels={false} />
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-50 p-3 rounded-lg border border-navy/5">
                  <div className="text-center">
                    <p className="text-[10px] uppercase text-navy-500/60 mb-1 tracking-wider">Total</p>
                    <p className="font-display text-lg text-navy leading-none">{stats.total}</p>
                  </div>
                  <div className="text-center border-l border-navy/10">
                    <p className="text-[10px] uppercase text-emerald-600/70 mb-1 tracking-wider">Avail</p>
                    <p className="font-display text-lg text-emerald-600 leading-none">{stats.available}</p>
                  </div>
                  <div className="text-center border-l border-navy/10">
                    <p className="text-[10px] uppercase text-red-500/70 mb-1 tracking-wider">Occ</p>
                    <p className="font-display text-lg text-red-500 leading-none">{stats.occupied}</p>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center text-sm text-navy-500 border-b border-navy/5 pb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold" />
                      <span>Capacity</span>
                    </div>
                    <span className="font-medium text-navy">Up to {type.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-navy-500">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-gold" />
                      <span>Base Price</span>
                    </div>
                    <span className="font-display text-gold text-lg">₹{type.pricing.standard}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
