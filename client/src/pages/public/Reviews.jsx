import { useEffect, useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import PageTransition from '../../components/PageTransition.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { IMAGES } from '../../data/galleryImages.js';
import api from '../../api/axios.js';

const seedReviews = [
  { name: 'Salu', rating: 5, comment: 'The PG is clean, safe and comfortable. Food quality is also really good. Staff is very helpful.', avatar: IMAGES.studying.src },
  { name: 'Anishay', rating: 5, comment: 'Rooms are fully furnished and WiFi works perfectly. Great place to live and study.', avatar: IMAGES.lifestyle.src },
  { name: 'Shikha', rating: 5, comment: 'I love the community events and gaming zone. Laundry service is very convenient.', avatar: IMAGES.community.src },
];

const Stars = ({ n }) => (
  <div className="flex gap-0.5 text-amber-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar key={i} fill={i < n ? 'currentColor' : 'none'} size={16} />
    ))}
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState(seedReviews);
  const [idx, setIdx] = useState(0);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    api.get('/reviews')
      .then(({ data }) => { if (Array.isArray(data) && data.length) setReviews(data); })
      .catch(() => {});
  }, []);

  const perView = 3;
  const visible = reviews.slice(idx, idx + perView).length
    ? reviews.slice(idx, idx + perView)
    : reviews.slice(0, perView);

  const submit = async () => {
    if (!form.name || !form.comment) return;
    try { await api.post('/reviews', form); } catch { /* still show thanks */ }
    setSent(true);
    setForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <PageTransition>
      <section className="container-x py-14">
        <Reveal className="text-center">
          <h1 className="section-title">What Our Residents Say</h1>
          <p className="mt-2 text-slate-500">Real feedback from our happy residents.</p>
        </Reveal>

        {/* Lifestyle visual section */}
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          <Item className="overflow-hidden rounded-2xl shadow-card">
            <SmartImage src={IMAGES.reviewLifestyle1.src} alt={IMAGES.reviewLifestyle1.alt} aspect="aspect-[16/9]" />
          </Item>
          <Item className="overflow-hidden rounded-2xl shadow-card">
            <SmartImage src={IMAGES.reviewLifestyle2.src} alt={IMAGES.reviewLifestyle2.alt} aspect="aspect-[16/9]" />
          </Item>
        </Stagger>

        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - perView))}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600 sm:flex"
            aria-label="Previous"
          ><FiChevronLeft /></button>

          <Stagger key={idx} className="grid flex-1 gap-4 md:grid-cols-3">
            {visible.map((r, i) => (
              <Item key={r._id || r.name + i} className="card p-6">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 overflow-hidden rounded-full">
                    <SmartImage src={r.avatar || IMAGES.studying.src} alt={r.name} aspect="aspect-square" zoom={false} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{r.name}</p>
                    <Stars n={r.rating} />
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">{r.comment}</p>
              </Item>
            ))}
          </Stagger>

          <button
            onClick={() => setIdx((i) => (i + perView < reviews.length ? i + perView : i))}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-brand-300 hover:text-brand-600 sm:flex"
            aria-label="Next"
          ><FiChevronRight /></button>
        </div>

        {/* write feedback */}
        <Reveal className="mx-auto mt-12 max-w-xl">
          <div className="card p-6">
            <h2 className="font-bold text-slate-900">Write Your Feedback</h2>
            {sent ? (
              <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
                Thanks for your feedback! It will appear after the admin approves it.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                <input className="input" placeholder="Your name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Rating:</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setForm({ ...form, rating: n })} aria-label={`${n} stars`}>
                      <FiStar className="text-amber-400" fill={n <= form.rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
                <textarea className="input min-h-[100px]" placeholder="Share your experience"
                  value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
                <button onClick={submit} className="btn-primary w-full">Submit Feedback <FiArrowRight /></button>
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
};

export default Reviews;
