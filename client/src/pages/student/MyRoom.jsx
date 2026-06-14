import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, EmptyState, inr } from '../../components/UI.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import { roomImageByType } from '../../data/galleryImages.js';

const MyRoom = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/students/me/profile').then(({ data }) => setProfile(data)).catch(() => setProfile(null)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading your room…" />;
  const room = profile?.room;
  const bed = profile?.bed;

  return (
    <Reveal>
      <PageHead title="My Room" subtitle="Your allotted room and bed." />
      {!room ? <EmptyState label="No room assigned yet. Please contact the admin." /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel className="overflow-hidden">
            <SmartImage src={roomImageByType(room.type).src} alt={`${room.type} room`} aspect="aspect-[4/3]" lightbox />
          </Panel>
          <Panel className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900">Room {room.roomNumber}</h3>
              <span className="chip capitalize">{room.type} sharing</span>
            </div>
            <p className="mt-1 text-2xl font-extrabold text-brand-600">{inr(room.price)}<span className="text-sm font-medium text-slate-400">/month</span></p>
            <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-slate-400">Floor</dt><dd className="text-slate-700">{room.floor}</dd>
              <dt className="text-slate-400">Capacity</dt><dd className="text-slate-700">{room.capacity} beds</dd>
              <dt className="text-slate-400">Your Bed</dt><dd className="text-slate-700">{bed?.bedNumber || '—'}</dd>
              <dt className="text-slate-400">Joined</dt><dd className="text-slate-700">{new Date(profile.joinDate).toLocaleDateString('en-IN')}</dd>
            </dl>
            {room.amenities?.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Room Amenities</p>
                <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                  {room.amenities.map((a) => <li key={a} className="flex items-center gap-2"><FiCheck className="text-brand-500" /> {a}</li>)}
                </ul>
              </div>
            )}
          </Panel>
        </div>
      )}
    </Reveal>
  );
};

export default MyRoom;
