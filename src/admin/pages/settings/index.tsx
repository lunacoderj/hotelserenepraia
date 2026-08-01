import React, { useState } from 'react';
import { seedSupabaseDatabase } from '../../utils/seedSupabase';
import { Database, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const Settings = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSeed = async () => {
    if (!window.confirm("Are you sure? This will insert the original 21 rooms and room types into your Supabase database. If they already exist, it will update them.")) {
      return;
    }

    setIsSeeding(true);
    setSeedResult('idle');
    try {
      const success = await seedSupabaseDatabase();
      setSeedResult(success ? 'success' : 'error');
    } catch (error) {
      setSeedResult('error');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-display text-heading-md text-navy mb-1">System Settings</h1>
        <p className="text-sm text-navy-500/70">Manage your database and administrative preferences</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-navy/5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-slate-50 text-gold rounded-lg shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg text-navy mb-2">Database Initialization</h2>
            <p className="text-sm text-navy-500/70 mb-4 leading-relaxed">
              Use this tool to populate your Supabase database with the default Room Types and the 21 physical rooms (Inventory) for Hotel Serene Praia. You should only need to do this once after creating your tables.
            </p>
            
            <button
              onClick={handleSeed}
              disabled={isSeeding}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                isSeeding 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-navy text-pearl hover:bg-gold'
              }`}
            >
              {isSeeding ? 'Seeding Database...' : 'Seed Database with Default Data'}
            </button>

            {seedResult === 'success' && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-md flex items-center gap-3 text-emerald-700 text-sm">
                <CheckCircle2 className="w-5 h-5" />
                Database seeded successfully! You can now view your rooms and inventory.
              </div>
            )}

            {seedResult === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-md flex items-center gap-3 text-red-700 text-sm">
                <AlertTriangle className="w-5 h-5" />
                An error occurred while seeding. Please ensure your Supabase keys are correct in the .env file and you have run the SQL schema.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
