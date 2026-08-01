import React, { useEffect, useState } from 'react';
import { useRoomStore } from '../../stores/useRoomStore';
import { CalendarDays, BedDouble, CheckCircle2, AlertCircle, Wrench, Ban, Sparkles } from 'lucide-react';
import { StatCard } from '../../components/cards/StatCard';
import { RoomInventory, Booking } from '../../types';
import { supabase } from '../../utils/supabaseClient';
import { MiniCalendar } from '../../components/bookings/MiniCalendar';

const RoomTypeSection = ({ type, typeRooms, bookings }: { type: any, typeRooms: RoomInventory[], bookings: Booking[] }) => {
  const [highlightCount, setHighlightCount] = useState(0);

  const getStatusColor = (status: RoomInventory['status']) => {
    switch(status) {
      case 'Available': return 'bg-emerald-500 text-white';
      case 'Occupied': return 'bg-red-500 text-white';
      case 'Reserved': return 'bg-yellow-500 text-white';
      case 'Cleaning': return 'bg-blue-500 text-white';
      case 'Maintenance': return 'bg-slate-500 text-white';
      case 'Blocked': return 'bg-black text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  // Calculate today's bookings to override "Available" status if they are booked today
  const today = new Date().toISOString().split('T')[0];
  const todayBookingsCount = bookings.filter(b => b.roomTypeId === type.id && b.checkIn <= today && b.checkOut > today)
    .reduce((sum, b) => sum + (b.numberOfRooms || 1), 0);

  let availableConvertedToBooked = 0;

  return (
    <div className="mb-10 last:mb-0 pb-6 border-b border-navy/5 last:border-b-0">
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-display text-lg text-navy">{type.title}</h3>
        <span className="text-xs text-navy-500/70 font-medium">Total: {typeRooms.length}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {typeRooms.map((room, index) => {
          let displayStatus = room.status;
          // If room is physically available, but we have bookings today, mark some as Reserved
          if (displayStatus === 'Available' && availableConvertedToBooked < todayBookingsCount) {
            displayStatus = 'Reserved';
            availableConvertedToBooked++;
          }

          const isHighlighted = index < highlightCount;

          return (
            <div 
              key={room.id}
              className={`px-4 py-3 rounded-lg flex flex-col items-center justify-center cursor-pointer min-w-[80px] transition-all shadow-sm ${getStatusColor(displayStatus)} ${isHighlighted ? 'ring-4 ring-gold ring-offset-2 scale-110 z-10' : 'hover:opacity-80'}`}
            >
              <span className="font-display text-lg leading-none mb-1">{room.roomNumber}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-90">{displayStatus}</span>
            </div>
          );
        })}
      </div>
      
      <MiniCalendar typeId={type.id} bookings={bookings} totalInventory={typeRooms.length} onHover={setHighlightCount} />
    </div>
  );
};

export const Pricing = () => {
  const { inventory, fetchInventory, fetchRoomTypes, roomTypes, isLoading } = useRoomStore();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchInventory();
    fetchRoomTypes();
    
    // Fetch active bookings for the mini calendar
    const fetchBookings = async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .in('status', ['pending', 'confirmed']);
        
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
  }, [fetchInventory, fetchRoomTypes]);

  if (isLoading || inventory.length === 0 || roomTypes.length === 0) {
    return <div className="animate-pulse h-96 bg-slate-200 rounded-xl w-full"></div>;
  }

  const today = new Date().toISOString().split('T')[0];
  const totalBookedToday = bookings.filter(b => b.checkIn <= today && b.checkOut > today).reduce((sum, b) => sum + (b.numberOfRooms || 1), 0);
  const physicallyAvailable = inventory.filter(r => r.status === 'Available').length;
  
  const stats = {
    total: inventory.length,
    available: Math.max(0, physicallyAvailable - totalBookedToday),
    occupied: inventory.filter(r => r.status === 'Occupied').length,
    cleaning: inventory.filter(r => r.status === 'Cleaning').length,
    maintenance: inventory.filter(r => r.status === 'Maintenance').length,
    reserved: inventory.filter(r => r.status === 'Reserved').length + Math.min(physicallyAvailable, totalBookedToday),
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-heading-md text-navy mb-1">Pricing & Availability</h1>
          <p className="text-sm text-navy-500/70">Manage daily rates and room status</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Rooms" value={stats.total.toString()} icon={BedDouble} />
        <StatCard title="Available" value={stats.available.toString()} icon={CheckCircle2} />
        <StatCard title="Occupied" value={stats.occupied.toString()} icon={AlertCircle} />
        <StatCard title="Reserved" value={stats.reserved.toString()} icon={CalendarDays} />
        <StatCard title="Cleaning" value={stats.cleaning.toString()} icon={Sparkles} />
        <StatCard title="Maintenance" value={stats.maintenance.toString()} icon={Wrench} />
      </div>

      <div className="bg-white p-6 rounded-xl border border-navy/5 shadow-sm">
        <h2 className="font-display text-heading-sm text-navy mb-6">Inventory Grid</h2>
        
        {roomTypes.map(type => {
          const typeRooms = inventory.filter(r => r.roomTypeId === type.id);
          if(typeRooms.length === 0) return null;
          return <RoomTypeSection key={type.id} type={type} typeRooms={typeRooms} bookings={bookings} />;
        })}
      </div>
    </div>
  );
};


