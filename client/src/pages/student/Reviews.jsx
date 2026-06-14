import { useState } from 'react';
import { FiStar, FiSend } from 'react-icons/fi';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { Reveal } from '../../components/Motion.jsx';
import { PageHead, Panel, Field } from '../../components/UI.jsx';

const Reviews = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    setBusy(true);
    try {
      await api.post('/reviews', { name: user?.name, user: user?._id, rating, comment });
      setDone(true); setComment('');
    } finally { setBusy(false); }
  };

  return (
    <Reveal>
      <PageHead title="Share a Review" subtitle="Tell others about your experience at Anjali PG." />
      <Panel className="max-w-xl p-6">
        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl">🎉</div>
            <h3 className="mt-3 font-bold text-slate-900">Thank you for your feedback!</h3>
            <p className="text-sm text-slate-400">Your review will appear publicly once approved by the admin.</p>
            <button onClick={() => setDone(false)} className="btn btn-ghost mt-4">Write another</button>
          </div>
        ) : (
          <>
            <Field label="Your Rating">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i + 1)}
                    className="text-amber-400" aria-label={`${i + 1} stars`}>
                    <FiStar size={28} fill={i < (hover || rating) ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </Field>
            <div className="mt-4">
              <Field label="Your Review">
                <textarea className="input min-h-[120px]" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What did you love about staying here?" />
              </Field>
            </div>
            <button onClick={submit} disabled={busy || !comment} className="btn btn-primary mt-5 disabled:opacity-60"><FiSend /> {busy ? 'Submitting…' : 'Submit Review'}</button>
          </>
        )}
      </Panel>
    </Reveal>
  );
};

export default Reviews;
