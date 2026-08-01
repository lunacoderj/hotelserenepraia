import React, { useState } from 'react';
import { RoomType, RoomInventory, RoomStatus } from '../types';
import { useRoomStore } from '../stores/useRoomStore';
import { supabase } from '../utils/supabaseClient';
import { Plus, Trash2, Edit2, Save, X, Loader2 } from 'lucide-react';

interface Props {
  roomType: RoomType;
}

export const InventoryManager = ({ roomType }: Props) => {
  const { inventory, fetchInventory } = useRoomStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Form states
  const [roomNumber, setRoomNumber] = useState('');
  const [status, setStatus] = useState<RoomStatus>('Available');
  const [floor, setFloor] = useState<number>(1);

  const roomInventory = inventory.filter(i => i.roomTypeId === roomType.id);

  const handleAdd = async () => {
    if (!roomNumber) return;
    setLoadingId('new');
    try {
      const { error } = await supabase.from('inventory').insert({
        id: `rm-${Date.now()}`,
        room_number: roomNumber,
        room_type_id: roomType.id,
        status,
        floor
      });
      if (error) throw error;
      
      await fetchInventory();
      setIsAdding(false);
      setRoomNumber('');
    } catch (err) {
      console.error(err);
      alert("Failed to add room");
    } finally {
      setLoadingId(null);
    }
  };

  const handleUpdate = async (id: string, updates: any) => {
    setLoadingId(id);
    try {
      const { error } = await supabase.from('inventory').update(updates).eq('id', id);
      if (error) throw error;
      await fetchInventory();
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update room");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this room?")) return;
    setLoadingId(id);
    try {
      const { error } = await supabase.from('inventory').delete().eq('id', id);
      if (error) throw error;
      await fetchInventory();
    } catch (err) {
      console.error(err);
      alert("Failed to delete room");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusColor = (s: RoomStatus) => {
    switch (s) {
      case 'Available': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Occupied': return 'bg-red-100 text-red-800 border-red-200';
      case 'Reserved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cleaning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Blocked': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-navy/5 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-display text-lg text-navy mb-1">Physical Inventory</h3>
          <p className="text-sm text-navy-500/70">Manage the actual physical rooms belonging to this room type.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-navy text-pearl px-4 py-2 rounded-md hover:bg-gold transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Physical Room
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-navy/10 text-xs uppercase tracking-widest text-navy-500/70">
              <th className="py-3 px-4 font-medium">Room No.</th>
              <th className="py-3 px-4 font-medium">Floor</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {isAdding && (
              <tr className="bg-slate-50/50">
                <td className="py-3 px-4">
                  <input type="text" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} placeholder="e.g. 101" className="w-full px-2 py-1 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-gold/50" />
                </td>
                <td className="py-3 px-4">
                  <input type="number" value={floor} onChange={e => setFloor(parseInt(e.target.value))} className="w-16 px-2 py-1 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-gold/50" />
                </td>
                <td className="py-3 px-4">
                  <select value={status} onChange={e => setStatus(e.target.value as RoomStatus)} className="px-2 py-1 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-gold/50">
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Cleaning">Cleaning</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={handleAdd} disabled={loadingId === 'new'} className="p-1.5 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 transition-colors">
                      {loadingId === 'new' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setIsAdding(false)} className="p-1.5 bg-slate-50 text-slate-500 rounded hover:bg-slate-100 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {roomInventory.map(room => (
              <tr key={room.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-navy">
                  {editingId === room.id ? (
                    <input type="text" defaultValue={room.roomNumber} id={`num-${room.id}`} className="w-full px-2 py-1 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-gold/50" />
                  ) : (
                    room.roomNumber
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-navy-500">
                  {editingId === room.id ? (
                    <input type="number" defaultValue={room.floor} id={`floor-${room.id}`} className="w-16 px-2 py-1 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-gold/50" />
                  ) : (
                    `Floor ${room.floor}`
                  )}
                </td>
                <td className="py-3 px-4">
                  {editingId === room.id ? (
                    <select defaultValue={room.status} id={`status-${room.id}`} className="px-2 py-1 text-sm bg-white border border-slate-200 rounded focus:outline-none focus:border-gold/50">
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  ) : (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    {editingId === room.id ? (
                      <>
                        <button 
                          onClick={() => {
                            const n = (document.getElementById(`num-${room.id}`) as HTMLInputElement).value;
                            const f = (document.getElementById(`floor-${room.id}`) as HTMLInputElement).value;
                            const s = (document.getElementById(`status-${room.id}`) as HTMLSelectElement).value;
                            handleUpdate(room.id, { room_number: n, floor: parseInt(f), status: s });
                          }}
                          disabled={loadingId === room.id}
                          className="p-1.5 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100 transition-colors"
                        >
                          {loadingId === room.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 bg-slate-50 text-slate-500 rounded hover:bg-slate-100 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditingId(room.id)} className="p-1.5 text-navy-500/50 hover:text-gold transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(room.id)} className="p-1.5 text-navy-500/50 hover:text-red-500 transition-colors">
                          {loadingId === room.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {roomInventory.length === 0 && !isAdding && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-navy-500/50 text-sm">
                  No physical rooms added for this type yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
