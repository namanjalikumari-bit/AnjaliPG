import { useEffect, useState } from 'react';
import PageTransition from '../../components/PageTransition.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { IMAGES } from '../../data/galleryImages.js';
import { fallbackMenu } from '../../data/content.js';
import api from '../../api/axios.js';

const meals = [
  { name: 'Breakfast', time: '07:30 AM – 09:00 AM', img: IMAGES.mealBreakfast },
  { name: 'Lunch', time: '12:30 PM – 02:00 PM', img: IMAGES.mealLunch },
  { name: 'Evening Snacks', time: '05:00 PM – 06:00 PM', img: IMAGES.mealEveningSnacks },
  { name: 'Dinner', time: '08:00 PM – 10:00 PM', img: IMAGES.mealDinner },
];

const Meals = () => {
  const [menu, setMenu] = useState(fallbackMenu);

  useEffect(() => {
    api.get('/mess')
      .then(({ data }) => { if (Array.isArray(data) && data.length) setMenu(data); })
      .catch(() => {});
  }, []);

  return (
    <PageTransition>
      <section className="container-x py-14">
        <Reveal>
          <h1 className="section-title">Meals & Menu</h1>
          <p className="mt-2 text-slate-500">We serve healthy, hygienic and delicious meals four times every day.</p>
        </Reveal>

        <Reveal className="mt-8"><h2 className="mb-4 font-bold text-brand-600">Four Times Meals</h2></Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {meals.map((m) => (
            <Item key={m.name} className="card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-soft">
              <SmartImage src={m.img.src} alt={m.name} aspect="aspect-[5/3]" />
              <div className="p-4">
                <h3 className="font-bold text-slate-900">{m.name}</h3>
                <p className="text-xs text-slate-400">{m.time}</p>
              </div>
            </Item>
          ))}
        </Stagger>

        <Reveal className="mt-12">
          <h2 className="mb-4 font-bold text-slate-900">Weekly Menu</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-card">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-brand-50 text-left text-brand-700">
                  <th className="px-4 py-3 font-semibold">Day</th>
                  <th className="px-4 py-3 font-semibold">Breakfast</th>
                  <th className="px-4 py-3 font-semibold">Lunch</th>
                  <th className="px-4 py-3 font-semibold">Evening Snacks</th>
                  <th className="px-4 py-3 font-semibold">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {menu.map((row, i) => (
                  <tr key={row.day} className={i % 2 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-4 py-3 font-semibold text-brand-600">{row.day}</td>
                    <td className="px-4 py-3 text-slate-600">{row.breakfast}</td>
                    <td className="px-4 py-3 text-slate-600">{row.lunch}</td>
                    <td className="px-4 py-3 text-slate-600">{row.snacks}</td>
                    <td className="px-4 py-3 text-slate-600">{row.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">*Menu is subject to change.</p>
        </Reveal>
      </section>
    </PageTransition>
  );
};

export default Meals;
