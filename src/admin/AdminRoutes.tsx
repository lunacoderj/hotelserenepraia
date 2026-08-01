import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layout/AdminLayout';

// Placeholder Pages
import { Dashboard } from './pages/dashboard';
import { Rooms } from './pages/rooms';
import { RoomDetails } from './pages/rooms/RoomDetails';
import { Pricing } from './pages/pricing';
import { Bookings } from './pages/bookings';
import { Settings } from './pages/settings';

import { Login } from './pages/auth/Login';
import { supabase } from './utils/supabaseClient';

const Analytics = () => <div className="p-8 text-navy font-display text-heading-sm">Analytics</div>;

export const AdminRoutes = () => {
  const [session, setSession] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-navy flex items-center justify-center text-pearl">Loading...</div>;
  }

  if (!session) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:roomType" element={<RoomDetails />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
};
