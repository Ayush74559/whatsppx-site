import React from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  trigger?: boolean;
}

export const CountUp: React.FC<CountUpProps> = ({
  from,
  to,
  duration = 2,
  delay = 0,
  decimals = 0,
  trigger = true
}) => {
  const [count, setCount] = React.useState(from);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (trigger && isInView) {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);

        const currentCount = from + (to - from) * progress;
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(to);
        }
      };

      const timeoutId = setTimeout(updateCount, delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [from, to, duration, delay, trigger, isInView]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
    </span>
  );
};