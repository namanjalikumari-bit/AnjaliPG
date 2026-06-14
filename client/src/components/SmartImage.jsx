import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

// Responsive, lazy-loaded image with hover-zoom and optional lightbox.
// Shows a soft purple skeleton + graceful fallback if the file is missing.
const SmartImage = ({ src, alt, className = '', zoom = true, lightbox = false, aspect = 'aspect-[4/3]' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl bg-brand-50 shadow-soft ${aspect} ${className} ${lightbox ? 'cursor-zoom-in' : ''}`}
        onClick={() => lightbox && !error && setOpen(true)}
      >
        {!loaded && !error && <div className="absolute inset-0 animate-pulse bg-brand-100/60" />}
        {error ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center text-brand-400">
            <span className="text-2xl">🏠</span>
            <span className="px-2 text-[10px] font-medium leading-tight">{alt}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity ${zoom ? 'hover:scale-110' : ''}`}
          />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Close">
              <FiX size={28} />
            </button>
            <motion.img
              src={src}
              alt={alt}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartImage;
