import React from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export const ScrollTextReveal: React.FC<Props> = ({ children, className = '', delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20, filter: 'blur(2px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(2px)' }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTextReveal;