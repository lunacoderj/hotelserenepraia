import React from 'react';
import { RoomType } from '../../types';
import { IndianRupee } from 'lucide-react';

interface Props {
  room: RoomType;
  onChange: (updates: Partial<RoomType>) => void;
}

export const PricingForm = ({ room, onChange }: Props) => {
  const handlePriceChange = (key: keyof typeof room.pricing, value: string) => {
    const numValue = parseInt(value) || 0;
    onChange({
      pricing: {
        ...room.pricing,
        [key]: numValue
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-navy/5 shadow-sm space-y-6">
      <div>
        <h3 className="font-display text-lg text-navy mb-4">Pricing Strategy</h3>
        <p className="text-sm text-navy-500/70 mb-6">Set different rates for this room type. The frontend will display the standard or custom rate depending on offers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">Standard Rate</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee className="h-4 w-4 text-navy-500/50" />
            </div>
            <input
              type="number"
              value={room.pricing.standard}
              onChange={e => handlePriceChange('standard', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">Custom/Offer Rate (Optional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee className="h-4 w-4 text-gold/70" />
            </div>
            <input
              type="number"
              value={room.pricing.custom}
              onChange={e => handlePriceChange('custom', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gold/5 border border-gold/20 rounded-lg focus:outline-none focus:border-gold/50 text-navy"
            />
          </div>
          <p className="text-[10px] text-navy-500/60 mt-1 uppercase tracking-widest">Overrides standard rate if &gt; 0</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">Weekend Rate</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee className="h-4 w-4 text-navy-500/50" />
            </div>
            <input
              type="number"
              value={room.pricing.weekend}
              onChange={e => handlePriceChange('weekend', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">Holiday Rate</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee className="h-4 w-4 text-navy-500/50" />
            </div>
            <input
              type="number"
              value={room.pricing.holiday}
              onChange={e => handlePriceChange('holiday', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
