import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, EmptyState, Modal, Field, inr } from '../../components/UI.jsx';

const blankRoom = { roomNumber: '', type: 'triple', floor: 1, price: 6000, capacity: 3 };
const bedStatuses = ['available', 'occupied', 'maintenance'];
const nextStatus = (s) => bedStatuses[(bedStatuses.indexOf(s) + 1) % bedStatuses.length];
const bedTint = {
  available: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  occupied: 'bg-rose-50 text-rose-600 border-rose-200',
  maintenance: 'bg-amber-50 text-amber-600 border-amber-200',
};

const RoomsBeds = () => {
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blankRoom);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [r, b] = await Promise.all([api.get('/rooms'), api.get('/beds')]);
      setRooms(r.data); setBeds(b.data);
    } catch { setRooms([]); setBeds([]); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const addRoom = async () => {
    setSaving(true);
    try {
      await api.post('/rooms', { ...form, floor: Number(form.floor), price: Number(form.price), capacity: Number(form.capacity) });
      setOpen(false); setForm(blankRoom); load();
    } finally { setSaving(false); }
  };

  const cycleBed = async (bed) => {
    const status = nextStatus(bed.status);
    await api.put(`/beds/${bed._id}`, { status });
    setBeds((bs) => bs.map((b) => (b._id === bed._id ? { ...b, status } : b)));
  };

  const bedsFor = (roomId) => beds.filter((b) => (b.room?._id || b.room) === roomId);

  return (
    <Reveal>
      <PageHead title="Rooms & Beds" subtitle="Manage rooms and live bed availability.">
        <button onClick={() => setOpen(true)} className="btn btn-primary"><FiPlus /> Add Room</button>
      </PageHead>

      {loading ? <Spinner /> : rooms.length === 0 ? <EmptyState label="No rooms yet." /> : (
        <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <Item key={room._id}>
              <Panel className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">Room {room.roomNumber}</h3>
                    <p className="text-xs capitalize text-slate-400">{room.type} sharing · {inr(room.price)}/mo</p>
                  </div>
                  <span className="chip">{room.capacity} beds</span>
                </div>
                <div className="mt-4 space-y-2">
                  {bedsFor(room._id).length === 0 && <p className="text-xs text-slate-400">No beds configured.</p>}
                  {bedsFor(room._id).map((bed) => (
                    <button key={bed._id} onClick={() => cycleBed(bed)}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${bedTint[bed.status]}`}>
                      <span className="font-medium text-slate-700">Bed {bed.bedNumber}</span>
                      <span className="text-xs font-semibold capitalize">{bed.status}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-slate-400">Tap a bed to cycle its status.</p>
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Room">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Room Number"><input className="input" value={form.roomNumber} onChange={set('roomNumber')} placeholder="105" /></Field>
          <Field label="Type">
            <select className="input" value={form.type} onChange={set('type')}>
              <option value="single">Single</option><option value="double">Double</option><option value="triple">Triple</option>
            </select>
          </Field>
          <Field label="Floor"><input type="number" className="input" value={form.floor} onChange={set('floor')} /></Field>
          <Field label="Price (₹/month)"><input type="number" className="input" value={form.price} onChange={set('price')} /></Field>
          <Field label="Capacity (beds)"><input type="number" className="input" value={form.capacity} onChange={set('capacity')} /></Field>
        </div>
        <p className="mt-3 text-xs text-slate-400">Note: beds are seeded automatically. Use the seed script or add beds via API for new rooms.</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="btn btn-ghost">Cancel</button>
          <button onClick={addRoom} disabled={saving} className="btn btn-primary disabled:opacity-60">{saving ? 'Saving…' : 'Add Room'}</button>
        </div>
      </Modal>
    </Reveal>
  );
};

export default RoomsBeds;
