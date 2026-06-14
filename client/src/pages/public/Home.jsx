import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPhone, FiArrowRight, FiStar } from 'react-icons/fi';
import { TbBed, TbToolsKitchen3, TbVacuumCleaner, TbWashMachine, TbBarbell } from 'react-icons/tb';
import PageTransition from '../../components/PageTransition.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import AnimatedCounter from '../../components/AnimatedCounter.jsx';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { IMAGES } from '../../data/galleryImages.js';
import { roomFacilities, commonArea, topServices, whyChoose } from '../../data/content.js';

const roomPreview = [
  { ...IMAGES.homeRoomSingle, label: 'Single Room', price: 9000 },
  { ...IMAGES.homeRoomDouble, label: 'Double Sharing', price: 7500 },
  { ...IMAGES.homeRoomTriple, label: 'Triple Sharing', price: 6000 },
];

const facilityPreview = [
  { ...IMAGES.homeFacilityGym, label: 'Gym' },
  { ...IMAGES.homeFacilityWifi, label: 'WiFi Workspace' },
  { ...IMAGES.homeFacilitySecurity, label: '24x7 Security' },
  { ...IMAGES.homeFacilityLaundry, label: 'Laundry' },
];

const mealsPreview = [
  { ...IMAGES.dining, label: 'Dining Area' },
  { ...IMAGES.mess, label: 'Mess Food' },
];

const lifestylePreview = [
  { ...IMAGES.community, label: 'Community Events' },
  { ...IMAGES.lifestyle, label: 'Hostel Lifestyle' },
];

// Statistics / highlight section
const highlights = [
  { name: 'Fully Furnished Rooms', Icon: TbBed },
  { name: 'High Speed WiFi', Icon: roomFacilities[2].Icon },
  { name: '24x7 Security', Icon: topServices[3].Icon },
  { name: 'Daily Housekeeping', Icon: TbVacuumCleaner },
  { name: '4 Time Meals', Icon: TbToolsKitchen3 },
  { name: 'Power Backup', Icon: roomFacilities[3].Icon },
];

const stats = [
  { value: 6, suffix: '+', label: 'Room Types & Sharing Options' },
  { value: 100, suffix: '+', label: 'Happy Residents' },
  { value: 24, suffix: '/7', label: 'Security & Support' },
  { value: 4, suffix: 'x', label: 'Meals Every Day' },
];

const testimonials = [
  { name: 'Salu', role: 'Resident', rating: 5, comment: 'The PG is clean, safe and comfortable. Food quality is also really good. Staff is very helpful.', avatar: IMAGES.studying.src },
  { name: 'Anishay', role: 'Resident', rating: 5, comment: 'Rooms are fully furnished and WiFi works perfectly. Great place to live and study.', avatar: IMAGES.lifestyle.src },
  { name: 'Shikha', role: 'Resident', rating: 5, comment: 'I love the community events and gaming zone. Laundry service is very convenient.', avatar: IMAGES.community.src },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const Hero = () => {
  const [heroSrc, setHeroSrc] = useState(IMAGES.heroBanner.src);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50/60 py-14 lg:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: content */}
        <motion.div initial="hidden" animate="show" variants={heroStagger}>
          <motion.p variants={fadeUp} className="eyebrow">Welcome to Anjali PG</motion.p>
          <motion.h1 variants={fadeUp} className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Comfortable Living,<br />Feels Like <span className="text-brand-500">Home</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-md text-base text-slate-500 sm:text-lg">
            A perfect place to live, study and grow with modern facilities and a homely environment.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-lg font-bold text-brand-600 sm:text-xl">
            View PG from ₹6,000<span className="text-sm font-medium text-slate-400">/month</span>
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            {/* Contact Us — with animated gradient glow */}
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <motion.span
                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 opacity-60 blur-lg"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Link to="/contact" className="btn-primary relative">
                <FiPhone /> Contact Us
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/rooms" className="btn-ghost">
                Check Availability
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <motion.span
            className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand-300/30 blur-2xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute -bottom-8 -left-6 h-32 w-32 rounded-full bg-brand-400/20 blur-2xl"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-brand-50 to-white p-2 shadow-card"
          >
            <motion.img
              key={heroSrc}
              src={heroSrc}
              alt={IMAGES.heroBanner.alt}
              loading="eager"
              decoding="async"
              onError={() => setHeroSrc(IMAGES.exterior.src)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.04 }}
              className="aspect-[4/3] w-full rounded-2xl object-contain transition-transform duration-700 ease-out sm:aspect-[5/4]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => (
  <PageTransition>
    <Hero />

    {/* Stats counters */}
    <section className="relative bg-gradient-to-b from-brand-50/70 to-white py-12">
      <div className="container-x relative">
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <Item key={s.label} className="card flex flex-col items-center gap-1 p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-soft">
              <p className="text-3xl font-extrabold text-brand-600 sm:text-4xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs font-medium text-slate-500 sm:text-sm">{s.label}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    {/* Statistics / highlights — glassmorphism cards */}
    <section className="container-x py-14">
      <Reveal className="text-center">
        <p className="eyebrow">What You Get</p>
        <h2 className="section-title mt-2">Everything Included, From Day One</h2>
      </Reveal>
      <Stagger className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {highlights.map(({ name, Icon }) => (
          <Item key={name}>
            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex h-full flex-col items-center gap-3 rounded-2xl border border-white/60 bg-white/60 p-5 text-center shadow-soft backdrop-blur-md transition-shadow hover:shadow-card"
            >
              <span className="feature-icon h-12 w-12 text-2xl">
                <Icon />
              </span>
              <span className="text-xs font-semibold text-slate-700 sm:text-sm">{name}</span>
            </motion.div>
          </Item>
        ))}
      </Stagger>
    </section>

    {/* Why choose */}
    <section className="relative overflow-hidden py-14">
      <div className="container-x relative">
        <Reveal className="text-center">
          <h2 className="section-title">Why Choose Anjali PG?</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map(({ title, desc, Icon }) => (
            <Item key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="card h-full p-6 transition-shadow hover:shadow-soft"
              >
                <span className="feature-icon mb-4"><Icon /></span>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{desc}</p>
              </motion.div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    {/* Room preview */}
    <section className="container-x py-14">
      <Reveal className="text-center">
        <p className="eyebrow">Choose Your Stay</p>
        <h2 className="section-title mt-2">Our Rooms</h2>
      </Reveal>
      <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
        {roomPreview.map((r) => (
          <Item key={r.label}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group overflow-hidden rounded-2xl shadow-card transition-shadow hover:shadow-soft"
            >
              <SmartImage src={r.src} alt={r.alt} aspect="aspect-[4/3]" />
              <div className="flex items-center justify-between p-3">
                <p className="text-sm font-semibold text-slate-800">{r.label}</p>
                <p className="text-sm font-bold text-brand-600">₹{r.price.toLocaleString('en-IN')}<span className="text-xs font-medium text-slate-400">/mo</span></p>
              </div>
            </motion.div>
          </Item>
        ))}
      </Stagger>
      <div className="mt-6 text-center">
        <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link to="/rooms" className="btn-ghost">View All Rooms <FiArrowRight /></Link>
        </motion.div>
      </div>
    </section>

    {/* Facilities preview */}
    <section className="relative overflow-hidden bg-brand-50/40 py-14">
      <div className="container-x relative">
        <Reveal className="text-center">
          <p className="eyebrow">Live Well</p>
          <h2 className="section-title mt-2">Facilities You'll Love</h2>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {facilityPreview.map((f) => (
            <Item key={f.label}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="overflow-hidden rounded-2xl shadow-card transition-shadow hover:shadow-soft"
              >
                <SmartImage src={f.src} alt={f.alt} aspect="aspect-square" />
                <p className="p-2 text-center text-xs font-semibold text-slate-700">{f.label}</p>
              </motion.div>
            </Item>
          ))}
        </Stagger>
        <div className="mt-6 text-center">
          <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/facilities" className="btn-ghost">Explore Facilities <FiArrowRight /></Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Meals preview */}
    <section className="container-x py-14">
      <Reveal className="text-center">
        <p className="eyebrow">Fresh & Healthy</p>
        <h2 className="section-title mt-2">Delicious Home-Style Meals</h2>
      </Reveal>
      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
        {mealsPreview.map((m) => (
          <Item key={m.label}>
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-2xl shadow-card transition-shadow hover:shadow-soft"
            >
              <SmartImage src={m.src} alt={m.alt} aspect="aspect-[16/9]" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm font-semibold text-white">
                {m.label}
              </span>
            </motion.div>
          </Item>
        ))}
      </Stagger>
      <div className="mt-6 text-center">
        <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link to="/meals" className="btn-ghost">View Full Menu <FiArrowRight /></Link>
        </motion.div>
      </div>
    </section>

    {/* Community / lifestyle preview */}
    <section className="bg-brand-50/40 py-14">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">Life at Anjali PG</p>
          <h2 className="section-title mt-2">Community & Lifestyle</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          {lifestylePreview.map((l) => (
            <Item key={l.label}>
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl shadow-card transition-shadow hover:shadow-soft"
              >
                <SmartImage src={l.src} alt={l.alt} aspect="aspect-[16/9]" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm font-semibold text-white">
                  {l.label}
                </span>
              </motion.div>
            </Item>
          ))}
        </Stagger>
        <div className="mt-6 text-center">
          <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/gallery" className="btn-ghost">View Gallery <FiArrowRight /></Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Room facilities */}
    <section className="py-14">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">Everything Included</p>
          <h2 className="section-title mt-2">Room Facilities</h2>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {roomFacilities.map(({ name, Icon }) => (
            <Item key={name} className="feature-tile">
              <span className="feature-icon"><Icon /></span>
              <span className="text-xs font-semibold text-slate-700">{name}</span>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    {/* Common area */}
    <section className="container-x py-14">
      <Reveal className="text-center">
        <h2 className="section-title">Common Area</h2>
        <p className="mt-2 text-slate-500">Spaces designed for community, fun and wellbeing.</p>
      </Reveal>
      <Stagger className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {commonArea.map(({ name, Icon }) => (
          <Item key={name}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="card flex h-full flex-col items-center gap-3 p-8 text-center transition-shadow hover:shadow-soft"
            >
              <span className="feature-icon h-14 w-14 text-2xl"><Icon /></span>
              <h3 className="font-bold text-slate-900">{name}</h3>
            </motion.div>
          </Item>
        ))}
      </Stagger>
    </section>

    {/* Top services */}
    <section className="bg-brand-50/40 py-14">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">We've Got You Covered</p>
          <h2 className="section-title mt-2">Top Services</h2>
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {topServices.map(({ name, Icon }) => (
            <Item key={name} className="feature-tile">
              <span className="feature-icon"><Icon /></span>
              <span className="text-xs font-semibold text-slate-700">{name}</span>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    {/* Testimonials */}
    <section className="container-x py-14">
      <Reveal className="text-center">
        <p className="eyebrow">Loved By Residents</p>
        <h2 className="section-title mt-2">What Our Residents Say</h2>
      </Reveal>
      <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <Item key={t.name}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="card h-full p-6 transition-shadow hover:shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-full">
                  <SmartImage src={t.avatar} alt={t.name} aspect="aspect-square" zoom={false} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} fill="currentColor" size={14} />)}
              </div>
              <p className="mt-3 text-sm text-slate-600">{t.comment}</p>
            </motion.div>
          </Item>
        ))}
      </Stagger>
      <div className="mt-6 text-center">
        <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link to="/reviews" className="btn-ghost">Read All Reviews <FiArrowRight /></Link>
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="container-x py-14">
      <Reveal>
        <div className="relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 p-8 text-white sm:flex-row sm:p-10">
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold">Want to Visit Our PG?</h3>
            <p className="mt-1 text-white/80">We'll show you around — book a free visit today.</p>
          </div>
          <motion.div className="relative z-10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" className="btn bg-white text-brand-600 hover:bg-brand-50">
              Contact Us Today <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </Reveal>
    </section>
  </PageTransition>
);

export default Home;
