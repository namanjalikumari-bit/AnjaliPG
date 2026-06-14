import { motion } from 'framer-motion';

// Reusable scroll-reveal wrapper (fade + slide up)
export const Reveal = ({ children, delay = 0, y = 24, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

// Stagger container + item
export const Stagger = ({ children, className = '', delayChildren = 0.05 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-60px' }}
    variants={{ show: { transition: { staggerChildren: 0.07, delayChildren } } }}
  >
    {children}
  </motion.div>
);

export const Item = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);
