import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BedDouble, CalendarDays, BarChart3, Settings, LogOut } from 'lucide-react';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const basePath = isLocal ? '/admin' : '';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: `${basePath}/dashboard` },
  { label: 'Bookings', icon: CalendarDays, path: `${basePath}/bookings` },
  { label: 'Rooms', icon: BedDouble, path: `${basePath}/rooms` },
  { label: 'Pricing', icon: BarChart3, path: `${basePath}/pricing` },
];

import { supabase } from '../utils/supabaseClient';

export const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <span className="font-display text-gold text-heading-sm tracking-wider">HOTEL SERENE</span>
      </div>
      
      <nav className="flex-1 py-8 flex flex-col gap-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-gold text-navy font-medium' 
                  : 'text-pearl/70 hover:bg-white/5 hover:text-pearl'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-body text-body-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-md text-red-400 hover:bg-red-400/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-body text-body-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};
