import React from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  children: string;
  className?: string;
  delay?: number;
  letterDelay?: number;
  style?: React.CSSProperties;
};

export const CinematicLetterReveal: React.FC<Props> = ({
  children,
  className = '',
  delay = 0,
  letterDelay = 0.05,
  style = {}
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const letters = React.useMemo(() => children.split(''), [children]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 1 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            filter: 'blur(2px)'
          }}
          animate={isInView ? {
            opacity: 1,
            filter: 'blur(0px)'
          } : {
            opacity: 0,
            filter: 'blur(2px)'
          }}
          transition={{
            duration: 0.6,
            delay: isInView
              ? delay + (index * letterDelay)
              : delay + ((letters.length - 1 - index) * letterDelay),
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block"
          style={{
            willChange: 'opacity, filter'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default CinematicLetterReveal;