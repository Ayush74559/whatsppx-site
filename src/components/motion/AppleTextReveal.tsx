import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  children: string;
  className?: string;
};

export const AppleTextReveal: React.FC<Props> = ({ children, className = '' }) => {
  const shouldReduce = useReducedMotion();
  const words = React.useMemo(() => children.split(' '), [children]);

  if (shouldReduce) {
    return (
      <h1 className={`text-white font-sfpro text-6xl leading-tight ${className}`}>
        {children}
      </h1>
    );
  }

  return (
    <h1 className={`text-white font-sfpro text-6xl leading-tight ${className}`}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 14, scale: 1.03, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.9,
            delay: idx * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

export default AppleTextReveal;
