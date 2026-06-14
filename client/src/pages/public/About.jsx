import { FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { IMAGES } from '../../data/galleryImages.js';

const points = [
  'Modern and fully furnished rooms',
  'Healthy four-time meals',
  '24x7 security and support',
  'Peaceful environment for study',
];

const env = [
  { t: 'Clean & Hygienic', img: IMAGES.aboutEnvHygienic },
  { t: 'Green & Sustainable', img: IMAGES.aboutEnvGreen },
  { t: 'Positive Community', img: IMAGES.aboutEnvCommunity },
  { t: 'Student Friendly', img: IMAGES.aboutEnvStudent },
];

const About = () => (
  <PageTransition>
    <section className="container-x grid items-center gap-10 py-14 lg:grid-cols-2">
      <Reveal>
        <p className="eyebrow">About Anjali PG</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          More Than Just a Place to Live
        </h1>
        <p className="mt-4 text-slate-500">
          Anjali PG is not just a stay, it's a space where you feel at home. We provide a perfect
          balance of comfort, safety and convenience for students and working professionals.
        </p>
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-slate-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <FiCheck size={14} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </Reveal>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="overflow-hidden rounded-2xl shadow-card"><SmartImage src={IMAGES.reception.src} alt={IMAGES.reception.alt} /></div>
          <div className="mt-6 overflow-hidden rounded-2xl shadow-card"><SmartImage src={IMAGES.community.src} alt={IMAGES.community.alt} /></div>
          <div className="overflow-hidden rounded-2xl shadow-card"><SmartImage src={IMAGES.lifestyle.src} alt={IMAGES.lifestyle.alt} /></div>
          <div className="mt-6 overflow-hidden rounded-2xl shadow-card"><SmartImage src={IMAGES.studying.src} alt={IMAGES.studying.alt} /></div>
        </div>
      </motion.div>
    </section>

    <section className="bg-gradient-to-r from-brand-600 to-brand-500 py-12">
      <div className="container-x">
        <Reveal><h2 className="text-2xl font-extrabold text-white">Our Environment</h2></Reveal>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {env.map((e) => (
            <Item key={e.t} className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur">
              <SmartImage src={e.img.src} alt={e.t} aspect="aspect-[5/3]" />
              <p className="p-3 text-center text-sm font-semibold text-white">{e.t}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  </PageTransition>
);

export default About;
