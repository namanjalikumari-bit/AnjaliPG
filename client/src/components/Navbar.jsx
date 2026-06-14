import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhoneCall } from 'react-icons/fi';
import { TbHome2 } from 'react-icons/tb';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/meals', label: 'Meals' },
  { to: '/reviews', label: 'Reviews' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/70 shadow-sm backdrop-blur-lg"
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
            <TbHome2 />
          </span>
          Anjali PG
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav-link relative px-3 py-2 transition-colors duration-200 hover:text-brand-600 ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {l.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 origin-left rounded-full bg-brand-500"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </span>
              )}
            </NavLink>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              title="Get in touch with the PG owner"
              className="btn-primary ml-2 gap-2"
            >
              <FiPhoneCall /> Contact Us
            </Link>
          </motion.div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="text-slate-700 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden overflow-hidden border-t border-slate-100 bg-white/90 backdrop-blur-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="container-x flex flex-col gap-1 py-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-brand-50 hover:text-brand-600'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  title="Get in touch with the PG owner"
                  className="btn-primary mt-2 w-full gap-2"
                >
                  <FiPhoneCall /> Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
