import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoomStore } from '../../stores/useRoomStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';
import { RoomType } from '../../types';

import { ImageGallery } from '../../components/gallery/ImageGallery';
import { GeneralSettingsForm } from '../../components/forms/GeneralSettingsForm';
import { PricingForm } from '../../components/forms/PricingForm';
import { SEOForm } from '../../components/forms/SEOForm';
import { InventoryManager } from '../../components/InventoryManager';

import { supabase } from '../../utils/supabaseClient';
import { Booking } from '../../types';

const GalleryTab = ({ room, onUpdate }: { room: RoomType, onUpdate: (images: any) => void }) => (
  <div className="p-6 bg-white rounded-xl border border-navy/5 shadow-sm">
    <ImageGallery images={room.images} onUpdate={onUpdate} />
  </div>
);

const BookingStatusTab = ({ room }: { room: RoomType }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { inventory } = useRoomStore();
  const totalRooms = inventory.filter(r => r.roomTypeId === room.id).length;

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await supabase.from('bookings')
        .select('*')
        .eq('room_type_id', room.id)
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
  }, [room.id]);

  const days = React.useMemo(() => {
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
    <div className="p-6 bg-white rounded-xl border border-navy/5 shadow-sm">
      <h3 className="font-display text-lg text-navy mb-6">30-Day Booking Status</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {days.map(({ date, dateString }) => {
          const dayBookings = bookings.filter(b => b.checkIn <= dateString && b.checkOut > dateString);
          const bookedCount = dayBookings.reduce((sum, b) => sum + (b.numberOfRooms || 1), 0);
          const isFull = bookedCount >= totalRooms;
          const isPartial = bookedCount > 0 && bookedCount < totalRooms;

          return (
            <div 
              key={dateString}
              className={`p-4 rounded-xl border flex flex-col justify-between h-28 transition-all ${
                isFull 
                  ? 'bg-red-50 border-red-200 shadow-sm' 
                  : isPartial 
                    ? 'bg-amber-50 border-amber-200' 
                    : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${isFull ? 'text-red-700' : isPartial ? 'text-amber-700' : 'text-slate-500'}`}>
                    {date.toLocaleDateString(undefined, { weekday: 'short' })}
                  </p>
                  <p className={`text-lg font-display ${isFull ? 'text-red-900' : isPartial ? 'text-amber-900' : 'text-slate-700'}`}>
                    {date.getDate()} {date.toLocaleDateString(undefined, { month: 'short' })}
                  </p>
                </div>
                {bookedCount > 0 && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isFull ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'
                  }`}>
                    {bookedCount}
                  </div>
                )}
              </div>
              
              <div className="mt-auto">
                {bookedCount > 0 ? (
                  <p className={`text-xs font-medium truncate ${isFull ? 'text-red-600' : 'text-amber-700'}`}>
                    {totalRooms - bookedCount} left
                  </p>
                ) : (
                  <p className="text-xs font-medium text-slate-400">Available</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RoomDetails = () => {
  const { roomType } = useParams<{ roomType: string }>();
  const navigate = useNavigate();
  const { roomTypes, fetchRoomTypes } = useRoomStore();
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (roomTypes.length === 0) {
      fetchRoomTypes();
    }
  }, [roomTypes.length, fetchRoomTypes]);

  const room = roomTypes.find(r => r.id === roomType);

  if (!room) {
    return <div className="p-8">Loading...</div>;
  }

  const handleImageUpdate = (newImages: any) => {
    // This updates the local store optimistic state immediately
    // In a full app, this would also call a Supabase update on the room_type row
    useRoomStore.getState().updateRoomType(room.id, { images: newImages });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/rooms')}
            className="p-2 hover:bg-navy/5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-navy" />
          </button>
          <div>
            <h1 className="font-display text-heading-md text-navy mb-1">{room.title}</h1>
            <p className="text-sm text-navy-500/70">Manage settings, pricing, and inventory for this room type</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8 bg-transparent border-b border-navy/10 rounded-none h-auto p-0 gap-8 justify-start">
          <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 text-sm tracking-wide">General</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 text-sm tracking-wide">Gallery</TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 text-sm tracking-wide">Inventory</TabsTrigger>
          <TabsTrigger value="pricing" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 text-sm tracking-wide">Pricing</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 text-sm tracking-wide">SEO</TabsTrigger>
          <TabsTrigger value="status" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3 text-sm tracking-wide">Status</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="general">
            <GeneralSettingsForm room={room} onChange={(updates) => useRoomStore.getState().updateRoomType(room.id, updates)} />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryTab room={room} onUpdate={handleImageUpdate} />
          </TabsContent>
          <TabsContent value="inventory">
            <InventoryManager roomType={room} />
          </TabsContent>
          <TabsContent value="pricing">
            <PricingForm room={room} onChange={(updates) => useRoomStore.getState().updateRoomType(room.id, updates)} />
          </TabsContent>
          <TabsContent value="seo">
            <SEOForm room={room} onChange={(updates) => useRoomStore.getState().updateRoomType(room.id, updates)} />
          </TabsContent>
          <TabsContent value="status">
            <BookingStatusTab room={room} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
