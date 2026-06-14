import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

// Counts up from 0 to `value` once it scrolls into view.
const AnimatedCounter = ({ value, suffix = '', duration = 1.6, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString('en-IN'));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, value, duration, count]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
