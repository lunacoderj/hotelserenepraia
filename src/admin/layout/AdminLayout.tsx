import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { supabase } from '../utils/supabaseClient';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export const AdminLayout = () => {
  const [toast, setToast] = useState<{message: string, guest: string} | null>(null);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    // Listen for new bookings
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          const newBooking = payload.new;
          setToast({
            message: `New booking request received!`,
            guest: newBooking.guest_name
          });
          
          // Auto-hide toast after 5 seconds
          setTimeout(() => setToast(null), 5000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-body relative">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <AdminTopbar />
        
        {!isOnline && (
          <div className="bg-amber-100 text-amber-800 px-6 py-2.5 flex items-center gap-3 text-sm font-medium border-b border-amber-200">
            <WifiOff className="w-4 h-4" />
            <p>You are currently offline. Viewing cached data. Modifications are disabled.</p>
          </div>
        )}

        <main className="flex-1 p-8 overflow-auto relative">
          <Outlet />
        </main>
      </div>

      {/* Real-time Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 bg-navy text-pearl px-6 py-4 rounded-xl shadow-2xl border border-gold/20 flex items-center gap-4 min-w-[300px]"
          >
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-gold animate-bounce" />
            </div>
            <div>
              <p className="font-display text-sm text-gold mb-0.5">{toast.message}</p>
              <p className="text-sm font-medium">{toast.guest}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="ml-auto text-pearl/50 hover:text-pearl transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
