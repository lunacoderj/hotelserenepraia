import React, { useState } from 'react';
import { RoomType } from '../../types';

interface Props {
  room: RoomType;
  onChange: (updates: Partial<RoomType>) => void;
}

export const GeneralSettingsForm = ({ room, onChange }: Props) => {
  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amenities = e.target.value.split(',').map(a => a.trim()).filter(Boolean);
    onChange({ amenities });
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-navy/5 shadow-sm space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-navy-500 mb-1">Room Title</label>
          <input
            type="text"
            value={room.title}
            onChange={e => onChange({ title: e.target.value })}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-navy-500 mb-1">Subtitle (Optional)</label>
          <input
            type="text"
            value={room.subtitle || ''}
            onChange={e => onChange({ subtitle: e.target.value })}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-navy-500 mb-1">Description</label>
          <textarea
            value={room.description}
            onChange={e => onChange({ description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50 resize-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">Capacity (Max Persons)</label>
          <input
            type="number"
            value={room.capacity}
            onChange={e => onChange({ capacity: parseInt(e.target.value) || 2 })}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">Bathrooms</label>
          <input
            type="number"
            value={room.bathrooms}
            onChange={e => onChange({ bathrooms: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">Bed Configuration</label>
          <input
            type="text"
            value={room.beds}
            onChange={e => onChange({ beds: e.target.value })}
            placeholder="e.g. 1 King Bed, 1 Sofa Bed"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">Room Area</label>
          <input
            type="text"
            value={room.area}
            onChange={e => onChange({ area: e.target.value })}
            placeholder="e.g. 45 sqm"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-navy-500 mb-1">Amenities (Comma separated)</label>
          <input
            type="text"
            value={room.amenities.join(', ')}
            onChange={handleAmenitiesChange}
            placeholder="e.g. Free Wi-Fi, Smart TV, AC"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
          />
        </div>
      </div>
    </div>
  );
};
