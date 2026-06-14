import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import PageTransition from '../../components/PageTransition.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { roomFacilities, topServices } from '../../data/content.js';
import { IMAGES } from '../../data/galleryImages.js';
import api from '../../api/axios.js';
import { Modal, Field } from '../../components/UI.jsx';

const FILTERS = [
  { key: 'all', label: 'All Rooms' },
  { key: 'triple', label: 'Triple Sharing' },
  { key: 'double', label: 'Double Sharing' },
  { key: 'single', label: 'Single Room' },
];

const label = { single: 'Single Room', double: 'Double Sharing Room', triple: 'Triple Sharing Room' };

// Always-available fallback so the page works even if the API/DB has no room data.
const STATIC_ROOMS = [
  {
    id: 'single-1', type: 'single', price: 9000, image: IMAGES.singleRoom1.src, isAvailable: true,
    amenities: ['1 Bed', 'Attached Washroom', 'Study Table', 'Wardrobe'],
  },
  {
    id: 'single-2', type: 'single', price: 9000, image: IMAGES.singleRoom2.src, isAvailable: true,
    amenities: ['1 Bed', 'Attached Washroom', 'Study Table', 'Wardrobe'],
  },
  {
    id: 'double-1', type: 'double', price: 7500, image: IMAGES.doubleRoom1.src, isAvailable: true,
    amenities: ['2 Beds', 'Attached Washroom', 'Study Table', 'Wardrobe'],
  },
  {
    id: 'double-2', type: 'double', price: 7500, image: IMAGES.doubleRoom2.src, isAvailable: true,
    amenities: ['2 Beds', 'Attached Washroom', 'Study Table', 'Wardrobe'],
  },
  {
    id: 'triple-1', type: 'triple', price: 6000, image: IMAGES.tripleRoom1.src, isAvailable: true,
    amenities: ['3 Beds', 'Attached Washroom', 'Study Table', 'Wardrobe'],
  },
  {
    id: 'triple-2', type: 'triple', price: 6000, image: IMAGES.tripleRoom2.src, isAvailable: true,
    amenities: ['3 Beds', 'Attached Washroom', 'Study Table', 'Wardrobe'],
  },
];

const blankBooking = { name: '', email: '', phone: '', gender: 'male', roomType: 'single', college: '', message: '' };

const Rooms = () => {
  const [filter, setFilter] = useState('all');
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blankBooking);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/rooms')
      .then(({ data }) => { if (Array.isArray(data) && data.length) setRooms(data); })
      .catch(() => {});
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openBooking = (roomType) => {
    setForm({ ...blankBooking, roomType });
    setStatus('');
    setOpen(true);
  };

  const submitBooking = async () => {
    if (!form.name || !form.email || !form.phone) {
      setStatus('Please fill in your name, email and phone.');
      return;
    }
    setStatus('sending');
    try {
      await api.post('/bookings', form);
      setStatus('sent');
    } catch {
      setStatus('Could not send right now. Please call us instead.');
    }
  };

  // merge live API data (price/availability/amenities) with the static fallback
  // images so each room type shows its two photos, even if the API/DB has no rooms yet
  const byType = STATIC_ROOMS.map((base) => {
    const apiRoom = rooms.find((r) => r.type === base.type) || {};
    return {
      id: base.id,
      type: base.type,
      price: apiRoom.price ?? base.price,
      image: base.image,
      amenities: apiRoom.amenities?.length ? apiRoom.amenities : base.amenities,
      isAvailable: apiRoom.isAvailable ?? base.isAvailable,
    };
  });
  const shown = filter === 'all' ? byType : byType.filter((r) => r.type === filter);

  return (
    <PageTransition>
      <section className="container-x py-14">
        <Reveal>
          <h1 className="section-title">Our Rooms</h1>
          <p className="mt-2 max-w-xl text-slate-500">
            Choose the perfect room that suits your needs. All rooms are fully furnished and designed for your comfort.
          </p>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`chip px-4 py-2 ${filter === f.key ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Stagger key={filter} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <Item key={r.id} className="group card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-soft">
              <SmartImage src={r.image} alt={label[r.type]} aspect="aspect-[5/3]" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-900">{label[r.type]}</h3>
                  <span className={`chip px-2.5 py-1 text-xs ${r.isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {r.isAvailable ? 'Available' : 'Full'}
                  </span>
                </div>
                <p className="mt-1 text-2xl font-extrabold text-brand-600">
                  ₹{r.price?.toLocaleString('en-IN')} <span className="text-sm font-medium text-slate-400">/month</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {r.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-slate-600">
                      <FiCheck className="text-brand-500" /> {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-2">
                  <Link to="/contact" className="btn btn-ghost flex-1">View Details</Link>
                  <button onClick={() => openBooking(r.type)} className="btn-primary flex-1">Book Now</button>
                </div>
              </div>
            </Item>
          ))}
        </Stagger>

        {/* all rooms include */}
        <Reveal className="mt-10">
          <div className="rounded-2xl bg-brand-50/60 p-6">
            <h3 className="text-center font-bold text-slate-900">All rooms include</h3>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
              {[roomFacilities[2], roomFacilities[3], roomFacilities[4], roomFacilities[5], topServices[3]].map((f) => (
                <div key={f.name} className="flex flex-col items-center gap-2 text-center">
                  <span className="feature-icon"><f.Icon /></span>
                  <span className="text-xs font-medium text-slate-600">{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title={`Book ${label[form.roomType]}`}>
        {status === 'sent' ? (
          <p className="py-6 text-center text-slate-600">
            Thanks, {form.name}! Your booking request has been received. We'll contact you shortly.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name"><input className="input" value={form.name} onChange={set('name')} /></Field>
            <Field label="Email"><input className="input" value={form.email} onChange={set('email')} /></Field>
            <Field label="Phone"><input className="input" value={form.phone} onChange={set('phone')} /></Field>
            <Field label="Gender">
              <select className="input" value={form.gender} onChange={set('gender')}>
                <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
              </select>
            </Field>
            <Field label="Room Type">
              <select className="input" value={form.roomType} onChange={set('roomType')}>
                <option value="single">Single Room</option>
                <option value="double">Double Sharing</option>
                <option value="triple">Triple Sharing</option>
              </select>
            </Field>
            <Field label="College / Company"><input className="input" value={form.college} onChange={set('college')} /></Field>
            <div className="sm:col-span-2">
              <Field label="Message">
                <textarea className="input min-h-[90px]" value={form.message} onChange={set('message')} placeholder="Preferred move-in date, questions, etc." />
              </Field>
            </div>
            {status && status !== 'sending' && <p className="sm:col-span-2 text-sm text-rose-500">{status}</p>}
            <div className="sm:col-span-2 mt-1 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="btn btn-ghost">Cancel</button>
              <button onClick={submitBooking} disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Submit Request'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </PageTransition>
  );
};

export default Rooms;
