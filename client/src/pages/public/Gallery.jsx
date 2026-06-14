import { useState } from 'react';
import PageTransition from '../../components/PageTransition.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { galleryImages, galleryCategories, categoryLabels } from '../../data/galleryImages.js';

const Gallery = () => {
  const [cat, setCat] = useState('all');
  const shown = cat === 'all' ? galleryImages : galleryImages.filter((g) => g.category === cat);

  return (
    <PageTransition>
      <section className="container-x py-14">
        <Reveal>
          <h1 className="section-title">Gallery</h1>
          <p className="mt-2 text-slate-500">Take a look at our PG rooms, facilities and common areas.</p>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`chip px-4 py-2 capitalize ${cat === c ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'}`}
            >
              {categoryLabels[c] || c}
            </button>
          ))}
        </div>

        <Stagger key={cat} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((g) => (
            <Item key={g.src + g.title} className="group overflow-hidden rounded-2xl shadow-card">
              <div className="relative">
                <SmartImage src={g.src} alt={g.alt || g.title} lightbox aspect="aspect-[4/3]" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {g.title}
                </span>
              </div>
            </Item>
          ))}
        </Stagger>
      </section>
    </PageTransition>
  );
};

export default Gallery;
