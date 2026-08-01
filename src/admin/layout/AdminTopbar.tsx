import React from 'react';
import { User, Download } from 'lucide-react';
import { useInstallApp } from '../../hooks/useInstallApp';

export const AdminTopbar = () => {
  const { isInstallable, installApp } = useInstallApp();

  return (
    <header className="h-16 bg-white border-b border-navy/5 flex items-center justify-end px-8 sticky top-0 z-10 gap-4">
      {isInstallable && (
        <button
          onClick={installApp}
          className="flex items-center gap-2 bg-navy text-pearl px-4 py-2 rounded-md text-sm font-medium hover:bg-navy/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Install App
        </button>
      )}
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-pearl">
          <User className="w-4 h-4" />
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-navy leading-tight">Admin User</p>
          <p className="text-xs text-navy-500/70">General Manager</p>
        </div>
      </div>
    </header>
  );
};
