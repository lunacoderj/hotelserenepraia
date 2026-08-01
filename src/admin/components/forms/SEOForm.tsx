import React from 'react';
import { RoomType } from '../../types';

interface Props {
  room: RoomType;
  onChange: (updates: Partial<RoomType>) => void;
}

export const SEOForm = ({ room, onChange }: Props) => {
  return (
    <div className="p-6 bg-white rounded-xl border border-navy/5 shadow-sm space-y-6">
      <div>
        <h3 className="font-display text-lg text-navy mb-4">SEO & URL Configuration</h3>
        <p className="text-sm text-navy-500/70 mb-6">Manage how this room type appears in search engines and its URL structure.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">URL Slug</label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm">
              hotelserenepraia.com/rooms/
            </span>
            <input
              type="text"
              value={room.seoSlug || ''}
              onChange={e => onChange({ seoSlug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              className="flex-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-none rounded-r-md focus:outline-none focus:border-gold/50"
              placeholder="e.g. ocean-suite"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">SEO Title</label>
          <input
            type="text"
            value={room.seoTitle || ''}
            onChange={e => onChange({ seoTitle: e.target.value })}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50"
            placeholder="e.g. Luxury Ocean Suite | Hotel Serene Praia"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-500 mb-1">SEO Description</label>
          <textarea
            value={room.seoDescription || ''}
            onChange={e => onChange({ seoDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold/50 resize-none"
            placeholder="e.g. Book our luxurious ocean suite with panoramic views..."
          />
        </div>
      </div>
    </div>
  );
};
